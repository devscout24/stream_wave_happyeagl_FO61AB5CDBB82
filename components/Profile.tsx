import { UserProfile } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ProfileProps {
  profile: UserProfile;
  avatarOnly?: boolean; // Optional prop to render only the avatar
}

/**
 * Profile component to display user avatar.
 * Uses shadcn/ui Avatar component for styling.
 */

export default function Profile({ profile, avatarOnly }: ProfileProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={profile.profile_pic} />
        <AvatarFallback>
          {profile.first_name[0]}
          {profile.last_name[0]}
        </AvatarFallback>
      </Avatar>
      {!avatarOnly && (
        <div className="text-center">
          <h2 className="text-sm">
            {profile.first_name} {profile.last_name}
          </h2>
        </div>
      )}
    </div>
  );
}
