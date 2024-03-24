import EditJobForm from "@/components/editForm";
import { getSingleJobAction } from "@/utils/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const JobDetailPage = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['job', params.id],
    queryFn: () => getSingleJobAction(params.id)
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditJobForm id={params.id} />
    </HydrationBoundary>
  );
};
export default JobDetailPage;
