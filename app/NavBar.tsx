"use client";
import Link from "next/link";
import React from "react";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box, Button } from "@radix-ui/themes";
import { MdOutlineLogin } from "react-icons/md";
import { DropDown, Spinner } from "./components";

export const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  // if (status === "authenticated" && session.user && session.user.name) {
  //   console.log(session);
  //   console.log(session.user.name.charAt(0));
  // }

  return (
    <nav className="p-4 m-1 flex items-center justify-between space-x-3 font-medium text-gray-800 border-2 border-gray-500 rounded-xl">
      <Box className="flex items-center space-x-3">
        <Link href="/">
          <div>
            <AiOutlineIssuesClose className="text-2xl mr-5" />
          </div>
        </Link>
        <Link href="/">
          <div
            className={`hover:text-black hover:font-bold ${
              currentPath === "/" && `underline underline-offset-4`
            }`}
          >
            Dashboard
          </div>
        </Link>
        <Link href="/issues">
          <div
            className={`hover:text-black hover:font-bold ${
              currentPath === "/issues" && `underline underline-offset-4`
            }`}
          >
            Issues
          </div>
        </Link>
      </Box>
      <Box>
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">
            <Button className="w-xl cursor-pointer">
              <MdOutlineLogin className="text-xl" /> LogIn
            </Button>
          </Link>
        )}
        {status === "loading" && (
          <Box className="w-[52px] flex justify-center items-center">
            <Spinner />
          </Box>
        )}
        {status === "authenticated" && (
          <Link href="/api/auth/signout">
            <DropDown user={session.user!} />
          </Link>
        )}
      </Box>
    </nav>
  );
};
