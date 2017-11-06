/**
 * Created by appian on 2017/5/9.
 */
var express = require('express');
var router = express.Router();

// {get} /agent 获取代理商列表
router.get('/agent', function(req, res, next) {
	res.json(require('./../model/agent/agentlist'));
});

// {delete} /agent/{agentId} 删除用户的id
router.delete('/agent/:agentId', function(req, res, next) {
	var id = req.params.agentId;
	res.json({
		msg : 'delete ok',
		agentId: id,
	})
});

// {post} /agent/info 新增用户基本信息 AgentDetail.vue
router.post('/agent/info', function(req, res, next) {
	res.json({
		mag : 'post info ok',
		id: '123456789'
	})
});

// {get} /agent/{agentId} 用户详情-获取 AgentDetail.vue + AgentAuth.vue
router.get('/agent/:agentId', function(req, res, next) {
	res.json(require('./../model/agent/agentdetail'));
});

// {put} /agent/info/{agentId} 用户基本信息-修改 AgentDetail.vue
router.put('/agent/info/:agentId', function(req, res, next) {
	var id = req.params.agentId;
	res.json({
		msg : 'test info ok',
		id,
	})
});

// {put} /agent/auth/{agentId} 用户授权信息-修改 AgentAuth.vue
router.put('/agent/auth/:agentId', function(req, res, next) {
	var id = req.params.agentId;
	res.json({
		msg : 'test auth ok',
		id,
	})
});

// {post} /agent/contract 新增合同 AgentAuth.vue
router.post('/agent/contract', function(req, res, next) {
	res.json({
		mag : 'post contract ok',
		id: '123456789'
	})
});

// {delete} /agent/contract/{id} 删除某个合同 AgentAuth.vue
router.delete('/agent/contract/:id', function(req, res, next) {
	var id = req.params.id;
	res.json({
		msg : 'delete contract ok',
		id,
	})
});

module.exports = function (app) {
	app.use('/manage/api/agent/manage',router);
};