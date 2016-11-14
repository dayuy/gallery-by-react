require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/1.jpg');
let imageDatas = require('../data/imageDatas.json');

imageDatas = (function genImageURL(imageDatasArr){
	for(let i=0;i<imageDatasArr.length;i++){
		let singleImageData = imageDatasArr[i];

		singleImageData.imageURL = require('../images/' + singleImageData.fileName);
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
