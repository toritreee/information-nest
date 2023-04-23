import Dexie, { Table } from "dexie";
import Time from "./time";

export interface Subject {
  name: string;
}

export interface SubjectMeta {
  from: Time;
  to: Time;
  break: Time;
  subjectId: number
}


export interface Break {
  from: Time;
  to: Time;
  name: string;
  subjectId: "break"
}


export interface Day {
  subjects: (
    | SubjectMeta
    | Break
  )[];
  day: number;
  name: string;
}

export interface Schedule {
  id?: number;
  name: string;
  subjects: Subject[];
  iteration: {
    type: "week";
    interval: 1;
  };
  schedules: Day[];
}

export class Database extends Dexie {
  schedule!: Table<Schedule>;

  constructor() {
    // IndexDBでの名前を設定
    super("database");

    // DBの初期化
    this.version(1).stores({
      schedule: "++id, name",
    });
  }
}

export const db = new Database();

// db.schedule.put(
//   {
//     name: "Test",
//     subjects: [{ name: "Math I" }, { name: "Math A" }, { name: "English I" }],
//     iteration: {
//       type: "week",
//       interval: 1,
//     },
//     schedules: [
//       {
//         subjects: [
//           {
//             from: new Date(2023,3,9,8,40),
//             to: new Date(2023,3,9,9,30),
//             break: new Date(2023,3,9,9,40),
//             subjectId: 0,
//           },
//           {
//             from: new Date(2023,3,9,9,40),
//             to: new Date(2023,3,9,10,30),
//             break: new Date(2023,3,9,10,40),
//             subjectId: 1,
//           },
//           {
//             from: new Date(2023,3,9,10,40),
//             to: new Date(2023,3,9,11,30),
//             break: new Date(2023,3,9,11,40),
//             subjectId: 2,
//           },
//         ],
//         day: 0,
//         name: "Hoge",
//       },
//     ],
//   },
//   1
// );
