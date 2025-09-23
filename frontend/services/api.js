const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const api = {
  signup: async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Signup failed");
      return data;
    } catch (error) {
      console.error("Signup API error:", error);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      const accessToken = data.token || data.accessToken;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      } else {
        throw new Error("Access token not found in response");
      }

      return data;
    } catch (error) {
      console.error("Login API error:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
  },

  getProfile: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access token found. Please log in.");

    try {
      const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch profile");

      return data;
    } catch (error) {
      console.error("Get Profile API error:", error);
      throw error;
    }
  },

  editProfile: async (profileData) => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access token found. Please log in.");

    try {
      const response = await fetch(`${BASE_URL}/auth/editProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update profile");

      return data;
    } catch (error) {
      console.error("Edit Profile API error:", error);
      throw error;
    }
  },

  createBlog: async (blogData) => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access token found. Please log in.");

    try {
      const response = await fetch(`${BASE_URL}/blogs/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to create blog");

      return data;
    } catch (error) {
      console.error("Create Blog API error:", error);
      throw error;
    }
  },

  updateBlog: async (blogId, updateData) => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access token found. Please log in.");

    try {
      const response = await fetch(`${BASE_URL}/blogs/${blogId}/content`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update blog");

      return data.blog || data;
    } catch (error) {
      console.error("Update Blog API error:", error);
      throw error;
    }
  },

  getAllBlogs: async () => {
    try {
      const response = await fetch(`${BASE_URL}/blogs/all`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch all blogs");
      return data;
    } catch (error) {
      console.error("Get All Blogs API error:", error);
      throw error;
    }
  },

  getBlogById: async (id) => {
  const token = localStorage.getItem("token");

  const headers = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const res = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: "GET",
    headers, // only sends token if it exists
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch blog");
  }

  return await res.json();
},

  likeBlog: async (id) => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(`${BASE_URL}/blogs/${id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to like blog");
      return data;
    } catch (error) {
      console.error("Like API error:", error);
      throw error;
    }
  },

  commentBlog: async (id, comment) => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(`${BASE_URL}/blogs/${id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(comment),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to comment");

      return data;
    } catch (error) {
      console.error("Comment API error:", error);
      throw error;
    }
  },
  editBlog: async (blogId, updatedData) => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No access token found. Please log in.");

  const response = await fetch(`${BASE_URL}/blogs/${blogId}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to edit blog");

  return data.blog;
},
deleteBlog: async (blogId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access token found. Please log in.");

    try {
      const response = await fetch(`${BASE_URL}/blogs/${blogId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete blog");

      return data;
    } catch (error) {
      console.error("Delete Blog API error:", error);
      throw error;
    }
  },

  // NEW: Admin function to delete any blog
  adminDeleteBlog: async (blogId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access token found. Please log in.");

    try {
      const response = await fetch(`${BASE_URL}/blogs/admin/${blogId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete blog as admin");
      return data;
    } catch (error) {
      console.error("Admin Delete Blog API error:", error);
      throw error;
    }
  },
};

export default api;