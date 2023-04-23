import { Schedule } from "../db";

export default function ScheduleComponent({ schedule }: { schedule: Schedule }) {
  return <article>
    <h1>{ schedule.name}</h1>
  </article>
}