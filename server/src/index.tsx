import fs from 'fs';
import path from 'path';
import pdf from 'html-pdf';
import express from 'express';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import map from './templates';
import { makeTemplate } from './helpers';

const port = 3001;
const app = express();

const pdfData = {
  data: {
    title: 'Example PDF'
  }
};

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('<a href="/pdfs/example-pdf">Go to example pdf</a>');
});

app.get('/pdfs/:templateName', async (req: express.Request, res: express.Response) => {
  const templateName = req.params.templateName;
  if (map.hasOwnProperty(templateName)) {
    const element = map[templateName];
    const markup = ReactDOMServer.renderToStaticMarkup(React.createElement(element, pdfData));
    const template = makeTemplate('Example', markup);
  
    pdf.create(template).toStream(async (err: any, stream: fs.ReadStream) => {
      const filepath = path.join(__dirname, '/pdfs/example.pdf');
      stream.pipe(fs.createWriteStream(filepath));
      stream.on('end', () => {
        res.sendFile(filepath);
      })
    });
  } else {
    res.send('Could not find the template');
  }
});

app.listen(port, () => {
  console.log('Server ready. Vist: http://localhost:' + port);
});
