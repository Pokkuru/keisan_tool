// 計算プリントの生成の指示中心

let min_val;        // 値の範囲の最小
let max_val;        // 値の範囲の最大
let max_ques;       // 問題の数
let need_date;      // 日付の有無
let need_negative;  // 負の数の有無
let ques_type;      // 問題種類
let questions = [];

// PDF出力ボタン
$('#make_pdf').click(function(){
  min_val = $('#minVal').val();
  max_val = $('#maxVal').val();
  max_ques = $('#maxQues').val();
  need_negative = $('#needNegative').prop("checked");
  need_date = $('#needDate').prop("checked");
  ques_type = $('#q_type').val();

  // 数値でない入力を弾く
  if(!isFinite(min_val)){
    alert("エラー：値の範囲に入力された値が数値でないため動作を停止しました");
    return(0);
  }
  if(!isFinite(max_val)){
    alert("エラー：値の範囲に入力された値が数値でないため動作を停止しました");
    return(0);
  }
  if(!isFinite(max_ques)){
    alert("エラー：問題数に入力された値が数値でないため動作を停止しました");
    return(0);
  }else if(max_ques > 1000){
    alert("問題数が多すぎます！1000題以下までしか出力できません");
    return(0);
  }

  // デバッグ情報
  console.log("最小の値：" + min_val);
  console.log("最大の値：" + max_val);
  console.log("問題数：" + max_ques);
  console.log("負数の有無：" + need_negative);
  console.log("日付の有無：" + need_date);
  console.log("問題種類：" + ques_type);
  
  // 問題生成部
  if(ques_type == "addition" || ques_type == "subtraction" || ques_type == "multiplication" || ques_type == "division"){
    // 四則計算問題生成部
    for(var i = 0; i < max_ques; i++){
      questions.push(new QuestionClass());
      questions[i].create();
    }
  }

  PostPHP().done(function(data, status, xhr) {
    //成功時の処理
    console.log("成功");
  }).fail(function(XMLHttpRequest, status, errorThrown) {
    //失敗時の処理
    console.log(XMLHttpRequest);
    console.log(errorThrown);
  });
});

function PostPHP(){
  return $.ajax({
    url:'./php/pdf_output.php',
    type:'GET',
    //dataType: 'JSON',
    data:{
      make_pdf: true
    }
  })
}

