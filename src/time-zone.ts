import { createDateList } from './util';
import jstz from 'jstz';
import moment from 'moment';
import 'moment-timezone';

const defineTimeZone = () => {
  if (!sessionStorage.getItem('timezone')) {
    const tz = jstz.determine() || 'UTC';
    sessionStorage.setItem('timezone', tz.name());
  }

  return sessionStorage.getItem('timezone') as string;
};

const createTimeElement = (time: string) => {
  let daysZero: number | string = Number(time.slice(0, 2));
  let hoursZero: number | string = Number(time.slice(3, 5)) - 3;
  let minutesZero: number | string = Number(time.slice(-2));

  if (hoursZero < 0) {
    daysZero -= 1;
    hoursZero = 24 + hoursZero;
  }

  daysZero = (`0${daysZero}`).slice(-2);
  hoursZero = (`0${hoursZero}`).slice(-2);
  minutesZero = (`0${minutesZero}`).slice(-2);

  const timeZone = defineTimeZone();
  const date = moment().format('YYYY-MM');
  const stamp = `${date}-${daysZero}T${hoursZero}:${minutesZero}Z`;
  const momentTime = moment(stamp);

  const tzTime = momentTime.tz(timeZone);

  return tzTime;
};

export const createLocalTimeList = (list: string[], format: string) => {
  const newList = createDateList(list);

  return newList.map((item) => createTimeElement(item).format(format));
};
