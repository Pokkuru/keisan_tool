//グローバル変数
var texCode = ""; //TeXのコード
var totalOfQuestion = 0;  //問題数の合計
var questions=[]; //問題配列
$(function(){
  var addCounter = 0; //問題追加ボタンを押した回数
  var i = 0;  //一時カウンタ
  $('body').css("height", "1350px");
  
  //問題追加ボタン処理
  $('#addQuestion').click(function(){
    addQuestion();
  });
  //TeX出力ボタン処理
  $('#TeXOutput').click(function(){
    if(addCounter == 0){
      alert("問題追加がされていません");
    }
    $('#addQuestion').prop("disabled", true); //問題追加ボタンの無効化
    $("#TeXOutput").prop("disabled", true);   //TeX出力ボタンの無効化
    texOutput();
  });

  //問題追加処理
  function addQuestion(){
    //問題追加ボタンを押した回数が0のとき初期化処理を行う
    if(addCounter == 0){
      initializeTeX();  //初期化
    }
    //追加処理
    i = totalOfQuestion;  //合計値を一時変数に代入
    temp = totalOfQuestion; //合計値を一時変数に代入
    while(parseInt($('#maxQues').val())+temp > i){
      questions[i] = new QuestionClass(i+1);
      questions[i].create();
      i++;
      totalOfQuestion++;
    }
    addCounter++;
  }

  function texOutput(){
    i = 0;
    texCode += "\\newpage\n";
    texCode += "\\twocolumn[\n"
    texCode += "\\begin{center}\n"
    texCode += "\\LARGE\\textbf{Answers}\n"
    texCode += "\\end{center}\n"
    texCode += "\\vspace{0zw}]\n"
    texCode += "\\fontsize{17.28pt}{0pt}\\selectfont\n"

    while(i < totalOfQuestion){
      questions[i].writeAns();
      i++;
    }
    finalizeTeX();
    $('.TeXCodeWindow').text(texCode);
  }

});
