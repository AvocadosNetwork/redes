//Abro hilo
const oct = [];  //octeto usuario
const octi = []; //octeto inicial de red
const octf = []; //octeto final utilizable
const octb = []; //octeto broadcast
const mask = []; //mascara de subred
const vlsm = []; //vlsm

let contadorOcteto = v1 = v2 = 0;
let subredes, host;
let tipoClase = ' ';
let contadorItems = 0;
let c1, c2, c3, i1, i2, i3;
let numVLSM, contadorVLSM = 1;
for (let i = 0; i < 4; i++) {
    oct[i] = 0;
    mask[i] = 0;
}

//Eventos
let formRedes = document.getElementById('formRedes');
let formSubredes = document.getElementById('formRedes2'); 
let items = document.getElementById('items');
let btnS = document.getElementById('btnsubredes');
let btnR = document.getElementById('btnRedes');
let war = document.getElementById('formRedes0');
let img = document.getElementById('imagenweona');
let btnHP = document.getElementById('btnHostP');
let btnVLSM = document.getElementById('btnVLSM');
let btnVLSM1 = document.getElementById('btnVLSM1');
let btnVLSM2 = document.getElementById('btnVLSM2');
let inpVLSM1 = document.getElementById('inputVLSM');
let inpVLSM2 = document.getElementById('inputVLSM2');

btnR.addEventListener('click',warnings);
btnS.addEventListener('click',warningSubred);
btnHP.addEventListener('click',warningHP);
btnVLSM.addEventListener('click',warningVLSM);
btnVLSM1.addEventListener('click',warningVLSM1);
btnVLSM2.addEventListener('click',warningVLSM2);

function warningVLSM(e){
    e.preventDefault();
    document.getElementById('formRedesVLSM').style.visibility = 'visible';
}

function warningVLSM1(e){
    e.preventDefault();
    if(!inpVLSM1.value || inpVLSM1.value < 1 || inpVLSM1.value > 1000){
        avientaleLaALarma('Rango invalido (1 - 1000)');
    } else{
        document.getElementById('divSig').style.visibility = 'visible';
        document.getElementById('basic-addon4').textContent = 'Subred 1:';
        numVLSM = parseInt(inpVLSM1.value);
        limpiarVLSM();
        if(numVLSM == 1){
            btnVLSM2.textContent = 'Calcular';
        }
    }
}


function limpiarVLSM(){
    contadorVLSM = 1;
    for (let i = 1; i <= 1000; i++){
        vlsm[i] = 0;
    }
    inpVLSM2.value = "";
    btnVLSM2.disabled = false;
    inpVLSM2.disabled = false;
    btnVLSM2.textContent = 'Siguiente';
}

