import z from 'zod';
// import { WithId } from 'mongodb';
// import { db } from '../../db';

export const UserUploadData = z.object({
  url: z.string().min(10),
});
export type UserUploadData = z.infer<typeof UserUploadData>;

// export const JobInformation = z.object({
//   url: z.string().min(10),
//   linkedInJobId: z.string().min(6),
//   title: z.string().min(1),
//   company: z.string().min(1),
//   recruiter: z.string().min(1),
//   description: z.string().min(10),
// });
// export type JobInformation = z.infer<typeof JobInformation>;

// export const Job = z.object({
//   link: z.string().min(10),
//   linkedInJobId: z.string().min(6),
//   title: z.string().min(1),
//   company: z.string().min(1),
//   description: z.string().min(10),
// });
// export type Job = z.infer<typeof Job>;

export const CoverLetter = z.object({
  email: z.string(),
  link: z.string(),
  linkedInJobId: z.string(),
  content: z.string(),
});
export type CoverLetter = z.infer<typeof CoverLetter>;

// export type TodoWithId = WithId<Todo>;
// export const Todos = db.collection<Todo>('todos');
