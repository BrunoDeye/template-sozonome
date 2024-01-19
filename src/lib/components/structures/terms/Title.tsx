'use client';
import { useTranslations } from "next-intl";
import ConfirmButton from "./ConfirmButton";

export default function Title() {
  const t = useTranslations('Terms');
  
  return (
    <div className="mx-auto mb-3 max-w-4xl text-center space-y-6">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {t('title')}
      </h2>
      <p className="text-md leading-8 text-justify">
        {t.rich('content', {
          important: (chuncks) => <strong>{chuncks}</strong>
        })}
      </p>
      <div className="pt-3">

      <ConfirmButton label={t('confirmButton')} />
      </div>
    </div>
  );
}
