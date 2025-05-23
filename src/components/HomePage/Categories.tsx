"use client";
import { ChevronRight, ShoppingBag } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Electronics",
      reviewCount: 238,
      icon: ShoppingBag,
    },
    {
      id: 2,
      name: "Clothing",
      reviewCount: 156,
      icon: ShoppingBag,
    },
    {
      id: 3,
      name: "Home & Kitchen",
      reviewCount: 124,
      icon: ShoppingBag,
    },
    {
      id: 4,
      name: "Beauty",
      reviewCount: 98,
      icon: ShoppingBag,
    },
    {
      id: 5,
      name: "Books & Media",
      reviewCount: 87,
      icon: ShoppingBag,
    },
    {
      id: 6,
      name: "Sports & Outdoors",
      reviewCount: 76,
      icon: ShoppingBag,
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 bg-primary/5 rounded-lg">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Browse by Category
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              Find reviews for products in your favorite categories.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.id}
                className="group h-full overflow-hidden transition-colors hover:border-primary"
              >
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="mb-3 rounded-full bg-primary/10 p-3 group-hover:bg-primary/20">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-base font-medium">{category.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {category.reviewCount} reviews
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="mt-8 flex justify-center">
          <Link href="/reviews">
            <Button>
              View All Categories
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
