import { z } from "zod";

export const IssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title is too long, should be below 255 char"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65536, "Too long"),
});

export const PatchIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title is too long, should be below 255 char")
    .optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65536, "Too long")
    .optional(),
  assigneeId: z
    .string()
    .min(1, "AssigneeId is required.")
    .max(255)
    .optional()
    .nullable(),
});
