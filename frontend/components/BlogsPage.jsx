import { useState, useEffect, useMemo } from "react";
import Navbar from "./NavBar";
import BlogFolderCard from "./BlogFolderCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import api from "../services/api";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getAllBlogs();
        setBlogs(data);
      } catch (err) {
        setError(err.message || "Failed to fetch blogs.");
        console.error("BlogsPage fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredAndSortedBlogs = useMemo(() => {
    let currentBlogs = [...blogs];

    if (searchTerm) {
      currentBlogs = currentBlogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case "latest":
        currentBlogs.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
        break;
      case "oldest":
        currentBlogs.sort(
          (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)
        );
        break;
      case "most-liked":
        currentBlogs.sort((a, b) => {
          const aLikes = Array.isArray(a.likes)
            ? a.likes.length
            : Number(a.likes) || 0;
          const bLikes = Array.isArray(b.likes)
            ? b.likes.length
            : Number(b.likes) || 0;
          return bLikes - aLikes;
        });
        break;
      case "most-viewed":
        currentBlogs.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      default:
        break;
    }

    return currentBlogs;
  }, [blogs, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-black text-white py-16">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-7xl font-tangerine font-bold text-white mb-2">
            Our Blog Collection
          </h2>
          <p className="text-lg text-gray-400 font-poppins">
            Explore articles on various topics.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search blogs by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:border-white focus:ring-white rounded-md font-poppins"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <Select onValueChange={setSortBy} defaultValue={sortBy}>
            <SelectTrigger className="w-full sm:w-[180px] bg-gray-900 border-gray-700 focus:border-white focus:ring-white text-white font-poppins">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 shadow-lg text-white font-poppins">
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="most-liked">Most Liked</SelectItem>
              <SelectItem value="most-viewed">Most Viewed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-screen">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col items-stretch">
                <div className="folder-bg rounded-lg p-12 flex flex-col justify-between gap-4 animate-pulse bg-gray-900/60">
                  <div className="flex flex-col gap-2">
                    <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                  </div>
                  <div className="flex items-center gap-5 text-sm text-gray-600">
                    <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="flex justify-between px-10 items-center text-sm text-gray-600 mt-2">
                  <div className="flex items-center gap-4">
                    <div className="h-4 bg-gray-700 rounded w-8"></div>
                    <div className="h-4 bg-gray-700 rounded w-8"></div>
                  </div>
                  <div className="h-8 w-8 bg-gray-700 rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredAndSortedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedBlogs.map((blog) => (
              <BlogFolderCard
                key={blog._id}
                blog={{
                  id: blog._id,
                  title: blog.title,
                  excerpt: blog.excerpt,
                  category: blog.category || "Uncategorized",
                  readTime: blog.readTimeManual
                    ? `${blog.readTimeManual} min read`
                    : `${Math.max(
                        1,
                        Math.ceil((blog.content?.length || 0) / 500)
                      )} min read`,
                  views: blog.views || 0,
                  likes: Array.isArray(blog.likes)
                    ? blog.likes.length
                    : Number(blog.likes) || 0,
                  comments: Array.isArray(blog.comments)
                    ? blog.comments.length
                    : Number(blog.comments) || 0,
                  status: blog.status,
                  publishedAt: blog.publishedAt,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 text-lg py-20">
            No blogs found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}