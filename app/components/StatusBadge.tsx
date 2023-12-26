import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const StatusMap: Record<Status, {label: String, color: 'red'|'green'|'violet'}> =
{
    'OPEN': {label: "Open", color: "green"},
    'IN_PROGRESS': {label: "In progress", color: "violet"},
    'CLOSED': {label: "Closed", color: "red"},
};

const StatusBadge = ({status}: {status: Status}) => {
  return (
    <div>
      <Badge color={StatusMap[status].color}>{StatusMap[status].label}</Badge>
    </div> 
  );
};

export default StatusBadge;
