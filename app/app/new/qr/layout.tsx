"use client"

import Link from "next/link"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md"


export default function QRLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <html lang="ja">
    <head />
    <body className="h-screen overflow-hidden">
      <header className="p-5 pb-2 ps-2 border-b-2 border-gray-300 flex items-center h-17 sticky top-0 bg-white">
        <Link href="/app/">
          <MdOutlineKeyboardArrowLeft className="w-10 h-10" /></Link>
        <h1 className="text-xl">新規作成/読み取り</h1>
      </header>
      <div className="mx-5 mt-3 h-full">
        {children}
      </div>
    </body>
  </html>
}