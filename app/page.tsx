"use client"
import Dexie from 'dexie'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex flex-col gap-3">
      予定表を表示するサイトのβバージョンです。エラーが発生した場合には下のボタンを押してリセットしてください
      <Link href="/app/">アプリを起動</Link>
      <button onClick={() => {
        Dexie.delete("database")
      }}>リセット(データはすべて消去されます)</button>
    </main>
  )
}
