/**
 * 只生成一个文本水印
 * @param {*} options 生成水印的配置参数对象 
 */
module.exports = function oneWaterPicture ({
    imgSrc = '',
    waterText = '没有传文本哦',
    textColor = 'red',
    fontSize ='14px',
    imgWidth =500,
    imgHeight =500,
    waterTop =200,
    waterLeft =200,
    waterRotate =1,
    flag =false,
    opacity =1
}, callback) {

    // 开始生成水印
    const parentImg = new Image()
    parentImg.src = imgSrc
    parentImg.onload = () => {
        let canvas = document.createElement('canvas')
        canvas.setAttribute('width', imgWidth);
        canvas.setAttribute('height', imgHeight);
        let ctx = canvas.getContext("2d");
        let base64Url = ''

        // 先把图片绘制到canvas上
        ctx.drawImage(parentImg, 0, 0, imgWidth, imgHeight);
        // 绘制水印到canvas上
        ctx.font = fontSize;
        ctx.fillStyle = textColor;

        ctx.rotate(Math.PI / 180 *  waterRotate);

        ctx.globalAlpha = opacity

        if (flag) {
            // 水印的行数
            const row = Math.ceil(imgWidth / 200)

            // 水印的列数
            const col = Math.ceil(imgHeight / 2)

            // 循环平铺添加水印
            for(let i = 0; i < row; i++){
                for(let j = 0; j < col; j++){
                    ctx.fillText(waterText, 200 * i, 100 * j + 1)
                }
            }

            base64Url = canvas.toDataURL();

        } else {
            ctx.fillText(waterText, waterLeft, waterTop)
            // 将图片生成base64编码
            base64Url = canvas.toDataURL();
        }

        callback(base64Url)
    }
}