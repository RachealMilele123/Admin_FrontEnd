import { useState } from "react";
import {
  TextInput,
  Textarea,
  Button,
  Container,
  Paper,
  Title,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";

function ScholarshipAdmin() {
  const [scholarships, setScholarships] = useState([]);

  const form = useForm({
    initialValues: {
      title: "",
      type: "",
      organization: "",
      location: "",
      deadline: "",
      description: "",
      level : "",
      requirements: "",
    },
  });

  const handleSubmit = (values) => {
    setScholarships([...scholarships, values]);
    form.reset();
  };

  return (
    <Container size="sm" mt="xl">
      <Paper shadow="lg" radius="lg" p="xl" withBorder>
        <Title order={2} align="center" mb="md">
          🎓 Add Scholarship
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Scholarship Title"
              placeholder="e.g Fully Funded IT Scholarship"
              {...form.getInputProps("title")}
            />

            <TextInput
              label="Organization"
              placeholder="e.g UNZA / Government"
              {...form.getInputProps("organization")}
            />

            <TextInput
              label="Location"
              placeholder="e.g Zambia / International"
              {...form.getInputProps("location")}
            />

            <TextInput
              label="Application Deadline"
              placeholder="e.g 30 June 2026"
              {...form.getInputProps("deadline")}
            />

            <Textarea
              label="Description"
              placeholder="Explain what the scholarship offers..."
              minRows={3}
              {...form.getInputProps("description")}
            />

            <Textarea
              label="Requirements"
              placeholder="List requirements..."
              minRows={3}
              {...form.getInputProps("requirements")}
            />

            <Button type="submit" fullWidth radius="md" size="md">
              Add Scholarship
            </Button>
          </Stack>
        </form>
      </Paper>

      {/* DISPLAY SECTION */}
      <Title order={3} mt="xl" mb="sm">
        📌 Posted Scholarships
      </Title>

      {scholarships.map((item, index) => (
        <Paper key={index} shadow="sm" p="md" mb="sm" radius="md" withBorder>
          <Title order={4}>{item.title}</Title>
          <p><strong>{item.organization}</strong></p>
          <p>{item.location}</p>
          <p><strong>Deadline:</strong> {item.deadline}</p>
        </Paper>
      ))}
    </Container>
  );
}

export default ScholarshipAdmin;