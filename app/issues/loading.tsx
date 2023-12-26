import { Table } from "@radix-ui/themes";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import IssueActions from "./_components/IssueActions";

const loadingIssuePage = () => {
  const issue = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="flex flex-col justify-center py-2 md:px-4 w-5/6 md:w-3/4 mx-auto">
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.ColumnHeaderCell>
            <Skeleton />
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Skeleton />
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <Skeleton />
          </Table.ColumnHeaderCell>
        </Table.Header>
        <Table.Body>
          {issue.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default loadingIssuePage;
