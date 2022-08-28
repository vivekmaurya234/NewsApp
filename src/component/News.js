import React, { Component } from 'react'
import NewsItem from './NewsItem'


export class News extends Component {
  

  constructor(){
    super();
   // console.log("Hello i am constructor");
    this.state ={
      article: [],
      loading : false,
      page : 1,
      pageSize : 20,
      tp: 0,
     
      // totalPages : Math.ceil(this.state.totalResults/this.state.pageSize)
    }
  }
  async componentDidMount(){
   let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=a58fb76402174ea791792a4c7f70f8f3&page=${this.state.page}&pageSize=${this.state.pageSize}`;
   let data = await fetch(url);
   let parsedData = await data.json();

   this.setState({article: parsedData.articles,
    totalResults : parsedData.totalResults,
    
  })
  
  }
  previousBtn = async ()=>{
     
    
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=a58fb76402174ea791792a4c7f70f8f3&page=${this.state.page-1}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({article: parsedData.articles,
    page: this.state.page+-1
    })
  }
  nextBtn = async () =>{
    if(Math.ceil(this.state.totalResults/this.state.pageSize)>this.state.page){
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=a58fb76402174ea791792a4c7f70f8f3&page=${this.state.page+1}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({article: parsedData.articles,
    page: this.state.page+1
    }) 
    }

     
  }

  render(){
  let defaultImg = "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg";
 let tp = Math.ceil(this.state.totalResults/this.state.pageSize)  
  return (
      <div className='container my-2'>
       
        <h2>Top Headlines</h2>
        <h>Total Articles :{this.state.totalResults} </h>
        <h>Total Pages :{tp} </h>
        <div className='row'>
        {this.state.article.map((el)=>{
            return <div className='col-md-4' key={el.url}>
                <NewsItem   title ={el.title? el.title.slice(1,45):""} description={el.description?el.description.slice(0,85):""}  imageUrl={el.urlToImage ? el.urlToImage: defaultImg} newsUrl={el.url}></NewsItem>
            </div> 
        })}
              
        </div>
        <div className='container d-flex justify-content-between my-5'>
        <button type="button" disabled ={this.state.page<=1?true:false} className="btn btn-dark mx-5" onClick={this.previousBtn}>	&larr; Previous</button>
        <h1>"Page number is "{this.state.page}</h1>
        <button type="button" disabled ={this.state.page==tp ? true: false} className="btn btn-dark mx-5"onClick={this.nextBtn}>Next 	&rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
