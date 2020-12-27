//===========
// グローバル変数
//===========
var questions = []; //問題
var questionMaxItem = 200;
var generateFlag = false; //初回検出用
var doc;  //pdfドキュメントのソース
var vertical = 30; //書き込み座標の縦
var horizontal = 10; //書き込み座標の横
var text;
$(function(){
  //$('body').css("min-height", "1000px");
  //PDF出力
  $('#pdfOutput').click(function(){
    vertical = 30; //書き込み座標の縦
    horizontal = 10; //書き込み座標の横

    //数値でない入力を弾く
    if(!isFinite($('#minVal').val())){
      alert("エラー：値の範囲に入力された値が数値でないため動作を停止しました");
      return(0);
    }
    if(!isFinite($('#maxVal').val())){
      alert("エラー：値の範囲に入力された値が数値でないため動作を停止しました");
      return(0);
    }
    if(!isFinite($('#maxQues').val())){
      alert("エラー：問題数に入力された値が数値でないため動作を停止しました");
      return(0);
    }else if($('#maxQues').val() > 1000){
      alert("問題数が多すぎます！1000題以下までしか出力できません");
      return(0);
    }else{
      questionMaxItem = $('#maxQues').val();
    }

    doc = new jsPDF();
    doc.setFont("times");

    doc.text(88, 12, "Questions");  //PDF表題
    centerline(); //中心線描画
    if($('#dateExist').prop("checked")){
      doc.text(150, 12, dateMaker()); //日付
    }

    var i = 0;
    if($('#q_type').val()!= "simultaneousEquations" && $('#q_type').val()!= "linearGraph"){
      //一般計算問題（四則・一次方程式）生成部
      while(questionMaxItem > i){
        if(i % 26 == 0 && i > 0){
          doc.addPage();
          centerline(); //中心線描画
          horizontal = 10;
          vertical = 30;
        }else if(0 == i % 13 && i > 0){
          horizontal = 110;
          vertical = 30;
        }
        questions[i] = new QuestionClass(i+1, $('#q_type').val(), $('#n_type').val());
        questions[i].create();
        console.log(questions[i].retAns());
        i++;
        vertical += 20;
      }
    }else if($('#q_type').val()== "simultaneousEquations"){
      //多段計算問題（連立方程式）生成部
      while(questionMaxItem > i){
        if(i % 8 == 0 && i > 0){
          doc.addPage();
          centerline(); //中心線描画
          vertical = 30; //書き込み座標の縦
          horizontal = 10; //書き込み座標の横
        }else if(i % 4 == 0 && i > 0){
          horizontal = 110;
          vertical = 30;
        }
        doc.setFontSize(15);
        doc.text("(" + parseInt(i+1) + ")", horizontal, vertical-3);
        doc.setFontSize(50);
        doc.text("{", horizontal+10, vertical);
        doc.setFontSize(15);
        questions[i] = new QuestionClass(i+1, $('#q_type').val(), $('#n_type').val());
        questions[i].create();
        vertical += 70;
        i += 1;
      }
    }else if($('#q_type').val() == "linearGraph"){
      //一次グラフ用
      while(questionMaxItem > i){
        if(i % 6 == 0 && i > 0){
          doc.addPage();
          centerline(); //中心線描画
          vertical = 30; //書き込み座標の縦
          horizontal = 10; //書き込み座標の横
        }else if(i % 3 == 0 && i > 0){
          horizontal = 110;
          vertical = 30;
        }
        doc.setFontSize(15);
        doc.text("(" + parseInt(i+1) + ")", horizontal, vertical-3);
        questions[i] = new QuestionClass(i+1, $('#q_type').val(), $('#n_type').val());
        emptyGraphMaker(horizontal+10, vertical+5);
        questions[i].create();
        vertical += 90;
        i += 1;
      }
    }

    //解答生成部
    if($('#q_type').val() != "linearGraph"){
      doc.addPage();
      doc.text(90, 12, "Answers");  //PDF表題
      centerline(); //中心線描画
      horizontal = 10;
      vertical = 30;
      i = 0;
      if($('#q_type').val()!= "simultaneousEquations" && $('#q_type').val()!= "linearGraph" && $('#q_type').val()!= "expand" && $('#q_type').val()!= "factorization"){
        while(questionMaxItem > i){
          if(0 == i % 150 && i > 0){
            doc.addPage();
            centerline(); //中心線描画
            horizontal = 10;
            vertical = 30;
          }else if(0 == i % 75 && i > 0){
            horizontal = 110;
            vertical = 30;
          }else if(0 == i % 3 && i > 0){
            if(horizontal > 100){
              horizontal = 110
            }else{
              horizontal = 10;
            }
            vertical += 10;
          }
          questions[i].writeAns();
          i ++;
          horizontal += 30;
        }
      }else if($('#q_type').val()== "simultaneousEquations"){
        while(questionMaxItem > i){
          if(i % 108 == 0 && i > 0){
            doc.addPage();
            centerline(); //中心線描画
            horizontal = 10;
            vertical = 30;
          }else if(i % 54 == 0 && i > 0){
            horizontal = 110;
            vertical = 30;
          }else if(i%2 == 0 && i > 0){
            if(horizontal > 100){
              horizontal = 110;
            }else{
              horizontal = 10;
            }
            vertical += 10;
          }
          questions[i].writeAns();
          i++;
          horizontal += 45;
        }
      }else if($('#q_type').val() == "expand" || $('#q_type').val() == "factorization"){
        while(questionMaxItem > i){
          if(i%52 == 0 && i > 0){
            doc.addPage();
            centerline(); //中心線描画
            horizontal = 10;
            vertical = 30;
          }else if(i%26 == 0 && i > 0){
            horizontal = 110;
            vertical = 30;
          }
          questions[i].writeAns();
          i++;
          vertical += 10;
        }
      }
    }
    doc.output('datauri');  //PDF出力
  });

  //中心線
  function centerline(){
    doc.setLineWidth(0.1);
    doc.line(100, 20, 100, 290);
  }

  //日付
  function dateMaker(){
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    if(m < 10){
      m = "0" + m;
    }
    if(d < 10){
      d = "0" + d;
    }
    return(y + "." + m + "." + d);
  }
});
