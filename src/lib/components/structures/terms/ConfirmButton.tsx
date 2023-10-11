import React from 'react';
import { Button } from '../../ui/button';
import Link from 'next-intl/link';


function ConfirmButton({label} :{ label: String }) {
  return (
    <Button
      asChild
      variant="gradientBlue"
    >
      <Link href="/grid">{label}</Link>
    </Button>
  );
}

export default ConfirmButton;
