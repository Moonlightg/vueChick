# vue小鸡 前端工程
[前往后端工程](https://github.com/Moonlightg/vueChickServer).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
## 因为热爱,所以制作(慢慢雕琢)
## 每天能睁开眼睛,就坚持提交几行垃圾代码(请多指教)


## 接口列表
| 接口        | 类型    | 描述    |
| --------   | ----: | :----:  |
| api/register|post|注册|
| api/login   |post|登录|
| api/getChick   |get|获取用户小鸡状态|
| api/postChick  |post|更新用户小鸡信息|
| api/postUser  |post|更新用户资料|
| api/getGoods   |get|获取默认商品列表|
| api/getUserGoods|get|获取当前用户商品列表|
| api/getUserFoods|get|获取用户背包食品列表|
| api/getUserSkins|get|获取小鸡皮肤数据|
| api/infoUserSkins|post|初始化当前用户小鸡皮肤数据|
| api/postBdySkin|post|购买小鸡皮肤|
| api/postUseSkin|post|使用小鸡皮肤|
| api/unlock|post|解锁商品|
| api/firstClosingGood|post|首次购买某个商品|
| api/closingGood|post|购买商品|
| api/sellFood|post|出售物品|
| api/feeding|post|投喂食物|
| api/postTasks|post|初始化每日任务|
| api/postReceiveTask|post|领取任务奖励|
| api/addTaskCount|post|增加任务进度次数|
| api/postEgg|post|收获鸡蛋(物品)|
| api/postEggNum|post|收获鸡蛋(总产量),更新小鸡信息|
| api/addLog|post|添加动态日志|
| api/getLog|get|获取动态日志|
| api/getFriends|get|获取好友列表|
| api/setCurrUser|post|设置当前好友资料|
| api/postProfile|post|更换用户头像|
| api/deductionFood|post|扣除物品|
| api/setName|post|修改用户名称|