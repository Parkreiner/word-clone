export type NonEmptyStatus = "correct" | "incorrect" | "misplaced";
export type Status = NonEmptyStatus | "empty";

export type Letter = Readonly<
  { status: "empty"; value: "" } | { status: NonEmptyStatus; value: string }
>;

export type Board = readonly (readonly Letter[])[];
