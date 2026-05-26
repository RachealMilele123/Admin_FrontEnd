import {
  Container,
  Card,
  Grid,
  Group,
  Text,
  Title,
  Stack,
  TextInput,
  Badge,
  Divider,
  Button,
  Textarea,
} from "@mantine/core";
import { useState } from "react";

function Messages() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [search, setSearch] = useState("");

  // Dummy messages (replace with API later)
  const messages = [
    {
      id: 1,
      sender: "John Doe",
      subject: "Scholarship Issue",
      message: "I am facing issues applying for scholarships...",
      status: "Unread",
      date: "2026-05-24",
    },
    {
      id: 2,
      sender: "Sarah Kim",
      subject: "Internship Inquiry",
      message: "Can I apply for multiple internships at once?",
      status: "Read",
      date: "2026-05-23",
    },
    {
      id: 3,
      sender: "Mike Ross",
      subject: "Account Problem",
      message: "I cannot log into my account dashboard.",
      status: "Unread",
      date: "2026-05-22",
    },
  ];

  const filteredMessages = messages.filter(
    (m) =>
      m.sender.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container size="xl" py="lg">

      {/* HEADER */}
      <Group justify="space-between" mb="lg">
        <Title order={2}>Messages</Title>
      </Group>

      {/* SEARCH */}
      <TextInput
        placeholder="Search messages..."
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="lg"
      />

      <Grid>

        {/* MESSAGE LIST */}
        <Grid.Col span={4}>
          <Card shadow="sm">
            <Stack>
              {filteredMessages.map((msg) => (
                <Card
                  key={msg.id}
                  withBorder
                  p="sm"
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedMessage?.id === msg.id ? "#f1f3f5" : "white",
                  }}
                  onClick={() => setSelectedMessage(msg)}
                >
                  <Group justify="space-between">
                    <Text fw={600}>{msg.sender}</Text>
                    <Badge color={msg.status === "Unread" ? "red" : "green"}>
                      {msg.status}
                    </Badge>
                  </Group>

                  <Text size="sm" fw={500}>
                    {msg.subject}
                  </Text>

                  <Text size="xs" c="dimmed">
                    {msg.date}
                  </Text>
                </Card>
              ))}
            </Stack>
          </Card>
        </Grid.Col>

        {/* MESSAGE VIEW */}
        <Grid.Col span={8}>
          <Card shadow="sm" h="100%">
            {selectedMessage ? (
              <Stack>
                <Group justify="space-between">
                  <Title order={4}>{selectedMessage.subject}</Title>
                  <Badge>{selectedMessage.status}</Badge>
                </Group>

                <Text fw={500}>From: {selectedMessage.sender}</Text>
                <Text size="sm" c="dimmed">
                  {selectedMessage.date}
                </Text>

                <Divider />

                <Text>{selectedMessage.message}</Text>

                <Divider />

                {/* REPLY BOX (UI ONLY) */}
                <Textarea
                  placeholder="Write a reply..."
                  minRows={4}
                />

                <Group justify="flex-end">
                  <Button>Send Reply</Button>
                </Group>
              </Stack>
            ) : (
              <Text c="dimmed">Select a message to view details</Text>
            )}
          </Card>
        </Grid.Col>

      </Grid>
    </Container>
  );
}

export default Messages;