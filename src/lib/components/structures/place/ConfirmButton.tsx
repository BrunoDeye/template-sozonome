'use client'
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";

export default function ConfirmButton() {

  const router = useRouter()

  return <Button variant="gradientSky" onClick={() => router.push('/grid')}>Confirmar</Button>
}