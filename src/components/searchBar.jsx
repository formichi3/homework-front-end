import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import store from '../store.js'



export default class MySearchBar extends React.Component {

  constructor() {
    super();
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentWillMount(){
  }

  handleChange(event) {
    this.setState({text: event.target.value})
  };

  //listen for enter to set search term for gif search
  onKeyPress(event) {
    if (event.key === "Enter"){
      this.props.callBack(this.state.text)
      store.searchTerm = this.state.text
    }
  }

  render() {
    const inputStyle = {
      autoFocus: true,
      hintText: "search gifs...",
      color: "white"
    }
    return (
      <MuiThemeProvider>
        <TextField
          id="search"
          placeholder="Search Gifs ..."
          type="search"
          inputStyle={inputStyle}
          style={{width: "85%"}}
          autoFocus={this.props.focus}
          onChange={this.handleChange}
          onKeyPress={this.onKeyPress}
          />
        </MuiThemeProvider>
      );
    }
  }
