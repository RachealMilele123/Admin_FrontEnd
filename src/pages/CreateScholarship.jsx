import { useState } from "react";

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
  FileInput,
  Divider,
  Grid,
  Box,
} from "@mantine/core";

import { IconPlus, IconEye, IconFileCv, IconSchool } from "@tabler/icons-react";
import { API_URL } from "../api";

function CreateScholarship() {
  const [opened, setOpened] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
  });

  const [scholarships, setScholarships] = useState([
    {
      id: 1,
      title: "Global STEM Excellence",
      category: "STEM",
      type: "Undergraduate",
      organization: "UNESCO",
      location: "Canada",
      deadline: "2026-08-10",
      status: "Open",
      description: "Scholarship for outstanding STEM students worldwide.",
    },
    {
      id: 2,
      title: "Africa Leadership Grant",
      category: "Business",
      type: "Masters",
      organization: "African Union",
      location: "South Africa",
      deadline: "2026-09-15",
      status: "Open",
      description: "Leadership and entrepreneurship scholarship program.",
    },
  ]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleCreateScholarship = async () => {
    try {
      const res = await fetch(`${API_URL}/scholars/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      console.log("response", res);

      if (!res.ok) {
        console.error("Failed to create scholarship");
        return;
      }
    } catch (error) {
      console.log(error);
    }

    // const newScholarship = {
    //   id: scholarships.length + 1,
    //   ...form,
    //   status: "Open",
    // };

    // setScholarships([...scholarships, newScholarship]);

    setForm({
      title: "",
      category: "",
      description: "",
    });

    setOpened(false);
  };

  return (
    <Box
      style={{
        padding: "30px",
        background: "#f4f7fb",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2}>Scholarships Management</Title>

          <Text c="dimmed">
            Manage all posted scholarships and opportunities
          </Text>
        </div>

        <Button
          leftSection={<IconPlus size={18} />}
          onClick={() => setOpened(true)}
          radius="md"
        >
          Create Scholarship
        </Button>
      </Group>

      {/* SCHOLARSHIP TABLE */}
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
              <Table.Th>Category</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Organization</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {scholarships.map((scholarship) => (
              <Table.Tr key={scholarship.id}>
                <Table.Td>{scholarship.title}</Table.Td>

                <Table.Td>
                  <Badge color="violet">{scholarship.category}</Badge>
                </Table.Td>

                <Table.Td>{scholarship.type}</Table.Td>

                <Table.Td>{scholarship.organization}</Table.Td>

                <Table.Td>
                  <Badge color="green">{scholarship.status}</Badge>
                </Table.Td>

                <Table.Td>
                  <Button
                    size="xs"
                    variant="light"
                    leftSection={<IconEye size={14} />}
                    onClick={() => setSelectedScholarship(scholarship)}
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
                <Text fw={700}>Category</Text>
                <Text>{selectedScholarship.category}</Text>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text fw={700}>Type</Text>
                <Text>{selectedScholarship.type}</Text>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text fw={700}>Organization</Text>
                <Text>{selectedScholarship.organization}</Text>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text fw={700}>Location</Text>
                <Text>{selectedScholarship.location}</Text>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text fw={700}>Deadline</Text>
                <Text>{selectedScholarship.deadline}</Text>
              </Grid.Col>

              <Grid.Col span={12}>
                <Text fw={700}>Description</Text>
                <Text>{selectedScholarship.description}</Text>
              </Grid.Col>
            </Grid>
          </Stack>
        )}
      </Modal>

      {/* CREATE SCHOLARSHIP MODAL */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create Scholarship"
        size="lg"
        radius="lg"
      >
        <Stack>
          <TextInput
            label="Scholarship Title"
            placeholder="Enter scholarship title"
            value={form.name}
            onChange={(e) => handleChange("name", e.currentTarget.value)}
          />

          <Grid>
            <Grid.Col span={12}>
              <TextInput
                label="Category"
                placeholder="category e.g STEM / Business / Arts"
                value={form.category}
                onChange={(e) =>
                  handleChange("category", e.currentTarget.value)
                }
              />
            </Grid.Col>

            {/* <Grid.Col span={6}>
              <Select
                label="Type"
                placeholder="Select type"
                value={form.type}
                onChange={(value) =>
                  handleChange("type", value)
                }
                data={[
                  "Undergraduate",
                  "Masters",
                  "PhD",
                  "Diploma",
                ]}
              />
            </Grid.Col> */}
          </Grid>

          {/* <TextInput
            label="Organization"
            placeholder="Enter organization"
            value={form.organization}
            onChange={(e) =>
              handleChange("organization", e.currentTarget.value)
            }
          /> */}

          <Grid>
            {/* <Grid.Col span={6}>
              <TextInput
                label="Location"
                placeholder="Enter location"
                value={form.location}
                onChange={(e) =>
                  handleChange("location", e.currentTarget.value)
                }
              />
            </Grid.Col> */}

            {/* <Grid.Col span={6}>
              <TextInput
                label="Deadline"
                type="date"
                value={form.deadline}
                onChange={(e) =>
                  handleChange("deadline", e.currentTarget.value)
                }
              />
            </Grid.Col> */}
          </Grid>

          <Textarea
            label="Description"
            placeholder="Enter scholarship details"
            minRows={4}
            value={form.description}
            onChange={(e) => handleChange("description", e.currentTarget.value)}
          />

          {/* ATTACHMENTS */}
          {/* <FileInput
            label="CV / Resume Attachment"
            placeholder="Upload file"
            leftSection={<IconFileCv size={16} />}
            value={form.attachment}
            onChange={(file) =>
              handleChange("attachment", file)
            }
          /> */}

          <Button
            fullWidth
            radius="md"
            leftSection={<IconSchool size={18} />}
            onClick={handleCreateScholarship}
          >
            Post Scholarship
          </Button>
        </Stack>
      </Modal>
    </Box>
  );
}

export default CreateScholarship;
