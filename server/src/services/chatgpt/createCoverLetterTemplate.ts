import OpenAI from 'openai';
import { JobInformation } from '../../utils/getJobDescription';
import { structureText } from '../../utils/textHandlers';

const { OPENAI_API_KEY } = process.env;
type MessagePush = {
  role: 'user' | 'assistant';
  content: string;
};
async function createCoverLetterTemplate(jobInformation: JobInformation) {
  console.log('STARTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT createCoverLetterTemplate');
  const openai = new OpenAI({
    apiKey: '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',
  });

  const jobDetails = `\n jobPosition: ${jobInformation.title} 
  \n hiringManager: ${jobInformation.recruiter} 
  \n companyName: ${jobInformation.company} 
  \n jobDescription: ${structureText(jobInformation.description)}`;
  let coverLetterTemplate: string = '';

  const chat_response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: `I'm interested to applying a job and i need to you to create a cover letter base on the job/position job information.
        be aware to the following notes:
        1. Keep the letter concise, targeted, impactful and short.
        2. The thank you note should be brief.
        3. max length 500 chars.

        job information: ${jobDetails}.
      `,
      },
    ],
  });
  if (chat_response.choices[0].message.content) {
    coverLetterTemplate = chat_response.choices[0].message.content;
  }

  return coverLetterTemplate;
}

export { createCoverLetterTemplate };
