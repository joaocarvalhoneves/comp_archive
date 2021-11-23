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