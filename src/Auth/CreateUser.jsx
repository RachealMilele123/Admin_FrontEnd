import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  TextInput,
  PasswordInput,
  Select,
  Button,
  Title,
  Group,
  Stack,
  Notification,
  Text,
  Divider,
  ThemeIcon,
  Box,
} from "@mantine/core";

import {
  IconUserPlus,
  IconMail,
  IconPhone,
  IconLock,
  IconUser,
} from "@tabler/icons-react";

function CreateUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setMessage(null);

      const res = await fetch("http://localhost:8000/api/auth/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create user");
      }

      setMessage({
        type: "success",
        text: "User created successfully!",
      });

      setTimeout(() => {
        navigate("/admin/users");
      }, 1200);

    } catch (err) {
      setMessage({
        type: "error",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <Card
        shadow="xl"
        radius="xl"
        p="xl"
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "#ffffff",
          border: "1px solid #e9ecef",
        }}
      >
        {/* HEADER */}
        <Group mb="lg">
          <ThemeIcon
            size={55}
            radius="xl"
            variant="light"
            color="blue"
          >
            <IconUserPlus size={28} />
          </ThemeIcon>

          <div>
            <Title order={2}>
              Create User
            </Title>

            <Text c="dimmed" size="sm">
              Add a new admin or platform user
            </Text>
          </div>
        </Group>

        <Divider mb="xl" />

        {/* FORM */}
        <Stack gap="md">

          {/* NAMES */}
          <Group grow>
            <TextInput
              label="First Name"
              placeholder="Enter first name"
              value={form.firstName}
              onChange={(e) =>
                handleChange("firstName", e.currentTarget.value)
              }
              radius="md"
              leftSection={<IconUser size={16} />}
            />

            <TextInput
              label="Last Name"
              placeholder="Enter last name"
              value={form.lastName}
              onChange={(e) =>
                handleChange("lastName", e.currentTarget.value)
              }
              radius="md"
              leftSection={<IconUser size={16} />}
            />
          </Group>

          {/* EMAIL */}
          <TextInput
            label="Email Address"
            placeholder="example@email.com"
            value={form.email}
            onChange={(e) =>
              handleChange("email", e.currentTarget.value)
            }
            radius="md"
            leftSection={<IconMail size={16} />}
          />

          {/* PHONE */}
          <TextInput
            label="Phone Number"
            placeholder="+260..."
            value={form.phoneNumber}
            onChange={(e) =>
              handleChange("phoneNumber", e.currentTarget.value)
            }
            radius="md"
            leftSection={<IconPhone size={16} />}
          />

          {/* PASSWORD */}
          <PasswordInput
            label="Password"
            placeholder="Enter secure password"
            value={form.password}
            onChange={(e) =>
              handleChange("password", e.currentTarget.value)
            }
            radius="md"
            leftSection={<IconLock size={16} />}
          />

          {/* ROLE */}
          <Select
            label="User Role"
            value={form.role}
            onChange={(value) =>
              handleChange("role", value)
            }
            radius="md"
            data={[
              { value: "BIT Admin", label: "BIT Admin" },
              { value: "BSS Admin", label: "BSS Admin" },
              { value: "SOM Admin", label: "SOM Admin" },
            ]}
          />

          {/* ALERT */}
          {message && (
            <Notification
              color={message.type === "success" ? "green" : "red"}
              radius="md"
            >
              {message.text}
            </Notification>
          )}

          {/* ACTION BUTTONS */}
          <Group grow mt="md">

            <Button
              variant="default"
              radius="md"
              size="md"
              onClick={() => navigate("/admin/users")}
            >
              Cancel
            </Button>

            <Button
              loading={loading}
              radius="md"
              size="md"
              onClick={handleSubmit}
              style={{
                background: "#228be6",
              }}
            >
              Create User
            </Button>

          </Group>

        </Stack>
      </Card>
    </Box>
  );
}

export default CreateUser;