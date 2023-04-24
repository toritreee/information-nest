"use client"
import { deflateRaw } from "@components/compression"
import { db } from "@/app/db"
import { useLiveQuery } from "dexie-react-hooks"
import { useQRCode } from "next-qrcode"
import { useEffect, useMemo, useRef, useState } from "react"
import { displayValue } from "@tanstack/react-query-devtools/build/lib/utils"

export default function QR({ params }: {
  params: {
    schedule: string
  }
}) {
  const schedule = useLiveQuery(async () => {
    return db.schedule.get(Number(params.schedule))
  }, [params.schedule])

  const { SVG } = useQRCode();
  const url = useMemo(() => {
    try {
      location
    } catch {
      return
    }
    if(!schedule)return
    return new URL("/app/new/url?sc=" + btoa(encodeURIComponent(JSON.stringify(schedule))), location.href).toString()
  }, [schedule])
  const [qr, setQr] = useState(false)
  useEffect(() =>setQr(!!(url&&url.length<4000)),[url])
  return <main className="flex w-full h-fit flex-col items-center">
      <h1>QRコードをスキャンして共有</h1>
      {url
        ? <>
          <div className="block max-h-xl max-w-xl w-[90%] h-[90%]">
            {qr?<SVG
              text={url}
            />:"ああ、QRコードが対応して無いようです…少々お待ちください。"}
          </div>
          <div className="text-gray-500 text-center">
            <button onClick={() => navigator.clipboard.writeText(url)}>または、ここをクリックしてURLをコピー</button>
          </div>
        </>
      : <div>Loading...</div>
      }
    </main>
  
}