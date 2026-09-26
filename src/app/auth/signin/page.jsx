"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, Separator } from "@heroui/react";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      const { error } = await signIn.email({
        email: email,
        password: password,
        callbackURL: "/",
      });

      if (error) {
        setLoginError(
          error.message || "Invalid email or password. Please try again.",
        );
        toast.error(error.message || "Login failed.");
      } else {
        toast.success("Welcome back! Logged in successfully.");
        router.push("/");
      }
    } catch (err) {
      setLoginError(err.message || "Something went wrong.");
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("Google sign in failed.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md p-8 rounded-2xl border border-default-200/60 bg-background/50 backdrop-blur-md shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-xl bg-linear-to-r from-violet-500 to-indigo-600 text-white mb-2">
            <LogIn size={20} className="mr-1" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Sign In to Your Account
          </h2>
          <p className="text-sm text-foreground/60">
            Welcome back! Please enter your details.
          </p>
        </div>
        {/* Error Feedback */}
        {loginError && (
          <div className="p-3 text-sm text-rose-500 bg-rose-500/10 rounded-xl border border-rose-500/20 text-center font-medium">
            {loginError}
          </div>
        )}

        {/* Form Elements */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/90 block">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="john@example.com"
              variant="bordered"
              radius="xl"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/90 block">
              Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <Input
                placeholder="Enter your password"
                variant="bordered"
                radius="xl"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={isVisible ? "text" : "password"}
                className="w-full"
              />

              {/* Toggle visibility button */}
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 focus:outline-none text-default-400 hover:text-default-600 transition-colors flex items-center justify-center"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            radius="xl"
            disabled={loading}
            className="w-full font-medium bg-linear-to-r from-violet-500 to-indigo-600 text-white shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all mt-4"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin text-white" />
                <span>Logging In...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="flex items-center my-2">
          <Separator className="flex-1" />
          <span className="px-3 text-tiny text-default-400 uppercase">OR</span>
          <Separator className="flex-1" />
        </div>

        {/* Google Login Button */}
        <Button
          variant="bordered"
          radius="xl"
          className="w-full font-medium border"
          isLoading={googleLoading}
          onClick={handleGoogleLogin}
        >
          <FcGoogle />
          Sign in with Google
        </Button>

        <Separator className="my-4" />

        {/* Footer Link */}
        <p className="text-center text-sm text-foreground/60">
          Don&lsquo;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
