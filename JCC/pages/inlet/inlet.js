// pages/inlet/inlet.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bangding: "../../static/img/bangding.png",
    ImgUrl: [{
      url: "../../static/img/indextop_02.png",
    },
    {
      url: "../../static/img/shopno.png",
    },
    {
      url: "../../static/img/baobiao.png",
    },
    {
      url: "../../static/img/dongtai.png",
    }
    ],
    margin: "",
    userInfo: [],
    hasUserInfo: false,
    openid: "",
    login: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var vm = this;
   
    wx.getSystemInfo({
      success: function (res) {
        vm.data.margin = res.windowHeight / 9;
        vm.setData({
          margin: vm.data.margin
        })
      },
    })
    var login = wx.getStorageSync('login')

    if(login == "0"){
      wx.hideTabBar({
        success:function(){
          wx.showToast({
            title: '尚未绑定',
            icon:'none'
          })
        }
      })
    }
    if (login == "1") {
      wx.showTabBar({
        success: function () {
          wx.showToast({
            title: '欢迎光临',
          })
        }
      })
    }
    vm.setData({
      userInfo: app.globalData.userInfo,
      openid: app.globalData.openid,
      login: login
    })
    
    app.globalData.openid = wx.getStorageSync('openid');
    app.globalData.login = login
    console.log(app.globalData.openid)
      
     
    vm.getUserInfos();

  },

  onShow:function (){
    var login = wx.getStorageSync('login')
      this.setData({
        login: login
      })


    if (login == "0"){
      wx.hideTabBar({
        
      })
    }
  },
  clickthis: function (res) {
    var vm = this;
    var id = res.currentTarget.dataset.id;
    switch (id) {
      case 0:
        var loginstatus = wx.getStorageSync('login')
        if (loginstatus == "0") {
          wx.scanCode({
            onlyFromCamera: "false",
            scanType: "barCode",
            success: function (res) {
              var Json = JSON.parse(res.result);
             
              var admin_name = Json.admin_name;
              var admin_id = Json.admin_id;
          
              console.log(admin_id)
              console.log(admin_name)
              
              vm.getopenId(admin_id, admin_name)
            },
            fail: function () {

            },
          })
        } else {
          vm.getShopInfo();
          // console.log("登录了")
          // wx.scanCode({
          //   onlyFromCamera: "false",
          //   scanType: "barCode",
          //   success: function (res) {
          //     console.log(res.result)
          //     vm.getShopInfo(res.result);
          //   },
          //   fail: function () {

          //   },
          // })

        }
        break;
      default:

        wx.showToast({
          title: '未开启相关功能敬请期待.......',
        })
        break;
    }
  },
  getShopInfo: function (data) {
    console.log(data)
    console.log(app.globalData.goodsInfo)
    wx.request({
      url: app.globalData.goodsInfo,
      data: {
        //barcode: data,
        barcode: "6104321002408",
        //open_id: app.globalData.openid
        open_id: "oYqmW5Kad1k6aGcv-7AMub49E1Sk"
      },
      method: 'get',
      success: function (res) {
        
        console.log(res.data.data)
        if (res.data.code == "0") {
          wx.showToast({
            title: res.data.msg,
          })
          return;
        };
        app.globalData.JsonStatus = "0"
        app.globalData.Json = []
        app.globalData.Json = res.data.data;
        app.globalData.JsonStatus = 1
        wx.switchTab({
          url: '../create/create',
        })
      }
    })
  },
  //点击获取UserInfo
  getUserInfo: function (e) {

    app.globalData.userInfo = e.detail.userInfo;

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //加载获取UserInfo
  getUserInfos: function () {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {

          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }, fail: res => {
          console.log(res)
        }
      })
    }
  },
  getopenId:function(admin_name,admin_id){
    var that = this
    wx.login({
      success:res=>{
        var code = res.code;
        wx.request({
          url: app.globalData.bindopenid,
          data: {
            admin_id: admin_name,
            admin_name: admin_id,
            code: code
          },
          method:"POST",
          success:function(res){
            console.log(res.data.code)
             if(res.data.code == "0"){
               wx.showToast({
                 title: res.data.msg,
                 image:"../../static/img/fail.png",
               })
               return;
             }
            wx.showToast({
              title: res.data.msg,
            })
            console.log(res.data.data.open_id)
           
            app.globalData.openid = res.data.data.open_id
            wx.setStorageSync("openid", res.data.data.open_id)
            console.log("获取到全局的openid" + app.globalData.openid)
            wx.setStorageSync('login', '1');
            that.setData({
              login:"1"
            })
            wx.showTabBar({
              
            })
          }
        })
      }
    })
    
  }
})