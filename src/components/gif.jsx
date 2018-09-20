import React from 'react';
// import Dialog from './dialog'
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../style/Gif.css'


export default class MyGif extends React.Component {

  constructor() {
    super();
    this.state = {
      dialogOpen: false,
      dialogText: "",
      selectedGif: {}
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  handleClick(e){
    console.log("Props: ", this.props.info);
    this.setState({dialogOpen: true, selectedGif: e.target})
  }

  handleDialogClose(){
    this.setState({dialogOpen: false})
  }

  handleFavorite(){
    this.props.makeFavorite(this.state.selectedGif.src, this.state.selectedGif.id)
    this.handleDialogClose()
  }


  render() {
    return (
      <div className="parent">
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <div className="dialog-content">
            <img className="Gif" src={this.props.src} onClick={this.handleClick} style={this.props.style} alt={""} id={this.props.id}/>
            <DialogContentText style={{marginLeft: "15px"}}>
              Title: {this.props.info.slug}
              <br></br>
              <br></br>
              Img Address: <a href={this.props.info.url}>{this.props.info.url}</a>
            </DialogContentText>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              Exit
            </Button>
            <Button onClick={this.handleFavorite} color="primary" autoFocus>
              Favorite
            </Button>
          </DialogActions>
        </Dialog>
        <img className="Gif" src={this.props.src} onClick={this.handleClick} style={this.props.style} alt={""} id={this.props.id}/>
      </div>
      );
    }
  }

  // <Dialog dialogOpen={this.state.dialogOpen} handleDialogClose={this.handleDialogClose}/>
