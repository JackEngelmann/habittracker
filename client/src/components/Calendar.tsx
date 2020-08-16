import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  renderDay(day: moment.Moment): React.ReactNode;
};

const WEEK_HEIGHT = 40;
const DAY_WIDTH = 40;

const DayWrapper = styled.div`
  position: relative;
`;

const Day = styled.div`
  position: absolute;
  width: ${DAY_WIDTH}px;
  height: ${WEEK_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MonthDisplay = styled.div`
  font-size: 1.2em;
  justify-content: space-between;
  display: flex;
`;

export function Calendar(props: Props) {
  const [monthMoment, setMonthMoment] = useState(moment());
  const year = monthMoment.year();
  const month = monthMoment.month();
  const allDays = getAllDaysOfMonth(year, month);
  const startWeek = allDays[0].isoWeek();
  const endWeek = allDays[allDays.length - 1].isoWeek();
  const amountOfWeeks = endWeek - startWeek;
  return (
    <div>
      <MonthDisplay style={{ width: 7 * DAY_WIDTH }}>
        <div
          onClick={() => setMonthMoment((m) => moment(m).subtract(1, "month"))}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div>
          {moment.months()[month]} {year}
        </div>
        <div onClick={() => setMonthMoment((m) => moment(m).add(1, "month"))}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </MonthDisplay>
      <DayWrapper
        style={{ height: WEEK_HEIGHT * amountOfWeeks, width: DAY_WIDTH * 7 }}
      >
        {allDays.map((d) => {
          const top = (d.isoWeek() - startWeek) * WEEK_HEIGHT;
          const left =
            d.day() === 0 ? DAY_WIDTH * 6 : (d.day() - 1) * DAY_WIDTH;
          return (
            <Day
              key={d.toISOString()}
              style={{
                top,
                left,
              }}
            >
              {props.renderDay(d)}
            </Day>
          );
        })}
      </DayWrapper>
    </div>
  );
}

function getAllDaysOfMonth(year: number, month: number) {
  const firstDayOfMonth = moment().year(year).month(month).date(1);
  const days = [firstDayOfMonth];
  let dayCounter = moment(firstDayOfMonth);
  while (true) {
    dayCounter = moment(dayCounter).add(1, "day");
    if (dayCounter.month() !== month) {
      break;
    }
    days.push(dayCounter);
  }
  return days;
}
