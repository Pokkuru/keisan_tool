//計算問題を１文字ずつ出力してxやyの出力に対応する
function questionWriter(h, v, qnum, questionStr){
  if($('#q_type').val() != "simultaneousEquations" && $('#q_type').val() != "linearGraph"){
    doc.text(h, v, "(" + qnum + ") ");
    if(qnum > 9){
      h += 13;
    }else{
      h += 10;
    }
  }
  var i = 0;
  while(i < questionStr.length){
    if(questionStr[i] == "x" || questionStr[i] == "y"){
      doc.setFontType("italic");
      doc.text(h,v,questionStr[i]);
      doc.setFontType("normal");
      if(questionStr[i+1] == "^"){
        doc.setFontSize(9);
        h += 3;
        v -= 3;
        doc.text(h,v,String(questionStr[i+2]));
        v += 3;
        i += 2;
      }
      doc.setFontSize(15);
    }else if(questionStr[i] == "(" || questionStr[i] == ")"){
      doc.text(h,v,questionStr[i]);
    }else if(questionStr[i] == "^"){
      doc.setFontSize(9);
      h += 1;
      v -= 3;
      doc.text(h,v,String(questionStr[i+1]));
      v += 3;
      i += 2;
      doc.setFontSize(15);
    }else if(questionStr[i] == "r"){
      i += 2;
      var inde = 0;
      h+=3;
      while(questionStr[i] != "]"){
        h+=3;
        rootWriter(h,v,questionStr[i],inde);
        inde+=1;
        i+=1;
      }
    }else{
      doc.text(h,v,questionStr[i]);
    }
    if(isInteger(parseInt(questionStr[i+1])) && questionStr[i+1]!=undefined){
      h += 3;
    }else if(questionStr[i+1] == "x" || questionStr[i+1] == "y"){
      h += 4;
    }else if(questionStr[i+1] == "+" || questionStr[i+1] == "-"){
      h += 3;
    }else if(questionStr[i+1] == "="){
      h += 3;
    }else if(questionStr[i+1] == " "){
      h += 2;
    }else if(questionStr[i+1] == ")" || questionStr[i+1] == "("){
      h += 2;
    }else{
      h += 1;
      console.log("error @writer 未定義");
    }
    i+=1;
  }
}

//解答を書く

function answerWriter(h, v, qnum, quesanswer){
  doc.text(h, v, "(" + qnum + ") ");
  if(qnum > 9){
    h += 13;
  }else{
    h += 10;
  }
  var i = 0;
  while(i < quesanswer.length){
    if(quesanswer[i] == "x" || quesanswer[i] == "y"){
      doc.setFontType("italic");
      doc.text(h,v,quesanswer[i]);
      doc.setFontType("normal");

      if(quesanswer[i+1] == "^"){
        doc.setFontSize(9);
        h += 3;
        v -= 3;
        doc.text(h,v,String(quesanswer[i+2]));
        v += 3;
        i += 2;
      }
      doc.setFontSize(15);
    }else if(quesanswer[i] == "(" || quesanswer[i] == ")"){
      doc.text(h,v,quesanswer[i]);
    }else if(quesanswer[i] == "^"){
      doc.setFontSize(9);
      h += 1;
      v -= 3;
      doc.text(h,v,String(quesanswer[i+1]));
      v += 3;
      i += 2;
      doc.setFontSize(15);
    }else if(quesanswer[i] == "r"){
      i += 2;
      var inde = 0;
      h+=1;
      while(quesanswer[i] != "]"){
        h+=3;
        rootWriter(h,v,quesanswer[i],inde);
        inde+=1;
        i+=1;
      }
    }else if(isInteger(parseInt(quesanswer[i]))){
      doc.text(h,v,quesanswer[i]);
    }else{
      doc.text(h,v,quesanswer[i]);
    }
    if(isInteger(parseInt(quesanswer[i+1]))){
      h += 3;
    }else if(quesanswer[i+1] == "x" || quesanswer[i+1] == "y"){
      h += 4;
    }else if(quesanswer[i+1] == "+" || quesanswer[i+1] == "-"){
      h += 3;
    }else if(quesanswer[i+1] == "="){
      h += 3;
    }else if(quesanswer[i+1] == " "){
      h += 2;
    }else if(quesanswer[i+1] == ")"){
      h += 2;
    }else{
      h += 2;
      console.log("error @writer 未定義");
    }
    i+=1;
  }
}

function isInteger(x) {
  return Math.round(x) === x;
}

function rootWriter(h,v,s,ind){
  //ルート記号生成
  doc.setLineWidth(0.3);
  if(ind==0){
    rootH = h-3;
    rootV = v+1;
    doc.line(rootH, rootV, rootH+=0.6, rootV-=1.5);
    doc.line(rootH, rootV, rootH+=0.6, rootV+=1.5);
    doc.line(rootH, rootV, rootH+=0.6, rootV-=5.5);
  }else{
    rootH = h-2.5;
    rootV = v-4.5;
    doc.text(rootH,v,s);
  }
  doc.line(rootH, rootV, rootH+=4, rootV);
  doc.setLineWidth(0.1);
}
