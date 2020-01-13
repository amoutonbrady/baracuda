import { HTMLTags } from './html-tags';
import { SVGTags } from './svg-tags';

const Tags = [...HTMLTags, ...SVGTags];

export type DOMTags = typeof Tags[number];
