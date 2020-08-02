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
