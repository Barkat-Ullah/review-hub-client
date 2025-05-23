import { Award, CheckCircle, Users } from "lucide-react";
import React from "react";

const HowItWorks = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-primary/5">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              How ReviewHub Works
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              Our simple process ensures authentic, helpful reviews for
              everyone.
            </p>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">1. Create & Share</h3>
            <p className="mt-2 text-muted-foreground">
              Sign up and share your honest experience with products you&apos;ve
              used. Add photos, ratings, and detailed feedback.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">2. Quality Check</h3>
            <p className="mt-2 text-muted-foreground">
              Our moderators review submissions to ensure they meet our
              community guidelines for helpfulness and authenticity.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">3. Community Engagement</h3>
            <p className="mt-2 text-muted-foreground">
              Vote on reviews, join discussions, and unlock premium content to
              get the most out of our community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
