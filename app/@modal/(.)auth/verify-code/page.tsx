import VerifyModal from "@/app/auth/verify-code/_components/VerifyModal";

export default async function VerifyCode({
  searchParams,
}: {
  searchParams: Promise<{ email: string }>; // searchParams is now a Promise
}) {
  const { email: encodedEmail } = await searchParams; // Await searchParams before destructuring

  const email = atob(encodedEmail);
  return (
    <section>
      <VerifyModal email={email} />
    </section>
  );
}
