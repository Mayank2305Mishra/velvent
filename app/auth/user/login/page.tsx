"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { user_loginEmailSchema, user_loginPhoneSchema, type user_LoginEmailForm, type user_LoginPhoneForm } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Phone, Lock } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa6';
import { user_login } from '@/lib/actions/user.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type LoginForm = user_LoginEmailForm | user_LoginPhoneForm;

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('email');
  const route = useRouter()
  const emailForm = useForm<user_LoginEmailForm>({
    resolver: zodResolver(user_loginEmailSchema),
  });

  const phoneForm = useForm<user_LoginPhoneForm>({
    resolver: zodResolver(user_loginPhoneSchema),
  });

  const onSubmit = async (data: user_LoginEmailForm ) => {
    setIsLoading(true);
    const {email, password} = data;
    try {
      if(activeTab === 'email'){
        const response = await user_login({email,password})
        if(response){
          toast.success(`You have logined sucessfullly with email ${email}`)
          route.push('/')
        }
        if(!response){
          toast.error(`Error in login with email ${email}`)

        }
      }
    } catch (error) {
      console.error('ERROR', error)
    }finally{
      setIsLoading(false);
    }
  };
  const onSubmitPhone = async(data:user_LoginPhoneForm) =>{
    console.log(data);
    
  }

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-velvent">Welcome Back</h1>
            <p className="text-black mt-2">Sign in to your account</p>
          </div>
        </div>
        <Card className="border-0 shadow-2xl bg-light-400">
          <CardHeader className="space-y-4 pb-8">
            <div className="text-center">
              <CardTitle className="text-2xl font-semibold text-black">Sign In</CardTitle>
              <CardDescription className="text-black">
                Access your account
              </CardDescription>
            </div>
            {/* Google Sign In Button */}
            <Button 
              variant="outline" 
              onClick={handleGoogleLogin}
              className="w-full h-12 border-gray-200 text-velvent hover:bg-light-300 hover:text-black transition-all duration-200"
            >
              <FaGoogle />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-light-400 px-4 text-black">Or continue with</span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-light-500">
                <TabsTrigger value="email" className="data-[state=active]:bg-white text-black">Email</TabsTrigger>
                <TabsTrigger value="phone" className="data-[state=active]:bg-white text-black">Phone</TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <form onSubmit={emailForm.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-black">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...emailForm.register('email')}
                      placeholder="Enter your email"
                      className="h-12 text-gray-950 placeholder:text-gray-950 border-gray-200 focus:border-black focus:ring-black"
                    />
                    {emailForm.formState.errors.email && (
                      <p className="text-sm text-red-600">{emailForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-password" className="flex items-center gap-2 text-sm font-medium text-black">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    <Input
                      id="email-password"
                      type="password"
                      {...emailForm.register('password')}
                      placeholder="Enter your password"
                      className="h-12 text-gray-950 placeholder:text-gray-950 border-gray-200 focus:border-black focus:ring-black"
                    />
                    {emailForm.formState.errors.password && (
                      <p className="text-sm text-red-600">{emailForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <Link href="/auth/forgot-password" className="text-sm text-velvent  hover:text-black">
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-velvent hover:bg-gray-800 text-white transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In with Email'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="phone">
                <form onSubmit={phoneForm.handleSubmit(onSubmitPhone)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-black">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...phoneForm.register('phone')}
                      placeholder="+1 (555) 000-0000"
                      className="h-12 text-gray-950 placeholder:text-gray-950 border-gray-200 focus:border-black focus:ring-black"
                    />
                    {phoneForm.formState.errors.phone && (
                      <p className="text-sm text-red-600">{phoneForm.formState.errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone-password" className="flex items-center gap-2 text-sm font-medium text-black">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    <Input
                      id="phone-password"
                      type="password"
                      {...phoneForm.register('password')}
                      placeholder="Enter your password"
                      className="h-12 text-gray-950 placeholder:text-gray-950 border-gray-200 focus:border-black focus:ring-black"
                    />
                    {phoneForm.formState.errors.password && (
                      <p className="text-sm text-red-600">{phoneForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <Link href="/auth/forgot-password" className="text-sm text-velvent hover:text-black">
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-velvent hover:bg-gray-800 text-white transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In with Phone'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-black font-medium hover:underline">
              Create one
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