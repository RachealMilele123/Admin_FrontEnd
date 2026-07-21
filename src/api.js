const API_URL = import.meta.env.VITE_API_URL;

// Axios instance with default configuration
import axios from "axios";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      // Redirect to login
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default api;

// ==================== AUTHENTICATION ====================

export const authAPI = {
  // User Login
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  // Admin Login
  adminLogin: async (email, password) => {
    const response = await api.post("/admin/login", { email, password });
    return response.data;
  },

  // Register
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  // Create User (Admin)
  createUser: async (userData) => {
    const response = await api.post("/auth/create-user", userData);
    return response.data;
  },

  // Get all users
  getAllUsers: async () => {
    const response = await api.get("/auth/users");
    return response.data;
  },
};

// ==================== USER PROFILE ====================

export const profileAPI = {
  // Get Profile
  getProfile: async () => {
    const response = await api.get("/profile");
    return response.data;
  },

  // Update Profile
  updateProfile: async (profileData) => {
    const response = await api.put("/profile", profileData);
    return response.data;
  },
};

// ==================== SCHOLARSHIPS ====================

export const scholarshipsAPI = {
  // Get all scholarships
  getAll: async () => {
    const response = await api.get("/scholarships");
    return response.data;
  },

  // Get scholarship by ID
  getById: async (id) => {
    const response = await api.get(`/scholarships/${id}`);
    return response.data;
  },

  // Create scholarship (Admin)
  create: async (scholarshipData) => {
    const response = await api.post("/scholarships", scholarshipData);
    return response.data;
  },

  // Update scholarship (Admin)
  update: async (id, scholarshipData) => {
    const response = await api.put(`/scholarships/${id}`, scholarshipData);
    return response.data;
  },

  // Delete scholarship (Admin)
  delete: async (id) => {
    const response = await api.delete(`/scholarships/${id}`);
    return response.data;
  },
};

// ==================== INTERNSHIPS ====================

export const internshipsAPI = {
  // Get all internships
  getAll: async () => {
    const response = await api.get("/internships");
    return response.data;
  },

  // Get internship by ID
  getById: async (id) => {
    const response = await api.get(`/internships/${id}`);
    return response.data;
  },

  // Create internship (Admin)
  create: async (internshipData) => {
    const response = await api.post("/internships", internshipData);
    return response.data;
  },

  // Update internship (Admin)
  update: async (id, internshipData) => {
    const response = await api.put(`/internships/${id}`, internshipData);
    return response.data;
  },

  // Delete internship (Admin)
  delete: async (id) => {
    const response = await api.delete(`/internships/${id}`);
    return response.data;
  },
};

// ==================== APPLICATIONS ====================

export const applicationsAPI = {
  // Get all applications
  getAll: async () => {
    const response = await api.get("/applications");
    return response.data;
  },

  // Create application
  create: async (applicationData) => {
    const response = await api.post("/applications", applicationData);
    return response.data;
  },

  // Get application by ID
  getById: async (id) => {
    const response = await api.get(`/applications/${id}`);
    return response.data;
  },

  // Update application
  update: async (id, applicationData) => {
    const response = await api.put(`/applications/${id}`, applicationData);
    return response.data;
  },

  // Delete application
  delete: async (id) => {
    const response = await api.delete(`/applications/${id}`);
    return response.data;
  },
};

// ==================== ASSESSMENTS ====================

export const assessmentsAPI = {
  // Get all assessments
  getAll: async (filters = {}) => {
    const response = await api.get("/assessments", { params: filters });
    return response.data;
  },

  // Create assessment (Admin)
  create: async (assessmentData) => {
    const response = await api.post("/assessments", assessmentData);
    return response.data;
  },

  // Get assessment by ID
  getById: async (id) => {
    const response = await api.get(`/assessments/${id}`);
    return response.data;
  },

  // Update assessment
  update: async (id, assessmentData) => {
    const response = await api.put(`/assessments/${id}`, assessmentData);
    return response.data;
  },

  // Delete assessment
  delete: async (id) => {
    const response = await api.delete(`/assessments/${id}`);
    return response.data;
  },

  // Publish assessment (Admin)
  publish: async (id) => {
    const response = await api.patch(`/assessments/${id}/publish`);
    return response.data;
  },

  // Close assessment (Admin)
  close: async (id) => {
    const response = await api.patch(`/assessments/${id}/close`);
    return response.data;
  },

  // Send assessment to users (Admin)
  send: async (id, userIds) => {
    const response = await api.post(`/assessments/${id}/send`, { userIds });
    return response.data;
  },

  // ==================== QUESTIONS ====================

  // Get all questions for an assessment
  getQuestions: async (assessmentId) => {
    const response = await api.get(`/assessments/${assessmentId}/questions`);
    return response.data;
  },

  // Add question to assessment (Admin)
  addQuestion: async (assessmentId, questionData) => {
    const response = await api.post(`/assessments/${assessmentId}/questions`, questionData);
    return response.data;
  },

  // Update question (Admin)
  updateQuestion: async (questionId, questionData) => {
    const response = await api.put(`/assessments/questions/${questionId}`, questionData);
    return response.data;
  },

  // Delete question (Admin)
  deleteQuestion: async (questionId) => {
    const response = await api.delete(`/assessments/questions/${questionId}`);
    return response.data;
  },

  // ==================== USER ASSESSMENTS ====================

  // Get user's assigned assessments
  getMyAssessments: async () => {
    const response = await api.get("/assessments/user/my-assessments");
    return response.data;
  },

  // Submit assessment
  submit: async (id, answers) => {
    const response = await api.post(`/assessments/${id}/submit`, { answers });
    return response.data;
  },
};

