import {
  IconAdjustments,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconNotes,
  IconPresentationAnalytics,
} from "@tabler/icons-react";

import {
  Code,
  Group,
  ScrollArea,
  Text,
  Burger,
} from "@mantine/core";

import { useState } from "react";

import "./Navbar.css";

const mockdata = [
  { label: "Dashboard", icon: IconGauge },
  { label: "Market news", icon: IconNotes },
  { label: "Releases", icon: IconCalendarStats },
  { label: "Analytics", icon: IconPresentationAnalytics },
  { label: "Contracts", icon: IconFileAnalytics },
  { label: "Settings", icon: IconAdjustments },
  { label: "Security", icon: IconLock },
];

function AdminDashboard() {
  const [opened, setOpened] = useState(false);

  const links = mockdata.map((item) => (
    <div key={item.label} className="link">
      <item.icon className="linkIcon" stroke={1.5} />
      <span>{item.label}</span>
    </div>
  ));

  return (
    <div>

      {/* TOP HEADER */}
      <div className="topbar">
        <Group justify="Flex-start">

          <Text fw={700} size="lg">
            Admin Panel
          </Text>

          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            size="sm"
          />
        </Group>
      </div>

      {/* NAVBAR */}
      <nav className={`navbar ${opened ? "show" : ""}`}>

        {/* HEADER */}
        <div className="header">
          <Group justify="space-between">
            <Text fw={700} size="lg">
              Dashboard
            </Text>

            <Code fw={700}>v1.0.0</Code>
          </Group>
        </div>

        {/* LINKS */}
        <ScrollArea className="links">
          <div className="linksInner">{links}</div>
        </ScrollArea>

        {/* FOOTER */}
        <div className="footer">
          <Text size="sm">Logged in as Admin</Text>
        </div>

      </nav>
    </div>
  );
}

export default AdminDashboard;