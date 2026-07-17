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
  Loader,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { notificationsAPI } from "../api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications from API
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationsAPI.getAll();
      setNotifications(data.notifications ?? []);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      // Mark all notifications as read
      const markPromises = notifications.map((n) => notificationsAPI.markAsRead(n._id));
      await Promise.all(markPromises);
      // Refresh notifications
      await fetchNotifications();
    } catch (err) {
      console.error("Failed to mark notifications as read", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await notificationsAPI.markAsRead(id);
      // Update local state
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, status: "Read" } : n))
      );
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
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
          {loading ? (
            <Group justify="center" p="xl">
              <Loader />
            </Group>
          ) : notifications.length === 0 ? (
            <Text c="dimmed" ta="center" py="md">
              No notifications yet
            </Text>
          ) : (
            notifications.map((n) => (
              <div key={n._id || n.id}>
                <Group justify="space-between" align="flex-start">
                  <div style={{ flex: 1 }}>
                    <Group>
                      <Text fw={600}>{n.title}</Text>

                      <Badge
                        color={
                          n.type === "User"
                            ? "blue"
                            : n.type === "Scholarship"
                            ? "green"
                            : n.type === "System"
                            ? "gray"
                            : "blue"
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

                  <Group gap="xs">
                    {n.status === "Unread" && (
                      <Button
                        size="xs"
                        variant="light"
                        onClick={() => markAsRead(n._id || n.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                    <Text size="xs" c="dimmed">
                      {n.createdAt
                        ? new Date(n.createdAt).toLocaleDateString()
                        : n.time || "—"}
                    </Text>
                  </Group>
                </Group>

                <Divider my="sm" />
              </div>
            ))
          )}
        </Stack>
      </Card>

    </Container>
  );
}

export default Notifications;
