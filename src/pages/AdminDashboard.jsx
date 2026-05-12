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
} from "@mantine/core";

import {
  IconHome,
  IconUsers,
  IconBell,
  IconSettings,
  IconChartBar,
  IconMail,
  IconLogout,
  IconSchool,
  IconGauge,
  IconCalendarStats,
  IconFileAnalytics,
  IconPresentationAnalytics,
  IconAdjustments,
  IconLock,
  IconNotes,
} from "@tabler/icons-react";

import "./Navbar.css";

const navItems = [
  { label: "Dashboard", icon: IconGauge },
  { label: "Scholarships", icon: IconSchool },
  { label: "Users", icon: IconUsers },
  { label: "Analytics", icon: IconPresentationAnalytics },
  { label: "Emails", icon: IconMail },
  { label: "Notifications", icon: IconBell },
  { label: "Reports", icon: IconFileAnalytics },
  { label: "Releases", icon: IconCalendarStats },
  { label: "News", icon: IconNotes },
  { label: "Settings", icon: IconAdjustments },
  { label: "Security", icon: IconLock },
  { label: "Logout", icon: IconLogout },
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
      navbar={{
        width: 280,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      header={{ height: 70 }}
    >
      {/* HEADER */}
      <AppShell.Header px="md">
        <Group h="100%" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={() => setOpened(!opened)}
              hiddenFrom="sm"
              size="sm"
            />

            <Title order={3} c="blue">
              Scholar Link Admin
            </Title>
          </Group>

          <Text fw={600}>Welcome, Admin</Text>
        </Group>
      </AppShell.Header>

      {/* SIDEBAR */}
      <AppShell.Navbar p="md">
        <Group justify="space-between" mb="lg">
          <Text fw={700} size="lg">
            Dashboard
          </Text>

          <Code fw={700}>v1.0.0</Code>
        </Group>

        <ScrollArea style={{ flex: 1 }}>
          <Stack gap="xs">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                label={item.label}
                leftSection={<item.icon size={18} stroke={1.5} />}
                active={item.label === "Dashboard"}
                variant="filled"
                color="blue"
                className="custom-navlink"
              />
            ))}
          </Stack>
        </ScrollArea>

        <Box mt="md">
          <Text size="sm" c="dimmed">
            Logged in as
          </Text>

          <Text fw={600}>Administrator</Text>
        </Box>
      </AppShell.Navbar>

      {/* MAIN CONTENT */}
      <AppShell.Main>
        <Container fluid>
          {/* PAGE TITLE */}
          <Group justify="space-between" mb="xl">
            <div>
              <Title order={2}>Admin Overview</Title>

              <Text c="dimmed">
                Manage scholarships, users, analytics and notifications
              </Text>
            </div>

            <Button leftSection={<IconSchool size={18} />}>
              Add Scholarship
            </Button>
          </Group>

          {/* STATS */}
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mb="xl">
            <Card shadow="sm" padding="lg" radius="lg" withBorder>
              <Group justify="space-between">
                <div>
                  <Text size="sm" c="dimmed">
                    Total Scholarships
                  </Text>

                  <Title order={2}>128</Title>
                </div>

                <ThemeIcon size={55} radius="xl" color="blue">
                  <IconSchool size={28} />
                </ThemeIcon>
              </Group>
            </Card>

            <Card shadow="sm" padding="lg" radius="lg" withBorder>
              <Group justify="space-between">
                <div>
                  <Text size="sm" c="dimmed">
                    Applications
                  </Text>

                  <Title order={2}>356</Title>
                </div>

                <ThemeIcon size={55} radius="xl" color="green">
                  <IconChartBar size={28} />
                </ThemeIcon>
              </Group>
            </Card>

            <Card shadow="sm" padding="lg" radius="lg" withBorder>
              <Group justify="space-between">
                <div>
                  <Text size="sm" c="dimmed">
                    Users
                  </Text>

                  <Title order={2}>1,250</Title>
                </div>

                <ThemeIcon size={55} radius="xl" color="orange">
                  <IconUsers size={28} />
                </ThemeIcon>
              </Group>
            </Card>

            <Card shadow="sm" padding="lg" radius="lg" withBorder>
              <Group justify="space-between">
                <div>
                  <Text size="sm" c="dimmed">
                    Notifications
                  </Text>

                  <Title order={2}>85</Title>
                </div>

                <ThemeIcon size={55} radius="xl" color="red">
                  <IconBell size={28} />
                </ThemeIcon>
              </Group>
            </Card>
          </SimpleGrid>

          {/* TABLE */}
          <Card shadow="sm" padding="lg" radius="lg" withBorder>
            <Group justify="space-between" mb="md">
              <Title order={4}>Recent Scholarships</Title>

              <Button variant="light">View All</Button>
            </Group>

            <Table striped highlightOnHover verticalSpacing="md">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Level</Table.Th>
                  <Table.Th>Field</Table.Th>
                  <Table.Th>Status</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {rows.map((row, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>{row.name}</Table.Td>

                    <Table.Td>{row.level}</Table.Td>

                    <Table.Td>{row.field}</Table.Td>

                    <Table.Td>
                      <Badge
                        color={
                          row.status === "Published"
                            ? "green"
                            : "yellow"
                        }
                        variant="light"
                      >
                        {row.status}
                      </Badge>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default AdminDashboard;