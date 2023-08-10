export function createPuppeteerUrl(url: string): string {
  const parsedUrl = new URL(url);
  const params = new URLSearchParams(parsedUrl.search);
  const jobId = params.get('currentJobId')?.toString();
  if (!jobId) {
    return '';
  }
  return `https://www.linkedin.com/jobs/view/${jobId}/`;
}
