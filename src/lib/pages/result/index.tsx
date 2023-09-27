import type { NextPage } from 'next';
import { ReactQueryHydrate } from '@/services/ReactQuery/ReactQueryHydrate';
import getQueryClient from '@/services/ReactQuery/getQueryClient';
// import { getPostsQueryFn } from '@/queryFns/postsQueryFns';
import { dehydrate } from '@tanstack/react-query';
import { getBatteriesQueryFn } from '@/services/QueryFns/batteryQueryFns';
import { getAllInOnesQueryFn } from '@/services/QueryFns/allInOneQueryFns';
import dynamic from 'next/dynamic';

const Body = dynamic(() => import('@/lib/components/structures/result/Body'));

const Result: NextPage = async () => {
  const queryClient = getQueryClient();
  // await queryClient.prefetchInfiniteQuery(['posts'], getPostsQueryFn);
  await queryClient.prefetchQuery(['batteries'], getBatteriesQueryFn);
  await queryClient.prefetchQuery(['allInOnes'], getAllInOnesQueryFn);
  // await queryClient.prefetchQuery(["inverters"], getInvertersQueryFn);
  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col overflow-x-hidden px-6 py-2 max-[300px]:px-1 sm:py-4">
        <div className="watermark"></div>
        <div className="watermark !hidden"></div>
        <div className="watermark"></div>
        <div className="watermark !hidden"></div>
        <div className="watermark"></div>
        <div className="watermark"></div>
        <div className="watermark !hidden"></div>
        <div className="watermark"></div>
        <div className="watermark !hidden"></div>
        <div className="watermark"></div>
        <div className="watermark !hidden"></div>
        <div className="watermark"></div>
        <div className="watermark !hidden"></div>
        <div className="watermark"></div>
        <div className="watermark !hidden"></div>
        <div className="watermark"></div>
        <Body />
      </div>
    </ReactQueryHydrate>
  );
};

export default Result;
