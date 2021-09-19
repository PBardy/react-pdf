import ExamplePdf from '../../templates/src/pdfs/documents/example-pdf';

const map: TemplateMap = {
  'example-pdf': ExamplePdf,
};

interface TemplateMap {
  [key: string]: (props: any) => JSX.Element;
}

export default map;
