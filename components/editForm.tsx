"use client";

import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  CreateAndEditJobType,
  JobMode,
  JobStatus,
  JobType,
  createAndEditJobSchema,
} from "@/utils/types";
import { CustomFormField, CustomFormSelect } from "./formComponents";
import {
  getSingleJobAction,
  updateJobAction,
} from "@/utils/actions";
import { useToast } from "./ui/use-toast";

const EditJobForm = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["job", id],
    queryFn: () => getSingleJobAction(id),
  });
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position,
      company: data?.company,
      location: data?.location,
      status: data?.status as JobStatus,
      mode: data?.mode as JobMode,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      updateJobAction(id, values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: "There was an erorr",
        });
        return;
      }
      toast({
        description: "Job updated!",
      });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", id] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
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
        <h2 className="capitalize font-semibold text-4xl mb-6">edit job</h2>

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
            {isPending ? "updating...." : "update job"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default EditJobForm;
