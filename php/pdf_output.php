<!--処理部-->
<?php
include "../lib/tcpdf/tcpdf.php";

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
    $filename = "print.pdf";
    ob_end_clean();
    $tcpdf->Output($filename, 'I'); // pdf表示設定
}

?>