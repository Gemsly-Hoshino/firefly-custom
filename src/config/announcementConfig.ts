import type { AnnouncementConfig } from "../types/announcementConfig";

export const announcementConfig: AnnouncementConfig = {
	// 公告标题，留空则走i18n默认标题
	title: "",

	// 公告内容
	content: "本站已对 隐私政策 与 服务条款 进行了更新与修订。继续使用即代表您同意这些协议。",

	// 是否允许用户关闭公告
	closable: true,

	link: {
		// 启用链接
		enable: false,
		// 链接文本
		text: "隐私政策",
		// 链接 URL
		url: "https://docs.gemslyho.org/privacy-policy.html",
		// 内部链接
		external: true,
	},
};
