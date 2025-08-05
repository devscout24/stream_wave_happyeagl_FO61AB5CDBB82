import ForgotPasswordForm from "./_components/ForgotPasswordForm";

export default async function ForgotPassword({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email: encodedEmail } = await searchParams;
  const email = encodedEmail ? atob(encodedEmail) : "";

  return (
    <section className="grid min-h-[calc(100vh-5rem)] place-items-center gap-4">
      <div className="container mx-auto max-w-xl space-y-3 max-md:px-2 md:space-y-5">
        <h1 className="text-muted-foreground text-center text-xl font-semibold md:text-2xl lg:text-4xl">
          Forgot Your Password?
        </h1>

        <p className="text-muted-foreground mb-10 text-center text-xs font-normal md:text-sm">
          Don’t worry! Enter your email, and we’ll send you instructions to
          reset your password.
        </p>
        <ForgotPasswordForm email={email} />
      </div>
    </section>
  );
}
