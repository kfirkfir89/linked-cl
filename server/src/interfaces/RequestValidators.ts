import { AnyZodObject } from 'zod';

export default interface RequestValidators {
  params?: AnyZodObject;
  body?: AnyZodObject;
  file?: AnyZodObject;
  query?: AnyZodObject;
}
