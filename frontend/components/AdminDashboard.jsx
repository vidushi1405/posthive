"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Navbar from "./NavBar";
import api from "../services/api";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const userData = await api.getProfile();
        if (userData.role !== 'admin') {
          navigate("/"); // Redirect non-admins
          return;
        }

        const allBlogs = await api.getAllBlogs();
        setBlogs(allBlogs);

        // NOTE: A new API endpoint would be needed to fetch all users.
        // For now, let's assume getProfile returns all users for an admin.
        // Or you can create a new route in the backend: `router.get('/users/all', verifyAccessToken, verifyAdmin, authController.getAllUsers);`
        // For this example, let's just use a placeholder.
        const allUsers = [{ name: userData.name, email: userData.email, role: userData.role }];
        setUsers(allUsers);

      } catch (err) {
        setError(err.message || "Failed to load admin data.");
        console.error("AdminDashboard fetch error:", err);
        api.logout();
        navigate("/signin");
      } finally {
        setLoading(false);
        setLoadingUsers(false);
      }
    };
    fetchAllData();
  }, [navigate]);

  const handleDeleteBlog = async (blogId) => {
    const loadingId = toast.loading("Deleting blog...");
    try {
      await api.adminDeleteBlog(blogId);
      setBlogs((prev) => prev.filter((b) => b._id !== blogId));
      toast.success("Blog deleted successfully!", { id: loadingId });
    } catch (err) {
      toast.error(err.message || "Failed to delete blog.", {
        id: loadingId,
      });
    }
  };

  if (loading || loadingUsers) {
    return (
      <div className="min-h-screen bg-[#f5f1eb] flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading admin dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f1eb] flex flex-col items-center justify-center p-4">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <Button onClick={() => navigate("/signin")} className="bg-black text-white">
          Go to Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f1eb] pt-16">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-serif font-bold text-black mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-black">All Blogs</CardTitle>
            </CardHeader>
            <CardContent>
              {blogs.length > 0 ? (
                <ul className="space-y-4">
                  {blogs.map((blog) => (
                    <li key={blog._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
                      <div>
                        <h3 className="font-semibold text-gray-900">{blog.title}</h3>
                        <p className="text-sm text-gray-600">Author: {blog.author?.name || 'Unknown'}</p>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteBlog(blog._id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No blogs found.</p>
              )}
            </CardContent>
          </Card>

          {/* Users List - Requires new backend endpoint */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-black">All Users</CardTitle>
            </CardHeader>
            <CardContent>
              {users.length > 0 ? (
                <ul className="space-y-4">
                  {users.map((user) => (
                    <li key={user.email} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email} ({user.role})</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No users found.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}