import AllUsers from "@/components/admin/AllUser/AllUsers";
import { getAllUser } from "@/services/auth";
import React from "react";

export const dynamic = "force-dynamic";

const AllUser = async () => {
  const users = await getAllUser();
  console.log(users);
  return (
    <div>
      <AllUsers users={users} />
    </div>
  );
};

export default AllUser;
