export function dateEndExceedsDateBegin(
  dateBegin: string,
  dateEnd: string,
  diffDay: number = 1
) {
  const begin = new Date(dateBegin);
  begin.setDate(begin.getDate() + diffDay);
  const end = new Date(dateEnd);
  end.setHours(23);
  end.setMinutes(59);
  end.setSeconds(59);
  return end >= begin;
}
