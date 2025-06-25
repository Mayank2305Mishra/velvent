'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FadeInStagger } from '@/components/velventUI/Animation';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, Mail, Phone, User, Lock, FileText, Users } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { FaGoogle } from "react-icons/fa6";
import { userSignupSchema } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import {  getAccount, googleLogin, storeGoogleUser, user_signUp } from '@/lib/actions/user.action';


const page = () => {
  const route = useRouter()
  const [loading, setloading] = useState<boolean>(false);
  const { register,
    handleSubmit,
    setValue,
    formState: { errors }, } = useForm<z.infer<typeof userSignupSchema>>({
      resolver: zodResolver(userSignupSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
        phone: "",
        bio: "",
        dob: "",
        gender: "Male",
      },
    });
  const onSubmit = async (data: z.infer<typeof userSignupSchema>) => {
    setloading(true)
    try {
      const response = await user_signUp({
        ...data,
        dob: new Date(data.dob),
      })
      console.log(response)
      if(response) route.push('/')
    } catch (error) {
     console.error('ERROR',error) 
    }finally{
      setloading(false)
    }
  };
  const handleGoogleSignUp = async() => {
    console.log('Google sign up clicked');
    await googleLogin();
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-velvent">Create Account</h1>
            <p className="text-gray-600 mt-2">Join us and start your journey today</p>
          </div>
        </div>
        <Card className="border-0 shadow-2xl  bg-light-400">
          <CardHeader className="space-y-4 pb-8">
            <div className="text-center">
              <CardTitle className="text-2xl font-semibold text-velvent">Sign Up</CardTitle>
              <CardDescription className="text-black">
                Create your account with us
              </CardDescription>
            </div>

            {/* Google Sign Up Button */}
            <Button
              variant="outline"
              onClick={handleGoogleSignUp}
              className="w-full h-12 border-gray-200 text-velvent hover:text-black hover:bg-light-300 transition-all duration-200"
            >
              <FaGoogle />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-light-400 px-4 text-black">Or continue with email</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-black">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="Enter your full name"
                  className="h-12 text-gray-950 placeholder:text-gray-950 border-gray-200 focus:border-black focus:ring-black"
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-black">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="Enter your email"
                  className="h-12 text-gray-950 placeholder:text-gray-950 border-gray-200 focus:border-black focus:ring-black"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-black">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  placeholder="+1 (555) 000-0000"
                  className="h-12 text-gray-950 placeholder:text-gray-950 border-gray-200 focus:border-black focus:ring-black"
                />
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium text-black">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  placeholder="Create a strong password"
                  className="h-12 text-gray-950 placeholder:text-gray-950 border-gray-200 focus:border-black focus:ring-black"
                />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Date of Birth and Gender Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob" className="flex items-center gap-2 text-sm font-medium text-black">
                    <Calendar className="w-4 h-4" />
                    Date of Birth
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    {...register('dob')}
                    className="h-12 text-gray-950 placeholder:text-gray-950 border-gray-200 focus:border-black focus:ring-black"
                  />
                  {errors.dob && (
                    <p className="text-sm text-red-600">{errors.dob.message}</p>
                  )}
                </div>

                <div className="space-y-2 w-full">
                  <Label className="flex items-center gap-2 text-sm font-medium text-black">
                    <Users className="w-4 h-4" />
                    Gender
                  </Label>
                  <Select onValueChange={(value) => setValue('gender', value as any)}>
                    <SelectTrigger className="h-12 text-gray-950 placeholder:text-gray-950 border-gray-200 focus:border-black focus:ring-black">
                      <SelectValue className='text-gray-950 placeholder:text-gray-950 w-full h-12' placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Others">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-sm text-red-600">{errors.gender.message}</p>
                  )}
                </div>
              </div>

              {/* Bio Field */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="flex items-center gap-2 text-sm font-medium text-black">
                  <FileText className="w-4 h-4" />
                  Bio (Optional)
                </Label>
                <Textarea
                  id="bio"
                  {...register('bio')}
                  placeholder="Tell us a bit about yourself..."
                  className="min-h-24 text-gray-950 placeholder:text-gray-950 border-gray-200 focus:border-black focus:ring-black resize-none"
                />
                {errors.bio && (
                  <p className="text-sm text-red-600">{errors.bio.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-velvent hover:bg-gray-800 text-white transition-all duration-200"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/user/login" className="text-velvent font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
        <br />
        <br />
      </div>
    </div>
  )
}

export default page