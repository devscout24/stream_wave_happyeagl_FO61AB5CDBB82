import Heading from "./_components/Heading";
import ProfileInfo from "./_components/ProfileInfo";
import Settings from "./_components/Settings";

export default function page() {
  return (
   <section>
    <Heading/>
    <div className="mt-7 flex-col md:flex-row flex gap-5">
      <ProfileInfo/>
      <Settings/>
    </div>
   </section>
  )
}
