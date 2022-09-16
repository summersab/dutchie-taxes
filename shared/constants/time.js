import _ from 'lodash';

export const timezoneOptions = [
  'US/Eastern',
  'US/Central',
  'US/Mountain',
  'US/Pacific',
  'US/Hawaii',
  'US/Alaska',
  'America/Anchorage',
  'America/Chicago',
  'America/Dawson',
  'America/Dawson_Creek',
  'America/Denver',
  'America/Detroit',
  'America/Edmonton',
  'America/Fort_Nelson',
  'America/Fort_Wayne',
  'America/Goose_Bay',
  'America/Halifax',
  'America/Indiana/Indianapolis',
  'America/Indiana/Knox',
  'America/Indiana/Marengo',
  'America/Indiana/Petersburg',
  'America/Indiana/Tell_City',
  'America/Indiana/Vevay',
  'America/Indiana/Vincennes',
  'America/Indiana/Winamac',
  'America/Indianapolis',
  'America/Inuvik',
  'America/Iqaluit',
  'America/Juneau',
  'America/Kentucky/Louisville',
  'America/Kentucky/Monticello',
  'America/Knox_IN',
  'America/Los_Angeles',
  'America/Louisville',
  'America/Menominee',
  'America/New_York',
  'America/Nome',
  'America/North_Dakota/Beulah',
  'America/North_Dakota/Center',
  'America/North_Dakota/New_Salem',
  'America/Phoenix',
  'America/Puerto_Rico',
  'America/Regina',
  'America/Shiprock',
  'America/Sitka',
  'America/St_Barthelemy',
  'America/St_Johns',
  'America/Thunder_Bay',
  'America/Toronto',
  'America/Vancouver',
  'America/Virgin',
  'America/Whitehorse',
  'America/Winnipeg',
  'America/Yakutat',
  'America/Yellowknife',
  'Pacific/Honolulu',
];

// Javascript day order.
export const dayNamesLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const daysLongToShortNames = {
  Sunday: 'Sun',
  Monday: 'Mon',
  Tuesday: 'Tues',
  Wednesday: 'Weds',
  Thursday: 'Thurs',
  Friday: 'Fri',
  Saturday: 'Sat',
};

// TODO: refactor dayNamesLong and daysLongToShortNames to use this
//  (current daysLongToShortNames contains some 4-letter names)
export const daysOfWeek = [
  { id: 0, long: 'Sunday', short: 'Sun', value: 'Sunday' },
  { id: 1, long: 'Monday', short: 'Mon', value: 'Monday' },
  { id: 2, long: 'Tuesday', short: 'Tue', value: 'Tuesday' },
  { id: 3, long: 'Wednesday', short: 'Wed', value: 'Wednesday' },
  { id: 4, long: 'Thursday', short: 'Thu', value: 'Thursday' },
  { id: 5, long: 'Friday', short: 'Fri', value: 'Friday' },
  { id: 6, long: 'Saturday', short: 'Sat', value: 'Saturday' },
];

export const dayIdToDayOfWeek = daysOfWeek.reduce((hash, day) => {
  hash[day.id] = day.value;
  return hash;
}, {});

export const timeBase = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
export const dayTimeBreaks = [':00 AM', ':15 AM', ':30 AM', ':45 AM'];
export const eveningTimeBreaks = [':00 PM', ':15 PM', ':30 PM', ':45 PM'];
export const dayTimes = _.flatten(timeBase.map((tbase) => dayTimeBreaks.map((tbreak) => `${tbase}${tbreak}`)));
export const eveningTimes = _.flatten(timeBase.map((tbase) => eveningTimeBreaks.map((tbreak) => `${tbase}${tbreak}`)));
export const times = _.concat(dayTimes, eveningTimes);
export const defaultDayStart = '8:00 AM';
export const defaultDayEnd = '8:00 PM';
export const defaultHours = dayNamesLong.reduce((obj, day) => {
  obj[day] = ['start', 'end'].reduce((dayObj, place) => {
    dayObj[place] = place === 'start' ? defaultDayStart : defaultDayEnd;
    return dayObj;
  }, {});
  return obj;
}, {});
export const orderDays = (unordered) => {
  const ordered = {};
  _.keys(unordered)
    .sort((a, b) => dayNamesLong.indexOf(a) - dayNamesLong.indexOf(b))
    .forEach((key) => (ordered[key] = unordered[key]));
  return ordered;
};

export const defaultScheduledOrderTimeSlotIncrement = { key: '30 minutes', label: '30 minutes each', value: 30 };
export const scheduledOrderTimeSlotIncrements = [
  { key: '15 minutes', label: '15 minutes each', value: 15 },
  defaultScheduledOrderTimeSlotIncrement,
  { key: '1 hour', label: '1 hour each', value: 60 },
  { key: '1.5 hour', label: '1.5 hours each', value: 90 },
  { key: '2 hour', label: '2 hours each', value: 120 },
  { key: '2.5 hour', label: '2.5 hours each', value: 150 },
  { key: '3 hour', label: '3 hours each', value: 180 },
  { key: '3.5 hour', label: '3.5 hours each', value: 210 },
  { key: '4 hour', label: '4 hours each', value: 240 },
  { key: '4.5 hour', label: '4.5 hours each', value: 270 },
  { key: '5 hour', label: '5 hours each', value: 300 },
];
export const scheduledOrderNextAvailableOptions = _.map(_.range(5, 100, 5).concat(_.range(100, 301, 10)), (el) => ({
  val: el,
  key: `${el} minutes`,
}));
