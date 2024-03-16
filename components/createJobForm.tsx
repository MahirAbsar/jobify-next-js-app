"use client";

import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreateAndEditJobType,
  JobMode,
  JobStatus,
  createAndEditJobSchema,
} from "@/utils/types";
import { CustomFormField, CustomFormSelect } from "./formComponents";
import { createJobAction } from "@/utils/actions";
import { useToast } from "./ui/use-toast";

const CreateJobForm = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: "There was an erorr",
        });
      }
      toast({
        description: "Job created!",
      });
      router.push("/jobs");
    },
  });

  function onSubmit(values: CreateAndEditJobType) {
    mutate(values);
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
          <Button
            type="submit"
            className="capitalize self-end"
            disabled={isPending}
          >
            {isPending ? "loading...." : "create job"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default CreateJobForm;
