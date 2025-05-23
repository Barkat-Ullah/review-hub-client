import Features from "@/components/HomePage/ Features";
import Banner from "@/components/HomePage/Banner";
import Categories from "@/components/HomePage/Categories";
import CTA from "@/components/HomePage/CTA";
import HowItWorks from "@/components/HomePage/HowItWorks";
import Premium from "@/components/HomePage/Premium";
import TestimonialSlider from "@/components/HomePage/Testimonials";
import MostPopularReview from "@/components/Review/MostPopularReview";
import RHContainer from "@/components/ui/core/RHContainer";
import { getAllReviews } from "@/services/review";
import { getAllTestimonials } from "@/services/testimonial";
export default async function Home() {
  const { data: response } = await getAllReviews("1", "6", {
    sortBy: "mostPopular",
  });
  const { data: responses } = await getAllReviews("1", "20");

  const { data: testimonials } = await getAllTestimonials();

  return (
    <RHContainer>
      <Banner></Banner>
      <Categories />
      <MostPopularReview response={response} />
      <Features></Features>
      <Premium responses={responses} />
      <HowItWorks></HowItWorks>
      <CTA></CTA>
      <TestimonialSlider testimonials={testimonials} />
    </RHContainer>
  );
}
