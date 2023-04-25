"use client";
import { Day, Schedule, Subject, SubjectMeta, db } from "@/app/db"
import Time from "@/app/time";
import { useRouter } from "next/navigation"
import { useState } from "react"
import { MdRemove } from "react-icons/md";

export default function Create() {
  const [schedule, setSchedule] = useState<Schedule>({
    iteration: {
      type: "week",
      interval: 1
    },
    name: "Untitled",
    subjects: [],
    schedules: []
  })
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [schedules, setSchedules] = useState<Day[]>([])
  const router = useRouter()
  const canNext = schedule.name != "" && subjects.find(v => v.name == "") == undefined && schedules.find(v => v.name == "" && v.subjects.find(v=>v.subjectId!=-1)==undefined)==undefined
  return <>
    <header className="p-5 pb-2 ps-2 border-b-2 border-gray-300 flex items-center h-17 sticky top-0 bg-white">
      「{schedule.name}」を作成しています...
    </header>
    <div className="mx-5">
      <section>
        <label className="my-10 block">
          <p className="text-gray-600 mb-3">予定表の名前</p>
          <input type="text" onChange={v => setSchedule({ ...schedule, name: v.target.value })} value={schedule.name} className="border-2 border-gray-700 rounded-md outline-none focus:border-blue-400 p-2" />
          {!schedule.name && <p className="text-red-500">このフィールドは必須です</p>}
        </label>
      </section>
      <section className="my-10 block">
        <h1 className="text-gray-600 mb-3">教科一覧</h1>
        <ul>
          {subjects.map((v, i) =>
            <li key={i} className="p-2 border-2 border-gray-500 rounded-md w-full mb-3 flex gap-4">
              <input type="text" onChange={e => {
                subjects[i].name = e.target.value
                console.log(v, e.target.value, i)
                setSubjects([...subjects])
              }} value={v.name} className="p-2 outline-none border-b-2 border-gray-300 focus:mb-0 focus:border-blue-400 flex-auto" />
              <button onClick={() => {
                delete subjects[i]
                subjects.length -=1
                setSubjects([...subjects])
              }}>
                <MdRemove className="w-8 h-8 m-1 p-2 block hover:bg-slate-200 rounded-full" />
              </button>
            </li>
          )}
          <li className="bg-blue-500 rounded-md w-full">
            <button onClick={() => setSubjects([...subjects, { name: "Untitled" }])} className="text-white text-center inline-block w-full h-full p-3">追加</button>
          </li>
        </ul>
      </section>
      <section className="my-10 block h-screen">
        <h1 className="text-gray-600 mb-3">予定表</h1>
        <ul className="flex overflow-x-scroll h-[80%] gap-16">
          {schedules.map((v, schedulesId) => <li key={schedulesId} className="min-w-[300px] border-2 border-gray-400 rounded-md p-6 overflow-scroll">
            <article>
              <h1>{new Intl.DateTimeFormat('ja-JP', { weekday: "long" }).format(new Date(2023, 3, 2 + v.day))}</h1>
              <ul className="flex gap-4 flex-col">
                {v.subjects.map((sub, i) => <li key={i} className="border-2 border-gray-300 rounded-md p-2 flex flex-col gap-2">
                  <div className="flex">
                    <select className="outline-none w-full flex-auto" onChange={e => {
                      schedules[schedulesId].subjects[i].subjectId = Number(e.target.value)
                      setSchedules(schedules)
                    }}>
                      <option value="-1">Select</option>
                      {subjects.map((v, i) => <option value={i} key={i}>{v.name}</option>)}
                    </select>
                    <button onClick={() => {
                      schedules[schedulesId].subjects.splice(i,1)
                      setSchedules([...schedules])
                    }}>
                      <MdRemove className="w-8 h-8 m-1 p-2 block hover:bg-slate-200 rounded-full" />  
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input type="time" onChange={e => {
                      console.log(schedules[schedulesId].subjects[i])
                      schedules[schedulesId].subjects[i].from = new Time(Number(e.target.value.split(":")[0]), Number(e.target.value.split(":")[1]))
                    }} className="flex-auto" />
                    ~
                    <input type="time" onChange={e => {
                      schedules[schedulesId].subjects[i].to = new Time(Number(e.target.value.split(":")[0]), Number(e.target.value.split(":")[1]))
                    }} className="flex-auto" />
                  </div>
                </li>)}
                <li>
                  <button onClick={e => {
                    schedules[schedulesId].subjects.push({ subjectId: 0, from: new Time(8, 0), to: new Time(9, 0), break: new Time(10, 0) })
                    setSchedules([...schedules])
                  }} className="border-2 border-blue-500 rounded-md p-2 w-full">追加</button>
                </li>
              </ul>
            </article>
          </li>)}
          <li className="bg-blue-500 rounded-md min-w-[300px]">
            <button onClick={e => {
              const lastSchedule = schedules.at(-1)
              setSchedules([...schedules, { subjects: lastSchedule ? [...lastSchedule.subjects.map<SubjectMeta>(v => ({ from: { ...v.from }, subjectId: -1, to: { ...v.to }, break: new Time(10, 0) }))]:[], day: schedules.length, name: "a" }])
            }} className="text-white text-center inline-block w-full h-full p-3">追加</button>
          </li>
        </ul>
      </section>
      <section className="flex flex-col gap-4 items-center">
        <button onClick={e => {
          schedule.schedules = schedules
          schedule.subjects = subjects
          db.schedule.add(schedule).then(v => {
            router.push("/app/schedule/" + v)
          })
        }} className={"bg-blue-500 p-11 w-full rounded-xl text-white text-lg max-w-lg disabled:bg-gray-500"}
          disabled={!canNext}>「{schedule.name}」を作成する</button>
        {!canNext && <p className="text-red-500">現在「{schedule.name}」を作成できません。設定した値を確認してください</p>}
        <button>変更を破棄して終了</button>
      </section>

    </div>
  </>
}