import { Subject, SubjectMeta } from "../db";
import Time from "../time";

export default function SubjectComponent({subject,meta,isCurrent}:{subject: Subject,meta: SubjectMeta,isCurrent:boolean}) {
  return <article className={isCurrent ? " bg-blue-500 w-full border-2 border-blue-500 rounded-xl p-5" :"bg-gray-300 w-full border-2 border-gray-300 rounded-xl p-3"}>
    <h1 className={isCurrent?"text-3xl text-white":"text-3xl"}>{subject.name}</h1>
    <p className={isCurrent ? " text-blue-100" : "text-gray-500"}>{Time.getDisplayTime(meta.from)} ~ {Time.getDisplayTime(meta.to)}</p>
  </article>
}