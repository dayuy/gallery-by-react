require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/1.jpg');
let imageDatas = require('../data/imageDatas.json');

imageDatas = (function genImageURL(imageDatasArr){
	for(let i=0;i<imageDatasArr.length;i++){
		let singleImageData = imageDatasArr[i];

		singleImageData.imageURL = require('../images/' + singleImageData.filename);
		imageDatasArr[i] = singleImageData;
	}
	return imageDatasArr;
})(imageDatas);

class ImgFigure extends React.Component {
  render(){
    return (
        <figure className="img-figure">
          <img src={this.props.data.imageURL}
                alt={this.props.data.title}/>
          <figcaption>
            <h2 className="img-title">{this.props.data.title}</h2>
          </figcaption>
        </figure>
      );
  }
}

class AppComponent extends React.Component {
  render() {
    let controllerUnits = [],
        imgFigures = [];

    imageDatas.forEach(function(value){
      imgFigures.push(<ImgFigure data={value}/>);
    })

    return (
      <section className="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
