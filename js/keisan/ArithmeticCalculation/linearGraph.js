function linearGraph(a, b, ope, qnum){
  var temp = randomPositiveInt(0,15);
  if(temp%3 == 0){
    a = kakkoLinearGraph(a,true);
    //doc.text(horizontal+10, vertical-3, "y = "+a);
    questionWriter(horizontal+10, vertical-3, qnum, "y = "+a);
  }else if(temp == 10){
    //doc.text(horizontal+10, vertical-3, "y = "+a);
    questionWriter(horizontal+10, vertical-3, qnum, "y = "+a);
  }else if (temp == 1) {
    //doc.text(horizontal+10, vertical-3, "x = "+a);
    questionWriter(horizontal+10, vertical-3, qnum, "y = "+a);
  }else{
    ope = randomPositiveInt(0,1);
    if(ope == 0){
      ope=" + ";
    }else{
      ope=" - ";
    }
    a = kakkoLinearGraph(a,true);
    b = kakkoLinearGraph(b,false);
    //doc.text(horizontal+10, vertical-3, "y = "+a+ope+b)
    questionWriter(horizontal+10, vertical-3, qnum, "y = "+a+ope+b);
  }
}


function kakkoLinearGraph(num, isKeisu){
  if(isKeisu){
    if(num == 1){
      return "x";
    }else if(num == -1){
      return "-x"
    }else{
      return num + "x";
    }
  }else{
      return num;
  }
}

//空のグラフを作成する
function emptyGraphMaker(x_cordinate, y_cordinate){
  var startX = x_cordinate;
  var startY = y_cordinate;
  var diffX = 0;
  var diffY = 0;
  var i = 0;
  doc.setLineWidth(0.1);
  while(i <= 12){
    if(i%6==0 && i<10 && i>0){
      doc.setLineWidth(0.5);
      doc.line(x_cordinate+diffX, y_cordinate+diffY, x_cordinate+diffX, y_cordinate+diffY+60);
      doc.setLineWidth(0.1);
    }else{
      doc.line(x_cordinate+diffX, y_cordinate+diffY, x_cordinate+diffX, y_cordinate+diffY+60);
    }
    diffX += 5;
    i += 1;
  }
  i = 0;
  diffX = 0;
  while(i <= 12){
    if(i%6==0 && i<10 && i>0){
      doc.setLineWidth(0.5);
      doc.line(x_cordinate+diffX, y_cordinate+diffY, x_cordinate+diffX+60, y_cordinate+diffY);
      doc.setLineWidth(0.1);
    }else{
      doc.line(x_cordinate+diffX, y_cordinate+diffY, x_cordinate+diffX+60, y_cordinate+diffY);
    }
    diffY += 5;
    i += 1;
  }
}
