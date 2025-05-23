"use client";

import { IReview } from "@/types/review";
import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, Edit, Trash2, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";
import { deleteReview } from "@/services/review";

interface AllReviewAdminProps {
  reviews: IReview[];
  onUpdate?: (reviewId: string) => void;
}

const AllReviewAdmin = ({ reviews, onUpdate }: AllReviewAdminProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "default";
      case "DRAFT":
        return "secondary";
      case "UNPUBLISHED":
        return "destructive";
      default:
        return "outline";
    }
  };

  const handleUpdate = (reviewId: string) => {
    if (onUpdate) {
      onUpdate(reviewId);
    }
  };

  const handleDelete = async (reviewId: string) => {
    try {
      const result = await deleteReview(reviewId);

      if (result.success) {
        toast.success("Review deleted successfully!");
      } else {
        toast.error(result.error || "Failed to delete review");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting review");
      console.error("Delete error:", error);
    }
  };

  // Get unique categories and statuses for filters
  const { categories, statuses } = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(reviews.map((review) => review.category?.name).filter(Boolean))
    ) as string[];
    const uniqueStatuses = Array.from(
      new Set(reviews.map((review) => review.status).filter(Boolean))
    ) as string[];
    return {
      categories: uniqueCategories,
      statuses: uniqueStatuses,
    };
  }, [reviews]);

  // Filtered reviews with search and filters
  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch =
        !searchTerm ||
        review?.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review?.title?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || review.category?.name === categoryFilter;

      const matchesStatus =
        statusFilter === "all" || review.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [reviews, searchTerm, categoryFilter, statusFilter]);

  const ActionButtons = ({ review }: { review: IReview }) => (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleUpdate(review.id)}
        className="h-8 w-8 p-0"
      >
        <Edit className="h-4 w-4" />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              review `{review.title}`.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(review.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );

  const MobileActionMenu = ({ review }: { review: IReview }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleUpdate(review.id)}>
          <Edit className="mr-2 h-4 w-4" />
          Update
        </DropdownMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                review `{review.title}`.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(review.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
          <CardDescription>
            Manage and view all product reviews ({filteredReviews.length} of{" "}
            {reviews.length} total)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by product, user email, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-col sm:flex-row">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category || ""}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status || ""}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Image</TableHead>
                  <TableHead className="min-w-32">Category</TableHead>
                  <TableHead className="min-w-32">Created User</TableHead>
                  <TableHead className="w-24">Status</TableHead>
                  <TableHead className="w-20">Rating</TableHead>
                  <TableHead className="w-24">Price</TableHead>
                  <TableHead className="w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.map((review) => (
                  <TableRow key={review.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="w-12 h-12 relative overflow-hidden rounded-md border">
                        <Image
                          src={review.imageUrls[0] || "/api/placeholder/48/48"}
                          alt={review.title}
                          className="w-full h-full object-cover"
                          width={48}
                          height={48}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{review.category?.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-muted-foreground truncate">
                            {review?.user?.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={getStatusBadgeVariant(review.status)}
                        className="text-xs"
                      >
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium">
                          {review.rating}
                        </span>
                        <span className="text-yellow-500 text-sm">★</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">
                        TK {review?.price?.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <ActionButtons review={review} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredReviews.map((review) => (
              <Card key={review.id} className="p-4 shadow-sm">
                <div className="flex space-x-3">
                  <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={review.imageUrls[0] || "/api/placeholder/64/64"}
                      alt={review.title}
                      className="w-full h-full object-cover"
                      width={64}
                      height={64}
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-sm leading-tight line-clamp-2 flex-1">
                        {review.title}
                      </h3>
                      <MobileActionMenu review={review} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground truncate">
                          {review?.user?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {review?.category?.name}
                      </Badge>
                      <Badge
                        variant={getStatusBadgeVariant(review.status)}
                        className="text-xs"
                      >
                        {review.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium">
                          {review.rating}
                        </span>
                        <span className="text-yellow-500 text-sm">★</span>
                      </div>
                      <span className="text-sm font-medium">
                        TK {review?.price?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredReviews.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No reviews found matching your criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AllReviewAdmin;
