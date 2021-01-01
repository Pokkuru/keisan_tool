<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">    
<title>計算問題プリント生成ツール</title>

<!--CSS-->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
<link href="./css/bs_info.css" rel="stylesheet" type="text/css">
<link href="./css/style.css" rel="stylesheet" type="text/css">
</head>

<body>
<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fulid px-4">
        <a class="navbar-brand" href="https://chronos-infotech.com/">クロノス情報研究所</a>
    </div>
</nav>

<main class="container">
    <div class="bs-callout bs-callout-info p-4">
        <h3>計算問題プリント生成ツール</h3>
        <p>四則計算の練習プリント（PDF）生成！</p>
        使用方法
        <ol>
            <li>計算問題の種類を選ぶ</li>
            <li>使用する値の範囲を決める</li>
            <li>「問題作成開始」ボタンを押す</li>
        </ol>
    </div>
</main>

<main class="container mt-4 mb-4">
    <div class="bg-light p-4 rounded">
        <form action="keisan.php" method="post">
            <div class="form-group">
                <label class="control-label">問題種類</label>
                <select class="form-control" name="qType">
                    <option value="addition">たし算</option>
                    <option value="subtraction">ひき算</option>
                    <option value="multiplication">かけ算</option>
                    <option value="division">わり算</option>
                </select>
            </div>

            <div class="form-group">
                <label class="control-label">値の最小値</label>
                <input type="text" class="form-control" name="minVal" value="1">
            </div>

            <div class="form-group">
                <label class="control-label">値の最大値</label>
                <input type="text" class="form-control" name="maxVal" value="10">
            </div>

            <div class="form-group d-grid gap-2 mt-4">
                <button type="submit" name="make_pdf" class="btn btn-primary btn-lg btn-block">問題作成開始</button>
            </div>
        </form>

    </div>
</main>



<?php
require "./lib/tcpdf/tcpdf.php";

$min_val = $_POST['minVal'];        // 値の範囲の最小
$max_val = $_POST['maxVal'];        // 値の範囲の最大
$ques_type = $_POST['qType'];       // 問題種類
if(isset($_POST['make_pdf'])) {
    global $min_val, $max_val, $need_date, $ques_type;

    $tcpdf = new TCPDF();
    $tcpdf -> setPrintHeader(false);
    $tcpdf -> AddPage();
    $tcpdf -> SetFont("kozgopromedium", "", 10); 

    // 問題のHTML作成と追加
    $html = MakeQuestion($min_val, $max_val, $need_date, $ques_type);
    $tcpdf->writeHTML($html); // 表示htmlを設定
    $filename = "print.pdf";
    ob_end_clean();
    $tcpdf->Output($filename, 'I'); // pdf表示設定

}

class Question{
    public $ques;
    public $answer;

    //問題作成
    function GenerateQuestion($min_val, $max_val, $ques_type){
        // 四則計算
        $a = MakeArithmeticNumber($min_val, $max_val);
        $b = MakeArithmeticNumber($min_val, $max_val);
        // 解答作成
        switch($ques_type){
            // 四則計算
            case "addition":
                $this->ques = $a . " ＋ " . $b;
                $this->answer = addtion($a, $b);
                break;
            case "subtraction":
                $this->ques = $a . " － " . $b;
                $this->answer = subtraction($a, $b);
                break;
            case "multiplication":
                $this->ques = $a . " × " . $b;
                $this->answer = multiplication($a, $b);
                break;
            case "division":
                $this->ques = $a . " ÷ " . $b;
                $this->answer = division($a, $b);
                break;
        }
    }
}

//==========
// 乱数生成
//==========
function MakeArithmeticNumber($min_val, $max_val){
    if($need_negative){
    if(50 < PositiveInt(1,100)){
        return NegativeInt($min_val, $max_val);
    }else{
        return PositiveInt($min_val, $max_val);
    }
    }else{
        return PositiveInt($min_val, $max_val);
    }
}

// 正の整数の乱数
function PositiveInt($min_val, $max_val){
    return rand($min_val, $max_val);
}

// 負の整数の乱数
function NegativeInt($min_val, $max_val){
    return -1 * PositiveInt($min_val, $max_val);
}

// 足し算
function Addtion($a, $b){
    return $a + $b;
}

// 引き算
function subtraction($a, $b){
    if($a<$b && $need_negative == false){
        $temp = $a;
        $a = $b;
        $b = $temp;
    }
    return $a - $b;
}

// 掛け算
function multiplication($a, $b){
    return $a * $b;
}

// 割り算
function division($a,  $b){
    $temp = $a/$b;
    return $temp;
}

// 四則計算のための括弧
function kakkoArithmetic($num){
    if($num < 0){
        $text = "(" + $num + ")";
        return $text;
    }else{
        return $num;
    }
}

class StrMake{
    function MakePDFStr($questions){
        // PDF内の問題のテーブルを作成する
        $html = '<td>';
        for($i = 0; $i < 9; $i++){
            $qnum = $i + 1;
            $html = $html . "<div>($qnum) {$questions[$i]->ques} <br><br></div>";
        }
        $html = $html . '</td><td>';
        for($i = 9; $i < 18; $i++){
            $qnum = $i + 1;
            $html = $html . "<div>($qnum) {$questions[$i]->ques} <br><br></div>";
        }
        $html = $html . '</td>';
        return($html);
    }
}

$questions = array();

function MakeQuestion($min_val, $max_val, $need_date, $ques_type){
    global $questions;
    // 四則計算問題生成部（18題）
    for($i = 0; $i < 18; $i++){
        $questions[] = new Question;
        $questions[$i]->GenerateQuestion($min_val, $max_val, $ques_type);
    }
    $ms = new StrMake();
    $html = <<< EOF
    <style>
    table{
        height: 100%;
    }
    .title{
        font-size: 2em;
        height: 2em;
        text-align: center;
    }
    table{
        font-size:1.6em;
    }
    </style>

    <h1 class="title">計算プリント</h1>
    <table>
        <tr class="ques_tr">
            {$ms->MakePDFStr($questions)}
        </tr>
    </table>

    EOF;
    return($html);
}


?>
</body>

<!--JavaScript-->
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
</html>