import OpenAI from 'openai';

const { OPENAI_API_KEY } = process.env;
type MessagePush = {
  role: 'user' | 'assistant';
  content: string;
};
async function createCoverLetter(cvText: string, jobObj: string) {
  const openai = new OpenAI({
    apiKey: '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',
  });

  let coverLetter: string = '';

  const chat_response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `You will be provided with candidate cv/resume and a job/position description(object).
        cv/resume delimited by double quotes.
        cover letter template delimited by triple quotes.
        
        1. Keep the letter concise, targeted, impactful and short.
        2. The thank you note should be brief.
        3. max length 500 chars.

           Follow these steps to answer:
           1. take the cv/resume check for the candidate year of expireance, skills verbal skills.
           2. take the job/position description and create a cover letter and incorporate the candidate relevante information (
              notes: 
                - The thank you note should be brief.
                - max length 500 chars.
              ).
           3. ouput should be in json format in the sollowing structure: 
              {
                "email": "CANDIDATE_EMAIL",
                "link": "JOB_URL",
                "linkedInJobId": "LINKIN_JOB_ID",
                "content": "COVER_LETTER_CONTENT"
              }
           `,
      },
      {
        role: 'user',
        content: `
        ""${cvText}""
        """${jobObj}"""
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
