"use client"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../db"
import Link from "next/link"
import ScheduleComponent from "@components/schedule"
import { MdQrCode2 } from "react-icons/md"

export default function App() {
  const schedule = useLiveQuery(async () => {
    return db.schedule.toArray()
  }, [])
  return <main>
    <header className="block p-5 pb-2 border-b-2 border-gray-300 h-17">
      <h1 className="text-2xl">information-nest</h1>
    </header>
    {schedule && <ul className="flex p-5 flex-col">
      {schedule.map((v,i) => <li key={i} className="flex border-gray-300 border rounded-lg w-full mb-5 justify-between">
        <Link href={"/app/schedule/" + v.id} className="block text-xl p-3 pb-11"><ScheduleComponent schedule={v} /></Link>
        <Link href={"/app/schedule/" + v.id + "/qr"} className="block text-xl p-3 pb-11"><MdQrCode2 className="w-5 h-5"/></Link>
      </li>)}
      <li className="block border-blue-500 bg-blue-500 border rounded-lg w-full h-36">
        <Link className="w-full h-full text-xl text-white items-center flex justify-center" href="/app/new">新規作成/追加</Link>
      </li>
    </ul>}
  </main>
}