"use client";
import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteIssueButton = ({ IssueId }: { IssueId: string }) => {
  const [Deleting, setDeleting] = useState(false);
  const [Error, setError] = useState(false);
  const router = useRouter();

  const notify = () => {
    toast.success("Deleted Successfully !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const deleteIssue = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/issues/${IssueId}`);
      // notify();
      // setDeleting(false);
      // setTimeout(() => {
      //   router.push("/issues");
      //   router.refresh();
      // }, 2000);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <AlertDialog.Root>
      <ToastContainer />
      <AlertDialog.Trigger>
        <Button className="bg-red-600 w-3/5 cursor-pointer">
          {Deleting ? (
            <>
              Deleting <Spinner />
            </>
          ) : (
            <>
              <MdDeleteForever className="text-xl" /> Delete Issue
            </>
          )}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to delete this issue? This action cannot be
          undone.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" className="cursor-pointer">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              className="bg-red-600 cursor-pointer"
              onClick={deleteIssue}
            >
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
