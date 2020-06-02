import ajax from './http'
// 请求方法

// 获取小鸡chick状态
export const getChick = () => ajax.getData('/api/getChick');

// 更新小鸡chick状态
export const postChick = (params) => ajax.postData('/api/postChick',params);

// 获取商品列表
export const getGoods = () => ajax.getData('/api/getGoods');

// 获取当前用户商品列表
export const getUserGoods = (params) => ajax.getData('/api/getUserGoods',params);

// 获取当前用户背包食物列表
export const getUserFoods = () => ajax.getData('/api/getUserFoods');

// 解锁商品
export const postUnlock = (params) => ajax.postData('/api/unlock',params);

// 购买商品
export const postClosingGood = (params) => ajax.postData('/api/closingGood',params);

// 投喂食物
export const postFeeding = (params) => ajax.postData('/api/feeding',params);

// 初始化每日任务
export const postTasks = () => ajax.postData('/api/postTasks');

// 领取任务奖励
export const postReceiveTask = (params) => ajax.postData('/api/postReceiveTask',params);

// 添加任务进度次数
export const addTaskCount = (params) => ajax.postData('/api/addTaskCount',params);

// 收获鸡蛋(物品)
export const postEgg = (params) => ajax.postData('/api/postEgg',params);

// 收获鸡蛋(总产量),更新小鸡信息
export const postEggNum = (params) => ajax.postData('/api/postEggNum',params);