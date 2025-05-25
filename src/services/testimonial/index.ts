/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const createTestimonial = async (data: {
  title: string;
  description: string;
  rating: number;
  recommendation: boolean;
  userId: string;
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonial`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    console.log(response);
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllTestimonials = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonial`);
    const response = (await res.json()) || [];
    return response;
  } catch (error: any) {
    console.error("Error fetching Payments:", error);
    return [];
  }
};

export type ContactCategory =
  | "GENERAL"
  | "SUPPORT"
  | "BUG_REPORT"
  | "PARTNERSHIP"
  | "FEATURE_REQUEST";
export type ContactPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface IContactPayload {
  name: string;
  email: string;
  phone?: string;
  category: ContactCategory;
  subject: string;
  message: string;
  priority: ContactPriority;
}

// POST: Create Contact
export const createContact = async (data: IContactPayload) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to create contact");
    }

    const response = await res.json();
    return response;
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong");
  }
};

// GET: All Contacts
export const getAllContact = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`);

    if (!res.ok) {
      throw new Error("Failed to fetch contacts");
    }

    const response = (await res.json()) || [];
    return response;
  } catch (error: any) {
    console.error("Error fetching Contacts:", error);
    return [];
  }
};
