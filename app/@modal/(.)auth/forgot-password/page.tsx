import ForgotPasswordModal from "@/app/auth/forgot-password/_components/ForgotPasswordModal";

export default async function ForgotPassword({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>; // searchParams is now a Promise
}) {
  const { email: encodedEmail } = await searchParams;
  const email = encodedEmail ? atob(encodedEmail) : "";

  return (
    <section>
      <ForgotPasswordModal email={email} />
    </section>
  );
}
