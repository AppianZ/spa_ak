<template>
    <div id="agentAuth">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="/">首页</Breadcrumb-item>
                <Breadcrumb-item>代理商中心</Breadcrumb-item>
                <Breadcrumb-item href="/agent/agentlist">代理商管理</Breadcrumb-item>
                <Breadcrumb-item>填写代理商信息</Breadcrumb-item>
            </Breadcrumb>
        </div>

        <div class="header">
            <Steps :current="1">
                <Step title="填写代理商信息"></Step>
                <Step title="填写授权信息"></Step>
                <Step title="完成"></Step>
            </Steps>
        </div>

        <div class="section">
            <p class="title">授权基本信息</p>
            <Form ref="authInfo" :model="authInfo" :rules="authRule" :label-width="150">
                <Form-item label="代理商状态" prop="status">
                    <Radio-group v-model="authInfo.status">
                        <Radio label="enabled">启动</Radio>
                        <Radio label="disabled">停用</Radio>
                        <Radio label="canceled">注销</Radio>
                        <!--<Radio label="deleted">删除</Radio>-->
                    </Radio-group>
                </Form-item>
                <Form-item label="代理授权有效期">
                    <Row>
                        <Col span="8">
                            <Date-picker type="date" :value="authInfo.period.startDate" placeholder="选择授权开始日期" style="width: 200px" @on-change="dateChange"></Date-picker>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="8">
                            <Date-picker type="date" :value="authInfo.period.endDate" disabled placeholder="自动授权20年" style="width: 200px"></Date-picker>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="代理授权总数量">
                    <Row>
                        <Col span="3">
                            <b class="b">&nbsp;一级代理 :</b>
                        </Col>
                        <Col span="2">
                            <Input v-model="authInfo.level[0]" disabled></Input>
                        </Col>
                        <Col span="4">&nbsp;&nbsp;个
                            <Tooltip placement="top">
                                <div slot="content">
                                    <p>可开通应用平台授权数1000</p>
                                    <p>声连码授权组数1000</p>
                                    <p>声连码授权个数5000</p>
                                </div>
                                <Icon type="help-circled"></Icon>
                            </Tooltip>&nbsp;&nbsp;&nbsp;
                        </Col>

                        <Col span="3">
                            <b class="b">&nbsp;二级代理 :</b>
                        </Col>
                        <Col span="2">
                            <Input v-model="authInfo.level[1]" disabled></Input>
                        </Col>
                        <Col span="4">&nbsp;&nbsp;个
                            <Tooltip placement="top">
                                <div slot="content">
                                    <p>可开通应用平台授权数100</p>
                                    <p>声连码授权组数100</p>
                                    <p>声连码授权个数500</p>
                                </div>
                                <Icon type="help-circled"></Icon>
                            </Tooltip>&nbsp;&nbsp;&nbsp;
                        </Col>

                    </Row>
                </Form-item>
                <Form-item label="可开通应用平台授权数">
                    <Input v-model="authInfo.appPlatformNum" disabled></Input>
                </Form-item>
                <Form-item label="声连码授权组数">
                    <Input v-model="authInfo.authGroupNum" disabled></Input>
                </Form-item>
                <Form-item label="声连码授权个数">
                    <Input v-model="authInfo.authNum" disabled></Input>
                </Form-item>
                <br/>
                <Form-item label="免费赠送声连码个数" prop="freeNum">
                    <Input v-model="authInfo.freeNum"></Input>
                </Form-item>
            </Form>
        </div>

        <div class="section">
            <p class="title">授权合同信息</p>
            <Table border :columns="columns" :data="contractList" no-data-text="暂无数据"></Table>
            <div class="form-box">
                <Form ref="contractInfo" :model="contractInfo" :label-width="150">
                    <Form-item label="代理授权总数量">
                        <Row>
                            <Col span="3">
                                <b class="b">&nbsp;一级代理 :</b>
                            </Col>
                            <Col span="2">
                                <Input v-model="contractInfo.level[0]" @on-change=""></Input>
                            </Col>
                            <Col span="4">&nbsp;&nbsp;个
                                <Tooltip placement="top">
                                    <div slot="content">
                                        <p>可开通应用平台授权数1000</p>
                                        <p>声连码授权组数1000</p>
                                        <p>声连码授权个数5000</p>
                                    </div>
                                    <Icon type="help-circled"></Icon>
                                </Tooltip>&nbsp;&nbsp;&nbsp;
                            </Col>

                            <Col span="3">
                                <b class="b">&nbsp;二级代理 :</b>
                            </Col>
                            <Col span="2">
                             <Input v-model="contractInfo.level[1]" @on-change=""></Input>
                            </Col>
                            <Col span="4">&nbsp;&nbsp;个
                            <Tooltip placement="top">
                                <div slot="content">
                                    <p>可开通应用平台授权数100</p>
                                    <p>声连码授权组数100</p>
                                    <p>声连码授权个数500</p>
                                </div>
                                <Icon type="help-circled"></Icon>
                            </Tooltip>&nbsp;&nbsp;&nbsp;
                            </Col>

                        </Row>
                    </Form-item>
                    <Form-item label="授权金" prop="licenseFee">
                        <Input v-model="contractInfo.licenseFee" placeholder="填写合同上的授权金额"></Input>
                    </Form-item>
                    <Form-item label="合同号" prop="agentContract">
                        <Input v-model="contractInfo.agentContract" placeholder="填写合同号"></Input>
                    </Form-item>
                    <Form-item label="合同扫描件">
                        <Upload action="//jsonplaceholder.typicode.com/posts/" :on-success="uploadSuccess">
                            <Button type="ghost" icon="ios-cloud-upload-outline">上传合同文件</Button>
                        </Upload>
                    </Form-item>
                </Form>
            </div>
            <Button type="success" icon="plus-round" shape="circle" @click="saveLicense('contractInfo')">保存授权合同信息</Button>
        </div>

        <div class="section">
            <p class="title">代理商平台授权状态</p>
            <div class="form-item">
                <Form ref="platformInfo" :model="platformInfo" :rules="platformRule" :label-width="150">
                    <Form-item label="代理商平台授权状态" prop="status">
                        <Radio-group v-model="platformInfo.status">
                            <Radio label="enabled">启动</Radio>
                            <Radio label="disabled">停用</Radio>
                        </Radio-group>
                    </Form-item>
                </Form>
            </div>
        </div>

        <div class="section">
            <Row>
                <Col span="5" long><Button type="ghost" long @click="returnLast">上一步</Button></Col>
                <Col span="1">&nbsp;</Col>
                <Col span="18" long><Button type="primary" @click="handleSubmit('authInfo', 'platformInfo')" long>提交</Button></Col>
            </Row>
        </div>
    </div>
