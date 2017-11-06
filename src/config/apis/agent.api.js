/**
 * Created by appian on 2017/5/9.
 */
import { ajaxGet, ajaxPost, ajaxDelete, ajaxPut } from './../../assets/js/tools';

/**
 * @api {get} /agent/agentlist 用户列表页
 * @apiName 用户列表初始化 -- 获取代理商列表 (完成)
 * @apiDescription 页面 : /agent/agentlist
 */
export function initAgentList(data) {
	return ajaxGet('/manage/api/agent/manage/agent', data);
}

/**
 * @api {delete} /agent/agentlist 用户列表页
 * @apiName 删除代理商 (完成)
 * @apiDescription 页面 : /agent/agentlist
 */
export function deleteAgent(data) {
	return ajaxDelete(`/manage/api/agent/manage/agent/${data.id}`, {}, 'application/json');
}

/**
 * @api {post} /agent/agentdetail 用户详情-新增
 * @apiName 添加新的代理商第一步 -- 添加代理商基本信息
 * @apiDescription 页面 : /agent/AgentDetail.vue
 */
export function addAgentInfo(data) {
	return ajaxPost('/manage/api/agent/manage/agent/info', data, 'application/json');
}

/**
 * @api {get} /agent/agentdetail 用户详情-获取
 * @apiName 获取代理商基本信息
 * @apiDescription 页面 : /agent/AgentDetail.vue + AgentAuth.vue
 */
export function getAgentAllInfo(data) {
	return ajaxGet(`/manage/api/agent/manage/agent/${data.id}`);
}

/**
 * @api {put} /agent/agentdetail 用户基本信息-修改
 * @apiName 修改代理商第一步 -- 修改代理商基本信息, 原为_id
 * @apiDescription 页面 : /agent/AgentDetail.vue
 */
export function putAgentInfo(data) {
	return ajaxPut(`/manage/api/agent/manage/agent/info/${JSON.parse(data).id}`, data, 'application/json');
}
  
/**
 * @api {put} /agent/agentdetail 用户授权信息-修改
 * @apiName 修改代理商第二步 -- 修改代理商授权信息
 * @apiDescription 页面 : /agent/AgentAuth.vue
 */
export function putAgentAuth(data) {
	return ajaxPut(`/manage/api/agent/manage/agent/auth/${JSON.parse(data).id}`, data, 'application/json');
}

/**
 * @api {post} /agent/agentdetail 添加代理商合同
 * @apiName 添加代理商合同
 * @apiDescription 页面 : /agent/AgentAuth.vue
 */
export function postAgentContract(data) {
	return ajaxPost('/manage/api/agent/manage/agent/contract', data, 'application/json');
}

/**
 * @api {delete} /agent/agentdetail 删除代理商合同
 * @apiName 删除代理商合同
 * @apiDescription 页面 : /agent/AgentAuth.vue
 */
export function deleteAgentContract(data) {
	return ajaxDelete(`/manage/api/agent/manage/agent/contract/${JSON.parse(data).id}`, {}, 'application/json');
}
