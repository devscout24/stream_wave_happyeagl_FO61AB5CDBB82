import { features } from "../data/feature";
import FeatureCard from "./FeatureCard";

export default function Feature() {
  return (
    <div className="container mx-auto mt-16 max-lg:px-2 lg:max-w-7xl">
      <div className="space-y-2">
        <h1 className="text-center text-2xl font-semibold sm:text-3xl lg:text-4xl">
          What Makes our AI Smarter
        </h1>
        <p className="text-paragraph text-center max-sm:text-xs">
          More than just chat — it understands context, learns with you, and
          helps you get real work done.
        </p>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </div>
  );
}
