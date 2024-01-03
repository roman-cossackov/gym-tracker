export type plan = {
  id: number;
  blocks: block[];
};
export type block = {
  id: number;
  isCompleted: bolean;
  microblocks: microblock[];
};
export type microblock = {
  id: number;
  isCompleted: bolean;
  days: day[];
};
export type day = {
  id: number;
  isCompleted: bolean;
  exercises: exercise[];
};
export type exercise = {
  id: number;
  isCompleted: bolean;
  title: string;
};
