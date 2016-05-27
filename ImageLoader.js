'use strict';

var React = require('react-native');

var {
    View,
    Image,
    Component,
    ActivityIndicatorIOS,
    StyleSheet
   } = React;

   import {
     IMAGE_URL
   } from './APIUtils';

class ImageLoader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      imageDownLoadError : false,
      setDefaultImage : false
    };
  }

  componentWillMount(){
    this.setState({
      isLoading: this.props.renderProcess
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.imgUrl != this.props.imgUrl){
      this.setState({
        isLoading: nextProps.renderProcess
      });
    }
  }

  renderImage() {
    return (
      <Image style = {[this.props.imgStyle,{alignItems :'center'}]}
             defaultSource =  {this.state.isLoading? null:this.props.defaultImage}
             source= { (this.state.imageDownLoadError  || this.state.setDefaultImage)? this.props.defaultImage : {uri: IMAGE_URL + this.props.imgUrl}}
             onLoad={this.imageLoadedSuccessfully.bind(this)}
             onError={this.imageDownLoadFailed.bind(this)}
             key = {this.props.imgUrl}
             >
             <ActivityIndicatorIOS
               size="small"
               animating = {this.state.isLoading}
               hidesWhenStopped = {true}
               style = {{flex: 1}}
               color="white"
                />
      </Image>
    );
  }


  imageLoadedSuccessfully() {
    console.log('imageLoadedSuccessfully');
    this.setState({
    isLoading: false,
    });
 }

 imageDownLoadFailed() {
   console.log('imageDownLoadFailed');
   this.setState({
     isLoading: false,
     imageDownLoadError : true
 });


}

  render() {
    return (
      <View style = {{flex : 1}}>
      {this.renderImage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf : 'center'
  },
  background: {
    flex : 1,
    justifyContent: 'center',
    backgroundColor: 'red'
  },

});


ImageLoader.propTypes = {
  imgUrl:  React.PropTypes.string.isRequired,
  imgStyle : React.PropTypes.any.isRequired,
  defaultImage : React.PropTypes.any.isRequired,
};

module.exports  = ImageLoader;
