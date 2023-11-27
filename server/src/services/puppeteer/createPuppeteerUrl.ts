export type PuppeteerLink = {
  linkedInJobId: string;
  url: string;
};

const validateLinkedInUrl = (linkedInUrl: string) => {
  const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/;
  return regex.test(linkedInUrl);
};

export function createPuppeteerUrl(url: string): PuppeteerLink {
  const parsedUrl = new URL(url);
  const params = new URLSearchParams(parsedUrl.search);
  const jobId = params.get('currentJobId')?.toString();
  if (!validateLinkedInUrl(url)) {
    throw new Error('Invalid LinkedIn URL.');
  }
  if (!jobId) {
    throw new Error('Job ID not found in the provided URL.');
  }
  return {
    linkedInJobId: jobId,
    url: `https://www.linkedin.com/jobs/view/${jobId}/`,
  };
}
