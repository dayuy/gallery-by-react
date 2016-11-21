# gallery-by-react
####安装运行
使用yoman、webpack

1. npm install yo -g
2. npm install generator-react-webpack -g
3. yo react-webpack gallery-by-react 自动生成项目
4. 运行 node server.js
5. npm install autoprefixer-loader --save-dev
6. 编辑 Main.js 开始项目	
7. 发布项目  
    1. 打包到dist目录npm run copy & webpack --env=dist
    2. git add \git commit
    3. git subtree push --prefix=dist origin gh-pages  推送到Github提供的静态文件访问上
    4. 访问

### 知识点
CSS3翻转属性

1. transform-style:preserve-3d;  //3D加速
2. transform:rotateY(180deg) scale(.5) translate(100px,20px)\translateX(20px)   skewY(12deg);    //变形：翻转角度 缩放scale(x,y)默认基点是中心位置 位移  扭转角度
3. transform-origin:left,top;  //基点：位移trnsform发生的参照点
4. transition:transition .6s easy-in-out, left .6s easy-in-out,top .6s easy-in-out 1s;   //发生动画的过度,以,隔开，1s表延迟。
5. perspective：3D环境中的井深（Z轴方向的基点距离平面的长度），perspective-origin基点；写在transform的父元素上。
6. perspective:1800px;
7. Icon Font:字体文件 取代图片文件展示图片（1体积小，2支持css3属性变形）需在头部进行字体声明：@font-face{font-family:"";src:url() format(兼容)}
8. CSS3伪元素&::after插入元素，而伪类的方式只需使用&:hover一个冒号。
9. react 重新渲染时，是比较之前的结构和现在的结构，用key 给数组对应的一个值更快速的配对，加快性能。

### 调试技巧
debugger();
