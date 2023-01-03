export default interface IArticle {
  author: string;
  content: string | null;
  description: string;
  publishedAt: string;
  source: Source;
  title: string;
  url: string;
  urlToImage: string;
}

export interface Source {
  id: number | null;
  name: string;
}