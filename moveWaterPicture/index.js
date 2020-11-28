const waterList = []
const options = {}
module.exports.moveWaterPicture = function (callback) {

    const parentImg = new Image()
    parentImg.src = options.imgSrc
    parentImg.onload = () => {
      console.log(options)
      // 准备canvas环境
      var canvas = document.createElement('canvas')
      const containerWidth = options.parentNode.offsetWidth
      const containerHeight = options.parentNode.offsetHeight
      canvas.setAttribute('width', containerWidth)
      canvas.setAttribute('height', containerHeight)
      var ctx = canvas.getContext("2d")
  
      // 先把图片绘制到canvas上
      ctx.drawImage(parentImg, 0, 0, containerWidth, containerHeight)
      // 绘制水印到canvas上
      ctx.font = options.fontSize
      ctx.fillStyle = options.textColor

      for(let i = 0; i < waterList.length; i++){
        let waterDom = waterList[i]
        let waterPicText = waterDom.innerText
        ctx.fillText(waterPicText, waterDom.offsetLeft, waterDom.offsetTop)
        waterList.pop()
      }
      const newBase64Url = canvas.toDataURL()// 将图片生成base64编码
      callback(newBase64Url)
    }
}

module.exports.addWaterText = function ({
    waterText = '没有传文本哦',
    parentNode = document.body,
    imgSrc = '',
    textColor = 'red',
    fontSize ='14px',
    opacity = 1
}) {
    // 将传入的属性赋值给全局对象
    options.textColor = textColor
    options.waterText = waterText
    options.imgSrc = imgSrc
    options.fontSize = fontSize
    options.opacity = opacity
    options.parentNode = parentNode

    let span = document.createElement('span')
    span.innerText = waterText
    span.style.color = textColor
    span.style.fontSize = fontSize
    span.style.position = 'absolute'

    waterList.push(span)

    parentNode.appendChild(span)

    moveWaterText(span, parentNode)

}

function moveWaterText(span, parentNode){
    span.onmousedown = function(e){
        var disx = e.pageX - span.offsetLeft;
        var disy = e.pageY - span.offsetTop;
        document.onmousemove = function (e){
          let pointX = e.pageX - disx
          let pointY = e.pageY - disy
          
          // 如果拖拽超出父级范围，就只允许在边界位置
          pointX = pointX < 0? 0: pointX;
          pointX = pointX > parentNode.offsetWidth? parentNode.offsetWidth: pointX;
          pointY = pointY < 0? 0: pointY;
          pointY = pointY > parentNode.offsetHeight? parentNode.offsetHeight: pointY;

          span.style.left = pointX +'px';
          span.style.top = pointY +'px';
        }
        document.onmouseup = function(){
          document.onmousemove = document.onmouseup = null;
        }
    }
    span.oncontextmenu = function(e) {
      e.preventDefault()
      const flag = confirm('确认删除吗?')
      flag ? span.remove() : ''
    }
}
