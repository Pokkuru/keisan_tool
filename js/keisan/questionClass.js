/*
QuestionClass
計算問題のクラス
*/

function QuestionClass(qnum, qtype, qftype){
  this.qnum = qnum;     //問題番号
  this.qtype = qtype;   //問題の種類
  this.qftype = qftype; //数字タイプ
  this.ans;             //解答
  this.ans2;            //連立方程式のy
}
//問題番号を返す
QuestionClass.prototype.retQnum = function(){
  return this.qnum;
}
//問題のタイプを返す
QuestionClass.prototype.retQtype = function(){
  return this.qtype;
}
//数字のタイプを返す
QuestionClass.prototype.retQftype = function(){
  return this.qftype;
}
//答えを返す
QuestionClass.prototype.retAns = function(){
  return this.ans;
}
//問題を作ってドキュメントに出力する
QuestionClass.prototype.create = function(){
  var q = ""; //問題内容
  var minVal = parseInt($('#minVal').val());  //最小値
  var maxVal = parseInt($('#maxVal').val());  //最大値

  //==============================
  //問題のタイプから必要となる係数を作る
  //従来は方程式関連はここでは作れなかったが作れるように改良すること！
  //方程式の場合係数の値が同じであると回答不可能問題が発生するため同じ値のものは避けること
  //==============================
  switch(this.qtype){
    case "addition": case "subtraction": case "multiplication": case "division":
      if(this.qftype == "decimal"){var digit = 1;}else{var digit = 0;}
      var a = randomNumForArithmetic(minVal, maxVal ,digit, $('#negativeExist').prop("checked"));
      var b = randomNumForArithmetic(minVal, maxVal ,digit, $('#negativeExist').prop("checked"));
      break;
    case "additionRoot": case "subtractionRoot": case "multiplicationRoot": case "divisionRoot":
      var a = randomNumForArithmetic(minVal, maxVal ,0, false);
      var b = randomNumForArithmetic(minVal, maxVal ,0, false);
      var aa = randomNumForArithmetic(minVal, maxVal ,0, false);
      var bb = randomNumForArithmetic(minVal, maxVal ,0, false);
      break;
    case "linearEquation":
      do{
        var a = randomNumForEquation(minVal, maxVal, $('#negativeExist').prop("checked"), 1);
        var b = randomNumForEquation(minVal, maxVal, $('#negativeExist').prop("checked"), 2);
      }while(a == b);
      break;
    case "simultaneousEquations":
      do{
        var a = randomNumForEquation(minVal, maxVal, $('#negativeExist').prop("checked"), 1);
        var b = randomNumForEquation(minVal, maxVal, $('#negativeExist').prop("checked"), 2);
        var aa = randomNumForEquation(minVal, maxVal, $('#negativeExist').prop("checked"), 1);
        var bb = randomNumForEquation(minVal, maxVal, $('#negativeExist').prop("checked"), 2);
      }while(a == b && aa == bb);
      break;
    case "linearGraph":
      var a = randomNumForEquation(minVal, maxVal, $('#negativeExist').prop("checked"), 1);
      var b = randomNumForEquation(minVal, maxVal, $('#negativeExist').prop("checked"), 2);
      break;
    case "expand": case "factorization":
      var a = randomNumForEquation(minVal, maxVal, false, 1);
      var b = randomNumForEquation(minVal, maxVal, false, 2);
      var aa = randomNumForEquation(minVal, maxVal, false, 1);
      var bb = randomNumForEquation(minVal, maxVal, false, 2);
      break;
    default:
      console.log("error @数字作成：計算のタイプが存在しません");
  }

  //==============================
  //問題のタイプから問題と解答を作成する
  //==============================
  switch(this.qtype){
    //四則計算 Arithmetic
    case "addition":
      this.ans = addtion(a,b,this.qftype, this.qnum);
      break;
    case "subtraction":
      this.ans = subtraction(a,b,this.qftype, this.qnum);
      break;
    case "multiplication":
      this.ans = multiplication(a,b,this.qftype, this.qnum);
      break;
    case "division":
      this.ans = division(a,b,this.qftype, this.qnum, digit);
      break;

    //平方根四則計算 ArithmeticRoot
    case "additionRoot":
      this.ans = additionRoot(a,b,aa,bb,this.qftype, this.qnum);
      break;
    case "subtractionRoot":
      this.ans = subtractionRoot(a,b,aa,bb,this.qftype, this.qnum);
      break;
    case "multiplicationRoot":
      this.ans = multiplicationRoot(a,b,aa,bb,this.qftype, this.qnum);
      break;
    case "divisionRoot":
      this.ans = divisionRoot(a,b,aa,bb,this.qftype, this.qnum, digit);
      break;

    //一次方程式 linearEquation
    case "linearEquation":
      //演算子 0:+, 1:-
      var ope = randomPositiveInt(0,1);
      //一次方程式のタイプ 0:ax + b, 1:a + bx, 2:ax, 3:ax + bx
      var type = randomPositiveInt(0,3);
      this.ans = linearEquation(type, ope, a, b, this.qnum);
      break;
    //連立方程式 simultaneousEquations
    case "simultaneousEquations":
      //演算子 0:+, 1:-
      var ope = randomPositiveInt(0,1);
      var ope2 = randomPositiveInt(0,1);
      var type = randomPositiveInt(0,4);
      [this.ans, this.ans2] = simultaneousEquations(type, ope, ope2, a, b, aa, bb, this.qnum);
      break;
    //一次関数グラフ
    case "linearGraph":
      //演算子 0:+, 1:-
      var ope = randomPositiveInt(0,1);
      linearGraph(a,b,ope,this.qnum);
      break;
    case "expand":
      var ope = randomPositiveInt(0,1);
      var ope2 = randomPositiveInt(0,1);
      var type = randomPositiveInt(0,1);
      this.ans = expand(type, ope, ope2, a, b, aa, bb, this.qnum);
      break;
    case "factorization":
      var ope = randomPositiveInt(0,1);
      var ope2 = randomPositiveInt(0,1);
      var type = randomPositiveInt(0,1);
      this.ans = factorization(type, ope, ope2, a, b, aa, bb, this.qnum);
      break;

  }
}

QuestionClass.prototype.writeAns = function(){
  if(this.qtype != "simultaneousEquations" && this.qtype != "expand" && this.qtype != "factorization" && this.qtype != "additionRoot" && this.qtype != "subtractionRoot" && this.qtype != "multiplicationRoot" && this.qtype != "divisionRoot"){
    doc.text(horizontal, vertical, "(" + this.qnum + ") " + this.ans);
  }else if(this.qtype == "expand" || this.qtype == "factorization" || this.qtype == "additionRoot" || this.qtype == "subtractionRoot" || this.qtype == "multiplicationRoot" || this.qtype == "divisionRoot"){
    answerWriter(horizontal, vertical, this.qnum, this.ans);
  }else{
    answerWriter(horizontal, vertical,this.qnum,"x=" + this.ans + " ,y=" + this.ans2);
    //doc.text(horizontal, vertical, "(" + this.qnum + ") " + "x = " + this.ans + ", y = " + this.ans2);
  }
}
