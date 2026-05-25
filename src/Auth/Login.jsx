import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Loader,
} from "@mantine/core";

import classes from "./AuthenticationTitle.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:8000/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Navigate to dashboard
      navigate("/admin/dashboard");

    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Text ta="center" c="dimmed" size="sm" mt={5}>
        Do not have an account yet?{" "}
        <Anchor
          size="sm"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">

        {error && (
          <Text c="red" size="sm" mb="md">
            {error}
          </Text>
        )}

        <TextInput
          label="Email"
          placeholder="you@gmail.com"
          required
          radius="md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          radius="md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />

          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>

        <Button
          fullWidth
          mt="xl"
          radius="md"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <Loader size="sm" color="white" /> : "Sign in"}
        </Button>

      </Paper>
    </Container>
  );
}

export default Login;