import React from 'react';
import MyGifs from './components/gifs.jsx'
import MyNavBar from './components/navbar.jsx'

import './style/App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      favorites: {},
      gifDisplay: 'flex',
      errorDisplay: 'none'
    }

    this.getSearchTerm = this.getSearchTerm.bind(this);
    this.makeFavorite = this.makeFavorite.bind(this);
    this.showErrorScreen = this.showErrorScreen.bind(this);
  }

  componentWillMount() {
  }

  //check if there are any favorites stored locally
  componentDidMount() {
    if(localStorage.favorites){
      this.setState({favorites: JSON.parse(localStorage.favorites)})
    }
  }

  //retrieve search term from search bar for MyGifs components
  getSearchTerm = (searchTerm) => {
    console.log("search term: ", searchTerm);
    this.setState({searchTerm: searchTerm, gifDisplay: 'flex', errorDisplay: 'none'})
  }

  //called when an image is clicked on the screen
  makeFavorite = (gif, key) => {
      if ((!this.state.favorites[key])){
        var newFavorites = this.state.favorites;
        newFavorites[key] = gif;
        this.setState({favorites: newFavorites});
      }
    }

  //hide gifs div and display Kanye shrugging his shoulders
  showErrorScreen() {
      this.setState({gifDisplay: 'none', errorDisplay: 'flex'})
  }



  render() {
    return (
      <div className="App">
        <div className="navbar">
          <MyNavBar callBack={this.getSearchTerm} favorites={this.state.favorites} unfavorite={this.makeFavorite}/>
        </div>
        <div className="gifs" style={{display: this.state.gifDisplay}} >
          <MyGifs
            searchTerm={this.state.searchTerm}
            makeFavorite={this.makeFavorite}
            showErrorScreen={this.showErrorScreen}
          />
        </div>
        <div className="error-screen" style={{display: this.state.errorDisplay}}>
          <h1>Oops!... Try searching something else</h1>
          <img className='error-gif' alt='error-gif' src='https://media.giphy.com/media/14tvbepZ8vhU40/giphy.gif'></img>
        </div>
      </div>
    );
  }
}

export default App;
