const AGENT = [{
	path: '/agent/agentlist',
	name: 'agentlist',
	component(resolve) {
		require(['../../pages/agent/agentlist/AgentList.vue'], resolve);
	},
	meta: { scrollToTop: true },
}, {
	path: '/agent/agentdetail',
	name: 'agentdetail',
	component(resolve) {
		require(['../../pages/agent/agentdetail/AgentDetail.vue'], resolve);
	},
	meta: { scrollToTop: true },
}, {
	path: '/agent/agentdetail/auth',
	name: 'agentauth',
	component(resolve) {
		require(['../../pages/agent/agentdetail/AgentAuth.vue'], resolve);
	},
	meta: { scrollToTop: true },
}, {
	path: '/agent/agentdetail/success',
	name: 'agentsuccess',
	component(resolve) {
		require(['../../pages/agent/agentdetail/AgentSuccess.vue'], resolve);
	},
}];

module.exports = AGENT;
