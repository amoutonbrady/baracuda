import { DOMTags } from './types';

export const baracuda = <Props, Childrens, VDom>(
	h: (tag: string, props: Props, childrens: Childrens) => VDom,
) => {
	// Object validation inspired from: https://github.com/lukeed/klona/blob/master/src/index.js
	const isObject = (param: Props | Childrens): boolean =>
		typeof param === 'object' &&
		Object.prototype.toString.call(param) === '[object Object]' &&
		!('props' in param);

	type Tags = {
		[key in DOMTags]: (
			props: Props | Childrens,
			childrens?: Childrens,
		) => VDom;
	};

	return new Proxy({} as Tags, {
		get(_, tag: string) {
			function makeFunction(childrens: Childrens): VDom;
			function makeFunction(props: Props, childrens: Childrens): VDom;
			function makeFunction(
				props: Props | Childrens,
				childrens?: Childrens,
			): VDom {
				return isObject(props)
					? h(tag, props as Props, childrens)
					: h(tag, {} as Props, props as Childrens);
			}

			return makeFunction;
		},
	});
};

export default baracuda;
