//===================
// 平方根を用いた足し算
//===================
function additionRoot(a,b, aa, bb, qftype,qnum){
  var c = a + b;
  if(a != 1 && b != 1 && aa != 1){
    q = a+"rt["+aa+"] + " + b+"rt["+aa+"]";
  }else{
    if(a == 1){
      if(aa != 1){
        var q = "rt["+aa+"]";
      }else{
        var q = 1;
      }
    }else{
      if(aa != 1){
        var q = a + "rt["+aa+"]";
      }else{
        var q = a;
      }
    }
    q += " + ";
    if(b == 1){
      if(aa != 1){
        q += "rt["+aa+"]";
      }else{
        q += b;
      }
    }else{
      if(aa != 1){
        q += b + "rt["+aa+"]";
      }else{
        q += b;
      }
    }
  }
  console.log(q);
  questionWriter(horizontal, vertical, qnum, q);
  var [pf,sisu] = primeFactorization(aa);
  aa = 1;
  for(i=0; i<pf.length; i++){
    if(sisu[i] == 2){
      c*=pf[i];
    }else if(sisu[i] == 3){
      c*=pf[i];
      aa*=pf[i];
    }else if(sisu[i] == 4){
      c*=pf[i]*pf[i];
      aa*=pf[i];
    }else{
      aa*=pf[i];
    }
  }
  if(aa == 1){
    return String(c);
  }else{
    if(c == 1 || aa == 1){
      if(c == 1 && aa == 1){
        return 1;
      }else if(c == 1){
        return "rt["+aa+"]";
      }else if(aa == 1){
        //console.log(c);
        return String(c);
      }
    }else{
      return c+"rt["+aa+"]";
    }
  }
}

//===================
// 平方根を用いた引き算
//===================
function subtractionRoot(a,b, aa, bb, qftype,qnum){
  var c = a - b;
  if(a != 1 && b != 1 && aa != 1){
    q = a+"rt["+aa+"] - " + b+"rt["+aa+"]";
  }else{
    if(a == 1){
      if(aa != 1){
        var q = "rt["+aa+"]";
      }else{
        var q = 1;
      }
    }else{
      if(aa != 1){
        var q = a + "rt["+aa+"]";
      }else{
        var q = a;
      }
    }
    q += " - ";
    if(b == 1){
      if(aa != 1){
        q += "rt["+aa+"]";
      }else{
        q += b;
      }
    }else{
      if(aa != 1){
        q += b + "rt["+aa+"]";
      }else{
        q += b;
      }
    }
  }
  console.log(q);
  questionWriter(horizontal, vertical, qnum, q);
  var [pf,sisu] = primeFactorization(aa);
  aa = 1;
  for(i=0; i<pf.length; i++){
    if(sisu[i] == 2){
      c*=pf[i];
    }else if(sisu[i] == 3){
      c*=pf[i];
      aa*=pf[i];
    }else if(sisu[i] == 4){
      c*=pf[i]*pf[i];
      aa*=pf[i];
    }else{
      aa*=pf[i];
    }
  }
  if(c == 0){
    return String(c);
  }else if(c == -1){
    if(aa == 1){
      return "-1"
    }else{
      return "-rt["+aa+"]"
    }
  }
  if(aa == 1){
    return String(c);
  }else{
    if(c == 1 || aa == 1){
      if(c == 1 && aa == 1){
        return 1;
      }else if(c == 1){
        return "rt["+aa+"]";
      }else if(aa == 1){
        //console.log(c);
        return String(c);
      }
    }else{
      return c+"rt["+aa+"]";
    }
  }
}

//素因数分解をする
function primeFactorization(n){
  var s = Math.floor(Math.sqrt(n));
  var r = 0;
  var arResult = [];
  var sisu = [];
  for(var i=2; i <= s; i++){
    if((n % i) == 0){
      r = 0; // 指数カウンタクリア
      do{
        r++; // 指数カウンタプラス
        n = n / i;
      }while((n % i) == 0);
      arResult.push(i);
      sisu.push(r);
    }else{
      arResult.push(1);
      sisu.push(0);
    }
  }
  // 残った素数を追加
  if (n > s) {
    arResult.push(n);
    sisu.push(0);
  }
  return [arResult,sisu];
}

/*
//===================
// 引き算
//===================
function rootSubtraction(a,b, aa, bb, qftype,qnum){
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
function rootMultiplication(a,b, aa, bb, qftype,qnum){
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
function rootDivision(a, b, aa, bb, qftype,qnum, digit){
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
*/
