import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import BlogFolderCard from "@/components/BlogFolderCard"
import { Textarea } from "@/components/ui/textarea"
import api from "../services/api"

export default function CreateBlog() {
  const navigate = useNavigate()
  const [blogData, setBlogData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [],
    status: "draft",
    readTimeManual: "",
  })
  const [tagInput, setTagInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const categories = [
    "Technology",
    "Lifestyle",
    "Travel",
    "Food",
    "Health",
    "Business",
    "Education",
    "Entertainment",
    "Sports",
    "Other",
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      if (!blogData.tags.includes(tagInput.trim())) {
        setBlogData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }))
      }
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove) => {
    setBlogData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleContinueToContent = async () => {
    setError(null)
    setIsLoading(true)

    if (!blogData.title) {
      setError("Blog title is required to continue.")
      setIsLoading(false)
      return
    }

    try {
      const createdBlog = await api.createBlog({
        title: blogData.title,
        excerpt: blogData.excerpt,
        category: blogData.category,
        tags: blogData.tags,
        status: "draft",
        readTimeManual: blogData.readTimeManual.trim() === "" ? undefined : Number(blogData.readTimeManual),
      })

      navigate("/create/content", {
        state: {
          blogId: createdBlog._id,
          title: createdBlog.title,
          content: createdBlog.content || "",
        },
      })
    } catch (err) {
      setError(err.message || "Failed to create blog draft.")
      console.error("Create blog draft error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative h-full w-screen overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[500px] h-[500px] bg-purple-500 opacity-20 rounded-full top-[60px] left-[30px] blur-3xl" />
        <div className="absolute w-[600px] h-[600px] bg-cyan-500 opacity-20 rounded-full bottom-[-150px] right-[-150px] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-10">
          <Button onClick={() => navigate("/dashboard")} className="bg-gray-700 text-white hover:bg-gray-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button className="bg-white text-white hover:bg-gray-200" onClick={handleContinueToContent} disabled={isLoading}>
            {isLoading ? "Saving Draft..." : "Continue to Content →"}
          </Button>
        </div>

        <h1 className="text-4xl font-poppins font-bold text-white p-8 text-center">Create New Blog</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="grid grid-cols-1 gap-10">
          {/* Blog Details */}
          <div>
            <Card className="bg-gray-900 border-gray-700 shadow-xl rounded-2xl text-white">
              <CardHeader>
                <CardTitle className="text-lg font-poppins text-white">Blog Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title" className="text-sm text-gray-300">
                    Blog Title *
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    value={blogData.title}
                    onChange={handleChange}
                    placeholder="Enter your blog title..."
                    className="mt-1 border-gray-700 bg-gray-900 text-white placeholder:text-gray-500 focus:border-white focus:ring-white"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt" className="text-sm text-gray-300">
                    Excerpt
                  </Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={blogData.excerpt}
                    onChange={handleChange}
                    placeholder="Short description of your blog..."
                    rows={3}
                    className="mt-1 border-gray-700 bg-gray-900 text-white placeholder:text-gray-500 focus:border-white focus:ring-white"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Blog Settings + Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <Card className="bg-gray-900 border-gray-700 shadow-xl rounded-2xl text-white">
                <CardHeader>
                  <CardTitle className="text-lg font-poppins text-white">Blog Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="category" className="text-sm text-gray-300">
                      Category
                    </Label>
                    <select
                      id="category"
                      name="category"
                      value={blogData.category}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-700 rounded-md px-3 py-2 bg-gray-900 text-white focus:border-white focus:ring-white"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="tags" className="text-sm text-gray-300">
                      Tags
                    </Label>
                    <Input
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder="Type and press Enter"
                      className="mt-1 border-gray-700 bg-gray-900 text-white placeholder:text-gray-500 focus:border-white focus:ring-white"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {blogData.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          className="cursor-pointer bg-gray-800 text-white hover:bg-gray-700"
                          onClick={() => removeTag(tag)}
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="readTimeManual" className="text-sm text-gray-300">
                      Estimated Read Time (in minutes)
                    </Label>
                    <Input
                      id="readTimeManual"
                      name="readTimeManual"
                      type="number"
                      min="1"
                      value={blogData.readTimeManual}
                      onChange={handleChange}
                      placeholder="e.g., 4"
                      className="mt-1 border-gray-700 bg-gray-900 text-white placeholder:text-gray-500 focus:border-white focus:ring-white"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            <div>
              <Card className="bg-gray-900 border-gray-700 shadow-xl rounded-2xl text-white">
                <CardHeader>
                  <CardTitle className="text-lg font-poppins text-white">Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <BlogFolderCard
                    blog={{
                      id: "preview",
                      title: blogData.title || "Untitled Blog",
                      excerpt: blogData.excerpt || "This is a short description of your blog post.",
                      category: blogData.category || "Uncategorized",
                      readTime: `${
                        blogData.readTimeManual ||
                        (blogData.content ? Math.max(1, Math.ceil(blogData.content.length / 500)) : 1)
                      } min read`,
                      views: 0,
                      likes: 0,
                      comments: 0,
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}