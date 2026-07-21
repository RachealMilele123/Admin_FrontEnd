import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  Textarea,
  Button,
  Table,
  Badge,
  Text,
  Modal,
  Group,
  ActionIcon,
  Pill,
  PillGroup,
  Select,
  Switch,
  NumberInput,
  Grid,
  Divider,
  Stack,
  Title,
  Card,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconPlus,
  IconEye,
  IconEdit,
  IconTrash,
  IconSchool,
} from "@tabler/icons-react";
import { internshipsAPI } from "../api";

const INITIAL_FORM = {
  title: "",
  company: "",
  location: "",
  duration: "",
  deadline: "",
  description: "",
  salary: "",
  requirements: "",
  idealCandidate: "",
  keyResponsibilities: "",
  internshipBenefits: "",
  expectedOutcomes: "",
  isActive: true,
};

function InternshipAdmin() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingInternship, setViewingInternship] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();

  const form = useForm({
    initialValues: INITIAL_FORM,
  });

  // Check admin role on component mount
  useEffect(() => {
    checkAdminRole();
  }, []);

  // Fetch internships on component mount
  useEffect(() => {
    if (!authError) {
      fetchInternships();
    }
  }, [authError]);

  const checkAdminRole = () => {
    const token = localStorage.getItem("token");
    const adminStr = localStorage.getItem("admin");
    
    if (!token) {
      setAuthError("Please log in as an administrator.");
      return;
    }
    
    try {
      const admin = adminStr ? JSON.parse(adminStr) : null;
      if (!admin || admin.role !== "admin") {
        setAuthError("You do not have administrator privileges.");
        // Clear invalid auth data
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
      }
    } catch (e) {
      console.error("Failed to parse admin data:", e);
      setAuthError("Please log in as an administrator.");
    }
  };

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const data = await internshipsAPI.getAll();
      setInternships(data.internships ?? []);
    } catch (err) {
      console.error("Failed to fetch internships", err);
      // Handle authentication errors
      if (err.message.includes("log in") || err.message.includes("administrator privileges")) {
        setAuthError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setSubmitError("");
    try {
      if (editingId) {
        // Update existing internship
        await internshipsAPI.update(editingId, values);
      } else {
        // Create new internship
        await internshipsAPI.create(values);
      }
      await fetchInternships();
      closeModal();
    } catch (err) {
      console.error("Failed to save internship", err);
      setSubmitError(err.message || "Failed to save internship");
      
      // Handle authentication errors
      if (err.message.includes("log in") || err.message.includes("administrator privileges")) {
        setAuthError(err.message);
      }
    }
  };

  const handleEdit = (internship) => {
    setEditingId(internship._id);
    form.setValues({
      title: internship.title || "",
      company: internship.company || "",
      location: internship.location || "",
      duration: internship.duration || "",
      deadline: internship.deadline || "",
      description: internship.description || "",
      salary: internship.salary || "",
      requirements: internship.requirements || "",
      idealCandidate: internship.idealCandidate || "",
      keyResponsibilities: internship.keyResponsibilities || "",
      internshipBenefits: internship.internshipBenefits || "",
      expectedOutcomes: internship.expectedOutcomes || "",
      isActive: internship.isActive ?? true,
    });
    setOpened(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await internshipsAPI.delete(deleteId);
      await fetchInternships();
      setDeleteId(null);
    } catch (err) {
      console.error("Failed to delete internship", err);
      alert(err.message || "Failed to delete internship");
      
      // Handle authentication errors
      if (err.message.includes("log in") || err.message.includes("administrator privileges")) {
        setAuthError(err.message);
      }
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    form.reset();
    setSubmitError("");
    setOpened(true);
  };

  const closeModal = () => {
    setOpened(false);
    setEditingId(null);
    form.reset();
    setSubmitError("");
  };

  // Show authentication error if present
  if (authError) {
    return (
      <div style={{ padding: "30px", background: "#f4f7fb", minHeight: "100vh" }}>
        <Card shadow="sm" radius="lg" p="lg" withBorder>
          <Alert color="red" title="Authentication Error" mb="md">
            {authError}
          </Alert>
          <Button onClick={() => navigate("/admin/login")} variant="light">
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px", background: "#f4f7fb", minHeight: "100vh" }}>
      {/* HEADER */}
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2}>Internships Management</Title>
          <Text c="dimmed">Manage and organize internship opportunities</Text>
        </div>
        <Button
          leftSection={<IconPlus size={18} />}
          onClick={openCreateModal}
          radius="md"
        >
          Add Internship
        </Button>
      </Group>

      {/* TABLE */}
      <Card shadow="sm" radius="lg" p="lg" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={4}>Available Internships</Title>
          <Badge color="blue" variant="light">
            {internships.length} Internships
          </Badge>
        </Group>

        {loading ? (
          <Text ta="center" py="xl">Loading internships...</Text>
        ) : (
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Company</Table.Th>
                <Table.Th>Location</Table.Th>
                <Table.Th>Duration</Table.Th>
                <Table.Th>Deadline</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {internships.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={7}>
                    <Text c="dimmed" ta="center" py="xl">
                      No internships yet. Click "Add Internship" to create one.
                    </Text>
                  </Table.Td>
                </Table.Tr>
              ) : (
                internships.map((item) => (
                  <Table.Tr key={item._id}>
                    <Table.Td>{item.title}</Table.Td>
                    <Table.Td>{item.company}</Table.Td>
                    <Table.Td>{item.location}</Table.Td>
                    <Table.Td>{item.duration}</Table.Td>
                    <Table.Td>{item.deadline}</Table.Td>
                    <Table.Td>
                      <Badge color={item.isActive ? "green" : "gray"}>
                        {item.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <ActionIcon
                          variant="light"
                          color="blue"
                          size="sm"
                          onClick={() => setViewingInternship(item)}
                        >
                          <IconEye size={16} />
                        </ActionIcon>
                        <ActionIcon
                          variant="light"
                          color="orange"
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                        <ActionIcon
                          variant="light"
                          color="red"
                          size="sm"
                          onClick={() => setDeleteId(item._id)}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        )}
      </Card>

      {/* CREATE/EDIT MODAL */}
      <Modal
        opened={opened}
        onClose={closeModal}
        title={editingId ? "Edit Internship" : "Create Internship"}
        size="xl"
        radius="lg"
      >
        <Stack>
          {submitError && (
            <Alert color="red" title="Error">
              {submitError}
            </Alert>
          )}

          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Internship Title"
                placeholder="e.g Software Engineering Intern"
                value={form.values.title}
                onChange={(e) => form.setFieldValue("title", e.currentTarget.value)}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Company Name"
                placeholder="e.g Cavendish University"
                value={form.values.company}
                onChange={(e) => form.setFieldValue("company", e.currentTarget.value)}
                required
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Location"
                placeholder="e.g Lusaka / Remote"
                value={form.values.location}
                onChange={(e) => form.setFieldValue("location", e.currentTarget.value)}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Duration"
                placeholder="e.g 3 months"
                value={form.values.duration}
                onChange={(e) => form.setFieldValue("duration", e.currentTarget.value)}
                required
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Application Deadline"
                placeholder="e.g 30 April 2026"
                value={form.values.deadline}
                onChange={(e) => form.setFieldValue("deadline", e.currentTarget.value)}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Salary/Stipend"
                placeholder="e.g $1000/month or Unpaid"
                value={form.values.salary}
                onChange={(e) => form.setFieldValue("salary", e.currentTarget.value)}
              />
            </Grid.Col>
          </Grid>

          <Textarea
            label="Description"
            placeholder="Describe the internship..."
            minRows={3}
            value={form.values.description}
            onChange={(e) => form.setFieldValue("description", e.currentTarget.value)}
            required
          />

          <Divider label="Additional Details" labelPosition="center" />

          <Textarea
            label="Requirements"
            placeholder="List the requirements..."
            minRows={2}
            value={form.values.requirements}
            onChange={(e) => form.setFieldValue("requirements", e.currentTarget.value)}
          />

          <Textarea
            label="Ideal Candidate"
            placeholder="Describe the ideal candidate..."
            minRows={2}
            value={form.values.idealCandidate}
            onChange={(e) => form.setFieldValue("idealCandidate", e.currentTarget.value)}
          />

          <Textarea
            label="Key Responsibilities"
            placeholder="List the key responsibilities..."
            minRows={2}
            value={form.values.keyResponsibilities}
            onChange={(e) => form.setFieldValue("keyResponsibilities", e.currentTarget.value)}
          />

          <Textarea
            label="Internship Benefits"
            placeholder="List the benefits..."
            minRows={2}
            value={form.values.internshipBenefits}
            onChange={(e) => form.setFieldValue("internshipBenefits", e.currentTarget.value)}
          />

          <Textarea
            label="Expected Outcomes"
            placeholder="List the expected outcomes..."
            minRows={2}
            value={form.values.expectedOutcomes}
            onChange={(e) => form.setFieldValue("expectedOutcomes", e.currentTarget.value)}
          />

          <Switch
            label="Active (visible to scholars)"
            checked={form.values.isActive}
            onChange={(e) => form.setFieldValue("isActive", e.currentTarget.checked)}
          />

          <Button
            fullWidth
            radius="md"
            leftSection={<IconSchool size={18} />}
            onClick={() => form.onSubmit(handleSubmit)()}
          >
            {editingId ? "Update Internship" : "Post Internship"}
          </Button>
        </Stack>
      </Modal>

      {/* VIEW DETAILS MODAL */}
      <Modal
        opened={!!viewingInternship}
        onClose={() => setViewingInternship(null)}
        title="Internship Details"
        size="lg"
        radius="lg"
      >
        {viewingInternship && (
          <Stack>
            <Title order={3}>{viewingInternship.title}</Title>
            <Divider />
            <Grid>
              <Grid.Col span={6}>
                <Text fw={700}>Company</Text>
                <Text>{viewingInternship.company}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={700}>Location</Text>
                <Text>{viewingInternship.location}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={700}>Duration</Text>
                <Text>{viewingInternship.duration}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={700}>Deadline</Text>
                <Text>{viewingInternship.deadline}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={700}>Salary/Stipend</Text>
                <Text>{viewingInternship.salary || "Not specified"}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={700}>Status</Text>
                <Badge color={viewingInternship.isActive ? "green" : "gray"}>
                  {viewingInternship.isActive ? "Active" : "Inactive"}
                </Badge>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text fw={700}>Description</Text>
                <Text>{viewingInternship.description}</Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text fw={700}>Requirements</Text>
                <Text>{viewingInternship.requirements}</Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text fw={700}>Ideal Candidate</Text>
                <Text>{viewingInternship.idealCandidate}</Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text fw={700}>Key Responsibilities</Text>
                <Text>{viewingInternship.keyResponsibilities}</Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text fw={700}>Internship Benefits</Text>
                <Text>{viewingInternship.internshipBenefits}</Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text fw={700}>Expected Outcomes</Text>
                <Text>{viewingInternship.expectedOutcomes}</Text>
              </Grid.Col>
            </Grid>
          </Stack>
        )}
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        opened={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete Internship"
        size="sm"
        radius="lg"
      >
        <Stack>
          <Text>Are you sure you want to delete this internship? This action cannot be undone.</Text>
          <Group justify="flex-end">
            <Button variant="light" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button color="red" onClick={handleDelete}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
}

export default InternshipAdmin;
