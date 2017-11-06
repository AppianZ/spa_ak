import COMMON from './config/routes/common';
// import USER from './config/routes/user';
import AGENT from './config/routes/agent';

const routes = COMMON.concat(
	// USER.usermap,
	AGENT,
	{
		path: '*',
		component: { template: '<div>nothing</div>' },
	},
);

export default routes;
