/* ===========================================================
   通知公告数据 (Notice data)
   -----------------------------------------------------------
   添加新通知（最新的放在数组最前面）：
     1. 文章图片放到  notices/images/   例: inform20.png
     2. 缩略图放到    notices/thumbs/   例: inform20.jpg
        （从文章里挑一张照片即可，比例不限，宽 600px 以内；没有可省略 thumb）
     3. 在下面数组最前面加一项，只写文件名，不用写文件夹：
   {
     src:      "inform20.png",
     thumb:    "inform20.jpg",
     title:    "标题",
     date:     "YYYY-MM-DD",
     tag:      "校内新闻" 或 "信息公告",
     tagClass: "tag-blue"(校内新闻) 或 "tag-gold"(信息公告)
   },
   注意：每项之间要有逗号，文字要用英文双引号 "..."
   =========================================================== */

export const notices = [
    {
        src: "inform19.png",
        thumb: "inform19.jpg",
        title: "乌兹别克斯坦交通部长带团访问",
        date: "2026-09-14",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform18.png",
        thumb: "inform18.jpg",
        title: "第83届高阳经济论x韩国航空大学举办",
        date: "2026-09-11",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform16.png",
        thumb: "inform16.jpg",
        title: "驻韩坦桑尼亚大使一行访问我校",
        date: "2026-09-04",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform15.png",
        thumb: "inform15.jpg",
        title: "圆满举办深圳职业技术大学“韩国科技创新研学”",
        date: "2026-08-26",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform17.png",
        thumb: "inform17.jpg",
        title: "2025年度下学期学位授予典礼圆满举行",
        date: "2026-08-20",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform14.png",
        thumb: "inform14.jpg",
        title: "与国土资源部举行“全球航空政策研修项目政策座谈会”",
        date: "2026-08-11",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform13.png",
        thumb: "inform13.jpg",
        title: "与韩国UAM协会签署“UAM生态体系建设”业务合作协议",
        date: "2026-07-30",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform12.png",
        thumb: "inform12.jpg",
        title: "2026-2学期国际学伴招募通知",
        date: "2026-07-28",
        tag: "信息公告",
        tagClass: "tag-gold"
    },
    {
        src: "inform10.png",
        thumb: "inform10.jpg",
        title: "外国留学生生活馆(宿舍)运营相关事项说明",
        date: "2026-07-28",
        tag: "信息公告",
        tagClass: "tag-gold"
    },
    {
        src: "inform11.png",
        thumb: "inform11.jpg",
        title: "2026学年第二学期宿舍申请指南",
        date: "2026-07-24",
        tag: "信息公告",
        tagClass: "tag-gold"
    },
    {
        src: "inform9.png",
        thumb: "inform9.jpg",
        title: "与国土交通部举办“2026韩国航空安全论坛暨第31届航空安全研讨会”",
        date: "2026-07-15",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform8.png",
        thumb: "inform8.jpg",
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
        thumb: "inform3.jpg",
        title: "与郑州航空工业管理学院签署MOU，深化航空领域国际合作",
        date: "2026-06-11",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform4.png",
        thumb: "inform4.jpg",
        title: "越南军事技术大学校长一行访问我校",
        date: "2026-05-26",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform5.png",
        thumb: "inform5.jpg",
        title: "与乌兹别克斯坦政府合作建设中亚航空人才培养枢纽",
        date: "2026-05-07",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform7.png",
        thumb: "inform7.jpg",
        title: "与乌兹别克斯坦布哈拉创新教育大学签署合作协议",
        date: "2026-05-04",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform6.png",
        thumb: "inform6.jpg",
        title: "国家遗产夜活动邀请",
        date: "2026-04-28",
        tag: "信息公告",
        tagClass: "tag-gold"
    }
];
