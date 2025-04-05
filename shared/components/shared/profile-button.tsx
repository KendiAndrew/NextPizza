import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui";
import { CircleUser, User } from "lucide-react";
import Link from "next/link";

interface Props {
  onClickSingIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({
  className,
  onClickSingIn,
}) => {
  const { data: session } = useSession();

  return (
    <div className={className}>
      {!session ? (
        <Button
          onClick={onClickSingIn}
          variant="outline"
          className="flex items-center gap-1"
        >
          <User size={16} />
          <span className="hidden sm:inline">Увійти</span>
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={16} />
            <span className="hidden sm:inline">Профіль</span>
          </Button>
        </Link>
      )}
    </div>
  );
};
