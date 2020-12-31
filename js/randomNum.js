// 乱数生成関数

// 正の整数の乱数を生成する
function randomPositiveInt(min, max){
  var retVal = Math.floor(Math.random() * (max - min + 1)) + min;
  return retVal;
}

// 負の整数の乱数を生成する
function randomNegativeInt(min, max){
  return -1 * (randomPositiveInt(min, max));
}

// 正の小数の乱数を生成する
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

// 負の小数の乱数を生成する（入力値は正であること）
function randomNegativeDecimal(min, max, digit){
  var temp = randomPositiveDecimal(min, max, digit);
  temp *= 100;
  temp = Math.round(temp) / 100;
  return -1 * temp;
}

// 四則計算用の乱数生成
function randomNumArithmetic(min, max, digit, neg){
  // digitは小数点以下の桁数を表す0ならば整数
  if(digit == 0){
    // 負の数を一定確率で出力
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