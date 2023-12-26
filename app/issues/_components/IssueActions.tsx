import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssueActions = () => {
  return (
    <div className="my-6">
      <Link href="/issues/new">
        <Button className="cursor-pointer">New Issue</Button>
      </Link>
    </div>
  );
};

export default IssueActions;