function calcularVLSM(){
    //ordenar de mayor a menor
    for (let i = 1; i <= numVLSM; i++){
        for (let j = 1; j <= numVLSM; j++){
            if(vlsm[j] < vlsm[i]){
                c1 = vlsm[i];
                vlsm[i] = vlsm[j];
                vlsm[j] = c1;
            }
        }
    }
    
    //Inicia la tabla
    let redesVLSM = 0;
    let tabla = document.createElement('table');
    tabla.setAttribute('class','table table-sm table-success table-striped table-hover');
    let tablaHead = document.createElement('thead');
    let trH = document.createElement('tr');
    let col1 = document.createElement('th');
    col1.setAttribute('scope','col');
    col1.textContent = '#S';
    let col2 = document.createElement('th');
    col2.setAttribute('scope','col');
    col2.textContent = 'HostR';
    let col3 = document.createElement('th');
    col3.setAttribute('scope','col');
    col3.textContent = 'bits';
    let col4 = document.createElement('th');
    col4.setAttribute('scope','col');
    col4.textContent = 'Subred';
    let col5 = document.createElement('th');
    col5.setAttribute('scope','col');
    col5.textContent = 'Broadcast';
    let col6 = document.createElement('th');
    col6.setAttribute('scope','col');
    col6.textContent = 'HostU';
    let col7 = document.createElement('th');
    col7.setAttribute('scope','col');
    col7.textContent = '/';
    let col8 = document.createElement('th');
    col8.setAttribute('scope','col');
    col8.textContent = 'Mascara';
    let tablabody = document.createElement('tbody');

    trH.appendChild(col1);
    trH.appendChild(col2);
    trH.appendChild(col3);
    trH.appendChild(col4);
    trH.appendChild(col5);
    trH.appendChild(col6);
    trH.appendChild(col7);
    trH.appendChild(col8);
    tablaHead.appendChild(trH)
    tabla.appendChild(tablaHead);
    
    //empezar a armar el paquete
    for (let i = 1; i <= numVLSM; i++){
        c1=0;
        do{
            c1++;
        } while( (2**c1)-2 < vlsm[i]);

        octetoInicial(redesVLSM);

        let trB = document.createElement('tr');
        let thB = document.createElement('th');
        thB.setAttribute('scope','row');
        thB.textContent = i;
        let tdB1 = document.createElement('td');
        tdB1.textContent = vlsm[i];
        let tdB2 = document.createElement('td');
        tdB2.textContent = `2^${c1}=${2**c1}`;
        let tdB3 = document.createElement('td');
        tdB3.textContent = `${octi[0]}.${octi[1]}.${octi[2]}.${octi[3]}`;
        redesVLSM = redesVLSM + ((2**c1)-1);
        octetoInicial(redesVLSM);
        let tdB4 = document.createElement('td');
        tdB4.textContent = `${octi[0]}.${octi[1]}.${octi[2]}.${octi[3]}`;
        let tdB5 = document.createElement('td');
        tdB5.textContent = (2**c1)-2;
        let tdB6 = document.createElement('td');
        tdB6.textContent = (32-c1);
        Mascara(32-c1)
        let tdB7 = document.createElement('td');
        tdB7.textContent = `${mask[0]}.${mask[1]}.${mask[2]}.${mask[3]}`;
        
        trB.appendChild(thB);
        trB.appendChild(tdB1);
        trB.appendChild(tdB2);
        trB.appendChild(tdB3);
        trB.appendChild(tdB4);
        trB.appendChild(tdB5);
        trB.appendChild(tdB6);
        trB.appendChild(tdB7);
        tablabody.appendChild(trB);
        redesVLSM++;
    }

    tabla.appendChild(tablabody);

    let divAccordionitem = document.createElement('div');
    divAccordionitem.className = 'accordion-item';
    let accordionHeader = document.createElement('h2')
    accordionHeader.className = 'accordion-header';
    accordionHeader.id = `heading${contadorItems}`
    let btnAccordion = document.createElement('button');
    btnAccordion.className = 'accordion-button collapsed';
    btnAccordion.type - 'button';
    btnAccordion.setAttribute('data-bs-toggle','collapse')
    btnAccordion.textContent= `VLSM`
    btnAccordion.setAttribute('data-bs-target',`#collapse${contadorItems}`)
    btnAccordion.setAttribute('aria-expanded','false')
    btnAccordion.setAttribute('aria-controls',`collapse${contadorItems}`)
    let divCollapse = document.createElement('div');
    divCollapse.id = `collapse${contadorItems}`;
    divCollapse.className = 'accordion-collapse collapse';
    divCollapse.setAttribute('aria-labelledby',`heading${contadorItems}`);
    divCollapse.setAttribute('data-bs-parent','#accordionSubred');
    let divBody = document.createElement('div');
    divBody.className = 'accordion-body table-responsive';

    divBody.appendChild(tabla);
    accordionHeader.appendChild(btnAccordion);
    divCollapse.appendChild(divBody);
    divAccordionitem.appendChild(accordionHeader);
    divAccordionitem.appendChild(divCollapse);
    items.appendChild(divAccordionitem);
    contadorItems++;

    let orden = "";
    for (let i = 1; i <= numVLSM; i++){
        orden = orden + vlsm[i] + '|';
    }
    console.log('orden: ' + orden);
}

function octetoInicial(numx){
    for (let i = 0;i < 4; i++){
        octi[i] = oct[i];
    }

    if(numx >= 65536){
        numx = numx/65536;
        c2 = (numx % 1)*256;
        c3 = (c2 % 1)*256;
        i1 = numx - (numx % 1);
        i2 = c2 - (c2 % 1);
        i3 = c3;
        octi[1] = parseInt(octi[1]) + parseInt(i1);
        octi[2] = parseInt(octi[2]) + parseInt(i2);
        octi[3] = parseInt(octi[3]) + parseInt(i3);
    }else{
        numx = numx/256;
        c2 = (numx % 1)*256;
        i1 = numx- (numx % 1);
        i2 = c2;
        octi[2] = parseInt(octi[2]) + parseInt(i1);
        octi[3] = parseInt(octi[3]) + parseInt(i2);
    }
}

