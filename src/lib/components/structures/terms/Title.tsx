import ConfirmButton from "./ConfirmButton";

export default function Title() {
  return (
    <div className="mx-auto mb-3 max-w-4xl text-center space-y-6">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Termos de Uso
      </h2>
      <p className="mt-2 text-md leading-8 text-justify">
        Bem-vindo à Calculadora de Sistemas Híbridos Deye, uma ferramenta
        desenvolvida pelos nossos engenheiros com o <strong>propósito educacional</strong>  de
        ajudar você a dimensionar um sistema de backup. É importante lembrar que
        a Deye <strong>não assume</strong> a responsabilidade pelos dimensionamentos resultantes
        do uso desta calculadora. Recomendamos que um engenheiro projetista ou
        um profissional responsável avalie a viabilidade do dimensionamento para
        garantir que suas necessidades específicas sejam atendidas de maneira
        adequada. Sistemas híbridos de backup são uma decisão estratégica para
        garantir que em sua residência, comércio ou indústria não ocorram
        interrupções inesperadas no fornecimento de energia elétrica, garantindo
        conforto e confiança para você.
      </p>
      <ConfirmButton />
    </div>
  );
}
