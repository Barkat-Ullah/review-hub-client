"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  PencilIcon,
  ShieldIcon,
} from "lucide-react";
import { toast } from "react-toastify";

// Updated Profile type to match your actual data structure
export type Profile = {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  profileUrl?: string | null;
  role: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

// Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Helper function to get initials from name
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
};

const ProfilePage = ({ profile }: { profile: Profile }) => {
  const handleEdit = () => {
    toast.error("Not Applicable");
  };

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-yellow-500 to-orange-600"></div>
            <div className="flex justify-center -mt-16">
              <Avatar className="h-32 w-32 border-4 border-white">
                <AvatarImage
                  src={
                    profile?.profileUrl ||
                    "https://i.ibb.co/WpH6qBCM/images-8.jpg"
                  }
                  alt={profile?.name || "image"}
                />
                <AvatarFallback className="text-3xl bg-orange-100 text-orange-600">
                  {getInitials(profile?.name || "U")}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardContent className="text-center pt-4">
              <h2 className="text-2xl font-bold">{profile?.name}</h2>
              <p className="text-muted-foreground">@{profile?.username}</p>
              <div className="flex justify-center mt-2">
                <Badge
                  variant="outline"
                  className="bg-yellow-50 text-yellow-700 border-yellow-200"
                >
                  {profile?.role}
                </Badge>
                <Badge
                  variant="outline"
                  className="ml-2 bg-orange-50 text-yellow-700 border-orange-200"
                >
                  {profile?.isDeleted ? "Inactive" : "Active"}
                </Badge>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <MailIcon className="h-4 w-4" />
                  <span className="text-sm">{profile?.email}</span>
                </div>
                {profile?.phone && profile.phone !== "N/A" && (
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <PhoneIcon className="h-4 w-4" />
                    <span className="text-sm">{profile?.phone}</span>
                  </div>
                )}
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span className="text-sm">
                    Joined {profile?.createdAt && formatDate(profile.createdAt)}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <Button
                onClick={handleEdit}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                <PencilIcon className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShieldIcon className="mr-2 h-5 w-5 text-yellow-600" />
                User Information
              </CardTitle>
              <CardDescription>
                Detailed information about the user account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Full Name
                  </p>
                  <p className="font-semibold">{profile?.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Username
                  </p>
                  <p className="font-semibold">{profile?.username}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Email Address
                  </p>
                  <p className="font-semibold">{profile?.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Phone Number
                  </p>
                  <p className="font-semibold">
                    {profile?.phone === "N/A" ? "Not provided" : profile?.phone}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Role
                  </p>
                  <p className="font-semibold">{profile?.role}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Account Status
                  </p>
                  <p className="font-semibold">
                    {profile?.isDeleted ? "Inactive" : "Active"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Address
                  </p>
                  <p className="font-semibold">
                    {profile?.address === "N/A"
                      ? "Not provided"
                      : profile?.address}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    City
                  </p>
                  <p className="font-semibold">
                    {profile?.city === "N/A" ? "Not provided" : profile?.city}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    State
                  </p>
                  <p className="font-semibold">
                    {profile?.state === "N/A" ? "Not provided" : profile?.state}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Postcode
                  </p>
                  <p className="font-semibold">
                    {profile?.postcode === "N/A"
                      ? "Not provided"
                      : profile?.postcode}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Created At
                  </p>
                  <p className="font-semibold">
                    {profile?.createdAt && formatDate(profile.createdAt)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Last Updated
                  </p>
                  <p className="font-semibold">
                    {profile?.updatedAt && formatDate(profile.updatedAt)}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                onClick={handleEdit}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                Update Profile
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
