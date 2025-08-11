import Search from "@/components/Search";

export default function ArchivePage() {
  return (
    <section className="">
      <h1 className="text-4xl font-semibold">Archive Chats</h1>
      <Search queryKey="achq" placeholder="Search archived chat" />
    </section>
  );
}
