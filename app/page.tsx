export const metadata = {
  title: "Capital H – Conversational AI Chatbot",
  description:
    "A minimal, user-friendly AI chatbot website with guiderails for safe, smart conversations.",
};

export default function Home() {
  return (
    <main>
      <header>
        <h1 className="text-4xl font-bold">Capital H</h1>
        <p className="mt-2 text-lg text-gray-600">
          Conversational AI chatbot for natural, safe, and smart interactions.
        </p>
      </header>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Why Capital H?</h2>
        <ul className="mt-2 ml-6 list-disc">
          <li>Conversational AI integration (like ChatGPT)</li>
          <li>Controlled guiderail system for safe and relevant responses</li>
          <li>Minimal, user-friendly landing page</li>
          <li>User authentication system</li>
        </ul>
      </section>
    </main>
  );
}
