import prisma from "@/prisma/client";
import { Box, Button, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssignIssueButton from "./AssignIssueButton";

const IssueDetailsPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);

  const IssueInfo = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });

  // console.log(IssueInfo);

  if (!IssueInfo) {
    notFound();
  }

  return (
    <Grid
      className="py-3 px-4 md:px-16"
      columns={{ xs: "1fr 1fr", md: "3fr 1fr" }}
      gap="2"
    >
      <Box className="p-4 mx-auto space-y-3 w-full">
        <IssueDetails IssueInfo={IssueInfo} />
      </Box>
      {session && (
        <Box className="flex flex-col items-center space-y-2 pt-12">
          <AssignIssueButton IssueDetails={IssueInfo} />
          <EditIssueButton IssueId={params.id} />
          <DeleteIssueButton IssueId={params.id} />
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailsPage;
