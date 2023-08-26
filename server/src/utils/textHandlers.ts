function jsonToText(jsonObject: any) {
  let extractedText = '';
  jsonObject.elements.forEach((element: any, index: number) => {
    if (element.Text) {
      if (
        element.Path.includes('H1') ||
        element.Path.includes('H2') ||
        element.Path.includes('H3') ||
        element.Path.includes('Summary') ||
        element.Path.includes('Skills') ||
        element.Path.includes('Technical Experience') ||
        element.Path.includes('Education')
      ) {
        extractedText += '\n\n';
      }
      if (element.Text.includes('•')) {
        extractedText += `\n${element.Text} `;
      }
      // if (index > 0 && jsonObject.elements[index - 1].Text.includes('•')) {
      //   extractedText += `${element.Text} `;
      // }
      if (
        element.Path.includes('LI') &&
        (!jsonObject.elements[index - 1] ||
          (jsonObject.elements[index - 1] &&
            jsonObject.elements[index - 1].Text.includes('•')))
      ) {
        extractedText += '\n';
      } else {
        extractedText += ' ';
      }
      extractedText += element.Text;
    }
  });
  return extractedText.trim();
}

function structureText(input: string): string {
  const lines = input.replace(/\./g, '.\n').split('\n');

  const structuredText = lines.join('\n');

  return structuredText.trim();
}

export { jsonToText, structureText };
