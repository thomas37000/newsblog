## demo

https://main--newsblog-typescript.netlify.app/

# newsblog

A blog where you can have informations about : 

 - weather report
 - real-time cryptocurrency prices
 - the ranking of the best films by popularity

 ## Run Locally

Clone the project

```bash
  git clone https://github.com/thomas37000/newsblog
```

Go to the project directory

```bash
  cd newsblog
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## API themoviedb

#### Get all movies by popularity

```http
 https://api.themoviedb.org/3/discover/movie/popular?api_key=${API_MOVIE_KEY}&language=${language}&sort_by=${popularity}&include_adult=false&include_video=false&page=${pagesShow}&with_watch_monetization_types=${monetisation}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `API_MOVIE_KEY` | `string` | **Required**. Your API key |
| `language` | `string` |**fr** for France,  **en-US** for English|
| `sort_by` | `string` |**popularity** filter|

#### Get image in movie Card

```http
export const ImgMovieApi= "https://image.tmdb.org/t/p/w1280"
```
```http
 <img src={ImgMovieApi + movie.backdrop_path} alt={movie.title} />
 ```

## API coingecko

#### Get all coins

```http
  GET https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&page=1&sparkline=false
```

#### Get coin detail

```http
  GET https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&sparkline=false
```
## API openweathermap

#### Get all cities

```http
https://api.openweathermap.org/data/2.5/weather
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `API_WEATHER_KEY` | `string` | **Required**. Your API key |

#### Get one city
Here for exemple i get the weather of my city "Nantes"

```http
https://api.openweathermap.org/data/2.5/weather?q=Nantes&appid=${API_WEATHER_KEY}&units=metric
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `API_WEATHER_KEY` | `string` | **Required**. Your API key |

## API newsapi (worls only in Localhost)
#### must paid if you want to build https://newsapi.org/pricing

#### Get all news
```http
https://newsapi.org/v2/top-headlines?country=fr&category=entertainment&apiKey=${API_KEY}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `country` | `string` | **fr** - for France|
| `category` | `string` | **entertainment** for exemple |
| `API_KEY` | `string` | **Required**. Your API key |

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://thomas-chalanson-react-portfolio.netlify.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/thomas-chalanson/)
