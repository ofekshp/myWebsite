import axios, { AxiosError, AxiosResponse, CanceledError } from "axios";
import { Article, Data, getData } from "../../../services/DrComputer/news-service";
import "./ArticlePage.css"
import { useEffect, useState } from "react";
import NavBarMain from '../../NavBar/NavBar';

function ArticlePage() {
    const [isLoading,setIsLoading]=useState(false)
    const [error, setError] = useState<string|null>(null);
    const [articles,setArticles]=useState<Article[]>([])
    useEffect(() => {
        try {
          
          setIsLoading(true);
             getData().then(async (res)=>{
              const response: AxiosResponse<Data>|AxiosError=  res;
              console.log(response.status)
              if(axios.isAxiosError(response))
                setError("Couldn't fetch articles")
              else
              setArticles(response.data.articles)
            });
        } catch (error) {
          
            if (axios.isCancel(error)||error instanceof CanceledError ) {
              setIsLoading(false);
              return 
            }
            else {
              setError("Error fetching posts")
                console.error('Error fetching articles:', error);
            }
        }
        finally {
          setIsLoading(false);
        }
  }, []);

    function handlePostClick(url: string): void {
        window.open(url, '_blank');
    }

  return (
    <div className="news-page">
      <NavBarMain />
      
      <h1>All news</h1>
      {isLoading ? (
        <div className="spinner-border text-primary" />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : articles?.length === 0 ? (
        <div className="no-articles"><h3>No posts have been uploaded.</h3></div>
      ) : (
        
        <div className="articles-list">
          {articles.map((article, index) => (
            <div key={index} className="article-item" onClick={() => handlePostClick(article.url)}>
              <h2>{article.title}</h2>
              <p>Author: {article.author}</p>
              <p>{article.description}</p>
              {article.urlToImage && (<img src={article.urlToImage} alt="Article Image" />)}
            </div>
          ))}
          </div>
      )}
    </div>
  );
}
import NavBar from "../NavBar/NavBarPage";
  export default ArticlePage



