'use strict';
require('normalize.css/normalize.css');
require('../styles/App.css');

import React from 'react';

var imageDatas = require('../data/imageDates.json')

imageDatas = (function genImageURL(imageDatasArr){
	for(let i=0;i<imageDatas.length;i++){
		let singleImageData = imageDatasArr[i];

		singleImageData.imageURL = require('../images/' + singleImageData.fileName)
		imageDatasArr[i] = singleImageData;
	}
	return imageDatasArr;
})(imageDatas);

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
      	<section className="img-sec">
      	</section>
      	<nav className="controller-nav">
      	</nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
