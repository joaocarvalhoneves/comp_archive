//se estivermos no projeto, temos que posicionar os componentes respetivos

    var ll=arredonda_baixo(window.innerWidth/3/2);
    var ww=arredonda_baixo(window.innerWidth/3);
    //move a caixa do titulo para a sua posição inicial
    document.getElementById("tit").style.top=window.arredonda_cima(scrollY)+tamanho_celula*4+1+"px";
    document.getElementById("tit").style.left=window.arredonda_cima(scrollX)+ll+1+"px";
    //largura e altura da caixa do titulo
    document.getElementById("tit").style.width=ww/2+tamanho_celula+"px";
    document.getElementById("tit").style.height=tamanho_celula*1+"px";

    //move a caixa do titulo para a sua posição inicial
    document.getElementById("desc").style.top=window.arredonda_cima(scrollY)+tamanho_celula*6+1+"px";
    document.getElementById("desc").style.left=window.arredonda_cima(scrollX)+ll+1+"px";
    //largura e altura da caixa do titulo
    document.getElementById("desc").style.width=arredonda_baixo(window.innerWidth/3)+"px";
    document.getElementById("desc").style.height=tamanho_celula*3+"px";


    //move a caixa da categoria para a sua posição inicial
    document.getElementById("cat").style.top=window.arredonda_cima(scrollY)+tamanho_celula*6+1+"px";
    document.getElementById("cat").style.left=window.arredonda_cima(scrollX)+ll+ww+tamanho_celula+1+"px";
    //largura e altura da caixa da categoria
    document.getElementById("cat").style.width=tamanho_celula*3+"px";
    document.getElementById("cat").style.height=tamanho_celula*1+"px";

    //move a caixa do autor para a sua posição inicial
    document.getElementById("aut").style.top=window.arredonda_cima(scrollY)+tamanho_celula*6+tamanho_celula*2+1+"px";
    document.getElementById("aut").style.left=window.arredonda_cima(scrollX)+ll+ww+tamanho_celula+1+"px";
    //largura e altura da caixa do autor
    document.getElementById("aut").style.width=arredonda_baixo(window.innerWidth/3)+"px";
    document.getElementById("aut").style.height=tamanho_celula+"px";


    //move a caixa do autor para a sua posição inicial
    document.getElementById("im1").style.top=window.arredonda_cima(scrollY)+tamanho_celula*8+tamanho_celula*2+1+"px";
    document.getElementById("im1").style.left=window.arredonda_cima(scrollX)+ll+1+"px";
    //largura e altura da caixa do autor
    document.getElementById("im1").style.width=arredonda_baixo(window.innerWidth/3)+"px";


    //move a caixa do autor para a sua posição inicial
    document.getElementById("im2").style.top=window.arredonda_cima(scrollY)+tamanho_celula*8+tamanho_celula*2+1+"px";
    document.getElementById("im2").style.left=window.arredonda_cima(scrollX)+ll+ww+tamanho_celula+1+"px";
    //largura e altura da caixa do autor
    document.getElementById("im2").style.width=arredonda_baixo(window.innerWidth/3)+"px";


    //move a caixa do autor para a sua posição inicial
    var alt_img=arredonda_cima(document.getElementById("im2").offsetHeight);
    document.getElementById("txt").style.top=window.arredonda_cima(scrollY)+tamanho_celula*8+tamanho_celula*2+alt_img+1+"px";
    document.getElementById("txt").style.left=window.arredonda_cima(scrollX)+ll+1+"px";
    //largura e altura da caixa do autor
    document.getElementById("txt").style.width=arredonda_baixo(window.innerWidth/3*2+tamanho_celula)+"px";
    document.getElementById("txt").style.height=tamanho_celula*3+"px";


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