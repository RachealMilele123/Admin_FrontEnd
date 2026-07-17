import { useState, useEffect } from "react";
import {
  TextInput,
  Textarea,
  Button,
  Table,
  Badge,
  Text,
  Modal,
  Group,
  ActionIcon,
  Card,
  Alert,
  Stack,
  Title,
  Container,
  SimpleGrid,
  NumberInput,
  Select,
  Switch,
  Divider,
  Tabs,
  ScrollArea,
  Paper,
  Box,
  Loader,
  Notification,
  ThemeIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconPlus,
  IconEye,
  IconEdit,
  IconTrash,
  IconSend,
  IconCheck,
  IconX,
  IconClock,
  IconUsers,
  IconFileText,
  IconSettings,
  IconPlayerPlay,
  IconPlayerPause,
} from "@tabler/icons-react";
import { assessmentsAPI } from "../api";

const INITIAL_ASSESSMENT = {
  title: "",
  description: "",
  instructions: "",
  timeLimit: 30,
  totalMarks: 100,
  passingScore: 50,
  deadline: "",
};

const INITIAL_QUESTION = {
  questionText: "",
  questionType: "multiple_choice",
  options: [
    { label: "A", text: "" },
    { label: "B", text: "" },
    { label: "C", text: "" },
    { label: "D", text: "" },
  ],
  correctAnswer: "",
  marks: 1,
  explanation: "",
};

