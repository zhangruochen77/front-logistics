<template>
    <div>
        <!-- 头部信息栏位 -->
        <div class="header">
            <div class="header-class">
                <div v-if="isLogin">
                    <div class="user-header-class">
                        <div class="demo-basic--circle">
                            <div class="block">
                                <el-dropdown trigger="click" @command="handleCommand">
                                    <el-avatar :size="60" :src="user.img">
                                    </el-avatar>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="upInfo">更改信息</el-dropdown-item>
                                        <el-dropdown-item command="upPass">更改密码</el-dropdown-item>
                                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!isLogin" class="login-class" @click="showLoginPage">登录</div>
                <div v-if="!isLogin" class="registry-class" @click="showRegistryPage">免费注册</div>
                <div class="car-class">购物车</div>
                <div class="contact-class">联系客服</div>
                <div class="order-class" @click="showUserOrder">查看订单</div>
            </div>

            <div>
                <!-- 登录部分 -->
                <template>
                    <el-dialog width="30%" :visible.sync="loginVisible">
                        <span>
                            <div v-if="!isPhone">
                                <el-form :model="passLogin" status-icon ref="passLogin" label-width="100px"
                                         class="demo-ruleForm">
                                    <el-form-item label="用户名">
                                        <el-input style="width: 80%" type="text" v-model="passLogin.username"
                                                  autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="密码">
                                        <el-input style="width: 80%" type="password" v-model="passLogin.password"
                                                  autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="info" @click="switchToPhone">手机登录</el-button>
                                        <el-button type="primary" @click="loginByPass">登录</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div v-if="isPhone">
                                <el-form :model="phoneLogin" status-icon ref="phoneLogin" label-width="100px"
                                         class="demo-ruleForm">
                                    <el-form-item label="手机号码">
                                        <el-input style="width: 80%" type="text" v-model="phoneLogin.phone"
                                                  autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="验证码">
                                        <el-input style="width: 50%" type="text" v-model="phoneLogin.code"
                                                  autocomplete="off"></el-input>
                                        <el-button style="width: 30%" type="success"
                                                   @click="loginToGetCode">获取</el-button>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="info" @click="switchToPass">密码登录</el-button>
                                        <el-button type="primary" @click="loginByPhone">登录</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </span>
                    </el-dialog>
                </template>

                <!-- 注册部分 -->
                <template>
                    <el-dialog width="30%" :visible.sync="registryVisible">
                        <span>
                            <el-form :model="passLogin" status-icon ref="passLogin" label-width="100px"
                                     class="demo-ruleForm">
                                <el-form-item label="用户名">
                                    <el-input style="width: 80%" type="text" v-model="registryParams.username"
                                              autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码">
                                    <el-input style="width: 80%" type="text" v-model="registryParams.phone"
                                              autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="密码">
                                    <el-input style="width: 80%" type="password" v-model="registryParams.password"
                                              autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码">
                                    <el-input style="width: 80%" type="password"
                                              v-model="registryParams.checkPassword"
                                              autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="验证码">
                                    <el-input style="width: 55%" type="text" v-model="registryParams.code"
                                              autocomplete="off"></el-input>
                                    <el-button style="width: 25%;" type="success" plain
                                               @click="registryToGetCode">获取</el-button>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" plain @click="doRegistry">注册</el-button>
                                    <el-button type="info" plain>去登录</el-button>
                                </el-form-item>
                            </el-form>
                        </span>
                    </el-dialog>
                </template>
            </div>
        </div>

        <!-- 身体部分 -->
        <div class="body">
            <div class="body-goods">
                <div class="search-class">
                    <el-form v-model="goodsParams">
                        <!-- 输入框输入查找 -->
                        <div class="search-input-class">
                            <el-input style="width: 90%" v-model="goodsParams.name" placeholder="请输入想要查找的商品"/>
                            <el-button style="width: 10%" plain icon="el-icon-search" @click="searchGoods">
                            </el-button>
                        </div>

                        <!-- 分页操作 -->
                        <div class="search-page-class">
                            <el-row :gutter="24">
                                <el-col :span="10">
                                    <el-form-item label="价格区间">
                                        <el-input class="price-class" v-model="goodsParams.priceStart"
                                                  size="medium" placeholder="起始区间"/>
                                        <el-input class="price-class" v-model="goodsParams.priceEnd"
                                                  size="medium" placeholder="结束区间"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="14">
                                    <el-form-item>
                                        <el-pagination
                                                :page-sizes="[10, 20, 30, 40]"
                                                :page-size="limit"
                                                layout="total, sizes, prev, pager, next, jumper"
                                                :total="total">
                                        </el-pagination>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </el-form>
                </div>

                <!-- 商品展示页面 -->
                <div class="goods-class">
                    <div class="goods-info" v-for="(goods, idx) in goodsList" :key="goods.id"
                         @click="goodsDetailsShow(goods.id)">
                        <div class="goods-info-class">
                            <img :src="goods.img" width="200px" height="200px">
                            <div class="goods-description">
                                {{goods.description}}
                            </div>
                            <div class="goods-price">
                                ￥ {{goods.price}}
                            </div>
                            <div class="goods-name">
                                {{goods.name}}
                            </div>
                            <div class="line-class"></div>
                            <div class="goods-sold">
                                <div>累计销售 {{goods.sold}}+</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 订单详细界面 -->
            <div>
                <el-drawer
                        :title="goodsDetails.name"
                        :visible.sync="goodsDetailsVisible"
                        :direction="direction"
                        size="80%">
                    <span>
                        <div class="goods-details">
                            <div class="goods-details-info">
                                <div class="goods-details-left">
                                    <div class="goods-details-img">
                                        <img style="height: 100%; width: 100%" :src="goodsDetails.img">
                                    </div>
                                    <div class="goods-details-description">
                                        {{goodsDetails.description}}
                                    </div>
                                    <div class="goods-details-price-sold">
                                        <span class="goods-details-price">
                                            ￥{{goodsDetails.price}}
                                        </span>
                                        <span class="goods-details-sold">
                                            当前存货 {{goodsDetails.number}} +
                                        </span>
                                    </div>
                                    <div class="goods-details-option">
                                        <div>
                                            <el-button type="primary" plain
                                                       icon="el-icon-shopping-cart-full"
                                                       @click="showOrderVisible">下单</el-button>
                                        </div>
                                        <div>
                                            <el-button type="primary" plain icon="el-icon-star-off">收藏</el-button>
                                        </div>
                                    </div>
                                </div>
                                <div class="goods-details-right">
                                    <div class="right-info">
                                        <div>
                                            发货地址: {{goodsDetails.address}}
                                        </div>
                                        <div v-for="(orderInfo, idx) in goodsDetails.orderInfos">
                                            {{orderInfo.username}} 在 {{orderInfo.time}} 时候 {{orderInfo.action}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </span>
                </el-drawer>
            </div>

            <!-- 用户下订单部分 -->
            <div>
                <el-dialog :visible.sync="orderVisible" width="30%">
                    <span>
                        <el-input v-model="orderNumber" placeholder="输入下单数量"></el-input>
                    </span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="orderVisible = false">取 消</el-button>
                        <el-button type="primary" @click="doOrder">确 定</el-button>
                    </span>
                </el-dialog>
            </div>

            <div>
                <el-drawer
                        :visible.sync="userOrderVisible"
                        :direction="directionOrder"
                        size="50%" center>
                    <span>
                        <div>
                            <div style="height: 40px;width: 200px; margin: 0 auto">
                                <el-button type="text" @click="sureOrderInfo()">待收货</el-button>
                                <el-button type="text" @click="historyOrder()">历史订单</el-button>
                            </div>

                            <!-- 当前正在执行的订单信息 -->
                            <div class="order-info" v-if="isOrderInfo">
                                <ul class="infinite-list" v-infinite-scroll="load" infinite-scroll-delay="500"
                                    style="overflow:hidden">
                                    <div>
                                        <div v-for="(item, idx) in orders" class="order-info-class">
                                            <div class="order-img">
                                                <img :src="item.img" style="height: 100%; width: 100%">
                                            </div>
                                            <div class="order-goods-name">{{item.goodsName}}</div>
                                            <div class="order-id">
                                                订单编号:{{item.id}}
                                            </div>
                                            <div class="order-state-info">
                                                {{item.time}} 时刻 {{item.info}}
                                            </div>
                                            <div class="order-sure">
                                                <el-button type="primary" plain>详情</el-button>
                                                <el-button v-if="item.state == 2" type="success" plain
                                                           @click="sureOrderArrive(item.id)">确定订单</el-button>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                            </div>

                            <!-- 订单历史 -->
                            <div class="order-history" v-if="!isOrderInfo" style="height: 400px">
                                <ul class="infinite-list" v-infinite-scroll="loadHistory" infinite-scroll-delay="500"
                                    style="overflow:hidden">
                                    <div>
                                        <div v-for="(item, idx) in orders" class="order-info-class">
                                            <div class="order-img">
                                                <img :src="item.img" style="height: 100%; width: 100%">
                                            </div>
                                            <div class="order-goods-name">{{item.goodsName}}</div>
                                            <div class="order-id">
                                                订单编号:{{item.id}}
                                            </div>
                                            <div class="order-state-info">
                                                {{item.time}} 时刻确认了订单签收
                                            </div>
                                            <div class="order-sure">
                                                <el-button type="primary" plain>详情</el-button>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </span>
                </el-drawer>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>

    import Footer from "@/views/Footer"
    import LoginApi from "@/api/Login"
    import GoodsApi from "@/api/Goods"
    import Api from '@/api/Api'
    import OrderApi from "@/api/Order"
    import OrderHistory from "@/api/OrderHistory"

    export default {
        name: "Home",
        components: {Footer},
        data() {
            return {
                direction: 'btt',
                directionOrder: 'ltr',  // 查看订单
                isLogin: false,
                isPhone: false,
                isOrderInfo: true,
                orderVisible: false,
                loginVisible: false,
                userOrderVisible: false,        // 用户订单查看界面
                registryVisible: false,
                goodsDetailsVisible: false,     // 商品详细信息展示
                page: 1,
                limit: 10,
                total: 0,
                priceStart: '',
                priceEnd: '',
                orderNumber: '',
                passLogin: {
                    username: '',
                    password: ''
                },
                phoneLogin: {
                    phone: '',
                    code: ''
                },
                registryParams: {
                    username: '',
                    password: '',
                    checkPassword: '',
                    phone: '',
                    code: ''
                },
                user: {
                    username: '',
                    nickName: '',
                    img: ''
                },
                goodsParams: {
                    name: '',
                    priceStart: null,
                    priceEnd: null
                },
                goodsDetails: {
                    id: '',
                    name: '',
                    sold: 0,
                    description: '',
                    img: '',
                    price: '',
                    address: '',
                    number: '',
                    orderInfos: []
                },
                goodsList: [],
                orders: [],
                orderPage: 1,
                orderLimit: 3,
            }
        },
        methods: {
            sureOrderInfo() {
                this.orders = []
                this.orderPage = 1
                this.orderLimit = 3
                this.isOrderInfo = true
                this.load()
            },
            historyOrder() {
                this.orders = []
                this.orderPage = 1
                this.orderLimit = 3
                this.isOrderInfo = false
                this.loadHistory()
            },
            sureOrderArrive(id) {   // 用户确认签收订单
                OrderApi.userSureOrder(id).then(resp => {
                    if (resp.data.code === 200) {
                        this.$message.success('订单已确认签收')
                        this.orders = []
                        this.orderPage = 1
                        this.orderLimit = 3
                        this.load()
                        return
                    }

                    this.$message.error(resp.data.msg)
                })
            },
            loadHistory() {
                if (this.orderLimit === 0) {
                    return
                }
                OrderHistory.pageFindHistoryOrder(this.orderPage, this.orderLimit).then(resp => {
                    if (resp.data.code === 200) {
                        if (resp.data.data.data.length > 0) {
                            resp.data.data.data.forEach(item => {
                                this.orders.push(item)
                            })
                        }
                        if (this.orders.length < resp.data.data.total) {  // 查满还可以继续进行加载操作
                            this.orderPage++
                            return
                        }

                        // 没有填满 证明后面已经没有数据了
                        this.orderLimit = 0
                    }
                })
            },
            load() {  // 加载正在执行订单信息
                if (this.orderLimit === 0) {
                    return
                }
                OrderApi.pageFindGoods(this.orderPage, this.orderLimit).then(resp => {
                    if (resp.data.code === 200) {
                        if (resp.data.data.data.length > 0) {
                            resp.data.data.data.forEach(item => {
                                this.orders.push(item)
                            })
                        }
                        if (this.orders.length < resp.data.data.total) {  // 查满还可以继续进行加载操作
                            this.orderPage++
                            return
                        }

                        // 没有填满 证明后面已经没有数据了
                        this.orderLimit = 0
                    }
                })
            },
            showUserOrder() {  // 显示用户自己订单的信息
                if (!this.isLogin) {    // 没有登录 进行登录
                    this.showLoginPage()
                    return
                }

                this.orders = []  // 初始化用户自身的一些订单信息查询操作
                this.orderPage = 1
                this.orderLimit = 3
                this.userOrderVisible = true
                this.load()
            },
            doOrder() {  // 用户下单
                if (isNaN(this.orderNumber)) {
                    this.$message.warning('请输入下单数量')
                    return
                }
                if (this.orderNumber.startsWith('0')) {
                    this.$message.warning('你输入的数量格式不正确')
                    return;
                }

                GoodsApi.userDoOrder(this.goodsDetails.id, this.orderNumber).then(resp => {
                    if (resp.data.code === 200) {  // 用户下单成功
                        // 跳转订单页面
                        this.$message.success('下单成功，正在跳转')
                        this.orderVisible = false
                        this.goodsDetailsVisible = false
                        return
                    }
                    this.$message.error(resp.data.msg)
                })
            },
            showOrderVisible() {        // 展示下订单界面
                if (!this.isLogin) {    // 没有登录 进行登录
                    this.showLoginPage()
                    return
                }
                this.orderVisible = true
            },
            userIsLogin() {  // 判断用户是否登录了
                if (window.sessionStorage.getItem('token') && window.sessionStorage.getItem('user')) {
                    this.user = JSON.parse(window.sessionStorage.getItem('user'))
                    this.isLogin = true
                    return
                }

                this.isLogin = false
            },
            getUserInfo() {  // 获取用户的信息
                LoginApi.getUserInfo().then(resp => {
                    if (resp.data.code === 200) {
                        window.sessionStorage.removeItem('user')
                        window.sessionStorage.setItem('user', JSON.stringify(resp.data.data))
                        this.user = resp.data.data
                    }
                })
            },
            doRegistry() {  // 注册操作
                if (!this.registryParams.username) {
                    this.$message.error('请输入用户名')
                    return
                }
                if (!this.registryParams.password) {
                    this.$message.error('请输入密码')
                    return
                }
                if (!this.registryParams.checkPassword) {
                    this.$message.error('请确认输入密码')
                    return
                }
                if (this.registryParams.checkPassword !== this.registryParams.password) {
                    this.$message.error('两次输入密码不一致')
                    this.registryParams.password = ''
                    this.registryParams.checkPassword = ''
                    return
                }
                if (!this.registryParams.phone) {
                    this.$message.error('请输入手机号码')
                    return
                }
                if (!this.registryParams.code) {
                    this.$message.error('请输入验证码')
                    return
                }

                LoginApi.registry(this.registryParams).then(resp => {
                    if (resp.data.code === 200) {
                        window.sessionStorage.setItem('token', resp.data.data)
                        this.isLogin = true
                        this.registryVisible = false
                        this.getUserInfo()
                        return
                    }
                    this.$message.warning(resp.data.msg)  // 未登录成功
                })
            },
            getCode(phone) {  // 获取验证码
                Api.getCode(phone).then(resp => {
                    if (resp.data.code === 200) {
                        this.$message.success(resp.data.msg)
                        return
                    }

                    this.$message.warning(resp.data.msg)
                })
            },
            registryToGetCode() {   // 注册时去获取验证码
                if (!this.registryParams.phone) {
                    this.$message.error('请输入手机号码')
                    return
                }

                this.getCode(this.registryParams.phone)
            },
            loginToGetCode() {  // 登录操作时去获得验证码
                if (!this.phoneLogin.phone) {
                    this.$message.error('请输入手机号码')
                    return
                }

                this.getCode(this.registryParams.phone)
            },
            getGoodsDetailsById(id) {   // 获取商品详细信息
                GoodsApi.getGoodsDetailsById(id).then(resp => {
                    this.goodsDetails = resp.data.data
                })
            },
            goodsDetailsShow(id) {  // 展示商品详细信息
                this.goodsDetailsVisible = true
                this.getGoodsDetailsById(id)
            },
            pageFindGoods() {  // 分页查找商品
                GoodsApi.pageFindGoods(this.page, this.limit, this.goodsParams).then(resp => {
                    this.goodsList = resp.data.data.data
                    this.total = resp.data.data.total
                })
            },
            searchGoods() {  // 查找商品
                if (this.goodsParams.priceStart && !isNaN(this.goodsParams.priceStart)) {
                    this.goodsParams.priceStart = null
                    this.goodsParams.priceEnd = null
                }
                if (this.goodsParams.priceEnd && !isNaN(this.goodsParams.priceEnd)) {
                    this.goodsParams.priceStart = null
                    this.goodsParams.priceEnd = null
                }
                this.pageFindGoods()
            },
            showLoginPage() {   // 登录操作
                this.loginVisible = true
            },
            showRegistryPage() {  // 注册操作
                this.registryVisible = true
            },
            switchToPhone() {  // 切换手机登录方式
                this.isPhone = true
            },
            switchToPass() {  // 切换密码登录方式
                this.isPhone = false
            },
            loginByPass() {   // 使用密码登录
                if (!this.passLogin.username) {
                    this.$message.error('请输入用户名')
                    return
                }
                if (!this.passLogin.password) {
                    this.$message.error('请输入密码')
                    return
                }

                LoginApi.loginByPassword(this.passLogin).then(resp => {
                    if (resp.data.code === 200) { // 登录成功
                        window.sessionStorage.setItem('token', resp.data.data)
                        this.isLogin = true
                        this.loginVisible = false
                        this.getUserInfo()
                        return
                    }
                    this.$message.warning(resp.data.msg)  // 未登录成功
                })
            },
            loginByPhone() {   // 使用手机方式登录
                if (!this.phoneLogin.phone) {
                    this.$message.error('请输入手机号码')
                    return
                }
                if (!this.phoneLogin.code) {
                    this.$message.error('请输入验证码')
                    return
                }

                LoginApi.loginByPhone(this.phoneLogin).then(resp => {
                    if (resp.data.code === 200) { // 登录成功
                        window.sessionStorage.setItem('token', resp.data.data)
                        this.isLogin = true
                        this.loginVisible = false
                        this.getUserInfo()
                        return
                    }
                    this.$message.warning(resp.data.msg)  // 未登录成功
                })
            },
            handleCommand(command) {  // 处理命令操作
                if ('upInfo' === command) {
                    this.updateAdminInfo()
                    return
                }
                if ('upPass' === command) {
                    this.updatePassword()
                    return
                }
                if ('logout' === command) {
                    this.logout()
                }
            }
        },
        created() {
            this.pageFindGoods()
            this.userIsLogin()
        }
    }
</script>

<style scoped>

    /* 头部部分 */
    .header {
        background-color: #f5f5f5;
    }

    .header-class {
        width: 60%;
        height: 60px;
        border: 0;
        padding: 0;
        margin: 0 auto;
        line-height: 60px;
    }

    .header-class > div {
        float: right;
        padding-right: 30px;
    }

    .user-header-class {
        width: 170px;
        height: 60px;
    }

    .login-class {
        width: 70px;
        color: #409eff;
    }

    .login-class:hover {
        cursor: pointer;
    }

    .registry-class {
        width: 70px;
    }

    .registry-class:hover {
        cursor: pointer;
        color: #409eff;
    }

    .car-class {
        width: 70px;
    }

    .car-class:hover {
        cursor: pointer;
        color: #409eff;
    }

    .contact-class {
        width: 70px;
    }

    .contact-class:hover {
        cursor: pointer;
        color: #409eff;
    }

    .order-class {
        width: 70px;
    }

    .order-class:hover {
        cursor: pointer;
        color: #409eff;
    }

    /* 身体部分 */
    .body {
    }

    .body-goods {
        width: 70%;
        margin: 0 auto;
        /*background-color: #aaaaaa;*/
    }

    .search-class {
        margin-top: 30px;
    }

    .search-input-class {
        width: 50%;
        margin: 0 auto;
    }

    .search-page-class {
        margin-top: 20px;
        width: 98%;
        border: 1px solid #d8d8d8;
        height: 42px;
        padding-left: 2%;
    }

    .price-class {
        width: 30%;
        margin: 1px 10px 0 0;
    }

    .goods-class {
        height: 500px;
        margin-top: 20px;
    }

    .goods-info {
        width: 20%;
        height: 370px;
        margin-top: 5px;
        float: left;
    }

    .goods-info-class {
        height: 350px;
        width: 200px;
        padding: 11px 29px;
        border: 1px solid #f2f2f2;
    }

    .goods-info-class:hover {
        cursor: pointer;
        border: 1px solid #40b6fb;
    }

    .goods-description {
        margin-top: 8px;
        height: 40px;
        overflow: hidden;
        color: #9b9b9b;
        font-size: 14px;
    }

    .goods-price {
        margin-top: 8px;
        height: 25px;
        font-size: 20px;
        color: #fd3f31;
    }

    .line-class {
        border-top: 1px solid #9b9b9b;
        margin: 8px 0;
    }

    .goods-sold {
        float: right;
        padding: 5px;
        color: #9b9b9b;
        font-size: 14px;
    }

    .goods-name {
        margin: 4px 0;
        height: 10px;
        color: #9b9b9b;
        font-size: 12px;
    }

    .goods-details {
        width: 100%;
        height: 100%;
    }

    .goods-details-info {
        width: 70%;
        background-color: #ffffff;
        height: 90%;
        margin: 0 auto;
        border-left: 1px solid #308562;
        border-right: 1px solid #308562;
    }

    .goods-details-left {
        width: 649px;
        height: 100%;
        float: left;

    }

    .goods-details-right {
        width: 649px;
        height: 100%;
        border-left: 1px solid #308562;
        float: left;
    }

    .goods-details-img {
        height: 400px;
        width: 400px;
        margin: 0 auto;
    }

    .goods-details-description {
        height: 60px;
        width: 500px;
        padding-top: 30px;
        margin: 0 auto;
    }

    .goods-details-option {
        width: 100%;
        padding-top: 20px;
    }

    .goods-details-option > div {
        float: right;
        padding-right: 40px;
    }

    .goods-details-price {
        font-size: 22px;
        color: #fd3f31;
    }

    .goods-details-sold {
        font-size: 14px;
        color: #9b9b9b;
    }

    .goods-details-price-sold {
        width: 500px;
        margin: 0 auto;
    }

    .right-info {
        width: 500px;
        margin: 0 auto;
    }

    .order-info {
        width: 700px;
        margin: 0 auto;
    }

    .order-info-class {
        height: 500px;
        width: 500px;
        margin: 0 auto;
        background-color: #fff;
        border: 1px solid #9b9b9b;
        padding-bottom: 2px;
        transition: background-color 1000ms;
    }

    .order-info-class:hover {
        cursor: pointer;
        background-color: #d7d7d7;
        transition: background-color 1000ms;
    }

    .order-img {
        height: 300px;
        width: 300px;
        margin: 0 auto;
    }

    .order-goods-name {
        padding-top: 8px;
        text-align: center;
        width: 200px;
        margin: 0 auto;
        color: #fd3f31;
        font-size: 20px;
    }

    .order-id {
        width: 300px;
        padding-top: 8px;
        color: grey;
        margin: 0 auto;
    }

    .order-state-info {
        width: 300px;
        padding-top: 12px;
        font-size: 14px;
        color: #9b9b9b;
        margin: 0 auto;
    }

    .order-sure {
        width: 300px;
        padding-top: 12px;
        margin: 0 auto;
    }
</style>