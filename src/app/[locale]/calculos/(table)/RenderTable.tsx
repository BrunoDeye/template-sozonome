'use client'
import React, { useEffect, useState } from 'react'
import CalcsTable from './CalcsTable'
import { columns } from './columns'
import { Calculation } from '@/app/client/prisma';
import { mobileColumns } from './mobileColumns'
import { useRouter } from '@/navigation'

type Props = {
  data: Calculation[];
  headers: any
}

function RenderTable({data, headers }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter()
  useEffect(() => {
    // Function to update the state based on the device width
    const updateIsMobile = () => {
      const newWidth = window.innerWidth
      setIsMobile(newWidth < 1024);
    };
  
    // Initial call to set the state based on the current width
    updateIsMobile();
  
    // Event listener to update the state when the window is resized
    window.addEventListener('resize', updateIsMobile);
    router.refresh()
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateIsMobile);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount
  
  return (
    <CalcsTable headers={headers} columns={isMobile ? mobileColumns : columns} data={data} />
  )
}

export default RenderTable