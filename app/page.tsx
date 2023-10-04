"use client"
import React from 'react'
import { useRouter, usePathname} from 'next/navigation';

const Page = () => {
  const currentPage = usePathname();
  const router = useRouter();
  if(currentPage == "/" && typeof window !== 'undefined') {
    router.push("/album")
    router.refresh();
  }
  return (
    <button >Go to album</button>
  )
}

export default Page