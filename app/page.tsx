"use client"
import React from 'react'
import { useRouter, usePathname} from 'next/navigation';

const Page = () => {
  const currentPage = usePathname();
  const router = useRouter();
 
  return (
    <button >Go to album</button>
  )
}

export default Page