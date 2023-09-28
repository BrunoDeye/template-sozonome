import React from 'react';
import { Button } from '../../ui/button';
import Link from 'next/link';

function ConfirmButton() {
  return (
    <Button
      asChild
      variant="gradientBlue"
    >
      <Link href="/grid">Confirmar</Link>
    </Button>
  );
}

export default ConfirmButton;
