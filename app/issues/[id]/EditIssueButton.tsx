import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditIssueButton = ({ IssueId }: { IssueId: string }) => {
  return (
    <Link href={`/issues/${IssueId}/edit`} className="w-3/5">
      <Button className="w-full cursor-pointer">
        <Pencil2Icon /> Edit Issue
      </Button>
    </Link>
  );
};

export default EditIssueButton;
