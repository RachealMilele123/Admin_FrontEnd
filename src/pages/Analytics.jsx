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
  Loader,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { dashboardAPI } from "../api";

function Analytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch analytics data from API
  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await dashboardAPI.getStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch analytics", err);
    } finally {
      setLoading(false);
    }
  };

  const progressData = [
    { label: "Scholarships Filled", value: stats?.scholarshipFillRate || 70 },
    { label: "Internships Filled", value: stats?.internshipFillRate || 55 },
    { label: "User Engagement", value: stats?.userEngagement || 85 },
  ];

  return (
    <Container size="xl" py="lg">

      {/* HEADER */}
      <Group justify="space-between" mb="lg">
        <Title order={2}>Analytics Dashboard</Title>
        <Badge color="blue" size="lg">Live Overview</Badge>
      </Group>

      {/* KPI CARDS */}
      {loading ? (
        <Group justify="center" p="xl">
          <Loader size="lg" />
        </Group>
      ) : (
        <Grid mb="lg">
          <Grid.Col span={3}>
            <Card shadow="sm" padding="lg">
              <Text size="sm" c="dimmed">Users</Text>
              <Text size="xl" fw={700}>{stats?.totalUsers || 0}</Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={3}>
            <Card shadow="sm" padding="lg">
              <Text size="sm" c="dimmed">Scholarships</Text>
              <Text size="xl" fw={700}>{stats?.totalScholarships || 0}</Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={3}>
            <Card shadow="sm" padding="lg">
              <Text size="sm" c="dimmed">Internships</Text>
              <Text size="xl" fw={700}>{stats?.totalInternships || 0}</Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={3}>
            <Card shadow="sm" padding="lg">
              <Text size="sm" c="dimmed">Applications</Text>
              <Text size="xl" fw={700}>{stats?.totalApplications || 0}</Text>
            </Card>
          </Grid.Col>
        </Grid>
      )}

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