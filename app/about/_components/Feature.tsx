import { Feature as IFeature } from "@/types";

import FeatureCard from "./FeatureCard";

interface FeatureProps {
  title: string;
  description: string;
  features: IFeature[];
}

export default function Feature({
  title,
  description,
  features,
}: FeatureProps) {
  return (
    <section>
      <div className="container mx-auto mt-8 max-lg:px-2 lg:max-w-7xl">
        <div className="space-y-2">
          <h1 className="text-center text-2xl font-semibold sm:text-3xl lg:text-4xl">
            {title}
          </h1>
          <p className="text-paragraph text-center max-sm:text-xs">
            {description}
          </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
