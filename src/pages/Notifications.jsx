import {
  Container,
  Card,
  Group,
  Text,
  Title,
  Badge,
  Stack,
  Button,
  Divider,
} from "@mantine/core";
import { useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New User Registered",
      message: "John Doe created a new account.",
      type: "User",
      status: "Unread",
      time: "2 mins ago",
    },
    {
      id: 2,
      title: "Scholarship Application",
      message: "A new scholarship application was submitted.",
      type: "Scholarship",
      status: "Unread",
      time: "1 hour ago",
    },
    {
      id: 3,
      title: "System Update",
      message: "System maintenance completed successfully.",
      type: "System",
      status: "Read",
      time: "Yesterday",
    },
  ]);

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({
      ...n,
      status: "Read",
    }));
    setNotifications(updated);
  };

  return (
    <Container size="md" py="lg">

      {/* HEADER */}
      <Group justify="space-between" mb="lg">
        <Title order={2}>Notifications</Title>
        <Button variant="light" onClick={markAllAsRead}>
          Mark all as read
        </Button>
      </Group>

      {/* LIST */}
      <Card shadow="sm">
        <Stack>

          {notifications.map((n) => (
            <div key={n.id}>
              <Group justify="space-between" align="flex-start">

                <div>
                  <Group>
                    <Text fw={600}>{n.title}</Text>

                    <Badge
                      color={
                        n.type === "User"
                          ? "blue"
                          : n.type === "Scholarship"
                          ? "green"
                          : "gray"
                      }
                    >
                      {n.type}
                    </Badge>

                    <Badge
                      color={n.status === "Unread" ? "red" : "green"}
                    >
                      {n.status}
                    </Badge>
                  </Group>

                  <Text size="sm" c="dimmed">
                    {n.message}
                  </Text>
                </div>

                <Text size="xs" c="dimmed">
                  {n.time}
                </Text>

              </Group>

              <Divider my="sm" />
            </div>
          ))}

        </Stack>
      </Card>

    </Container>
  );
}

export default Notifications;
