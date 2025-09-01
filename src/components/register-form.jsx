import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, Navigate, useNavigate } from "react-router"
import { useState } from "react"
import authService from "@/services/AuthService"
import { observer } from "mobx-react-lite"
import { toast } from "sonner"
import { Loader2, Github } from "lucide-react"

const RegisterForm = observer(({ className, ...props }) => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { name, email, password } = formData
      const res = await authService.register(name, email, password)

      if (res) {
        toast.success("🎉 Registration Successful!")
        navigate("/login")
      } else {
        toast.error("⚠️ Email already exists or invalid email address")
      }
    } catch (error) {
      console.error(error)
      toast.error("❌ Something went wrong, please try again.")
    } finally {
      setLoading(false)
    }
  }

  return authService.isLoggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleRegister}
      {...props}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Create an Account</h1>
        <p className="text-muted-foreground text-sm max-w-sm">
          Fill in the details below to get started
        </p>
      </div>

      {/* Input Fields */}
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Register"
          )}
        </Button>
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4 hover:text-primary">
          Sign In
        </Link>
      </p>
    </form>
  )
})

export default RegisterForm
