import { useState } from "react";

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

import "./Navbar.css";

/* ---------------- MOCK DATA ---------------- */

const navItems = [
  { label: "Overview", icon: IconGauge },
  { label: "Scholarships", icon: IconSchool },
  { label: "Users", icon: IconUsers },
  { label: "Analytics", icon: IconPresentationAnalytics },
  { label: "Reports", icon: IconFileAnalytics },
  { label: "Messages", icon: IconMail },
  { label: "Notifications", icon: IconBell },
  { label: "Settings", icon: IconSettings },
  { label: "Security", icon: IconLock },
  { label: "Logout", icon: IconLogout },
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
  const [opened, setOpened] = useState(false);

  const rows = [
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
            System Online
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
                active={item.label === "Overview"}
              />
            ))}
          </Stack>
        </ScrollArea>

        <Divider my="md" />

        <Text size="sm" c="dimmed">
          Logged in as
        </Text>
        <Text fw={600}>Super Admin</Text>
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
           <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mb="xl">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text size="sm" c="dimmed">
                    Total Scholarships
                  </Text>
                  <Title order={2}>128</Title>
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
                  <Title order={2}>356</Title>
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
                  <Title order={2}>1,250</Title>
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
                  <Title order={2}>85</Title>
                </div>

                <ThemeIcon size={50} radius="md" color="red">
                  <IconBell size={28} />
                </ThemeIcon>
              </Group>
            </Card>
          </SimpleGrid>

          {/* CHARTS SECTION (🔥 PREMIUM LOOK) */}
          <SimpleGrid cols={{ base: 1, md: 2 }} mb="xl">

            {/* LINE CHART */}
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

            {/* BAR CHART */}
            <Card shadow="lg" radius="lg" p="lg" withBorder>
              <Group justify="space-between" mb="md">
                <Title order={4}>Scholarship Categories</Title>
                <IconChartBar size={20} />
              </Group>

              <BarChart
                h={280}
                data={barData}
                dataKey="category"
                series={[
                  { name: "scholarships", color: "violet.6" },
                ]}
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
                      <Badge color={r.status === "Published" ? "green" : "yellow"}>
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