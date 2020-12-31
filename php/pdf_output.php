<?php
/*
PDFの出力を行う
*/

require "../lib/tcpdf/tcpdf.php";

if(isset($_POST['make_pdf'])) {
    MakePdf();
} else {
    echo("ERROR!!: undefined value");
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
    $tcpdf->Output($filename, 'I'); // pdf表示設定
}

?>