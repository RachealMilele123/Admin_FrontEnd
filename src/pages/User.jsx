import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Table,
  Title,
  Group,
  Text,
  Badge,
  Loader,
  TextInput,
  Alert,
} from "@mantine/core";


function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("http://localhost:8000/api/auth/users");

      if (!res.ok) {
        throw new Error(`Server Error: ${res.status}`);
      }

      const data = await res.json();

      setUsers(data?.users ?? []);
    } catch (err) {
      console.error(err);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // OPTIMIZED SEARCH (memoized)
  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      `${u?.firstName ?? ""} ${u?.lastName ?? ""} ${u?.email ?? ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  return (
    <Card shadow="sm" radius="md" p="lg">

      {/* HEADER */}
      <Group justify="space-between" mb="md">
        <Title order={3}>Users Management</Title>

        <Button onClick={() => navigate("/auth/createuser")}>
          + Create User
        </Button>
      </Group>

      {/* SEARCH */}
      <TextInput
        placeholder="Search users by name or email..."
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="md"
      />

      {/* ERROR */}
      {error && (
        <Alert color="red" mb="md">
          {error}
        </Alert>
      )}

      {/* LOADING */}
      {loading ? (
        <Group justify="center" p="xl">
          <Loader />
        </Group>
      ) : (
        <Table striped highlightOnHover verticalSpacing="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user?._id}>
                  <td>
                    {user?.firstName} {user?.lastName}
                  </td>

                  <td>{user?.email}</td>
                  <td>{user?.phoneNumber || "-"}</td>

                  <td>
                    <Badge color={user?.role === "admin" ? "red" : "blue"}>
                      {user?.role || "user"}
                    </Badge>
                  </td>

                  <td>
                    <Badge color={user?.status === "active" ? "green" : "gray"}>
                      {user?.status || "unknown"}
                    </Badge>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  <Text ta="center" c="dimmed">
                    No users found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Card>
  );
}

export default Users;