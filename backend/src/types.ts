export const TYPES = {
  Database: Symbol.for("Database"),
  Server: Symbol.for("Server"),
  HabitRepository: Symbol.for("HabitRepository"),
  HabitLogRepository: Symbol.for("HabitLogRepository"),
  SchemaCreator: Symbol.for("SchemaCreator"),

  CreateHabit: Symbol.for("CreateHabit"),
  FindHabit: Symbol.for("FindHabit"),
  UpdateHabit: Symbol.for("UpdateHabit"),
  DeleteHabit: Symbol.for("DeleteHabit"),

  CreateHabitLog: Symbol.for("CreateHabitLog"),
  FindHabitLog: Symbol.for("FindHabitLog"),
  UpdateHabitLog: Symbol.for("UpdateHabitLog"),
  DeleteHabitLog: Symbol.for("DeleteHabitLog"),

  SqliteDatabase: Symbol.for("SqliteDatabase"),

  ExpressHabitController: Symbol.for("ExpressHabitController"),
  ExpressHabitLogController: Symbol.for("ExpressHabitLogController"),
};
