
import { Skeleton } from '@/lib/components/ui/skeleton';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.

  return (
    <div className="mx-auto flex w-[100vw] sm:w-[50vw] flex-col items-center gap-8 px-6">
      <Skeleton className="h-[52px] w-[50vw] sm:w-[200px]" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-3 w-full" />

      <Skeleton className="h-[100px] w-[70vw] sm:w-[40vw] rounded-lg" />
      <Skeleton className="h-[100px] w-[70vw] sm:w-[40vw] rounded-lg" />
      <Skeleton className="h-[100px] w-[70vw] sm:w-[40vw] rounded-lg" />
      <Skeleton className="h-[100px] w-[70vw] sm:w-[40vw] rounded-lg" />
      <Skeleton className="h-[100px] w-[70vw] sm:w-[40vw] rounded-lg" />
    </div>
  );
}
