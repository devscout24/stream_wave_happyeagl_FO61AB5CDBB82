import ChangePasswordForm from "./_components/ChangePasswordForm";

export default function ChangePasswordPage() {
  return (
    <section className="grid min-h-[calc(100vh-5rem)] place-items-center gap-4">
      <div className="container mx-auto max-w-xl space-y-3 max-md:px-2 md:space-y-5">
        <h1 className="text-muted-foreground text-xl font-semibold md:text-2xl lg:text-4xl">
          Change Password
        </h1>

        <ChangePasswordForm />
      </div>
    </section>
  );
}
