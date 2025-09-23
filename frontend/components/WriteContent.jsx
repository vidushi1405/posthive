"use client"

import { useState, useEffect } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"
import { Button } from "@/components/ui/button"
import { Save, Eye, ArrowLeft } from "lucide-react"
import api from "../services/api"
import MarkdownIt from "markdown-it"
import toast from 'react-hot-toast'
const mdParser = new MarkdownIt()

export default function WriteContent() {
  const { id } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()

  const [blogId, setBlogId] = useState(state?.blogId || state?.blog?._id || id || null)
  const [title, setTitle] = useState(state?.title || state?.blog?.title || "")
  const [content, setContent] = useState(state?.content || state?.blog?.content || "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // 🔄 Fetch blog if editing directly via URL
  useEffect(() => {
    const fetchBlog = async () => {
      if (blogId && !state?.blog && !state?.title) {
        try {
          const blog = await api.getBlogById(blogId)
          if (blog && blog.author?._id === api.getCurrentUserId()) {
            setTitle(blog.title)
            setContent(blog.content)
          } else {
            setError("Unauthorized or blog not found.")
          }
        } catch (err) {
          setError("Failed to load blog.")
          console.error(err)
        }
      }
    }
    fetchBlog()
  }, [blogId, state])

  const handleSave = async (status) => {
    setError(null)
    setIsLoading(true)

    if (!blogId) {
      setError("Blog ID is missing. Cannot save content.")
      setIsLoading(false)
      return
    }

    if (status === "published" && !content.trim()) {
      setError("Blog content cannot be empty when publishing.")
      setIsLoading(false)
      return
    }

    try {
      let updatedBlog
      if (state?.blog) {
        updatedBlog = await api.editBlog(blogId, { content, status })
      } else {
        updatedBlog = await api.updateBlog(blogId, { content, status })
      }

      toast.success(`Blog ${status === "published" ? "published" : "saved"} successfully!`)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message || "Failed to save blog.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result) // base64 string
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <div className="px-10 py-10 w-screen bg-black text-white">
      <div className="flex justify-between mb-6">
        <Button onClick={() => navigate(-1)} className="bg-gray-700 text-white hover:bg-gray-600">
          <ArrowLeft className="mr-2" /> Back
        </Button>
        <div className="flex space-x-3">
          <Button onClick={() => handleSave("draft")} disabled={isLoading} className="bg-gray-700 text-white hover:bg-gray-600">
            <Save className="mr-2" /> Save Draft
          </Button>
          <Button
            className="bg-white text-white hover:bg-gray-200"
            onClick={() => handleSave("published")}
            disabled={isLoading}
          >
            <Eye className="mr-2" /> Publish
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

      <h1 className="text-2xl font-bold mb-4">{title || "Untitled Blog"}</h1>

      <MdEditor
        value={content}
        style={{ height: "600px" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={({ text }) => setContent(text)}
        config={{
          imageAccept: ".jpg,.jpeg,.png,.webp",
          onImageUpload: handleImageUpload,
          syncScrollMode: ["leftFollowRight", "rightFollowLeft"],
        }}
      />
    </div>
  )
}