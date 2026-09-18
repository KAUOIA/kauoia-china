/* ===========================================================
   通知公告数据 (Notice data)
   -----------------------------------------------------------
   添加新通知（最新的放在数组最前面）：
     1. 文章图片放到  notices/images/   例: inform20.webp
     2. 缩略图放到    notices/thumbs/   例: inform20.webp
        （从文章里挑一张照片即可，比例不限，宽 600px 以内；没有可省略 thumb）
     3. 在下面数组最前面加一项，只写文件名，不用写文件夹：
   {
     src:      "inform20.webp",
     thumb:    "inform20.webp",
     title:    "标题",
     date:     "YYYY-MM-DD",
     tag:      "校内新闻" 或 "信息公告",
     tagClass: "tag-blue"(校内新闻) 或 "tag-gold"(信息公告)
   },
   注意：每项之间要有逗号，文字要用英文双引号 "..."
   -----------------------------------------------------------
   [한국어] 통지공고 데이터

   새 공고 추가하기 (최신 공고를 배열 맨 위에 넣습니다):
     1. 기사 이미지를 notices/images/ 에 올립니다.   예: inform20.webp
     2. 썸네일을 notices/thumbs/ 에 올립니다.        예: inform20.webp
        (기사 속 사진 한 장이면 됩니다. 비율은 상관없고 가로 600px 이내 권장.
         준비가 어려우면 thumb 줄을 빼도 됩니다 — 기사 이미지 윗부분이 대신 보입니다)
     3. 아래 배열 맨 위에 한 항목을 추가합니다. 폴더 없이 파일명만 적습니다.
   {
     src:      "inform20.webp",   // 기사 이미지 파일명
     thumb:    "inform20.webp",   // 썸네일 파일명
     title:    "제목 (중국어)",
     date:     "YYYY-MM-DD",
     tag:      "校内新闻"(교내소식) 또는 "信息公告"(안내공고),
     tagClass: "tag-blue"(校内新闻) 또는 "tag-gold"(信息公告)
   },
   주의: 항목과 항목 사이에는 쉼표가 있어야 하고, 따옴표는 영문 큰따옴표 "..." 를 씁니다.
   =========================================================== */

export const notices = [
    {
        src: "inform20.webp",
        thumb: "inform20.webp",
        title: "与乌兹别克斯坦交通部签署政府层面MOU",
        date: "2026-09-16",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform19.webp",
        thumb: "inform19.webp",
        title: "乌兹别克斯坦交通部长带团访问",
        date: "2026-09-14",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform18.webp",
        thumb: "inform18.webp",
        title: "第83届高阳经济论x韩国航空大学举办",
        date: "2026-09-11",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform16.webp",
        thumb: "inform16.webp",
        title: "驻韩坦桑尼亚大使一行访问我校",
        date: "2026-09-04",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform15.webp",
        thumb: "inform15.webp",
        title: "圆满举办深圳职业技术大学“韩国科技创新研学”",
        date: "2026-08-26",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform17.webp",
        thumb: "inform17.webp",
        title: "2025年度下学期学位授予典礼圆满举行",
        date: "2026-08-20",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform14.webp",
        thumb: "inform14.webp",
        title: "与国土资源部举行“全球航空政策研修项目政策座谈会”",
        date: "2026-08-11",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform13.webp",
        thumb: "inform13.webp",
        title: "与韩国UAM协会签署“UAM生态体系建设”业务合作协议",
        date: "2026-07-30",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform12.webp",
        thumb: "inform12.webp",
        title: "2026-2学期国际学伴招募通知",
        date: "2026-07-28",
        tag: "信息公告",
        tagClass: "tag-gold"
    },
    {
        src: "inform10.webp",
        thumb: "inform10.webp",
        title: "外国留学生生活馆(宿舍)运营相关事项说明",
        date: "2026-07-28",
        tag: "信息公告",
        tagClass: "tag-gold"
    },
    {
        src: "inform11.webp",
        thumb: "inform11.webp",
        title: "2026学年第二学期宿舍申请指南",
        date: "2026-07-24",
        tag: "信息公告",
        tagClass: "tag-gold"
    },
    {
        src: "inform9.webp",
        thumb: "inform9.webp",
        title: "与国土交通部举办“2026韩国航空安全论坛暨第31届航空安全研讨会”",
        date: "2026-07-15",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform8.webp",
        thumb: "inform8.webp",
        title: "与京畿道及高阳市议会议员当选人就地区发展合作方案展开座谈",
        date: "2026-06-26",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform1.webp",
        thumb: "inform1.webp",
        title: "休闲空间暑假期间暂停运营的通知",
        date: "2026-06-25",
        tag: "信息公告",
        tagClass: "tag-gold"
    },
    {
        src: "inform2.webp",
        thumb: "inform2.webp",
        title: "预防毒品相关教育信息",
        date: "2026-06-22",
        tag: "信息公告",
        tagClass: "tag-gold"
    },
    {
        src: "inform3.webp",
        thumb: "inform3.webp",
        title: "与郑州航空工业管理学院签署MOU，深化航空领域国际合作",
        date: "2026-06-11",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform4.webp",
        thumb: "inform4.webp",
        title: "越南军事技术大学校长一行访问我校",
        date: "2026-05-26",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform5.webp",
        thumb: "inform5.webp",
        title: "与乌兹别克斯坦政府合作建设中亚航空人才培养枢纽",
        date: "2026-05-07",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform7.webp",
        thumb: "inform7.webp",
        title: "与乌兹别克斯坦布哈拉创新教育大学签署合作协议",
        date: "2026-05-04",
        tag: "校内新闻",
        tagClass: "tag-blue"
    },
    {
        src: "inform6.webp",
        thumb: "inform6.webp",
        title: "国家遗产夜活动邀请",
        date: "2026-04-28",
        tag: "信息公告",
        tagClass: "tag-gold"
    }
];
