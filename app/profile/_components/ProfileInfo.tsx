import { Input } from "@/components/ui/input";
import { getUserProfile } from "@/lib/actions";
import ProfileForm from "./ProfileForm";
export default async function ProfileInfo() {
  const user = await getUserProfile();

  if (!user) {
    return null;
  }

  return (
    <div className="bg-card w-1/2 rounded-lg p-5">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-medium">Profile Information</h1>
        <ProfileForm user={user} />
      </div>

      {/* Name */}
      <div className="mb-4 flex gap-5">
        <div className="w-full">
          <label className="block text-sm font-medium">First Name</label>
          <Input
            value={user?.first_name || ""}
            readOnly
            className="bg-background mt-1 border-none"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">Last Name</label>
          <Input
            value={user?.last_name || ""}
            readOnly
            className="bg-background mt-1 border-none"
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Email</label>
        <Input
          value={"example@gmail.com"}
          readOnly
          className="bg-background mt-1 border-none"
        />
      </div>
    </div>
  );
}
