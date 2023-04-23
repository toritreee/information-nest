"use client"
import { db } from "@/app/db"
import { useLiveQuery } from "dexie-react-hooks"
import { MdOutlineKeyboardArrowLeft} from "react-icons/md"

function ScheduleName({ id }: { id: string }) {
  const schedule = useLiveQuery(async () => {
    return db.schedule.get(Number(id))
  },[id])
  return schedule
    ? <h3>{schedule.name}</h3>
    : <h3>Loading...</h3>  
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
  return <html lang="ja">
    <head />
    <body>
      <header>
        <MdOutlineKeyboardArrowLeft/>
        <ScheduleName id={params.schedule} />
      </header>
      {children}
    </body>
  </html>
}