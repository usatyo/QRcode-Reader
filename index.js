const canvasWidth = 400;
const canvasHeight = 400;
let uploadImgSrc;

// 「画像を選択する」ボタンの処理
// 画像を変更したときにその画像を読み取る
function loadLocalImage(e) {
  const canvas = document.getElementById("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  
  // アップロードされている画像ファイルを fileData に入れる
  const fileData = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function () {
    uploadImgSrc = reader.result;
    canvasDraw();
  };
  reader.readAsDataURL(fileData);
}

// loadLocalImage で呼ばれる処理
// canvas上に画像を表示する
function canvasDraw() {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  const img = new Image();
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
  
  // 「QRコードを読み取る」ボタンの処理
  // QRコードを読み取って表示する
  function readQR() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const result = document.getElementById("result");
    const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    console.log(code);
    if (!code) {
    result.textContent = "QRコードが存在しません";
  } else {
    result.textContent = code.data;
  }
}
