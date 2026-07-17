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
import { authAPI } from "../api";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      // Call the admin login API
      const data = await authAPI.adminLogin(email, password);

      console.log("Admin login response:", data);

      // Check if the response contains admin data
      if (data.admin || data.user) {
        // Save JWT token
        localStorage.setItem("token", data.token);
        
        // Save user/admin info
        const userData = data.admin || data.user;
        localStorage.setItem("user", JSON.stringify(userData));

        // Redirect to Admin Dashboard
        navigate("/admin/dashboard");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(37,99,235,0.1) 50%, transparent 70%)",
          filter: "blur(80px)",
          top: "-200px",
          right: "-200px",
          animation: "float 8s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.25) 0%, rgba(59,130,246,0.1) 50%, transparent 70%)",
          filter: "blur(100px)",
          bottom: "-150px",
          left: "-150px",
          animation: "float 10s ease-in-out infinite reverse",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
          filter: "blur(60px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "pulse 4s ease-in-out infinite",
        }}
      />

      {/* Grid Pattern Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          pointerEvents: "none",
        }}
      />

      <Container size={420} style={{ position: "relative", zIndex: 1 }}>

        <Paper
          radius={28}
          p={50}
          shadow="2xl"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
            animation: "slideUp 0.6s ease-out",
          }}
        >

          {/* Logo/Icon with Glow Effect */}
          <Group justify="center" mb={30}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              <ThemeIcon
                size={90}
                radius="xl"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan", deg: 135 }}
                style={{
                  boxShadow: "0 10px 30px rgba(59,130,246,0.4)",
                  position: "relative",
                }}
              >
                <IconShieldLock style={{ width: rem(48), height: rem(48) }} />
              </ThemeIcon>
            </div>
          </Group>

          {/* Title with Gradient Text */}
          <Title
            ta="center"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #93c5fd 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: "36px",
              fontWeight: 800,
              letterSpacing: "-0.5px",
              marginBottom: "8px",
            }}
          >
            ScholarLink
          </Title>

          <Text
            ta="center"
            size="md"
            mb={30}
            style={{
              color: "rgba(255,255,255,0.8)",
              fontWeight: 500,
              letterSpacing: "0.3px",
            }}
          >
            Administrator Authentication Portal
          </Text>

          <Divider
            mb="xl"
            style={{
              borderColor: "rgba(255,255,255,0.15)",
              opacity: 0.5,
            }}
          />

          {/* Error Alert with Enhanced Styling */}
          {error && (
            <Alert
              icon={<IconAlertCircle size={18} />}
              color="red"
              radius="md"
              mb="lg"
              variant="light"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#fca5a5",
              }}
            >
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleLogin}>
            <Stack spacing="lg">

              <div>
                <Text
                  size="sm"
                  fw={600}
                  mb={8}
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    letterSpacing: "0.3px",
                  }}
                >
                  Admin Email
                </Text>
                <TextInput
                  placeholder="admin@scholarlink.com"
                  size="md"
                  radius="12px"
                  leftSection={<IconMail size={18} style={{ color: "rgba(255,255,255,0.5)" }} />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  styles={{
                    input: {
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "white",
                      padding: "12px 14px",
                      fontSize: "14px",
                      transition: "all 0.3s ease",
                      "&:focus": {
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(59,130,246,0.5)",
                        boxShadow: "0 0 0 3px rgba(59,130,246,0.1)",
                      },
                      "&::placeholder": {
                        color: "rgba(255,255,255,0.4)",
                      },
                    },
                  }}
                />
              </div>

              <div>
                <Text
                  size="sm"
                  fw={600}
                  mb={8}
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    letterSpacing: "0.3px",
                  }}
                >
                  Password
                </Text>
                <PasswordInput
                  placeholder="Enter your password"
                  size="md"
                  radius="12px"
                  leftSection={<IconLock size={18} style={{ color: "rgba(255,255,255,0.5)" }} />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  styles={{
                    input: {
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "white",
                      padding: "12px 14px",
                      fontSize: "14px",
                      transition: "all 0.3s ease",
                      "&:focus": {
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(59,130,246,0.5)",
                        boxShadow: "0 0 0 3px rgba(59,130,246,0.1)",
                      },
                      "&::placeholder": {
                        color: "rgba(255,255,255,0.4)",
                      },
                    },
                  }}
                />
              </div>

              <Button
                type="submit"
                size="md"
                radius="12px"
                fullWidth
                loading={loading}
                mt="md"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan", deg: 90 }}
                style={{
                  height: "52px",
                  fontSize: "16px",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  boxShadow: "0 10px 25px rgba(59,130,246,0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 35px rgba(59,130,246,0.5)",
                  },
                }}
              >
                Access Dashboard
              </Button>

            </Stack>
          </form>

          {/* Footer with Enhanced Styling */}
          <div
            style={{
              marginTop: "35px",
              paddingTop: "25px",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Group justify="center" gap="xs">
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 10px rgba(16,185,129,0.5)",
                }}
              />
              <Text
                ta="center"
                size="xs"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "0.5px",
                  fontWeight: 500,
                }}
              >
                Protected • Secure • ScholarLink Admin System
              </Text>
            </Group>
          </div>

        </Paper>

        {/* Version Badge */}
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <Text
            size="xs"
            style={{
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            v2.0 • Secure Access
          </Text>
        </div>
      </Container>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @keyframes pulse {
            0%, 100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.5;
            }
            50% {
              transform: translate(-50%, -50%) scale(1.1);
              opacity: 0.8;
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>
  );
}

export default AdminLogin;