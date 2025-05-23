import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Award, MessageSquare, Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { IReview } from "@/types/review";

type TResponses = {
  data: IReview[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

// Component props type
type TPremiumProps = {
  responses: TResponses;
};

const Premium = ({ responses }: TPremiumProps) => {
  // Find the first premium review from the responses data
  const premiumReview = responses?.data?.find(
    (review) => review.isPremium === true
  );

  return (
    <div>
      <section className="w-full py-6 md:py-12 bg-background">
        <div className="">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge variant="outline" className="mb-2">
                NEW
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Premium Reviews
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Get access to in-depth, expert reviews with detailed analysis
                and insights.
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Premium Review Preview */}
            <Card className="overflow-hidden border-2 border-primary/20">
              <div className="relative h-64 w-full">
                <Image
                  src={
                    premiumReview?.imageUrls[0] ||
                    "https://i.ibb.co/6c3rzRhv/cable-love-bulb.jpg"
                  }
                  alt={premiumReview?.title || "Premium Review"}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <Badge className="absolute top-2 right-2 bg-primary">
                  Premium
                </Badge>
              </div>
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    {premiumReview?.category?.name || "Tech"}
                  </Badge>
                  <div className="flex items-center">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < (premiumReview?.rating || 5)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                  </div>
                </div>
                <h3 className="mt-2 text-2xl font-bold">
                  {premiumReview?.title || "Premium Review Title"}
                </h3>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-muted" />
                    <span className="text-sm">{"Expert Reviewer"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Premium Benefits */}
            <div className="flex flex-col justify-center space-y-4">
              <h3 className="text-2xl font-bold">Why Go Premium?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <Award className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Expert Analysis</p>
                    <p className="text-sm text-muted-foreground">
                      In-depth reviews from industry experts with detailed
                      technical analysis.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <MessageSquare className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Exclusive Community</p>
                    <p className="text-sm text-muted-foreground">
                      Comment and engage with other premium members and experts.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">One-time Payment</p>
                    <p className="text-sm text-muted-foreground">
                      Pay once per review - no subscriptions or recurring fees.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Link href="/reviews">
                  <Button className="w-full">Explore Premium Reviews</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Premium;
