const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:0,
    query: 0,
    queryorder: 0,
    orderList:10,
    selectedItem:0,
    Load:false,
    SelectItem: ["全部", "全部", "全部", "全部", "全部", "全部", "全部"],
     
   
    orderList: [{
      order_sn: 1,
      area_info: 1,
      mob_phone: 1,
      name: "厚啊美",
      zongjia: 1,
    }, {
        order_sn: 1,
        area_info: 1,
        mob_phone: 1,
        name: "厚啊美",
        zongjia: 1,
      }, {
        order_sn: 1,
        area_info: 1,
        mob_phone: 1,
        name: "厚啊美",
        zongjia: 1,
      }, {
        order_sn: 1,
        area_info: 1,
        mob_phone: 1,
        name: "厚啊美",
        zongjia: 1,
      },{
      order_sn: 1,
      area_info: 1,
      mob_phone: 1,
      name:"厚啊美",
      zongjia: 1,
    }, {
        order_sn: 1,
        area_info: 1,
        mob_phone: 1,
        name: "厚啊美",
        zongjia: 1,
      }, {
        order_sn: 1,
        area_info: 1,
        mob_phone: 1,
        name: "厚啊美",
        zongjia: 1,
      }, {
        order_sn: 1,
        area_info: 1,
        mob_phone: 1,
        name: "厚啊美",
        zongjia: 1,
      }, {
        order_sn: 1,
        area_info: 1,
        mob_phone: 1,
        name: "厚啊美",
        zongjia: 1,
      },]
  },
  onLoad: function() {

    //初始化数据
    this.setData({
      query: 0,
      queryorder: 0,
      Load:false
    });
   
    var that = this;
    //获取屏幕高度
    wx.getSystemInfo({
      success: function(res) {
        var windowheight = res.windowHeight + 160
        that.setData({
          height:windowheight 
        })
      },
    })
    
  },
  selectedItem:function(e){
    this.data.selectedItem = e.currentTarget.dataset.index;
    this.setData({
      selectedItem: this.data.selectedItem
    })
  },
  query: function() {
    if (this.data.query != 1) {
      this.setData({
        query: 1
      })
    } else {
      this.setData({
        query: 0
      })
    }
  },
  queryorder: function() {
    if (this.data.queryorder != 1) {
      this.setData({
        queryorder: 1
      })
    } else {
      this.setData({
        queryorder: 0
      })
    }
  },
  scrollDown:function(res){
 
    this.addLoad();
  },
  Loadding:function(){
    this.addLoad();
  },
  addLoad:function(){
    wx.showLoading({
      title: '玩命的加载中',
      mask: true,
    })
    this.setData({
      Load: true
    })
  },
  orderDatile:function(){
      wx.navigateTo({
        url: '../Datile/Datile',
      })
  }
})