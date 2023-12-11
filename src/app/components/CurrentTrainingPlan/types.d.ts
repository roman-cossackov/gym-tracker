export type plan = {
  id: number;
  blocks: block[];
};
export type block = {
  id: number;
  microblocks: microblock[];
};
export type microblock = {
  id: number;
  days: day[];
};
export type day = {
  id: number;
  exercises: exercise[];
};
export type exercise = {
  id: number;
  title: string;
};
