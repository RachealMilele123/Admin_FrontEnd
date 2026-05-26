import {
  Box,
  Card,
  Container,
  Grid,
  Group,
  Select,
  Table,
  Text,
  Title,
  Badge,
  TextInput,
  Button,
  Stack,
} from "@mantine/core";
import { useState } from "react";

function Reports() {
  const [search, setSearch] = useState("");

  // Sample data (replace with API later)
  const reports = [
    { id: 1, title: "Scholarship Issue", user: "John Doe", status: "Pending", date: "2026-05-20" },
    { id: 2, title: "Login Bug", user: "Sarah Kim", status: "Resolved", date: "2026-05-18" },
    { id: 3, title: "Internship Error", user: "Mike Ross", status: "In Progress", date: "2026-05-17" },
  ];

  const filteredReports = reports.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container size="xl" py="lg">

      {/* HEADER */}
      <Group justify="space-between" mb="lg">
        <Title order={2}>Reports</Title>
        <Button color="blue">Export Reports</Button>
      </Group>

      {/* STATS CARDS */}
      <Grid mb="lg">
        <Grid.Col span={4}>
          <Card shadow="sm" padding="lg">
            <Text size="sm" c="dimmed">Total Reports</Text>
            <Text size="xl" fw={700}>{reports.length}</Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={4}>
          <Card shadow="sm" padding="lg">
            <Text size="sm" c="dimmed">Pending</Text>
            <Text size="xl" fw={700} c="orange">
              {reports.filter(r => r.status === "Pending").length}
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={4}>
          <Card shadow="sm" padding="lg">
            <Text size="sm" c="dimmed">Resolved</Text>
            <Text size="xl" fw={700} c="green">
              {reports.filter(r => r.status === "Resolved").length}
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      {/* FILTER SECTION */}
      <Card shadow="sm" mb="lg">
        <Group>
          <TextInput
            placeholder="Search reports..."
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            style={{ flex: 1 }}
          />

          <Select
            placeholder="Filter status"
            data={["All", "Pending", "In Progress", "Resolved"]}
            defaultValue="All"
          />

          <Button variant="light">Apply</Button>
        </Group>
      </Card>

      {/* TABLE */}
      <Card shadow="sm">
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>User</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Date</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {filteredReports.map((report) => (
              <Table.Tr key={report.id}>
                <Table.Td>{report.id}</Table.Td>
                <Table.Td>{report.title}</Table.Td>
                <Table.Td>{report.user}</Table.Td>
                <Table.Td>
                  <Badge
                    color={
                      report.status === "Resolved"
                        ? "green"
                        : report.status === "Pending"
                        ? "orange"
                        : "blue"
                    }
                  >
                    {report.status}
                  </Badge>
                </Table.Td>
                <Table.Td>{report.date}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

    </Container>
  );
}

export default Reports;