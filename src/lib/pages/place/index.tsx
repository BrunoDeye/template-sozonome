import type { NextPage } from 'next';

import FadeIn from '@/lib/components/animations/FadeIn';
import Hero from '@/lib/components/structures/home/Hero';
import StartButton from '@/lib/components/structures/home/StartButton';
import Title from '@/lib/components/structures/place/Title';
import { Button } from '@/lib/components/ui/button';
import ConfirmButton from '@/lib/components/structures/place/ConfirmButton';
import Options from '@/lib/components/structures/place/Options';

const Place: NextPage = () => {

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center px-6">
      <FadeIn className="max-w-3xl" yMinus>
        <Title />
        <Options />
      </FadeIn>
    </div>
  );
};

export default Place;