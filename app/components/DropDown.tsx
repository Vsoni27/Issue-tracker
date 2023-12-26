import { CaretDownIcon } from "@radix-ui/react-icons";
import { DropdownMenu, Button, Avatar } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface UserData {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

const DropDown = (user: { user: UserData }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar size="2" radius="full" src={user.user!.image!} fallback="?" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>{user.user!.name}</DropdownMenu.Item>
        <DropdownMenu.Item>{user.user!.email}</DropdownMenu.Item>
        {/* <DropdownMenu.Item>
          Assigned Issues: {user.user!.issue?.length}
        </DropdownMenu.Item> */}
        <DropdownMenu.Separator />
        <Link href="/api/auth/signout" className="mx-auto">
          <Button className="bg-red-600 cursor-pointer">LogOut</Button>
        </Link>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default DropDown;
