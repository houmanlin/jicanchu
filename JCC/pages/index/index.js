const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    height: 0,
    query: 0,
    queryorder: 0,
    orderList: [],
    selectedItem: 0,
    last_page:0,
    current_page:0,
    Load: false,
    SelectItem: ["全部", "全部", "全部", "全部", "全部", "全部", "全部"],
    openid: 0,
    mei:true,
     
  },

  onShow:function(){
    var vm = this;
    
    //初始化数据
    this.setData({
      query: 0,
      queryorder: 0,
      Load: false,
      orderList:[],
      mei:true
    });

    wx.showLoading({
      title: '正在加载....',
    })
    vm.getOrderList(1);
  },
  onPullDownRefresh(res) {
    console.log(res)

  },

  selectedItem: function(e) {
    this.data.selectedItem = e.currentTarget.dataset.index;
    this.setData({
      selectedItem: this.data.selectedItem
    })
  },
  //分页加载
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
  //查询订单
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
  scrollDown: function(res) {
    this.addLoad();
  },
  //分页加载
  Loadding: function() {
    if (this.last_page == this.current_page) {
      wx.showToast({
        title: '无更多数据',
      });
      this.setData({
        mei: false
      })
      return;
    }
    

    this.addLoad();
    var count = 0 ;
    count++
    this.getOrderList(count);
    
  },
  //加载
  addLoad: function() {
    wx.showLoading({
      title: '玩命的加载中',
      mask: true,
    })
    this.setData({
      Load: true
    })
  },
  //页面跳转
  orderDatile: function(e) {
    wx.navigateTo({
      url: '../Datile/Datile?ordersn=' + e.currentTarget.dataset.ordersn + '&orderstatus=' + e.currentTarget.dataset.status,
    })
  },
  //加载列表
  getOrderList:function(page){
    var requrl = app.globalData.getList + "?status=&warehouse=&online_order_sn=&open_id=" + app.globalData.openid + "&page=" + page
  
    var hml = this
    wx.request({
      url: requrl,
      method:'get',
      success:function(res){
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

        
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        for(var List in res.data.data.data){
          hml.data.orderList.push(res.data.data.data[List])
          
        }

        var a = hml.data.orderList
     
        hml.setData({
          orderList : a,
          Load:false
        })
      
      },
      fail:function(res){
        
      }
    })
  }
})