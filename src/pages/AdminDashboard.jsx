import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  AppShell,
  Burger,
  Group,
  NavLink,
  Text,
  Card,
  SimpleGrid,
  Table,
  Badge,
  Button,
  ThemeIcon,
  Stack,
  Title,
  Container,
  ScrollArea,
  Code,
  Box,
  Divider,
  Loader,
} from "@mantine/core";

import {
  IconGauge,
  IconUsers,
  IconSchool,
  IconPresentationAnalytics,
  IconBell,
  IconSettings,
  IconLogout,
  IconFileAnalytics,
  IconCalendarStats,
  IconNotes,
  IconAdjustments,
  IconLock,
  IconMail,
  IconChartBar,
} from "@tabler/icons-react";

import { LineChart, BarChart } from "@mantine/charts";

import { dashboardAPI } from "../api";
import "./Navbar.css";

/* ---------------- MOCK DATA ---------------- */

const navItems = [
  { label: "Overview", icon: IconGauge, path: "/admin/dashboard" },
  {
    label: "Scholarships",
    icon: IconSchool,
    path: "/admin/create-scholarship",
  },
  { label: "Users", icon: IconUsers, path: "/admin/users" },
  {
    label: "Analytics",
    icon: IconPresentationAnalytics,
    path: "/admin/analytics",
  },
  { label: "Reports", icon: IconFileAnalytics, path: "/admin/reports" },
  { label: "Messages", icon: IconMail, path: "/admin/messages" },
  { label: "Notifications", icon: IconBell, path: "/admin/notifications" },
  { label: "Settings", icon: IconSettings, path: "/admin/settings" },
  { label: "Security", icon: IconLock, path: "/admin/security" },
  { label: "Logout", icon: IconLogout, path: "/admin/logout" },
];

/* 📊 Chart Data */
const lineData = [
  { month: "Jan", users: 200, applications: 120 },
  { month: "Feb", users: 320, applications: 180 },
  { month: "Mar", users: 450, applications: 240 },
  { month: "Apr", users: 600, applications: 300 },
  { month: "May", users: 820, applications: 410 },
];

const barData = [
  { category: "Business", scholarships: 40 },
  { category: "STEM", scholarships: 70 },
  { category: "Arts", scholarships: 30 },
  { category: "Law", scholarships: 55 },
];

const activity = [
  "New user registered",
  "Scholarship application submitted",
  "Admin updated settings",
  "New message received",
];

