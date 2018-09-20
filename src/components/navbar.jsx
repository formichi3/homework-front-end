import React from 'react';
import MySearchBar from './searchBar'
import MyButtons from './buttons'

import '../style/Navbar.css'

export default class MyNavBar extends React.Component {

  constructor() {
    super();
    this.state = {
      text: '',
      urls: [],
      favorites: {}
    }
    this.handleUnfavorite = this.handleUnfavorite.bind(this);
  }

  handleChange(event) {
    this.setState({text: event.target.value})
  };

  //add gif to favorites when received form MyGifs component
  componentWillReceiveProps(nextProps) {
    this.setState({favorites: nextProps.favorites}, () => {
      var pairs = []
      var favs = this.state.favorites
      for(var key in favs) {
        var pair = [key, favs[key]]
        pairs.unshift(pair)
      }
      localStorage.setItem('favorites', JSON.stringify(this.state.favorites));
      this.setState({urls: pairs});
    });
  }

  //remove gif from favorites when clicked
  handleUnfavorite(e) {
    var newFavorites = this.state.favorites;
    var pairToDelete = [e.target.alt, e.target.src]
    delete newFavorites[pairToDelete[0]];
    this.componentWillReceiveProps({favorites: newFavorites});
  }

  render() {
    return (
      <header className="navbar">
        <h1 className="title">Welcome to Joes Gifs</h1>
        <MySearchBar className="searchBar" focus={true} callBack={this.props.callBack}/>
        <MyButtons getSearchTerm={this.props.callBack}/>
        <h1 className="favorites-title">Favorites</h1>
        <div className="favorites">
          {
          this.state.urls.map( (url, index) => (
              <img className="favorite-gif" src={url[1]} alt={url[0]} key={url[0]} onClick={this.handleUnfavorite}></img>
          ))
        }
        </div>
      </header>
    )
    }
  }
