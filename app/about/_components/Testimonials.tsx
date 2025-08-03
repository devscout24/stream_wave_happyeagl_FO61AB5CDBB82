import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "../data/testimonial";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
  return (
    <section>
      <div className="max-ms:px-2 container mx-auto mt-20 space-y-10 max-lg:px-2 lg:max-w-7xl">
        <div className="space-y-2">
          <h1 className="text-center text-2xl font-semibold sm:text-3xl lg:text-4xl">
            Trusted by Users Around the World
          </h1>
          <p className="text-paragraph text-center max-sm:text-xs">
            From students to professionals — people love how simple, smart, and
            helpful our chatbot is.
          </p>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
