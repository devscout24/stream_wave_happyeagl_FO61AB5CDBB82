export default async function Inbox() {
  // const inbox: ChatMessage[] = await fetcher("inbox");

  return (
    <section>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-7 lg:space-y-14">
          <div className="flex flex-col gap-2">
            {/* {inbox.map((message: ChatMessage) => (
              <Message key={message.id} message={message} />
            ))} */}
          </div>
        </div>
      </div>
    </section>
  );
}
