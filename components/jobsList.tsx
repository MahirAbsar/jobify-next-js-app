"use client";

import { getAllJobsAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import JobCard from "./jobCard";
import ButtonContainer from "./complexButtonContainer";

const JobsList = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "";
  const pageNum = Number(searchParams.get("page")) || 1;

  const { data, isPending } = useQuery({
    queryKey: ["jobs", search, jobStatus, pageNum],
    queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNum }),
  });

  const jobs = data?.jobs || [];
  const count = data?.count;
  const currentPage = data?.page || 0;
  const totalPages = Math.ceil(data?.totalPages || 0);
  if (isPending) <h1 className="text-xl">Please wait....</h1>;
  if (jobs.length < 1) <h1 className="text-xl">No jobs found</h1>;

  return (
    <>
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-xl font-semibold">{count} jobs found</h2>
        {totalPages < 2 ? null : (
          <ButtonContainer currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {jobs.map((job) => {
          return <JobCard key={job.id} job={job} />;
        })}
      </div>
    </>
  );
};
export default JobsList;
