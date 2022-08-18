import dayjs from 'dayjs'

export default function isCurrenRace(race) {
  const now = dayjs()
  const endOfSunday = now.endOf('isoWeek')
  const startOfSaturday = endOfSunday.subtract(2, 'day').startOf('day')

  const raceStart = dayjs(race.datetime)

  return raceStart > startOfSaturday && raceStart <= endOfSunday
}
