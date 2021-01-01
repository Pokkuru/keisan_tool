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
        <p>四則計算・一次方程式の練習プリント（PDF）生成！</p>
        使用方法
        <ol>
            <li>計算問題の種類を選ぶ</li>
            <li>使用する値の範囲を決める</li>
            <li>問題数を入力する<b>18題で1ページ</b>埋まります
            <li>負の数の有無を選ぶ</li>
            <li>日付の有無を選ぶ</li>
            <li>「問題作成開始」ボタンを押す</li>
        </ol>
    </div>
</main>

<main class="container mt-4 mb-4">
    <div class="bg-light p-4 rounded">
        <form action="keisan.php" method="post">
            <div class="form-group">
                <label class="control-label">問題種類</label>
                <select class="form-control" id="q_type">
                    <option value="addition">たし算</option>
                    <option value="subtraction">ひき算</option>
                    <option value="multiplication">かけ算</option>
                    <option value="division">わり算</option>
                </select>
            </div>

            <div class="form-group">
                <label class="control-label">値の最小値</label>
                <input type="text" class="form-control" id="minVal" value="1">
            </div>

            <div class="form-group">
                <label class="control-label">値の最大値</label>
                <input type="text" class="form-control" id="maxVal" value="10">
            </div>

            <div class="form-group">
                <label class="control-label">問題数</label>
                <input type="text" class="form-control" id="maxQues" value="18">
            </div>

            <div class="form-group">
                <label class="control-label">負の数を入れますか？</label>
                <div class="checkbox">
                    <label>
                    <input type="checkbox" value="" id="needNegative">
                    負の数を入れます
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label class="control-label">日付を入れますか？</label>
                <div class="checkbox">
                    <label>
                    <input type="checkbox" value="" id="needDate">
                    日付を入れます
                    </label>
                </div>
            </div>

            <div class="form-group d-grid gap-2 mt-4">
                <button type="submit" name="make_pdf" class="btn btn-primary btn-lg btn-block">問題作成開始</button>
            </div>
        </form>

    </div>
</main>

<footer class="footer bg-dark">
    <div class="container">
        <p class="p-3 text-white" style="text-align:center">クロノス情報研究所</p>
    </div>
</footer>

<?php
require "./lib/tcpdf/tcpdf.php";
require "./php/question_maker.php";

if(isset($_POST['make_pdf'])) {
    MakePdf();
}

// PDFを作成するために呼び出す
function MakePdf(){
    $tcpdf = new TCPDF();
    $tcpdf -> setPrintHeader(false);
    $tcpdf -> AddPage();
    $tcpdf -> SetFont("kozgopromedium", "", 10); 
    
    // 問題のHTML作成と追加
    $html = MakeSample();
   
    $tcpdf->writeHTML($html); // 表示htmlを設定
    $filename = "print.pdf";
    ob_end_clean();
    $return_value = $tcpdf->Output($filename, 'I'); // pdf表示設定
    return($return_value);
}
?>
</body>

<!--JavaScript-->
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
<script src="js/keisan.js"></script>
<script src="js/questionClass.js"></script>
<script src="js/arithmetic.js"></script>
<script src="js/randomNum.js"></script>
</html>