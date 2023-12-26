"use client";
import { Button, Text, TextField } from "@radix-ui/themes";
// import dynamic from "next/dynamic";
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { IssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { Spinner } from "@/app/components";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { issue } from "@prisma/client";

// const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {ssr: false})

type IssueData = z.infer<typeof IssueSchema>; // automatically will set the IssueData interface

const IssueForm = ({ IssueInfo }: { IssueInfo?: issue }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IssueData>({ resolver: zodResolver(IssueSchema) });

  const [Submitting, setSubmitting] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (IssueInfo) {
        const response = await axios.patch(`/api/issues/${IssueInfo.id}`, data);
        console.log(response);
      } else {
        await axios.post("/api/issues", data);
        reset();
      }
      // console.log(response);
      // router.push("/issues");
      setSubmitting(false);
      notify();
    } catch (errors) {
      console.log(errors);
    }
  });

  const notify = () => {
    if (IssueInfo) {
      toast.success("Updated Successfully !", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.success("Created Successfully !", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <form
      className="p-4 max-w-xl md:ml-24 mt-10 space-y-2 flex flex-col"
      onSubmit={onSubmit}
    >
      <ToastContainer/>
      <TextField.Root>
        <TextField.Input
          defaultValue={IssueInfo?.title}
          placeholder="Title"
          {...register("title")}
        />
      </TextField.Root>
      {errors.title && <Text color="red">{errors.title.message}</Text>}
      <Controller
        name="description"
        control={control}
        defaultValue={IssueInfo?.description}
        render={({ field }) => (
          <SimpleMdeReact placeholder="Description.." {...field} />
        )}
      />
      {errors.description && (
        <Text color="red">{errors.description.message}</Text>
      )}
      <Button className="cursor-pointer md:w-1/3" disabled={Submitting}>
        {Submitting ? (
          <>
            {IssueInfo ? "Updating" : "Submitting"}
            <Spinner />
          </>
        ) : IssueInfo ? (
          "Update issue"
        ) : (
          "Submit new issue"
        )}
      </Button>
    </form>
  );
};

export default IssueForm;
