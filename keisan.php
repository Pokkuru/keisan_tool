<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">    
<title>計算問題プリント生成ツール</title>

<!--CSS-->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
<link href="./css/bs_info.css" rel="stylesheet" type="text/css">

</head>
<body>
<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fulid">
        <a class="navbar-brand" href="https://chronos-infotech.com/">クロノス情報研究所</a>
    </div>
</nav>

<main class="container">
    <div class="bs-callout bs-callout-info p-4">
        <h3>計算問題プリント生成ツール</h3>
        <p>四則計算・一次方程式・連立方程式・乗法公式を用いた展開と因数分解・一次関数グラフの解答付き（一次関数グラフ除く）の練習プリント（PDF）生成！</p>
        <p>使用方法</p>
        <p>1．計算問題の種類を選ぶ</p>
        <p>2．数字の種類を選ぶ</p>
        <p>3．使用する値の範囲を決める<b>（半角整数値）</b></p>
        <p>4．問題数を入力する<b>（半角整数値）</b><br>
            <ul>
            <li><b>四則，一次方程式，乗法公式，平方根は26題で1ページ</b>埋まります</li>
            <li><b>連立方程式は8題で1ページ</b>埋まります</li>
            <li><b>一次関数グラフは6題で1ページ</b>埋まります</li>
            </ul>
        <p>5．負の数の有無を選ぶ</p>
        <p>6．日付の有無を選ぶ</p>
        <p>7．「問題作成開始」ボタンを押す</p>
        <br>
        <p>注意<br>
            ・動作はFireFoxで検証しています。GoogleChromeはセキュリティ強化のため現在非対応です。（改善予定）<br>
            ・割り算・一次方程式・連立方程式・一次関数グラフは小数値を指定しても整数値のみの出力となります<br>
            <b>・一次関数グラフの解答は出力されません<br>
            ・一次関数グラフの値範囲によってはグラフに収まりきりませんのでご注意ください（推奨：最大値6以下）</b></p>
    </div>
</main>

<main class="container mt-4">
    <div class="bg-light p-4 rounded">
        <form>
        <div class="form-group">
            <label class="control-label">問題種類</label>
            <select class="form-control">
                <option value="addition">たし算</option>
                <option value="subtraction">ひき算</option>
                <option value="multiplication">かけ算</option>
                <option value="division">わり算</option>
                <option value="linearEquation">一次方程式</option>
                <option value="simultaneousEquations">連立方程式</option>
                <option value="linearGraph">一次関数グラフ</option>
                <option value="expand">乗法公式</option>
                <option value="factorization">因数分解</option>
                <option value="additionRoot">★★★★★平方根のたし算（テスト中）★★★★★</option>
                <option value="subtractionRoot">★★★★★平方根の引き算（テスト中）★★★★★</option>
            </select>
        </div>

        <div class="form-group">
            <label class="control-label">数字種類</label>
            <select class="form-control" id="n_type">
                <option value="integer">整数</option>
                <option value="decimal">小数</option>
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
            <input type="text" class="form-control" id="maxQues" value="26">
        </div>

        <div class="form-group">
            <label class="control-label">負の数を入れますか？</label>
            <div class="checkbox">
                <label>
                <input type="checkbox" value="" id="negativeExist">
                負の数を入れます
                </label>
            </div>
        </div>

        <div class="form-group">
            <label class="control-label">日付を入れますか？</label>
            <div class="checkbox">
                <label>
                <input type="checkbox" value="" id="dateExist">
                日付を入れます
                </label>
            </div>
        </div>
        <div class="d-grid gap-2">
              <button class="btn btn-primary btn-lg btn-block">問題作成開始</button>
        </div>
        </form>
    </div>

</main>


<!--処理部-->
<?php
include "./lib/tcpdf/tcpdf.php";

if(isset($_POST['make_pdf'])) {
    MakePdf();
} else if(isset($_POST['debug'])) {
    echo("It,s debug mode");
}

function MakePdf(){
    $tcpdf = new TCPDF();
    $tcpdf -> setPrintHeader(false);    // ヘッダー線削除
    $tcpdf -> AddPage();
    $tcpdf -> SetFont("kozgopromedium", "", 10); 
    $html = <<< EOF
    <style>
        h1 {
            font-size: 20pt;
            color:black;
            text-align: center;
        }
    </style>
    <h1>計算プリント</h1>
    <p>
        これはサンプル出力
    </p>
    EOF;
    
    $tcpdf->writeHTML($html); // 表示htmlを設定
    ob_end_clean();
    $tcpdf->Output('keisan_print.pdf', 'I'); // pdf表示設定
}

?>
<form action="keisan_php.php" method="post">
    <button type="submit" name="debug">デバッグ</button>
</form>
</body>

<!--JavaScript-->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
</html>