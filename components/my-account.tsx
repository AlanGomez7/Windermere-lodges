"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { changePassword, updateUserDetails } from "@/lib/api";
import toast from "react-hot-toast";

export default function MyAccount({ user }: any) {
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    role: "",
    address: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.name ?? "",
        email: user.email ?? "",
        phone: user.mobile ?? "", // Phone not in current user model
        address: user.address ?? "", // Address not in current user model
        role: user.role ?? "",
      });
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailErr("Invalid email format");
      return;
    }

    setIsLoading(true);
    try {
      const response = await updateUserDetails(formData);
      if (response?.ok) {
        toast.success("Profile updated successfully");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordErr("New passwords do not match");
      return;
    }

    setIsPasswordLoading(true);
    try {
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      const response = await changePassword({ passwordData, id: user?.email });

      console.log(response);
      if (response.ok) {
        toast.success("Password updated successfully");
      } else {
        toast.error("Password update failed");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to change password"
      );
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (!user) {
    return (
      <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-full">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="My Accounts"
        description="Manage your profile and personal settings"
        backgroundImage="https://images.unsplash.com/photo-1506260408121-e353d10b87c7?q=80&w=1920&auto=format&fit=crop"
      />
      <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1 animate-card hover-lift">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Avatar className="w-24 h-24 animate-float">
                  <AvatarImage
                    src={user?.avatar || "/placeholder.svg?height=96&width=96"}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-teal-100 to-teal-200 text-teal-700 text-3xl">
                    {getInitials(user?.name || "User")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {(formData && formData?.userName) || "User"}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {formData.role || "Admin"}
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2 justify-center">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{formData && formData.email}</span>
                </div>
                {formData.phone && (
                  <div className="flex items-center gap-2 justify-center">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{formData && formData?.phone}</span>
                  </div>
                )}
                {formData.address && (
                  <div className="flex items-center gap-2 justify-center">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{formData && formData.address}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Account Settings Form */}
          <Card className="lg:col-span-2 animate-card hover-lift">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="user">User Name</Label>
                  <Input
                    id="first-name"
                    value={formData.userName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-email">Email Address</Label>
                  <Input
                    disabled={true}
                    id="account-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                  <p className="text-red-500">{emailErr}</p>
                  {user.googleId && (
                    <p className="text-xs text-gray-400">
                      google login credentials cannot be updated
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="account-phone">Phone Number</Label>
                <Input
                  id="account-phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (123) 456-7890"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-address">Address</Label>
                <Input
                  id="account-address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="123 Admin St, City, Country"
                />
              </div>
              <Button
                className="bg-teal-600 hover:bg-teal-700 animate-button"
                onClick={handleUpdateProfile}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Update Profile
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1 animate-card hover-lift bg-inherit hidden lg:block">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="relative mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-900"></h2>
              <p className="text-sm text-gray-500 mb-4"></p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2 justify-center">
                  {/* <Mail className="w-4 h-4 text-gray-500" /> */}
                  <span></span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  {/* <Phone className="w-4 h-4 text-gray-500" /> */}
                  <span></span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  {/* <MapPin className="w-4 h-4 text-gray-500" /> */}
                  <span></span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Password Change Form */}
          <Card
            className="lg:col-span-2 animate-card hover-lift"
            hidden={user.googleId ? true : false}
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    handlePasswordChange("currentPassword", e.target.value)
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      handlePasswordChange("newPassword", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      handlePasswordChange("confirmPassword", e.target.value)
                    }
                  />
                </div>
              </div>
              <Button
                className="bg-teal-600 hover:bg-teal-700 animate-button"
                onClick={handleChangePassword}
                disabled={isPasswordLoading}
              >
                {isPasswordLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Changing...
                  </>
                ) : (
                  "Change Password"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

