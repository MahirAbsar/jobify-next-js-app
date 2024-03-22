"use client";

import { getAllJobsAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import JobCard from "./jobCard";

const JobsList = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || 1;
  const jobStatus = searchParams.get("jobStatus") || "";
  const page = Number(searchParams.get("page")) || 1;

  const { data, isPending } = useQuery({
    queryKey: ["jobs", search, jobStatus, page],
    queryFn: () => getAllJobsAction({}),
  });

  const jobs = data?.jobs || [];

  if (isPending) <h1 className="text-xl">Please wait....</h1>;
  if (jobs.length < 1) <h1 className="text-xl">No jobs found</h1>;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {jobs.map((job) => {
        return <JobCard key={job.id} job={job} />;
      })}
    </div>
  );
};
export default JobsList;
