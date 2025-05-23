"use client";
import { IReview } from "@/types/review";
import ReviewCard from "./ReviewCard";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

// Response type definition
type TResponse = {
  data: IReview[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

// Component props type
type TMostPopularReviewProps = {
  response: TResponse;
};

const MostPopularReview = ({ response }: TMostPopularReviewProps) => {
  return (
    <section className="container mx-auto my-20">
      <h2 className="text-center text-2xl sm:text-3xl font-bold ">
        Most Popular Reviews
      </h2>
      <p className="mx-auto text-center text-muted-foreground md:text-lg">
        Find reviews for products in your favorite categories.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 my-5">
        {response?.data?.map((review: IReview) => (
          <ReviewCard review={review} key={review.id} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link href="/reviews">
          <Button>
            View All Categories
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default MostPopularReview;
