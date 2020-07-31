import { Habit } from "domain/entity/habit";

test("Creation of an habit to work.", () => {
  // arrange
  const title = "some-title";
  const isGood = true;
  const target = 10;
  const id = 1;

  // act
  const habit = new Habit({ title, isGood, target, id });

  // assert
  expect(habit.title).toBe(title);
  expect(habit.isGood).toBe(isGood);
  expect(habit.target).toBe(target);
  expect(habit.id).toBe(id);
});
