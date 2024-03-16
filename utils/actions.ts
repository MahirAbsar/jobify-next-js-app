"use server"

import { redirect } from "next/navigation";
import { CreateAndEditJobType, JobType, createAndEditJobSchema } from "./types";
import { auth } from "@clerk/nextjs";
import prisma from "./db";

function authenticateAndRedirect() {
    const { userId } = auth()
    if(!userId) redirect("/");
    return userId
}

export async function createJobAction(values: CreateAndEditJobType):Promise<JobType | null> {
    const userId = authenticateAndRedirect();
    try {
        createAndEditJobSchema.parse(values);
        const job = await prisma.job.create({
            data: { ...values, clerkId: userId }
        })
        return job;
    } catch (error) {
        console.log(error);
        return null;
    }
}