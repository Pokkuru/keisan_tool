function QuestionClass(qnum){
  this.qnum = qnum;      //問題番号
  this.ans; //解答
}

QuestionClass.prototype.retQnum = function(){
  return this.qnum;
}
QuestionClass.prototype.retAns = function(){
  return this.ans;
}

QuestionClass.prototype.create = function(){
  var q = "";
  var minVal = parseInt($('#minVal').val());
  var maxVal = parseInt($('#maxVal').val());
  //負の数を含む
  if($('#negativeExist').prop("checked")){
    if($('#n_type').val() == "decimal"){
      var a = negativeDecimalGenerator(minVal,maxVal);
      var b = negativeDecimalGenerator(minVal,maxVal);
    }else{
      var a = negativeIntGenerator(minVal, maxVal);
      var b = negativeIntGenerator(minVal, maxVal);
    }
  }else{
  //負の数を含まない
    if($('#n_type').val() == "decimal"){
      var a = randomPositiveDecimal(minVal,maxVal,1);
      var b = randomPositiveDecimal(minVal,maxVal,1);
    }else{
      var a = randomPositiveInt(minVal, maxVal);
      var b = randomPositiveInt(minVal, maxVal);
    }
  }

  switch($('#o_type').val()){
    case "addtion":
      //足し算
      this.ans = addtion(a,b,$('#n_type').val());
      a = kakko(a);
      b = kakko(b);
      texCode += "\\[(" + this.qnum + ")\\ " + a + " + " + b + "\\]\n";
      break;
    case "subtraction":
      //引き算
      this.ans = subtraction(a,b,$('#n_type').val());
      if(this.ans < 0 && ($('#negativeExist').prop("checked") == false)){
        this.ans = subtraction(b,a,$('#n_type').val());
        a = kakko(a);
        b = kakko(b);
        texCode += "\\[(" + this.qnum + ")\\ " + b + " - " + a + "\\]\n";
      }else{
        a = kakko(a);
        b = kakko(b);
        texCode += "\\[(" + this.qnum + ")\\ " + a + " - " + b + "\\]\n";
      }
      break;
    case "multiplication":
      //掛け算
      this.ans = multiplication(a,b,$('#n_type').val());
      a = kakko(a);
      b = kakko(b);
      texCode += "\\[(" + this.qnum + ")\\ " + a + " × " + b + "\\]\n";
      break;
    case "division":
      //わり算
      this.ans = division(a,b,$('#n_type').val());
      a = kakko(a);
      b = kakko(b);
      texCode += "\\[(" + this.qnum + ")\\ " + a + " ÷ " + b + "\\]\n";
      break;
  }
  //texCode += "\\newline\n"
  texCode += "\\vspace{0.2cm}\n"
}

QuestionClass.prototype.writeAns = function(){
  if(this.qnum % 3 == 1 && this.qnum > 3){
    texCode += "\\vspace{0.3cm}\n"
    texCode += "\\newline\n";
  }
  texCode += "(" + this.qnum + ") " + this.ans + "\n";
}

function negativeIntGenerator(min,max){
  if(50 < randomPositiveInt(1,100)){
    return randomPositiveInt(min,max);
  }else{
    return randomNegativeInt(min,max);
  }
}
function negativeDecimalGenerator(min,max){
  if(50 < randomPositiveInt(1,100)){
    return randomPositiveDecimal(min,max,1);
  }else{
    return randomNegativeDecimal(min,max,1);
  }
}

function kakko(num){
  if(num < 0){
    var text = "(" + num + ")";
    return text;
  }else{
    return num;
  }
}
