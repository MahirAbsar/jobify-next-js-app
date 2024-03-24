"use server";

import { redirect } from "next/navigation";
import { CreateAndEditJobType, JobType, createAndEditJobSchema } from "./types";
import { auth } from "@clerk/nextjs";
import dayjs from "dayjs";
import prisma from "./db";
import { Prisma } from "@prisma/client";

type GetAllJobsType = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

function authenticateAndRedirect() {
  const { userId } = auth();
  if (!userId) redirect("/");
  return userId;
}

export async function createJobAction(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const userId = authenticateAndRedirect();
  try {
    createAndEditJobSchema.parse(values);
    const job = await prisma.job.create({
      data: { ...values, clerkId: userId },
    });
    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsType): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const userId = authenticateAndRedirect();
  try {
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    };

    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: {
              contains: search,
            },
          },
          {
            company: {
              contains: search,
            },
          },
        ],
      };
    }

    if (jobStatus && jobStatus !== "all") {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      };
    }
    const skip = (page - 1) * limit;
    const jobs = await prisma.job.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    
    const count = await prisma.job.count({
      where: whereClause
    })

    const totalPages = count / limit;

    return { jobs, count, page, totalPages };
  } catch (error) {
    console.log(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}

export async function deleteJobAction(id: string): Promise<JobType | null> {
  const userId = authenticateAndRedirect();
  try {
    const job: JobType = await prisma.job.delete({
      where: {
        id: id,
        clerkId: userId,
      },
    });
    return job;
  } catch (error) {
    return null;
  }
}

export async function getSingleJobAction(id: string): Promise<JobType | null> {
  let job: JobType | null;
  const userId = authenticateAndRedirect();
  try {
    job = await prisma.job.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    });
  } catch (error) {
    job = null;
  }
  if (!job) {
    redirect("/jobs");
  }
  return job;
}

export async function updateJobAction(
  id: string,
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const userId = authenticateAndRedirect();

  try {
    const job = await prisma.job.update({
      where: {
        id,
        clerkId: userId,
      },
      data: {
        ...values,
      },
    });
    return job;
  } catch (error) {
    return null;
  }
}

export async function getStatsAction(): Promise<{
  pending: number;
  declined: number;
  interview: number;
} | null> {
  const userId = authenticateAndRedirect();

  try {
    const status = await prisma.job.groupBy({
      where: {
        clerkId: userId,
      },
      by: ["status"],
      _count: {
        status: true,
      },
    });
    const statusObject = status.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {} as Record<string, number>);
    const defaultStatus = {
      pending: 0,
      interview: 0,
      declined: 0,
      ...statusObject,
    };
    return defaultStatus;
  } catch (error) {
    return null;
  }
}

export async function getChartsDataAction() {
  const userId = authenticateAndRedirect();
  const sixMonthsAgo = dayjs().subtract(6, "month").toDate();
  try {
    const chartData = await prisma.job.findMany({
      where: {
        clerkId: userId,
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    const applicationPerMonth = chartData.reduce((acc, curr) => {
      const date = dayjs(curr.createdAt).format("MMM YY");

      const existingEntry = acc.find((entry) => entry.date === date);
      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        acc.push({ date, count: 1 });
      }
      return acc;
    }, [] as Array<{ date: string; count: number }>);
    return applicationPerMonth;
  } catch (error) {
    redirect("/jobs");
  }
}
