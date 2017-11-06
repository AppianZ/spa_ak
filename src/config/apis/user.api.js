import { ajaxGet } from './../../assets/js/tools';

/**
 * @api {get} /user/userlist 用户列表
 * @apiName 用户列表初始化
 * @apiDescription 页面 : /user/userlist
 */

export function initUserlist() {
	return ajaxGet('');
}

export function addUser() {
	return ajaxGet('');
}
