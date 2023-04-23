"use client"
import { Schedule, SubjectMeta, db } from "@/app/db"
import { useLiveQuery } from "dexie-react-hooks"
import SubjectComponent from "@components/subject"
import SubjectTime from "@components/subjectTime"
import Time from "@/app/time"
import { useEffect, useState } from "react"

function getToday() {
  return Time.getTime(new Time(new Date().getHours(),new Date().getMinutes()))
}

function useSchedule(schedule?: Schedule) {
  const TodaySchedule = schedule && schedule.schedules[new Date().getDay()]
  const [count, setCount] = useState(0)
  useEffect(() => {
    const time = window.setInterval(() => {
      setCount(v => v + 1)
    }, 1000)
    return () => {
      window.clearInterval(time)
    }
  },[])
  return {
    nextSubject: TodaySchedule && TodaySchedule.subjects.find((v, i): v is SubjectMeta =>
      Time.getTime(v.from) >  getToday()
      && v.subjectId != "break"
    ),
    finishedSubjects: TodaySchedule && TodaySchedule.subjects.filter(v => Time.getTime(v.to) < getToday()),
    currentSubject: TodaySchedule && TodaySchedule.subjects.find(v => (Time.getTime(v.from) < getToday() && getToday() < Time.getTime(v.to))),
    featureSubjects: TodaySchedule && TodaySchedule.subjects.filter(v => Time.getTime(v.from) > getToday()),
    count
  }
}

export default function Schedule({
  params
}: {
  params: {
    schedule: string
  }
}) {
  const schedule = useLiveQuery(async () => {
    return db.schedule.get(Number(params.schedule))
  }, [params.schedule])
  const { nextSubject, finishedSubjects, currentSubject, featureSubjects } = useSchedule(schedule)

  return schedule ? <div>
    {nextSubject && <section className="pb-5">
      <h1 >次の授業</h1>
      <SubjectComponent subject={schedule.subjects[nextSubject.subjectId]} meta={nextSubject} isCurrent />
    </section>
    }
    {finishedSubjects && featureSubjects && <section>
      <h1>時間割</h1>
      <ul>
        {finishedSubjects.map((v, i) =>
          <li key={i + ":o:" + v.subjectId} className="pb-3">
            {v.subjectId != "break" ? <SubjectComponent subject={schedule.subjects[v.subjectId]} meta={v} isCurrent={false} /> : "休憩"}
          </li>)}

        {currentSubject && <li key={-1 + ":" + currentSubject.subjectId} className="pb-3 flex gap-1">
          <SubjectTime pars={(getToday() - Time.getTime(currentSubject.from))/(Time.getTime(currentSubject.to) - Time.getTime(currentSubject.from))*100} />
          {currentSubject.subjectId != "break"
            ? <SubjectComponent subject={schedule.subjects[currentSubject.subjectId]} meta={currentSubject} isCurrent />
            : "休憩"}
        </li>}
        {featureSubjects.map((v, i) =>
          <li key={i + ":f:" + v.subjectId} className="pb-3">
            {v.subjectId != "break" ? <SubjectComponent subject={schedule.subjects[v.subjectId]} meta={v} isCurrent /> : "休憩"}
          </li>)}
      </ul>
    </section>
    }
  </div>
    : "Loading..."
}