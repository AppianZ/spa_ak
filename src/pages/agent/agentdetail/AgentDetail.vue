<template>
    <div id="agentDetail">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="/">首页</Breadcrumb-item>
                <Breadcrumb-item>代理商中心</Breadcrumb-item>
                <Breadcrumb-item href="/agent/agentlist">代理商管理</Breadcrumb-item>
                <Breadcrumb-item>填写代理商信息</Breadcrumb-item>
            </Breadcrumb>
        </div>

        <div class="header">
            <Steps :current="0">
                <Step title="填写代理商信息"></Step>
                <Step title="填写授权信息"></Step>
                <Step title="完成"></Step>
            </Steps>
        </div>

        <div class="section">
            <p class="title">代理商基本信息</p>
            <Form ref="agentInfo" :model="agentInfo" :rules="agentRule" :label-width="150">
                <Form-item label="代理商账号" prop="account">
                    <Input v-model="agentInfo.account" placeholder="输入有效的邮箱或手机号码"></Input>
                </Form-item>
                <Form-item label="代理商名称" prop="nickname">
                    <Input v-model="agentInfo.nickname" placeholder="用于显示的简短称呼"></Input>
                </Form-item>
                <Form-item label="代理商全称" prop="name">
                    <Input v-model="agentInfo.name" placeholder="与营业执照企业名称相同"></Input>
                </Form-item>
                <Form-item label="营业执照注册号" prop="businessLicense">
                    <Input v-model="agentInfo.businessLicense" placeholder="与营业执照注册号相同"></Input>
                </Form-item>
                <Form-item label="营业执照照片" prop="businessLicense">
                    <Picupload @on-success="uploadLicenseSuccess"
                                :parent-message="agentInfo.businessLicensePhoto"></Picupload>
                </Form-item>
                <Form-item label="经营年限" prop="operateTime">
                    <Input v-model="agentInfo.operateTime" placeholder="代理商的经营年限"></Input>
                </Form-item>
                <Form-item label="企业规模" prop="scale">
                    <Input v-model="agentInfo.scale" placeholder="代理商的企业规模"></Input>
                </Form-item>
                <Form-item label="所属行业" prop="trade">
                    <Select v-model="agentInfo.trade" placeholder="请选择所属行业">
                        <Option :value="item" v-for="item in tradeArr" v-text="item" :key="item"></Option>
                    </Select>
                </Form-item>
                <Form-item label="所在地区">
                    <Cascader v-model="agentInfo.city" :data="cityArr" change-on-select @on-change="cityChange"></Cascader>
                </Form-item>
                <Form-item label="法人身份证号" prop="legalPersonIdcard">
                    <Input v-model="agentInfo.legalPersonIdcard" placeholder="请填入有效身份证号"></Input>
                </Form-item>
                <Form-item label="身份证正面">
                    <Picupload @on-success="uploadFrontSuccess"
                               :parent-message="agentInfo.idcardPhoto.frontSide"></Picupload>
                </Form-item>
                <Form-item label="身份证反面">
                    <Picupload @on-success="uploadBackSuccess"
                               :parent-message="agentInfo.idcardPhoto.reverseSide"></Picupload>
                </Form-item>
                <Form-item label="代理商邮箱" prop="email">
                    <Input v-model="agentInfo.email" placeholder="请输入邮箱"></Input>
                </Form-item>
                <Form-item label="固定联系电话">
                    <Row>
                        <Col span="5">
                            <Input v-model="agentInfo.areaCode" placeholder="区号"></Input>
                        </Col>
                        <Col span="1" style="text-align: center">-</Col>
                        <Col span="11">
                            <Input v-model="agentInfo.phone" placeholder="固定电话"></Input>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="代理商手机号" prop="mobile">
                    <Input v-model="agentInfo.mobile" placeholder="请填写有效的国内手机号"></Input>
                </Form-item>
            </Form>
        </div>

        <div class="section">
            <p class="title">联系人信息</p>
            <Form ref="relationInfo" :model="relationInfo" :rules="relationRule" :label-width="150">
                <Form-item label="联系人姓名" prop="relationName">
                    <Input v-model="relationInfo.relationName"></Input>
                </Form-item>
                <Form-item label="联系人手机号" prop="relationMobile">
                    <Input v-model="relationInfo.relationMobile"></Input>
                </Form-item>
                <Form-item label="联系人邮箱" prop="relationEmail">
                    <Input v-model="relationInfo.relationEmail"></Input>
                </Form-item>
            </Form>
        </div>

        <div class="section">
            <Button type="primary" @click="handleSubmit('agentInfo', 'relationInfo')" long>下一步继续填写授权信息</Button>
        </div>
    </div>
