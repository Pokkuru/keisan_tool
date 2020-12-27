//==================
// 乱数生成関数
//==================

//min <= x <= max 正の整数の乱数を生成する
function randomPositiveInt(min, max){
  console.log(min);
  console.log(max);
  var retVal = Math.floor(Math.random() * (max - min + 1)) + min;
  return retVal;
}

//min <= x <= max 負の整数の乱数を生成する（入力値は正であること）
function randomNegativeInt(min, max){
  return -1 * (randomPositiveInt(min, max));
}

//min <= x <= max 正の小数の乱数を生成する
function randomPositiveDecimal(min, max, digit){
  var i = 0, j = 1;
  while(i < digit){
    j *= 10;
    i++;
  }
  var temp = randomPositiveInt(min * j, max * j);
  temp /= j;
  temp *= j;
  temp = Math.round(temp) / j;
  return temp;
}

//min <= x <= max 負の小数の乱数を生成する（入力値は正であること）
function randomNegativeDecimal(min, max, digit){
  var temp = randomPositiveDecimal(min, max, digit);
  temp *= 100;
  temp = Math.round(temp) / 100;
  return -1 * temp;
}

//四則計算用の乱数生成
function randomNumForArithmetic(min, max, digit, neg){
  //digitは小数点以下の桁数を表す0ならば整数
  if(digit == 0){
    //負の数を一定確率で出力
    if(neg){
      if(50 < randomPositiveInt(1,100)){
        return randomNegativeInt(min, max);
      }else{
        return randomPositiveInt(min, max);
      }
    }else{
      return randomPositiveInt(min, max);
    }
  }else{
    if(neg){
      if(50 < randomPositiveInt(1,100)){
        return randomNegativeDecimal(min, max, digit);
      }else{
        return randomPositiveDecimal(min, max, digit);
      }
    }else{
      return randomPositiveDecimal(min, max, digit);
    }
  }
}

//方程式用の乱数生成
function randomNumForEquation(min, max, neg, index){
  //初項でなければ負の数は出力しない（カッコをつけるのが困難になるため）
  if(index != 1){
    return randomPositiveInt(min, max);
  }else{
    if(neg){
      if(50 < randomPositiveInt(1,100)){
        return randomNegativeInt(min, max);
      }else{
        return randomPositiveInt(min, max);
      }
    }else{
      return randomPositiveInt(min, max);
    }
  }
}
