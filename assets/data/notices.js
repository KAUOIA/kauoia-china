/* ===========================================================
   通知公告数据 (Notice data)
   -----------------------------------------------------------
   添加新通知：在数组最前面（最新的在最上面）追加一个对象即可。
   {
     src:      "详情大图文件名",
     thumb:    "列表缩略图文件名",
     title:    "标题",
     date:     "YYYY-MM-DD",
     tag:      "校内新闻" 或 "信息公告",
     tagClass: "tag-blue"(校内新闻) 或 "tag-gold"(信息公告)
   }
   =========================================================== */

export const notices = [
    {
        src: "inform19.png",
        thumb: "inform19.png",
        title: "乌兹别克斯坦交通部长带团访问",
        date: "2026-09-14",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform18.png",
        thumb: "inform18.png",
        title: "第83届高阳经济论x韩国航空大学举办",
        date: "2026-09-11",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform16.png",
        thumb: "inform16.png",
        title: "驻韩坦桑尼亚大使一行访问我校",
        date: "2026-09-04",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform15.png",
        thumb: "inform15.png",
        title: "圆满举办深圳职业技术大学“韩国科技创新研学”",
        date: "2026-08-26",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform17.png",
        thumb: "inform17.png",
        title: "2025年度下学期学位授予典礼圆满举行",
        date: "2026-08-20",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform14.png",
        thumb: "inform14.png",
        title: "与国土资源部举行“全球航空政策研修项目政策座谈会”",
        date: "2026-08-11",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform13.png",
        thumb: "inform13.png",
        title: "与韩国UAM协会签署“UAM生态体系建设”业务合作协议",
        date: "2026-07-30",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform12.png",
        thumb: "inform12.png",
        title: "2026-2学期国际学伴招募通知",
        date: "2026-07-28",
        tag: "信息公告",
        tagClass: "tag-gold"
    },
    {
        src: "inform10.png",
        thumb: "inform10.png",
        title: "外国留学生生活馆(宿舍)运营相关事项说明",
        date: "2026-07-28",
        tag: "信息公告",
        tagClass: "tag-gold"
    },
    {
        src: "inform11.png",
        thumb: "inform11.png",
        title: "2026学年第二学期宿舍申请指南",
        date: "2026-07-24",
        tag: "信息公告",
        tagClass: "tag-gold"
    },
    {
        src: "inform9.png",
        thumb: "inform9.png",
        title: "与国土交通部举办“2026韩国航空安全论坛暨第31届航空安全研讨会”",
        date: "2026-07-15",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform8.png",
        thumb: "inform8.png",
        title: "与京畿道及高阳市议会议员当选人就地区发展合作方案展开座谈",
        date: "2026-06-26",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform1.jpg",
        thumb: "inform1.jpg",
        title: "休闲空间暑假期间暂停运营的通知",
        date: "2026-06-25",
        tag: "信息公告",
        tagClass: "tag-gold"
    },
    {
        src: "inform2.jpg",
        thumb: "inform2.jpg",
        title: "预防毒品相关教育信息",
        date: "2026-06-22",
        tag: "信息公告",
        tagClass: "tag-gold"
    },
    {
        src: "inform3.png",
        thumb: "inform3.png",
        title: "与郑州航空工业管理学院签署MOU，深化航空领域国际合作",
        date: "2026-06-11",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform4.png",
        thumb: "inform4.png",
        title: "越南军事技术大学校长一行访问我校",
        date: "2026-05-26",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform5.png",
        thumb: "inform5.png",
        title: "与乌兹别克斯坦政府合作建设中亚航空人才培养枢纽",
        date: "2026-05-07",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform7.png",
        thumb: "inform7.png",
        title: "与乌兹别克斯坦布哈拉创新教育大学签署合作协议",
        date: "2026-05-04",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform6.png",
        thumb: "inform6.png",
        title: "国家遗产夜活动邀请",
        date: "2026-04-28",
        tag: "信息公告",
        tagClass: "tag-gold"
    }
    // 后续添加更多通知时，只需在此数组中追加对象即可
    // 格式：{ src: "图片文件名", thumb: "缩略图文件名", title: "标题", date: "日期", tag: "标签", tagClass: "标签样式" }
];
