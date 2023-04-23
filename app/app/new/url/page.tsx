"use client"
import { Schedule, db } from "@/app/db";
import { useRouter } from "next/navigation"

export default function QR() {
  const router = useRouter()
  const obj = (() => {
    try {
      location
    }catch{
      return 
    }
    const param = new URL(location.href).searchParams.get("sc")
    if (!param) return
    const schedule = JSON.parse(param) as Schedule
    schedule.id = undefined
    return schedule
  })()
  return <div className="flex items-center flex-col h-full">
    <main className="min-w-fit w-[90%] max-w-3xl flex flex-col gap-4 h-full">
      <div className="w-full h-full flex flex-col justify-around bg-blue-500 rounded-xl text-white">
        <div className="w-full p-2">
          {obj ? <div className="flex flex-col w-full gap-6">
            <h1 className="text-xl">「{obj.name}」をこの端末に追加しますか?</h1>
            <div className="flex justify-around gap-6">
              <button onClick={() => router.back()} className="p-3 bg-white text-black flex-auto rounded-md">No</button>
              <button onClick={() => {
                db.schedule.add(obj).then(v => {
                  router.push("/app/schedule/" + v)
                })
              }} className="p-3 border-2 border-white flex-auto rounded-md">Yes</button>
            </div>
          </div>
            : "無効なURL"
          }
        </div>
      </div>
    </main>
  </div>
}