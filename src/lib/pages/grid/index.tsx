'use client';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
// import FadeIn from '@/lib/components/animations/FadeIn';
// import GridOptions from '@/lib/components/structures/grid/GridOptions';
const  FadeIn = dynamic(() => import('@/lib/components/animations/FadeIn'))
const  GridOptions = dynamic(() => import('@/lib/components/structures/grid/GridOptions'))

const Grid: NextPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-[60vh]">
      <FadeIn className="max-w-4xl" yMinus>
        <GridOptions />
      </FadeIn>
    </div>
  );
};

export default Grid;
