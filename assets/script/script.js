
        //tamanho de cada quadradinho
    let tamanho_celula=50;
    //arredonda qualquer coisa para o proximo maior numero divisivel pelo tamanho da celula
    function arredonda_cima(x)
      {
        return Math.ceil(x/tamanho_celula)*tamanho_celula;
      }
    function arredonda_baixo(x)
      {
        return Math.floor(x/tamanho_celula)*tamanho_celula;
      }


      //criar botoes de filtro para ativar e desativar os projetos
      for(var i = 0; i < tipos.length; i++){
          //divs que vao ser os botoes de filtro
          var filt = document.createElement("div");
          var txt = document.createElement("p");
          filt.classList.add("filtros"); 
          filt.classList.add("uncheck"); 
          filt.classList.add("overlay"); 
          filt.name = ""+tipos[i];
          //acordeao filtros
          filt.onclick = function () {
             myFunction(this, this.name);
           };
          txt.innerHTML=tipos[i];
          filt.appendChild(txt);
          document.getElementById("filter").appendChild(filt);
          delete txt;
          delete filt;
        }
     

        //criar os quadradinhos correspondentes aos projetos
        let altura=tamanho_celula*0.9;
        let largura=tamanho_celula*0.9;
        class Projeto {
          constructor(id,tipo,nome,descricao,x,y,altura, largura) {
            this.id = id;
            this.tipo = tipo;
            this.nome = nome;
            this.descricao = descricao;
            this.x = x;
            this.y = y;
            this.atualx = x;
            this.atualy = y;
            this.altura = altura;
            this.largura = largura;
            this.objetivox=0;
            this.objetivoy=0;
            this.ativo=false;
            this.em_movimento=false;
            this.stuck=false; 
            this.vel=1;//velocidade

            //decora se o projeto estava em grayscale antes de mouse over
            this.isgray=false;
            
            this.titulo=document.createElement("p");
            this.texto=document.createElement("p");
            this.imagem=document.createElement("img");
            this.view=document.createElement("p");
          }

          move(){
            if(!this.em_movimento){
              if(!this.ativo){
                this.deambulando();
              }else{
                this.direcionando();
              }
              this.em_movimento=true;
            }

            //posicao atual aproxima-se do destino

            if(this.atualy>this.y){//anda cima
              this.atualy-=this.vel;
            }else if(this.atualx<this.x){//anda direita
              this.atualx+=this.vel;
            }else if(this.atualy<this.y){//anda baixo
              this.atualy+=this.vel;
            }else  if(this.atualx>this.x){//anda esqueda
              this.atualx-=this.vel;
            }else if(this.stuck==true){
              this.atualy+=this.vel;
              this.y+=this.vel;
              this.stuck=false;
            }

            //se o valor atual e o valor destino estiverem perto o suficiente, chegou ao destino 
            if(Math.abs(this.x-this.atualx)<0.01 && Math.abs(this.y-this.atualy)<0.01){
              this.atualx=this.x;
              this.atualy=this.y;
              this.em_movimento=false
            }

            //coloca o div do projeto na posicao certa
            var projectos = document.getElementsByClassName(this.id);
            for (var i = 0; i < projectos.length; i++) {

              projectos[i].style.left=this.atualx*tamanho_celula-this.altura/2+"px";
              projectos[i].style.top=this.atualy*tamanho_celula-this.altura/2+"px";

            }
            /*document.getElementById(this.id).style.left=this.atualx*tamanho_celula+this.largura*1.5+"px";
            document.getElementById(this.id).style.top=this.atualy*tamanho_celula+this.altura*1.5+"px";*/
          }

          deambulando(){
            let auxmov=Math.random();
            //escolher pra que lado vai deambular a seguir
            if(auxmov<0.25 && this.y>0 && !checkpos(this, this.x,this.y-1)){//deambula cima
              this.y--;
              cima++;
            }else if(auxmov<0.50 && this.x<ncolunas-2 && !checkpos(this, this.x+1,this.y)){//deambula direita
              this.x++;
              direita++;
            }else if(auxmov<=0.75 && this.y<nlinhas-2 && !checkpos(this, this.x,this.y+1)){//deambula baixo
              this.y++;
              baixo++;
            }else if(auxmov<=1 && this.x>0 && !checkpos(this, this.x-1,this.y)){//deambula esquerda
              this.x--;
              esquerda++;
            }
          }

          direcionando(){
            if(this.y>this.objetivoy && !checkpos(this, this.x,this.y-1)){//anda cima
              this.y--;
            }else if(this.x<this.objetivox && !checkpos(this, this.x+1,this.y)){//anda direita
              this.x++;
            }else if(this.y<this.objetivoy && !checkpos(this, this.x,this.y+1)){//anda baixo
              this.y++;
            }else  if(this.x>this.objetivox && !checkpos(this, this.x-1,this.y)){//anda esqueda
              this.x--;
            }
            //console.log(this.objetivox,this.objetivoy);
          }

          set(x,y){
            this.x=x;
            this.y=y;
            this.atualx=x;
            this.atualy=y;

            var projectos = document.getElementsByClassName(this.id);
            for (var i = 0; i < projectos.length; i++) {

            projectos[i].style.left=this.x*tamanho_celula+this.largura*1.5+"px";
            projectos[i].style.top=this.y*tamanho_celula+this.altura*1.5+"px";
            projectos[i].style.zIndex="2";
            }

          }

          set_objetivo(x,y){
            this.objetivox=x;
            this.objetivoy=y;
          }

          expande(){
            /*console.log("expandiu")
            console.log("id "+this.id);
            console.log("tipo "+this.tipo);*/

            var projectos = document.getElementsByClassName(this.id);
            for (var i = 0; i < projectos.length; i++) {
            projectos[i].style.zIndex="6";
            projectos[i].style.width=tamanho_celula*4+"px";
            projectos[i].style.height=tamanho_celula*7+"px";
            projectos[i].style.top=arredonda_baixo(projectos[i].offsetTop)+"px";
            projectos[i].style.left=arredonda_baixo(projectos[i].offsetLeft)+"px";
            if(projectos[i].classList.contains("grayscale")){
              projectos[i].isgray=true;
            }
            projectos[i].classList.remove("normal");
            projectos[i].classList.add("expandido");
            projectos[i].classList.remove("grayscale");
            projectos[i].childNodes[0].innerHTML=this.nome;
            projectos[i].childNodes[1].innerHTML=this.descricao;
            projectos[i].childNodes[3].innerHTML="* view more *";
            projectos[i].childNodes[3].style.position="absolute";
            projectos[i].childNodes[3].style.bottom="0px";
            projectos[i].childNodes[3].style.fontSize="10px";
            this.vel=0;
            }
            /*grande.id="projetogrande"
            //começa pequeno e invisivel
            grande.classList.add("contraido");*/
          }
          contrai(){
            /*console.log("expandiu")
            console.log("id "+this.id);
            console.log("tipo "+this.tipo);*/
            var projectos = document.getElementsByClassName(this.id);
            for (var i = 0; i < projectos.length; i++) {
              projectos[i].style.zIndex="2";
            projectos[i].style.width=largura+"px";
            projectos[i].style.height=altura+"px";
            projectos[i].classList.remove("expandido");
            projectos[i].classList.add("normal");
            if(projectos[i].isgray){
              projectos[i].classList.add("grayscale");
            }
            
            this.vel=1;
            }

            /*grande.id="projetogrande"
            //começa pequeno e invisivel
            grande.classList.add("contraido");*/

          }

        }


        //variavel vai guardar as posições que os botões do overlay estao a ocupar
        var overlayblock=[];

        let cima=0;
        let baixo=0;
        let esquerda=0;
        let direita=0;

        var projetos=[];

        //
        for(var i = 0; i < array_projetos.length; i++){
          projetos[i] = new Projeto(array_projetos[i][0],array_projetos[i][1],array_projetos[i][2],array_projetos[i][3],i,i,altura,largura);
          //console.log(array_projetos[i][0]);
        }

        //cria grelha onde os quadrados vao andar
        var grelha = document.createElement("div");
        grelha.id="grelha";
        grelha.classList.add("grelha");

        grelha.style.height=arredonda_cima(screen.height*2)+"px";
        grelha.style.width=arredonda_cima(screen.width*2)+"px";

        document.body.appendChild(grelha);

        let altura_tela=document.getElementById("grelha").clientHeight;
        let largura_tela=document.getElementById("grelha").clientWidth;


        document.body.style.width=largura_tela*3+"px";
        document.body.style.height=altura_tela*3+"px";


        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var auxxxx = urlParams.get('x');
        var auyyyy = urlParams.get('y');
        if(auxxxx==null){
          window.scroll(largura_tela*1.1, altura_tela*1);
        }else{
          window.scroll(auxxxx, auyyyy);
        }
        

        let nlinhas=altura_tela/tamanho_celula;
        nlinhas=Math.floor(nlinhas);
        let ncolunas=largura_tela/tamanho_celula;
        ncolunas=Math.floor(ncolunas);

        for(var i = 0; i < nlinhas; i++){//linhas desenhar
        var linha = document.createElement("hr");
        linha.style.margin="0px";
        linha.style.width=largura_tela+"px";
        linha.style.top=""+tamanho_celula*(i)+"px";
        grelha.appendChild(linha);
        delete linha; 
        }
        for(var i = 0; i < ncolunas; i++){//colunas desenhar
        var linha = document.createElement("vl");
        linha.style.margin="0px";
        linha.style.height=altura_tela+"px";
        linha.style.top="0px";
        linha.style.left=""+tamanho_celula*(i)+"px";
        grelha.appendChild(linha);
        delete linha; 
        }


        for(var i = 0; i < projetos.length; i++){//adiciona quadrados a grelha
        var quadrado = document.createElement("div");
        var titulo = document.createElement("p");
        var texto = document.createElement("p");
        var imagem = document.createElement("img");
        var view = document.createElement("p");

        titulo.innerHTML=projetos[i].nome;
        texto.innerHTML=projetos[i].descricao;
        imagem.src="assets/img/test.png";

        quadrado.className= projetos[i].tipo;
        quadrado.classList.add("projeto");
        quadrado.classList.add("grayscale");
        quadrado.classList.add("normal");
        quadrado.classList.add(projetos[i].id);
        quadrado.setAttribute("numero",projetos[i].id);
        quadrado.style.width= projetos[i].largura+"px";
        quadrado.style.height= projetos[i].altura+"px";
        quadrado.style.position= "absolute";
        quadrado.appendChild(titulo);
        quadrado.appendChild(texto);
        quadrado.appendChild(imagem);
        quadrado.appendChild(view);
        if(window.location.href.indexOf("editorial") > -1){
          document.body.appendChild(quadrado);
        }else{
          grelha.appendChild(quadrado);
        }

        delete quadrado; 
        }

        //se estivermos na pagina editorial, mete os objetos nos sitios respetivos, grandes
        if(window.location.href.indexOf("editorial") > -1){
          var auxaux=document.getElementsByClassName("projeto");
          pos_edit(auxaux);
        }else{//caso contrario, coloca em posições aleatorias

          //move cada projeto para posições aleatorias
          for(var i = 0; i < projetos.length; i++){

            var xset=Math.floor(Math.random() * ncolunas-1);
            var yset=Math.floor(Math.random() * nlinhas-1);
            var ha_igual=false;

            for(var j = 0; j < projetos.length; j++){//verifica se ha algum projeto com este x e y
              if(projetos[j].x==xset && projetos[j].y==yset){
                ha_igual=true;
              }
            }

            if(!ha_igual){//se nao ha igual 
              //set x ve y quadrados
               projetos[i].set(xset, yset); //define o x e y
               projetos[i].move();
             }else{
              i--; //caso contrario, repete
             }

          }
        

          //define coordenadas objetivo de cada tipo de projeto
          for(var i = 0; i < tipos.length; i++){
            var aux_randx=Math.floor(Math.random() * ncolunas);
            var aux_randy= Math.floor(Math.random() * nlinhas);
            for(var j = 0; j < projetos.length; j++){
              if(projetos[j].tipo==tipos[i]){
                projetos[j].set_objetivo(aux_randx, aux_randy);
              }
            }
          }

        }

        function checkpos(proj,x,y){//verifica se há algum projeto em determinado x e y
          for(var i = 0; i < projetos.length; i++){
            if(projetos[i].x==x && projetos[i].y==y){
              return true;
            }
          }
          for(var i = 0; i < overlayblock.length; i+=2){
            if(overlayblock[i]==x && overlayblock[i+1]==y){
              proj.stuck=true;
              return true;
            }
          }
          return false;
        }
        //
        //framerate
        var t=setInterval(draw,(1000/projetos.length/2));

        //ir buscar imagem noise
        var noiseimg=document.getElementById("noise");
        noiseimg.style.width=largura_tela+"px";
        noiseimg.style.height=altura_tela+"px";

        var epa=0;
        function draw() {

          if(window.location.href.indexOf("index") > -1){
            if(projetos[epa].vel==1){
            projetos[epa].move();
            }else{
              //console.log("stopped");
            }
              epa++;
            if(epa==projetos.length){
              epa=0;
            }
          }
          

          if(epa%2==0){
            //move a imagem de noise aleatoriamente
            var auxbgtop=Math.random()*(scrollY - (scrollY-200)) + (scrollY-200);
            if(auxbgtop>altura_tela*2){
              auxbgtop=altura_tela*2;
            }
            var auxbgleft=Math.random()*(scrollX - (scrollX-200)) + (scrollX-200);
            if(auxbgleft>largura_tela*2){
              auxbgleft=largura_tela*2;
            }
            noiseimg.style.top=auxbgtop+"px";
            noiseimg.style.left=auxbgleft+"px";
          }
        }


        //POR EM CLASSE AS GHRELHAS
        
        //clonar8x  clonar8x  clonar8x  clonar8x  clonar8x  
        //clonar8x  clonar8x  clonar8x  clonar8x  clonar8x  
        var itm = document.getElementById("grelha");

        var cln1 = itm.cloneNode(true);
        var cln2 = itm.cloneNode(true);
        var cln3 = itm.cloneNode(true);
        var cln4 = itm.cloneNode(true);
        var cln5 = itm.cloneNode(true);
        var cln6 = itm.cloneNode(true);
        var cln7 = itm.cloneNode(true);
        var cln8 = itm.cloneNode(true);

        cln1.id="grelha1";
        cln2.id="grelha2";
        cln3.id="grelha3";
        cln4.id="grelha4";
        cln5.id="grelha5";
        cln6.id="grelha6";
        cln7.id="grelha7";
        cln8.id="grelha8";

        itm.style.top=altura_tela+"px";       //clone para baixo
        itm.style.left=largura_tela+"px";

        cln1.style.top=altura_tela*2+"px";       //clone para baixo
        cln1.style.left=largura_tela+"px";                 //clone para baixo

        cln2.style.top="0px";    //clone para cima
        cln2.style.left=largura_tela+"px";                 //clone para cima

        cln3.style.top=altura_tela+"px";                //clone para esquerda
        cln3.style.left="0px";  //clone para esquerda

        cln4.style.top=altura_tela+"px";                 //clone para direita
        cln4.style.left=largura_tela*2+"px";    //clone para direita

        cln5.style.top="0px";                 //clone para canto superior esquerdo
        cln5.style.left="0px";    //clone para canto superior esquerdo

        cln6.style.top="0px";                 //clone para canto superior direito
        cln6.style.left=largura_tela*2+"px";    //clone para canto superior direito

        cln7.style.top=altura_tela*2+"px";                 //clone para canto inferior esquerdo
        cln7.style.left="0px";    //clone para canto inferior esquerdo

        cln8.style.top=altura_tela*2+"px";                 //clone para canto inferior direito
        cln8.style.left=largura_tela*2+"px";    //clone para canto inferior direito


        document.body.appendChild(cln1); 
        document.body.appendChild(cln2); 
        document.body.appendChild(cln3); 
        document.body.appendChild(cln4); 
        document.body.appendChild(cln5); 
        document.body.appendChild(cln6); 
        document.body.appendChild(cln7); 
        document.body.appendChild(cln8);


    //quando alum botao de filtro é premido, manda para uma função de ativar ou desativar aquela categoria
    function myFunction(here, tipo) {
      if(here.classList.contains("uncheck")){
          ativa(tipo);
          var grayscale_aux = document.getElementsByClassName(tipo);
          /*console.log(tipo);
          console.log(grayscale_aux);*/
          for(var i = 0; i < grayscale_aux.length; i++){
             grayscale_aux[i].classList.remove("grayscale");
              grayscale_aux[i].isgray=false;
          }
          here.classList.remove("uncheck");
          here.classList.add("check");
          here.classList.add(here.name);
          here.childNodes[0].style.color="rgb(213,213,213)";

      }else{
          desativa(tipo);
          var grayscale_aux = document.getElementsByClassName(tipo);
          for(var i = 0; i < grayscale_aux.length; i++){
             grayscale_aux[i].classList.add("grayscale");
          }
          here.classList.remove("check");
          here.classList.add("uncheck");
          here.classList.remove(here.name);
          here.classList.remove("grayscale");
          here.childNodes[0].style.color="rgb(120,120,120)";
      }
      event.stopPropagation();
    } 


    function ativa(tipo){
    for(var i = 0; i < projetos.length; i++){
       if(projetos[i].tipo == tipo){
           projetos[i].ativo=true;
       }
      }
    }
    function desativa(tipo){
    for(var i = 0; i < projetos.length; i++){
       if(projetos[i].tipo ==tipo){
           projetos[i].ativo=false;
       }
      }
    }

    //adiciona listener mouseOver a todos os projetos
    var projectsaux=document.getElementsByClassName("projeto");
    for(var i = 0; i < projectsaux.length; i++){

        if(window.location.href.indexOf("index") > -1){
             projectsaux[i].onmouseover = function () {
               projetos[this.getAttribute("numero")].expande();

               //console.log("numero "+this.getAttribute("numero"));
             };
             projectsaux[i].onmouseout = function () {
               projetos[this.getAttribute("numero")].contrai();

               //console.log("numero "+this.getAttribute("numero"));
             };
          }

           projectsaux[i].onclick = function () {
              muda_pagina("projeto", this.getAttribute("numero"), scrollX, scrollY);
             //console.log("numero "+this.getAttribute("numero"));
           };
      }



