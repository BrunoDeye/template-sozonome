import { Button } from '../../ui/button';
import Link from 'next/link';

export default function ConfirmButton() {
  return (
    <Button variant="gradientSky" asChild>
      <Link href="/grid">Confirmar</Link>
    </Button>
  );
}
