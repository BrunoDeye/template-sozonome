import React from 'react';
import { Button } from '../../ui/button';
import {Link } from '@/navigation';


function ConfirmButton({label} :{ label: String }) {
  return (
    <Button
      asChild
      size="large"
      variant="gradientBlue"
    >
      <Link href="/grid">{label}</Link>
    </Button>
  );
}

export default ConfirmButton;
