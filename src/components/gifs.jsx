import React from 'react';
import axios from 'axios'
import MyGif from './gif.jsx'
import '../style/Gifs.css'
import randomWord from '../wordlist.js'

export default class MyGifs extends React.Component {

  constructor() {
    super();
    this.state = {
      gifs: [],
      numGifs: 20,
      offSet: 0,
      trending: 1,
      searchTerm: "",
      forceUpdate: false,
      errorUrl: "api.giphy.com/v1/gifs/search?q=shrug&api_key=lIT0h2iTdcoFAyUGDu5Qvkb9NgfhOCNN&limit=1"
    }
    this.trackScrolling = this.trackScrolling.bind(this);
  }


  //start by getting trending gifs
  componentWillMount(){
    this.getMoreGifs(this.state.searchTerm)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.trackScrolling)
  }

  componentsWillUnmount() {
    window.removeEventListener('scroll', this.trackScrolling)
  }

  //search for new gifs based on the term in the search bar
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchTerm !== this.state.searchTerm || nextProps.searchTerm === "secretRandomSearchTerm"){
        this.setState({searchTerm: nextProps.searchTerm, offSet: 0, gifs:[], trending: true}, () => {
          this.getMoreGifs(nextProps.searchTerm)
        });
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return true
  }


  //get more gifs when at the bottom of the page
  trackScrolling() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.getMoreGifs(this.state.searchTerm)
    }
  }

  //get gifs from the giphy search or trending api
  getMoreGifs(searchTerm) {
    var url = ""
    if (searchTerm === ""){
      url = `https://api.giphy.com/v1/gifs/trending?api_key=lIT0h2iTdcoFAyUGDu5Qvkb9NgfhOCNN&limit=${this.state.numGifs}&offset=${this.state.offSet}`
    }
    else if (searchTerm === 'secretRandomSearchTerm') {
      var randomSearchTerm = randomWord();
      this.setState({searchTerm: randomSearchTerm})
      url = `https://api.giphy.com/v1/gifs/search?api_key=lIT0h2iTdcoFAyUGDu5Qvkb9NgfhOCNN&q=${randomSearchTerm}&limit=${this.state.numGifs}&offset=${this.state.offSet}`;
    }
    else {
      url = `https://api.giphy.com/v1/gifs/search?api_key=lIT0h2iTdcoFAyUGDu5Qvkb9NgfhOCNN&q=${this.state.searchTerm}&limit=${this.state.numGifs}&offset=${this.state.offSet}`;
    }
    axios.get(url)
    .then(response =>{
      if(response.data.data.length === 0){
        this.props.showErrorScreen();
      } else {
        this.setState({gifs: this.state.gifs.concat(response.data.data), offSet: this.state.offSet+this.state.numGifs})
      }
    })
    //if there is an error, show them Kanye
    .catch((error) => {
      console.log("there was an error", error);
      this.props.showErrorScreen();
    });
  }

  render() {
    return (
      <div className="row">
        {this.state.gifs.map( (gif, index) => (
          <MyGif
            key={index}
            makeFavorite={this.props.makeFavorite}
            id={gif.id}
            className="column"
            src={gif.images.original.url}
            info={gif}
            style={{
              height: gif.images.original.height*0.5,
              width: gif.images.original.width*0.5
            }}
            />
          ))}
        </div>
      );
    }
  }
