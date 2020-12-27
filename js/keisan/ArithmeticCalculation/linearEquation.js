/*
一次方程式問題生成
Generate linear Equation
機能
問題発行：quesStrIchi(int 問題タイプ, int 第一項, int 第二項, int 解, int 演算子タイプ)
  戻り値 問題文
カッコ生成：kakkoLinear(int カッコをつける数字, boolean その数字が文字と一緒か)
  戻り値 カッコつきまたは適切な形式の計算式パーツ

一次方程式のタイプ 0:ax + b, 1:a + bx, 2:ax, 3:ax + bx
*/

function linearEquation(t, o, a, b, qnum){
  //方程式の解
  if($('#negativeExist').prop("checked") && randomPositiveInt(0,1) == 0){
    var ans = randomNegativeInt(parseInt($('#minVal').val()), parseInt($('#maxVal').val()));
  }else{
    var ans = randomPositiveInt(parseInt($('#minVal').val()), parseInt($('#maxVal').val()));
  }
  var uhen;
  //問題のタイプに分けて生成
  switch (t) {
    case 0:
      if(o == 0){
        uhen = a*ans+b;
        a = kakkoLinear(a, true);
        b = kakkoLinear(b, false);
        q = a + " + " + b + " = " + uhen;
      }else{
        uhen = a*ans-b;
        a = kakkoLinear(a, true);
        b = kakkoLinear(b, false);
        q = a + " - " + b + " = " + uhen;
      }
      break;
    case 1:
      if(o == 0){
        uhen = a+b*ans;
        a = kakkoLinear(a, false);
        b = kakkoLinear(b, true);
        q = a + " + " + b + " = " + uhen;
      }else{
        uhen = a-b*ans;
        a = kakkoLinear(a, false);
        b = kakkoLinear(b, true);
        q = a + " - " + b + " = " + uhen;
      }
      break;
    case 2:
      while(a == 1){
        a = randomNumForEquation(parseInt($('#minVal').val()), parseInt($('#maxVal').val()), $('#negativeExist').prop("checked"), 1);
      }
      uhen = a*ans;
      a = kakkoLinear(a, true);
      q = a + " = " + uhen;
      break;
    case 3:
      uhen = a*ans+b*ans;
      if(o == 0){
        a = kakkoLinear(a, true);
        b = kakkoLinear(b, true);
        q =  a + " + " + b + " = " + uhen;
      }else{
        uhen = a*ans-b*ans;
        a = kakkoLinear(a, true);
        b = kakkoLinear(b, true);
        q =  a + " - " + b + " = " + uhen;
      }
    default:
      console.log("error 一次方程式の作成");
  }
  questionWriter(horizontal, vertical, qnum, q);
  //doc.text(horizontal, vertical, "(" + qnum + ") " + q);
  return ans;
}

//文字付与関数
function kakkoLinear(num, isKeisu){
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
