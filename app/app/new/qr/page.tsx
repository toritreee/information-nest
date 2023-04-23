"use client"
import { Schedule, db } from "@/app/db";
import Link from "next/link";
import { useState } from "react";
import { MdQrCode2 } from "react-icons/md";
import { QrReader } from "react-qr-reader";
import { useRouter } from "next/navigation"

export default function QR() {
  const [dataUrl, setDataUrl] = useState<string|undefined>()
  const router = useRouter()
  const obj = (() => {
    if(!dataUrl)return
    const param = new URL(dataUrl).searchParams.get("sc")
    if (!param) return
    const schedule = JSON.parse(param) as Schedule
    schedule.id = undefined
    return schedule
  })()
  return <div className="flex items-center flex-col h-full">
    <main className="min-w-fit w-[90%] max-w-3xl flex flex-col gap-4 h-full">
      <div className="w-full h-full flex flex-col justify-around bg-blue-500 rounded-xl text-white">
        <div className="w-full p-2">
          {!obj
            ? <QrReader
              onResult={(result, error) => {
                if (!result) return
                setDataUrl(result.getText())
              }}
              constraints={({})}
            />
            : <div className="flex flex-col w-full gap-6">
              <h1 className="text-xl">「{obj.name}」をこの端末に追加しますか?</h1>
              <div className="flex justify-around gap-6">
                <button onClick={()=>setDataUrl(undefined)} className="p-3 bg-white text-black flex-auto rounded-md">No</button>
                <button onClick={() => {
                  db.schedule.add(obj).then(v => {
                    router.push("/app/schedule/"+v)
                  })
                }} className="p-3 border-2 border-white flex-auto rounded-md">Yes</button>
              </div>
            </div>
          }
        </div>
        <p className="text-center block w-full text-xl">QRコードで読み込み</p>
      </div>
    </main>
  </div>
}