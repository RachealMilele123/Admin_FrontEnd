import { useEffect, useState } from "react";

import {
  Box,
  Title,
  Text,
  Group,
  Button,
  Card,
  Table,
  Badge,
  Modal,
  Stack,
  TextInput,
  Textarea,
  Select,
  Loader,
  Alert,
} from "@mantine/core";

import { IconPlus, IconEye, IconUserCheck } from "@tabler/icons-react";
import { scholarsAPI } from "../api";

// Note: Scholars API endpoint - this may be a custom endpoint
// If not in the main API spec, it should be added to api.js

const INITIAL_FORM = {
  name: "",
  description: "",
  category: "",
};

const CATEGORIES = [
  "STEM",
  "Arts",
  "Business",
  "Law",
  "Medicine",
  "Education",
  "Engineering",
  "Social Sciences",
  "Other",
];

function Scholars() {
  const [opened, setOpened] = useState(false);
  const [selectedScholar, setSelectedScholar] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [scholars, setScholars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const fetchScholars = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await scholarsAPI.getAll();
      setScholars(data.scholars ?? []);
    } catch (err) {
      console.error("Failed to fetch scholars", err);
      setError("Failed to load scholars. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholars();
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async () => {
    setSubmitError("");
    
    if (!form.name.trim() || !form.description.trim() || !form.category) {
      setSubmitError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      await scholarsAPI.create(form);

      await fetchScholars();
      setForm(INITIAL_FORM);
      setOpened(false);
      setSubmitError("");
    } catch (err) {
      console.error(err);
      setSubmitError(err.message || "Failed to create scholar. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box style={{ padding: "30px", background: "#f4f7fb", minHeight: "100vh" }}>
      {/* HEADER */}
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2}>Scholars</Title>
          <Text c="dimmed">
            Create and manage scholars who can be assigned scholarships
          </Text>
        </div>
        <Button
          leftSection={<IconPlus size={18} />}
          onClick={() => setOpened(true)}
          radius="md"
        >
          Add Scholar
        </Button>
      </Group>

      {/* ERROR ALERT */}
      {error && (
        <Alert color="red" mb="md">
          {error}
        </Alert>
      )}

      {/* TABLE */}
      <Card shadow="sm" radius="lg" p="lg" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={4}>All Scholars</Title>
          <Badge color="blue" variant="light">
            {scholars.length} Scholar{scholars.length !== 1 ? "s" : ""}
          </Badge>
        </Group>

        {loading ? (
          <Group justify="center" p="xl">
            <Loader size="lg" />
          </Group>
        ) : (
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Created</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {scholars.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={5}>
                    <Text c="dimmed" ta="center" py="md">
                      No scholars yet. Click "Add Scholar" to create one.
                    </Text>
                  </Table.Td>
                </Table.Tr>
              ) : (
                scholars.map((s) => (
                  <Table.Tr key={s._id}>
                    <Table.Td fw={500}>{s.name}</Table.Td>
                    <Table.Td>
                      <Badge color="teal" variant="light">
                        {s.category}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text lineClamp={1} maw={300}>
                        {s.description}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      {s.createdAt
                        ? new Date(s.createdAt).toLocaleDateString()
                        : "—"}
                    </Table.Td>
                    <Table.Td>
                      <Button
                        size="xs"
                        variant="light"
                        leftSection={<IconEye size={14} />}
                        onClick={() => setSelectedScholar(s)}
                      >
                        View
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        )}
      </Card>

      {/* VIEW DETAILS MODAL */}
      <Modal
        opened={!!selectedScholar}
        onClose={() => setSelectedScholar(null)}
        title="Scholar Details"
        size="md"
        radius="lg"
      >
        {selectedScholar && (
          <Stack>
            <Group>
              <IconUserCheck size={24} color="teal" />
              <Title order={3}>{selectedScholar.name}</Title>
            </Group>
            <Badge color="teal" variant="light" size="lg" w="fit-content">
              {selectedScholar.category}
            </Badge>
            <Text fw={700}>Description</Text>
            <Text>{selectedScholar.description}</Text>
            {selectedScholar.createdAt && (
              <>
                <Text fw={700}>Created</Text>
                <Text>
                  {new Date(selectedScholar.createdAt).toLocaleString()}
                </Text>
              </>
            )}
          </Stack>
        )}
      </Modal>

      {/* CREATE SCHOLAR MODAL */}
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          setForm(INITIAL_FORM);
          setSubmitError("");
        }}
        title="Add Scholar"
        size="md"
        radius="lg"
      >
        <Stack>
          <TextInput
            label="Name"
            placeholder="e.g. Computer Science Program"
            value={form.name}
            onChange={(e) => handleChange("name", e.currentTarget.value)}
            required
          />

          <Select
            label="Category"
            placeholder="Select a category"
            data={CATEGORIES}
            value={form.category}
            onChange={(value) => handleChange("category", value)}
            required
          />

          <Textarea
            label="Description"
            placeholder="Describe this scholar / scholarship track..."
            minRows={4}
            value={form.description}
            onChange={(e) => handleChange("description", e.currentTarget.value)}
            required
          />

          {submitError && (
            <Text c="red" size="sm">
              {submitError}
            </Text>
          )}

          <Button
            fullWidth
            radius="md"
            leftSection={<IconUserCheck size={18} />}
            onClick={handleSubmit}
            loading={loading}
          >
            Create Scholar
          </Button>
        </Stack>
      </Modal>
    </Box>
  );
}

export default Scholars;
