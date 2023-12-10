import z from 'zod';

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