function AdminDashboard() {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  console.log("user info", userInfo);
  const [opened, setOpened] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch dashboard stats
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await dashboardAPI.getStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    } finally {
      setLoading(false);
    }
  };

  // Use real data from API if available, otherwise use mock data
  const rows = stats?.recentScholarships || [
    {
      name: "Global Leaders Scholarship",
      level: "Undergraduate",
      field: "Business",
      status: "Published",
    },
    {
      name: "STEM Excellence Grant",
      level: "Graduate",
      field: "STEM",
      status: "Draft",
    },
    {
      name: "Africa Education Fund",
      level: "Undergraduate",
      field: "Open",
      status: "Published",
    },
  ];

  return (
    <AppShell
      padding="md"
      navbar={{ width: 280, breakpoint: "sm", collapsed: { mobile: !opened } }}
      header={{ height: 70 }}
    >
      {/* HEADER */}
      <AppShell.Header px="md">
        <Group justify="space-between" h="100%">
          <Group>
            <Burger
              opened={opened}
              onClick={() => setOpened(!opened)}
              hiddenFrom="sm"
              size="sm"
            />

            <Title order={3} c="blue">
              ScholarLink
            </Title>
          </Group>

          <Badge color="green" variant="light">
            {userInfo ? `Welcome, ${userInfo.firstName} ${userInfo.lastName}` : "System Online"}
          </Badge>
        </Group>
      </AppShell.Header>

      {/* SIDEBAR */}
      <AppShell.Navbar p="md">
        <Group justify="space-between" mb="md">
          <Text fw={700}>Admin Panel</Text>
          <Code>v2.0</Code>
        </Group>

        <ScrollArea style={{ flex: 1 }}>
          <Stack gap="xs">
            {navItems.map((item, i) => (
              <NavLink
                key={i}
                label={item.label}
                leftSection={<item.icon size={18} />}
                active={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              />
            ))}
          </Stack>
        </ScrollArea>

        <Divider my="md" />

        <Button size="sm" c="white" onClick={handleLogout} style={{cursor: "pointer"}} fullWidth leftSection={<IconLogout size={18} />}>
          Logout
        </Button>
        {/* <Text fw={600}>Super Admin</Text> */}
      </AppShell.Navbar>

      {/* MAIN */}
      <AppShell.Main>
        <Container fluid>
          {/* HEADER */}
          <Group justify="space-between" mb="xl">
            <div>
              <Title order={2}>Dashboard Overview</Title>
              <Text c="dimmed">
                Monitor system growth, users, and performance
              </Text>
            </div>

            <Button leftSection={<IconSchool size={18} />}>
              Create Scholarship
            </Button>
          </Group>

          {/* KPI CARDS */}
          {loading ? (
            <Group justify="center" p="xl">
              <Loader size="lg" />
            </Group>
          ) : (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mb="xl">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between">
                  <div>
                    <Text size="sm" c="dimmed">
                      Total Scholarships
                    </Text>
                    <Title order={2}>{stats?.totalScholarships || 0}</Title>
                  </div>

                  <ThemeIcon size={50} radius="md" color="blue">
                    <IconSchool size={28} />
                  </ThemeIcon>
                </Group>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between">
                  <div>
                    <Text size="sm" c="dimmed">
                      Applications
                    </Text>
                    <Title order={2}>{stats?.totalApplications || 0}</Title>
                  </div>

                  <ThemeIcon size={50} radius="md" color="green">
                    <IconChartBar size={28} />
                  </ThemeIcon>
                </Group>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between">
                  <div>
                    <Text size="sm" c="dimmed">
                      Users
                    </Text>
                    <Title order={2}>{stats?.totalUsers || 0}</Title>
                  </div>

                  <ThemeIcon size={50} radius="md" color="orange">
                    <IconUsers size={28} />
                  </ThemeIcon>
                </Group>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between">
                  <div>
                    <Text size="sm" c="dimmed">
                      Notifications
                    </Text>
                    <Title order={2}>{stats?.totalNotifications || 0}</Title>
                  </div>

                  <ThemeIcon size={50} radius="md" color="red">
                    <IconBell size={28} />
                  </ThemeIcon>
                </Group>
              </Card>
            </SimpleGrid>
          )}

          {/* CHARTS SECTION */}
          <SimpleGrid cols={{ base: 1, md: 2 }} mb="xl">
            <Card shadow="lg" radius="lg" p="lg" withBorder>
              <Group justify="space-between" mb="md">
                <Title order={4}>Growth Analytics</Title>
                <IconChartBar size={20} />
              </Group>

              <LineChart
                h={280}
                data={lineData}
                dataKey="month"
                series={[
                  { name: "users", color: "blue.6" },
                  { name: "applications", color: "green.6" },
                ]}
                curveType="natural"
              />
            </Card>

            <Card shadow="lg" radius="lg" p="lg" withBorder>
              <Group justify="space-between" mb="md">
                <Title order={4}>Scholarship Categories</Title>
                <IconChartBar size={20} />
              </Group>

              <BarChart
                h={280}
                data={barData}
                dataKey="category"
                series={[{ name: "scholarships", color: "violet.6" }]}
                tickLine="y"
              />
            </Card>
          </SimpleGrid>

          {/* TABLE */}
          <Card shadow="sm" radius="lg" p="lg" withBorder>
            <Group justify="space-between" mb="md">
              <Title order={4}>Recent Scholarships</Title>
              <Button variant="light">View All</Button>
            </Group>

            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Level</Table.Th>
                  <Table.Th>Field</Table.Th>
                  <Table.Th>Status</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {rows.map((r, i) => (
                  <Table.Tr key={i}>
                    <Table.Td>{r.name}</Table.Td>
                    <Table.Td>{r.level}</Table.Td>
                    <Table.Td>{r.field}</Table.Td>
                    <Table.Td>
                      <Badge
                        color={r.status === "Published" ? "green" : "yellow"}
                      >
                        {r.status}
                      </Badge>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>

          {/* ACTIVITY PANEL */}
          <Card shadow="sm" radius="lg" p="lg" withBorder>
            <Title order={4} mb="md">
              Recent Activity
            </Title>

            <Stack gap="xs">
              {activity.map((a, i) => (
                <Group key={i}>
                  <ThemeIcon size={10} radius="xl" color="blue" />
                  <Text size="sm">{a}</Text>
                </Group>
              ))}
            </Stack>
          </Card>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default AdminDashboard;
