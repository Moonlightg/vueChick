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

// 获取小鸡皮肤数据
export const getUserSkins = () => ajax.getData('/api/getUserSkins');

// 初始化当前用户小鸡皮肤数据
export const infoUserSkins = () => ajax.postData('/api/infoUserSkins');

// 购买皮肤
export const postBdySkin = (params) => ajax.postData('/api/postBdySkin',params);

// 使用皮肤
export const postUseSkin = (params) => ajax.postData('/api/postUseSkin',params);

// 解锁商品
export const postUnlock = (params) => ajax.postData('/api/unlock',params);

// 首次购买商品 
export const postFirstClosingGood = (params) => ajax.postData('/api/firstClosingGood',params);
// 购买商品
export const postClosingGood = (params) => ajax.postData('/api/closingGood',params);

// 出售物品
export const postSellFood = (params) => ajax.postData('/api/sellFood',params);

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

// 添加动态日志
export const addLog = (params) => ajax.postData('/api/addLog',params);

// 获取动态日志
export const getLog = () => ajax.getData('/api/getLog');

// 获取好友列表
export const getFriends = () => ajax.getData('/api/getFriends');

// 更换用户头像
export const postProfile = (params) => ajax.postData('/api/postProfile',params);

// 修改用户名称
export const setName = (params) => ajax.postData('/api/setName',params);
