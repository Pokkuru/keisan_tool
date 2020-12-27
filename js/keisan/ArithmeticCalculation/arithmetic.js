//===================
// 足し算
//===================
function addtion(a,b,qftype,qnum){
  if(qftype == "decimal"){
    var c = a + b;
    c *= 10;
    c = Math.round(c) / 10;
    var q = kakkoArithmetic(a) + " + " + kakkoArithmetic(b);
    doc.text(horizontal, vertical, "(" + qnum + ") " + q);
    return c;
  }else{
    var q = kakkoArithmetic(a) + " + " + kakkoArithmetic(b);
    doc.text(horizontal, vertical, "(" + qnum + ") " + q)
    return a + b;
  }
}

//===================
// 引き算
//===================
function subtraction(a,b,qftype,qnum){
  if(a<b && $('#negativeExist').prop("checked")==false){
    var temp = a;
    a = b;
    b = temp;
  }
  if(qftype == "decimal"){
    var c = a - b;
    c *= 10;
    c = Math.round(c) / 10;
    var q = kakkoArithmetic(a) + " - " + kakkoArithmetic(b);
    doc.text(horizontal, vertical, "(" + qnum + ") " + q);
    return c;
  }else{
    var q = kakkoArithmetic(a) + " - " + kakkoArithmetic(b);
    doc.text(horizontal, vertical, "(" + qnum + ") " + q)
    return a - b;
  }
}

//===================
// 掛け算
//===================
function multiplication(a,b,qftype,qnum){
  if(qftype == "decimal"){
    var c = a * b;
    c *= 10;
    c = Math.round(c) / 10;
    var q = kakkoArithmetic(a) + " × " + kakkoArithmetic(b);
    doc.text(horizontal, vertical, "(" + qnum + ") " + q);
    return c;
  }else{
    var q = kakkoArithmetic(a) + " × " + kakkoArithmetic(b);
    doc.text(horizontal, vertical, "(" + qnum + ") " + q)
    return a * b;
  }
}

//===================
// 割り算
//===================
function division(a, b,qftype,qnum, digit){
  //割り切れない数の場合少数を計算するのが面倒なのでパス
  temp = a/b;
  while(!isInteger(temp) || a%b > 0){
    a = randomNumForArithmetic(parseInt($('#minVal').val()), parseInt($('#maxVal').val()) ,digit, $('#negativeExist').prop("checked"));
    b = randomNumForArithmetic(parseInt($('#minVal').val()), parseInt($('#maxVal').val()) ,digit, $('#negativeExist').prop("checked"));
    temp = a/b;
  }
  if(qftype == "decimal"){
    var c = a / b;
    c *= 10;
    c = Math.round(c) / 10;
    var q = kakkoArithmetic(a) + " ÷ " + kakkoArithmetic(b);
    doc.text(horizontal, vertical, "(" + qnum + ") " + q);
    return c;
  }else{
    parseInt(a);
    parseInt(b);
    var q = kakkoArithmetic(a) + " ÷ " + kakkoArithmetic(b);
    doc.text(horizontal, vertical, "(" + qnum + ") " + q)
    return a / b;
  }
}

//===================
// 四則計算のための括弧
//===================
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
