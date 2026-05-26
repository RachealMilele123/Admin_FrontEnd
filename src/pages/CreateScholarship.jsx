import { useEffect, useState } from "react";

import {
  Card,
  Title,
  Text,
  Button,
  Group,
  Table,
  Badge,
  Modal,
  Stack,
  TextInput,
  Select,
  Textarea,
  Divider,
  Grid,
  Box,
  Switch,
  NumberInput,
  ActionIcon,
  Pill,
  PillGroup,
} from "@mantine/core";

import { IconPlus, IconEye, IconSchool } from "@tabler/icons-react";
import { API_URL } from "../api";

const INITIAL_FORM = {
  scholarId: "",
  title: "",
  provider: "",
  description: "",
  category: "",
  level: "",
  location: { country: "", city: "" },
  requirements: [],
  benefits: { tuition: "", monthlyStipend: "", housing: false },
  deadline: "",
  applicationUrl: "",
  tags: [],
  isActive: true,
};

function CreateScholarship() {
  const [opened, setOpened] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [scholarships, setScholarships] = useState([]);
  const [scholars, setScholars] = useState([]);

  const [reqInput, setReqInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [submitError, setSubmitError] = useState("");

  const fetchScholars = async () => {
    try {
      const res = await fetch(`${API_URL}/scholars`, {
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log("Scholars API response:", data);
      setScholars(data.scholars ?? data.data ?? data ?? []);
    } catch (err) {
      console.error("Failed to fetch scholars", err);
    }
  };

  const fetchScholarships = async () => {
    try {
      const res = await fetch(`${API_URL}/scholarships`, {
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setScholarships(data.scholarships ?? []);
    } catch (err) {
      console.error("Failed to fetch scholarships", err);
    }
  };

  useEffect(() => {
    fetchScholars();
    fetchScholarships();
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNested = (parent, field, value) => {
    setForm((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value },
    }));
  };

  const addToArray = (field, value, setter) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setForm((prev) => ({ ...prev, [field]: [...prev[field], trimmed] }));
    setter("");
  };

  const removeFromArray = (field, index) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    setSubmitError("");
    if (!form.scholarId) {
      setSubmitError("Please select a scholar before submitting.");
      return;
    }

    const payload = {
      scholarId: form.scholarId,
      ...form,
      benefits: {
        ...form.benefits,
        monthlyStipend: form.benefits.monthlyStipend
          ? Number(form.benefits.monthlyStipend)
          : undefined,
      },
    };

    console.log("Submitting payload:", payload);

    try {
      const res = await fetch(`${API_URL}/scholarships/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        const msg = errBody?.message ?? `Error ${res.status}`;
        console.error("Failed to create scholarship", res.status, errBody);
        setSubmitError(`${msg} (scholar id sent: ${form.scholarId})`);
        return;
      }

      await fetchScholarships();
      setForm(INITIAL_FORM);
      setReqInput("");
      setTagInput("");
      setOpened(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box style={{ padding: "30px", background: "#f4f7fb", minHeight: "100vh" }}>
      {/* HEADER */}
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2}>Scholarships Management</Title>
          <Text c="dimmed">Manage and assign scholarships to scholars</Text>
        </div>
        <Button
          leftSection={<IconPlus size={18} />}
          onClick={() => setOpened(true)}
          radius="md"
        >
          Create Scholarship
        </Button>
      </Group>

      {/* TABLE */}
      <Card shadow="sm" radius="lg" p="lg" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={4}>Posted Scholarships</Title>
          <Badge color="blue" variant="light">
            {scholarships.length} Scholarships
          </Badge>
        </Group>

        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Provider</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Level</Table.Th>
              <Table.Th>Deadline</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {scholarships.map((s) => (
              <Table.Tr key={s._id}>
                <Table.Td>{s.title}</Table.Td>
                <Table.Td>{s.provider}</Table.Td>
                <Table.Td>
                  <Badge color="violet">{s.category}</Badge>
                </Table.Td>
                <Table.Td>{s.level}</Table.Td>
                <Table.Td>{s.deadline}</Table.Td>
                <Table.Td>
                  <Badge color={s.isActive ? "green" : "gray"}>
                    {s.isActive ? "Active" : "Inactive"}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Button
                    size="xs"
                    variant="light"
                    leftSection={<IconEye size={14} />}
                    onClick={() => setSelectedScholarship(s)}
                  >
                    View
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      {/* VIEW DETAILS MODAL */}
      <Modal
        opened={!!selectedScholarship}
        onClose={() => setSelectedScholarship(null)}
        title="Scholarship Details"
        size="lg"
        radius="lg"
      >
        {selectedScholarship && (
          <Stack>
            <Title order={3}>{selectedScholarship.title}</Title>
            <Divider />
            <Grid>
              <Grid.Col span={6}>
                <Text fw={700}>Provider</Text>
                <Text>{selectedScholarship.provider}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={700}>Category</Text>
                <Text>{selectedScholarship.category}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={700}>Level</Text>
                <Text>{selectedScholarship.level}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={700}>Deadline</Text>
                <Text>{selectedScholarship.deadline}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={700}>Country</Text>
                <Text>{selectedScholarship.location?.country}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={700}>City</Text>
                <Text>{selectedScholarship.location?.city}</Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text fw={700}>Description</Text>
                <Text>{selectedScholarship.description}</Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text fw={700}>Application URL</Text>
                <Text>{selectedScholarship.applicationUrl}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={700}>Tuition</Text>
                <Text>{selectedScholarship.benefits?.tuition}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={700}>Monthly Stipend</Text>
                <Text>{selectedScholarship.benefits?.monthlyStipend}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={700}>Housing</Text>
                <Text>
                  {selectedScholarship.benefits?.housing ? "Yes" : "No"}
                </Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text fw={700}>Requirements</Text>
                <PillGroup>
                  {selectedScholarship.requirements?.map((r, i) => (
                    <Pill key={i}>{r}</Pill>
                  ))}
                </PillGroup>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text fw={700}>Tags</Text>
                <PillGroup>
                  {selectedScholarship.tags?.map((t, i) => (
                    <Pill key={i}>{t}</Pill>
                  ))}
                </PillGroup>
              </Grid.Col>
            </Grid>
          </Stack>
        )}
      </Modal>

      {/* CREATE SCHOLARSHIP MODAL */}
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          setForm(INITIAL_FORM);
          setReqInput("");
          setTagInput("");
        }}
        title="Create Scholarship"
        size="xl"
        radius="lg"
      >
        <Stack>
          {submitError && (
            <Text c="red" size="sm" fw={500}>
              {submitError}
            </Text>
          )}
          {/* Assign to scholar */}
          <Select
            label="Assign to Scholar"
            placeholder="Select a scholar"
            data={scholars.map((s) => {
              return { value: s._id, label: s.name };
            })}
            value={form.scholarId}
            onChange={(value) => handleChange("scholarId", value)}
            searchable
            required
          />

          <Divider label="Basic Info" labelPosition="center" />

          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Title"
                placeholder="e.g. Fully Funded IT Scholarship"
                value={form.title}
                onChange={(e) => handleChange("title", e.currentTarget.value)}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Provider"
                placeholder="e.g. Government / UNZA"
                value={form.provider}
                onChange={(e) =>
                  handleChange("provider", e.currentTarget.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Category"
                placeholder="e.g. STEM / Arts / Business"
                value={form.category}
                onChange={(e) =>
                  handleChange("category", e.currentTarget.value)
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Level"
                placeholder="Select level"
                data={[
                  "Undergraduate",
                  "Masters",
                  "PhD",
                  "Diploma",
                  "Certificate",
                ]}
                value={form.level}
                onChange={(value) => handleChange("level", value)}
                required
              />
            </Grid.Col>
          </Grid>

          <Textarea
            label="Description"
            placeholder="Describe what the scholarship offers..."
            minRows={3}
            value={form.description}
            onChange={(e) => handleChange("description", e.currentTarget.value)}
            required
          />

          <Divider label="Location" labelPosition="center" />

          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Country"
                placeholder="e.g. Zambia"
                value={form.location.country}
                onChange={(e) =>
                  handleNested("location", "country", e.currentTarget.value)
                }
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="City"
                placeholder="e.g. Lusaka"
                value={form.location.city}
                onChange={(e) =>
                  handleNested("location", "city", e.currentTarget.value)
                }
              />
            </Grid.Col>
          </Grid>

          <Divider label="Benefits" labelPosition="center" />

          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Tuition"
                placeholder="e.g. Full / Partial"
                value={form.benefits.tuition}
                onChange={(e) =>
                  handleNested("benefits", "tuition", e.currentTarget.value)
                }
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Monthly Stipend (USD)"
                placeholder="e.g. 500"
                value={form.benefits.monthlyStipend}
                onChange={(value) =>
                  handleNested("benefits", "monthlyStipend", value)
                }
                min={0}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Switch
                label="Housing Provided"
                checked={form.benefits.housing}
                onChange={(e) =>
                  handleNested("benefits", "housing", e.currentTarget.checked)
                }
              />
            </Grid.Col>
          </Grid>

          <Divider label="Dates & URL" labelPosition="center" />

          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Deadline"
                type="date"
                value={form.deadline}
                onChange={(e) =>
                  handleChange("deadline", e.currentTarget.value)
                }
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Application URL"
                placeholder="https://..."
                value={form.applicationUrl}
                onChange={(e) =>
                  handleChange("applicationUrl", e.currentTarget.value)
                }
              />
            </Grid.Col>
          </Grid>

          <Divider label="Requirements" labelPosition="center" />

          <Group align="flex-end">
            <TextInput
              style={{ flex: 1 }}
              placeholder="Type a requirement and press + or Enter"
              value={reqInput}
              onChange={(e) => setReqInput(e.currentTarget.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                addToArray("requirements", reqInput, setReqInput)
              }
            />
            <ActionIcon
              variant="filled"
              onClick={() => addToArray("requirements", reqInput, setReqInput)}
            >
              <IconPlus size={16} />
            </ActionIcon>
          </Group>
          {form.requirements.length > 0 && (
            <PillGroup>
              {form.requirements.map((r, i) => (
                <Pill
                  key={i}
                  withRemoveButton
                  onRemove={() => removeFromArray("requirements", i)}
                >
                  {r}
                </Pill>
              ))}
            </PillGroup>
          )}

          <Divider label="Tags" labelPosition="center" />

          <Group align="flex-end">
            <TextInput
              style={{ flex: 1 }}
              placeholder="Type a tag and press + or Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.currentTarget.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && addToArray("tags", tagInput, setTagInput)
              }
            />
            <ActionIcon
              variant="filled"
              onClick={() => addToArray("tags", tagInput, setTagInput)}
            >
              <IconPlus size={16} />
            </ActionIcon>
          </Group>
          {form.tags.length > 0 && (
            <PillGroup>
              {form.tags.map((t, i) => (
                <Pill
                  key={i}
                  withRemoveButton
                  onRemove={() => removeFromArray("tags", i)}
                >
                  {t}
                </Pill>
              ))}
            </PillGroup>
          )}

          <Divider />

          <Switch
            label="Active (visible to scholars)"
            checked={form.isActive}
            onChange={(e) => handleChange("isActive", e.currentTarget.checked)}
          />

          <Button
            fullWidth
            radius="md"
            leftSection={<IconSchool size={18} />}
            onClick={handleSubmit}
          >
            Post Scholarship
          </Button>
        </Stack>
      </Modal>
    </Box>
  );
}

export default CreateScholarship;
