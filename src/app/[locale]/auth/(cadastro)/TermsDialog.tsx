import { Button } from '@/lib/components/ui/button';
import { Checkbox } from '@/lib/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/lib/components/ui/dialog';
import { Input } from '@/lib/components/ui/input';
import { Label } from '@/lib/components/ui/label';
import { Link } from '@/navigation';
import { CheckedState } from '@radix-ui/react-checkbox';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAccept: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<
    {
      name: string;
      phoneNumber: string;
      confirmPassword: string;
      email: string;
      password: string;
      terms: boolean;
    },
    any,
    undefined
  >;
};

export default function TermsDialog({
  open = true,
  setOpen,
  setAccept,
  form,
}: Props) {
  const locale = useLocale();
  const [checked, setChecked] = useState<CheckedState>(false);
  const t = useTranslations('TermsAndPrivacy');
  useEffect(() => {
    if (open) {
      setChecked(false);
    }
  }, [open]);

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogContent className="flex max-w-[99vw] flex-col items-center justify-around p-5 py-10 sm:min-h-[325px] sm:max-w-[625px] sm:p-10">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <DialogTitle className="mb-8 text-center text-2xl tracking-tighter">
            {t('title')}
          </DialogTitle>

          <div className="text-fine-justify max-h-[60vh] max-w-[95vw] overflow-y-scroll pe-2 text-sm sm:max-w-[525px] sm:pe-8 [&_h4]:mb-8 [&_h5]:ml-2 [&_h5]:inline [&_h5]:align-top [&_h5]:leading-5 [&_p]:mb-6 [&_p]:indent-3 [&_p]:first-of-type:mt-6">
            <h4 className="text-lg font-extrabold">
              {t.rich('subtitle', {
                a: (chunk) => (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all underline md:break-normal"
                    href="https://calculadora.app.deyeinversores.com.br/"
                  >
                    {chunk}
                  </Link>
                ),
              })}{' '}
            </h4>

            <ol className="list-inside !list-decimal [&_li]:marker:text-[18px] [&_li]:marker:font-extrabold">
              <li>
                <h5>{t('term1Title')}</h5>
                <p>
                  {t.rich('term1Content', {
                    a: (chunk) => (
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all underline "
                        href="https://calculadora.app.deyeinversores.com.br/"
                      >
                        {chunk}
                      </Link>
                    ),
                    strong: (chunks) => (
                      <span className="font-bold tracking-tight">{chunks}</span>
                    ),
                  })}
                </p>
              </li>

              <li>
                <h5>{t('term2Title')}</h5>
                {t.rich('term2Content', {
                  p: (chunks) => <p>{chunks}</p>,
                })}
              </li>

              <li>
                <h5>{t('term3Title')}</h5>
                {t.rich('term3Content', {
                  p: (chunks) => <p>{chunks}</p>,
                })}
              </li>

              <li>
                <h5>{t('term4Title')}</h5>
                <p>{t('term4Content')}</p>
              </li>

              <li>
                <h5>{t('term5Title')}</h5>
                {t.rich('term5Content', {
                  p: (chunks) => <p>{chunks}</p>,
                  a: (chunk) => (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all underline "
                      href="https://calculadora.app.deyeinversores.com.br/"
                    >
                      {chunk}
                    </Link>
                  ),
                })}
              </li>

              <li>
                <h5>{t('term6Title')}</h5>
                {t.rich('term6Content', {
                  p: (chunks) => <p>{chunks}</p>,
                  strong: (chunk) => (
                    <span className="font-bold tracking-tight">{chunk}</span>
                  ),
                })}
              </li>

              <li>
                <h5>{t('term7Title')}</h5>
                {t.rich('term7Content', {
                  p: (chunks) => <p>{chunks}</p>,
                  ol: (chunks) => <ol className="list-inside">{chunks}</ol>,
                  li: (chunks) => (
                    <li
                      className={`mb-3 before:content-[counter(list-item,_lower-alpha)_')_']`}
                    >
                      {chunks}
                    </li>
                  ),
                  a: (chunk) => (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all underline "
                      href="https://calculadora.app.deyeinversores.com.br/"
                    >
                      {chunk}
                    </Link>
                  ),
                })}
              </li>

              <li>
                <h5>{t('term8Title')}</h5>

                {t.rich('term8Content', {
                  p: (chunks) => <p>{chunks}</p>,
                  strong: (chunk) => (
                    <span className="font-bold tracking-tight">{chunk}</span>
                  ),
                  linkone: (chunks) => (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline dark:text-blue-400"
                      href="https://www.jusbrasil.com.br/legislacao/91774/codigo-de-propriedade-industrial-lei-9279-96"
                    >
                      {chunks}
                    </Link>
                  ),
                  linktwo: (chunks) => (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline dark:text-blue-400"
                      href="https://www.jusbrasil.com.br/legislacao/92175/lei-de-direitos-autorais-lei-9610-98"
                    >
                      {chunks}
                    </Link>
                  ),
                  linkthree: (chunks) => (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline dark:text-blue-400"
                      href="https://www.jusbrasil.com.br/legislacao/109879/lei-do-software-lei-9609-98"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </li>
            </ol>

            <h4 className="mt-6 text-lg font-extrabold">{t('privacyTitle')}</h4>

            <ol className="list-inside">
              <li
                className={`mb-3 before:text-[15px] before:font-extrabold before:content-['${t(
                  'section'
                )}_'_counter(list-item,_decimal)_'_-']`}
              >
                <h5 className="text-[15px]">{t('section1Title')}</h5>
                {t.rich('section1Content', {
                  p: (chunks) => <p>{chunks}</p>,
                  a: (chunks) => (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all underline "
                      href="https://calculadora.app.deyeinversores.com.br/"
                    >
                      {chunks}
                    </Link>
                  ),
                  strong: (chunks) => (
                    <span className="font-bold tracking-tight">{chunks}</span>
                  ),
                  linkone: (chunks) => (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline dark:text-blue-400"
                      href="https://www.jusbrasil.com.br/legislacao/612902269/lei-13709-18"
                    >
                      {chunks}
                    </Link>
                  ),
                  linktwo: (chunks) => (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline dark:text-blue-400"
                      href="https://www.jusbrasil.com.br/legislacao/117197216/lei-12965-14"
                    >
                      {chunks}
                    </Link>
                  ),
                  linkthree: (chunks) => (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline dark:text-blue-400"
                      href="https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=2961&tabela=leis"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </li>

              <li
                className={`mb-3 before:text-[15px] before:font-extrabold before:content-['${t(
                  'section'
                )}_'_counter(list-item,_decimal)_'_-']`}
              >
                <h5 className="text-[15px]">{t('section2Title')}</h5>
                {t.rich('section2Content', {
                  p: (chunks) => <p>{chunks}</p>,
                  ul: (chunks) => (
                    <ul className="ml-5 list-disc [&_p]:[&_*]:indent-0">
                      {chunks}
                    </ul>
                  ),
                  li: (chunks) => <li>{chunks}</li>,
                  strong: (chunks) => (
                    <span className="font-bold tracking-tight">{chunks}</span>
                  ),
                })}
              </li>

              <li
                className={`mb-3 before:text-[15px] before:font-extrabold before:content-['${t(
                  'section'
                )}_'_counter(list-item,_decimal)_'_-']`}
              >
                <h5 className="text-[15px]">{t('section3Title')}</h5>
                {t.rich('section3Content', {
                  p: (chunks) => <p>{chunks}</p>,
                  ul: (chunks) => (
                    <ul className="ml-5 list-disc [&_p]:[&_*]:indent-0">
                      {chunks}
                    </ul>
                  ),
                  li: (chunks) => <li>{chunks}</li>,
                  strong: (chunks) => (
                    <span className="font-bold tracking-tight">{chunks}</span>
                  ),
                })}
              </li>

              <li
                className={`mb-3 before:text-[15px] before:font-extrabold before:content-['${t(
                  'section'
                )}_'_counter(list-item,_decimal)_'_-']`}
              >
                <h5 className="text-[15px]">{t('section4Title')}</h5>
                {t.rich('section4Content', {
                  p: (chunks) => <p>{chunks}</p>,
                  ul: (chunks) => (
                    <ul className="ml-5 list-disc [&_p]:[&_*]:indent-0">
                      {chunks}
                    </ul>
                  ),
                  li: (chunks) => <li>{chunks}</li>,
                  strong: (chunks) => (
                    <span className="font-bold tracking-tight">{chunks}</span>
                  ),
                })}
              </li>

              <li
                className={`mb-3 before:text-[15px] before:font-extrabold before:content-['${t(
                  'section'
                )}_'_counter(list-item,_decimal)_'_-']`}
              >
                <h5 className="text-[15px]">{t('section5Title')}</h5>
                {t.rich('section5Content', {
                  p: (chunks) => <p>{chunks}</p>,
                  ol: (chunks) => (
                    <ol
                      className={`[&_li]:mb-3 [&_li]:ml-5 [&_li]:before:content-[counter(list-item,_upper-roman)_'_-_'] [&_p]:inline [&_p]:[&_*]:indent-0`}
                    >
                      {chunks}
                    </ol>
                  ),
                  li: (chunks) => <li>{chunks}</li>,
                  linkone: (chunks) => (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline dark:text-blue-400"
                      href="https://www.jusbrasil.com.br/topicos/200399061/inciso-i-do-artigo-15-da-lei-n-13709-de-14-de-agosto-de-2018"
                    >
                      {chunks}
                    </Link>
                  ),
                  linktwo: (chunks) => (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline dark:text-blue-400"
                      href="https://www.jusbrasil.com.br/topicos/200399064/artigo-15-da-lei-n-13709-de-14-de-agosto-de-2018"
                    >
                      {chunks}
                    </Link>
                  ),
                  linkthree: (chunks) => (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline dark:text-blue-400"
                      href="https://www.jusbrasil.com.br/legislacao/612902269/lei-13709-18"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </li>

              <li
                className={`mb-3 mt-6 before:text-[15px] before:font-extrabold before:content-['${t(
                  'section'
                )}_'_counter(list-item,_decimal)_'_-']`}
              >
                <h5 className="text-[15px]">
                  {t('section6Title')}
                </h5>
                {t.rich('section6Content', {
                  p: (chunks) => <p>{chunks}</p>,
                })}
                
              </li>

              <li
                className={`mb-3 before:text-[15px] before:font-extrabold before:content-['${t(
                  'section'
                )}_'_counter(list-item,_decimal)_'_-']`}
              >
                <h5 className="text-[15px]">
                  {t('section7Title')}
                </h5>
                <p>{t('section7Content')}</p>
              </li>
              <li
                className={`mb-3 before:text-[15px] before:font-extrabold before:content-['${t(
                  'section'
                )}_'_counter(list-item,_decimal)_'_-']`}
              >
                <h5 className="text-[15px]">{t('section8Title')}</h5>
                {t.rich('section8Content', {
                  p: (chunks) => <p>{chunks}</p>,
                  strong: (chunks) => (
                    <span className="font-bold tracking-tight">{chunks}</span>
                  ),
                })}          
              </li>
              <li
                className={`mb-3 before:text-[15px] before:font-extrabold before:content-['${t(
                  'section'
                )}_'_counter(list-item,_decimal)_'_-']`}
              >
                <h5 className="text-[15px]">{t('section9Title')}</h5>
                {t.rich('section9Content', {
                  p: (chunks) => <p>{chunks}</p>,
                  strong: (chunks) => (
                    <span className="font-bold tracking-tight">{chunks}</span>
                  ),
                })} 
              </li>
              <li
                className={`mb-3 before:text-[15px] before:font-extrabold before:content-['${t(
                  'section'
                )}_'_counter(list-item,_decimal)_'_-']`}
              >
                <h5 className="text-[15px]">
                  {t('section10Title')}
                </h5>
                {t.rich('section10Content', {
                  p: (chunks) => <p>{chunks}</p>,
                })} 
              </li>
              <li
                className={`mb-3 before:text-[15px] before:font-extrabold before:content-['${t(
                  'section'
                )}_'_counter(list-item,_decimal)_'_-']`}
              >
                <h5 className="text-[15px]">
                  {t('section11Title')}
                </h5>
                {t.rich('section11Content', {
                    p: (chunks) => <p>{chunks}</p>,
                })}
              </li>
            </ol>
          </div>
        </div>
        <DialogFooter>
          <div className="mt-3 flex-col items-center justify-center">
            <div className="flex items-center justify-center space-x-2">
              <Checkbox
                id="read-terms"
                onCheckedChange={(value) => setChecked(value)}
                checked={checked}
                aria-required
                required
              />
              <label
                htmlFor="read-terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('readCheckbox')}
              </label>
            </div>
            <div className={`${!checked ? 'cursor-not-allowed' : ''}`}>
              <Button
                onClick={() => {
                  setAccept(true);
                  setOpen(false);
                  form.clearErrors('terms');
                }}
                className={`mt-6`}
                variant="gradientDefault"
                type="submit"
                aria-disabled={!checked}
                disabled={!checked}
              >
                {t('acceptButton')}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
