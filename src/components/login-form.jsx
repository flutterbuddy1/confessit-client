import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, Navigate, useNavigate } from "react-router"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import authService from "@/services/AuthService"
import { Loader2 } from "lucide-react"

const LoginForm = observer(({ className, ...props }) => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const performLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authService.login(email, password)
      if (res) {
        navigate("/")
      }
    } catch (err) {
      console.error("Login failed:", err)
      // Ideally, show a toast notification for error
    } finally {
      setLoading(false)
    }
  }

  return authService.isLoggedIn ? (
    <Navigate to={"/"} replace />
  ) : (
    <form
      className={cn("flex flex-col gap-6 w-full max-w-sm mx-auto", className)}
      aria-disabled={loading}
      onSubmit={performLogin}
      {...props}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email and password to continue
        </p>
      </div>

      {/* Inputs */}
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Login Button */}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </Button>

      {/* Signup link */}
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to={"/register"} className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  )
})

export default LoginForm
