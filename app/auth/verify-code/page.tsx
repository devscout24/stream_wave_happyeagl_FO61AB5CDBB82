import Icon from "@/components/Icon";
import Link from "next/link";
import VerifyForm from "./_components/VerifyForm";

export default async function VerifyCode({
  searchParams,
}: {
  searchParams: Promise<{ email: string }>; // searchParams is now a Promise
}) {
  const { email: encodedEmail } = await searchParams; // Await searchParams before destructuring

  const email = atob(encodedEmail);
  return (
    <section className="grid min-h-[calc(100vh-5rem)] place-items-center gap-4">
      <div className="container mx-auto max-w-xl space-y-3 max-md:px-2 md:space-y-5">
        <h1 className="text-muted-foreground text-center text-xl font-semibold md:text-2xl lg:text-4xl">
          Enter Verification Code
        </h1>
        <p className="text-muted-foreground mb-10 text-center text-xs font-normal md:text-sm">
          enter the verification code sent to
        </p>
        <h1 className="text-muted-foreground flex items-center justify-center gap-2 text-center text-xl font-semibold">
          {email}
          <Link
            href={`/auth/forgot-password?email=${encodedEmail}`}
            className="ml-2"
          >
            <Icon src="/pen.svg" className="ml-2 inline-block size-6" />
          </Link>
        </h1>
        <VerifyForm />
      </div>
    </section>
  );
}
