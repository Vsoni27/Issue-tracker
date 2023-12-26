import React from "react";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import { StatusBadge } from "../components";
import delay from "delay";
import IssueActions from "./_components/IssueActions";

const IssuesPage = async () => {
  const issue = await prisma.issue.findMany({
    orderBy: {
      title: "asc",
    },
  });

  await delay(2000);

  return (
    <div className="flex flex-col justify-center py-2 md:px-4 w-5/6 md:w-3/4 mx-auto">
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>CreatedAt</Table.ColumnHeaderCell>
        </Table.Header>
        <Table.Body>
          {issue.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              </Table.Cell>
              <Table.Cell>
                <StatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
