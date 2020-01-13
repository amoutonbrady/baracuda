import { describe } from 'riteway';
import { baracuda } from '../pkg/dist-web';

export const testRunner = (name, h) => {
	const { section, ul, li, input, p } = baracuda(h);

	describe(`proxy work with ${name}`, async assert => {
		const state = { value: 'Hello, World' };
		const array = [{ hello: 'world' }];

		assert({
			given: 'a proxy with string',
			should: 'match the VNode created with h()',
			actual: section(state.value),
			expected: h('section', {}, state.value),
		});

		assert({
			given: 'a proxy with props',
			should: 'match the VNode created with h()',
			actual: section({ class: 'test' }, state.value),
			expected: h('section', { class: 'test' }, state.value),
		});

		assert({
			given: 'a proxy with an array of proxies',
			should: 'match the VNode created with h()',
			actual: ul([li('list 1'), li('list 2')]),
			expected: h('ul', {}, [
				h('li', {}, 'list 1'),
				h('li', {}, 'list 2'),
			]),
		});

		assert({
			given: 'a proxy with no childrens',
			should: 'match the VNode input created with h()',
			actual: input({
				value: state.value,
			}),
			expected: h('input', {
				value: state.value,
			}),
		});

		assert({
			given: 'a proxy with an array of one object and no props',
			should: 'match the VNode input created with h()',
			actual: ul(array.map(v => li(v.hello))),
			expected: h(
				'ul',
				{},
				array.map(v => h('li', {}, v.hello)),
			),
		});

		assert({
			given: 'a proxy with no props and a child element',
			should: 'match the VNode input created with h()',
			actual: section(p(state.value)),
			expected: h('section', {}, h('p', {}, state.value)),
		});
	});
};
