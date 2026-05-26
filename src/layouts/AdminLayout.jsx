import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import {
  AppShell,
  Burger,
  Group,
  NavLink,
  Text,
  Title,
  ScrollArea,
  Stack,
  Divider,
  Code,
  Badge,
} from "@mantine/core";

import {
  IconGauge,
  IconUsers,
  IconSchool,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconMail,
  IconBell,
  IconSettings,
  IconLock,
  IconLogout,
} from "@tabler/icons-react";

const navItems = [
  { label: "Overview", icon: IconGauge, path: "/admin/dashboard" },
  { label: "Scholarships", icon: IconSchool, path: "/admin/create-scholarship" },
  { label: "Users", icon: IconUsers, path: "/admin/users" },
  { label: "Analytics", icon: IconPresentationAnalytics, path: "/admin/analytics" },
  { label: "Reports", icon: IconFileAnalytics, path: "/admin/reports" },
  { label: "Messages", icon: IconMail, path: "/admin/messages" },
  { label: "Notifications", icon: IconBell, path: "/admin/notifications" },
  { label: "Settings", icon: IconSettings, path: "/admin/settings" },
  { label: "Security", icon: IconLock, path: "/admin/security" },
  { label: "Logout", icon: IconLogout, path: "/admin/logout" },
];

function AdminLayout() {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 280,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      {/* HEADER */}
      <AppShell.Header>
        <Group justify="space-between" p="md">
          <Group>
            <Burger
              opened={opened}
              onClick={() => setOpened(!opened)}
              hiddenFrom="sm"
              size="sm"
            />
            <Title order={3} c="blue">
              ScholarLink Admin
            </Title>
          </Group>

          <Badge color="green">System Online</Badge>
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

        <Text size="sm" c="dimmed">
          Logged in as
        </Text>
        <Text fw={600}>Super Admin</Text>
      </AppShell.Navbar>

      {/* MAIN CONTENT (THIS IS THE MAGIC) */}
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default AdminLayout;