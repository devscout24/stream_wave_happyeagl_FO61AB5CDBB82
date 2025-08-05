import SignInForm from "./_components/SignInForm";

export default function SignIn() {
  return (
    <section>
      <div className="container mx-auto max-w-xl max-md:px-2">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Hey there! Good to see you
        </h1>

        <p className="text-muted-foreground text-center text-sm font-normal">
          Log in to access your personalized dashboard.
        </p>
        <SignInForm />
      </div>
    </section>
  );
}