function Mascara(numx){
    for (let i = 0; i < 4; i++) {
        if(numx > 8){
            mask[i] = 255;
        } else {
            let x = 0, y = 7;
            for(let j = 0; j < numx; j++){
                x = x + (2**y);
                y--;
            }
            mask[i] = x;
        }
        numx = numx - 8;
    }
}

function warningVLSM2(e){
    e.preventDefault();
    if(btnVLSM2.textContent == 'Calcular'){
        vlsm[contadorVLSM] = parseInt(inpVLSM2.value);
        let vector = "";
        inpVLSM2.disabled = 'true';
        for (let i = 1; i <= numVLSM; i++){
            vector = vector + vlsm[i] + '|';
        }
        console.log('vector: ' + vector);
        btnVLSM2.disabled = 'true';
        calcularVLSM();
    }
    if(contadorVLSM <= numVLSM && btnVLSM2.textContent == 'Siguiente'){
        if(!inpVLSM2.value || inpVLSM2.value > (2**host)-2 || inpVLSM2.value == 0){
            console.log(host);
            avientaleLaALarma(`Num de Host invalido 1 - ${(2**host)-2} `);
        } else {
            vlsm[contadorVLSM] = parseInt(inpVLSM2.value);
            contadorVLSM++;
            document.getElementById('basic-addon4').textContent = `Subred ${contadorVLSM}:`;
            inpVLSM2.value = "";
            if(contadorVLSM == numVLSM){
                btnVLSM2.textContent = 'Calcular';
            }
        }
    }  
}

//funcion evaluadora del primer octeto
function valuePrimerOcteto(val){
    if(val<128 && val >0){
        tipoClase='A';
        document.getElementById("oct2").disabled = true;
        document.getElementById("oct3").disabled = true;
        document.getElementById("oct2").value = 0;
        document.getElementById("oct3").value = 0;
    }
    else if(val>127 && val < 192){
        tipoClase='B';
        document.getElementById("oct2").disabled = false;
        document.getElementById("oct3").disabled = true;
        document.getElementById("oct3").value = 0;
    }
    else if(val>191 && val<224){
        tipoClase='C';
        document.getElementById("oct2").disabled = false;
        document.getElementById("oct3").disabled = false;
    }
    else if(val>223 && val<240){
        tipoClase='D';
        document.getElementById("oct2").disabled = false;
        document.getElementById("oct3").disabled = false;
    }
    else if(val>239 && val<256){
        tipoClase='E';
        document.getElementById("oct2").disabled = false;
        document.getElementById("oct3").disabled = false;
    }
}

