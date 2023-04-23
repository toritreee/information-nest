"use client"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../db"
import Link from "next/link"
import ScheduleComponent from "@components/schedule"

export default function App() {
  const schedule = useLiveQuery(async () => {
    return db.schedule.toArray()
  }, [])
  return <div>
    {schedule && <ul>
      {schedule.map((v,i) => <li key={i}>
        <Link href={"/app/"+v.id}><ScheduleComponent schedule={v}/></Link>
      </li>)}
    </ul>}
  </div>
}