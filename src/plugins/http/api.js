import ajax from './http'
// 请求方法

// 获取商品列表
export const getGoods = () => ajax.getData('/api/getGoods');

// 获取当前用户商品列表
export const getUserGoods = (params) => ajax.getData('/api/getUserGoods',params);

// 解锁商品
export const postUnlock = (params) => ajax.postData('/api/unlock',params);

// 购买商品
export const postClosingGood = (params) => ajax.postData('/api/closingGood',params);