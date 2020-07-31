export class Habit {
  id: number | undefined;
  isGood: boolean;
  target: number;
  title: string;

  constructor(options: {
    id?: number | undefined;
    title: string;
    isGood: boolean;
    target: number;
  }) {
    this.id = options.id;
    this.title = options.title;
    this.isGood = options.isGood;
    this.target = options.target;
  }
}
