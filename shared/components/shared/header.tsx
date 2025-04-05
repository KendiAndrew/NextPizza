"use client";

import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { cn } from "@/shared/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals";

interface Prop {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Prop> = ({
  className,
  hasSearch = true,
  hasCart = true,
}) => {
  const router = useRouter();
  const [openAuth, setOpenAuth] = useState(false);
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    let toastMessage = "";

    if (searchParams.has("paid")) {
      toastMessage = "Замовлення сплачено!";
    }

    if (searchParams.has("verified")) {
      toastMessage = "Пошта успішно підтверджена!";
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace("/");
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 400);
    }
  }, []);

  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8 px-4">
        {/* Left part */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="logo" width={32} height={32}></Image>
            <div>
              <h1 className="text-xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3 hidden sm:inline">
                Смачніше не буває!
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1 hidden sm:inline">
            <SearchInput />
          </div>
        )}

        {/* Right part */}
        <div className="flex items-center gap-3">
          <AuthModal open={openAuth} onClose={() => setOpenAuth(false)} />
          <ProfileButton onClickSingIn={() => setOpenAuth(true)} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
