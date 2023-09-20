'use client';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
// import FadeIn from '@/lib/components/animations/FadeIn';
// import DeviceCard from '@/lib/components/structures/devices/DeviceCard';
const  FadeIn = dynamic(() => import('@/lib/components/animations/FadeIn'))
const  DeviceCard = dynamic(() => import('@/lib/components/structures/devices/DeviceCard'))

const Devices: NextPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mx-auto min-h-[60vh] max-w-3xl overflow-x-hidden">
      <FadeIn className="w-full" yMinus>
        <DeviceCard />
      </FadeIn>
    </div>
  );
};

export default Devices;
