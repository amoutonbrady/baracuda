import { JSDOM } from 'jsdom';
import { testRunner } from './common';

var dom = new JSDOM('', { pretendToBeVisual: true });

// @ts-ignore
global.window = dom.window;
// @ts-ignore
global.document = dom.window.document;
// @ts-ignore
global.requestAnimationFrame = dom.window.requestAnimationFrame;
// @ts-ignore
global.SVGElement = class {};

const { el } = require('redom');

testRunner('Redom', el);

dom.window.close();