function AssessmentAdmin() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingAssessment, setViewingAssessment] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [questionOpened, setQuestionOpened] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [sendModalOpened, setSendModalOpened] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [users, setUsers] = useState([]);

  const form = useForm({
    initialValues: INITIAL_ASSESSMENT,
  });

  const questionForm = useForm({
    initialValues: INITIAL_QUESTION,
  });

  // Fetch assessments on component mount
  useEffect(() => {
    fetchAssessments();
    fetchUsers();
  }, []);

  const fetchAssessments = async () => {
    try {
      setLoading(true);
      const data = await assessmentsAPI.getAll();
      setAssessments(data.assessments || []);
    } catch (err) {
      console.error("Failed to fetch assessments", err);
      setSubmitError(err.message || "Failed to fetch assessments");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await assessmentsAPI.getAllUsers ? await Promise.resolve() : await Promise.resolve();
      // This would be implemented with a users API call
      // For now, we'll use mock data
      setUsers([
        { _id: "1", firstName: "John", lastName: "Doe", email: "john@example.com" },
        { _id: "2", firstName: "Jane", lastName: "Smith", email: "jane@example.com" },
        { _id: "3", firstName: "Bob", lastName: "Johnson", email: "bob@example.com" },
      ]);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const fetchQuestions = async (assessmentId) => {
    try {
      const data = await assessmentsAPI.getQuestions(assessmentId);
      setQuestions(data.questions || []);
    } catch (err) {
      console.error("Failed to fetch questions", err);
      setSubmitError(err.message || "Failed to fetch questions");
    }
  };

  const handleSubmit = async (values) => {
    setSubmitError("");
    setSubmitSuccess("");
    try {
      if (editingId) {
        await assessmentsAPI.update(editingId, values);
        setSubmitSuccess("Assessment updated successfully");
      } else {
        const data = await assessmentsAPI.create(values);
        setSubmitSuccess("Assessment created successfully");
        setEditingId(data.assessment._id);
      }
      await fetchAssessments();
    } catch (err) {
      console.error("Failed to save assessment", err);
      setSubmitError(err.message || "Failed to save assessment");
    }
  };

  const handleEdit = async (assessment) => {
    setEditingId(assessment._id);
    form.setValues({
      title: assessment.title || "",
      description: assessment.description || "",
      instructions: assessment.instructions || "",
      timeLimit: assessment.timeLimit || 30,
      totalMarks: assessment.totalMarks || 100,
      passingScore: assessment.passingScore || 50,
      deadline: assessment.deadline ? assessment.deadline.split('T')[0] : "",
    });
    await fetchQuestions(assessment._id);
    setActiveTab("details");
    setOpened(true);
  };

  const handleView = async (assessment) => {
    setViewingAssessment(assessment);
    await fetchQuestions(assessment._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this assessment?")) return;
    try {
      await assessmentsAPI.delete(id);
      await fetchAssessments();
      setSubmitSuccess("Assessment deleted successfully");
    } catch (err) {
      console.error("Failed to delete assessment", err);
      setSubmitError(err.message || "Failed to delete assessment");
    }
  };

  const handlePublish = async (id) => {
    try {
      await assessmentsAPI.publish(id);
      await fetchAssessments();
      setSubmitSuccess("Assessment published successfully");
    } catch (err) {
      console.error("Failed to publish assessment", err);
      setSubmitError(err.message || "Failed to publish assessment");
    }
  };

  const handleClose = async (id) => {
    try {
      await assessmentsAPI.close(id);
      await fetchAssessments();
      setSubmitSuccess("Assessment closed successfully");
    } catch (err) {
      console.error("Failed to close assessment", err);
      setSubmitError(err.message || "Failed to close assessment");
    }
  };

  const handleSend = async () => {
    if (!selectedUserIds || selectedUserIds.length === 0) {
      setSubmitError("Please select at least one user");
      return;
    }
    try {
      await assessmentsAPI.send(viewingAssessment._id, selectedUserIds);
      setSubmitSuccess(`Assessment sent to ${selectedUserIds.length} user(s)`);
      setSendModalOpened(false);
      setSelectedUserIds([]);
      await fetchAssessments();
    } catch (err) {
      console.error("Failed to send assessment", err);
      setSubmitError(err.message || "Failed to send assessment");
    }
  };

  const handleAddQuestion = async (values) => {
    // Validate that assessment ID exists
    if (!editingId) {
      setSubmitError("Please create and save an assessment before adding questions.");
      return;
    }

    try {
      await assessmentsAPI.addQuestion(editingId, values);
      await fetchQuestions(editingId);
      questionForm.reset();
      setQuestionOpened(false);
      setSubmitSuccess("Question added successfully");
    } catch (err) {
      console.error("Failed to add question", err);
      setSubmitError(err.message || "Failed to add question");
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!confirm("Are you sure you want to delete this question?")) return;
    
    // Validate that assessment ID exists
    if (!editingId) {
      setSubmitError("Assessment ID is missing. Please refresh and try again.");
      return;
    }
    
    try {
      await assessmentsAPI.deleteQuestion(questionId);
      await fetchQuestions(editingId);
      setSubmitSuccess("Question deleted successfully");
    } catch (err) {
      console.error("Failed to delete question", err);
      setSubmitError(err.message || "Failed to delete question");
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    form.reset();
    setQuestions([]);
    setSubmitError("");
    setSubmitSuccess("");
    setActiveTab("details");
    setOpened(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "green";
      case "draft":
        return "yellow";
      case "closed":
        return "red";
      default:
        return "gray";
    }
  };

  const totalQuestionsMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);

  return (
    <div style={{ padding: "30px", background: "#f4f7fb", minHeight: "100vh" }}>
      <Container fluid>
        {/* HEADER */}
        <Group justify="space-between" mb="xl">
          <div>
            <Title order={2}>Assessment Management</Title>
            <Text c="dimmed">Create, manage, and send assessments to users</Text>
          </div>
          <Button
            leftSection={<IconPlus size={18} />}
            onClick={openCreateModal}
            radius="md"
          >
            Create Assessment
          </Button>
        </Group>

        {/* Notifications */}
        {submitError && (
          <Alert color="red" title="Error" mb="md" onClose={() => setSubmitError("")}>
            {submitError}
          </Alert>
        )}
        {submitSuccess && (
          <Alert color="green" title="Success" mb="md" onClose={() => setSubmitSuccess("")}>
            {submitSuccess}
          </Alert>
        )}

        {/* STATS CARDS */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} mb="xl">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text size="sm" c="dimmed">
                  Total Assessments
                </Text>
                <Title order={2}>{assessments.length}</Title>
              </div>
              <ThemeIcon size={50} radius="md" color="blue">
                <IconFileText size={28} />
              </ThemeIcon>
            </Group>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text size="sm" c="dimmed">
                  Published
                </Text>
                <Title order={2}>
                  {assessments.filter((a) => a.status === "published").length}
                </Title>
              </div>
              <ThemeIcon size={50} radius="md" color="green">
                <IconCheck size={28} />
              </ThemeIcon>
            </Group>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text size="sm" c="dimmed">
                  Drafts
                </Text>
                <Title order={2}>
                  {assessments.filter((a) => a.status === "draft").length}
                </Title>
              </div>
              <ThemeIcon size={50} radius="md" color="yellow">
                <IconClock size={28} />
              </ThemeIcon>
            </Group>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text size="sm" c="dimmed">
                  Closed
                </Text>
                <Title order={2}>
                  {assessments.filter((a) => a.status === "closed").length}
                </Title>
              </div>
              <ThemeIcon size={50} radius="md" color="red">
                <IconX size={28} />
              </ThemeIcon>
            </Group>
          </Card>
        </SimpleGrid>

        {/* TABLE */}
        <Card shadow="sm" radius="lg" p="lg" withBorder>
          <Group justify="space-between" mb="md">
            <Title order={4}>All Assessments</Title>
            <Badge color="blue" variant="light">
              {assessments.length} Assessments
            </Badge>
          </Group>

          {loading ? (
            <Group justify="center" p="xl">
              <Loader size="lg" />
            </Group>
          ) : (
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Title</Table.Th>
                  <Table.Th>Questions</Table.Th>
                  <Table.Th>Total Marks</Table.Th>
                  <Table.Th>Time Limit</Table.Th>
                  <Table.Th>Deadline</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {assessments.length === 0 ? (
                  <Table.Tr>
                    <Table.Td colSpan={7}>
                      <Text c="dimmed" ta="center" py="xl">
                        No assessments yet. Click "Create Assessment" to create one.
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                ) : (
                  assessments.map((item) => (
                    <Table.Tr key={item._id}>
                      <Table.Td>{item.title}</Table.Td>
                      <Table.Td>{item.questions?.length || 0}</Table.Td>
                      <Table.Td>{item.totalMarks}</Table.Td>
                      <Table.Td>{item.timeLimit} min</Table.Td>
                      <Table.Td>{new Date(item.deadline).toLocaleDateString()}</Table.Td>
                      <Table.Td>
                        <Badge color={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon
                            variant="light"
                            color="blue"
                            size="sm"
                            onClick={() => handleView(item)}
                          >
                            <IconEye size={16} />
                          </ActionIcon>
                          <ActionIcon
                            variant="light"
                            color="orange"
                            size="sm"
                            onClick={() => handleEdit(item)}
                          >
                            <IconEdit size={16} />
                          </ActionIcon>
                          {item.status === "draft" && (
                            <ActionIcon
                              variant="light"
                              color="green"
                              size="sm"
                              onClick={() => handlePublish(item._id)}
                            >
                              <IconPlayerPlay size={16} />
                            </ActionIcon>
                          )}
                          {item.status === "published" && (
                            <ActionIcon
                              variant="light"
                              color="red"
                              size="sm"
                              onClick={() => handleClose(item._id)}
                            >
                              <IconPlayerPause size={16} />
                            </ActionIcon>
                          )}
                          <ActionIcon
                            variant="light"
                            color="red"
                            size="sm"
                            onClick={() => handleDelete(item._id)}
                          >
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))
                )}
              </Table.Tbody>
            </Table>
          )}
        </Card>
      </Container>

      {/* CREATE/EDIT MODAL */}
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          setEditingId(null);
          form.reset();
          setQuestions([]);
        }}
        title={editingId ? "Edit Assessment" : "Create Assessment"}
        size="xl"
        radius="lg"
      >
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List mb="md">
            <Tabs.Tab value="details" leftSection={<IconSettings size={16} />}>
              Details
            </Tabs.Tab>
            <Tabs.Tab value="questions" leftSection={<IconFileText size={16} />}>
              Questions ({questions.length})
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="details">
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack>
                <TextInput
                  label="Assessment Title"
                  placeholder="e.g JavaScript Fundamentals Test"
                  value={form.values.title}
                  onChange={(e) => form.setFieldValue("title", e.currentTarget.value)}
                  required
                />

                <Textarea
                  label="Description"
                  placeholder="Describe the assessment..."
                  minRows={3}
                  value={form.values.description}
                  onChange={(e) => form.setFieldValue("description", e.currentTarget.value)}
                  required
                />

                <Textarea
                  label="Instructions"
                  placeholder="Provide instructions for taking the assessment..."
                  minRows={2}
                  value={form.values.instructions}
                  onChange={(e) => form.setFieldValue("instructions", e.currentTarget.value)}
                />

                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                  <NumberInput
                    label="Time Limit (minutes)"
                    placeholder="30"
                    min={1}
                    value={form.values.timeLimit}
                    onChange={(val) => form.setFieldValue("timeLimit", val)}
                  />

                  <NumberInput
                    label="Total Marks"
                    placeholder="100"
                    min={1}
                    value={form.values.totalMarks}
                    onChange={(val) => form.setFieldValue("totalMarks", val)}
                  />
                </SimpleGrid>

                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                  <NumberInput
                    label="Passing Score"
                    placeholder="50"
                    min={0}
                    value={form.values.passingScore}
                    onChange={(val) => form.setFieldValue("passingScore", val)}
                  />

                  <TextInput
                    label="Deadline"
                    type="date"
                    value={form.values.deadline}
                    onChange={(e) => form.setFieldValue("deadline", e.currentTarget.value)}
                    required
                  />
                </SimpleGrid>

                <Button type="submit" fullWidth radius="md">
                  {editingId ? "Update Assessment" : "Create Assessment"}
                </Button>
              </Stack>
            </form>
          </Tabs.Panel>

              <Tabs.Panel value="questions">
            <Stack>
              <Group justify="space-between">
                <Text fw={500}>Total Questions: {questions.length}</Text>
                <Button
                  size="sm"
                  leftSection={<IconPlus size={16} />}
                  onClick={() => {
                    if (!editingId) {
                      setSubmitError("Please create and save an assessment before adding questions.");
                      return;
                    }
                    setEditingQuestionId(null);
                    questionForm.reset(INITIAL_QUESTION);
                    setQuestionOpened(true);
                  }}
                >
                  Add Question
                </Button>
              </Group>

              {questions.length === 0 ? (
                <Alert color="blue" title="No questions yet">
                  Add questions to your assessment. You can add up to 100 questions.
                </Alert>
              ) : (
                <ScrollArea h={400}>
                  <Stack>
                    {questions.map((q, index) => (
                      <Card key={q._id} shadow="sm" padding="md" radius="md" withBorder>
                        <Group justify="space-between" mb="xs">
                          <Text fw={500}>Q{index + 1}. {q.questionText}</Text>
                          <Badge size="sm">{q.marks} marks</Badge>
                        </Group>
                        <Text size="sm" c="dimmed" mb="xs">
                          Type: {q.questionType.replace("_", " ")}
                        </Text>
                        {q.options && q.options.length > 0 && (
                          <Stack gap="xs" mb="xs">
                            {q.options.map((opt) => (
                              <Text
                                key={opt.label}
                                size="sm"
                                c={opt.label === q.correctAnswer ? "green" : "dimmed"}
                                fw={opt.label === q.correctAnswer ? 600 : 400}
                              >
                                {opt.label}. {opt.text}
                              </Text>
                            ))}
                          </Stack>
                        )}
                        <Group justify="flex-end" mt="sm">
                          <Button
                            size="xs"
                            variant="light"
                            color="red"
                            onClick={() => handleDeleteQuestion(q._id)}
                          >
                            Delete
                          </Button>
                        </Group>
                      </Card>
                    ))}
                  </Stack>
                </ScrollArea>
              )}
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Modal>

      {/* ADD QUESTION MODAL */}
      <Modal
        opened={questionOpened}
        onClose={() => {
          setQuestionOpened(false);
          setEditingQuestionId(null);
          questionForm.reset(INITIAL_QUESTION);
        }}
        title={editingQuestionId ? "Edit Question" : "Add Question"}
        size="lg"
        radius="lg"
      >
        <form onSubmit={questionForm.onSubmit(handleAddQuestion)}>
          <Stack>
            <Textarea
              label="Question Text"
              placeholder="Enter your question..."
              minRows={2}
              value={questionForm.values.questionText}
              onChange={(e) => questionForm.setFieldValue("questionText", e.currentTarget.value)}
              required
            />

            <Select
              label="Question Type"
              value={questionForm.values.questionType}
              onChange={(val) => questionForm.setFieldValue("questionType", val)}
              data={[
                { value: "multiple_choice", label: "Multiple Choice" },
                { value: "true_false", label: "True/False" },
                { value: "short_answer", label: "Short Answer" },
              ]}
            />

            {questionForm.values.questionType === "multiple_choice" && (
              <Stack>
                <Text fw={500} size="sm">Options</Text>
                {questionForm.values.options.map((opt, idx) => (
                  <Group key={opt.label} gap="xs">
                    <Text w={30}>{opt.label}.</Text>
                    <TextInput
                      placeholder={`Option ${opt.label}`}
                      value={opt.text}
                      onChange={(e) => {
                        const newOptions = [...questionForm.values.options];
                        newOptions[idx].text = e.currentTarget.value;
                        questionForm.setFieldValue("options", newOptions);
                      }}
                      required
                    />
                  </Group>
                ))}
              </Stack>
            )}

            <TextInput
              label="Correct Answer"
              placeholder="Enter the correct answer"
              value={questionForm.values.correctAnswer}
              onChange={(e) => questionForm.setFieldValue("correctAnswer", e.currentTarget.value)}
              required
            />

            <NumberInput
              label="Marks"
              placeholder="1"
              min={1}
              value={questionForm.values.marks}
              onChange={(val) => questionForm.setFieldValue("marks", val)}
            />

            <Textarea
              label="Explanation (Optional)"
              placeholder="Explain why this is the correct answer..."
              minRows={2}
              value={questionForm.values.explanation}
              onChange={(e) => questionForm.setFieldValue("explanation", e.currentTarget.value)}
            />

            <Button type="submit" fullWidth radius="md">
              Add Question
            </Button>
          </Stack>
        </form>
      </Modal>

      {/* VIEW DETAILS MODAL */}
      <Modal
        opened={!!viewingAssessment}
        onClose={() => {
          setViewingAssessment(null);
          setQuestions([]);
          setSendModalOpened(false);
        }}
        title={viewingAssessment?.title}
        size="lg"
        radius="lg"
      >
        {viewingAssessment && (
          <Stack>
            <Text>{viewingAssessment.description}</Text>
            {viewingAssessment.instructions && (
              <>
                <Divider />
                <Text fw={500}>Instructions:</Text>
                <Text>{viewingAssessment.instructions}</Text>
              </>
            )}
            <Divider />
            <SimpleGrid cols={{ base: 1, sm: 3 }}>
              <div>
                <Text size="sm" c="dimmed">Time Limit</Text>
                <Text fw={500}>{viewingAssessment.timeLimit} minutes</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">Total Marks</Text>
                <Text fw={500}>{viewingAssessment.totalMarks}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">Passing Score</Text>
                <Text fw={500}>{viewingAssessment.passingScore}</Text>
              </div>
            </SimpleGrid>
            <Divider />
            <Text fw={500}>Questions ({questions.length})</Text>
            {questions.length === 0 ? (
              <Text c="dimmed">No questions added yet</Text>
            ) : (
              <ScrollArea h={300}>
                <Stack>
                  {questions.map((q, index) => (
                    <Paper key={q._id} p="md" withBorder>
                      <Text fw={500}>Q{index + 1}. {q.questionText}</Text>
                      <Text size="sm" c="dimmed">{q.marks} marks</Text>
                    </Paper>
                  ))}
                </Stack>
              </ScrollArea>
            )}
            <Group justify="flex-end" mt="md">
              {viewingAssessment.status === "published" && (
                <Button
                  leftSection={<IconSend size={18} />}
                  onClick={() => setSendModalOpened(true)}
                >
                  Send to Users
                </Button>
              )}
            </Group>
          </Stack>
        )}
      </Modal>

      {/* SEND ASSESSMENT MODAL */}
      <Modal
        opened={sendModalOpened}
        onClose={() => {
          setSendModalOpened(false);
          setSelectedUserIds([]);
        }}
        title="Send Assessment to Users"
        size="md"
        radius="lg"
      >
        <Stack>
          <Text size="sm" c="dimmed">
            Select users to send this assessment to:
          </Text>
          {users.map((user) => (
            <Card
              key={user._id}
              shadow="sm"
              padding="md"
              radius="md"
              withBorder
              style={{
                cursor: "pointer",
                border: selectedUserIds.includes(user._id) ? "2px solid #2563eb" : undefined,
              }}
              onClick={() => {
                if (selectedUserIds.includes(user._id)) {
                  setSelectedUserIds(selectedUserIds.filter((id) => id !== user._id));
                } else {
                  setSelectedUserIds([...selectedUserIds, user._id]);
                }
              }}
            >
              <Group justify="space-between">
                <div>
                  <Text fw={500}>
                    {user.firstName} {user.lastName}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {user.email}
                  </Text>
                </div>
                {selectedUserIds.includes(user._id) && (
                  <IconCheck size={20} color="#2563eb" />
                )}
              </Group>
            </Card>
          ))}
          <Button
            fullWidth
            onClick={handleSend}
            disabled={selectedUserIds.length === 0}
          >
            Send to {selectedUserIds.length} User(s)
          </Button>
        </Stack>
      </Modal>
    </div>
  );
}

export default AssessmentAdmin;