export interface Story {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  publishedAt: string;
  readTime: number;
  likes?: number;
  views?: number;
}

export interface StoryFormData {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
}