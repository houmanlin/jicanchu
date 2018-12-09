//var ip = "http://test_api.jicanchu.net/api/";

var ip = "https://api.jicanchu.net/api/";
var config = {
  ip,
  getList: `${ip}find-orders`,     //获取订单列表
  createOrder: `${ip}create-order`,//创建订单
  getOrderInfo: `${ip}find-order-with-goods`,//获取订单性情
  cancel: `${ip}delete-order`,//取消订单
  warehouse: `${ip}find-warehouse-by-admin`,//仓库地址
  bank: `${ip}find-bank-by-admin`,//获取支付方式
  goodsInfo: `${ip}find-goods-by-barcode`,//获取产品信息
  getOpenid: `${ip}token`,    //获取Token
  getUserPhone: `${ip}find-users`,   //获取用户电话号
  bindopenid: `${ip}bind-open-id`     //绑定openID
};
module.exports = config
