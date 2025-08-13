import { UserProfile } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ProfileProps {
  profile: UserProfile;
  avatarOnly?: boolean;
}

function getInitial(name?: string | null) {
  return name && name.length > 0 ? name[0].toUpperCase() : "";
}

/**
 * Profile component to display user avatar.
 * Uses shadcn/ui Avatar component for styling.
 */

export default function Profile({ profile, avatarOnly }: ProfileProps) {
  const firstInitial = getInitial(profile?.first_name);
  const lastInitial = getInitial(profile?.last_name);
  const fallback =
    firstInitial || lastInitial ? `${firstInitial}${lastInitial}` : "U";

  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={profile.profile_pic || undefined} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      {!avatarOnly && (
        <div className="text-center">
          <h2 className="text-sm">
            {profile?.first_name || ""} {profile?.last_name || ""}
          </h2>
        </div>
      )}
    </div>
  );
}
