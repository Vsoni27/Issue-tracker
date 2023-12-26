import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueDetailsSkeleton = () => {
  return (
    <div className="py-4 px-2 md:px-4 w-3/4 mx-auto space-y-3">
      <Heading className="mt-10 max-w-md"><Skeleton /></Heading>
      <Flex className="space-x-2">
        <Skeleton width='5rem'/>
        <Text><Skeleton width='5rem'/></Text>
      </Flex>
      <Card>
        <Skeleton count={4}/>
      </Card>
    </div>
  )
}

export default IssueDetailsSkeleton