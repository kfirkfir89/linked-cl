import OpenAI from 'openai';

const { OPENAI_API_KEY } = process.env;
type MessagePush = {
  role: 'user' | 'assistant';
  content: string;
};
async function summrizeUserCv(textCv: string) {
  console.log('STARTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT summrizeUserCv');
  const openai = new OpenAI({
    apiKey: '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',
  });

  let summrizeCv: string = '';

  const chat_response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: `I need to summrize this CV: ${textCv}.
          and respone should be structured as json as follows: {
            "cv": {
              "personalInformation": {
                "fullName": "PLACEHOLDER_FULL_NAME",
                "jobTitle": "PLACEHOLDER_JOB_TITLE",
                "contact": {
                  "username": "PLACEHOLDER_USERNAME",
                  "linkedIn": "PLACEHOLDER_LINKEDIN",
                  "portfolio": "PLACEHOLDER_PORTFOLIO",
                  "email": "PLACEHOLDER_EMAIL",
                  "phone": "PLACEHOLDER_PHONE"
                }
              },
              "summary": "PLACEHOLDER_SUMMARY",
              "skills": {
                "frontEnd": "PLACEHOLDER_FRONTEND_SKILLS",
                "backEnd": "PLACEHOLDER_BACKEND_SKILLS",
                "tools": "PLACEHOLDER_TOOLS"
              },
              "technicalExperience": {
                "projects": [
                  {
                    "name": "PLACEHOLDER_PROJECT_NAME",
                    "description": "PLACEHOLDER_PROJECT_DESCRIPTION",
                    "technologies": "PLACEHOLDER_TECHNOLOGIES",
                    "features": "PLACEHOLDER_FEATURES"
                  }
                ]
              },
              "education": {
                "degree": "PLACEHOLDER_DEGREE",
                "institution": "PLACEHOLDER_INSTITUTION",
                "year": "PLACEHOLDER_YEAR"
              },
              "industryDesired": {
                "levelOfStructure": "PLACEHOLDER_LEVEL_OF_STRUCTURE",
                "title": "PLACEHOLDER_DESIRED_TITLE"
              }
            }
      Notes:
        1. Keep the letter concise, targeted, impactful and short.
        2. If any data is missing, use an empty string.
      `,
      },
    ],
  });
  if (chat_response.choices[0].message.content) {
    summrizeCv = chat_response.choices[0].message.content;
  }

  return summrizeCv;
}

export { summrizeUserCv };
