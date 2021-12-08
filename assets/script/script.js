if(window.location.href.indexOf("index") > -1 && window.innerWidth<1000){
  window.location.href = "editorial.html";
}


var naoepradescer=false;
if(window.innerWidth<1000){
  document.getElementById("noise").style.display="none";
  document.getElementById("agents").style.display="none";

}
var whos_first=0;
//window.addEventListener('resize', overlayback);

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

      function de_fault(){

        if(whos_first==0){
              document.getElementById("lupa").style.top=window.arredonda_cima(scrollY+window.innerHeight)-tamanho_celula*3-3+"px";
              document.getElementById("lupa").style.left=window.arredonda_cima(scrollX+window.innerWidth)-tamanho_celula*6-3+"px";

              document.getElementById("inps").style.width="0px";
              document.getElementById("inps").style.left=document.getElementById("lupa").style.left;
              document.getElementById("inps").style.zIndex="3";
              document.getElementById("inps").classList.remove("clicked");

              var inps=document.createElement("input");
              inps.style.top=parseInt(docauxaux.style.top)+"px";
                inps.style.left=parseInt(docauxaux.style.left)-4*tamanho_celula+"px";
                inps.style.height=parseInt(docauxaux.style.height)+"px";
                inps.style.width=parseInt(docauxaux.style.width)+4*tamanho_celula+"px";
                document.getElementById("inps").style.opacity=1;
                inps.classList.add("clicked");
                inps.style.borderLeftWidth ="0px";

                if(document.getElementById("lupa").classList.contains("clicked")){
                  document.getElementById("lupa").classList.remove("clicked");
                  document.getElementById("lupa").classList.add("unclicked");
                  //largura e altura da caixa do filtro volta a aumentar
                  document.getElementById("lupa").style.width=document.getElementById("lupa").offsetWidth+2+"px";
                  document.getElementById("lupa").style.height=document.getElementById("lupa").offsetHeight+2+"px";
                } 
        }

        whos_first=0;
      }


      //criar botoes de filtro para ativar e desativar os projetos
      for(var i = 0; i < tipos.length; i++){
          //divs que vao ser os botoes de filtro
          var filt = document.createElement("div");
          var txt = document.createElement("p");
          filt.classList.add("filtros"); 
          filt.classList.add("uncheck"); 
          filt.classList.add("overlay"); 

          filt.classList.add("unclicked");

          filt.id=i;
          filt.name = ""+tipos[i];
          //acordeao filtros
          filt.onclick = function () {
             myFunction(this, this.name);
           };
          txt.innerHTML=tipos[i];
          filt.appendChild(txt);
          if(window.innerWidth<1000){
            filt.classList.add("unclicked");
            document.body.appendChild(filt);
            document.getElementById("filter").style.display="none";
          }else{
            document.getElementById("filter").appendChild(filt);
          }
          
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
            this.tick=0;
            this.qqtimeout=[];

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
            var projectos = document.getElementsByClassName(this.id);
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
            
            for (var i = 0; i < projectos.length; i++) {
              projectos[i].classList.add("projeto");
              projectos[i].classList.remove("projeto_sem_anim");
              projectos[i].style.left=this.atualx*tamanho_celula-this.altura/2+"px";
              projectos[i].style.top=this.atualy*tamanho_celula-this.altura/2+"px";
            }
            /*document.getElementById(this.id).style.left=this.atualx*tamanho_celula+this.largura*1.5+"px";
            document.getElementById(this.id).style.top=this.atualy*tamanho_celula+this.altura*1.5+"px";*/
          }

          tp(){
            if(!this.em_movimento){
              if(!this.ativo){
                this.deambulando();
              }else{
                this.direcionando();
              }
              this.em_movimento=true;
            }
            var projectos = document.getElementsByClassName(this.id);
            //posicao atual aproxima-se do destino
            if(this.atualy==0){//tp cima
                this.atualy=nlinhas;
                this.y=nlinhas;

                //coloca o div do projeto na posicao certa
                for (var i = 0; i < projectos.length; i++) {
                  projectos[i].classList.add("projeto_sem_anim");
                  projectos[i].classList.remove("projeto");
                  projectos[i].style.left=this.atualx*tamanho_celula-this.altura/2+"px";
                  projectos[i].style.top=this.atualy*tamanho_celula-this.altura/2+"px";
                }

                if(!this.ativo){
                  this.deambulando();
                }else{
                  this.direcionando();
                }

            }else if(this.atualy==nlinhas){//tp baixo
                this.atualy=0;
                this.y=0;

                //coloca o div do projeto na posicao certa
                for (var i = 0; i < projectos.length; i++) {
                  projectos[i].classList.add("projeto_sem_anim");
                  projectos[i].classList.remove("projeto");
                  projectos[i].style.left=this.atualx*tamanho_celula-this.altura/2+"px";
                  projectos[i].style.top=this.atualy*tamanho_celula-this.altura/2+"px";
                }

                if(!this.ativo){
                  this.deambulando();
                }else{
                  this.direcionando();
                }
            }else if(this.atualx==0){//tp esquerda
                this.atualx=ncolunas;
                this.x=ncolunas;

                //coloca o div do projeto na posicao certa
                for (var i = 0; i < projectos.length; i++) {
                  projectos[i].classList.add("projeto_sem_anim");
                  projectos[i].classList.remove("projeto");
                  projectos[i].style.left=this.atualx*tamanho_celula-this.altura/2+"px";
                  projectos[i].style.top=this.atualy*tamanho_celula-this.altura/2+"px";
                }

                if(!this.ativo){
                  this.deambulando();
                }else{
                  this.direcionando();
                }
            }else if(this.atualx==ncolunas){//tp direita
                this.atualx=0;
                this.x=0;

                //coloca o div do projeto na posicao certa
                for (var i = 0; i < projectos.length; i++) {
                  projectos[i].classList.add("projeto_sem_anim");
                  projectos[i].classList.remove("projeto");
                  projectos[i].style.left=this.atualx*tamanho_celula-this.altura/2+"px";
                  projectos[i].style.top=this.atualy*tamanho_celula-this.altura/2+"px";
                }

                if(!this.ativo){
                  this.deambulando();
                }else{
                  this.direcionando();
                }
            }

          }

          deambulando(){
            let auxmov=Math.random();
            //escolher pra que lado vai deambular a seguir
            if(auxmov<0.25 && (this.y-1!=0 && !checkpos(this, this.x,this.y-1)) || (this.y-1==0 && !checkpos(this, this.x,nlinhas)) ){//deambula cima
              if(this.y-1>=0){
                this.y--;
              }
            }else if(auxmov<0.50  && (this.x+1!=ncolunas && !checkpos(this, this.x+1,this.y)) || (this.x+1==ncolunas && !checkpos(this, 0,this.y)) ){//deambula direita
              if(this.x+1<=ncolunas){
                this.x++;
              }
            }else if(auxmov<=0.75  && (this.y+1!=nlinhas && !checkpos(this, this.x,this.y+1)) || (this.y+1==nlinhas && !checkpos(this, this.x,0)) ){//deambula baixo
              if(this.y+1<=nlinhas){
                this.y++;
              }
            }else if(auxmov<=1 &&  (this.x-1!=0 && !checkpos(this, this.x-1,this.y)) || (this.x-1==0 && !checkpos(this, ncolunas,this.y)) ){//deambula esquerda
              if(this.x-1>=0){
                this.x--;
              }
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

            /*
            .expandido
            >p
              font-size: 12px
              opacity: 1
              &:nth-child(1)
                font-size: 18px
                margin-bottom: 0px
            >img
              height: auto
              opacity: 1
            */

            this.vel=0;
            }

            this.qqtimeout[i]=setTimeout(function() {
              var boobies = document.getElementsByClassName("expandido");
              var index = 0, length = boobies.length;
              for ( ; index < length; index++) {

                var two_boobies = boobies[index].getElementsByTagName("p");
                var two_index = 0, two_length = two_boobies.length;
                for ( ; two_index < two_length; two_index++) {
                  two_boobies[two_index].style.opacity="1";
                }

                var two_boobies = boobies[index].getElementsByTagName("img");
                var two_index = 0, two_length = two_boobies.length;
                for ( ; two_index < two_length; two_index++) {
                  two_boobies[two_index].style.opacity="1";
                }

              }
            }, 500);


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
              if(!(window.location.href.indexOf("editorial") > -1)){
                projectos[i].classList.add("grayscale");
              }
            }
            this.vel=1;
            }
              var boobies = document.getElementsByClassName("normal");
              var index = 0, length = boobies.length;
              for ( ; index < length; index++) {
                var two_boobies = boobies[index].getElementsByTagName("p");
                var two_index = 0, two_length = two_boobies.length;
                for ( ; two_index < two_length; two_index++) {
                  two_boobies[two_index].style.opacity="0";
                }
                var two_boobies = boobies[index].getElementsByTagName("img");
                var two_index = 0, two_length = two_boobies.length;
                for ( ; two_index < two_length; two_index++) {
                  two_boobies[two_index].style.opacity="0";
                }
              }
            /*grande.id="projetogrande"
            //começa pequeno e invisivel
            grande.classList.add("contraido");*/
          }

        }


        //variavel vai guardar as posições que os botões do overlay estao a ocupar
        var overlayblock=[];

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

        if(window.location.href.indexOf("index") > -1){
          grelha.style.height=arredonda_cima(screen.height*1)+"px";
          grelha.style.width=arredonda_cima(screen.width*1)+"px";
        }else{
          grelha.style.height=arredonda_cima(screen.height*6)+"px";
          grelha.style.width=arredonda_cima(screen.height*6)+"px";
        }
        
        

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
          window.scroll(largura_tela*1.1%tamanho_celula, altura_tela*1%tamanho_celula);
        }else{

            if(window.location.href.indexOf("index") > -1){
              window.scroll(auxxxx, auyyyy);
              console.log("index");
            }else{
              window.scroll(auxxxx%tamanho_celula, auyyyy%tamanho_celula);
            }
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

        if(!(window.location.href.indexOf("editorial") > -1)){
          quadrado.classList.add("grayscale");
        }
        
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

            var xset=Math.floor(Math.random() * (ncolunas-1 - 2) + 2);

            var yset=Math.floor(Math.random() * (nlinhas-1 - 2) + 2);

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
        var t=setInterval(draw,(1000/projetos.length/1));

        //ir buscar imagem noise
        var noiseimg=document.getElementById("noise");
        noiseimg.style.width=screen.width*1.2+"px";
        noiseimg.style.height=screen.height*1.2+"px";

        var epa=0;
        var aux_offset=0;
        function draw() {

          if(window.location.href.indexOf("index") > -1){
            var epa_next=epa+1;
            if(epa_next==projetos.length){
              epa_next=0;
            }
            if(projetos[epa].vel==1){

              if(projetos[epa].ativo){
                projetos[epa_next].tp();
                projetos[epa].move();
              }else{
                projetos[epa_next].tp();
                projetos[epa].move();
                /*if(projetos[epa].tick==0){
                  projetos[epa].move();
                  projetos[epa].tick=1;
                }else{
                  projetos[epa].tick=0;
                }*/
              }
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
            if(auxbgtop>altura_tela*3-noiseimg.offsetHeight-200){
              auxbgtop=altura_tela*3-noiseimg.offsetHeight-200;
            }
            var auxbgleft=Math.random()*(scrollX - (scrollX-200)) + (scrollX-200);
            if(auxbgleft>largura_tela*3-noiseimg.offsetWidth-200){
              auxbgleft=largura_tela*3-noiseimg.offsetWidth-200;
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
      naoepradescer=true;
      console.log("mudafiltro");
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

          if(window.innerWidth<1000){
            here.classList.remove("unclicked");
            here.classList.add("clicked");
          }
          

          here.classList.add(here.name);
          here.childNodes[0].style.color="rgb(213,213,213)";

      }else{
          desativa(tipo);
          var grayscale_aux = document.getElementsByClassName(tipo);
          for(var i = 0; i < grayscale_aux.length; i++){

              if(!(window.location.href.indexOf("editorial") > -1)){
                grayscale_aux[i].classList.add("grayscale");
              }
             

          }
          here.classList.remove("check");
          here.classList.add("uncheck");
          if(window.innerWidth<1000){
            here.classList.remove("clicked");
            here.classList.add("unclicked");
          }
          here.classList.remove(here.name);
          here.classList.remove("grayscale");
          here.childNodes[0].style.color="rgb(120,120,120)";
      }
     burn_them();
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
var incsx=0;
var incsy=0;
document.onmousedown = function(p) {
  if(p.button == 1 ){
    p.preventDefault();
  }else if(p.button==0){isMouseDown = true; xfirst=p.pageX; yfirst=p.pageY}};
document.onmouseup   = function() { isMouseDown = false;  overlayback(); incsx=0;incsy=0; 

          if(window.location.href.indexOf("editorial") > -1){
            if(scrollY>bottomest_one){
              window.scroll(scrollX,bottomest_one);
            }
          }else if(window.location.href.indexOf("projeto") > -1){
            if(scrollY>document.getElementById("txt2").offsetTop){
              window.scroll(scrollX,document.getElementById("txt2").offsetTop);
              }
          }else if(window.location.href.indexOf("submit") > -1){
            if(scrollY>document.getElementById("submm").offsetTop){
            window.scroll(scrollX,document.getElementById("submm").offsetTop);
            }
          }
};

  var div = document.body;
    document.onmousemove = function(e){
      //case 1 clica apenas com o lado esquerdo do rato
        if(isMouseDown && !(window.location.href.indexOf("editorial") > -1) && !(window.location.href.indexOf("about") > -1) && !(window.location.href.indexOf("submit") > -1) && !(window.location.href.indexOf("projeto") > -1)){
        
        window.scrollBy(xfirst-e.pageX+incsx, yfirst-e.pageY+incsy);

        if(scrollX>largura_tela*2){
          incsx-=largura_tela;
        }
        if(scrollY>altura_tela*2){
          incsy-=altura_tela;
        }
        if(scrollX<largura_tela-screen.width){
          incsx+=largura_tela;
        }
        if(scrollY<altura_tela-screen.height){
          incsy+=altura_tela;
        }

          if(!window.location.href.indexOf("projeto") > -1){
            for(var i=0; i<overlays.length;i++){
              overlays[i].style.opacity=0;
            }
          }


        }
    }

    document.touchend  = function(uu){
      console.log("aaaaaaa");
    }

    function overlayback(){

      

      if(!window.location.href.indexOf("projeto") > -1){

      for(var i=0; i<overlays.length;i++){
        overlays[i].style.opacity=1;
      }

      if (window.location.href.indexOf("editorial") > -1) {
               //move a caixa do filtro para a sua posição inicial
      document.getElementById("filter").style.top=window.arredonda_cima(scrollY+window.innerHeight)-tamanho_celula*4-3+"px";
      document.getElementById("filter").style.left=window.arredonda_cima(scrollX+window.innerWidth)-tamanho_celula*4-3+"px";

        }else if(!(window.location.href.indexOf("submit") > -1) && !(window.location.href.indexOf("projeto") > -1) ){
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
      
        if(window.innerWidth<1000){
          document.getElementById("submit").style.top=window.arredonda_cima(scrollY)+tamanho_celula*4+1+"px";
        document.getElementById("submit").style.left=window.arredonda_cima(scrollX)+tamanho_celula*1+1+"px"; 
        document.getElementById("editorial").style.top=window.arredonda_cima(scrollY)+tamanho_celula*4+1+"px"; 
        document.getElementById("editorial").style.left=arredonda_cima(scrollX+tamanho_celula*4)+1+"px"; 
        }
      }



      if (!(window.location.href.indexOf("editorial") > -1) && !(window.location.href.indexOf("about") > -1)) {
      //move a caixa do lupa para a sua posição inicial
      document.getElementById("lupa").style.top=window.arredonda_cima(scrollY+window.innerHeight)-tamanho_celula*3-3+"px";
      document.getElementById("lupa").style.left=window.arredonda_cima(scrollX+window.innerWidth)-tamanho_celula*6-3+"px";

                var docauxaux=document.getElementById("lupa");
                
                var inps=document.getElementById("inps");
                
                if(inps!=null){
                  inps.style.transition ="opacity 0.1s";
                  docauxaux.style.transition ="opacity 0.1s";
                }
              if(!(window.location.href.indexOf("submit") > -1) && !(window.location.href.indexOf("projeto") > -1) && document.getElementById("lupa").classList.contains("unclicked")){

                document.getElementById("inps").style.width="0px";
                document.getElementById("inps").style.top=document.getElementById("lupa").style.top;
                document.getElementById("inps").style.left=document.getElementById("lupa").style.left;
                document.getElementById("inps").style.zIndex="3";
                document.getElementById("inps").classList.remove("clicked");
    
              }else if(!(window.location.href.indexOf("projeto") > -1) && !(window.location.href.indexOf("submit") > -1)){
                inps.style.top=parseInt(docauxaux.style.top)+"px";
                inps.style.left=parseInt(docauxaux.style.left)-4*tamanho_celula+"px";
                inps.style.height=parseInt(docauxaux.style.height)+"px";
                inps.style.width=parseInt(docauxaux.style.width)+4*tamanho_celula+"px";
                inps.id="inps";
                document.getElementById("inps").style.opacity=1;
                document.getElementById("lupa").style.left=parseInt(document.getElementById("lupa").style.left)-5*tamanho_celula+"px";
                inps.classList.add("clicked");
                inps.style.borderLeftWidth ="0px";
                document.getElementById("lupa").style.borderRightWidth ="0px";
              }
              }
      }

      //modifica os objetivos dos projetos dinamicamente
      re_objetivos();
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
    
    if(window.innerWidth<1000){
      document.getElementById("about").style.top=arredonda_cima(scrollY+tamanho_celula*4)-3+"px";
      document.getElementById("about").style.left=arredonda_cima(scrollX+tamanho_celula)-3+"px";
    }

    //move a caixa do submit para a sua posição inicial
    document.getElementById("submit").style.top=window.arredonda_cima(scrollY)+tamanho_celula-3+"px";
    document.getElementById("submit").style.left=window.arredonda_cima(scrollX+window.innerWidth)-tamanho_celula*12-3+"px";
    //largura e altura da caixa do submit
    document.getElementById("submit").style.width=tamanho_celula*2+3+"px";
    document.getElementById("submit").style.height=tamanho_celula*1+3+"px";


              if (window.location.href.indexOf("editorial") > -1) {
                //move a caixa do search para a sua posição inicial
                document.getElementById("search").style.top=window.arredonda_cima(scrollY)+tamanho_celula*4+1+"px";
                document.getElementById("search").style.left=window.arredonda_cima(scrollX)+tamanho_celula+1+"px";
                //largura e altura da caixa do search
                document.getElementById("search").style.width=tamanho_celula*6+"px";
                document.getElementById("search").style.height=tamanho_celula*1+"px";
              }

    if(window.innerWidth<1000){
      document.getElementById("about").style.top=arredonda_cima(scrollY+tamanho_celula*4)-3+"px";
      document.getElementById("about").style.left=arredonda_cima(scrollX+tamanho_celula)-3+"px";

      document.getElementById("search").style.top=arredonda_cima(scrollY+tamanho_celula*6)+"px";
      document.getElementById("search").style.left=arredonda_cima(scrollX)+tamanho_celula+1+"px";

      document.getElementById("submit").style.top=arredonda_cima(scrollY+tamanho_celula*4)-3+"px";
      document.getElementById("submit").style.left=arredonda_cima(scrollX+tamanho_celula*4)-3+"px";
      if (window.location.href.indexOf("editorial") > -1) {
        document.getElementById("editorial").style.display="none";
      }
      var a = document.getElementsByClassName("filtros");
      var b=8;
      var c=1;
      for(var i=0;i<a.length;i++){
        a[i].childNodes[0].style.fontSize="14px";
        a[i].style.top=arredonda_cima(scrollY+tamanho_celula*b)-3+"px";
        a[i].style.left=arredonda_cima(scrollX+tamanho_celula*c)-3+"px";

        a[i].style.width=tamanho_celula*2+3+"px";
        a[i].style.height=tamanho_celula*1+3+"px";

        c+=3;
        if(c>(window.innerWidth/tamanho_celula)-2){
          b+=2;
          c=1;
        }
      }

    }


    if (window.location.href.indexOf("index") > -1) {
    //move a caixa do lupa para a sua posição inicial
    document.getElementById("lupa").style.top=window.arredonda_cima(scrollY+window.innerHeight)-tamanho_celula*3-3+"px";
    document.getElementById("lupa").style.left=window.arredonda_cima(scrollX+window.innerWidth)-tamanho_celula*6-3+"px";
    //largura e altura da caixa do lupa
    document.getElementById("lupa").style.width=tamanho_celula*1+3+"px";
    document.getElementById("lupa").style.height=tamanho_celula*1+3+"px";
   

              var docauxaux=document.getElementById("lupa");
              var inps=document.createElement("input");
              inps.style.position="absolute";
              inps.classList.add("overlay");
              inps.style.top=parseInt(docauxaux.style.top)+3+"px";
              inps.style.left=parseInt(docauxaux.style.left)-5*tamanho_celula+3+"px";
              inps.style.height=parseInt(docauxaux.style.height)+"px";
              inps.style.width=parseInt(docauxaux.style.width)+4*tamanho_celula+"px";
              inps.id="inps";
              inps.placeholder="search...";
              inps.style.outline="none";
              inps.style.fontSize="15px";
              inps.style.paddingBottom ="4px";
              document.body.appendChild(inps);

              document.getElementById("inps").style.width="0px";
              document.getElementById("inps").style.left=document.getElementById("lupa").style.left;
              document.getElementById("inps").style.zIndex="3";
              document.getElementById("inps").style.opacity=0;

              document.getElementById("inps").onclick = function () {
             press(this, 1);
           };
      }

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
          if(elem.id=="lupa"){
              if(document.getElementById("inps") != null){
                var docauxaux=document.getElementById("lupa");
                var inps=document.getElementById("inps");
                inps.style.top=parseInt(docauxaux.style.top)+"px";
                inps.style.left=parseInt(docauxaux.style.left)-4*tamanho_celula+"px";
                inps.style.height=parseInt(docauxaux.style.height)+"px";
                inps.style.width=parseInt(docauxaux.style.width)+4*tamanho_celula+"px";
                inps.id="inps";
                document.getElementById("inps").style.opacity=1;
                document.getElementById("lupa").style.left=parseInt(document.getElementById("lupa").style.left)-5*tamanho_celula+"px";
                inps.classList.add("clicked");
                inps.style.borderLeftWidth ="0px";
                document.getElementById("lupa").style.borderRightWidth ="0px";

              }
            }
          }else{
            //recolhe lista de filtros
          if(elem.id=="filter" || elem.id=="lupa" ){
            if(!naoepradescer){
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
              if(elem.id=="lupa"){
                document.getElementById("lupa").style.top=window.arredonda_cima(scrollY+window.innerHeight)-tamanho_celula*3-3+"px";
                document.getElementById("lupa").style.left=window.arredonda_cima(scrollX+window.innerWidth)-tamanho_celula*6-3+"px";

                document.getElementById("inps").style.width="0px";
                document.getElementById("inps").style.left=document.getElementById("lupa").style.left;
                document.getElementById("inps").style.zIndex="3";
                document.getElementById("inps").classList.remove("clicked");
                
              }
            }
          }
          naoepradescer=false;
      }
      whos_first=1;
    }

    var tttg=setInterval(butavoid,100);

    function butavoid(){
      var yeeaw = document.getElementsByClassName("yoyoyo");

      for(var jack=0;jack<yeeaw.length;jack++){
        yeeaw[jack].remove();
      }
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
            
            /*var suxauxdiv=document.createElement("div");
            suxauxdiv.classList.add("yoyoyo");
            suxauxdiv.style.position="absolute";
            suxauxdiv.style.width="10px";
            suxauxdiv.style.height="10px";
            suxauxdiv.style.backgroundColor="red";
            suxauxdiv.style.top=(yips%nlinhas)*tamanho_celula+"px";
            suxauxdiv.style.left=(xis%ncolunas)*tamanho_celula+"px";
            suxauxdiv.style.zIndex=7;
            document.getElementById("grelha").appendChild(suxauxdiv);
            delete suxauxdiv;*/
            
            }
          }

          /*console.log(xauxx%ncolunas);
          console.log(yauxy%nlinhas);
          console.log(wauxw);
          console.log(hauxh);
          console.log("more");*/
        }
    }    

    function re_objetivos(){
          //define coordenadas objetivo de cada tipo de projeto
          for(var i = 0; i < tipos.length; i++){

            var lim_um_x=scrollX;
            var lim_dois_x=scrollX+window.innerWidth;

            var lim_um_y=scrollY;
            var lim_dois_y=scrollY+window.innerHeight;

            lim_um_x=arredonda_cima(lim_um_x / tamanho_celula)%ncolunas;
            lim_dois_x=arredonda_cima(lim_dois_x / tamanho_celula)%ncolunas;

            lim_um_y=arredonda_cima(lim_um_y / tamanho_celula)%nlinhas;
            lim_dois_y=arredonda_cima(lim_dois_y / tamanho_celula)%nlinhas;



            var aux_randx=Math.floor(Math.random() * ncolunas);
            var aux_randy=Math.floor(Math.random() * nlinhas);

            for(var j = 0; j < projetos.length; j++){
              if(projetos[j].tipo==tipos[i]){
                //projetos[j].set_objetivo(aux_randx, aux_randy);
              }
            }
            /*console.log(aux_randx, aux_randy);
            var suxauxdiv=document.createElement("div");
            suxauxdiv.classList.add("yoyoyoyo");
            suxauxdiv.style.position="absolute";
            suxauxdiv.style.width="10px";
            suxauxdiv.style.height="10px";
            suxauxdiv.style.backgroundColor="blue";
            suxauxdiv.style.top=aux_randy*tamanho_celula+"px";
            suxauxdiv.style.left=aux_randx*tamanho_celula+"px";
            suxauxdiv.style.zIndex=9;
            document.getElementById("grelha").appendChild(suxauxdiv);
            delete suxauxdiv;*/
          }

            
    }    

    
    

 