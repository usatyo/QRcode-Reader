let canvasWidth = 400;
let canvasHeight = 400;
let uploadImgSrc;

// 画像を変更したときにその画像を読み取るスクリプト
function loadLocalImage(e) {
  let canvas = document.getElementById("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  let fileData = e.target.files[0];
  let reader = new FileReader();
  reader.onload = function () {
    uploadImgSrc = reader.result;
    canvasDraw();
  };
  reader.readAsDataURL(fileData);
}

// canvas上に画像を表示するスクリプト
function canvasDraw() {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  let img = new Image();
  img.src = uploadImgSrc;
  img.onload = function () {
    ctx.drawImage(
      img,
      0,
      0,
      canvasWidth,
      this.height * (canvasWidth / this.width)
    );
  };
}

// QRコードを読み取るスクリプト
function readQR() {
  let result = document.getElementById("result");
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
  var code = jsQR(imageData.data, imageData.width, imageData.height);
  console.log(code);
  if (!code) {
    result.textContent = "QRコードが存在しません";
  } else {
    result.textContent = code.data;
  }
}
