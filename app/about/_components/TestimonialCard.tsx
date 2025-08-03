import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Testimonial } from "@/types";

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <div className="overflow-hidden rounded-4xl p-[1px] dark:bg-[linear-gradient(135deg,_#000000_0%,_#B3ABAB_100%)]">
      <Card className="h-full rounded-4xl border-none shadow-[inset_1px_1px_10.6px_0_rgba(0,0,0,0.25)] dark:shadow-none">
        <CardHeader className="flex items-center justify-between">
          <span className="text-2xl text-orange-400">
            {"★".repeat(testimonial.ratings)}
          </span>
          <span className="text-lg font-semibold">{testimonial.author}</span>
        </CardHeader>
        <CardContent className="">
          <CardDescription className="text-paragraph max-sm:text-xs">
            {testimonial.content}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
