import IArticle from '../../interfaces/ArticleInterface';
import placeholder from '../../assets/placeholder.png';
import './Card.css';

export interface IArticleCategory {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
}

const CardArticle = (props: { article: IArticle }) => {
  const { article } = props;

  const date = new Date(article.publishedAt);
  const frDate = date.toLocaleDateString('fr-FR');

  // const likeBtn = document.getElementById('like') as HTMLButtonElement | null;

  return (
    <div className='flex justify-center'>
      <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-md card-article dark:bg-gray-800 dark:border-gray-700'>
        <img
          className='h-64 rounded-t-lg'
          src={article.urlToImage ? article.urlToImage : placeholder}
          alt={article.title}
        />

        <div className='p-5'>
          <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {article.title}
          </h5>

          {article.author ? (
            <div className='h-8 my-6 text-gray-500'>
              autheur de la news :{' '}
              <span className='text-sky-600'>{article.author}</span>
            </div>
          ) : (
            <div className='h-8 my-6 bg-transparent'></div>
          )}

          {article.description ? (
            <p className='h-24 mb-3 font-normal text-gray-700 dark:text-gray-400'>
              {article.description}
            </p>
          ) : (
            <p className='h-24 mb-3 bg-transparent'></p>
          )}

          <p className='h-8 mt-6 text-gray-500'>
            source :
            <span className='ml-2 text-sky-600'>{article.source.name}</span>
          </p>

          <h4 className='h-8 mb-3 text-gray-500'>
            Date : <span className='ml-2 text-sky-800'> {frDate}</span>
          </h4>

          <div className='flex justify-center w-20 h-10 bg-blue-700 rounded-lg ottom-0 hover:bg-blue-800 cardImg'>
            <a
              href={article.url}
              target='_blank'
              rel='noreferrer'
              className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white absol'
            >
              link
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardArticle;
