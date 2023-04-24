import Link from "next/link";
import { MdOutlineKeyboardArrowLeft, MdQrCode2 } from "react-icons/md";

export default function New() {
  return <>
    <header className="p-5 pb-2 ps-2 border-b-2 border-gray-300 flex items-center h-17 sticky top-0 bg-white">
      <Link href="/app/">
        <MdOutlineKeyboardArrowLeft className="w-10 h-10" /></Link>
      <h1 className="text-xl">新規作成/読み取り</h1>
    </header>
    <div className="mx-5 mt-3">
      <div className="flex items-center flex-col">
        <main className="min-w-fit w-[50%] flex flex-col gap-4">
          <Link href={"/app/new/qr"} className="w-full h-96 flex flex-col justify-around bg-blue-500 rounded-xl text-white">
            <p className="flex items-center flex-col">
              <MdQrCode2 className="w-24 h-24" />
            </p>
            <p className="text-center block w-full text-xl">QRコードで読み込み</p>
          </Link>
          <Link href={"/app/new/create"} className="w-full h-44 flex items-center border-2 border-blue-500 rounded-xl ">
            <p className="text-center block w-full text-xl">新規作成</p>
          </Link>
          <Link href={"/app/new/url"} className="text-gray-500 text-center">または、URLで読み取り</Link>
        </main>
      </div>
    </div>
  </>
}