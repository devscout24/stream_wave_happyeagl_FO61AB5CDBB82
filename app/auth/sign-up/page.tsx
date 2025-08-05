import SignupForm from "./_components/SignupForm";

export default function Signup() {
  return (
    <section className="grid min-h-[calc(100vh-5rem)] place-items-center gap-4">
      <div className="container mx-auto max-w-xl space-y-3 max-md:px-2 md:space-y-5">
        <h1 className="text-muted-foreground text-center text-xl font-semibold md:text-2xl lg:text-4xl">
          Create Your Account
        </h1>

        <p className="text-muted-foreground mb-10 text-center text-xs font-normal md:text-sm">
          Join the future of smart conversations — chat with your AI assistant
          anytime, anywhere.
        </p>
        <SignupForm />
      </div>
    </section>
  );
}
