import PDFServicesSdk from '@adobe/pdfservices-node-sdk';

async function createPdfFromJson(jsonPath) {
  const { PDF_SERVICES_CLIENT_ID, PDF_SERVICES_CLIENT_SECRET } = process.env;
  try {
    const credentials =
      PDFServicesSdk.Credentials.servicePrincipalCredentialsBuilder()
        .withClientId(PDF_SERVICES_CLIENT_ID)
        .withClientSecret(PDF_SERVICES_CLIENT_SECRET)
        .build();

    // Create an ExecutionContext using credentials
    const executionContext =
      PDFServicesSdk.ExecutionContext.create(credentials);

    const createPdfOperation = PDFServicesSdk.CreatePDF.Operation.createNew();

    // Set operation input from a source file.
    const input = PDFServicesSdk.FileRef.createFromLocalFile(jsonPath);

    await createPdfOperation.setInput(input);

    // Execute the operation and Save the result to the specified location.
    await createPdfOperation
      .execute(executionContext)
      .then((result) => result.saveAsFile('output/createPDFFromJSON.pdf'))
      .catch((err) => {
        if (
          err instanceof PDFServicesSdk.Error.ServiceApiError ||
          err instanceof PDFServicesSdk.Error.ServiceUsageError
        ) {
          throw new Error(err);
        } else {
          throw new Error(err);
        }
      });
  } catch (err) {
    throw new Error(err);
  }
}

export { createPdfFromJson };
