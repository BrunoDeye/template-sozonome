import ConfirmButton from '@/lib/components/structures/terms/ConfirmButton';
import { Button } from '@/lib/components/ui/button';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

// import FadeIn from '@/lib/components/animations/FadeIn';
// import Title from '@/lib/components/structures/place/Title';
// import Options from '@/lib/components/structures/place/Options';
const FadeIn = dynamic(() => import('@/lib/components/animations/FadeIn'));
const Title = dynamic(() => import('@/lib/components/structures/terms/Title'));
const Options = dynamic(
  () => import('@/lib/components/structures/place/Options')
);

const Terms: NextPage = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 px-6 text-center">
      <FadeIn className="max-w-3xl" yMinus>
        <Title />
      </FadeIn>
    </div>
  );
};

export default Terms;