</template>

<style lang="scss">
    #agentAuth {
        min-width: 820px;
        .header {
            padding: 30px 30px 20px;
        }
        .section {
            padding: 0 20px 50px;
        }
        .title {
            color: #10a3ee;
            font-size: 1.45em;
            padding: 0 0 5px 10px;
            margin: 1.2em 0 .8em 0;
            border-bottom: 1px solid #f2f2f2;
        }
        .form-box {
            padding: 10px 0 0 0;
            margin: 20px 0;
            border-top: 1px solid #f2f2f2;
            border-bottom: 1px solid #f2f2f2;
        }
        .b {
            font-size: 16px;
            font-weight: 500;
        }
    }
</style>

<script>
    import { getAgentAllInfo, postAgentContract, deleteAgentContract, putAgentAuth } from './../../../config/apis/agent.api';

    export default{
        data() {
            return {
                per: 5, // 现在是每组5个
                perLevel: [1000, 100],
                authRule: {
                    status: [
                        { required: true, message: '请选择授权状态', trigger: 'change' },
                    ],
                    freeNum: [
                        { required: true, message: '请设置免费个数' },
                    ],
                },
                authInfo: {
                    status: '',
                    level: [0, 0],
                    period: {
                        startDate: '',
                        endDate: '',
                    },
                    appPlatformNum: 0,
                    authGroupNum: 0,
                    authNum: 0,
                    freeNum: 0,
                },
                contractRule: {
                    licenseFee: [
                        { required: true, message: '请填写授权金' },
                    ],
                    agentContract: [
                        { required: true, message: '请填写合同号' },
                    ],
                },
                contractInfo: {
                    level: [null, null],
                    licenseFee: '',
                    agentContract: '',
                    agentContractAttach: '',
                },
                platformRule: {
                    status: [
                        { required: true, message: '请选择状态', trigger: 'change' },
                    ],
                },
                platformInfo: {
                    status: '',
                },
                contractList: [/* {
                    id: '1111'
                    level: [2, 2],
                    licenseFee: 100,
                    agentContract: '111',
                    agentContractAttach: '',
                } */],
                columns: [{
                        title: '合同号',
                        key: 'agentContract',
                        render(row, column, index) {
                            return row.agentContract === '' ? '未填写' : row.agentContract;
                        },
                    }, {
                        title: '授权金额',
                        key: 'licenseFee',
                        render(row, column, index) {
                            return row.licenseFee === '' ? '未填写' : row.licenseFee;
                        },
                    }, {
                        title: '授权总数',
                        key: 'level',
                        render(row, column, index) {
                            return ` 一级代理 :【 ${row.level[0]} 个】<br/> 二级代理 :【 ${row.level[1]} 个】`;
                        },
                    }, {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render(row, column, index) {
                            return `<i-button type="error" size="small" @click="remove(1, ${index})">删除</i-button>`;
                    },
                }],
                isModify: -1,
            };
        },
        beforeRouteEnter(to, from, next) {
            getAgentAllInfo({
                id: to.query.agentId,
            }).then((ret) => {
                next(vm => {
                    vm.authInfo = Object.assign({}, vm.authInfo, ret);
                    vm.contractList = ret.agentContractList.map((item) => {
                        const transObj = {
                            id: item.contractId,
                            level: [item.num_sss, item.num_ss],
                            licenseFee: item.licenseFee,
                            agentContract: item.contractNo,
                            agentContractAttach: '', // 合同文件
                        };
                        return transObj;
                    });
                    vm.platformInfo.status = ret.agentPlatformStatus;
                    vm.summaryTotal();
                });
            });
        },
        computed: {
            routeLink() {
                return {
                    path: '/agent/agentdetail',
                    query: { agentId: this.$route.query.agentId },
                };
            },
        },
        methods: {
            dateChange(value) {
                this.authInfo.period.startDate = value;
                const stamp = new Date(this.authInfo.period.startDate).getFullYear() + 20;
                this.authInfo.period.endDate = isNaN(stamp) ? '' : stamp + this.authInfo.period.startDate.substr(4);
            },
            FormatTotalData() {
                const total = this.authInfo.level.map(
                        (value, index) => value * this.perLevel[index]).reduce(
                        (per, next) => per + next);
                this.authInfo.appPlatformNum = total;
                this.authInfo.authGroupNum = total;
                this.authInfo.authNum = total * this.per;
            },
            summaryTotal() {
                this.authInfo.level = [0, 0];
                this.contractList.map(item => {
                    item.level.map((el, idx) => {
                        this.authInfo.level[idx] += parseInt(el, 10);
                        return el;
                    });
                    return item;
                });
                this.FormatTotalData();
            },
            saveLicense(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (this.isModify !== -1) {
                            // 备用: 修改功能
                            this.contractInfo = Object.assign({}, this.contractInfo,
                                    this.contractList[this.isModify]);
                            this.contractInfo = Object.assign({}, this.contractInfo, {
                                level: [null, null],
                                licenseFee: '',
                                agentContract: '',
                                agentContractAttach: '',
                            });
                            this.summaryTotal();
                        } else {
                            postAgentContract(JSON.stringify({
                                agentId: this.$route.query.agentId,
                                num_sss: this.contractInfo.level[0],
                                num_ss: this.contractInfo.level[1],
                                licenseFee: this.contractInfo.licenseFee,
                                contractNo: this.contractInfo.agentContract,
                                agentContractAttach: '',
                            })).then((ret) => {
                                this.contractInfo.id = ret.id;
                                console.log(this.contractInfo);
                                this.contractList.push(this.contractInfo);
                                this.contractInfo = Object.assign({}, this.contractInfo, {
                                    level: [null, null],
                                    licenseFee: '',
                                    agentContract: '',
                                    agentContractAttach: '',
                                });
                                this.summaryTotal();
                            });
                        }
                        this.isModify = -1;
                    } else this.$Message.error('合同信息不完整!');
                });
            },
            uploadSuccess(res, file) {
                console.log(file);
            },
            modify(index) {
                // 备用:修改合同号
                this.isModify = index;
                this.contractInfo = this.contractList[index];
            },
            remove(type, index) {
                if (!confirm(`确定删除id = ${this.contractList[index].id} 的合同?`)) return;
                deleteAgentContract(JSON.stringify({
                    id: this.contractList[index].id,
                })).then(() => {
                    this.contractList.splice(index, 1);
                    this.summaryTotal();
                });
                this.isModify = -1;
                this.contractInfo = Object.assign({}, this.contractInfo, {
                    level: [null, null],
                    licenseFee: '',
                    agentContract: '',
                    agentContractAttach: '',
                });
            },
            returnLast() {
                this.$router.push(this.routeLink);
            },
            handleSubmit(name1, name2) {
                this.$refs[name1].validate((valid) => {
                    if (valid) {
                        this.$refs[name2].validate((valid) => {
                            if (valid) {
                                // 发起请求
                                putAgentAuth(JSON.stringify({
                                    id: this.$route.query.agentId,
                                    status: this.authInfo.status,
                                    period: {
                                        startDate: new Date(this.authInfo.period.startDate).getTime(),
                                        endDate: new Date(this.authInfo.period.endDate).getTime(),
                                    },
                                    appPlatformNum: this.authInfo.appPlatformNum,
                                    authGroupNum: this.authInfo.authGroupNum,
                                    authNum: this.authInfo.authNum,
                                    freeNum: this.authInfo.freeNum,
                                    agentPlatformStatus: this.platformInfo.status,
                                })).then(() => {
                                    this.$Message.success('提交成功!');
                                    this.$router.push('/agent/agentdetail/success');
                                });
                            } else {
                                this.$Message.error('请选择平台授权状态!');
                            }
                        });
                    } else {
                        this.$Message.error('代理商授权信息不完整!');
                    }
                });
            },
        },
    };
</script>
