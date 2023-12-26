import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

const IssueEditPage = async ({ params }: { params: { id: string } }) => {
  const IssueInfo = await prisma.issue.findUnique({
    where: {
      id: params.id,
    }
  })

  if(!IssueInfo) {
    notFound();
  }

  return (
    <IssueForm IssueInfo={IssueInfo}/>
  )
}

export default IssueEditPage