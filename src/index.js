// Object validation inspired from: https://github.com/lukeed/klona/blob/master/src/index.js
const isObject = param =>
	typeof param === 'object' &&
	Object.prototype.toString.call(param) === '[object Object]' &&
	!param.props;

export const baracuda = h =>
	new Proxy(h, {
		get: (_, tag) => (props, childrens) =>
			isObject(props) ? h(tag, props, childrens) : h(tag, {}, props),
	});

export default baracuda;
