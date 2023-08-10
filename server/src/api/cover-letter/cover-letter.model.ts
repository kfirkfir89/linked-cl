import z from 'zod';
// import { WithId } from 'mongodb';
// import { db } from '../../db';

export const UrlInput = z.object({
  url: z.string().min(10),
});
export type UrlInput = z.infer<typeof UrlInput>;

export const JobDescription = z.object({
  title: z.string().min(1),
  description: z.string().min(10),
});
export type JobDescription = z.infer<typeof JobDescription>;

// export const CoverLetter = z.object({
//   title: z.string().min(1),
//   description: z.string().min(10),
// });
// export type CoverLetter = z.infer<typeof CoverLetter>;

// export type TodoWithId = WithId<Todo>;
// export const Todos = db.collection<Todo>('todos');
