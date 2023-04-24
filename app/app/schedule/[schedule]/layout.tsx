"use client"
import { db } from "@/app/db"
import { useLiveQuery } from "dexie-react-hooks"
import Link from "next/link"
import { MdOutlineKeyboardArrowLeft} from "react-icons/md"

function ScheduleName({ id }: { id: string }) {
  const schedule = useLiveQuery(async () => {
    return db.schedule.get(Number(id))
  },[id])
  return schedule
    ? <h3 className="text-xl">{schedule.name}</h3>
    : <h3 className="text-xl">Loading...</h3>  
}

export default function ScheduleLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: {
    schedule: string
  }
}) {
  return <>
      <header className="p-5 pb-2 ps-2 border-b-2 border-gray-300 flex items-center h-17 sticky top-0 bg-white">
        <Link href="/app/">
          <MdOutlineKeyboardArrowLeft className="w-10 h-10" /></Link>
        <ScheduleName id={params.schedule} />
      </header>
      <div className="mx-5 block">
        {children}
      </div>
    </>
}