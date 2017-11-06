<template>
	<div>
		<div class="layout-breadcrumb">
			<Breadcrumb>
				<Breadcrumb-item href="/">首页</Breadcrumb-item>
				<Breadcrumb-item>代理商中心</Breadcrumb-item>
				<Breadcrumb-item>代理商管理</Breadcrumb-item>
			</Breadcrumb>
		</div>
		<router-link :to="{path: '/agent/agentdetail', query: { agentId: -1 }}"
					 key="increase"
					 tag="header">
			<Button type="primary">新增代理商</Button>
		</router-link>
		<div class="input-block">
			<b>代理商名称</b>
			<b>代理商授权级别</b>
			<b>代理商状态</b>
			<br/>
			<div>
				<Input v-model="keyword" placeholder="请输入关键字..."></Input>
			</div>
			<div>
				<Select v-model="selectLevel">
					<Option v-for="item in levelList" :value="item.value" :key="item">{{item.level}}</Option>
				</Select>
			</div>
			<div>
				<Select v-model="selectStatus">
					<Option v-for="item in statusList" :value="item.value" :key="item">{{item.label}}</Option>
				</Select>
			</div>
			<span>
				<Button type="primary" shape="circle" icon="ios-search" @click="changePage(1)">筛选</Button>
			</span>
		</div>
		<div class="table-block">
			<Table :context="self" :data="list" :columns="columns" stripe border no-data-text="暂无数据"></Table>
		</div>
		<Modal
				v-model="showModel"
				title="用户详情预览">
			<div class="model-item">
				<b>用户id: </b><p v-text="currentItem.id"></p>
			</div>
			<div class="model-item">
				<b>用户昵称: </b><p v-text="currentItem.name"></p>
			</div>
			<div class="model-item">
				<b>用户账号: </b><p v-text="currentItem.account"></p>
			</div>
		</Modal>
		<div class="page-block">
			<Page :total="totalElements" :current="page" @on-change="changePage"></Page>
		</div>
	</div>
</template>

<style lang="scss">
	header {
		padding: 20px 0 0 10px;
	}
	.input-block {
		b, div {
			display: inline-block;
			width: 200px;
			padding: 0 10px 10px 0;
			vertical-align: bottom;
		}
		span {
			display: inline-block;
			vertical-align: top;
			margin: 0 0 0 10px;
		}
	}

	.model-item {
		position: relative;
		background: #fff;
		font-size: 16px;
		b {
			display: inline-block;
			padding: 10px 10px 5px 10px;
			width: 120px;
			box-sizing: border-box;
			text-align: right;
			vertical-align: top;
			color: #444;
		}
		&:before {
			position: absolute;
			display: inline-block;
			content: '';
			width: 480px;
			height: 1px;
			bottom: 0;
			left: 0;
			background: #f6f6f6;
		}
		&:last-child:before {
			display: none!important;
		}
		p {
			display: inline-block;
			width: 350px;
			text-align: left;
			padding: 10px 5px 10px 0;
			line-height: 1.5;
			color: #888;
		}
	}
</style>

<script>
	import { initAgentList, deleteAgent } from './../../../config/apis/agent.api';

	export default {
		data() {
			return {
				self: this,
				list: [],
				page: 1,
				totalElements: 0,
				keyword: '',
				showModel: false,
				selectLevel: '',
				levelList: [{
					value: '',
					level: '所有等级',
				}, {
					value: '3S',
					level: '一级代理',
				}, {
					value: '2S',
					level: '二级代理',
				}],
				selectStatus: '',
				statusList: [{
					value: '',
					label: '所有状态',
				}, {
					value: 'enabled',
					label: '已启动',
				}, {
					value: 'disabled',
					label: '已停用',
				}, {
					value: 'canceled',
					label: '已注销',
				}, {
					value: 'deleted',
					label: '已删除',
				}],
				currentItem: {},
				columns: [
					{
						title: '代理商名称',
						key: 'name',
						align: 'center',
						render(row, column, index) {
							return `<strong>${row.name}</strong>`;
						},
					}, {
						title: '代理商账号',
						key: 'account',
						align: 'center',
					}, {
						title: '授权级别',
						key: 'agentLevel',
						align: 'center',
						render(row) {
							return row.agentLevel === '3S' ? '一级代理' : '二级代理';
						},
					}, {
						title: '状态',
						key: 'status',
						align: 'center',
						render(row, column, index) {
							const statusMapList = {
								enabled: '启动',
								disabled: '停用',
								canceled: '注销',
								deleted: '删除',
							};
							return statusMapList[row.status];
						},
					}, {
						title: '管理',
						key: 'action',
						width: 150,
						align: 'center',
						render(row, column, index) {
							return `<i-button type="primary" size="small" @click="edit('${row.id}')">编辑</i-button>`;
						},
					},
				],
			};
		},
		mounted() {
			initAgentList({
				page: 0,
				limit: 10,
			}).then(ret => {
				this.list = ret._embedded ? ret._embedded.agentDtoList : [];
				this.totalElements = ret.page.totalElements;
				this.page = parseInt(ret.page.number + 1, 10);
			});
		},
		methods: {
			show(index) {
				this.showModel = true;
				this.currentItem = this.list[index];
			},
			edit(id) {
				this.$router.push(`/agent/agentdetail?agentId=${id}`);
			},
			remove(type, id, index) {
				if (!confirm('确定要停用该用户吗?')) return;
				deleteAgent({
					id,
				}).then(() => {
					this.list.splice(index, 1);
				});
			},
			changePage(current) {
				initAgentList({
					page: current - 1,
					limit: 10,
					name: this.keyword,
					agentLevel: this.selectLevel,
					status: this.selectStatus,
				}).then(ret => {
					this.list = ret._embedded ? ret._embedded.agentDtoList : [];
					this.totalElements = ret.page.totalElements;
					this.page = parseInt(ret.page.number + 1, 10);
				});
			},
		},
	};
</script>
