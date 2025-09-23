import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./web/page"
import SignUp from "../components/SignUp"
import SignIn from "../components/SignIn"
import Dashboard from "@/components/DashBoard"
import CreateBlog from "@/components/CreateBlog"
import WriteContent from "@/components/WriteContent"
import AdminDashboard from "@/components/AdminDashboard"
import BlogsPage from "@/components/BlogsPage"
import BlogDetail from "@/components/BlogDetail"
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
     <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/blogs" element={<BlogsPage />} />
         <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/create/content" element={<WriteContent />} />
          <Route path="/edit/:id" element={<WriteContent />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
     
    </>
  )
}

export default App
