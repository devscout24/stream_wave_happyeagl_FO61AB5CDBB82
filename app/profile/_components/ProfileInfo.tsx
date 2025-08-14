import { Input } from "@/components/ui/input";
import { getUserProfile } from "@/lib/actions";
import { Edit } from "lucide-react";

export default async function ProfileInfo() {
    const user = await getUserProfile();



  const profileData = {
    fastName: "Atik",
    lastName: "Faysal",
    email: "example@email.com",
    password: "********",
  };

  return (
    <div className="bg-card rounded-lg p-5 w-1/2">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-medium">Profile Information</h1>
        <Edit className="cursor-pointer" />
      </div>

      {/* Name */}
      <div className="flex gap-5 mb-4">
        <div className="w-full">
          <label className="block text-sm font-medium">First Name</label>
          <Input
            value={user?.first_name ||""}
            readOnly
            className="bg-background border-none mt-1"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">Last Name</label>
          <Input
            value={user?.last_name|| ""}
            readOnly
            className="bg-background border-none mt-1"
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Email</label>
        <Input
          value={"example@gmail.com"}
          readOnly
          className="bg-background border-none mt-1"
        />
      </div>
    </div>
  );
}
