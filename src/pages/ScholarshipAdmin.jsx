import { useState, useEffect } from "react";
import {
  TextInput,
  Textarea,
  Button,
  Container,
  Paper,
  Title,
  Stack,
  Table,
  Badge,
  Modal,
  Group,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { scholarshipsAPI } from "../api";

function ScholarshipAdmin() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      type: "",
      organization: "",
      location: "",
      deadline: "",
      description: "",
      level: "",
      requirements: "",
    },
  });

  // Fetch scholarships on component mount
  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      const data = await scholarshipsAPI.getAll();
      setScholarships(data.scholarships ?? []);
    } catch (err) {
      console.error("Failed to fetch scholarships", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      await scholarshipsAPI.create(values);
      await fetchScholarships();
      form.reset();
      setOpened(false);
    } catch (err) {
      console.error("Failed to create scholarship", err);
      alert(err.message || "Failed to create scholarship");
    }
  };

  return (
    <Container size="lg" mt="xl">
      <Paper shadow="lg" radius="lg" p="xl" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={2} align="center">
            🎓 Add Scholarship
          </Title>
          <Button onClick={() => setOpened(true)}>Create New</Button>
        </Group>

        {/* CREATE SCHOLARSHIP MODAL */}
        <Modal
          opened={opened}
          onClose={() => {
            setOpened(false);
            form.reset();
          }}
          title="Create Scholarship"
          size="xl"
          radius="lg"
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                label="Scholarship Title"
                placeholder="e.g Fully Funded IT Scholarship"
                {...form.getInputProps("title")}
                required
              />

              <TextInput
                label="Organization"
                placeholder="e.g UNZA / Government"
                {...form.getInputProps("organization")}
                required
              />

              <TextInput
                label="Location"
                placeholder="e.g Zambia / International"
                {...form.getInputProps("location")}
                required
              />

              <TextInput
                label="Application Deadline"
                placeholder="e.g 30 June 2026"
                type="date"
                {...form.getInputProps("deadline")}
                required
              />

              <Textarea
                label="Description"
                placeholder="Explain what the scholarship offers..."
                minRows={3}
                {...form.getInputProps("description")}
                required
              />

              <Textarea
                label="Requirements"
                placeholder="List requirements..."
                minRows={3}
                {...form.getInputProps("requirements")}
                required
              />

              <Button type="submit" fullWidth radius="md" size="md">
                Add Scholarship
              </Button>
            </Stack>
          </form>
        </Modal>
      </Paper>

      {/* DISPLAY SECTION */}
      <Title order={3} mt="xl" mb="sm">
        📌 Posted Scholarships
      </Title>

      {loading ? (
        <Text>Loading scholarships...</Text>
      ) : (
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Organization</Table.Th>
              <Table.Th>Location</Table.Th>
              <Table.Th>Deadline</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {scholarships.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <Text c="dimmed" ta="center">No scholarships yet</Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              scholarships.map((item) => (
                <Table.Tr key={item._id}>
                  <Table.Td>{item.title}</Table.Td>
                  <Table.Td>{item.organization}</Table.Td>
                  <Table.Td>{item.location}</Table.Td>
                  <Table.Td>{item.deadline}</Table.Td>
                  <Table.Td>
                    <Badge color={item.isActive ? "green" : "gray"}>
                      {item.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>
      )}
    </Container>
  );
}

export default ScholarshipAdmin;