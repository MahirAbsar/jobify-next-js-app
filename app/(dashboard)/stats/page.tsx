import ChartsContainer from "@/components/chartsContainer";
import StatsContainer from "@/components/statsContainer";
import { getChartsDataAction, getStatsAction } from "@/utils/actions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const StatsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsDataAction(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsContainer />
      <ChartsContainer />
    </HydrationBoundary>
  );
};
export default StatsPage;
