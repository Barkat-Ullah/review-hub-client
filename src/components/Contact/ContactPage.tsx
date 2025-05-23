/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Send,
  MessageCircle,
  HelpCircle,
  Bug,
  Users,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  ContactCategory,
  ContactPriority,
  createContact,
} from "@/services/testimonial";
import { toast } from "react-toastify";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  category: ContactCategory;
  subject: string;
  message: string;
  priority: ContactPriority;
}

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      category: "" as ContactCategory, // Type assertion for empty initial value
      subject: "",
      message: "",
      priority: "MEDIUM",
    },
  });

  const contactCategories = [
    {
      value: "GENERAL" as const,
      label: "General Inquiry",
      icon: MessageCircle,
      description: "General questions and information",
    },
    {
      value: "SUPPORT" as const,
      label: "Technical Support",
      icon: HelpCircle,
      description: "Technical issues and assistance",
    },
    {
      value: "BUG_REPORT" as const,
      label: "Bug Report",
      icon: Bug,
      description: "Report system bugs and issues",
    },
    {
      value: "PARTNERSHIP" as const,
      label: "Partnership",
      icon: Users,
      description: "Business collaboration opportunities",
    },
    {
      value: "FEATURE_REQUEST" as const,
      label: "Feature Request",
      icon: MessageCircle,
      description: "Suggest new features",
    },
  ];

  const priorityLevels = [
    { value: "LOW" as const, label: "Low Priority", color: "text-green-600" },
    {
      value: "MEDIUM" as const,
      label: "Medium Priority",
      color: "text-yellow-600",
    },
    {
      value: "HIGH" as const,
      label: "High Priority",
      color: "text-orange-600",
    },
    { value: "URGENT" as const, label: "Urgent", color: "text-red-600" },
  ];

  const onSubmit = async (data: ContactFormData) => {
    try {
      console.log("Contact Form Data:", data);
      // Now data is properly typed and matches IContactPayload
      const res = await createContact(data);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error("Something went on wrong");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        reset();
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Get in touch with us and let us help you with your inquiries
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  Contact Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-3">
                      Thank You!
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      Your message has been sent successfully. We will get back
                      to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          {...register("name", {
                            required: "Name is required",
                            minLength: {
                              value: 2,
                              message: "Name must be at least 2 characters",
                            },
                          })}
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Please enter a valid email address",
                            },
                          })}
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+880 1712-345678"
                          {...register("phone")}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority Level</Label>
                        <Select
                          value={watch("priority")}
                          onValueChange={(value: ContactPriority) =>
                            setValue("priority", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            {priorityLevels.map((priority) => (
                              <SelectItem
                                key={priority.value}
                                value={priority.value}
                              >
                                <span className={priority.color}>
                                  {priority.label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={watch("category")}
                        onValueChange={(value: ContactCategory) =>
                          setValue("category", value)
                        }
                      >
                        <SelectTrigger
                          className={
                            errors.category ? "border-destructive" : ""
                          }
                        >
                          <SelectValue placeholder="Select inquiry category" />
                        </SelectTrigger>
                        <SelectContent>
                          {contactCategories.map((category) => {
                            const IconComponent = category.icon;
                            return (
                              <SelectItem
                                key={category.value}
                                value={category.value}
                              >
                                <div className="flex items-center gap-2">
                                  <IconComponent className="w-4 h-4" />
                                  <div>
                                    <div className="font-medium">
                                      {category.label}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {category.description}
                                    </div>
                                  </div>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-destructive">
                          Please select a category
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="Brief subject of your inquiry"
                        {...register("subject", {
                          required: "Subject is required",
                          minLength: {
                            value: 5,
                            message: "Subject must be at least 5 characters",
                          },
                        })}
                        className={errors.subject ? "border-destructive" : ""}
                      />
                      {errors.subject && (
                        <p className="text-sm text-destructive">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Please provide detailed information about your inquiry..."
                        rows={6}
                        {...register("message", {
                          required: "Message is required",
                          minLength: {
                            value: 20,
                            message: "Message must be at least 20 characters",
                          },
                        })}
                        className={errors.message ? "border-destructive" : ""}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      onClick={() => {
                        if (!watch("category")) {
                          // Handle category validation
                        }
                        handleSubmit(onSubmit)();
                      }}
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Phone
                    </h4>
                    <p className="text-muted-foreground">+880 1712-345678</p>
                    <p className="text-sm text-muted-foreground">
                      Mon-Fri 9AM-6PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Email
                    </h4>
                    <p className="text-muted-foreground">
                      support@reviewhub.com
                    </p>
                    <p className="text-sm text-muted-foreground">
                      We reply within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Address
                    </h4>
                    <p className="text-muted-foreground">123 Business Ave</p>
                    <p className="text-muted-foreground">
                      Dhaka 1000, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Business Hours
                    </h4>
                    <p className="text-muted-foreground">
                      Mon-Fri: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-muted-foreground">
                      Sat: 10:00 AM - 4:00 PM
                    </p>
                    <p className="text-muted-foreground">Sun: Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    How quickly will I get a response?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We typically respond within 24 hours during business days.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Is technical support free?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, all basic technical support is provided free of charge.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Can I schedule a call?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, mention your preferred time in the message and we'll
                    arrange a call and make sure you give us a proper Email.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Do you offer emergency support?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    For urgent issues, please mark priority as
                    &quot;Urgent&quot; and we&apos;ll respond ASAP and always
                    check on mail.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
