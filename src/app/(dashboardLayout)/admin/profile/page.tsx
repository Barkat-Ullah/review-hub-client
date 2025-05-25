import ProfilePage from "@/components/dashboard/ProfilePage";
import { getMyProfile } from "@/services/auth";
import React from "react";

export const dynamic = "force-dynamic";
const Profile = async () => {
  const profile = await getMyProfile();
  //   console.log(profile);
  return (
    <div>
      <ProfilePage profile={profile} />
    </div>
  );
};

export default Profile;
