import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { PatchIssueSchema } from "@/app/validationSchemas";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

// Update Issue Function

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("Unauthorised User");
    return NextResponse.json({}, { status: 401 }); // unauthorised user
  }

  const body = await req.json();
  const validation = PatchIssueSchema.safeParse(body);

  // Data validation
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { title, description, assigneeId } = validation.data;

  // If assigneeId is provided and not null, check if the user exists
  if (assigneeId !== null && assigneeId !== undefined) {
    const user = await prisma.user.findUnique({
      where: {
        id: assigneeId,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
    }
  }

  // Check if the issue exists
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
  }

  // Constructing the update object based on provided data
  const updateData = {
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    ...(assigneeId !== undefined && { assigneeId }),
  };

  // Updating the issue with the constructed update data
  const updatedIssueData = await prisma.issue.update({
    where: {
      id: params.id,
    },
    data: updateData,
  });

  console.log(updatedIssueData);
  return NextResponse.json(updatedIssueData);
}

// Delete Issue Function

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("Unauthorised User");
    return NextResponse.json({}, { status: 401 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!issue) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 401 });
  }

  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });

  return NextResponse.json({});
}

// // Fetch Issue details Function

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     console.log("Unauthorised User");
//     return NextResponse.json({}, { status: 401 });
//   }

//   const issue = await prisma.issue.findUnique({
//     where: {
//       id: params.id,
//     },
//   });

//   if (!issue) {
//     return NextResponse.json({ error: "Invalid Issue" }, { status: 401 });
//   }

//   return NextResponse.json(issue);
// }
