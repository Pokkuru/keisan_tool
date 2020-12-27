function initializeTeX(){
  texCode += "\\documentclass[twocolumn, fleqn, a4j,uplatex]{article}\n";
  texCode += "\\usepackage[dvipdfmx]{graphicx}\n";
  texCode += "\\title{Questions}\n";
  texCode += "\\date{}\n";
  texCode += "\\begin{document}\n";
  texCode += "\\parindent = 0pt\n";
  texCode += "\\textwidth = 180mm\n";
  texCode += "\\textheight = 270mm\n";
  texCode += "\\topmargin =-25mm\n";
  texCode += "\\columnseprule = 0.4pt\n";
  texCode += "\\oddsidemargin =-15mm\n";
  texCode += "\\evensidemargin =-15mm\n";
  texCode += "\\twocolumn[\n";
  texCode += "\\begin{center}\n";
  texCode += "\\LARGE\\textbf{Questions}\n";
  texCode += "\\end{center}\n";
  texCode += "\\vspace{1zw}]\n";
  texCode += "\\fontsize{17.28pt}{0pt}\\selectfont\n";
}

function finalizeTeX(){
  texCode += "\\end{document}\n";
}
