"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthLayout from "./AuthLayout"
import { Eye, EyeOff, ArrowLeft, ArrowRight } from "lucide-react" // Import ArrowRight
import api from "../services/api" // Import the API service
import toast from 'react-hot-toast'

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    dob: "",
    password: "",
    confirmPassword: "",
    q1: "",
    q2: "",
    q3: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentStep, setCurrentStep] = useState(1) // New state for steps
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleNextStep = () => {
    setError(null) // Clear previous errors

    // Validate fields for Step 1 before proceeding
    if (currentStep === 1) {
      const { name, email, phoneNo, dob, password, confirmPassword } = formData
      if (!name || !email || !phoneNo || !dob || !password || !confirmPassword) {
        setError("Please fill in all required fields.")
        return
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.")
        return
      }
      // Add more robust validation (e.g., email format, password strength) if needed
    }

    setCurrentStep((prev) => prev + 1)
  }

  const handlePreviousStep = () => {
    setError(null) // Clear previous errors
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null) // Clear previous errors

    // Validate fields for Step 2 before submitting
    if (currentStep === 2) {
      const { q1, q2, q3 } = formData
      if (!q1 || !q2 || !q3) {
        setError("Please answer all three security questions.")
        return
      }
    }

    setIsLoading(true)
    try {
      // Destructure to match backend schema, excluding confirmPassword
      const { confirmPassword, ...dataToSend } = formData
      await api.signup(dataToSend)
      toast.success("Signup successful! Please sign in.")
      navigate("/signin") // Redirect to sign-in after successful signup
    } catch (err) {
      setError(err.message || "An unexpected error occurred during signup.")
      console.error("Signup error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout title="Create Account" subtitle="Join our community of passionate bloggers">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {currentStep === 1 && (
          <>
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 border-gray-300 focus:border-black focus:ring-black"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 border-gray-300 focus:border-black focus:ring-black"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="phoneNo" className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                id="phoneNo"
                name="phoneNo"
                type="tel"
                required
                value={formData.phoneNo}
                onChange={handleChange}
                className="mt-1 border-gray-300 focus:border-black focus:ring-black"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <Label htmlFor="dob" className="text-sm font-medium text-gray-700">
                Date of Birth
              </Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                required
                value={formData.dob}
                onChange={handleChange}
                className="mt-1 border-gray-300 focus:border-black focus:ring-black"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-black focus:ring-black pr-10"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-black focus:ring-black pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleNextStep}
              className="w-full bg-black hover:bg-gray-800 text-white py-3 text-sm font-medium"
            >
              Next <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold text-gray-800">Security Questions</h3>
              <div>
                <Label htmlFor="q1" className="text-sm font-medium text-gray-700">
                  What is your mother's maiden name?
                </Label>
                <Input
                  id="q1"
                  name="q1"
                  type="text"
                  required
                  value={formData.q1}
                  onChange={handleChange}
                  className="mt-1 border-gray-300 focus:border-black focus:ring-black"
                  placeholder="Your answer"
                />
              </div>
              <div>
                <Label htmlFor="q2" className="text-sm font-medium text-gray-700">
                  What was the name of your first pet?
                </Label>
                <Input
                  id="q2"
                  name="q2"
                  type="text"
                  required
                  value={formData.q2}
                  onChange={handleChange}
                  className="mt-1 border-gray-300 focus:border-black focus:ring-black"
                  placeholder="Your answer"
                />
              </div>
              <div>
                <Label htmlFor="q3" className="text-sm font-medium text-gray-700">
                  What city were you born in?
                </Label>
                <Input
                  id="q3"
                  name="q3"
                  type="text"
                  required
                  value={formData.q3}
                  onChange={handleChange}
                  className="mt-1 border-gray-300 focus:border-black focus:ring-black"
                  placeholder="Your answer"
                />
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <Button
                type="button"
                onClick={handlePreviousStep}
                className="flex-1 border-gray-300 text-white hover:bg-gray-100 bg-transparent"
              >
                <ArrowLeft className="mr-2 w-4 h-4" /> Back
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-black hover:bg-gray-800 text-white py-3 text-sm font-medium"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
          </>
        )}

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {currentStep === 1 ? "Already have an account?" : "Back to sign in?"}{" "}
            <Link to="/signin" className="font-medium text-black hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}
