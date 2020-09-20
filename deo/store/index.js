import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import ajax from '../config/ajax'


Vue.use(Vuex)

const state = {
    level: '第一周', //活动周数
    itemNum: 1, // 第几题
    allTime: 0, //总共用时
    timer: '', //定时器
    itemDetail: [{
            "topic_id": 20,
            "active_topic_id": 4,
            "type": "ONE",
            "topic_name": "1",
            "active_id": 1,
            "active_title": "1.	1993年1月18日，联合国第47次大会通过了第193号决议，决定从1993年起，确定每年的_______定为“世界水日”。 考虑到“世界水日”和“中国水周”的主旨和内容基本相同，故从1994年起，“中国水周”的时间为每年________。",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 1,
                "topic_id": 20,
                "answer_name": "A、3月22日、3月22日至28日；",
                "is_standard_answer": 1
            }, {
                "topic_answer_id": 2,
                "topic_id": 20,
                "answer_name": "B、3月28日、3月28日至4月2日；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 3,
                "topic_id": 20,
                "answer_name": "C、6月8日、6月8日至15日；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 4,
                "topic_id": 20,
                "answer_name": "D、7月1日、7月1日至8日；",
                "is_standard_answer": 0
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目二",
            "active_id": 1,
            "active_title": "2.	2020年是第几届“世界水日”？第几届“中国水周”？",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 5,
                "topic_id": 21,
                "answer_name": "A、第二十一届、第二十三届；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 6,
                "topic_id": 21,
                "answer_name": "B、第二十三届、第三十三届；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 7,
                "topic_id": 21,
                "answer_name": "C、第二十八届、第二十八届；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 8,
                "topic_id": 21,
                "answer_name": "D、第二十八届、第三十三届；",
                "is_standard_answer": 1
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目三",
            "active_id": 1,
            "active_title": "3.	联合国确定“世界水日”的宣传主题是“Water and climate change（水与气候变化）”，中国纪念“世界水日”和“中国水周”活动的宣传主题是“坚持节水优先 建设幸福河湖”。上海的宣传主题是______。",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 9,
                "topic_id": 21,
                "answer_name": "A、“坚持节水减排 建设幸福河湖”；",
                "is_standard_answer": 1
            }, {
                "topic_answer_id": 10,
                "topic_id": 21,
                "answer_name": "B、“坚持节水优先 建设幸福河湖”；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 11,
                "topic_id": 21,
                "answer_name": "C、“坚持节水优先，强化水资源管理”；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 12,
                "topic_id": 21,
                "answer_name": "D、“实施国家节水行动，建设节水型社会”；",
                "is_standard_answer": 0
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目四",
            "active_id": 1,
            "active_title": "4.	我国将每年的_________所在的那一周定为全国城市“节水宣传周”。",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 13,
                "topic_id": 21,
                "answer_name": "A、3月25日；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 14,
                "topic_id": 21,
                "answer_name": "B、4月15日；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 15,
                "topic_id": 21,
                "answer_name": "C、4月25日；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 16,
                "topic_id": 21,
                "answer_name": "D、5月15日；",
                "is_standard_answer": 1
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目五",
            "active_id": 1,
            "active_title": "5.	我们赖以生存的地球是一个非常美丽的蓝色星球，其中仅有2.53%是淡水。而所有淡水资源中，可为人类所获取和使用的不足1%。这样一来是什么概念呢？假设地球上总水量有2台洗衣机（50L）那么多，淡水只有大概2.5L可乐瓶那么多，而能被我们获得和使用的仅有_________。",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 17,
                "topic_id": 21,
                "answer_name": "A、一调羹水（约0.01升）；",
                "is_standard_answer": 1
            }, {
                "topic_answer_id": 18,
                "topic_id": 21,
                "answer_name": "B、一马克杯水（约0.4升）；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 19,
                "topic_id": 21,
                "answer_name": "C、一水壶水（约2升）；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 20,
                "topic_id": 21,
                "answer_name": "D、一桶水（约40升）；",
                "is_standard_answer": 0
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目五",
            "active_id": 1,
            "active_title": "6.	在城市中，污水、雨水是采用一个管道系统来排除，或是采用两个各自独立的管道系统来排水，这种污水、雨水不同排除方式所形成的排水系统，称作排水系统的体制。下列哪些不属于城市排水设施呢？",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 21,
                "topic_id": 21,
                "answer_name": "A、排水管道和排水泵站；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 22,
                "topic_id": 21,
                "answer_name": "B、雨水口和检查井；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 23,
                "topic_id": 21,
                "answer_name": "C、污水处理厂和排放口；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 24,
                "topic_id": 21,
                "answer_name": "D、废弃水桶；",
                "is_standard_answer": 1
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目五",
            "active_id": 1,
            "active_title": "7.	它是排水管道的中途和终点，用于提升污水或雨水的构筑物及附属设施设备，它为城市防汛排水和污水输送起到关键作用。它是_________。",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 25,
                "topic_id": 21,
                "answer_name": "A、污水处理厂；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 26,
                "topic_id": 21,
                "answer_name": "B、检查井；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 27,
                "topic_id": 21,
                "answer_name": "C、排放口；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 28,
                "topic_id": 21,
                "answer_name": "D、排水泵站；",
                "is_standard_answer": 1
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目五",
            "active_id": 1,
            "active_title": "8.	下列哪种排水设施的处理方法是经过颗粒物去除及生化反应池，借助微生物的力量，借助微生物的力量把水里的污染物质吃掉，最后通过紫外线或加药进行消毒，达到国家规定的排放标准后，将水排入附近河道里的？",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 29,
                "topic_id": 21,
                "answer_name": "A、污水处理厂；",
                "is_standard_answer": 1
            }, {
                "topic_answer_id": 30,
                "topic_id": 21,
                "answer_name": "B、排水泵站；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 31,
                "topic_id": 21,
                "answer_name": "C、检查井；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 32,
                "topic_id": 21,
                "answer_name": "D、排放口；",
                "is_standard_answer": 0
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目五",
            "active_id": 1,
            "active_title": "9.	以下生活中节水不提倡的是（）。",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 33,
                "topic_id": 21,
                "answer_name": "A、用节水型洗衣机、节水淋浴喷头，可达到节水30％以上 ；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 34,
                "topic_id": 21,
                "answer_name": "B、淋浴代替盆浴；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 35,
                "topic_id": 21,
                "answer_name": "C、能瓶装水贴上标签，喝不完的瓶装水随身带走不丢弃；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 36,
                "topic_id": 21,
                "answer_name": "D、正在淋浴下洗澡，不关水龙头去接电话；",
                "is_standard_answer": 1
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目五",
            "active_id": 1,
            "active_title": "10.	节水型淋浴器与传统手持花洒比较，可以节约（）。",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 37,
                "topic_id": 21,
                "answer_name": "A、10％－20％ ；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 38,
                "topic_id": 21,
                "answer_name": "B、20％－30％；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 39,
                "topic_id": 21,
                "answer_name": "C、30％－70％；",
                "is_standard_answer": 1
            }, {
                "topic_answer_id": 40,
                "topic_id": 21,
                "answer_name": "D、70％－90％；",
                "is_standard_answer": 0
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目五",
            "active_id": 1,
            "active_title": "11.	下列生活排水方式中错误的是____。",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 41,
                "topic_id": 21,
                "answer_name": "A、将水与食用油混合后倒入厨房下水道；",
                "is_standard_answer": 1
            }, {
                "topic_answer_id": 42,
                "topic_id": 21,
                "answer_name": "B、将洗衣机装在有污水管道的阳台上；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 43,
                "topic_id": 21,
                "answer_name": "C、在清洗锅碗上的油污之前，用废布或旧报纸等进行擦拭；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 44,
                "topic_id": 21,
                "answer_name": "D、将烹饪时使用的热水，边冲凉水边倒入下水道，或者待冷却后再倒入（参考温度45℃以下）；",
                "is_standard_answer": 0
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目五",
            "active_id": 1,
            "active_title": "12.	保护排水设施是公民的责任和义务，也是保障水环境和自身安全的需要，发现损毁排水设施行为，应及时拨打12345市民热线或110报警电话。下列行为中正确的是____。",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 45,
                "topic_id": 21,
                "answer_name": "A、偷盗或损毁排水窨井盖、雨水篦子等；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 46,
                "topic_id": 21,
                "answer_name": "B、向雨水口、检查井和排水管道乱扔建筑垃圾、生活垃圾，倾倒化学液剂、施工泥浆、油脂、粪便等；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 47,
                "topic_id": 21,
                "answer_name": "C、占压排水井口或排水管道；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 48,
                "topic_id": 21,
                "answer_name": "D、发现道路窨井盖损坏，立即拨打市民热线；",
                "is_standard_answer": 1
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目五",
            "active_id": 1,
            "active_title": "13.	上海一共有四座水库，分别是青草沙水库、陈行水库、金泽水库和____。",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 49,
                "topic_id": 21,
                "answer_name": "A、南翔污水处理厂；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 50,
                "topic_id": 21,
                "answer_name": "B、杨树浦水厂；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 51,
                "topic_id": 21,
                "answer_name": "C、东区污水处理厂；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 52,
                "topic_id": 21,
                "answer_name": "D、东风西沙水库；",
                "is_standard_answer": 1
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目五",
            "active_id": 1,
            "active_title": "14.	在制水过程中，自来水厂的工作人员用于去除污垢的试剂是？",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 53,
                "topic_id": 21,
                "answer_name": "A、消毒剂；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 54,
                "topic_id": 21,
                "answer_name": "B、混凝剂；",
                "is_standard_answer": 1
            }, {
                "topic_answer_id": 55,
                "topic_id": 21,
                "answer_name": "C、酒精；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 56,
                "topic_id": 21,
                "answer_name": "D、洗洁剂；",
                "is_standard_answer": 0
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目五",
            "active_id": 1,
            "active_title": "15.	污水泵站主要在____过程发挥作用？",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 57,
                "topic_id": 21,
                "answer_name": "A、制水；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 58,
                "topic_id": 21,
                "answer_name": "B、污水；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 59,
                "topic_id": 21,
                "answer_name": "C、供水；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 60,
                "topic_id": 21,
                "answer_name": "D、排水；",
                "is_standard_answer": 1
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目五",
            "active_id": 1,
            "active_title": "16.	《知识延伸》：我国水资源总量居世界第__位。",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 61,
                "topic_id": 21,
                "answer_name": "A、20；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 62,
                "topic_id": 21,
                "answer_name": "B、6；",
                "is_standard_answer": 1
            }, {
                "topic_answer_id": 63,
                "topic_id": 21,
                "answer_name": "C、2；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 64,
                "topic_id": 21,
                "answer_name": "D、100；",
                "is_standard_answer": 0
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目五",
            "active_id": 1,
            "active_title": "17.	《知识延伸》：以下浇花方式不能做到节约用水的是____。",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 65,
                "topic_id": 21,
                "answer_name": "A、大量浇水；",
                "is_standard_answer": 1
            }, {
                "topic_answer_id": 66,
                "topic_id": 21,
                "answer_name": "B、浇花时尽量安排在早晨和晚上；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 67,
                "topic_id": 21,
                "answer_name": "C、根据花卉的习性，利用淘米水、洗菜水浇花；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 68,
                "topic_id": 21,
                "answer_name": "D、用鱼缸换出来的水浇花，因为这些水中有鱼的粪便，有促进花木生长；",
                "is_standard_answer": 0
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目五",
            "active_id": 1,
            "active_title": "18.	《知识延伸》：“节约用水”就是____。",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 69,
                "topic_id": 21,
                "answer_name": "A、限制用水；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 70,
                "topic_id": 21,
                "answer_name": "B、不用水；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 71,
                "topic_id": 21,
                "answer_name": "C、少用水；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 72,
                "topic_id": 21,
                "answer_name": "D、合理用水、高效用水；",
                "is_standard_answer": 1
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目五",
            "active_id": 1,
            "active_title": "19.	《知识延伸》：生产一张A4纸，要耗掉____升水。",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 73,
                "topic_id": 21,
                "answer_name": "A、2；",
                "is_standard_answer": 1
            }, {
                "topic_answer_id": 74,
                "topic_id": 21,
                "answer_name": "B、0.2；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 75,
                "topic_id": 21,
                "answer_name": "C、0.5；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 76,
                "topic_id": 21,
                "answer_name": "D、1；",
                "is_standard_answer": 0
            }]
        }, {
            "topic_id": 21,
            "active_topic_id": 4,
            "type": "MORE",
            "topic_name": "题目五",
            "active_id": 1,
            "active_title": "20.	《知识延伸》：党的十九大提出，要实施____。",
            "active_topic_phase": "第一周",
            "active_start_time": "1479139200",
            "active_end_time": "1482163200",
            "topic_answer": [{
                "topic_answer_id": 77,
                "topic_id": 21,
                "answer_name": "A、国家高效节水行动；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 78,
                "topic_id": 21,
                "answer_name": "B、国家节水行动；",
                "is_standard_answer": 1
            }, {
                "topic_answer_id": 79,
                "topic_id": 21,
                "answer_name": "C、国家农业节水行动；",
                "is_standard_answer": 0
            }, {
                "topic_answer_id": 80,
                "topic_id": 21,
                "answer_name": "D、国家工业节水行动；",
                "is_standard_answer": 0
            }]
        }


















    ],
    answerid: [], //答案id
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})
