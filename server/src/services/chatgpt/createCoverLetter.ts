import OpenAI from 'openai';

const { OPENAI_API_KEY } = process.env;
type MessagePush = {
  role: 'user' | 'assistant';
  content: string;
};
async function createCoverLetter(summrizeCv: string, clTemplate: string) {
  console.log('STARTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT CoverLetter');

  const openai = new OpenAI({
    apiKey: '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',
  });

  let coverLetter: string = '';

  const chat_response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: `take the cv/resume i give you and i need you to incorporate information from the cv/resume in the job cover letter template that i provied you.
        be aware to the following notes:
        1. prevent from duplicate information that will be seen by the recruiter in the cv/resume.
        2. incorporate only information that fit the position requerment.
        3. do a minor changes if you need to describe the candidate abilities.
        4. cv/resume delimited by double quotes.
        5. cover letter template delimited by triple quotes.
        6. output without quotes.

        ""${summrizeCv}""
        """${clTemplate}"""
      `,
      },
    ],
  });
  if (chat_response.choices[0].message.content) {
    coverLetter = chat_response.choices[0].message.content;
  }

  return coverLetter;
}

export { createCoverLetter };
