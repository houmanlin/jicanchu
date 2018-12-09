//app.js
var config = require("./config.js");

App({
 
  onLaunch: function () {
    const that = this;
    var getuseropen = wx.getStorageSync('openid')
    if(getuseropen){
      wx.setStorageSync('login', '1');//非空
    }else{
        wx.setStorageSync('login', '0')//空
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("getSetting")
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {

                this.userInfoReadyCallback(res)

              }
            }
          })
        }
      },fail(res){

      }
    })
  },
   globalData: {
     userInfo: null,
     openid:null,
     navHeight:200,
    Json:[],
    JsonStatus:0,
    login:0,
     openid: "",
     codeNum:"",
      getData:[],
      controller:"0",
     //接口
     getList : config.getList,//订单列表
     createOrder : config.createOrder,//创建订单
     getOrderInfo : config.getOrderInfo,//获取订单信息
     cancel:config.cancel,//关闭订单信息
     warehouse:config.warehouse,//获取仓库名
     bank: config.bank,//获取支付方式
     goodsInfo:config.goodsInfo,//获取产品信息
     getopenid:config.getOpenid,//获取openid
     getUserPhone:config.getUserPhone,//获取用户电话号
     bindopenid: config.bindopenid  //绑定openid
    
  },
  
})