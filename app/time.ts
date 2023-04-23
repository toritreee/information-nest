export default class Time {
  constructor(public readonly hour: number, public readonly minutes: number) { }
  
  static getTime(time:Time) {
    return time.hour*60+time.minutes
  }

  static getDisplayTime(time:Time) {
    return `${time.hour}:${time.minutes}`
  }
}
