"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Camera, Save, User, Mail, Phone, Calendar, Users, FileText, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { user_profileSchema, type ProfileFormData } from '@/lib/validation';
import { ImageCropper } from '@/components/velventUI/image-cropper';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/app/store';


export default function ProfileEditPage() {
  const { user, updateUserField } = useAuthStore();
  const [isAvatarCropperOpen, setIsAvatarCropperOpen] = useState(false);
  const [isBannerCropperOpen, setIsBannerCropperOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(user_profileSchema),
    defaultValues: {
      phone: user.phone,
      dob: user.dob instanceof Date ? user.dob : new Date(user.dob),
      gender: (user.gender == "Male" || user.gender == "Female" || user.gender == "Others") ? user.gender : "Male",
      bio: user.bio,
      avatar: user.avatar,
      bannerImg: user.bannerImg,
    },
  });

  useEffect(() => {
    form.reset({
      phone: user.phone,
      dob: user.dob,
      gender: (user.gender == "Male" || user.gender == "Female" || user.gender == "Others") ? user.gender : "Male",
      bio: user.bio,
      avatar: user.avatar,
      bannerImg: user.bannerImg,
    });
  }, [user, form]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    console.log(data);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data in store
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          updateUserField(key as keyof typeof data, value);
        }
      });
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarCrop = (croppedImageUrl: string) => {
    updateUserField('avatar', croppedImageUrl);
    form.setValue('avatar', croppedImageUrl);
  };

  const handleBannerCrop = (croppedImageUrl: string) => {
    updateUserField('bannerImg', croppedImageUrl);
    form.setValue('bannerImg', croppedImageUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Edit Profile
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Update your personal information and preferences
          </p>
        </div>

        {/* Profile Preview Card */}
        <Card className="mb-8 overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <div className="relative">
            {/* Banner Image */}
            <div 
              className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative group cursor-pointer"
              style={{
                backgroundImage: user.bannerImg ? `url(${user.bannerImg})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              onClick={() => setIsBannerCropperOpen(true)}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-200" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-white/90 dark:bg-slate-800/90 rounded-full p-3">
                  <Camera className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                </div>
              </div>
              <Badge 
                variant="secondary" 
                className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300"
              >
                <ImageIcon className="h-3 w-3 mr-1" />
                Change Banner
              </Badge>
            </div>

            {/* Profile Avatar */}
            <div className="absolute -bottom-16 left-8">
              <div className="relative group cursor-pointer" onClick={() => setIsAvatarCropperOpen(true)}>
                <Avatar className="h-32 w-32 border-4 border-white dark:border-slate-800 shadow-xl">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <CardContent className="pt-20 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {user.name}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </p>
              </div>
              <Badge variant="outline" className="w-fit">
                <User className="h-3 w-3 mr-1" />
                {user.gender}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <FileText className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Non-editable fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    <Input 
                      value={user.name} 
                      disabled 
                      className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400" 
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Name cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input 
                      value={user.email} 
                      disabled 
                      className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400" 
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Email cannot be changed</p>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Editable fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Gender
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Date of Birth
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Bio
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about yourself..."
                          className="min-h-[100px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {field.value?.length || 0}/500 characters
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end pt-6">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Image Croppers */}
      <ImageCropper
        isOpen={isAvatarCropperOpen}
        onClose={() => setIsAvatarCropperOpen(false)}
        onCropComplete={handleAvatarCrop}
        aspectRatio={1}
        title="Crop Profile Picture"
      />

      <ImageCropper
        isOpen={isBannerCropperOpen}
        onClose={() => setIsBannerCropperOpen(false)}
        onCropComplete={handleBannerCrop}
        aspectRatio={16 / 9}
        title="Crop Banner Image"
      />
    </div>
  );
}