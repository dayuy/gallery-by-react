require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM,{findDOMNode} from 'react-dom';

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

//获取0到30之间的任意正负角度
function get30DegRandom(){
  return ((Math.random() > 0.5 ? '' : '-' )+Math.ceil(Math.random() * 30));
}

class ImgFigure extends React.Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  //imgFigure的点击处理函数
  handleClick(e){
    // this.props.inverse();

    if (this.props.arrange.isCenter) {
      this.props.inverse();
    }else{
      this.props.center();
    }

    e.stopPropagation();
    e.preventDefault();
  }

  render(){

    
    let styleObj = {};

    //如果props属性中制定了这张图的位置，则使用
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }

    //如果图片的旋转角度有值且不为0，添加旋转角度
    if (this.props.arrange.rotate) {
      (['MozT','MsT','WebkitT','']).forEach(function(value){
        styleObj[value + 'ransform'] = 'rotate(' + this.props.arrange.rotate
+ 'deg)';      }.bind(this));
    }

    if (this.props.arrange.isCenter) {
      styleObj.zIndex = 11;
    }

    let imgFigureClassName = 'img-figure';
        imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : ' ';

    return (
        <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick} >
          <img src={this.props.data.imageURL}
                alt={this.props.data.title}/>
          <figcaption>
            <h2 className="img-title">{this.props.data.title}</h2>
            <div className="img-back" onClick={this.handleClick} >
                <p>
                  {this.props.data.desc}
                </p>
            </div>
          </figcaption>
        </figure>
      );
  }
}

class ControllerUnit extends React.Component{

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){

    //如果点击的是当前选中的按钮，则翻转图片，否则将对应的图片剧中
    if (this.props.arrange.isCenter) {
      this.props.inverse();
    }else{
      this.props.center();
    }

    e.preventDefault();
    e.stopPropagation();
  }


  render(){

    let controllerUnitClassName = "controller-unit";

    if (this.props.arrange.isCenter) {
      controllerUnitClassName += " is-center";

      if (this.props.arrange.isInverse) {
        controllerUnitClassName += ' is-inverse';
      }
    }

    return(
        <span className={controllerUnitClassName} onClick={this.handleClick}></span>
      )
  }
}

class AppComponent extends React.Component {
  constructor(props) {       //指定初始化状态对象
    super(props);
    this.state = 
    {
      Constant:{        //初始化值 设置默认属性
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
        },
        imgsArrangeArr:[
          {
            pos:{
              left:0,
              top:0
            },
            rotate:0,      //添加旋转角度值
            isInverse:false,    //图片正反面
            isCenter:false     //图片是否剧中
          }
        ]
      }
  } 




  //重新布局所有图片  centerIndex指定居中排布那个图片
  rearrange(centerIndex){
    let imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.state.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random() * 2),   //取一个活着不去
        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

        //首先剧中 centerIndex 的图片
        imgsArrangeCenterArr[0]={
          pos:centerPos,
          rotate:0,
          isCenter:true
        };

        //取出要布局上册的状态信息
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

        //布局位于上册的图片
        imgsArrangeTopArr.forEach(function(value,index){
          imgsArrangeTopArr[index] = {
            pos:{
              top: getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
              left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
              },
            rotate:get30DegRandom(),
            isCenter:false
          };
        });

        //布局左右两侧图片
        for(let i = 0,j=imgsArrangeArr.length,k = j / 2; i<j;i++){
          let hPosRangeLORX = null;


          //前半部分布局左边，有半部分布局右边
          if (i<k) {
            hPosRangeLORX = hPosRangeLeftSecX;
          }else{
            hPosRangeLORX = hPosRangeRightSecX;
          }

          imgsArrangeArr[i]={
              pos:{
                top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
                left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
              },
              rotate:get30DegRandom(),
              isCenter:false
          };
        }
        
        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
          imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

        this.setState({
          imgsArrangeArr:imgsArrangeArr
        });

  }


  //利用rearrange函数，居中对应index的图片
  //@param index,需要被居中的图片对应的图片信息类数组的index值
  //@return {function}
  
  center(index){
    return function(){
      this.rearrange(index);
    }.bind(this);
  }

  //翻转函数，@param index 输入当前被执行inverse操作的图片对应的图片信息数组的index值
  //@return {function} 是一个闭包函数，其内return一个真正被执行的函数;闭包就是能够读取其他函数内部变量的函数
  //
  inverse(index){
    return function(){
      let imgsArrangeArr = this.state.imgsArrangeArr;

      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

      this.setState({
        imgsArrangeArr:imgsArrangeArr
      })
    }.bind(this);
  }
  

  //组建加载之后，为每张图片计算器位置的范围
  componentDidMount() {
    //先拿到舞台大小
    let stageDOM = findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageH = Math.ceil(stageH / 2),
        halfStageW = Math.ceil(stageW / 2);


    //拿到一个imageFigure的大小
    let imgFigureDOM = findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);

    //计算中心图片的位置点
    this.state.Constant.centerPos = {
      left:halfStageW - halfImgW,
      top:halfStageH - halfImgH
    }
    

    //左侧和右侧位置点 取值范围
    this.state.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.state.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.state.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.state.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.state.Constant.hPosRange.y[0] = -halfImgH;
    this.state.Constant.hPosRange.y[1] = stageH - halfImgH;

    //上下位置取值 点
    this.state.Constant.vPosRange.topY[0] = -halfImgH;
    this.state.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.state.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.state.Constant.vPosRange.x[1] = halfStageW;
    

    this.rearrange(0);
  }


  render() {
    let controllerUnits = [],
        imgFigures = [];

    imageDatas.forEach(function(value,index){

      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos:{
            left:0,
            top:0
          },
          rotate:0,
          isInverse:false,
          isCenter:false
        }
      }

      imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure'+index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
      controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)} />);
    }.bind(this));


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
