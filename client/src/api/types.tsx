import moment from "moment";

export type Id = number;

export type Habit = {
  title: string;
  target: number;
  isGood: boolean;
  id: Id;
};

export type CreateHabitInput = {
  title: string;
  target: number;
  isGood: boolean;
};

export type CreateHabitLogInput = {
  amount: number;
  date: moment.Moment;
  habitId: Id;
};

export type HabitLog = {
  amount: number;
  id: Id;
  date: moment.Moment;
};

export type UpdateHabitLogInput = {
  amount: number;
  id: Id;
  date: moment.Moment;
  habitId: Id;
};
