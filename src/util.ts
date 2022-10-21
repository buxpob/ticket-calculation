import { TRAVEL_TIME } from './const';

export const getNoun = (number: number, one: string, moreTwo: string, moreFour: string) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return moreFour;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return moreTwo;
  }
  return moreFour;
};

export const getFinalTime = (time: string, timeAgo = '') => {
  if (timeAgo === '') {
    return `${TRAVEL_TIME} ${getNoun(TRAVEL_TIME, 'минута', 'минуты', 'минут')}`;
  }

  const days = Number(time.slice(0, 2));
  const hours = Number(time.slice(3, 5));
  const minutes = Number(time.slice(6, 8));

  const daysAgo = Number(timeAgo.slice(0, 2));
  const hoursAgo = Number(timeAgo.slice(3, 5));
  const minutesAgo = Number(timeAgo.slice(6, 8));

  const totalTimeToGo = (days) * 24 * 60 + (hours) * 60 + (minutes);
  const totalTimeAgo = (daysAgo) * 24 * 60 + (hoursAgo) * 60 + (minutesAgo) + TRAVEL_TIME;

  const totalTime = totalTimeAgo - totalTimeToGo;
  const totalHours = Math.floor(totalTime / 60);
  const totalMinutes = totalTime % 60;

  return `${totalHours} ${getNoun(totalHours, 'час', 'часа', 'часов')} ${totalMinutes} ${getNoun(totalMinutes, 'минута', 'минуты', 'минут')}`;
};

export const getArrivalTime = (time: string) => {
  let hours: number | string = Number(time.slice(0, 2));
  let minutes: number | string = Number(time.slice(3));

  minutes += TRAVEL_TIME;

  if (minutes > 59) {
    hours += Math.floor(minutes / 60);
    minutes %= 60;
  }

  if (hours > 23) {
    hours /= 24;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
};

export const createDateList = (list: string[]): string[] => list.map((item) => {
  const hours = Number(item.slice(0, 2));
  const minutes = Number(item.slice(3, 5));

  const date = new Date();
  date.setHours(hours, minutes);

  return (`${date.getDate()} ${date.getHours()} ${date.getMinutes()}`);
});


export const getFilterListTime = (time: string, list: string[]) => {

  const daysCurrent = Number(time.slice(0, 2));
  const hoursCurrent = Number(time.slice(3, 5));
  const minutesCurrent = Number(time.slice(6, 8));

  return list.filter((item) => {
    const days = Number(item.slice(0, 2));
    const hours = Number(item.slice(3, 5));
    const minutes = Number(item.slice(6, 8));

    if ((days - daysCurrent) * 24 * 60 + (hours - hoursCurrent) * 60 + (minutes - minutesCurrent) > TRAVEL_TIME) {
      return item;
    } else {
      return '';
    }
  });
};
