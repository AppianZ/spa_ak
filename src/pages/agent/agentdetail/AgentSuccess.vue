<template>
    <div id="agentSuccess">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="/">首页</Breadcrumb-item>
                <Breadcrumb-item>代理商中心</Breadcrumb-item>
                <Breadcrumb-item href="/agent/agentlist">代理商管理</Breadcrumb-item>
                <Breadcrumb-item>填写代理商信息</Breadcrumb-item>
            </Breadcrumb>
        </div>

        <div class="header">
            <Steps :current="2">
                <Step title="填写代理商信息"></Step>
                <Step title="填写授权信息"></Step>
                <Step title="完成"></Step>
            </Steps>
        </div>

        <article>
            <div class="icon">
                <Icon type="checkmark-round" size="52" color="#fff"></Icon>
            </div>
            <div class="btn">
                <span v-text="time"> </span> s 后返回 <b @click="pushRoute"> 代理商列表 </b>
            </div>
        </article>
    </div>
</template>

<style lang="scss">
    #agentSuccess {
        .header {
            padding: 30px 30px 20px;
        }
        .icon {
            margin: 50px auto 30px auto;
            text-align: center;
            background: #48CB64;
            height: 100px;
            width: 100px;
            line-height: 130px;
            border-radius: 50%;
        }
        .btn {
            text-align: center;
            font-size: 14px;
            span {
                display: inline-block;
                color: #48CB64;
                padding: 0 0 5px 0;
            }
            b {
                display: inline-block;
                color: #4F9CFF;
                border-bottom: 1px dotted #4F9CFF;
            }
        }
    }
</style>


<script>
    export default{
        data() {
            return {
                time: 5,
                timer: null,
            };
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.timer = setInterval(() => {
                    if (vm.time === 0) {
                        clearInterval(vm.timer);
                    } else {
                        vm.time -= 1;
                    }
                }, 1000);
            });
        },
        beforeRouteLeave(to, from, next) {
            this.time = 0;
            clearInterval(this.timer);
            next();
        },
        watch: {
            time(value) {
              if (value <= 0) {
                  this.pushRoute();
              }
            },
        },
        methods: {
            pushRoute() {
                this.$router.push('/agent/agentlist?page=1');
            },
        },
    };
</script>
