"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import {
  CreateAndEditJob,
  JobMode,
  JobStatus,
  createAndEditJobSchema,
} from "@/utils/types";
import { CustomFormField, CustomFormSelect } from "./formComponents";

const CreateJobForm = () => {
  const form = useForm<CreateAndEditJob>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });

  function onSubmit(values: CreateAndEditJob) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">add job</h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          <CustomFormField name="position" control={form.control} />
          <CustomFormField name="company" control={form.control} />
          <CustomFormField name="location" control={form.control} />
          <CustomFormSelect
            name="status"
            labelText="job status"
            control={form.control}
            items={Object.values(JobStatus)}
          />
          <CustomFormSelect
            name="mode"
            labelText="job mode"
            control={form.control}
            items={Object.values(JobMode)}
          />
          <Button type="submit" className="capitalize self-end">
            create job
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default CreateJobForm;
