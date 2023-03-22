export interface BlogType {
  id: number;
  title: string;
  url: string;
  createdAt: string | null;
  html: string;
  bodyText: string;
  tag: string[];
  authorAvatar: string;
  authorUrl: string;
  authorName: string;
}

export interface BlogTypeDetails {
  title: string;
  createdAt: string | null;
  authorAvatar: string;
  authorUrl: string;
  authorName: string;
  html: string;
}
