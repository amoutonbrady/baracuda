import { describe } from 'riteway';
import { h } from 'hyperapp';

import hh from '../src/index';

const { section, ul, li } = hh(h);

describe('proxy work with HyperApp', async assert => {
	assert({
		given: 'a proxy with string',
		should: 'match the VNode created with h()',
		actual: section('Hello, World'),
		expected: h('section', {}, 'Hello, World'),
	});

	assert({
		given: 'a proxy with props',
		should: 'match the VNode created with h()',
		actual: section({ class: 'test' }, 'Hello, World'),
		expected: h('section', { class: 'test' }, 'Hello, World'),
	});

	assert({
		given: 'a proxy with an array of proxies',
		should: 'match the VNode created with h()',
		actual: ul([li('list 1'), li('list 2')]),
		expected: h('ul', {}, [h('li', {}, 'list 1'), h('li', {}, 'list 2')]),
	});
});
