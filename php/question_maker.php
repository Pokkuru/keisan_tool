<?php
function MakeSample(){
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
    .ques-item{
        font-size:2em;
    }
    </style>

    <h1 class="title">計算プリント</h1>
    <table>
        <tr class="ques_tr">
            <td>
                <div class="ques-item">1 + 1<br><br></div>
                <div class="ques-item">1 + 1<br><br></div>
                <div class="ques-item">1 + 1<br><br></div>
                <div class="ques-item">1 + 1<br><br></div>
                <div class="ques-item">1 + 1<br><br></div>
                <div class="ques-item">1 + 1<br><br></div>
                <div class="ques-item">1 + 1<br><br></div>
                <div class="ques-item">1 + 1<br><br></div>
                <div class="ques-item">1 + 1<br><br></div>
            </td>
            <td>
                <div class="ques-item">1 + 1<br><br></div>
                <div class="ques-item">1 + 1<br><br></div>
                <div class="ques-item">1 + 1<br><br></div>
                <div class="ques-item">1 + 1<br><br></div>
                <div class="ques-item">1 + 1<br><br></div>
                <div class="ques-item">1 + 1<br><br></div>
                <div class="ques-item">1 + 1<br><br></div>
                <div class="ques-item">1 + 1<br><br></div>
                <div class="ques-item">1 + 1<br><br></div>
            </td>
        </tr>
    </table>
    EOF;
    return($html);
}

?>