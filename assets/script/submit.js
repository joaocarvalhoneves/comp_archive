function muda_pagina(pag, proj,x,y){
      console.log(pag);
      console.log(proj);
      for(var i = 0; i < projectsaux.length; i++){
        projectsaux[i].style.opacity="0";
      }

      document.getElementById("titabt").style.opacity="0";
      document.getElementById("auth").style.opacity="0";
      document.getElementById("desc").style.opacity="0";
      document.getElementById("submm").style.opacity="0";

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

function pressfile(elem){
          elem.classList.remove("unclicked");
          elem.classList.add("clicked");
        setTimeout(function() {
          elem.classList.remove("clicked");
          elem.classList.add("unclicked");
        }, 100);
      
}
          


    document.body.style.overflowY="scroll";
  document.body.style.overflowX="hidden";

document.getElementById("lupa").style.display="none";
document.getElementById("filter").style.display="none";

for(var i = 0; i < projectsaux.length; i++){
      projectsaux[i].style.display="none";
    }


    var ll=arredonda_baixo(window.innerWidth/3/2);
    var ww=arredonda_baixo(window.innerWidth/3);
    //move a caixa do titulo para a sua posição inicial
    document.getElementById("titabt").style.top=window.arredonda_cima(scrollY)+tamanho_celula*4+1+"px";
    document.getElementById("titabt").style.left=window.arredonda_cima(scrollX)+tamanho_celula*5+1+"px";
    //largura e altura da caixa do titulo
    document.getElementById("titabt").style.width=tamanho_celula*4+"px";
    document.getElementById("titabt").style.height=tamanho_celula*1+"px";


    //move a caixa do titulo para a sua posição inicial
    document.getElementById("desc").style.top=window.arredonda_cima(scrollY)+tamanho_celula*6+1+"px";
    document.getElementById("desc").style.left=window.arredonda_cima(scrollX)+tamanho_celula*5+1+"px";
    //largura e altura da caixa do titulo
    document.getElementById("desc").style.width=window.arredonda_cima(ww*1.5)+"px";
    
    document.getElementById("desc").style.height=arredonda_cima(document.getElementById("desc").offsetHeight+tamanho_celula*2)+"px";


    //move a caixa do titulo para a sua posição inicial
    document.getElementById("submm").style.top=document.getElementById("desc").offsetTop+document.getElementById("desc").offsetHeight+tamanho_celula+"px";
    document.getElementById("submm").style.left=window.arredonda_cima(scrollX)+tamanho_celula*5+1+"px";
    //largura e altura da caixa do titulo
    document.getElementById("submm").style.width=tamanho_celula*2+"px";
    document.getElementById("submm").style.height=tamanho_celula*1+"px";

    //largura e altura da caixa do titulo
    document.getElementById("FAKE").style.width=tamanho_celula*2+"px";
    document.getElementById("FAKE").style.height=tamanho_celula*1+"px";
    

    //move a caixa do autor para a sua posição inicial
    document.getElementById("auth").style.top=window.arredonda_cima(scrollY)+tamanho_celula*6+1+"px";
    document.getElementById("auth").style.left=window.arredonda_cima(scrollX)+tamanho_celula*6+window.arredonda_cima(ww*1.5)+1+"px";
    //largura e altura da caixa do autor
    document.getElementById("auth").style.width=arredonda_cima(ww*0.7)+"px";
    document.getElementById("auth").style.height=tamanho_celula*4+"px";

window.addEventListener("mousemove", yeyeyeboy);

    function yeyeyeboy(){
      document.getElementById("desc").style.height=arredonda_cima(document.getElementById("lastt").offsetTop+tamanho_celula*2)+"px";
    //move a caixa do titulo para a sua posição inicial
      document.getElementById("submm").style.top=document.getElementById("desc").offsetTop+document.getElementById("desc").offsetHeight+tamanho_celula+"px";
    }


    window.addEventListener("wheel", event => {

      if(scrollY>document.getElementById("submm").offsetTop){
      window.scroll(scrollX,document.getElementById("submm").offsetTop);
      }
});

    if(window.innerWidth<1000){
      document.getElementById("submit").style.display="none";

      document.getElementById("editorial").style.top=arredonda_cima(tamanho_celula*4)-3+"px";
      document.getElementById("editorial").style.left=arredonda_cima(tamanho_celula*5)-3+"px";
    
      document.getElementById("titabt").style.top=arredonda_cima(tamanho_celula*6)+"px";
      document.getElementById("titabt").style.left=arredonda_cima(tamanho_celula*2)+"px";
    
      document.getElementById("desc").style.top=arredonda_cima(tamanho_celula*8)+"px";
      document.getElementById("desc").style.left=arredonda_cima(tamanho_celula*2)+"px";

      document.getElementById("desc").style.width=arredonda_cima((window.innerWidth/tamanho_celula-2)*tamanho_celula)+"px";
    
      document.getElementById("submm").style.top=arredonda_cima(tamanho_celula*10)+"px";
      document.getElementById("submm").style.left=arredonda_cima(tamanho_celula*2)+"px";

      document.getElementById("auth").style.top=arredonda_cima(tamanho_celula*8)+"px";
      document.getElementById("auth").style.left=arredonda_cima(tamanho_celula*2)+"px";
      document.getElementById("auth").style.width=arredonda_cima((window.innerWidth/tamanho_celula-2)*tamanho_celula)+"px";
      document.getElementById("auth").style.height=arredonda_cima(document.getElementById("authp").offsetHeight+tamanho_celula)+"px";

      document.getElementById("desc").style.top=arredonda_cima(document.getElementById("auth").offsetTop+document.getElementById("auth").offsetHeight+tamanho_celula)+"px";
    }