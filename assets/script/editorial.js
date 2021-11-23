function muda_pagina(pag, proj,x,y){
      console.log(pag);
      console.log(proj);
      for(var i = 0; i < projectsaux.length; i++){
        projectsaux[i].style.opacity="0";
      }
      document.getElementById("lupa").style.opacity="0";
      document.getElementById("filter").style.opacity="0";

        setTimeout(function() {
          if(pag=="agents"){
            document.location.href = "index.html?x="+x+"&y="+y;
          }else if(pag=="projeto"){
            document.location.href = pag+".html?id="+proj+"&x="+x+"&y="+y;
          }else{
            document.location.href = pag+".html?x="+x+"&y="+y;
          }
        }, 1000);
    }

function pos_edit(elems){
  var topsies=tamanho_celula*6;
  var lefties=tamanho_celula;
  var widthies=tamanho_celula*4;
  var heighties=tamanho_celula*7;

  for(var ps=0;ps<elems.length;ps++){
    elems[ps].style.top=arredonda_cima(scrollY)+topsies+1+"px";
    elems[ps].style.left=arredonda_cima(scrollX)+lefties+1+"px";
    elems[ps].style.width=widthies+"px";
    elems[ps].style.height=heighties+"px";
    lefties+=widthies+tamanho_celula;
    if(lefties+widthies+tamanho_celula>=window.innerWidth-tamanho_celula*4){
      lefties=tamanho_celula;
      topsies+=heighties+tamanho_celula;
    }
    projetos[elems[ps].getAttribute("numero")].expande();
    elems[ps].classList.add("grayscale");
  }

  var kjjaux=document.getElementsByClassName("overlay");
  for(var hjjt=0;hjjt<kjjaux.length;hjjt++){
    kjjaux[hjjt].style.zIndex=10;
  }

}


