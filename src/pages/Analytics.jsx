import {
  Card,
  Container,
  Grid,
  Group,
  Text,
  Title,
  Stack,
  Badge,
  Progress,
  Divider,
} from "@mantine/core";

function Analytics() {
  // Dummy data (replace with API later)
  const stats = {
    users: 120,
    scholarships: 45,
    internships: 30,
    reports: 18,
  };

  const progressData = [
    { label: "Scholarships Filled", value: 70 },
    { label: "Internships Filled", value: 55 },
    { label: "User Engagement", value: 85 },
  ];

  return (
    <Container size="xl" py="lg">

      {/* HEADER */}
      <Group justify="space-between" mb="lg">
        <Title order={2}>Analytics Dashboard</Title>
        <Badge color="blue" size="lg">Live Overview</Badge>
      </Group>

      {/* KPI CARDS */}
      <Grid mb="lg">
        <Grid.Col span={3}>
          <Card shadow="sm" padding="lg">
            <Text size="sm" c="dimmed">Users</Text>
            <Text size="xl" fw={700}>{stats.users}</Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={3}>
          <Card shadow="sm" padding="lg">
            <Text size="sm" c="dimmed">Scholarships</Text>
            <Text size="xl" fw={700}>{stats.scholarships}</Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={3}>
          <Card shadow="sm" padding="lg">
            <Text size="sm" c="dimmed">Internships</Text>
            <Text size="xl" fw={700}>{stats.internships}</Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={3}>
          <Card shadow="sm" padding="lg">
            <Text size="sm" c="dimmed">Reports</Text>
            <Text size="xl" fw={700}>{stats.reports}</Text>
          </Card>
        </Grid.Col>
      </Grid>

      {/* PROGRESS ANALYTICS */}
      <Card shadow="sm" mb="lg">
        <Title order={4} mb="md">System Performance</Title>

        <Stack gap="md">
          {progressData.map((item, index) => (
            <div key={index}>
              <Group justify="space-between">
                <Text size="sm">{item.label}</Text>
                <Text size="sm" c="dimmed">{item.value}%</Text>
              </Group>
              <Progress value={item.value} size="sm" />
            </div>
          ))}
        </Stack>
      </Card>

      {/* ACTIVITY SUMMARY */}
      <Card shadow="sm">
        <Title order={4} mb="md">Activity Summary</Title>

        <Stack gap="sm">
          <Text>🟢 New user registrations increasing steadily</Text>
          <Divider />
          <Text>🟡 Scholarship applications are moderate this week</Text>
          <Divider />
          <Text>🔵 Internship postings remain stable</Text>
          <Divider />
          <Text>🔴 Reports are slightly higher than last week</Text>
        </Stack>
      </Card>

    </Container>
  );
}

export default Analytics;