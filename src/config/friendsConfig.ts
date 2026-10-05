import type { FriendLink, FriendsPageConfig } from "../types/friendsConfig";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 是否显示底部自定义内容（friends.mdx 中的内容）
	showCustomContent: true,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: true,

	// 是否开启随机排序配置，如果开启，就会忽略权重，构建时进行一次随机排序
	randomizeSort: false,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
	{
		title: "夏夜流萤",
		imgurl:
			"https://weavatar.com/avatar/d252655d40d6874417a720bad0a6c5f77f8f6a1fd2f882f8f338402dc37e4190?s=640",
		desc: "飞萤之火自无梦的长夜亮起，绽放在终竟的明天。",
		siteurl: "https://blog.cuteleaf.cn",
		tags: ["Blog"],
		weight: 8, // 权重，数字越大排序越靠前
		enabled: true, // 是否启用
	},
	{
		title: "二叉树树",
		imgurl: "https://q2.qlogo.cn/headimg_dl?dst_uin=2726730791&spec=0",
		desc: "Protect What You Love.",
		siteurl: "https://2x.nz",
		tags: ["Blog"],
		weight: 8,
		enabled: true,
	},
	{
        title: "TT清沫uk",
        imgurl: "https://ts1.tc.mm.bing.net/th/id/OIP-C.6WsD9caLSNQFhJOi77soRAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
        desc: "TT清沫ukの博客",
        siteurl: "https://ttquk.github.io",
        tags: ["Blog"], 
        weight: 8,
        enabled: true,
    },
	{
	"title": "MingBlog",
	"imgurl": "https://mingblog.site/icons/icon-512.png",
	"desc": "记录日常生活、城市影像、旅行与观察，以及认真看过、读过和听过的作品。",
	"siteurl": "https://mingblog.site",
	"tags": ["Blog"],
	"weight": 8,
	"enabled": true
	},
	{
	"title": "ねねこ小屋",
	"imgurl": "https://huinaihui.com/assets/nanako.jpg?v=2",
	"desc": "主记录创作的y2k风格个人网站",
	"siteurl": "https://huinaihui.com/",
	"tags": ["Blog"],
	"weight": 8,
	"enabled": true
	},
  {
    "title": "萌国ICP备案",
    "imgurl": "https://icp.gov.moe/images/gov.svg",
    "desc": "萌备20260010号",
    "siteurl": "https://icp.gov.moe/?keyword=20260010",
    "tags": ["Member"],
    "weight": 1,
    "enabled": true
  },
  {
    "title": "茶ICP备案",
    "imgurl": "https://icp.redcha.cn/favicon.ico",
    "desc": "茶备2025120255号",
    "siteurl": "https://icp.redcha.cn/beian/ICP-2025120255.html",
    "tags": ["Member"],
    "weight": 1,
    "enabled": true
  },
  {
    "title": "幸福ICP备案",
    "imgurl": "https://icp.felicity.land/favicon.ico",
    "desc": "幸备20250101号",
    "siteurl": "https://icp.felicity.land/id.php?keyword=20250101",
    "tags": ["Member"],
    "weight": 1,
    "enabled": true
  }
];

// 获取启用的友链并进行排序
export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