// ==================== ASSESSMENT ATTEMPTS ====================

export const assessmentAttemptsAPI = {
  // Create assessment attempt
  create: async (attemptData) => {
    const response = await api.post("/assessment-attempts", attemptData);
    return response.data;
  },

  // Get assessment attempt by ID
  getById: async (attemptId) => {
    const response = await api.get(`/assessment-attempts/${attemptId}`);
    return response.data;
  },

  // Submit assessment attempt
  submit: async (attemptId, answers) => {
    const response = await api.post(`/assessment-attempts/${attemptId}/submit`, { answers });
    return response.data;
  },
};

// ==================== NOTIFICATIONS ====================

export const notificationsAPI = {
  // Get all notifications
  getAll: async () => {
    const response = await api.get("/notifications");
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (id) => {
    const response = await api.patch(`/notifications/${id}/read`);
    return response.data;
  },
};

// ==================== DASHBOARD ====================

export const dashboardAPI = {
  // Get dashboard stats
  getStats: async () => {
    const response = await api.get("/dashboard/stats");
    return response.data;
  },

  // Get recommendations
  getRecommendations: async () => {
    const response = await api.get("/dashboard/recommendations");
    return response.data;
  },
};

// ==================== SCHOLARS ====================

export const scholarsAPI = {
  // Get all scholars
  getAll: async () => {
    const response = await api.get("/scholars");
    return response.data;
  },

  // Get scholar by ID
  getById: async (id) => {
    const response = await api.get(`/scholars/${id}`);
    return response.data;
  },

  // Create scholar
  create: async (scholarData) => {
    const response = await api.post("/scholars/create", scholarData);
    return response.data;
  },

  // Update scholar
  update: async (id, scholarData) => {
    const response = await api.put(`/scholars/${id}`, scholarData);
    return response.data;
  },

  // Delete scholar
  delete: async (id) => {
    const response = await api.delete(`/scholars/${id}`);
    return response.data;
  },
};

// ==================== MESSAGES ====================

export const messagesAPI = {
  // Get all messages
  getAll: async () => {
    const response = await api.get("/messages");
    return response.data;
  },

  // Get message by ID
  getById: async (id) => {
    const response = await api.get(`/messages/${id}`);
    return response.data;
  },

  // Send message
  send: async (messageData) => {
    const response = await api.post("/messages", messageData);
    return response.data;
  },

  // Mark message as read
  markAsRead: async (id) => {
    const response = await api.patch(`/messages/${id}/read`);
    return response.data;
  },

  // Delete message
  delete: async (id) => {
    const response = await api.delete(`/messages/${id}`);
    return response.data;
  },
};

// ==================== REPORTS ====================

export const reportsAPI = {
  // Get all reports
  getAll: async () => {
    const response = await api.get("/reports");
    return response.data;
  },

  // Get report by ID
  getById: async (id) => {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  },

  // Create report
  create: async (reportData) => {
    const response = await api.post("/reports", reportData);
    return response.data;
  },

  // Update report
  update: async (id, reportData) => {
    const response = await api.put(`/reports/${id}`, reportData);
    return response.data;
  },

  // Delete report
  delete: async (id) => {
    const response = await api.delete(`/reports/${id}`);
    return response.data;
  },
};

// ==================== FILES ====================

export const filesAPI = {
  // Upload file
  upload: async (formData) => {
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Get file by filename
  getByFilename: async (filename) => {
    const response = await api.get(`/uploads/${filename}`, {
      responseType: "blob",
    });
    return response.data;
  },
};

export { API_URL };