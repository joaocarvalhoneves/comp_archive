var this_going_reset=0;

var bottomest_one=0;
function muda_pagina(pag, proj,x,y){
      console.log(pag);
      console.log(proj);
      for(var i = 0; i < projectsaux.length; i++){
        projectsaux[i].style.opacity="0";
      }

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

  if(window.innerWidth<700){
    topsies=tamanho_celula*12;
    heighties=arredonda_baixo((window.innerWidth/tamanho_celula+1)*tamanho_celula);

  }

  for(var ps=0;ps<elems.length;ps++){
    if(arredonda_cima(scrollY)+topsies>bottomest_one){
      bottomest_one=arredonda_cima(scrollY)+topsies;
    }
    
    console.log(arredonda_cima(scrollY)+topsies);
    elems[ps].style.top=arredonda_cima(topsies)+1+"px";
    elems[ps].style.left=arredonda_cima(scrollX)+lefties+1+"px";
    elems[ps].style.width=widthies+"px";
    elems[ps].style.height=heighties+"px";
    elems[ps].style.display="block";
    lefties+=widthies+tamanho_celula;
    if(lefties+widthies+tamanho_celula>=window.innerWidth-tamanho_celula*4){
      lefties=tamanho_celula;
      topsies+=heighties+tamanho_celula;
    }
    projetos[elems[ps].getAttribute("numero")].expande();
    //elems[ps].classList.add("grayscale");
  }

  var kjjaux=document.getElementsByClassName("overlay");
  for(var hjjt=0;hjjt<kjjaux.length;hjjt++){
    kjjaux[hjjt].style.zIndex=10;
  }

if(window.innerWidth<700){
  var d=document.getElementsByClassName("projeto");
  for(var l=0;l<d.length;l++){
    console.log("treta");
    d[l].style.width=arredonda_baixo((window.innerWidth/tamanho_celula-2)*tamanho_celula)+"px";
    d[l].style.height=arredonda_baixo((window.innerWidth/tamanho_celula+1)*tamanho_celula)+"px";
    d[l].childNodes[0].style.fontSize="18px";
    d[l].childNodes[1].style.fontSize="12px";
    d[l].childNodes[3].style.fontSize="12px";
  }
}


}


function burn_them(){
  this_going_reset=0;
  var projetos_2=document.getElementsByClassName("projeto");

  var filtros_2=document.getElementsByClassName("filtros");
  var this_one_is_very_good;
  var qts_overlays=0;

  var elems=document.getElementsByClassName("projeto");
  var topsies=tamanho_celula*6;
  if(window.innerWidth<700){
    topsies=tamanho_celula*12;
  }
  var lefties=tamanho_celula;
  var widthies=tamanho_celula*4;
  var heighties=tamanho_celula*7;

  for(var kkx=0; kkx<projetos_2.length; kkx++){
    projetos_2[kkx].style.display="none";
  }

  
  for(var ps=0;ps<elems.length;ps++){
    this_one_is_very_good=0;

    for(var jkk=0; jkk<filtros_2.length;jkk++){
      var tipo_2=filtros_2[jkk].classList[filtros_2[jkk].classList.length-1];
      if(elems[ps].classList.contains(tipo_2) && tipo_2!="overlay" && tipo_2!="unckeck"){
        this_one_is_very_good=1;
      }
      if(tipo_2=="overlay" || tipo_2=="uncheck"){
        qts_overlays++;
      }
    }

    if(this_one_is_very_good==1){

      elems[ps].style.display="block";
      elems[ps].style.animation="none";
      elems[ps].style.top=arredonda_cima(topsies)+1+"px";
      elems[ps].style.left=arredonda_cima(scrollX)+lefties+1+"px";
      lefties+=widthies+tamanho_celula;
      if(lefties+widthies+tamanho_celula>=window.innerWidth-tamanho_celula*4){
        lefties=tamanho_celula;
        topsies+=heighties+tamanho_celula;
      }

    }
    
     if(qts_overlays==filtros_2.length){
      this_going_reset=1;
    }
      qts_overlays=0;
  }

  if(this_going_reset==1){
    pos_edit(document.getElementsByClassName("projeto"));
  }


}

  document.body.style.overflowY="scroll";
  document.body.style.overflowX="hidden";

window.addEventListener("wheel", event => {
    overlayback();

    if(scrollY>bottomest_one){
      window.scroll(scrollX,bottomest_one);
    }

});

//document.style.scrollbar="thin";


