//se estivermos no projeto, temos que posicionar os componentes respetivos
    var pp=2.5;
    var ll=arredonda_baixo(window.innerWidth/3/2);
    var ww=arredonda_baixo(window.innerWidth/3);

    //move a caixa do titulo para a sua posição inicial
    document.getElementById("desc").style.top=window.arredonda_cima(scrollY)+tamanho_celula*6+1+"px";
    document.getElementById("desc").style.left=window.arredonda_cima(scrollX)+ll+1+"px";
    //largura e altura da caixa do titulo
    document.getElementById("desc").style.width=arredonda_baixo(window.innerWidth/pp)+"px";
    document.getElementById("desc").style.height=window.arredonda_cima(document.getElementById("desc").childNodes[1].offsetHeight+tamanho_celula)+"px";

    //move a caixa do titulo para a sua posição inicial
    document.getElementById("tit").style.top=window.arredonda_cima(scrollY)+tamanho_celula*6+1+"px";
    document.getElementById("tit").style.left=arredonda_cima(document.getElementById("desc").offsetWidth+document.getElementById("desc").offsetLeft)+"px";
    //largura e altura da caixa do titulo
    document.getElementById("tit").style.width=ww/2+tamanho_celula+"px";
    document.getElementById("tit").style.height=tamanho_celula*1+"px";


    //move a caixa da categoria para a sua posição inicial
    document.getElementById("cat").style.top=arredonda_cima(document.getElementById("tit").offsetHeight+document.getElementById("tit").offsetTop)+"px";
    document.getElementById("cat").style.left=arredonda_cima(document.getElementById("desc").offsetWidth+document.getElementById("desc").offsetLeft)+"px";
    //largura e altura da caixa da categoria
    document.getElementById("cat").style.width=tamanho_celula*3+"px";
    document.getElementById("cat").style.height=tamanho_celula*1+"px";

    //move a caixa do autor para a sua posição inicial
    document.getElementById("aut").style.top=1+arredonda_cima(tamanho_celula+document.getElementById("cat").offsetHeight+document.getElementById("cat").offsetTop)+"px";
    document.getElementById("aut").style.left=arredonda_cima(document.getElementById("desc").offsetWidth+document.getElementById("desc").offsetLeft)+"px";
    //largura e altura da caixa do autor
    document.getElementById("aut").style.width=ww/2+tamanho_celula+"px";
    document.getElementById("aut").style.height=tamanho_celula+"px";




    //move a caixa do autor para a sua posição inicial
    document.getElementById("im1").style.top=window.arredonda_cima(scrollY)+tamanho_celula*8+tamanho_celula*2+1+"px";
    document.getElementById("im1").style.left=window.arredonda_cima(scrollX)+ll+1+"px";
    //largura e altura da caixa do autor
    document.getElementById("im1").style.width=arredonda_baixo(window.innerWidth/pp)+"px";
    document.getElementById("im1").style.height=arredonda_cima(document.getElementById("im1").offsetHeight)+"px";

    //move a caixa do autor para a sua posição inicial
    document.getElementById("im1leg").style.top=document.getElementById("im1").offsetTop+document.getElementById("im1").offsetHeight+"px";
    document.getElementById("im1leg").style.left=window.arredonda_cima(scrollX)+ll+1+"px";
    //largura e altura da caixa do autor
    document.getElementById("im1leg").style.width=arredonda_baixo(window.innerWidth/pp)+"px";
    document.getElementById("im1leg").style.height=tamanho_celula+"px";


    //move a caixa do autor para a sua posição inicial
    var alt_img=arredonda_cima(document.getElementById("im2").offsetHeight);
    document.getElementById("txt").style.top=document.getElementById("im1leg").offsetHeight+document.getElementById("im1leg").offsetTop+tamanho_celula+"px";
    document.getElementById("txt").style.left=window.arredonda_cima(scrollX)+ll+1+"px";
    //largura e altura da caixa do autor
    document.getElementById("txt").style.width=arredonda_baixo(window.innerWidth/pp)+"px";
    document.getElementById("txt").style.height=arredonda_cima(document.getElementById("txt").childNodes[1].offsetHeight+tamanho_celula)+"px";

    //move a caixa do autor para a sua posição inicial
    document.getElementById("im2").style.top=arredonda_cima(document.getElementById("txt").offsetTop+document.getElementById("txt").offsetHeight)+"px";
    document.getElementById("im2").style.left=window.arredonda_cima(scrollX)+ll+1+"px";
    //largura e altura da caixa do autor
    document.getElementById("im2").style.width=arredonda_baixo(window.innerWidth/pp)+"px";
    document.getElementById("im2").style.height=arredonda_cima(document.getElementById("im2").offsetHeight)+"px";

    //move a caixa do autor para a sua posição inicial
    document.getElementById("im2leg").style.top=document.getElementById("im2").offsetTop+document.getElementById("im2").offsetHeight+1+"px";
    document.getElementById("im2leg").style.left=window.arredonda_cima(scrollX)+ll+1+"px";
    //largura e altura da caixa do autor
    document.getElementById("im2leg").style.width=arredonda_baixo(window.innerWidth/pp)+"px";
    document.getElementById("im2leg").style.height=tamanho_celula+"px";

    //move a caixa do autor para a sua posição inicial
    var alt_img=arredonda_cima(document.getElementById("im2").offsetHeight);
    document.getElementById("txt2").style.top=document.getElementById("im2leg").offsetHeight+document.getElementById("im2leg").offsetTop+tamanho_celula+"px";
    document.getElementById("txt2").style.left=window.arredonda_cima(scrollX)+ll+1+"px";
    //largura e altura da caixa do autor
    document.getElementById("txt2").style.width=arredonda_baixo(window.innerWidth/pp)+"px";
    document.getElementById("txt2").style.height=arredonda_cima(document.getElementById("txt2").childNodes[1].offsetHeight+tamanho_celula)+"px";


    var auxid = urlParams.get('id');
    for(var sett=0; sett<array_projetos.length;sett++){
      if(array_projetos[sett][0]==auxid){
        document.getElementById("cat").childNodes[1].innerHTML=array_projetos[sett][1];
        document.getElementById("cat").classList.add(array_projetos[sett][1]);
        document.getElementById("cat").childNodes[1].style.color="rgb(213,213,213)";
        document.getElementById("tit").childNodes[1].innerHTML=array_projetos[sett][2];
        document.getElementById("desc").childNodes[1].innerHTML=array_projetos[sett][3];
      }
    }

