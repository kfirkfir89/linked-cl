import PDFServicesSdk from '@adobe/pdfservices-node-sdk';

async function extractJsonFromPdf(filePath, outputFileName) {
  console.log('STARTTTTTTTTTTTTTTTTTTTTT EXTRACT');
  const { PDF_SERVICES_CLIENT_ID, PDF_SERVICES_CLIENT_SECRET } = process.env;
  const outputPath = `output-${outputFileName}/${outputFileName}.zip`;

  try {
    // Initial setup, create credentials instance.
    const credentials =
      PDFServicesSdk.Credentials.servicePrincipalCredentialsBuilder()
        .withClientId(PDF_SERVICES_CLIENT_ID)
        .withClientSecret(PDF_SERVICES_CLIENT_SECRET)
        .build();

    // Create an ExecutionContext using credentials
    const executionContext =
      PDFServicesSdk.ExecutionContext.create(credentials);

    // Build extractPDF options
    const options =
      new PDFServicesSdk.ExtractPDF.options.ExtractPdfOptions.Builder()
        .addElementsToExtract(
          PDFServicesSdk.ExtractPDF.options.ExtractElementType.TEXT
        )
        .build();

    // Create a new operation instance.
    const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew();
    const input = PDFServicesSdk.FileRef.createFromLocalFile(
      filePath,
      PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf
    );

    // Set operation input from a source file.
    extractPDFOperation.setInput(input);

    // Set options
    extractPDFOperation.setOptions(options);

    await extractPDFOperation
      .execute(executionContext)
      .then(async (result) => {
        await result.saveAsFile(outputPath);
      })
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
    // console.log('Exception encountered while executing operation', err);
  }
}

export { extractJsonFromPdf };
