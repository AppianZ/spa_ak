<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
    }
    .layout-content{
        min-height: 550px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 15px 0;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #fff;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
</style>
<template>
    <div class="layout">
        <Row type="flex">
            <i-col span="5" class="layout-menu-left">
                <Menu width="auto" :open-names="['0']">
                    <Submenu :name="index" :key="'submenu-' + index" v-for="(nav,index) in navList">
                        <template slot="title">
                            <Icon type="android-contacts"></Icon>
                            {{nav.first}}
                        </template>
                        <Menu-item :name="index + '-' + idx" :key="'menuitem-' + index" v-for="(el,idx) in nav.second">
                            <router-link :to="el.to"
                                        :key="el.to.path"
                                        tag="div">
                                <i v-text="el.text"></i>
                            </router-link>
                        </Menu-item>
                    </Submenu>
                </Menu>
            </i-col>
            <i-col span="19">
                <div class="layout-content">
                    <router-view></router-view>
                </div>
                <div class="layout-copy">
                    2016-2017 &copy; SoundBus
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                navList: [{
                    first: '代理商中心',
                    second: [{
                        to: {
                            path: '/agent/agentlist',
                            query: { page: 1 },
                        },
                        text: '代理商管理',
                    }, {
                        to: {
                            path: '/egent/salelist',
                        },
                        text: '代理商销售情况',
                    }],
                }],
            };
        },
    };
</script>
