'use client'

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { signUp } from "@/lib/auth"; // Assuming signUp is in lib/auth

// Zod schema for validation
const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Extract form values
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate inputs
    const validation = signUpSchema.safeParse({ name, email, password });

    if (!validation.success) {
      // Show error messages
      validation.error.errors.forEach((error) => {
        toast({
          title: "Validation Error",
          description: error.message,
          variant: "destructive",
        });
      });
      return;
    }

    setLoading(true);

    try {
      const response = await signUp(name, email, password); // Call your signup function

      if (!response.success) {
        // Handle user already registered scenario
        toast({
          title: "Error",
          description: response.message, // "User already registered. Please sign in."
          variant: "destructive",
        });
        return;
      }

      // Inform the user to check their email
      toast({
        title: "Success!",
        description: response.message, // Email verification message
      });

      // Redirect to sign-in page
      router.push("/sign-in");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="ml-2 text-2xl font-bold">TrendChat</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold">Create an account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Start your journey with TrendChat
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <Input id="name" name="name" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>
        </div>
      </Card>
    </div>
  );
}