</template>

<style lang="scss">
    #agentDetail {
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
        .img {
            width: 300px;
            height: 300px;
        }
    }
</style>

<script>
    import { addAgentInfo, putAgentInfo, getAgentAllInfo } from './../../../config/apis/agent.api';
    import $city from './city';
    import Picupload from './../../../components/Picupload.vue';

    export default {
        data() {
            return {
                agentRule: {
                    account: [
                        { required: true, message: '邮箱或手机号不能为空', trigger: 'blur' },
                        { max: 50, message: '邮箱或手机号码的长度最长为50', trigger: 'blur' },
                    ],
                    nickname: [
                        { required: true, message: '代理商名称不能为空', trigger: 'blur' },
                        { max: 128, message: '代理商名称最长为128个字符', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '代理商全称不能为空', trigger: 'blur' },
                        { max: 128, message: '代理商全称最长为128个字符', trigger: 'blur' },
                    ],
                    businessLicense: [
                        { required: true, message: '营业执照注册号不能为空', trigger: 'blur' },
                        { max: 64, message: '营业执照注册号最长为64个字符', trigger: 'blur' },
                    ],
                    operateTime: [
                        { required: true, message: '经营年限不能为空', trigger: 'blur' },
                        { max: 16, message: '经营年限最长为16个字符', trigger: 'blur' },
                    ],
                    scale: [
                        { required: true, message: '企业规模不能为空', trigger: 'blur' },
                        { max: 16, message: '企业规模最长为16个字符', trigger: 'blur' },
                    ],
                    trade: [{ required: true, message: '请选择所属行业', trigger: 'change' }],
                    legalPersonIdcard: [
                        { required: true, message: '请输入法人身份证号', trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: '请输入代理商邮箱', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
                        { max: 50, message: '邮箱最长为50个字符', trigger: 'blur' },
                    ],
                    mobile: [
                        { message: '请输入正确的手机号', trigger: 'blur', pattern: /^((13[0-9])|(15[^4])|(18[0,1,2,3,5-9])|(17[0-8])|(147)|(149))\d{8}$/ },
                    ],
                },
                agentInfo: {
                    id: '', // id
                    nickname: '', // 代理商短称
                    account: '', // 账号
                    name: '', // 代理商工商证明全称
                    businessLicense: '', // 营业执照注册号
                    businessLicensePhoto: '', // 营业执照图片
                    operateTime: '',
                    scale: '',
                    trade: '',
                    city: [''],
                    cityAddress: '',
                    legalPersonIdcard: '',
                    idcardPhoto: {
                        frontSide: '',
                        reverseSide: '',
                    },
                    email: '',
                    areaCode: '',
                    phone: '',
                    mobile: '',
                },
                relationRule: {
                    relationName: [
                        { required: true, message: '联系人不能为空', trigger: 'blur' },
                        { max: 64, message: '联系人最长为64个字符', trigger: 'blur' },
                    ],
                    relationMobile: [{ required: true,
                            message: '请输入正确的手机号',
                            trigger: 'blur',
                            pattern: /^((13[0-9])|(15[^4])|(18[0,1,2,3,5-9])|(17[0-8])|(147)|(149))\d{8}$/,
                        },
                    ],
                    relationEmail: [
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
                        { max: 50, message: '邮箱最长为50个字符', trigger: 'blur' },
                    ],
                },
                relationInfo: {
                    relationName: '',
                    relationMobile: '',
                    relationEmail: '',
                },
                tradeArr: ['',
                    'IT互联网行业',
                    '制造行业',
                    '贸易物流',
                    '建筑房地产',
                    '金融',
                    '服务业',
                    '政府事业单位',
                    '教育',
                    '文化传媒',
                    '企业服务',
                    '医疗',
                    '其他'],
            };
        },
        beforeRouteEnter(to, from, next) {
            console.log(to.query.agentId);
            if (parseInt(to.query.agentId, 10) !== -1) {
                getAgentAllInfo({
                    id: to.query.agentId,
                }).then((ret) => {
                   next(vm => {
                       vm.agentInfo = Object.assign(vm.agentInfo, ret);
                       vm.relationInfo = Object.assign(vm.relationInfo, ret);
                       vm.agentInfo.city = ret.cityAddress.split('-');
                   });
                });
            } else {
                next(vm => {
                    vm.relationInfo = Object.assign({}, vm.relationInfo, {
                        relationName: '',
                        relationMobile: '',
                        relationEmail: '',
                    });
                    vm.agentInfo = Object.assign({}, vm.agentInfo, {
                        id: '', // id
                        nickname: '', // 代理商短称
                        account: '', // 账号
                        name: '', // 代理商工商证明全称
                        businessLicense: '', // 营业执照注册号
                        businessLicensePhoto: '', // 营业执照图片
                        operateTime: '',
                        scale: '',
                        trade: '',
                        city: [''],
                        cityAddress: '',
                        legalPersonIdcard: '',
                        idcardPhoto: {
                            frontSide: '',
                            reverseSide: '',
                        },
                        email: '',
                        areaCode: '',
                        phone: '',
                        mobile: '',
                    });
                });
            }
        },
        methods: {
            handleSubmit(name1, name2) {
                this.$refs[name1].validate((valid) => {
                    if (valid) {
                        this.$refs[name2].validate((valid) => {
                            if (valid) {
                                // 发起请求
								const putData = {
									...this.agentInfo,
								};
								putData.relationName = this.relationInfo.relationName;
								putData.relationMobile = this.relationInfo.relationMobile;
								putData.relationEmail = this.relationInfo.relationEmail;
								putData.cityAddress = this.agentInfo.cityAddress;
                                if (parseInt(this.$route.query.agentId, 10) === -1) {
                                    addAgentInfo(JSON.stringify(putData)).then(ret => {
                                        this.$Message.success(`新增${ret.id}成功!`);
                                        this.$router.push(`/agent/agentdetail/auth?agentId=${ret.id}`);
                                    });
                                } else {
									const putData = {
										...this.agentInfo,
									};
									putData.relationName = this.relationInfo.relationName;
									putData.relationMobile = this.relationInfo.relationMobile;
									putData.relationEmail = this.relationInfo.relationEmail;
									putData.cityAddress = this.agentInfo.cityAddress;
                                    putAgentInfo(JSON.stringify(putData)).then(ret => {
                                        this.$Message.success(`修改${ret.id}成功!`);
                                        this.$router.push(`/agent/agentdetail/auth?agentId=${ret.id}`);
                                    });
                                }
                            } else {
                                this.$Message.error('代理商联系人信息不完整!');
                            }
                        });
                    } else {
                        this.$Message.error('代理商基本信息不完整!');
                    }
                });
            },
            cityChange(value, data) {
                this.agentInfo.cityAddress = value.join('-');
                this.agentInfo.city = value;
            },
            uploadLicenseSuccess(response) {
                this.agentInfo.businessLicensePhoto = response;
            },
            uploadFrontSuccess(response) {
                this.agentInfo.idcardPhoto.frontSide = response;
            },
            uploadBackSuccess(response) {
                this.agentInfo.idcardPhoto.reverseSide = response;
            },
        },
        computed: {
            routeLink() {
              return {
                  path: '/agent/agentdetail/auth',
                  query: { agentId: this.$route.query.agentId },
              };
            },
            cityArr() {
                $city.map(item => {
                    item.value = item.label;
                    if (item.children && item.children.length > 0) {
                        item.children.map(child => {
                            child.value = child.label;
                            if (child.children && child.children.length > 0) {
                                child.children.map(grandchild => {
                                    grandchild.value = grandchild.label;
                                    return grandchild;
                                });
                            }
                            return child;
                        });
                    }
                    return item;
                });
                return $city;
            },
        },
        components: {
            Picupload,
        },
    };
</script>
