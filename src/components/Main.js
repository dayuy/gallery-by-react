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

//获取区间内的一个随机值
function getRangeRandom(low,high){
  return Math.ceil(Math.random() * (high - low) + low);
}

class ImgFigure extends React.Component {
  render(){

    
    let styleObj = {};

    //如果props属性中制定了这张图的位置，则使用
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }

    return (
        <figure className="img-figure" style={styleObj} >
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
  Constant:{        //初始化值
    centerPos:{
      left:0,
      right:0
    },
    hPosRange:{     //水平方向取值范围
      leftSecX:[0,0],
      rightSecX:[0,0],
      y:[0,0]
    },
    vPosRange:{    //垂直方向取值范围
      x:[0,0],
      topY:[0,0]
    }
  }

  //重新布局所有图片  centerIndex指定居中排布那个图片
  rearrange(centerIndex){
    let imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.Y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.ceil(Math.random() * 2),   //取一个活着不去
        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

        //首先剧中 centerIndex 的图片
        imgsArrangeCenterArr[0].pos = centerPos;

        //取出要布局上册的状态信息
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

        //布局位于上册的图片
        imgsArrangeTopArr.forEach(function(value,index){
          imgsArrangeTopArr[index].pos = {
            top: getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
            left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
          };
        });

        //布局左右两侧图片
        for(let i = 0;i<(imgsArrangeArr.length / 2);i++){
          let hPosRangeLORX = null;


          //前半部分布局左边，有半部分布局右边
          if (i<(imgsArrangeArr.length / 2)) {
            hPosRangeLORX = hPosRangeLeftSecX;
          }else{
            hPosRangeLORX = hPosRangeRightSecX;
          }

          imgsArrangeArr[i].pos = {
            top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
            left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
          };

        }

        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
          imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0])
        }

        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

        this.setState({
          imgsArrangeArr:imgsArrangeArr
        });


  }

  //指定初始化状态对象
  getInitialState() {
    return {
      imgsArrangeArr:[{
        pos:{
          left:0,
          top:0
        }
      }]
    }
  }

  //组建加载之后，为每张图片计算器位置的范围
  componentDidMount() {
    //先拿到舞台大小
    let stageDOM = React.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageH = Math.ceil(stageW / 2),
        halfStageW = Math.ceil(stageH / 2);


    //拿到一个imageFigure的大小
    let imgFigureDOM = React.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);

    //计算中心图片的位置点
    this.Constant.centerPos = {
      left:halfStageW - halfImgW,
      top:halfStageH - halfImgH
    }

    //左侧和右侧位置点 取值范围
    this.Constant.hPosRange.leftSecX[0] = - halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW - halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = - halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    //上下位置取值 点
    this.Constant.vPosRange.topY[0] = - halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfImgW - imgW;
    this.Constant.vPosRange.x[1] = halfImgW;
    

    this.rearrange(0);
  }


  render() {
    let controllerUnits = [],
        imgFigures = [];

    imageDatas.forEach(function(value,index){

      if (!this.state.imgsArrangeArr[index]) {
        this.stage.imgsArrangeArr[index] = {
          pos:{
            left:0,
            top:0
          }
        }
      }

      imgFigures.push(<ImgFigure data={value} ref={'imgFigure'+index} arrange={this.state.imgsArrangeArr[index]} />);
    },bing(this));

    return (
      <section className="stage" ref="stage">
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