//funcion calculadora de red
function CalcularRed(){
    //e.preventDefault();
    oct[0] = parseInt(document.getElementById("oct1").value)
    oct[1] = parseInt(document.getElementById("oct2").value)
    oct[2] = parseInt(document.getElementById("oct3").value)
    oct[3] = 0;
    let diagonal = document.getElementById("diagonal").value
    console.log(`El valor de la diagonal es ${diagonal} para el octeto de valor ${oct[0]}`)
    //establece el numero de Subredes y Hosts
    switch(tipoClase){
        case 'A':
            subredes = diagonal - 8;
            break;
        case 'B':
            subredes = diagonal - 16;
            break;
        default:
            subredes = diagonal - 24;
            break;
    }
    host = 32 - diagonal;

    //calcula la mascara de subred
    let v1=diagonal;
    Mascara(v1); 

    formSubredes.style.visibility='visible';
    items.style.visibility='visible';
    btnR.disabled = true;

    //agrega primer elemento
    let divUno = document.createElement('div');
    divUno.className = 'accordion-item';
    let tituloUno = document.createElement('h2')
    tituloUno.className = 'accordion-header';
    tituloUno.id = `heading${contadorItems}`
    let btnTituloUno = document.createElement('button');
    btnTituloUno.className = 'accordion-button';
    btnTituloUno.type - 'button';
    btnTituloUno.setAttribute('data-bs-toggle','collapse')
    btnTituloUno.textContent= `Red ${oct[0]}.${oct[1]}.${oct[2]}.${oct[3]} / ${diagonal}`
    btnTituloUno.setAttribute('data-bs-target',`#collapse${contadorItems}`)
    btnTituloUno.setAttribute('aria-expanded','true')
    btnTituloUno.setAttribute('aria-controls',`collapse${contadorItems}`);
    let divdos = document.createElement('div');
    divdos.id = `collapse${contadorItems}`;
    divdos.className = 'accordion-collapse collapse show';
    divdos.setAttribute('aria-labelledby',`heading${contadorItems}`);
    divdos.setAttribute('data-bs-parent','#accordionSubred');
    let infoUno = document.createElement('div');
    infoUno.className = 'accordion-body';
    let parrafoUno = document.createElement('p')
    parrafoUno.className = ('h5')
    parrafoUno.textContent = `Red Clase ${tipoClase}: `;
    let smallUno = document.createElement('small');
    smallUno.className = ('text-muted');
    smallUno.textContent = `${oct[0]}.${oct[1]}.${oct[2]}.${oct[3]} / ${diagonal}`
    let parrafoDos = document.createElement('p')
    parrafoDos.className = ('blockquote');
    parrafoDos.textContent = `Mascara de subred: ${mask[0]}.${mask[1]}.${mask[2]}.${mask[3]} `;
    let parrafoTres = document.createElement('p')
    parrafoTres.textContent = `Numero de Subredes: ${2**subredes} | Numero de Host: ${2**host} | Host utilizables ${(2**host) - 2}`;

    parrafoUno.appendChild(smallUno);
    infoUno.appendChild(parrafoUno);
    infoUno.appendChild(parrafoDos);
    infoUno.appendChild(parrafoTres);
    tituloUno.appendChild(btnTituloUno);
    divdos.appendChild(infoUno);
    divUno.appendChild(tituloUno);
    divUno.appendChild(divdos);
    items.appendChild(divUno);

    //consoles log para pruebas
    console.log(`Red Clase ${tipoClase}: ${oct[0]}.${oct[1]}.${oct[2]}.${oct[3]}`);
    console.log(`Mascara de subred: ${mask[0]}.${mask[1]}.${mask[2]}.${mask[3]}`);
    console.log(`Numero de Subredes: ${2**subredes} | Numero de Host: ${2**host}`);

    contadorItems++;
}

function calcularHP(){
    let NumHostP = document.getElementById('inputHostP').value;
    let octPe = [];
    for (let i = 0;i < 4; i++){
        octPe[i] = oct[i];
    }
    c1 = (parseInt(2**host) * parseInt(document.getElementById('inputSubred').value)) + parseInt(NumHostP);
    if(c1 >= 65536){
        c1 = c1/65536;
        c2 = (c1 % 1)*256;
        c3 = (c2 % 1)*256;
        i1 = c1 - (c1 % 1);
        i2 = c2 - (c2 % 1);
        i3 = c3;
        octPe[1] = parseInt(oct[1]) + parseInt(i1);
        octPe[2] = parseInt(oct[2]) + parseInt(i2);
        octPe[3] = parseInt(oct[3]) + parseInt(i3);
    }else{
        c1 = c1/256;
        c2 = (c1 % 1)*256;
        i1 = c1- (c1 % 1);
        i2 = c2;
        octPe[2] = parseInt(oct[2]) + parseInt(i1);
        octPe[3] = parseInt(oct[3]) + parseInt(i2);
    } 

    //imprime el host
    let h1 = document.createElement('div');
    h1.className = 'alert alert-success alert-dismissible fade show';
    h1.setAttribute('role','alert')
    let h2 = document.createElement('strong');
    h2.textContent= `Subred ${parseInt(document.getElementById('inputSubred').value)}, Host ${NumHostP}:   `;
    let h4 = document.createElement('small');
    h4.className = ('h6');
    h4.textContent = `    ${octPe[0]}.${octPe[1]}.${octPe[2]}.${octPe[3]}`
    let h3 = document.createElement('button');
    h3.type = 'button';
    h3.className = 'btn-close';
    h3.setAttribute('data-bs-dismiss','alert')
    h3.setAttribute('aria-label','Close')
    
    h1.appendChild(h2);
    h1.appendChild(h4);
    h1.appendChild(h3);
    war.appendChild(h1);
}


