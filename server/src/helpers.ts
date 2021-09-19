export function makeTemplate(title: string, html: string, styleTags?: string): string {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
      </head>
      <body>
        ${html}
      </body>
    </html>`;
}
