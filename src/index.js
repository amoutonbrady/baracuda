import { h } from 'hyperapp';

const isObject = object => String(object) === '[object Object]';

const haDom = new Proxy(
	{},
	{
		get: (_, tag) => (props, children) => h(tag, isObject(props) ? props : {}, children || props),
	},
);

module.exports = haDom;
