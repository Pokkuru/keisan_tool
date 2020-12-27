/*
連立方程式生成
simultaneousEquations.js
functions
1.quesStrIchiXY()
  第一式・第二式の作成
2.quesStrRen()

type0
  ax + by
  aax + bby
type1
  ax
  aax + bby
type2
  ax + by
  aax
type3
  by
  aax + bby
type4
  ax + by
  bby
*/

function simultaneousEquations(t, ope, ope2, a, b, aa, bb, qnum){
  var uhen;
  var uhen2;

  //方程式の解
  if($('#negativeExist').prop("checked") && randomPositiveInt(0,1) == 0){
    var ans = randomNegativeInt(parseInt($('#minVal').val()), parseInt($('#maxVal').val()));
  }else{
    var ans = randomPositiveInt(parseInt($('#minVal').val()), parseInt($('#maxVal').val()));
  }
  if($('#negativeExist').prop("checked") && randomPositiveInt(0,1) == 0){
    var ans2 = randomNegativeInt(parseInt($('#minVal').val()), parseInt($('#maxVal').val()));
  }else{
    var ans2 = randomPositiveInt(parseInt($('#minVal').val()), parseInt($('#maxVal').val()));
  }

  //問題のタイプに分けて生成
  switch (t){
    case 0:
      var sikiA = quesStrXY(a,b,ans,ans2,ope);
      var sikiB = quesStrXY(aa,bb,ans,ans2,ope2);
      break;
    case 1:
      var sikiA = quesStrX(a,ans);
      var sikiB = quesStrXY(aa,bb,ans,ans2,ope2);
      break;
    case 2:
      var sikiA = quesStrXY(a,b,ans,ans2,ope);
      var sikiB = quesStrX(aa,ans);
      break;
    case 3:
      var sikiA = quesStrY(b,ans2);
      var sikiB = quesStrXY(aa,bb,ans,ans2,ope2);
      break;
    case 4:
      var sikiA = quesStrXY(a,b,ans,ans2,ope);
      var sikiB = quesStrY(bb,ans2);
      break;
    default:
    console.log("error @連立方程式の作成");
  }
  questionWriter(horizontal+18, vertical-7, qnum, sikiA);
  questionWriter(horizontal+18, vertical, qnum, sikiB);
  //doc.text(sikiA, horizontal+18, vertical-7);
  //doc.text(sikiB, horizontal+18, vertical);
  return [ans, ans2];
}

function quesStrXY(a, b, ans, ans2, ope){
  switch (ope) {
    case 0:
      uhen = a*ans + b*ans2;
      a = kakkoRenX(a, true);
      b = kakkoRenY(b, true);
      return a + " + " + b  + " = " + uhen;
      break;
    case 1:
      uhen = a*ans - b*ans2;
      a = kakkoRenX(a, true);
      b = kakkoRenY(b, true);
      return a + " - " + b  + " = " + uhen;
      break;
    default:
      console.log("error @quesStrXY");
      break;
  }
}

function quesStrX(a, ans){
  uhen = a*ans;
  a = kakkoRenX(a, true);
  return a + " = " + uhen;
}

function quesStrY(b, ans){
  uhen = b*ans;
  b = kakkoRenY(b, true);
  return b + " = " + uhen;
}

function kakkoRenX(num, isKeisu){
  if(isKeisu){
    if(num == 1){
      return "x"
    }else if(num == -1){
      return "-x"
    }else{
      return num + "x";
    }
  }else{
    return num;
  }
}

function kakkoRenY(num, isKeisu){
  if(isKeisu){
    if(num == 1){
      return "y"
    }else if(num == -1){
      return "-y"
    }else{
      return num + "y";
    }
  }else{
    return num;
  }
}
