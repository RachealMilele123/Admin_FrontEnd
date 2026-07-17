import {
  Container,
  Card,
  Group,
  Title,
  Text,
  TextInput,
  Switch,
  Button,
  Divider,
  Stack,
  Grid,
  Avatar,
  FileInput,
  Badge,
  Loader,
  Notification,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { profileAPI, filesAPI } from "../api";

function Settings() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  const [settings, setSettings] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    avatar: null,

    darkMode: false,
    emailNotifications: true,
    systemAlerts: true,
    activityDigest: false,
  });

  // Fetch user profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await profileAPI.getProfile();
      const user = data.user || data.profile || {};
      setSettings((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
      }));
    } catch (err) {
      console.error("Failed to fetch profile", err);
    } finally {
      setLoading(false);
    }
  };

  const update = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setNotification(null);

      // Update profile
      await profileAPI.updateProfile({
        firstName: settings.firstName,
        lastName: settings.lastName,
        email: settings.email,
        phoneNumber: settings.phoneNumber,
      });

      setNotification({
        type: "success",
        message: "Profile updated successfully!",
      });

      // Clear notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({
        type: "error",
        message: err.message || "Failed to update profile",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (file) => {
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const data = await filesAPI.upload(formData);
      update("avatar", data.filename || data.url);
      setNotification({
        type: "success",
        message: "Avatar uploaded successfully!",
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({
        type: "error",
        message: err.message || "Failed to upload avatar",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="md" py="lg">

      {/* HEADER */}
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={2}>Settings</Title>
          <Text size="sm" c="dimmed">
            Manage your account, preferences, and system behavior
          </Text>
        </div>

        <Badge color="blue" variant="light">
          Admin Panel
        </Badge>
      </Group>

      {notification && (
        <Notification
          color={notification.type === "success" ? "green" : "red"}
          mb="md"
          onClose={() => setNotification(null)}
        >
          {notification.message}
        </Notification>
      )}

      <Stack gap="lg">

        {/* PROFILE SECTION */}
        <Card shadow="sm" p="lg">
          <Title order={4}>Profile Information</Title>
          <Text size="sm" c="dimmed" mb="md">
            Your personal account details
          </Text>

          {loading ? (
            <Group justify="center" p="xl">
              <Loader />
            </Group>
          ) : (
            <>
              <Group align="flex-start">
                <Avatar size="xl" radius="xl">
                  {settings.firstName ? settings.firstName.charAt(0) : "A"}
                </Avatar>

                <FileInput
                  label="Profile Picture"
                  placeholder="Upload image"
                  onChange={handleAvatarUpload}
                  style={{ flex: 1 }}
                />
              </Group>

              <Grid mt="md">
                <Grid.Col span={6}>
                  <TextInput
                    label="First Name"
                    value={settings.firstName}
                    onChange={(e) => update("firstName", e.currentTarget.value)}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInput
                    label="Last Name"
                    value={settings.lastName}
                    onChange={(e) => update("lastName", e.currentTarget.value)}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInput
                    label="Email Address"
                    value={settings.email}
                    onChange={(e) => update("email", e.currentTarget.value)}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInput
                    label="Phone Number"
                    value={settings.phoneNumber}
                    onChange={(e) => update("phoneNumber", e.currentTarget.value)}
                  />
                </Grid.Col>
              </Grid>
            </>
          )}
        </Card>

        {/* ACCOUNT INFO */}
        <Card shadow="sm" p="lg">
          <Title order={4}>Account Overview</Title>
          <Text size="sm" c="dimmed" mb="md">
            System-generated account details
          </Text>

          <Grid>
            <Grid.Col span={4}>
              <TextInput label="Role" value="Administrator" disabled />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput label="Status" value="Active" disabled />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput label="Account ID" value="ADM-001928" disabled />
            </Grid.Col>
          </Grid>
        </Card>

        {/* PREFERENCES */}
        <Card shadow="sm" p="lg">
          <Title order={4}>Preferences</Title>
          <Text size="sm" c="dimmed" mb="md">
            Customize how the system behaves
          </Text>

          <Stack gap="md">
            <Switch
              label="Dark Mode"
              checked={settings.darkMode}
              onChange={(e) =>
                update("darkMode", e.currentTarget.checked)
              }
            />

            <Switch
              label="Email Notifications"
              checked={settings.emailNotifications}
              onChange={(e) =>
                update("emailNotifications", e.currentTarget.checked)
              }
            />

            <Switch
              label="System Alerts"
              checked={settings.systemAlerts}
              onChange={(e) =>
                update("systemAlerts", e.currentTarget.checked)
              }
            />

            <Switch
              label="Daily Activity Digest"
              checked={settings.activityDigest}
              onChange={(e) =>
                update("activityDigest", e.currentTarget.checked)
              }
            />
          </Stack>
        </Card>

        <Divider />

        {/* SAVE ACTION */}
        <Group justify="flex-end">
          <Button loading={saving} size="md" onClick={handleSave}>
            Save Changes
          </Button>
        </Group>

      </Stack>
    </Container>
  );
}

export default Settings;