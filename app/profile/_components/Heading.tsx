import { getUserProfile } from "@/lib/actions";
import ProfilePicture from "./ProfilePicture";
import UpdatePassword from "./UpdatePassword";

export default async function Heading() {
  const user = await getUserProfile(); // Assume this function fetches the user profile
  return (
    <div className="text-foreground">
      <h1 className="mb-1 text-4xl font-semibold">My Profile</h1>
      <p>Update your personal info to keep your account secure.</p>
      <div className="bg-card mt-20 flex items-center justify-between rounded-lg p-5">
        <div className="flex items-center gap-5">
          <ProfilePicture
            picture={user?.profile_pic || ""}
            name={`${user?.first_name ? user?.first_name.split("")[0] : ""} ${user?.last_name ? user?.last_name.split("")[0] : ""}`}
          />
          <span>
            <h1 className="text-lg font-medium">
              {user?.first_name} {user?.last_name}
            </h1>
          </span>
        </div>
        <UpdatePassword />
      </div>
    </div>
  );
}