//guarda os elementos do overlay (botoes, etc...)
var overlays=document.getElementsByClassName("overlay");

//drag scroll
var isMouseDown = false;
var xfirst, yfirst;
document.onmousedown = function(p) {
  if(p.button == 1 ){
    p.preventDefault();
  }else if(p.button==0){isMouseDown = true; xfirst=p.pageX; yfirst=p.pageY}};
document.onmouseup   = function() { isMouseDown = false;  overlayback();};

  var div = document.body;
    document.onmousemove = function(e){
      //case 1 clica apenas com o lado esquerdo do rato
        if(isMouseDown){
        window.scrollBy(xfirst-e.pageX, yfirst-e.pageY);

          if(!window.location.href.indexOf("projeto") > -1){
            for(var i=0; i<overlays.length;i++){
              overlays[i].style.opacity=0;
            }
          }

        }
    }

    function overlayback(){

      if(!window.location.href.indexOf("projeto") > -1){

      for(var i=0; i<overlays.length;i++){
        overlays[i].style.opacity=1;
      }

      
      //move a caixa do titulo a cada frame
      document.getElementById("titulo").style.top=window.arredonda_cima(scrollY)+tamanho_celula+1+"px";
      document.getElementById("titulo").style.left=window.arredonda_cima(scrollX)+tamanho_celula+1+"px";

      //move a caixa do filtro para a sua posição inicial
      document.getElementById("filter").style.top=window.arredonda_cima(scrollY+window.innerHeight)-tamanho_celula*3-3+"px";
      document.getElementById("filter").style.left=window.arredonda_cima(scrollX+window.innerWidth)-tamanho_celula*4-3+"px";

      //move a caixa do editorial para a sua posição inicial
      document.getElementById("editorial").style.top=window.arredonda_cima(scrollY)+tamanho_celula-3+"px";
      document.getElementById("editorial").style.left=window.arredonda_cima(scrollX+window.innerWidth)-tamanho_celula*4-3+"px";

      //move a caixa do agents para a sua posição inicial
      document.getElementById("agents").style.top=window.arredonda_cima(scrollY)+tamanho_celula-3+"px";
      document.getElementById("agents").style.left=window.arredonda_cima(scrollX+window.innerWidth)-tamanho_celula*6-3+"px";

      //move a caixa do about para a sua posição inicial
      document.getElementById("about").style.top=window.arredonda_cima(scrollY)+tamanho_celula-3+"px";
      document.getElementById("about").style.left=window.arredonda_cima(scrollX+window.innerWidth)-tamanho_celula*9-3+"px";

      //move a caixa do submit para a sua posição inicial
      document.getElementById("submit").style.top=window.arredonda_cima(scrollY)+tamanho_celula-3+"px";
      document.getElementById("submit").style.left=window.arredonda_cima(scrollX+window.innerWidth)-tamanho_celula*12-3+"px";

      //move a caixa do lupa para a sua posição inicial
      document.getElementById("lupa").style.top=window.arredonda_cima(scrollY+window.innerHeight)-tamanho_celula*3-3+"px";
      document.getElementById("lupa").style.left=window.arredonda_cima(scrollX+window.innerWidth)-tamanho_celula*6-3+"px";
      }
    }

    //move a caixa do titulo para a sua posição inicial
    document.getElementById("titulo").style.top=window.arredonda_cima(scrollY)+tamanho_celula+1+"px";
    document.getElementById("titulo").style.left=window.arredonda_cima(scrollX)+tamanho_celula+1+"px";
    //largura e altura da caixa do titulo
    document.getElementById("titulo").style.width=tamanho_celula*6+"px";
    document.getElementById("titulo").style.height=tamanho_celula*2+"px";


    //move a caixa do filtro para a sua posição inicial
    document.getElementById("filter").style.top=window.arredonda_cima(scrollY+window.innerHeight)-tamanho_celula*3-3+"px";
    document.getElementById("filter").style.left=window.arredonda_cima(scrollX+window.innerWidth)-tamanho_celula*4-3+"px";
    //largura e altura da caixa do filtro
    document.getElementById("filter").style.width=tamanho_celula*2+3+"px";
    document.getElementById("filter").style.height=tamanho_celula*1+3+"px";

    //move a caixa do editorial para a sua posição inicial
    document.getElementById("editorial").style.top=window.arredonda_cima(scrollY)+tamanho_celula-3+"px";
    document.getElementById("editorial").style.left=window.arredonda_cima(scrollX+window.innerWidth)-tamanho_celula*4-3+"px";
    //largura e altura da caixa do editorial
    document.getElementById("editorial").style.width=tamanho_celula*2+3+"px";
    document.getElementById("editorial").style.height=tamanho_celula*1+3+"px";

    //move a caixa do agents para a sua posição inicial
    document.getElementById("agents").style.top=window.arredonda_cima(scrollY)+tamanho_celula-3+"px";
    document.getElementById("agents").style.left=window.arredonda_cima(scrollX+window.innerWidth)-tamanho_celula*6-3+"px";
    //largura e altura da caixa do agents
    document.getElementById("agents").style.width=tamanho_celula*2+3+"px";
    document.getElementById("agents").style.height=tamanho_celula*1+3+"px";

    //move a caixa do about para a sua posição inicial
    document.getElementById("about").style.top=window.arredonda_cima(scrollY)+tamanho_celula-3+"px";
    document.getElementById("about").style.left=window.arredonda_cima(scrollX+window.innerWidth)-tamanho_celula*9-3+"px";
    //largura e altura da caixa do about
    document.getElementById("about").style.width=tamanho_celula*2+3+"px";
    document.getElementById("about").style.height=tamanho_celula*1+3+"px";


    //move a caixa do submit para a sua posição inicial
    document.getElementById("submit").style.top=window.arredonda_cima(scrollY)+tamanho_celula-3+"px";
    document.getElementById("submit").style.left=window.arredonda_cima(scrollX+window.innerWidth)-tamanho_celula*12-3+"px";
    //largura e altura da caixa do submit
    document.getElementById("submit").style.width=tamanho_celula*2+3+"px";
    document.getElementById("submit").style.height=tamanho_celula*1+3+"px";


    //move a caixa do lupa para a sua posição inicial
    document.getElementById("lupa").style.top=window.arredonda_cima(scrollY+window.innerHeight)-tamanho_celula*3-3+"px";
    document.getElementById("lupa").style.left=window.arredonda_cima(scrollX+window.innerWidth)-tamanho_celula*6-3+"px";
    //largura e altura da caixa do lupa
    document.getElementById("lupa").style.width=tamanho_celula*1+3+"px";
    document.getElementById("lupa").style.height=tamanho_celula*1+3+"px";


    if (window.location.href.indexOf("index") > -1) {
      press(document.getElementById("agents"),null);
    }else if (window.location.href.indexOf("editorial") > -1) {
      press(document.getElementById("editorial"),null);
    }else if (window.location.href.indexOf("about") > -1) {
      press(document.getElementById("about"),null);
    }else if (window.location.href.indexOf("submit") > -1) {
      press(document.getElementById("submit"),null);
    }
    


    //VAI BUSCAR BOTAO DOS FILTROS
    var botfilt = document.getElementsByClassName("filtros");

    //press or unpress buttons
    function press(elem,type){

      var unclicks=document.getElementsByClassName("clicked");
      
      for(var kjg=0;kjg<unclicks.length;kjg++){
        if(unclicks[kjg]!=elem && unclicks[kjg].id!="filter" && elem.id!="filter" && elem.id!="lupa" && unclicks[kjg].id!="lupa"){
          //largura e altura da caixa do filtro volta a aumentar
        unclicks[kjg].style.width=unclicks[kjg].offsetWidth+2+"px";
        unclicks[kjg].style.height=unclicks[kjg].offsetHeight+2+"px";
          unclicks[kjg].classList.add("unclicked");
          unclicks[kjg].classList.remove("clicked");
        }
      }
      if(elem.classList.contains("unclicked")){
        elem.classList.remove("unclicked");
        elem.classList.add("clicked");
        //largura e altura da caixa do filtro diminui
        elem.style.width=elem.offsetWidth-2+"px";
        elem.style.height=elem.offsetHeight-2+"px";

        if(elem.id!="filter" && elem.id!="lupa" && type!=null){
          muda_pagina(elem.id, null, scrollX, scrollY);
        }

          //aumenta lista de filtros
          if(elem.id=="filter"){
            //lista de botoes filtro aparece
              for (var i = 0; i < botfilt.length; i++) {
                botfilt[i].style.height=tamanho_celula/2+"px";
                botfilt[i].style.width=tamanho_celula*2+"px";
                botfilt[i].style.top=-3-tamanho_celula/2*(i+1)+"px";
                botfilt[i].style.borderWidth=1+"px";
                botfilt[i].childNodes[0].style.fontSize=14+"px";
                
                botfilt[i].style.left=-3+"px";
              }
          }
      }else{
            //recolhe lista de filtros
          if(elem.id=="filter" || elem.id=="lupa"){
            elem.classList.remove("clicked");
            elem.classList.add("unclicked");
            //largura e altura da caixa do filtro volta a aumentar
            elem.style.width=elem.offsetWidth+2+"px";
            elem.style.height=elem.offsetHeight+2+"px";
            if(elem.id=="filter"){
              //lista de botoes filtro recolhe
              for (var i = 0; i < botfilt.length; i++) {
                botfilt[i].style.height=0+"px";
                botfilt[i].style.top=0+"px";
                botfilt[i].style.left=0+"px";
                botfilt[i].style.borderWidth=0+"px";
                botfilt[i].childNodes[0].style.fontSize=0+"px";

                botfilt[i].style.left=3+"px";
              }
            }
          }
      }

    }


    

    var tttg=setInterval(butavoid,1000);

    function butavoid(){
        //ir buscar elementos do overlay
        var elemoovers = document.getElementsByClassName("overlay");
        //este array quarda as posições x e y onde os projetos nao podem pisar
        overlayblock=[];

        for(var i=0;i<elemoovers.length;i++){
          var xauxx=Math.round(elemoovers[i].offsetLeft / tamanho_celula) * tamanho_celula;
          var yauxy=Math.round(elemoovers[i].offsetTop / tamanho_celula) * tamanho_celula;
          var wauxw=elemoovers[i].offsetWidth;
          var hauxh=elemoovers[i].offsetHeight;

          xauxx=xauxx/tamanho_celula;
          yauxy=yauxy/tamanho_celula;

          for(var sodx=0; sodx<=wauxw/tamanho_celula; sodx++){

            var xis=xauxx+sodx;

            for(var sody=0; sody<=hauxh/tamanho_celula; sody++){

            var yips=yauxy+sody;

            overlayblock.push(xis%ncolunas);
            overlayblock.push(yips%nlinhas);

            //mostra as hit-boxes dos botoes do overlay
            /*
            var suxauxdiv=document.createElement("div");
            suxauxdiv.classList.add("yoyoyo");
            suxauxdiv.style.position="absolute";
            suxauxdiv.style.width="10px";
            suxauxdiv.style.height="10px";
            suxauxdiv.style.backgroundColor="red";
            suxauxdiv.style.top=(yips%nlinhas)*tamanho_celula+"px";
            suxauxdiv.style.left=(xis%ncolunas)*tamanho_celula+"px";
            suxauxdiv.style.zIndex=7;
            document.getElementById("grelha").appendChild(suxauxdiv);
            delete suxauxdiv;
            */
            }
          }

          /*console.log(xauxx%ncolunas);
          console.log(yauxy%nlinhas);
          console.log(wauxw);
          console.log(hauxh);
          console.log("more");*/
        }
    }    

    
    

 