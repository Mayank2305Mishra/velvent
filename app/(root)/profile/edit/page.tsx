"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Camera, Save, Mail, Phone, Calendar, Users, FileText, Upload, Crop, Loader2, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { user_profileSchema, formFieldConfig } from "@/lib/validation";
import { useAuthStore } from "@/app/store";

type ProfileFormData = z.infer<typeof user_profileSchema>;

export default function EditProfilePage() {
  const { user } = useAuthStore();
  const [userData, setUserData] = useState<User | null>(null);
  const [profileImage, setProfileImage] = useState<string>("");
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cropPreview, setCropPreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(user_profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dob: new Date(),
      gender: "Male",
      bio: "",
    },
  });

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsDataLoading(true);
        const { user } = useAuthStore()
        setUserData(user);
        setProfileImage(user.avatar);
        let gender = "Others";

        // Update form with loaded data
        form.reset({
          name: user.name,
          email: user.email,
          phone: user.phone,
          dob: user.dob,
          gender: (user.gender === "Male" || user.gender === "Female" || user.gender === "Others") ? user.gender : "Others",
          bio: user.bio,
        });
      } catch (error) {
        console.error("Failed to load user data:", error);
      } finally {
        setIsDataLoading(false);
      }
    };

    loadUserData();
  }, [form]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCropPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropAndSave = useCallback(() => {
    if (!cropPreview) return;

    const canvas = canvasRef.current;
    const image = imageRef.current;

    if (canvas && image) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const size = 200;
        canvas.width = size;
        canvas.height = size;

        // Draw circular crop
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
        ctx.clip();

        // Calculate dimensions to maintain aspect ratio
        const aspectRatio = image.naturalWidth / image.naturalHeight;
        let drawWidth = size;
        let drawHeight = size;
        let offsetX = 0;
        let offsetY = 0;

        if (aspectRatio > 1) {
          drawHeight = size / aspectRatio;
          offsetY = (size - drawHeight) / 2;
        } else {
          drawWidth = size * aspectRatio;
          offsetX = (size - drawWidth) / 2;
        }

        ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

        const croppedImageUrl = canvas.toDataURL("image/jpeg", 0.9);
        setProfileImage(croppedImageUrl);
        setIsImageDialogOpen(false);
        setCropPreview("");
        setSelectedFile(null);
      }
    }
  }, [cropPreview]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!userData) return;

    setIsLoading(true);
    try {
      console.log(data);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isDataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-slate-600" />
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Failed to load profile data</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4"
            variant="outline"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Edit Profile</h1>
          <p className="text-slate-600">Update your personal information and preferences</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-semibold text-slate-900">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                    <AvatarImage src={profileImage} alt="Profile" />
                    <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                      {getInitials(userData.name)}
                    </AvatarFallback>
                  </Avatar>
                  <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        size="sm"
                        className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Update Profile Picture</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileSelect}
                          accept="image/*"
                          className="hidden"
                        />

                        {!cropPreview ? (
                          <Button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Choose Image
                          </Button>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex justify-center">
                              <div className="relative">
                                <img
                                  ref={imageRef}
                                  src={cropPreview}
                                  alt="Preview"
                                  className="max-w-full h-48 object-contain rounded-lg"
                                />
                                <div className="absolute inset-0 border-2 border-dashed border-blue-400 rounded-lg pointer-events-none"></div>
                              </div>
                            </div>
                            <canvas ref={canvasRef} className="hidden" />
                            <div className="flex space-x-2">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  setCropPreview("");
                                  setSelectedFile(null);
                                }}
                                className="flex-1"
                              >
                                Cancel
                              </Button>
                              <Button
                                type="button"
                                onClick={handleCropAndSave}
                                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                              >
                                <Crop className="mr-2 h-4 w-4" />
                                Apply
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <p className="text-sm text-slate-500 text-center">
                  Click the camera icon to update your profile picture
                </p>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field (Non-editable) */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center text-sm font-medium text-slate-700">
                    <User className="mr-2 h-4 w-4" />
                    {formFieldConfig.name.label}
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      {...form.register("name")}
                      disabled={!formFieldConfig.name.editable}
                      className="bg-slate-50 text-slate-500 cursor-not-allowed"
                    />
                    {!formFieldConfig.name.editable && (
                      <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs bg-slate-200">
                        Read-only
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Email Field (Non-editable) */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center text-sm font-medium text-slate-700">
                    <Mail className="mr-2 h-4 w-4" />
                    {formFieldConfig.email.label}
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      {...form.register("email")}
                      disabled={!formFieldConfig.email.editable}
                      className="bg-slate-50 text-slate-500 cursor-not-allowed"
                    />
                    {!formFieldConfig.email.editable && (
                      <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs bg-slate-200">
                        Read-only
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Phone Field (Editable) */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center text-sm font-medium text-slate-700">
                    <Phone className="mr-2 h-4 w-4" />
                    {formFieldConfig.phone.label}
                  </Label>
                  <Input
                    id="phone"
                    {...form.register("phone")}
                    className={cn(
                      "transition-colors",
                      form.formState.errors.phone ? "border-red-500 focus:border-red-500" : ""
                    )}
                  />
                  {form.formState.errors.phone && (
                    <p className="text-sm text-red-600">{form.formState.errors.phone.message}</p>
                  )}
                </div>

                {/* Date of Birth Field */}
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="flex items-center text-sm font-medium text-slate-700">
                    <Calendar className="mr-2 h-4 w-4" />
                    {formFieldConfig.dob.label}
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    {...form.register("dob")}
                    className={cn(
                      "transition-colors",
                      form.formState.errors.dob ? "border-red-500 focus:border-red-500" : ""
                    )}
                  />
                  {form.formState.errors.dob && (
                    <p className="text-sm text-red-600">{form.formState.errors.dob.message}</p>
                  )}
                </div>

                {/* Gender Field */}
                <div className="space-y-2 md:col-span-2">
                  <Label className="flex items-center text-sm font-medium text-slate-700">
                    <Users className="mr-2 h-4 w-4" />
                    {formFieldConfig.gender.label}
                  </Label>
                  <Select
                    value={form.watch("gender")}
                    onValueChange={(value) => {
                      switch (value) {
                        case "Male":
                        case "Female":
                        case "Others":
                          form.setValue("gender", value);
                          break;
                        default:
                          form.setValue("gender", "Others");
                      }
                    }}
                  >
                    <SelectTrigger className={cn(
                      "transition-colors",
                      form.formState.errors.gender ? "border-red-500 focus:border-red-500" : ""
                    )}>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {formFieldConfig.gender.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.gender && (
                    <p className="text-sm text-red-600">{form.formState.errors.gender.message}</p>
                  )}
                </div>
              </div>

              {/* Bio Field */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="flex items-center text-sm font-medium text-slate-700">
                  <FileText className="mr-2 h-4 w-4" />
                  {formFieldConfig.bio.label}
                </Label>
                <Textarea
                  id="bio"
                  {...form.register("bio")}
                  rows={formFieldConfig.bio.rows}
                  className={cn(
                    "resize-none transition-colors",
                    form.formState.errors.bio ? "border-red-500 focus:border-red-500" : ""
                  )}
                  placeholder="Tell us a bit about yourself..."
                />
                <div className="flex justify-between items-center">
                  {form.formState.errors.bio ? (
                    <p className="text-sm text-red-600">{form.formState.errors.bio.message}</p>
                  ) : (
                    <div />
                  )}
                  <p className="text-xs text-slate-500">
                    {form.watch("bio")?.length || 0}/{formFieldConfig.bio.maxLength} characters
                  </p>
                </div>
              </div>

              <Separator />

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}