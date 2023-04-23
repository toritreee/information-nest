import { Subject, SubjectMeta } from "../db";
import Time from "../time";

export default function SubjectComponent({subject,meta}:{subject: Subject,meta: SubjectMeta}) {
  return <article>
    <h1>{subject.name}</h1>
    <p>{Time.getDisplayTime(meta.from)} ~ {Time.getDisplayTime(meta.to)}</p>
  </article>
}