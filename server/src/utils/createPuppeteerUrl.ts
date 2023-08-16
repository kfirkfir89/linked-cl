export function createPuppeteerUrl(url: string): string {
  const parsedUrl = new URL(url);
  const params = new URLSearchParams(parsedUrl.search);
  const jobId = params.get('currentJobId')?.toString();
  if (!jobId) {
    throw new Error('Job ID not found in the provided URL.');
  }
  return `https://www.linkedin.com/jobs/view/${jobId}/`;
}
