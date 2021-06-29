export interface RSSArticleItem {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
}

export interface RSSFeed {
  url: string;
  name: string;
}

export interface CurrentRSSFeed extends RSSFeed {
  articles: RSSArticleItem[];
}
