"use client";
import { Day, Schedule, Subject, db } from "@/app/db"
import Time from "@/app/time";
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Create() {
  const [schedule, setSchedule] = useState<Schedule>({
    iteration: {
      type: "week",
      interval: 1
    },
    name: "Unite",
    subjects: [],
    schedules: []
  })
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [schedules, setSchedules] = useState<Day[]>([])
  const router = useRouter()
  return <div>
    <section>
      <label>
        <h1>予定表の名前</h1>
        <input type="text" onChange={v => setSchedule({ ...schedule, name: v.target.value })} value={schedule.name} />
      </label>
    </section>
    <section>
      <h1>教科一覧</h1>
      <ul>
        {subjects.map((v, i) =>
          <li key={i}>
            <input type="text" onChange={e => {
              subjects[i].name = e.target.value
              console.log(v,e.target.value,i)
              setSubjects([...subjects ])
            }} value={v.name} />
          </li>
        )}
        <li>
          <button onClick={() => setSubjects([...subjects, { name: "" }])}>追加</button>
        </li>
      </ul>
    </section>
    <section>
      <h1>予定表</h1>
      <ul>
        {schedules.map((v, schedulesId) => <li key={schedulesId}>
          <article>
            <h1>{new Intl.DateTimeFormat('ja-JP', { weekday: "long" }).format(new Date(2023, 4, 1 + v.day))}</h1>
            <ul>
              {v.subjects.map((sub, i) => <li key={i}>
                <select name="" onChange={e => {
                  schedules[schedulesId].subjects[i].subjectId = Number(e.target.value)
                  setSchedules(schedules)
                }}>
                  <option value="">Select</option>
                  {subjects.map((v, i) => <option value={i} key={i}>{v.name}</option>)}
                </select>
                <input type="time" value={Time.getDisplayTime(sub.from)} onChange={e => {
                  schedules[schedulesId].subjects[i].from = new Time(Number(e.target.value.split(":")[0]), Number(e.target.value.split(":")[1]))
                }} />
                ~
                <input type="time" value={Time.getDisplayTime(sub.from)} onChange={e => {
                  schedules[schedulesId].subjects[i].to = new Time(Number(e.target.value.split(":")[0]), Number(e.target.value.split(":")[1]))
                }} />
              </li>)}
              <li>
                <button onClick={e => {
                  schedules[schedulesId].subjects.push({ subjectId: 0, from: new Time(8,0), to: new Time(9,0), break: new Time(10,0) })
                  setSchedules([...schedules ])
                }}>追加</button>
              </li>
            </ul>
          </article>
        </li>)}
        <li>
          <button onClick={e => {
            setSchedules([...schedules, { subjects: [], day: schedules.length, name: "a" }])
          }}>追加</button>
        </li>
      </ul>
    </section>
    <section>
      <button onClick={e => {
        schedule.schedules = schedules
        schedule.subjects = subjects
        db.schedule.add(schedule).then(v => {
          router.push("/app/"+v)
        })
      }}>「{schedule.name}」を作成する</button>
      <button>変更を破棄して終了</button>
    </section>
  </div>
}