// 計算問題のクラス
function QuestionClass(){
  this.ques;  // 問題内容
  this.ans;   //解答
}

// 問題
QuestionClass.prototype.returnQues = function(){
  return this.ques;
}
// 解答
QuestionClass.prototype.returnAnswer = function(){
  return this.ans;
}

//問題作成
QuestionClass.prototype.create = function(){
  switch(ques_type){
    case "addition": case "subtraction": case "multiplication": case "division":
      // 四則計算
      var a = randomNumArithmetic();
      var b = randomNumArithmetic();
      break;
    default:
      console.log("error @数字作成：計算のタイプが存在しません");
  }

  // 解答作成
  switch(ques_type){
    // 四則計算
    case "addition":
      this.ques = a + " ＋ " + b;
      this.ans = addtion(a, b);
      break;
    case "subtraction":
      this.ques = a + " － " + b;
      this.ans = subtraction(a, b);
      break;
    case "multiplication":
      this.ques = a + " × " + b;
      this.ans = multiplication(a, b);
      break;
    case "division":
      this.ques = a + " ÷ " + b;
      this.ans = division(a, b);
      break;
  }
}