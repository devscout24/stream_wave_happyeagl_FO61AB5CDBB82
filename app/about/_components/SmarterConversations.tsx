import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function SmarterConversations() {
  return (
    <section className="mt-16 overflow-hidden bg-[#212121] py-16 max-md:px-2">
      <div className="container mx-auto flex flex-col items-center justify-between gap-16 md:flex-row lg:max-w-7xl">
        <div className="max-w-lg space-y-2">
          <h1 className="text-background dark:text-foreground text-2xl font-semibold max-md:text-center sm:text-3xl lg:text-4xl">
            Ready to Experience Smarter Conversations?
          </h1>
          <p className="text-[#CBD5E1] max-md:text-center max-sm:text-xs">
            Join thousands already using our AI chatbot to simplify their work,
            learn faster, and get instant answers.
          </p>

          <Link href="/login">
            <Button
              variant="default"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary dark:bg-primary dark:text-background dark:hover:text-background dark:hover:bg-primary mt-4 cursor-pointer max-md:w-full"
            >
              Get Started — It’s Free
            </Button>
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          <Image
            src="/section-top.png"
            alt="Smarter Conversations"
            width={400}
            height={240}
            className="object-cover max-md:h-auto max-md:w-full"
          />

          <Image
            src="/section-middle.png"
            alt="Smarter Conversations"
            width={600}
            height={600}
            className="object-cover max-md:h-auto max-md:w-full"
          />

          <Image
            src="/section-bottom.png"
            alt="Smarter Conversations"
            width={400}
            height={240}
            className="object-cover max-md:h-auto max-md:w-full"
          />
        </div>
      </div>
    </section>
  );
}
