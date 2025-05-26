"use client"
import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LockKeyhole } from "lucide-react";
import { FadeInStagger } from '@/components/velventUI/Animation';
import VelventIcon from '@/components/velventUI/VelventIcon';

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    //await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    // Handle login logic here
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-background">
      <div className="w-full max-w-md">
        <FadeInStagger>
          <motion.div className="mb-10 flex flex-col gap-4 items-center">
            <VelventIcon height={140} width={140} /> 
            <h2 className="text-2xl font-medium">Sign In</h2>
          </motion.div>
          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="h-12 border-muted-foreground/20"
              />
            </motion.div>

            <motion.div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <motion.a
                  href="#"
                  className="text-xs text-primary hover:underline transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                >
                  Forgot password?
                </motion.a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-12 border-muted-foreground/20"
              />
            </motion.div>

            <motion.div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </motion.div>


            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white transition-all duration-300"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                  Signing In
                </div>
              ) : "Sign In"}
            </Button>

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a href="#" className="text-primary hover:underline">
                  Create account
                </a>
              </p>
            </div>
          </form>
        </FadeInStagger>
      </div>
    </div>
  )
}

export default page