import { useEffect, useState } from "react";
import BlogFolderCard from "./BlogFolderCard";
import api from "../services/api";

export default function FeaturedBlogsFolderStyle() {
  const [topBlogs, setTopBlogs] = useState([]);

  useEffect(() => {
    const fetchTopViewedBlogs = async () => {
      try {
        const allBlogs = await api.getAllBlogs();
        const published = allBlogs.filter((b) => b.status === "published");
        const sortedByViews = published.sort((a, b) => (b.views || 0) - (a.views || 0));
        setTopBlogs(sortedByViews.slice(0, 10)); // Top 10 blogs by views
      } catch (error) {
        console.error("Failed to load featured blogs:", error);
      }
    };

    fetchTopViewedBlogs();
  }, []);

  return (
    <section className="pt-36 bg-[#f5f2ec] pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-7xl font-dancing font-bold text-black mb-2">
            We don’t gatekeep in this house!
          </h2>
          <p className="text-lg text-gray-600">
            Our favorite blog picks - free and fabulous.
          </p>
        </div>

        <div className="overflow-x-auto py-12">
          <div className="flex gap-2 w-max">
            {topBlogs.map((blog) => (
              <div key={blog._id} className="min-w-[320px] max-w-sm">
                <BlogFolderCard
                  blog={{
                    id: blog._id,
                    title: blog.title,
                    excerpt: blog.excerpt,
                    author: blog.author,
                    category: blog.category || "Uncategorized",
                    readTime: blog.readTimeManual
                      ? `${blog.readTimeManual} min read`
                      : `${Math.max(1, Math.ceil((blog.content?.length || 0) / 500))} min read`,
                    publishedAt: new Date(blog.publishedAt).toLocaleDateString(),
                    likes: Array.isArray(blog.likes) ? blog.likes.length : Number(blog.likes) || 0,
                    comments: Array.isArray(blog.comments)
                      ? blog.comments.length
                      : Number(blog.comments) || 0,
                    views: blog.views || 0,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