document.body.style.overflowY="scroll";
  document.body.style.overflowX="hidden";
  
    document.getElementById("filter").style.display="none";
    document.getElementById("lupa").style.display="none";

    for(var i = 0; i < projectsaux.length; i++){
      projectsaux[i].style.display="none";
    }


    var redir=0;
    function muda_pagina(pag, proj,x,y){
      console.log(pag);
      console.log(proj);

      document.getElementById("tit").style.opacity="0";
      document.getElementById("desc").style.opacity="0";
      document.getElementById("cat").style.opacity="0";
      document.getElementById("aut").style.opacity="0";
      document.getElementById("im1").style.opacity="0";
      document.getElementById("im2").style.opacity="0";
      document.getElementById("txt").style.opacity="0";

      setTimeout(function() {
        
      if(redir==0){
        if(pag=="agents"){
          document.location.href = "index.html?x="+x+"&y="+y;
        }else if(pag=="projeto"){
          document.location.href = pag+".html?id="+proj+"&x="+x+"&y="+y;
        }else{
          document.location.href = pag+".html?x="+x+"&y="+y;
        }
        redir=1;
      }

      }, 1000);

    }

window.addEventListener("wheel", event => {
if(window.innerWidth>700){
    
      document.getElementById("tit").style.opacity="0";
      document.getElementById("cat").style.opacity="0";
      document.getElementById("aut").style.opacity="0";

            setTimeout(function() {
              document.getElementById("tit").style.top=arredonda_cima(scrollY)+tamanho_celula*6+1+"px";
              document.getElementById("cat").style.top=arredonda_cima(document.getElementById("tit").offsetHeight+document.getElementById("tit").offsetTop)+"px";
              document.getElementById("aut").style.top=1+arredonda_cima(tamanho_celula+document.getElementById("cat").offsetHeight+document.getElementById("cat").offsetTop)+"px";
            }, 400);

            setTimeout(function() {
              document.getElementById("tit").style.opacity=1;
              document.getElementById("cat").style.opacity=1;
              document.getElementById("aut").style.opacity=1;
            }, 700);

      if(scrollY>document.getElementById("txt2").offsetTop){
      window.scroll(scrollX,document.getElementById("txt2").offsetTop);
      }


}

});

