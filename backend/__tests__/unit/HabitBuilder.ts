import { Id } from "../../src/domain/entity/Id";
import { Habit } from "../../src/domain/entity/Habit";

test("avoid jest to complain about this utils module", () => {});

export class HabitBuilder {
  title: string;
  isGood: boolean;
  target: number;
  id: Id | undefined;

  constructor() {
    this.title = "Habit";
    this.isGood = true;
    this.target = 10;
  }

  withTitle(title: string) {
    this.title = title;
    return this;
  }

  withIsGood(isGood: boolean) {
    this.isGood = isGood;
    return this;
  }

  withTarget(target: number) {
    this.target = target;
    return this;
  }

  withId(id: Id) {
    this.id = id;
    return this;
  }

  build() {
    return new Habit({
      id: this.id,
      target: this.target,
      isGood: this.isGood,
      title: this.title,
    });
  }
}

export const buildHabit = () => new HabitBuilder();
