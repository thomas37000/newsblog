export default interface IArticle {
  author: string;
  content: string | null;
  description: string;
  publishedAt: string;
  source: {
    id: number | null;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}
