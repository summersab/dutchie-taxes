export function validateURL(url: string): boolean {
  const urlPattern = new RegExp(
    '^(http(s)?://)' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  const emailRegex = new RegExp(/([a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4})/gi);
  const mobileregex = new RegExp(/tel:+((\+\d{1,2}\s?)?1??\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4})/g);
  return !!(urlPattern.test(url) || emailRegex.test(url) || mobileregex.test(url));
}

export function validateAlt(alt: string): boolean {
  return alt.length > 1;
}

export function readFile(
  file: Blob,
  callback: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null
): void {
  const reader = new FileReader();
  reader.onload = callback;
  reader.readAsDataURL(file);
}

export function imageFileSize(readFileEvent: any): number {
  const dataUrlPrefix = 'data:image/png;base64,';
  const imageDataUrl = readFileEvent.target.result;
  return Math.round(((imageDataUrl.length - dataUrlPrefix.length) * 4) / 5) / 1024 / 1024;
}
