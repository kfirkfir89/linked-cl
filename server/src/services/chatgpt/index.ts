import OpenAI from 'openai';
import { JobInformation } from '../../utils/getJobDescription';
import { createCoverLetterTemplate } from './createCoverLetterTemplate';
import { summrizeUserCv } from './summrizeUserCv';

const { OPENAI_API_KEY } = process.env;
type MessagePush = {
  role: 'user' | 'assistant';
  content: string;
};
// async function createCoverLetterJson(
//   jobInformation: JobInformation,
//   cvText: string
// ) {
//   console.log('STARTTTTTTTTTTTTTTTTTTTTT OPENNNAIIIIII', jobInformation);
//   // const openai = new OpenAI({
//   //   apiKey: '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',
//   // });
//   // const openai = new OpenAI({
//   //   apiKey: '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',
//   // });
//   // const openai = new OpenAI({
//   //   apiKey: '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',
//   // });
//   const openai = new OpenAI({
//     apiKey: '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',
//   });
//   let coverLetter: string = '';
//   // promise all couple of calls
//   const chat_response = await openai.chat.completions.create({
//     model: 'gpt-4',
//     messages: [
//       {
//         role: 'user',
//         content: `I'm interested in applying for this position: ${jobInformation}.
//       create me a cover letter base on my cv: ${cvText}.
//       respone should be structured as json as follows: {
//         "personalDetails": {
//           "name": "PLACEHOLDER_NAME",
//           "address": "PLACEHOLDER_ADDRESS",
//           "email": "PLACEHOLDER_EMAIL",
//           "phone": "PLACEHOLDER_PHONE"
//         },
//         "introduction": {
//           "hiringManager": "PLACEHOLDER_HIRING_MANAGER",
//           "jobPosition": "PLACEHOLDER_JOB_TITLE",
//           "companyName": "PLACEHOLDER_COMPANY_NAME",
//           "jobDescription": "PLACEHOLDER_JOB_DESCRIPTION",
//         },
//         "body": {
//           "content": "PLACEHOLDER_CONTENT",
//         },
//         "conclusion": {
//           "thankYouNote": "PLACEHOLDER_THANK_YOU_NOTE"
//         }
//       }
//       Notes:
//         1. If any data is missing, use an empty string.
//         2. Highlight only relevant skills and concept information.
//         3. Keep the letter concise, targeted, impactful and short.
//         4. The thank you note should be brief.
//         5. max length 500 chars.
//       `,
//       },
//     ],
//   });
//   if (chat_response.choices[0].message.content) {
//     coverLetter = chat_response.choices[0].message.content;
//   }

//   return coverLetter;
// }

async function createCoverLetterJson(
  jobInformation: JobInformation,
  cvText: string
) {
  const [coverLetterTemplate, summrizeCv] = await Promise.all([
    createCoverLetterTemplate(jobInformation),
    summrizeUserCv(cvText),
  ]);
}
export { createCoverLetterJson };
