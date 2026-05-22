import { useState } from "react";
import {
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Alert,
  Container,
  Group,
  ThemeIcon,
  Divider,
  Box,
  rem,
} from "@mantine/core";

import {
  IconAlertCircle,
  IconShieldLock,
  IconMail,
  IconLock,
} from "@tabler/icons-react";

import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    // Demo credentials
    const adminEmail = "admin@scholarlink.com";
    const adminPassword = "12345";

    setTimeout(() => {
      if (email === adminEmail && password === adminPassword) {
        localStorage.setItem("admin", "true");

        // Redirect to Admin Dashboard
        navigate("/admin");
      } else {
        setError("Invalid email or password");
      }

      setLoading(false);
    }, 1200);
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #020617 0%, #0f172a 40%, #2563eb 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(59,130,246,0.25)",
          filter: "blur(120px)",
          top: "-100px",
          right: "-100px",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(37,99,235,0.2)",
          filter: "blur(100px)",
          bottom: "-100px",
          left: "-100px",
        }}
      />

      <Container size={430}>

        <Paper
          radius={24}
          p={40}
          shadow="xl"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >

          {/* Logo/Icon */}
          <Group justify="center" mb={25}>
            <ThemeIcon
              size={85}
              radius="xl"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 135 }}
            >
              <IconShieldLock style={{ width: rem(45), height: rem(45) }} />
            </ThemeIcon>
          </Group>

          {/* Title */}
          <Title
            ta="center"
            style={{
              color: "white",
              fontSize: "34px",
              fontWeight: 800,
              letterSpacing: "-1px",
            }}
          >
            ScholarLink
          </Title>

          <Text
            ta="center"
            size="sm"
            mt={5}
            mb={25}
            style={{
              color: "rgba(255,255,255,0.75)",
            }}
          >
            Administrator Authentication Portal
          </Text>

          <Divider
            mb="lg"
            color="rgba(255,255,255,0.15)"
          />

          {/* Error Alert */}
          {error && (
            <Alert
              icon={<IconAlertCircle size={18} />}
              color="red"
              radius="md"
              mb="md"
              variant="light"
            >
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleLogin}>
            <Stack spacing="md">

              <TextInput
                label={
                  <Text size="sm" fw={500} c="white">
                    Admin Email
                  </Text>
                }
                placeholder="admin@scholarlink.com"
                size="md"
                radius="md"
                leftSection={<IconMail size={18} />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                styles={{
                  input: {
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "white",
                  },
                }}
              />

              <PasswordInput
                label={
                  <Text size="sm" fw={500} c="white">
                    Password
                  </Text>
                }
                placeholder="Enter password"
                size="md"
                radius="md"
                leftSection={<IconLock size={18} />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                styles={{
                  input: {
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "white",
                  },
                }}
              />

              <Button
                type="submit"
                size="md"
                radius="md"
                fullWidth
                loading={loading}
                mt="sm"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan", deg: 90 }}
                style={{
                  height: "48px",
                  fontSize: "16px",
                  fontWeight: 700,
                  transition: "0.3s ease",
                }}
              >
                Access Dashboard
              </Button>

            </Stack>
          </form>

          {/* Footer */}
          <Text
            ta="center"
            size="xs"
            mt={30}
            style={{
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Protected • Secure • ScholarLink Admin System
          </Text>

        </Paper>
      </Container>
    </Box>
  );
}

export default AdminLogin;