function CalcularSubred(){
    let numSubred = document.getElementById('inputSubred').value;
    let numHost = host;

    //octeto inicial subred
    c1 = (2**numHost) * numSubred;
    octetoInicial(c1);

    //octeto final utilizable
    for (let i = 0;i < 4; i++){
        octf[i] = octi[i];
        octb[i] = octi[i];
    }

    c1 = (2**numHost) - 2;
    if(c1 >= 65536){
        c1 = c1/65536;
        c2 = (c1 % 1)*256;
        c3 = (c2 % 1)*256;
        i1 = c1 - (c1 % 1);
        i2 = c2 - (c2 % 1);
        i3 = c3;
        octf[1] = parseInt(octi[1]) + parseInt(i1);
        octf[2] = parseInt(octi[2]) + parseInt(i2);
        octf[3] = parseInt(octi[3]) + parseInt(i3);
    }else{
        c1 = c1/256;
        c2 = (c1 % 1)*256;
        i1 = c1- (c1 % 1);
        i2 = c2;
        octf[2] = parseInt(octi[2]) + parseInt(i1);
        octf[3] = parseInt(octi[3]) + parseInt(i2);
    }


    //broadcast
    c1 = (2**numHost) - 1;
    if(c1 >= 65536){
        c1 = c1/65536;
        c2 = (c1 % 1)*256;
        c3 = (c2 % 1)*256;
        i1 = c1 - (c1 % 1);
        i2 = c2 - (c2 % 1);
        i3 = c3;
        octb[1] = parseInt(octi[1]) + parseInt(i1);
        octb[2] = parseInt(octi[2]) + parseInt(i2);
        octb[3] = parseInt(octi[3]) + parseInt(i3);
    }else{
        c1 = c1/256;
        c2 = (c1 % 1)*256;
        i1 = c1- (c1 % 1);
        i2 = c2;
        octb[2] = parseInt(octi[2]) + parseInt(i1);
        octb[3] = parseInt(octi[3]) + parseInt(i2);
    }

    //agrega las subredes a la pantalla 
    let divAccordionitem = document.createElement('div');
    divAccordionitem.className = 'accordion-item';
    let accordionHeader = document.createElement('h2')
    accordionHeader.className = 'accordion-header';
    accordionHeader.id = `heading${contadorItems}`
    let btnAccordion = document.createElement('button');
    btnAccordion.className = 'accordion-button collapsed';
    btnAccordion.type - 'button';
    btnAccordion.setAttribute('data-bs-toggle','collapse')
    btnAccordion.textContent= `Subred: ${numSubred}`
    btnAccordion.setAttribute('data-bs-target',`#collapse${contadorItems}`)
    btnAccordion.setAttribute('aria-expanded','false')
    btnAccordion.setAttribute('aria-controls',`collapse${contadorItems}`)
    let divCollapse = document.createElement('div');
    divCollapse.id = `collapse${contadorItems}`;
    divCollapse.className = 'accordion-collapse collapse';
    divCollapse.setAttribute('aria-labelledby',`heading${contadorItems}`);
    divCollapse.setAttribute('data-bs-parent','#accordionSubred');
    let divBody = document.createElement('div');
    divBody.className = 'accordion-body';
    let p1 = document.createElement('p')
    p1.className = ('h5')
    p1.textContent = `Subred ${numSubred}: `; 
    let sm1 = document.createElement('small');
    sm1.className = ('text-muted');
    sm1.textContent = `${octi[0]}.${octi[1]}.${octi[2]}.${octi[3]}`
    let p2 = document.createElement('p')
    p2.className = ('blockquote');
    p2.textContent = `Primer Host: ${octi[0]}.${octi[1]}.${octi[2]}.${octi[3]+1}`;
    let p3 = document.createElement('p')
    p3.textContent = `Ultimo Host: ${octf[0]}.${octf[1]}.${octf[2]}.${octf[3]}`;
    let p4 = document.createElement('p')
    p4.textContent = `Broadcast: ${octb[0]}.${octb[1]}.${octb[2]}.${octb[3]}`;

    p1.appendChild(sm1);
    divBody.appendChild(p1);
    divBody.appendChild(p2);
    divBody.appendChild(p3);
    divBody.appendChild(p4);
    accordionHeader.appendChild(btnAccordion);
    divCollapse.appendChild(divBody);
    divAccordionitem.appendChild(accordionHeader);
    divAccordionitem.appendChild(divCollapse);
    items.appendChild(divAccordionitem);


    //primeras impresiones de la wea qleada
    console.log("Subred No: "+ numSubred + " ------------------------------");
    console.log("Subred........: "+octi[0]+"."+octi[1]+"."+octi[2]+"."+octi[3]);
    console.log("host primero..: "+octi[0]+"."+octi[1]+"."+octi[2]+"."+(octi[3]+1));
    console.log("host ultimo...: "+octf[0]+"."+octf[1]+"."+octf[2]+"."+octf[3]);
    console.log("Broadcast.....: "+octb[0]+"."+octb[1]+"."+octb[2]+"."+octb[3]);
    contadorItems++;
}

