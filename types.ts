export enum ArticleCategory {
  NEWS = 'News',
  REVIEW = 'Review',
  GAMIFICATION = 'Gamification',
  EDITORIAL = 'Editorial',
  PODCAST = 'Podcast Show Notes'
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  category: ArticleCategory;
  imageUrl: string;
  seoScore?: number;
  tags?: string[];
  isMigrated?: boolean; // Flag for Medium migrated content
}

export interface PodcastEpisode {
  id: string;
  title: string;
  episodeNumber: number;
  description: string;
  duration: string;
  date: string;
  guest?: string;
}