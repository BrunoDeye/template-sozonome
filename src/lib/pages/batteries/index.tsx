import type { NextPage } from 'next';
import { ReactQueryHydrate } from '@/services/ReactQuery/ReactQueryHydrate';
import getQueryClient from '@/services/ReactQuery/getQueryClient';
// import { getPostsQueryFn } from '@/queryFns/postsQueryFns';
import { dehydrate } from '@tanstack/react-query';
import { getBatteriesQueryFn } from '@/services/QueryFns/batteryQueryFns';
import { getAllInOnesQueryFn } from '@/services/QueryFns/allInOneQueryFns';
import dynamic from 'next/dynamic';
import BatteriesPage from '@/lib/components/structures/batteries/BatteriesPage';

const Body = dynamic(() => import('@/lib/components/structures/result/Body'));
const Result: NextPage = async () => {
  const queryClient = getQueryClient();
  // await queryClient.prefetchInfiniteQuery(['posts'], getPostsQueryFn);
  await queryClient.prefetchQuery(['batteries'], getBatteriesQueryFn);
  // await queryClient.prefetchQuery(["inverters"], getInvertersQueryFn);
  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <BatteriesPage />
    </ReactQueryHydrate>
  );
};

export default Result;