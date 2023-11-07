import multer from 'multer';
import z from 'zod';
// import { WithId } from 'mongodb';
// import { db } from '../../db';

export const UserUploadData = z.object({
  url: z.string().min(10),
});
export type UserUploadData = z.infer<typeof UserUploadData>;

export const CoverLetter = z.object({
  email: z.string(),
  link: z.string(),
  linkedInJobId: z.string(),
  content: z.string(),
});
export type CoverLetter = z.infer<typeof CoverLetter>;

// export type TodoWithId = WithId<Todo>;
// export const Todos = db.collection<Todo>('todos');
