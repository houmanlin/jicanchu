// pages/Datile/Datile.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_sn:0,
    price:0,
    rdh:0,
    dianming:"",
    creatOrderTime:"",
    zongjia:"",
    yunfei:"",
    name:"",
    address:"",
    phoneNum:"",
    shopname:"",
    bank_name:"",
    bank_id:"",
    goods:[],
    status:'',
    getData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
      console.log(options.ordersn);
      this.data.order_sn=options.ordersn
    this.data.status = options.orderstatus
    this.setData({
      status: this.data.status,
      order_sn:this.data.order_sn
    })
  },

 onShow(){
   this.GetOrderInfo();
 },
  GetOrderInfo:function(){
    var hml = this
    wx.request({
      url: app.globalData.getOrderInfo,
      method:"GET",
      data:{
        order_sn: hml.data.order_sn,
        //order_sn:"FX20181208-21-1",
        open_id: app.globalData.openid
        //open_id:"oYqmW5Kad1k6aGcv-7AMub49E1Sk"
      },
      success: res => {
          
        if(res.data.code == "1"){
          
          hml.data.getData = res.data;
          app.globalData.getData = res.data;
          console.log(res.data.data.order.bank)
          var bank_id = ""
          var bank_name = ""
          if (res.data.data.order.bank == null){
            bank_id = ""
            bank_name = ""
          }else{
            console.log("非空")
              bank_id = res.data.data.order.bank.id;
            console.log(res.data.data.order.bank.id)
              bank_name = res.data.data.order.bank.bank_name;
          }
          var shop_name=""
          if(res.data.data.order.store == null){
            shop_name = ""
          }else{
            shop_name = res.data.data.order.store.shop_name
          }
          hml.setData({
            rdh: res.data.data.order.r_dh,
            // zongjia: res.data.data.order.money,
            creatOrderTime: res.data.data.order.format_create_time,
            yunfei: res.data.data.order.freconst,
            name: res.data.data.order.shipp_people,
            address: res.data.data.order.shipp_address,
            phoneNum: res.data.data.order.shipp_phone,
            shopname: shop_name,
            goods: res.data.data.order_item,
            bank_id: bank_id,
            bank_name: bank_name
          })
          hml.getsub(res.data.data.order_item)
          return;
        } 
        if (res.data.code == "-1") {
          wx.showToast({
            title: res.data.msg,
          })
          wx.setStorageSync('login', '0');
          wx.switchTab({
            url: '../inlet/inlet',
          })

          return
        }
        var a =res.data.msg;
        
        wx.showToast({
          title: a,
          image:'../../static/img/fail.png'
        })
      },
      fail:res => {
       console.log(res)
       
      }
    })
  },
  getsub:function(data){
      console.log("getsub")
      var zongjia = 0;

      for(var i in data){
        //单价金额
        var jiage = parseFloat(data[i].goods_cp_saleall).toFixed(2);
        //数量
        var num = parseInt(data[i].number);
        //计算变量
        zongjia += jiage*num;
       
      }
    console.log("总和" + zongjia)
      this.setData({
        zongjia:zongjia
      })
  },
  quxiao:function(e){
    
    wx.request({
      url: app.globalData.cancel,
      method:'POST',
      data:{
        order_sn: e.currentTarget.dataset.ordersn,
        open_id: app.globalData.openid,
      },
      success:res=>{
        e.currentTarget.dataset.ordersn
    
        if(res.data.code == "0"){
            wx.showToast({
              title: res.data.msg,
            })
            return;
        }
        if (res.data.code == "-1") {
          wx.showToast({
            title: res.data.msg,
          })
          wx.setStorageSync('login', '0');
          wx.switchTab({
            url: '../inlet/inlet',
          })

          return
        }
        wx.showToast({
          title: res.data.msg,
          success:function(){
            wx.switchTab({
              url: '../index/index',
            })
          }
        })
        
      },
      fail:res=>{
        console.log(res)
      }
    })
  },
  next: function (e){
  
    app.globalData.controller = "1";
    app.globalData.getData = this.data.getData;

    wx.switchTab({
      url: '../create/create',
    })
     //app.globalData.getData=[]
  },
  backUpPage:function(){

    wx.navigateBack({
      delta:1
    })
  },
 
})