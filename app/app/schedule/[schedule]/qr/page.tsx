"use client"
import { db } from "@/app/db"
import { useLiveQuery } from "dexie-react-hooks"
import { useQRCode } from "next-qrcode"
import { useEffect, useMemo, useRef } from "react"

export default function QR({ params }:{
  params: {
    schedule: string
  }
}) {
  const schedule = useLiveQuery(async () => {
    return db.schedule.get(Number(params.schedule))
  }, [params.schedule])

  const { SVG } = useQRCode();
  const url = useMemo(() => new URL("/app/new/url?sc=" + encodeURIComponent(JSON.stringify(schedule)), location.href).toString(),[schedule])
  return <div>
    <main className="flex w-full h-fit flex-col items-center">
      <h1>QRコードをスキャンして共有</h1>
      <div className="block max-h-xl max-w-xl w-[90%] h-[90%]">
        <SVG
          text={url}
        />
      </div>
      <div className="text-gray-500 text-center">
        <button onClick={()=>navigator.clipboard.writeText(url)}>または、ここをクリックしてURLをコピー</button>
      </div>
    </main>
  </div>
}