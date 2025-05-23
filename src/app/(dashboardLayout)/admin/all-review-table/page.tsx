import AllReviewAdmin from "@/components/admin/reviews/AllReviewAdmin";
import { getAllReviewsForAdmin } from "@/services/review";
import React from "react";

const ReviewAdmin = async () => {
  const reviewsResponse = await getAllReviewsForAdmin();
  const reviews = reviewsResponse?.data || [];
  return (
    <div>
      <AllReviewAdmin reviews={reviews} />
    </div>
  );
};

export default ReviewAdmin;
