/*==================
factorization.js
展開・乗法公式
type0 (x ± a)(x ± b)
type1 (x ± a)^2
type2 (x + a)(x - b)
type3 (x - a)(x + b)
↑70%
↓30%
type4 (aax ± a)(bbx ± b)
type5 (aax ± a)^2
type6 (aax + a)(bbx - b)
type7 (aax - a)(bbx + b)
==================*/

function factorization(t, ope, ope2, a, b, aa, bb, qnum){
  var answer;
  var q;
  //type0
  if(ope ==  ope2){
    //演算子が同じ
    if(ope == 0){
      //演算子がプラス
      q = "x^2+" + (a+b) + "x+" + a*b;
    }else{
      //演算子がマイナス
      q = "x^2-" + (a+b) + "x+" + a*b;
    }
  }else{
    //演算子が異なる
    if(a == b){
      q = "x^2-" + a*b;
    }else{
      if(ope == 0){
        //第一括弧の演算子がプラス
        if(a<b){
          if((b-a) == 1){
            q = "x^2-" + "x-" + a*b;
          }else{
            q = "x^2-" + (b-a) + "x-" + a*b;
          }
        }else{
          if((a-b) == 1){
            q = "x^2+" + "x-" + a*b;
          }else{
            q = "x^2+" + (a-b) + "x-" + a*b;
          }
        }
      }else{
        //第一括弧の演算子がマイナス
        if(a<b){
          if((b-a) == 1){
            q = "x^2+" + "x-" + a*b;
          }else{
            q = "x^2+" + (b-a) + "x-" + a*b;
          }
        }else{
          if((a-b) == 1){
            q = "x^2-" + "x-" + a*b;
          }else{
            q = "x^2-" + (a-b) + "x-" + a*b;
          }
        }
      }
    }
  }

  //type1
  if(t == 1){
    if(ope == 0){
      q = "x^2+" + 2*a + "x+" + a*a;
    }else{
      q = "x^2-" + 2*a + "x+" + a*a;
    }
  }

  if(ope  == 0){ope  = " + ";}else{ope  = " - ";}
  if(ope2 == 0){ope2 = " + ";}else{ope2 = " - ";}
  switch(t){
    case 0:
      answer = " (x" + ope + a + " )" + "(x" + ope2 + b + " )";
      //answer = "x^2 + 10x + 16";
      break;
    case 1:
      answer = " (x" + ope + a + " )^2";
      //answer = "x^2 + 10x + 16";
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
    case 6:
      break;
    default:
      console.log("error @expand");
      break;
  }
  questionWriter(horizontal, vertical, qnum, q);
  return answer;
}

//文字付与関数
function kakkoExpand(num, isKeisu){
  if(isKeisu){
    if(num == 1){
      return "x"
    }else if(num == -1){
      return "-x"
    }else{
      return num+"x";
    }
  }else{
    return num;
  }
}