function warnings(e){
    e.preventDefault();
    let textw = '';

    if(document.getElementById("oct1").value > 255 || document.getElementById("oct1").value < 1 || document.getElementById("oct2").value > 255 || document.getElementById("oct2").value < 0 || document.getElementById("oct3").value > 255 || document.getElementById("oct3").value < 0){
        textw = 'Octeto invalido (0 - 255)';
        avientaleLaALarma(textw);
    } else if(document.getElementById("diagonal").value > 31){
        textw = 'el diagonal no puede ser mayor a 31';
        avientaleLaALarma(textw);
    } else if(document.getElementById("oct1").value < 128 && document.getElementById("diagonal").value < 8){
        textw = 'el diagonal no puede ser menor a 8 en un tipo clase A';
        avientaleLaALarma(textw);
    } else if (document.getElementById("oct1").value > 127 && document.getElementById("diagonal").value < 16){
        textw = 'el diagonal no puede ser menor a 16 en un tipo clase B';
        avientaleLaALarma(textw);
    } else if (document.getElementById("oct1").value > 191 && document.getElementById("diagonal").value < 24){
        textw = 'el diagonal no puede ser menor a 24 en un tipo clase C, D & E';
        avientaleLaALarma(textw);
    } else {
        if(!document.getElementById("oct2").value){document.getElementById("oct2").value = 0}
        if(!document.getElementById("oct3").value){document.getElementById("oct3").value = 0}
        if(!document.getElementById("oct4").value){document.getElementById("oct4").value = 0}
        CalcularRed();
    }
}


function warningSubred(e){
    e.preventDefault();
    let textws = '';
    
    if(document.getElementById("inputSubred").value >= (2**subredes) || document.getElementById("inputSubred").value < 0){
        textws = `Subred invalida (0 - ${(2**subredes)-1})`;
        avientaleLaALarma(textws);
    } else {
        if(!document.getElementById("inputSubred").value){document.getElementById("inputSubred").value = 0};
        CalcularSubred();
    }
}

function warningHP(e){
    e.preventDefault();
    let texthp = '';

    if(document.getElementById("inputSubred").value >= (2**subredes) || document.getElementById("inputSubred").value < 0){
        texthp = `Subred invalida (0 - ${(2**subredes)-1})`;
        avientaleLaALarma(texthp);
    } else if(document.getElementById('inputHostP').value >=(2**host) || document.getElementById("inputHostP").value < 0){
        texthp = `Host invalido (0 - ${(2**host)-1})`;
        avientaleLaALarma(texthp);
    } else if(!document.getElementById("inputSubred").value || !document.getElementById("inputHostP").value ){
        texthp = `Campo vacio`;
        avientaleLaALarma(texthp);
    }else{
        calcularHP();
    }   
}


function avientaleLaALarma(text1){
    let w1 = document.createElement('div');
    cont = document.getElementById('Float-alert');
    w1.className = 'alert alert-danger alert-dismissible fade show';
    w1.setAttribute('role','alert')
    let w2 = document.createElement('strong');
    w2.textContent= text1;
    let w3 = document.createElement('button');
    w3.type = 'button';
    w3.className = 'btn-close';
    w3.setAttribute('data-bs-dismiss','alert')
    w3.setAttribute('aria-label','Close')

    w1.appendChild(w2);
    w1.appendChild(w3);
    // war.appendChild(w1);
    cont.appendChild(w1);

    setTimeout(()=>{
        cont.removeChild(w1);
    },4000)
}

function clipboard(copyText){
    navigator.clipboard.writeText(copyText.value);
}