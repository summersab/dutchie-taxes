import moment from 'moment-timezone';
import _ from 'lodash';
import flow from 'lodash/fp/flow.js';
import map from 'lodash/fp/map.js';
import flattenDeep from 'lodash/fp/flattenDeep.js';

// Returns an empty string if can't produce an ISO string - may not be what you want!!
/* eslint-disable */
export const toISOString = (date)=>(date && typeof date.toISOString === 'function' ? date.toISOString() : '');

/* eslint-enable */

export const convertDate = (time,timezone,date=null,daysOffset=0,hoursOffset=0,minutesOffset=0)=>{
    if (time === 'Immediately') {
        const rv = moment().add(daysOffset, 'days').add(hoursOffset, 'hours').add(minutesOffset, 'minutes');
        return rv;
    }

    const requestedDay = date ? moment.tz(date, timezone).format('MM-DD-YY') : moment().tz(timezone).format('MM-DD-YY');
    const requested = `${requestedDay} ${time}`;
    const rv = moment.tz(requested, 'MM-DD-YY hh:mmA', timezone).add(daysOffset, 'days').add(hoursOffset, 'hours').add(minutesOffset, 'minutes');
    return rv;
}
;

export const formatDate = (passedDate,format)=>{
    const date = passedDate instanceof Date ? passedDate.toISOString() : passedDate;
    return moment(date).format(format);
}
;

/*
 * Get hours, by type, for the next openn day, accounting for
 * special hours
 */
export const findNextOpenDay = ({serviceType='pickup', standardHours={}, specialHours={}, timezone='US/Pacific', now, addedDays=0, useOrderTypesConfigV2=false, })=>{
    if (addedDays > 7 || !standardHours) {
        return {};
    }

    const specialHoursDays = flow(map('hoursPerDay'), flattenDeep)(specialHours);

    const nextDay = moment().tz(timezone).startOf('day').add(addedDays, 'days');

    let nextDayHours = standardHours[nextDay.format('dddd')];
    const specialHoursForNextDay = _.find(_.compact(specialHoursDays), ({date})=>moment.tz(date, timezone).isSame(nextDay, 'day'));
    if (specialHoursForNextDay) {
        nextDayHours = useOrderTypesConfigV2 ? specialHoursForNextDay.hours : specialHoursForNextDay[`${serviceType}Hours`];
    }

    const start = nextDayHours.start === 'open' ? '12:00 AM' : nextDayHours.start;
    const end = nextDayHours.end === 'open' ? '12:00 AM' : nextDayHours.end;
    const openMoment = moment.tz(`${nextDay.format('MM-DD-YY')} ${start}`, 'MM-DD-YY hh:mmA', timezone);

    // if open 24 hours, close is 12:00 am the next day
    const closeMoment = moment.tz(`${nextDay.clone().add(nextDayHours.end === 'open' ? 1 : 0, 'day').format('MM-DD-YY')} ${end}`, 'MM-DD-YY hh:mmA', timezone);
    /* return hours for the first day that is either:
   *   a. today and the store has not yet closed
   *   b. after today
   */
    if (nextDayHours.active && (now.isBefore(closeMoment) || !nextDay.isSame(now, 'day'))) {
        return {
            date: nextDay,
            openMoment,
            closeMoment,
        };
    }

    return findNextOpenDay({
        serviceType,
        standardHours,
        specialHours,
        timezone,
        now,
        addedDays: addedDays + 1,
        useOrderTypesConfigV2,
    });
}
;

export const guessTimezone = ()=>{
    const guess = moment.tz.guess();

    if (['America/New_York', 'America/Detroit'].includes(guess)) {
        return 'US/Eastern';
    }

    if (guess === 'America/Chicago') {
        return 'US/Central';
    }

    if (['America/Denver', 'America/Boise'].includes(guess)) {
        return 'US/Mountain';
    }

    if (['America/Los_Angeles', 'America/Vancouver'].includes(guess)) {
        return 'US/Pacific';
    }

    return guess;
}
;

export const formatGhostPublishAt = (publishedAt)=>{
    const now = moment();
    const momentPublishedAt = !publishedAt ? now : moment(publishedAt);
    let publishedAtString = momentPublishedAt.fromNow();
    const daysPassedSincePublish = Math.floor(now.diff(momentPublishedAt, 'days'));
    if (daysPassedSincePublish < 7 && daysPassedSincePublish >= 1) {
        publishedAtString = `${daysPassedSincePublish} day${daysPassedSincePublish > 1 ? 's' : ''} ago`;
    } else if (daysPassedSincePublish >= 7) {
        const weeksPassed = Math.floor(daysPassedSincePublish / 7);
        publishedAtString = `${weeksPassed} week${weeksPassed > 1 ? 's' : ''} ago`;
    }
    return publishedAtString;
}
;
