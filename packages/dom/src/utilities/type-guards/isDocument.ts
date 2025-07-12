import {getWindow} from '../execution-context/getWindow.ts';

export function isDocument(node: Node): node is Document | ShadowRoot {
  const {Document, ShadowRoot} = getWindow(node);

  return (
    node instanceof Document ||
    (ShadowRoot && node instanceof ShadowRoot) ||
    ('nodeType' in node && node.nodeType === Node.DOCUMENT_NODE)
  );
}
