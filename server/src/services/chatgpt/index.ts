import OpenAI from 'openai';

const { OPENAI_API_KEY } = process.env;
type MessagePush = {
  role: 'user' | 'assistant';
  content: string;
};
async function createCoverLetterJson(jobObj: string, textData: string) {
  console.log('STARTTTTTTTTTTTTTTTTTTTTT OPENNNAIIIIII');

  const openai = new OpenAI({
    apiKey: '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',
  });
  let coverLetter: string = '';
  // promise all couple of calls
  const chat_response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: `I'm interested in applying for this position: ${jobObj}.
      create me a cover letter base on my cv: ${textData}.
      respone should be structured as json as follows: :
        "personalDetails": {
          "name": "PLACEHOLDER_NAME",
          "address": "PLACEHOLDER_ADDRESS",
          "email": "PLACEHOLDER_EMAIL",
          "phone": "PLACEHOLDER_PHONE"
        },
        "introduction": {
          "hiringManager": "PLACEHOLDER_HIRING_MANAGER",
          "companyName": "PLACEHOLDER_COMPANY_NAME",
          "positionInterestedIn": "PLACEHOLDER_JOB_TITLE"
        },
        "body": {
          "content": "PLACEHOLDER_CONTENT",
        },
        "conclusion": {
          "thankYouNote": "PLACEHOLDER_THANK_YOU_NOTE"
        }
      }
      Notes:
        1. If any data is missing, use an empty string.
        2. Highlight only relevant skills and concept information.
        3. Keep the letter concise, targeted, impactful and short.
        4. The thank you note should be brief.
        5. max length 500 chars.
      `,
      },
    ],
  });
  if (chat_response.choices[0].message.content) {
    coverLetter = chat_response.choices[0].message.content;
  }

  return coverLetter;
}

export { createCoverLetterJson };
