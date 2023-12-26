import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function GET(req: NextRequest) {
  const session = getServerSession(authOptions);
  if (!session) {
    console.log("Unauthorised User");
    return NextResponse.json({}, { status: 401 });
  }

  const user = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(user);
}
