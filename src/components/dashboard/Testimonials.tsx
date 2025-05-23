"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { createTestimonial } from "@/services/testimonial";
import { toast } from "react-toastify";

// Dummy rating component
const RatingInput = ({
  value,
  onChange,
}: {
  value?: number;
  onChange: (val: number) => void;
}) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`text-yellow-400 ${
            value && value >= star ? "opacity-100" : "opacity-40"
          }`}
        >
          <Star className="w-5 h-5 fill-current" />
        </button>
      ))}
    </div>
  );
};

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description is too short"),
  rating: z.coerce
    .number()
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5"),
  recommendation: z.enum(["yes", "no"]),
});

type ReviewFormData = z.infer<typeof formSchema>;

export default function ReviewForm() {
  const form = useForm<ReviewFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      rating: 0,
      recommendation: "yes",
    },
  });
  const { user, setIsLoading } = useUser();

  const onSubmit = async (data: ReviewFormData) => {
    if (!user) return;

    try {
      setIsLoading(true);

      const payload = {
        ...data,
        recommendation: data.recommendation === "yes",
        userId: user.userId,
      };

      const result = await createTestimonial(payload);
      if (result.success) {
        toast.success(result.message);
        form.reset();
      } else {
        toast.error("Something went wrong");
      }
      console.log("testimonial", result);
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="space-y-6 p-6">
          <h2 className="text-xl font-bold text-center">Submit a Review</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your review..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rating */}
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base flex items-center gap-1">
                      <Star className="h-4 w-4" /> Rating
                    </FormLabel>
                    <FormControl>
                      <div className="bg-muted/30 p-3 rounded-md">
                        <RatingInput
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs">
                      Rate the product from 1 to 5 stars.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Recommendation */}
              <FormField
                control={form.control}
                name="recommendation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Would you recommend this?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4"
                      >
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button type="submit" className="w-full">
                Submit Review
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
