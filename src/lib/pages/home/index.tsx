import type { NextPage } from 'next';
import dynamic from 'next/dynamic'

// import FadeIn from '@/lib/components/animations/FadeIn';
// import Hero from '@/lib/components/structures/home/Hero';
// import StartButton from '@/lib/components/structures/home/StartButton';
const  FadeIn = dynamic(() => import('@/lib/components/animations/FadeIn'))
const  Hero = dynamic(() => import('@/lib/components/structures/home/Hero'), { ssr: false })
const  StartButton = dynamic(() => import('@/lib/components/structures/home/StartButton'))

const Home: NextPage = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
      <FadeIn className="max-w-3xl" yMinus>
        <Hero />
      </FadeIn>
      <FadeIn className="max-w-3xl">
        <StartButton />
      </FadeIn>
    </div>
  );
};

export default Home;
