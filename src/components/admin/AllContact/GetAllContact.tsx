"use client";

import React, { useState } from "react";
import {
  Trash2,
  Edit3,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  User,
  MessageSquare,
  Tag,
} from "lucide-react";
import { toast } from "react-toastify";

export interface ContactFormData {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: "BUG_REPORT" | "FEATURE_REQUEST" | "GENERAL_INQUIRY" | "SUPPORT";
  subject: string;
  message: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status?: "PENDING" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  createdAt: string;
  updatedAt: string;
}

interface GetAllContactProps {
  contacts: ContactFormData[];
}

const GetAllContact: React.FC<GetAllContactProps> = ({ contacts }) => {
  console.log(contacts);
  const [contactList, setContactList] = useState<ContactFormData[]>(contacts);
  const [filter, setFilter] = useState<string>("ALL");

  const handleDelete = (id: string) => {
    console.log("Deleting contact:", id);
    toast.warning("Do not delete at this time");
  };

  const handleStatusUpdate = (
    id: string,
    newStatus: ContactFormData["status"]
  ) => {
    setContactList((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? {
              ...contact,
              status: newStatus,
              updatedAt: new Date().toISOString(),
            }
          : contact
      )
    );
    toast.warning("Do not update at this time");
    // Add your status update API call here
    console.log("Updating status:", id, newStatus);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENT":
        return "bg-red-100 text-red-800 border-red-200";
      case "HIGH":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "LOW":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "BUG_REPORT":
        return "bg-red-50 text-red-700 border-red-200";
      case "FEATURE_REQUEST":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "SUPPORT":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "GENERAL_INQUIRY":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string = "PENDING") => {
    switch (status) {
      case "RESOLVED":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "IN_PROGRESS":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "CLOSED":
        return <XCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const StatusUpdateButton: React.FC<{ contact: ContactFormData }> = ({
    contact,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentStatus = contact.status || "PENDING";
    const statusOptions = ["PENDING", "IN_PROGRESS", "RESOLVED", "CLOSED"];

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-yellow-50 text-yellow-300 rounded-lg hover:bg-yellow-100 transition-colors border border-yellow-200"
        >
          <Edit3 className="w-4 h-4" />
          <span className="text-sm font-medium">{currentStatus}</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            <div className="py-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    handleStatusUpdate(
                      contact.id,
                      status as ContactFormData["status"]
                    );
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                    currentStatus === status
                      ? "bg-yellow-50 text-yellow-300"
                      : "text-gray-700"
                  }`}
                >
                  {getStatusIcon(status)}
                  {status.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const filteredContacts =
    filter === "ALL"
      ? contactList
      : contactList.filter(
          (contact) => (contact.status || "PENDING") === filter
        );

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        {["ALL", "PENDING", "IN_PROGRESS", "RESOLVED", "CLOSED"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? "bg-yellow-100 text-yellow-400 border border-yellow-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
              }`}
            >
              {status === "ALL" ? "All Contacts" : status.replace("_", " ")}
              <span className="ml-2 px-2 py-1 bg-white rounded-full text-xs">
                {status === "ALL"
                  ? contactList.length
                  : contactList.filter(
                      (c) => (c.status || "PENDING") === status
                    ).length}
              </span>
            </button>
          )
        )}
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            {/* Card Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {contact.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(contact.status)}
                      <span className="text-sm text-gray-500">
                        {(contact.status || "PENDING").replace("_", " ")}
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
                    contact.priority
                  )}`}
                >
                  {contact.priority}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{contact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4">
              {/* Category and Subject */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(
                      contact.category
                    )}`}
                  >
                    {contact.category.replace("_", " ")}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    {contact.subject}
                  </h4>
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {contact.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer - Action Buttons */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-100">
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Delete</span>
                </button>

                <StatusUpdateButton contact={contact} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No contacts found
          </h3>
          <p className="text-gray-500">
            {filter === "ALL"
              ? "No contacts have been submitted yet."
              : `No contacts with ${filter
                  .replace("_", " ")
                  .toLowerCase()} status.`}
          </p>
        </div>
      )}
    </div>
  );
};
export default GetAllContact;
