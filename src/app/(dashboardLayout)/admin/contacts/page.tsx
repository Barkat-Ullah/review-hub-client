import GetAllContact from "@/components/admin/AllContact/GetAllContact";
import { getAllContact } from "@/services/testimonial";
import React from "react";

const AllContacts = async () => {
  const { data: contacts } = (await getAllContact()) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Contact Management
          </h1>
          <p className="mt-2 text-gray-600">
            Manage and respond to customer inquiries
          </p>
        </div>
        <GetAllContact contacts={contacts} />
      </div>
    </div>
  );
};

export default AllContacts;
