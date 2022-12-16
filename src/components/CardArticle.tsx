import IArticle from '../interfaces/ArticleInterface';
import IFavorite from '../interfaces/FavoriteInterface';
import placeholder from '../assets/placeholder.png';
import './Card.css';

const CardArticle = (props: { article: IArticle }) => {
  const { article } = props;

  const likeBtn = document.getElementById('like') as HTMLButtonElement | null;

  // const likeArticle = () => {
  //   if (like) {
  //     // ? === optional chaning operator => Object is possibly 'null'
  //     likeBtn?.setAttribute('disabled', '');
  //   }
  // };

  // likeBtn?.removeAttribute('disabled');

  return (
    <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700'>
      <img
        className='rounded-t-lg'
        src={article.urlToImage ? article.urlToImage : placeholder}
        alt={article.title}
      />

      <div className='p-5'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {article.title}
        </h5>

        <div className='mb-2'>{article.author}</div>

        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {article.description}
        </p>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {article.source.name}
        </p>

        <h4 className='mb-3'>Date : {article.publishedAt}</h4>

        <div className='flex justify-center w-20 bg-blue-700 rounded-lg hover:bg-blue-800 cardImg'>
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
  );
};

export default CardArticle;
