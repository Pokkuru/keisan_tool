// 足し算
function addtion(a, b){
  if(num_type == "decimal"){
    var c = a + b;
    c *= 10;
    c = Math.round(c) / 10;
    var q = kakkoArithmetic(a) + " + " + kakkoArithmetic(b);
    return c;
  }else{
    var q = kakkoArithmetic(a) + " + " + kakkoArithmetic(b);
    return a + b;
  }
}

// 引き算
function subtraction(a, b){
  if(a<b && need_negative ==false){
    var temp = a;
    a = b;
    b = temp;
  }
  if(num_type == "decimal"){
    var c = a - b;
    c *= 10;
    c = Math.round(c) / 10;
    var q = kakkoArithmetic(a) + " - " + kakkoArithmetic(b);
    return c;
  }else{
    var q = kakkoArithmetic(a) + " - " + kakkoArithmetic(b);
    return a - b;
  }
}

// 掛け算
function multiplication(a, b){
  if(num_type == "decimal"){
    var c = a * b;
    c *= 10;
    c = Math.round(c) / 10;
    var q = kakkoArithmetic(a) + " × " + kakkoArithmetic(b);
    return c;
  }else{
    var q = kakkoArithmetic(a) + " × " + kakkoArithmetic(b);
    return a * b;
  }
}

// 割り算
function division(a,  b){
  // 割り切れない数の場合パス
  temp = a/b;
  while(!isInteger(temp) || a%b > 0){
    a = randomNumArithmetic();
    b = randomNumArithmetic();
    temp = a/b;
  }
}

// 四則計算のための括弧
function kakkoArithmetic(num){
  if(num < 0){
    var text = "(" + num + ")";
    return text;
  }else{
    return num;
  }
}

//===================
// 整数判定
//===================
function isInteger(x) {
  if(x == 0){
    return false
  }else{
    return Math.round(x) === x;
  }
}