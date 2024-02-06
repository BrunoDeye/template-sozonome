import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

// import FadeIn from '@/lib/components/animations/FadeIn';
// import Hero from '@/lib/components/structures/home/Hero';
// import StartButton from '@/lib/components/structures/home/StartButton';
const FadeIn = dynamic(() => import('@/lib/components/animations/FadeIn'));
const Hero = dynamic(() => import('@/lib/components/structures/home/Hero'));
const StartButton = dynamic(
  () => import('@/lib/components/structures/home/StartButton')
);

const Home: NextPage = ({
  params: {locale}
}: any) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Index');
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
      <FadeIn className="max-w-3xl" yMinus>
        <Hero title={t('title')} subtitle={t('subtitle')} />
      </FadeIn>
      <FadeIn className="max-w-3xl">
        <StartButton
          keepGoingButtonTxt={t('keepGoingButton')}
          RestartButtonTxt={t('RestartButton')}
          StartButtonTxt={t('StartButton')}
        />
      </FadeIn>
    </div>
  );
};

export default Home;
