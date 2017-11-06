/**
 * Created by appian on 17/3/6.
 */

const Bar = r => require.ensure([], () => r(require('./../../pages/user/test1/Bar.vue')), '/bar');
const Baz = r => require.ensure([], () => r(require('./../../pages/user/test1/Baz.vue')), '/bar');


const Foo1 = { template: '<div>foo</div>' };
const Foo2 = {
	template: `
    <div>
      bar
      <div style="height:800px; background-color: red"></div>
      <p id="anchor">Anchor</p>
    </div>
  `,
};


const USERMAP = [{
	path: '/bar',
	component: Bar,
	children: [{
		path: 'baz',
		component: Baz,
	}],
	meta: { scrollToTop: true },
}, {
	path: '/user/userlist',
	name: 'userlist',
	component(resoleve) {
	},
	meta: { scrollToTop: true },
}, {
	path: '/foo1',
	component: Foo1,
	meta: { scrollToTop: true },
}, {
	path: '/foo2',
	component: Foo2,
	meta: { scrollToTop: true },
}];

const USERNAV = {
	first: '用户管理',
	icon: '&#xe603;',
	second: [{
		name: '嵌套路由',
		link: {
			path: '/bar/baz',
			query: {
				plan: 'private',
			},
		},
	}, {
		name: '用户列表',
		link: {
			name: 'userlist',
		},
	}, {
		name: '/foo1',
		link: {
			path: '/foo1',
		},
	}, {
		name: '/foo2',
		link: {
			path: '/foo2',
		},
	}],
};

export default {
	usermap: USERMAP,
	usernav: USERNAV,
};
