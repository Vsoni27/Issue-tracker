import { Button } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssuePage = () => {
  return (
    <div className="p-4 max-w-xl md:ml-24 mt-10 space-y-2 flex flex-col">
      <Skeleton height={30}/>
      <Skeleton height={350} />
      <Button className="cursor-pointer md:w-1/3">
        <Skeleton />
      </Button>
    </div>
  );
};

export default LoadingIssuePage;
