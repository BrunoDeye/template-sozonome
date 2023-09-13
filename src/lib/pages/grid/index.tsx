'use client';
import FadeIn from '@/lib/components/animations/FadeIn';
import GridOptions from '@/lib/components/structures/grid/GridOptions';
import type { NextPage } from 'next';
import { useEffect } from 'react';

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
