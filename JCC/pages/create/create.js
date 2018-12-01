// pages/create/create.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    height:0,
    InfoView:0,
    showget:false,
    number:0,
    zongjia:0,
    Delivery:{
      name:"侯曼琳",
      phone:"15802458437",
      adress:"辽宁省沈阳市浑南新区长官屯辽宁省沈阳市浑南新区长官屯辽宁省沈阳市浑南新区长官屯辽宁省沈阳市浑南新区长官屯",
      totle:1244
    },
    checked:[
        {name:"货到付款",checked:true},
        { name: "门店支付", checked: false }

      ],
      ShopList:[{
        img:'../../staic/img/fail.png',
        name:'qinghuaci',
        pinpai:"品牌",num:1,
        lingshoujia:"801.00"
      },
        {
          img: '../../staic/img/fail.png',
          name: 'qinghuaci',
          pinpai:"品牌",num:1,
          lingshoujia: "801.00"
        },
        {
          img: '../../staic/img/fail.png',
          name: 'qinghuaci',
          pinpai:"品牌",num:1,
          lingshoujia: "801.00"
        },
        {
          img: '../../staic/img/fail.png',
          name: 'qinghuaci',
          pinpai:"品牌",num:1,
          lingshoujia: "801.00"
        },
        {
          img: '../../staic/img/fail.png',
          name: 'qinghuaci',
          pinpai:"品牌",num:1,
          lingshoujia: "801.00"
        },
        {
          img: '../../staic/img/fail.png',
          name: 'qinghuaci',
          pinpai:"品牌",num:1,
          lingshoujia: "801.00"
        },
        {
          img: '../../staic/img/fail.png',
          name: 'qinghuaci',
          pinpai:"品牌",num:1,
          lingshoujia: "801.00"
        },
        {
          img: '../../staic/img/fail.png',
          name: 'qinghuaci',
          pinpai:"品牌",num:1,
          lingshoujia: "801.00"
        },
        ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取屏幕高度
    var that = this;
    var ShopList = that.data.ShopList;
    that.getNumZong();
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height: res.windowHeight
        })
      },
    })
    // 设置NavBar文字
    wx.setNavigationBarTitle({
      title: '创建订单',
    }),
    this.setData({
      InfoView: 1
    })
  },
  scroll:function(e){
    if (this.data.showget && e.detail.deltaY > 0){
     this.setData({
       showget: false
     })
   }
  },
  scrollDown: function (e) {
    this.setData({
      showget:true
    })
  },
  //添加信息
  AddInfo:function(){
    this.setData({
      InfoView: 0
    })
  },
  // 输入信息 ：
  getInfo:function(Info){
    var Info = Info.detail.value
    var name = Info.name;
    var phone = Info.phoneNumber;
    var address = Info.address;
    this.data.Delivery.name = name;
    this.data.Delivery.phone = phone;
    this.data.Delivery.adress = address;
    this.setData({
      'Delivery.name':name,
      'Delivery.phone': phone,
      'Delivery.adress': address,
      InfoView:1
    })
  },
  // 扫码功能
  getShoppingInfo:function(){
    var that = this;
    wx.scanCode({
      onlyFromCamera:false,
      scanType: "barCode",
      success:function(res){
    
      },
      fail:function(res){
        wx.showToast({
          title: '用户取消',
          image: '',
          mask: true,
        })
      }
    })
  },
  
  
  //减去
  numminus:function(e){
    var index = e.currentTarget.dataset.index;
    var tapindex = this.data.ShopList;
    var thisnum = tapindex[index].num;
    for(var i = 0 ; i<tapindex.length; i++){
      if (thisnum <= 1){
        tapindex.splice(index,1);
        var tapindex1 = tapindex;
        this.setData({
          "ShopList": tapindex1
        })
      }else{
        var thisnum2 = thisnum-1;
        tapindex[index].num = thisnum2;
        this.setData({
          "ShopList": tapindex
        });
        break;
      }
    }
    this.getNumZong();
  },
  // 加
  numadd: function (e) {
    
    var index = e.currentTarget.dataset.index;
    var tapindex = this.data.ShopList;
    for (var i = 0; i < tapindex.length; i++) {
      var thisnum = tapindex[index].num;
        var thisnum2 = thisnum + 1;
        tapindex[index].num = thisnum2;
        this.setData({
          "ShopList": tapindex
        });
        
        break;
    }
    this.getNumZong();
  },
  getNumZong:function(){
    var that = this;
    var num = that.data.ShopList
    var numLength = that.data.ShopList.length;
    var zongjia = 0;
    for (var i = 0; i < numLength;i++){
      var num1 = parseFloat(num[i].lingshoujia)
      var shopnumber = parseInt(num[i].num);
      num1 = num[i].lingshoujia * shopnumber
      zongjia = parseFloat(zongjia)
      zongjia += num1
    }
    zongjia = parseFloat(zongjia.toFixed(2))
    this.setData({
      number: numLength,
      zongjia:zongjia
    })
  }
})