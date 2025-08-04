import fetcher from "@/lib/fetcher";

export default async function Inbox() {
  const inbox = await fetcher("inbox");

  return (
    <section>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-7 lg:space-y-14">
          <h1 className="text-center text-2xl font-medium md:text-3xl xl:text-4xl">
            Inbox
          </h1>
          <p className="text-paragraph text-center max-sm:text-xs">
            This is your inbox where you can manage your messages and
            notifications.
          </p>
        </div>
      </div>
    </section>
  );
}
