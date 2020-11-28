# 操作手册

### 插件介绍

 - 这是一款水印插件，主要基于canvas实现，不同于一些插件是生成一张底片作为图片的背景生成的水印，这种方式的一个缺点就是，若是想到处这个图片就需要再次进行合成并且转换，在某些情境下不是很方便。
 - 这款插件是直接操作原图，转换成base64格式的图片，可以直接使用，不需要在进行二次转换，目前仅支持导入固定图片大小生成转换后的图片，后续会进行一系列的优化。


### 功能介绍

 1. 单水印：通过调用 ```oneWaterPicture```方法传入一些参数可以生成一张带有水印的图片，可以使用参数控制是生成单水印还是全背景水印。
 
 2. 拖拽水印：这是这款插件的特色所在，可以通过调用 ```addWaterText```方法生成一些水印，并且可以使用鼠标拖拽在你传入的父级的任意位置，在调用 ```moveWaterPicture```方法，在该方法的回调函数中拿到生成的base64格式的图片，然后你就可以为所欲为的使用。
 ```js
 btn.onclick = () => {
    // 添加水印
    waterPic.addWaterText({
        textColor:'#000',
        imgSrc: './water.jpg',
        parentNode: imgs,
    })
}

water.onclick = () => {
    // 获取水印
    waterPic.moveWaterPicture((base64) => {
        console.log(base64)
    })
}
 ```

 ### 参数介绍

 1. oneWaterPicture(options): 
  - imgSrc：你要生成水印的图片的路径，可以是base64格式的图片
  - waterText：要生成水印的文本
  - textColor：生成水印文本的颜色
  - fontSize：生成水印文本的字体大小
  - imgWidth：导出带水印的图片的宽度
  - imgHeight：导出带水印图片的高度
  - waterTop：水印在图片上距离顶部的距离
  - waterLeft：水印在图片上距离左侧的距离
  - flag：是否生成全背景水印
  - opacity：生成水印的透明度

2. addWaterText(options):
 - waterText：同上
 - parentNode：可拖动水印的父级 (需要将此dom元素设置为相对定位或者绝对定位)
 - imgSrc：同上
 - textColor：同上
 - fontSize：同上
 - opacity：同上

 3. moveWaterPicture(callback):
  - callback：回调函数，在此函数中可以拿到生成水印后的图片的base64格式