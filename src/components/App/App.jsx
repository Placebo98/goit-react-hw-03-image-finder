import { Component } from "react";
import Notiflix from 'notiflix';
import { Notify } from "notiflix";
import { fetchImages } from "components/api";
import { ImageGallery } from "components/ImageGallery/ImageGallery";



export class App extends Component { 
  state = {
    query: '',
    images: [],
    page: 1, 
    loading: false,
  }

  changeQuery = (newQuery) => {
    if (newQuery === this.state.query) {
      return Notiflix.Notify.failure('Потрібні параметри пошуку')
    }
    this.setState({
      query: `${Date.now()}/${newQuery}`,
      images: [], 
      page: 1, 
    })
  }
  
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      const updateQuery = this.state.query.slice(this.state.query.indexOf('/') + 1)
      // HTTP запрос за query
      // this/setState({images: результат запроса })
       this.setState({loading: true})

      const images = await fetchImages();
      this.setState({ images, loading: false, })
      console.log(images);

    }
  }


  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))
    
   };


  render() {
    // const { query, images, page, loading } = this.state;
    return <div>
      <div>
        <form onSubmit={(evt) => {
          evt.preventDefault(); this.changeQuery(evt.target.elements.query.value);
          evt.target.reset()
        }}>
          <input type='text' name="query" />
          <button type="submit">Submit</button>
      </form>
      </div>
      <div>
        <ImageGallery images={this.state.images} />
      </div>
      <div>
        <button onClick={this.handleLoadMore}>Load more</button>
      </div>
    </div>
  }
}
