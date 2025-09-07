import Heading from "./_components/Heading";
import ProfileInfo from "./_components/ProfileInfo";
import Settings from "./_components/Settings";

// Force dynamic rendering because this page uses cookies via server components
export const dynamic = "force-dynamic";

export default function page() {
  return (
    <section>
      <Heading />
      <div className="mt-7 flex flex-col gap-5 md:flex-row">
        <ProfileInfo />
        <Settings />
      </div>
    </section>
  );
}
