const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    InfoView: 0,
    showget: false,
    number: 0,
    zongjia: 0,
    userInfo: {},
    hasUserInfo: false,
    selectInfo: true,
    Obscuration: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    Delivery: {
      name: "",
      phone: "",
      address: "",
      totle: 1244
    },
    warehouse: [],
    warehousename: "选择仓库",
    warehouseid: 0,
    wareSelectList: true,
    bank: [],
    bankname: "支付方式",
    bankid: "",
    bankSelectList: true,
    ShopList: [],
    userPhone: [],
    cannel: "",
    oldData: [],
    controller: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log(options.order)
    console.log(app.globalData.JsonStatus)

    this.setData({

      selectInfo: true,
      wareSelectList: true,
      bankSelectList: true,
      Obscuration: true
    })

    console.log(app.globalData.openid)

    //获取屏幕高度
    var that = this;

    that.getNumZong();
    that.getwarehouse();
    that.getwarebank();

    that.getUserInfos();

    app.globalData.openid = wx.getStorageSync('openid');

    this.setData({
      InfoView: 1,
      userInfo: app.globalData.userInfo,
      openid: app.globalData.openid,
      selectInfo: true,

    })
  },

  onShow: function() {
    var that = this;
    that.getwarehouse();
    that.getwarebank();

    if (app.globalData.JsonStatus == "1") {
      var thisShopList = that.data.ShopList
      for (var i = 0; i < thisShopList.length; i++) {
        if (thisShopList[i].cp_tm == app.globalData.Json.cp_tm || thisShopList[i].goods_cp_tm == app.globalData.Json.cp_tm) {
          var a = thisShopList[i].num + 1;
          thisShopList[i].num = a

          this.setData({
            ShopList: thisShopList
          })
          this.getNumZong();
          return false;
        }
      }
      
      this.data.ShopList.push(app.globalData.Json);
      
      //处理
      
      this.setData({
        ShopList: this.data.ShopList,
      })
      this.getNumZong();
      app.globalData.JsonStatus = "0"
      app.globalData.Json = []
    }
    this.setData({
      wareSelectList: true,
      bankSelectList: true,
      Obscuration: true,
      // "Delivery.name": "",
      // "Delivery.phone": "",
      // "Delivery.address": ""
    })

    this.setData({
      InfoView: 1,
      userInfo: app.globalData.userInfo,
      openid: app.globalData.openid,
      selectInfo: true,
      // warehousename: "选择仓库",
      // bankname: "支付方式",
      inputval: "",

    })
    this.data.controller = app.globalData.controller
    
    if (app.globalData.controller == "1") {
      console.log("速出")
      var res = app.globalData.getData;
      console.log(res)
      this.data.controller = "1"
      this.data.ShopList = res.data.order_item
      
      this.setData({
        ShopList: this.data.ShopList,
        "Delivery.name": res.data.order.shipp_people,
        "Delivery.phone": res.data.order.shipp_phone,
        "Delivery.address": res.data.order.shipp_address,
        warehouseid: res.data.order.warehouse.id,
        warehousename: res.data.order.warehouse.l_name,
        bankid: res.data.order.bank.id,
        bankname: res.data.order.bank.bank_name,
        controller: "1"
      })
      this.getNumZong();
      app.globalData.gerData = [];
      // app.globalData.controller="0"
      // this.data.controller = app.globalData.controller;
    }


  },
  // scroll:function(e){
  //   if (this.data.showget && e.detail.deltaY > 0){
  //    this.setData({
  //      showget: false
  //    })
  //  }
  // },
  // scrollDown: function (e) {
  //   this.setData({
  //     showget:true
  //   })
  // },

  //添加信息
  AddInfo: function() {
    this.setData({
      InfoView: 0
    })
  },
  // 输入信息 ：
  getInfo: function(Info) {

    var Info = Info.detail.value
    var name = Info.name;
    var phone = Info.phoneNumber;
    var address = Info.address;

    this.data.Delivery.name = name;
    this.data.Delivery.phone = phone;
    this.data.Delivery.address = address;
    this.setData({
      'Delivery.name': this.data.Delivery.name,
      'Delivery.phone': this.data.Delivery.phone,
      'Delivery.address': this.data.Delivery.address,
      InfoView: 1
    })
  },
  // 扫码功能
  getShoppingInfo: function() {
    
    var that = this;
    that.getShopInfo();
            that.getNumZong();
    // wx.scanCode({
    //   onlyFromCamera: false,
    //   scanType: "barCode",
    //   // success: function(res) {
    //   //   console.log(res.result)
    //   //   that.getShopInfo(res.result);
 
    //   //   //that.getShoppingInfo();
    //   // },
    //   // fail: function(res) {
    //   //   wx.showToast({
    //   //     title: '用户取消',
    //   //     image: '',
    //   //     mask: true,
    //   //   })
    //   //   return
    //   // }
    // })
  },
  scroll: function(res) {
    console.log(res)
  },
  //获取商品信息
  getShopInfo: function(data) {
    var vm = this;

    wx.request({
      url: app.globalData.goodsInfo,
      data: {
        //barcode: data,
        barcode:"6104321002408",
        //open_id: app.globalData.openid
        open_id:"oYqmW5Kad1k6aGcv-7AMub49E1Sk"
      },
      method: 'get',
      success: function(res) {

        if (res.data.code == "0") {
          wx.showToast({
            title: res.data.msg,
          })
          return false;
        }
        if (res.data.code == "-1") {
          wx.showToast({
            title: res.data.msg,
          })
          wx.setStorageSync('login', '0');
          app.globalData.controller = "0"
          this.data.controller = app.globalData.controller;
          wx.switchTab({
            url: '../inlet/inlet',
          })
          return false;
        }
        var thisShopList = vm.data.ShopList
        for (var i = 0; i < thisShopList.length; i++) {
          if (thisShopList[i].cp_tm == res.data.data.cp_tm) {
            var a = thisShopList[i].num + 1;
            thisShopList[i].num = a

            vm.setData({
              ShopList: thisShopList
            })
            vm.getNumZong();
            return false;
          }
          if (thisShopList[i].goods_cp_tm == res.data.data.cp_tm) {
            var a = thisShopList[i].num + 1;
            thisShopList[i].num = a

            vm.setData({
              ShopList: thisShopList
            })
            vm.getNumZong();
            return false;
          }
        }
        vm.data.ShopList.push(res.data.data);

        vm.setData({
          ShopList: vm.data.ShopList
        })
        vm.getNumZong();
      }
    })
  },

  //减去
  numminus: function(e) {
    var index = e.currentTarget.dataset.index;
    var tapindex = this.data.ShopList;
    console.log(tapindex.length)
    for (var i = 0; i < tapindex.length; i++) {

      var thisnum = tapindex[index].num;
      if (thisnum <= 1) {
        console.log("减去长度")
        tapindex.splice(index, 1);
        var tapindex1 = tapindex;
        this.setData({
          ShopList: tapindex1
        })
        this.getNumZong();
        break;
      } else {
        console.log("减去数量")
        thisnum = parseInt(thisnum)
        var thisnum2 = thisnum - 1;
        thisnum2 = parseInt(thisnum2)
        tapindex[index].num = thisnum2;

        var tapindex1 = tapindex
        this.setData({
          ShopList: tapindex1
        })
        this.getNumZong();
        break;
      }
    }


  },
  // 加
  numadd: function(e) {

    var index = e.currentTarget.dataset.index;
    var tapindex = this.data.ShopList;
    console.log(tapindex.length)
    for (var i = 0; i < tapindex.length; i++) {
      var thisnum = tapindex[index].num;
      thisnum = parseInt(thisnum);
      var thisnum2 = thisnum + 1;

      thisnum2 = parseInt(thisnum2)
      tapindex[index].num = thisnum2;
      this.setData({
        ShopList: tapindex
      });
      this.getNumZong();
      break;
    }

  },
  //获取总和
  getNumZong: function() {
    var that = this;
    var num = that.data.ShopList
    var numLength = 0;
    var zongjia = 0;
    for (var i = 0; i < num.length; i++) {
      var num1 = parseFloat(num[i].cp_saleall)
      var shopnumber = parseInt(num[i].num);
      numLength += shopnumber;
      console.log(that.data.controller)
 
      if (num[i].cp_saleall != undefined) {
       
        num1 = num[i].cp_saleall * shopnumber

      }
    
      if (num[i].goods_cp_saleall != undefined) {
       
        num1 = num[i].goods_cp_saleall * shopnumber
      }

      // debugger;
      zongjia = parseFloat(zongjia);

      zongjia += num1

    }
    zongjia = parseFloat(zongjia.toFixed(2))
    this.setData({
      number: numLength,
      zongjia: zongjia
    })
  },
  //点击获取UserInfo
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //加载获取UserInfo
  getUserInfos: function() {
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
        }
      })
    }
  },
  //加载仓库
  getwarehouse: function() {
    var hml = this;
    wx.request({
      url: app.globalData.warehouse + '?&open_id=' + app.globalData.openid,
      method: "get",
      success: res => {

        if (res.data.code == "0") {
          wx.showToast({
            title: res.data.msg,
          })
          return false
        }
        if (res.data.code == "-1") {
          wx.showToast({
            title: res.data.msg,
          })
          wx.setStorageSync('login', '0');
          app.globalData.controller = "0"
          this.data.controller = app.globalData.controller;
          wx.switchTab({
            url: '../inlet/inlet',
          })

          return false
        }
        this.data.warehouse = res.data.data
        hml.setData({
          warehouse: this.data.warehouse
        })

      }
    })
  },
  //选择仓库后
  selectwarehouse: function(e) {

    this.data.warehousename = e.target.dataset.name

    this.data.warehouseid = e.target.dataset.id

    this.setData({
      warehousename: this.data.warehousename,
      wareSelectList: true,
      Obscuration: false
    })
  },
  //显示仓库列表
  selecthosework: function() {
    if (this.data.wareSelectList) {
      this.setData({
        wareSelectList: false,
        Obscuration: false,
        InfoView: true,
        bankSelectList: true
      })
    } else {
      this.setData({
        wareSelectList: true,
        Obscuration: true,
        InfoView: true,
        bankSelectList: true
      })
    }
  },
  //显示支付方式列表
  selectBank: function() {
    if (this.data.bankSelectList) {
      this.setData({
        bankSelectList: false,
        Obscuration: false,
        InfoView: true,
        wareSelectList: true
      })
    } else {
      this.setData({
        bankSelectList: true,
        Obscuration: true,
        InfoView: true,
        wareSelectList: true
      })
    }
  },
  //加载支付方式
  getwarebank: function() {
    var hml = this;
    wx.request({
      url: app.globalData.bank + '?&open_id=' + app.globalData.openid,
      method: "get",
      success: res => {

        if (res.data.code == "0") {
          wx.showToast({
            title: res.data.msg,
          })
          return false;
        }
        if (res.data.code == "-1") {
          wx.showToast({
            title: res.data.msg,
          })
          wx.setStorageSync('login', '0');
          app.globalData.controller = "0"
          this.data.controller = app.globalData.controller;
          wx.switchTab({
            url: '../inlet/inlet',
          })

          return false
        }
        hml.setData({
          bank: res.data.data
        })

      }
    })
  },
  //选择银行后
  selectBank: function() {
    if (this.data.bankSelectList) {
      this.setData({
        bankSelectList: false,
        Obscuration: false,
        InfoView: true,
        wareSelectList: true
      })
    } else {
      this.setData({
        bankSelectList: true,
        Obscuration: true,
        InfoView: true,
        wareSelectList: true
      })
    }
  },

  //选择仓库后
  selectBankitem: function(e) {

    this.data.bankname = e.target.dataset.name

    this.data.bankid = e.target.dataset.id

    this.setData({
      bankname: this.data.bankname,
      bankSelectList: true,
      Obscuration: true
    })

  },
  setUserInfo: function() {
    this.setData({
      InfoView: false
    })
  },
  //提交订单
  submitOrder: function(e) {
    var that = this;
    console.log(wx.getStorageSync('openid'))
    console.log(app.globalData.openid)
    var shopList = that.data.ShopList;
    var goodsinfo = "";
    for (var i = 0; i < shopList.length; i++) {

      if (i != shopList.length - 1){
        if (shopList[i].goods_cp_number != undefined) {
          goodsinfo += shopList[i].goods_cp_number + "|" + shopList[i].num + ",";
        } 
        if (shopList[i].cp_number != undefined) {
          goodsinfo += shopList[i].cp_number + "|" + shopList[i].num + ",";
        }
      }
      else{
        if (shopList[i].goods_cp_number != undefined) {
          goodsinfo += shopList[i].goods_cp_number + "|" + shopList[i].num;
        } 
        if (shopList[i].cp_number != undefined){
          goodsinfo += shopList[i].cp_number + "|" + shopList[i].num;
        }
      }
    }
    console.log(app.globalData.openid);
    console.log("goodinfo = " + goodsinfo)
    wx.request({
      url: app.globalData.createOrder,
      data: {

        warehouse_id: this.data.warehouseid,
        bank_id: this.data.bankid,
        shipp_phone: this.data.Delivery.phone,
        shipp_people: this.data.Delivery.name,
        shipp_address: this.data.Delivery.address,
        goods_info: goodsinfo,
        store_no: '',
        open_id: app.globalData.openid,
        status: e.target.dataset.status
      },
      method: "POST",
      success: function(res) {

        if (res.data.code == "0") {
          wx.showToast({
            title: res.data.msg,
          });
          return false;
        }
        if (res.data.code == "-1") {
          wx.showToast({
            title: res.data.msg,
          })
          wx.setStorageSync('login', '0');
          app.globalData.controller = "0"
          this.data.controller = app.globalData.controller;
          wx.switchTab({
            url: '../inlet/inlet',
          })
          that.data.ShopList = []
          return false
        }
        that.data.ShopList = []
        that.setData({
          ShopList: [],
          "Delivery.name": "",
          "Delivery.phone": "",
          "Delivery.address": "",
          warehouseid: "",
          warehousename: "支付方式",
          bankid: "",
          bankname: "仓库名字",
          controller: "0"
        })
        app.globalData.controller = "0"
        that.data.controller = app.globalData.controller;

        wx.switchTab({

          url: '../index/index',
        });
        app.globalData.controller = "0"
        this.data.controller = app.globalData.controller;
        // that.setData(){

        // }
      }
    })
  },
  //输入事件监听
  changeval: function(res) {

    this.getUserPhone(res.detail.value);
  },
  //获取用户列表
  getUserPhone: function(data) {
    var that = this
    wx.request({
      url: app.globalData.getUserPhone + "?search_word=" + data + "&open_id=" + app.globalData.openid,
      method: "get",
      success: res => {
        if (res.data.code == "0") {
          wx.showToast({
            title: res.data.msg,
          })
          return false;
        }
        if (res.data.code == "-1") {
          wx.showToast({
            title: res.data.msg,
          })
          wx.setStorageSync('login', '0');
          app.globalData.controller = "0"
          this.data.controller = app.globalData.controller;
          wx.switchTab({
            url: '../inlet/inlet',
          })

          return false
        }
        that.data.userPhone = res.data.data.data;
        that.setData({
          userPhone: that.data.userPhone
        })

      }
    })
  },
  //搜索获取焦点处理
  changeFoucs: function() {
    this.setData({
      selectInfo: false
    })
  },

  //搜索失去焦点处理
  changeBlur: function() {
    this.setData({
      selectInfo: true
    })
  },
  //设置选中的电话号
  setPhone: function(e) {
    this.data.Delivery.name = e.currentTarget.dataset.name;
    this.data.Delivery.phone = e.currentTarget.dataset.phone;

    this.setData({
      "Delivery.name": this.data.Delivery.name,
      "Delivery.phone": this.data.Delivery.phone,
      selectInfo: true,
      InfoView: false
    })

  },
  //蒙层处理
  Obscuration: function() {
    this.setData({
      Obscuration: true,
      bankSelectList: true,
      wareSelectList: true

    })
  },
  clear: function() {
    var hml = this;
    wx.showModal({
      title: '提示',
      content: '确定清空购物车',
      success: function(res) {
        if (res.confirm) {
          hml.setData({
            ShopList: [],
            "Delivery.name": "",
            "Delivery.phone": "",
            "Delivery.address": "",
            warehouseid: "",
            warehousename: "支付方式",
            bankid: "",
            bankname: "仓库名字",
            controller: "0"
          })
          app.globalData.controller = "0"
          hml.data.controller = app.globalData.controller;
          hml.getNumZong();
        } else {

        }
      }
    })

  },
  changval: function(e) {
    var that = this;
    var val = e.detail.value;
    var index = e.target.dataset.index;
    var shopList = that.data.ShopList
    var newList;
    for (var i = 0; i < shopList.length; i++) {
      if (val == "0" || val == "") {

        shopList[index].num = "1";
        break;
      } else {

        shopList[index].num = val;
        break;
      }

    }

    newList = shopList;

    that.setData({
      ShopList: newList
    })
    // debugger;
    that.getNumZong();
  },
  onTabItemTap: function(e) {
    console.log(e)
    console.log("11111111111" + this.data.controller)
    if (this.data.controller == "1" && (e.index == 2 || e.index == 0)) {

      this.setData({
        ShopList: [],
        "Delivery.name": "",
        "Delivery.phone": "",
        "Delivery.address": "",
        warehouseid: "",
        warehousename: "支付方式",
        bankid: "",
        bankname: "仓库名字",
        controller: "0"
      })
      return false
    }
    app.globalData.controller = "0"
    this.data.controller = app.globalData.controller;

  }
})