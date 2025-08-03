import Icon from "@/components/Icon";
import { Feature } from "@/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="overflow-hidden rounded-4xl p-[1px] dark:bg-[linear-gradient(135deg,_#000000_0%,_#B3ABAB_100%)]">
      <Card className="h-full rounded-4xl border-none shadow-[inset_1px_1px_10.6px_0_rgba(0,0,0,0.25)] dark:shadow-none">
        <CardHeader>
          <span className="bg-primary flex h-15 w-15 items-center justify-center rounded-md">
            <Icon src={feature.icon} className="text-input h-8 w-8" />
          </span>
        </CardHeader>
        <CardContent className="space-y-2">
          <CardTitle className="text-2xl font-medium">
            {feature.title}
          </CardTitle>
          <CardDescription>{feature.description}</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
