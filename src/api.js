const API_URL = import.meta.env.VITE_API_URL;

// Helper function for making authenticated requests
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function for handling API responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || "Something went wrong");
  }
  return data;
};

// ==================== AUTHENTICATION ====================

export const authAPI = {
  // User Login
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  // Admin Login
  adminLogin: async (email, password) => {
    const response = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  // Register
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Create User (Admin)
  createUser: async (userData) => {
    const response = await fetch(`${API_URL}/auth/create-user`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Get all users
  getAllUsers: async () => {
    const response = await fetch(`${API_URL}/auth/users`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// ==================== USER PROFILE ====================

export const profileAPI = {
  // Get Profile
  getProfile: async () => {
    const response = await fetch(`${API_URL}/profile`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Update Profile
  updateProfile: async (profileData) => {
    const response = await fetch(`${API_URL}/profile`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    return handleResponse(response);
  },
};

// ==================== SCHOLARSHIPS ====================

export const scholarshipsAPI = {
  // Get all scholarships
  getAll: async () => {
    const response = await fetch(`${API_URL}/scholarships`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Get scholarship by ID
  getById: async (id) => {
    const response = await fetch(`${API_URL}/scholarships/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Create scholarship (Admin)
  create: async (scholarshipData) => {
    const response = await fetch(`${API_URL}/scholarships`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(scholarshipData),
    });
    return handleResponse(response);
  },

  // Update scholarship (Admin)
  update: async (id, scholarshipData) => {
    const response = await fetch(`${API_URL}/scholarships/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(scholarshipData),
    });
    return handleResponse(response);
  },

  // Delete scholarship (Admin)
  delete: async (id) => {
    const response = await fetch(`${API_URL}/scholarships/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// ==================== INTERNSHIPS ====================

export const internshipsAPI = {
  // Get all internships
  getAll: async () => {
    const response = await fetch(`${API_URL}/internships`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Get internship by ID
  getById: async (id) => {
    const response = await fetch(`${API_URL}/internships/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Create internship (Admin)
  create: async (internshipData) => {
    const response = await fetch(`${API_URL}/internships`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(internshipData),
    });
    return handleResponse(response);
  },

  // Update internship (Admin)
  update: async (id, internshipData) => {
    const response = await fetch(`${API_URL}/internships/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(internshipData),
    });
    return handleResponse(response);
  },

  // Delete internship (Admin)
  delete: async (id) => {
    const response = await fetch(`${API_URL}/internships/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// ==================== APPLICATIONS ====================

export const applicationsAPI = {
  // Get all applications
  getAll: async () => {
    const response = await fetch(`${API_URL}/applications`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Create application
  create: async (applicationData) => {
    const response = await fetch(`${API_URL}/applications`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(applicationData),
    });
    return handleResponse(response);
  },

  // Get application by ID
  getById: async (id) => {
    const response = await fetch(`${API_URL}/applications/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Update application
  update: async (id, applicationData) => {
    const response = await fetch(`${API_URL}/applications/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(applicationData),
    });
    return handleResponse(response);
  },

  // Delete application
  delete: async (id) => {
    const response = await fetch(`${API_URL}/applications/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// ==================== ASSESSMENTS ====================

export const assessmentsAPI = {
  // Get all assessments
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters);
    const response = await fetch(`${API_URL}/assessments?${queryParams}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Create assessment (Admin)
  create: async (assessmentData) => {
    const response = await fetch(`${API_URL}/assessments`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(assessmentData),
    });
    return handleResponse(response);
  },

  // Get assessment by ID
  getById: async (id) => {
    const response = await fetch(`${API_URL}/assessments/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Update assessment
  update: async (id, assessmentData) => {
    const response = await fetch(`${API_URL}/assessments/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(assessmentData),
    });
    return handleResponse(response);
  },

  // Delete assessment
  delete: async (id) => {
    const response = await fetch(`${API_URL}/assessments/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Publish assessment (Admin)
  publish: async (id) => {
    const response = await fetch(`${API_URL}/assessments/${id}/publish`, {
      method: "PATCH",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Close assessment (Admin)
  close: async (id) => {
    const response = await fetch(`${API_URL}/assessments/${id}/close`, {
      method: "PATCH",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Send assessment to users (Admin)
  send: async (id, userIds) => {
    const response = await fetch(`${API_URL}/assessments/${id}/send`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ userIds }),
    });
    return handleResponse(response);
  },

  // ==================== QUESTIONS ====================

  // Get all questions for an assessment
  getQuestions: async (assessmentId) => {
    const response = await fetch(`${API_URL}/assessments/${assessmentId}/questions`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Add question to assessment (Admin)
  addQuestion: async (assessmentId, questionData) => {
    const response = await fetch(`${API_URL}/assessments/${assessmentId}/questions`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(questionData),
    });
    return handleResponse(response);
  },

  // Update question (Admin)
  updateQuestion: async (questionId, questionData) => {
    const response = await fetch(`${API_URL}/assessments/questions/${questionId}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(questionData),
    });
    return handleResponse(response);
  },

  // Delete question (Admin)
  deleteQuestion: async (questionId) => {
    const response = await fetch(`${API_URL}/assessments/questions/${questionId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // ==================== USER ASSESSMENTS ====================

  // Get user's assigned assessments
  getMyAssessments: async () => {
    const response = await fetch(`${API_URL}/assessments/user/my-assessments`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Submit assessment
  submit: async (id, answers) => {
    const response = await fetch(`${API_URL}/assessments/${id}/submit`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ answers }),
    });
    return handleResponse(response);
  },
};

// ==================== ASSESSMENT ATTEMPTS ====================

export const assessmentAttemptsAPI = {
  // Create assessment attempt
  create: async (attemptData) => {
    const response = await fetch(`${API_URL}/assessment-attempts`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(attemptData),
    });
    return handleResponse(response);
  },

  // Get assessment attempt by ID
  getById: async (attemptId) => {
    const response = await fetch(`${API_URL}/assessment-attempts/${attemptId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Submit assessment attempt
  submit: async (attemptId, answers) => {
    const response = await fetch(
      `${API_URL}/assessment-attempts/${attemptId}/submit`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ answers }),
      }
    );
    return handleResponse(response);
  },
};

// ==================== NOTIFICATIONS ====================

export const notificationsAPI = {
  // Get all notifications
  getAll: async () => {
    const response = await fetch(`${API_URL}/notifications`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Mark notification as read
  markAsRead: async (id) => {
    const response = await fetch(`${API_URL}/notifications/${id}/read`, {
      method: "PATCH",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// ==================== DASHBOARD ====================

export const dashboardAPI = {
  // Get dashboard stats
  getStats: async () => {
    const response = await fetch(`${API_URL}/dashboard/stats`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Get recommendations
  getRecommendations: async () => {
    const response = await fetch(`${API_URL}/dashboard/recommendations`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// ==================== SCHOLARS ====================

export const scholarsAPI = {
  // Get all scholars
  getAll: async () => {
    const response = await fetch(`${API_URL}/scholars`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Get scholar by ID
  getById: async (id) => {
    const response = await fetch(`${API_URL}/scholars/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Create scholar
  create: async (scholarData) => {
    const response = await fetch(`${API_URL}/scholars/create`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(scholarData),
    });
    return handleResponse(response);
  },

  // Update scholar
  update: async (id, scholarData) => {
    const response = await fetch(`${API_URL}/scholars/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(scholarData),
    });
    return handleResponse(response);
  },

  // Delete scholar
  delete: async (id) => {
    const response = await fetch(`${API_URL}/scholars/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// ==================== MESSAGES ====================

export const messagesAPI = {
  // Get all messages
  getAll: async () => {
    const response = await fetch(`${API_URL}/messages`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Get message by ID
  getById: async (id) => {
    const response = await fetch(`${API_URL}/messages/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Send message
  send: async (messageData) => {
    const response = await fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(messageData),
    });
    return handleResponse(response);
  },

  // Mark message as read
  markAsRead: async (id) => {
    const response = await fetch(`${API_URL}/messages/${id}/read`, {
      method: "PATCH",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Delete message
  delete: async (id) => {
    const response = await fetch(`${API_URL}/messages/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// ==================== REPORTS ====================

export const reportsAPI = {
  // Get all reports
  getAll: async () => {
    const response = await fetch(`${API_URL}/reports`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Get report by ID
  getById: async (id) => {
    const response = await fetch(`${API_URL}/reports/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Create report
  create: async (reportData) => {
    const response = await fetch(`${API_URL}/reports`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(reportData),
    });
    return handleResponse(response);
  },

  // Update report
  update: async (id, reportData) => {
    const response = await fetch(`${API_URL}/reports/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(reportData),
    });
    return handleResponse(response);
  },

  // Delete report
  delete: async (id) => {
    const response = await fetch(`${API_URL}/reports/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// ==================== FILES ====================

export const filesAPI = {
  // Upload file
  upload: async (formData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });
    return handleResponse(response);
  },

  // Get file by filename
  getByFilename: async (filename) => {
    const response = await fetch(`${API_URL}/uploads/${filename}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("File not found");
    }
    return response;
  },
};

export { API_URL };