document.getElementById("desc").style.height=arredonda_cima(document.getElementById("descp").offsetHeight+tamanho_celula)+"px";
console.log(arredonda_cima(document.getElementById("descp").offsetHeight+tamanho_celula));

document.getElementById("txt").style.height=arredonda_cima(document.getElementById("txtp").offsetHeight+tamanho_celula)+"px";

document.getElementById("txt2").style.height=arredonda_cima(document.getElementById("txt2p").offsetHeight+tamanho_celula)+"px";


if(window.innerWidth<700){
  document.getElementById("submit").style.top=arredonda_cima(scrollY+tamanho_celula*4)-3+"px";
  document.getElementById("submit").style.left=arredonda_cima(scrollX+tamanho_celula*4)-3+"px";
  document.getElementById("editorial").style.top=arredonda_cima(scrollY+tamanho_celula*4)-3+"px";
  document.getElementById("editorial").style.left=arredonda_cima(scrollX+tamanho_celula*7)-3+"px";

  document.getElementById("tit").style.top=arredonda_cima(scrollY+tamanho_celula*6)+"px";
  document.getElementById("tit").style.left=arredonda_cima(scrollX+tamanho_celula*1)+"px";
  document.getElementById("tit").style.width=arredonda_cima(scrollX+tamanho_celula*3)+"px";

  document.getElementById("desc").style.top=arredonda_cima(scrollY+tamanho_celula*12)+"px";
  document.getElementById("desc").style.width=arredonda_baixo((window.innerWidth/tamanho_celula-2)*tamanho_celula)+"px";
  document.getElementById("desc").style.height=arredonda_cima(document.getElementById("descp").offsetHeight+tamanho_celula)+"px";

  document.getElementById("cat").style.top=arredonda_cima(scrollY+tamanho_celula*8)+"px";
  document.getElementById("cat").style.left=arredonda_cima(scrollX+tamanho_celula*1)+"px";

  document.getElementById("aut").style.top=arredonda_cima(scrollY+tamanho_celula*10)+"px";
  document.getElementById("aut").style.left=arredonda_cima(scrollX+tamanho_celula*1)+"px";

  document.getElementById("im1").style.top=arredonda_cima(document.getElementById("desc").offsetTop+document.getElementById("desc").offsetHeight+tamanho_celula)+"px";
  document.getElementById("im1leg").style.top=arredonda_cima(document.getElementById("im1").offsetTop+document.getElementById("im1").offsetHeight)+"px";
  document.getElementById("txt").style.top=arredonda_cima(document.getElementById("im1leg").offsetTop+document.getElementById("im1leg").offsetHeight+tamanho_celula)+"px";
  document.getElementById("im1").style.width=arredonda_baixo((window.innerWidth/tamanho_celula-2)*tamanho_celula)+"px";
  document.getElementById("im1leg").style.width=arredonda_baixo((window.innerWidth/tamanho_celula-2)*tamanho_celula)+"px";
  document.getElementById("txt").style.width=arredonda_baixo((window.innerWidth/tamanho_celula-2)*tamanho_celula)+"px";
  document.getElementById("txt").style.height=arredonda_cima(document.getElementById("txtp").offsetHeight+tamanho_celula)+"px";

  document.getElementById("im2").style.top=arredonda_cima(document.getElementById("txt").offsetTop+document.getElementById("txt").offsetHeight+tamanho_celula)+"px";
  document.getElementById("im2leg").style.top=arredonda_cima(document.getElementById("im2").offsetTop+document.getElementById("im2").offsetHeight)+"px";
  document.getElementById("txt2").style.top=arredonda_cima(document.getElementById("im2leg").offsetTop+document.getElementById("im2leg").offsetHeight+tamanho_celula)+"px";
  document.getElementById("im2").style.width=arredonda_baixo((window.innerWidth/tamanho_celula-2)*tamanho_celula)+"px";
  document.getElementById("im2leg").style.width=arredonda_baixo((window.innerWidth/tamanho_celula-2)*tamanho_celula)+"px";
  document.getElementById("txt2").style.width=arredonda_baixo((window.innerWidth/tamanho_celula-2)*tamanho_celula)+"px";
  document.getElementById("txt2").style.height=arredonda_cima(document.getElementById("txt2p").offsetHeight+tamanho_celula)+"px";

}