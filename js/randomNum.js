// 四則計算用の乱数生成
function randomNumArithmetic(){
  if(need_negative){
    if(50 < randomPositiveInt(1,100)){
      return randomNegativeInt();
    }else{
      return randomPositiveInt();
    }
  }else{
    return randomPositiveInt();
  }
}

// 正の整数の乱数
function randomPositiveInt(){
  var retVal = Math.floor(Math.random() * (max_val - min_val + 1) + min_val);
  return parseInt(retVal);
}

// 負の整数の乱数
function randomNegativeInt(){
  return parseInt(-1 * (randomPositiveInt()));
}