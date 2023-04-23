"use client"
import { Schedule, SubjectMeta, db } from "@/app/db"
import { useLiveQuery } from "dexie-react-hooks"
import SubjectComponent from "@components/subject"
import SubjectTime from "@components/subjectTime"
import Time from "@/app/time"

function getToday() {
  return Time.getTime(new Time(9,50))
}

function useSchedule(schedule?: Schedule) {
  const TodaySchedule = schedule && schedule.schedules[new Date().getDay()]
  return {
    nextSubject: TodaySchedule && TodaySchedule.subjects.find((v, i): v is SubjectMeta =>
      Time.getTime(v.from) >  getToday()
      && v.subjectId != "break"
    ),
    finishedSubjects: TodaySchedule && TodaySchedule.subjects.filter(v => Time.getTime(v.to) < getToday()),
    currentSubject: TodaySchedule && TodaySchedule.subjects.find(v => (Time.getTime(v.from) < getToday() && getToday() < Time.getTime(v.to))),
    featureSubjects: TodaySchedule && TodaySchedule.subjects.filter(v => Time.getTime(v.from) > getToday()),
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
    {nextSubject && <section>
      <h1>次の授業</h1>
      <SubjectComponent subject={schedule.subjects[nextSubject.subjectId]} meta={nextSubject} />
    </section>
    }
    {finishedSubjects && currentSubject && featureSubjects && <section>
      <h1>時間割</h1>
      <ul>
        {finishedSubjects.map((v, i) =>
          <li key={i + ":o:" + v.subjectId}>
            {v.subjectId != "break" ? <SubjectComponent subject={schedule.subjects[v.subjectId]} meta={v}  /> : "休憩"}
          </li>)}

        <li key={-1 + ":" + currentSubject.subjectId}>
          <SubjectTime pars={0}/>
          {currentSubject.subjectId != "break"
            ? <SubjectComponent subject={schedule.subjects[currentSubject.subjectId]} meta={currentSubject} />
            : "休憩"}
        </li>
        {featureSubjects.map((v, i) =>
          <li key={i + ":f:" + v.subjectId}>
            {v.subjectId != "break" ? <SubjectComponent subject={schedule.subjects[v.subjectId]} meta={v} /> : "休憩"}
          </li>)}
      </ul>
    </section>
    }
  </div>
    : "Loading..."
}