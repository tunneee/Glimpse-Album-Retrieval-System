"use client"
import React from 'react'
import { useRouter, usePathname} from 'next/navigation';

const Page = () => {
  const currentPage = usePathname();
  const router = useRouter();
  if(currentPage == "/" || typeof window !== 'undefined') {
    router.push("/album")
    router.refresh();
  }
  return (
    <div>Page</div>
  )
}

export default Page