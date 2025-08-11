import Search from "@/components/Search";

export default function HistoryPage() {
  return (
    <section className="">
      <h1 className="text-4xl font-semibold">History Page</h1>
      <Search queryKey="chq" placeholder="Search chat history" />
    </section>
  );
}
