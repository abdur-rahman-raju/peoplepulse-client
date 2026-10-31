"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function PrivateRoute({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    
    if (!isPending && !session?.user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, session, router, pathname]);

  if (isPending || !session?.user) {
    return (
      <div className="mx-auto max-w-6xl space-y-4 px-4 py-12 sm:px-6" aria-busy="true">
        <div className="skeleton h-10 w-64" />
        <div className="skeleton h-5 w-96 max-w-full" />
        <div className="grid gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="skeleton h-64 w-full" />
          <div className="skeleton h-64 w-full" />
          <div className="skeleton h-64 w-full" />
        </div>
      </div>
    );
  }

  return children;
}