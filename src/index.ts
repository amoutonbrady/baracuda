import { DOMTags } from './types';

export const baracuda = <Props, Children, VDom>(
	h: (tag: string, props: Props, ...childrens: Children[]) => VDom,
) => {
	// Object validation inspired from: https://github.com/lukeed/klona/blob/master/src/index.js
	const isObject = (param: Props | Children): boolean =>
		typeof param === 'object' &&
		Object.prototype.toString.call(param) === '[object Object]' &&
		!('props' in param);

	type Tags = {
		[key in DOMTags]: (
			props: Props | Children,
			...childrens: Children[]
		) => VDom;
	};

	return new Proxy({} as Tags, {
		get(_, tag: string) {
			function makeFunction(...childrens: Children[]): VDom;
			function makeFunction(props: Props, ...childrens: Children[]): VDom;
			function makeFunction(...args: [Props | Children, Children]): VDom {
				const [props, ...childrens]: [
					Props | Children,
					Children,
				] = args;

				return isObject(props)
					? h(tag, props as Props, ...(childrens as Children[]))
					: h(tag, {} as Props, ...(args as Children[]));
			}

			return makeFunction;
		},
	});
};

export default baracuda;
