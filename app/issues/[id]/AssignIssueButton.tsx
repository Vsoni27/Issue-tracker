"use client";
import { User, issue } from "@prisma/client";
import { Avatar, Box, Select, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignIssueButton = ({ IssueDetails }: { IssueDetails: issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  const notify = (userId: string) => {
    if (userId === "Unassigned") {
      toast.success("Issue Unassigned successfully !", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const foundUser = users?.find((user) => user.id === userId);
      toast.success(`Issue assigned to ${foundUser!.name!}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const assignIssue = (userId: string) => {
    axios
      .patch("/api/issues/" + IssueDetails.id, {
        assigneeId: userId === "Unassigned" ? null : userId,
      })
      .then(() => notify(userId));
  };

  if (error) return null;

  if (isLoading)
    return (
      <Box className="w-3/5">
        <Skeleton />
      </Box>
    );

  return (
    <Box className="w-3/5 flex items-center justify-center">
      <Select.Root
        defaultValue={IssueDetails.assigneeId || "Unassigned"}
        size="3"
        onValueChange={assignIssue}
      >
        <Select.Trigger value="Assign.." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Users</Select.Label>
            <Select.Item value="Unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item
                key={user.id}
                value={user.id!}
                className="flex items-center justify-between"
              >
                <Avatar
                  src={user.image!}
                  fallback="V"
                  className="rounded-full text-xs mr-2"
                  size="1"
                />
                <Text className="font-xs">{user.name}</Text>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Box>
  );
};

export default AssignIssueButton;
