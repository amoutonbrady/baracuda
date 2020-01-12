// Inspired by https://github.com/ohanhi/hyperscript-helpers/issues/26
const isObject = param => String(param) === '[object Object]';

export const baracuda = h =>
	new Proxy(h, {
		get: (_, tag) => (props, childrens) =>
			isObject(props) ? h(tag, props, childrens) : h(tag, {}, props),
	});

export default baracuda;
