import { StatusBadge } from "@/app/components";
import { issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import Markdown from "react-markdown";

const IssueDetails = ({ IssueInfo }: { IssueInfo: issue }) => {
  return (
    <>
      <Heading className="mt-10">{IssueInfo.title}</Heading>
      <Flex className="space-x-2">
        <StatusBadge status={IssueInfo.status} />
        <Text className="font-medium">{IssueInfo.createdAt.toLocaleDateString()}</Text>
      </Flex>
      <Card>
        <Markdown>{IssueInfo.description}</Markdown>
      </Card>
    </>
  );
};

export default IssueDetails;
