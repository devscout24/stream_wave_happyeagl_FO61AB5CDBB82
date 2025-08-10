import Profile from "@/components/Profile";
import { getUserProfile } from "@/lib/actions";
import MobileSidebar from "./MobileSidebar";

export default async function Header() {
  const user = await getUserProfile(); // Assume this function fetches the user profile

  console.log("user in header", user);

  return (
    <header>
      <nav>
        <div className="container mx-auto max-md:px-2 lg:max-w-7xl">
          <div className="flex items-center justify-between py-3">
            <h1 className="text-3xl font-semibold">AI Chat</h1>

            <div className="flex items-center gap-4">
              {user && <Profile profile={user} avatarOnly />}

              <MobileSidebar />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
