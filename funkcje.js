function pokazDane()
{
    dane="Następujące dane zostaną wysłane:\n";
    dane+="Imię:"+document.getElementById('imie').value+"\n";
    dane+="Nazwisko:"+document.getElementById('nazwisko').value+"\n";
    dane+="Email:"+document.getElementById('email').value+"\n";
    dane+="Temat:"+document.getElementById('temat').value+"\n";
    dane+="\nWiadomość: "+document.getElementById('tekst').value+"\n";
    
    if (window.confirm(dane)) return true;
    else return false;
    
}

function sprawdzEmail()
{ var el=document.getElementById('email');
var rg=new RegExp("^[a-zA-Z0-9_.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$");
str=el.value;
if ( rg.test(str) );
else alert("niepoprawny e-mail");
}


//KOSZYK


function zapisz(nazwa,cena){
    
    var lista= JSON.parse(localStorage.getItem('lista'));
    var czyjest=0;
    if(lista !== null)
    {for(var i=0;i<(lista.length);i++)
        { if(lista[i].nazwaValue === nazwa) {
                lista[i].liczbaValue= lista[i].liczbaValue + 1;
                czyjest = czyjest + 1; }
        }

    }
    if(czyjest === 0)
    { var item={};
    item.nazwaValue=nazwa;
    item.cenaValue=cena;
    item.liczbaValue=1;
     
    }
   
       if(lista===null) 
       {lista=[];} 
    
    if(czyjest === 0)
    { lista.push(item);}
    
       localStorage.setItem('lista', JSON.stringify(lista));
   
}

 
function wyswietl(){
   
    if(localStorage.length>0)
    {
        document.getElementById('table').innerHTML="<tr><th>Nazwa produktu</th><th>Cena</th><th rowspan="+"2"+">Ilość</th></tr>";
     
        var lista=JSON.parse(localStorage.getItem('lista'));
        for(var i=0;i<(lista.length);i++)
        {
        document.getElementById('table').innerHTML+="<tr><td>"+lista[i].nazwaValue+"</td>"+"<td>"+lista[i].cenaValue+"</td>"+"<td>"+lista[i].liczbaValue+ "</td><td>" + '<input type="text" id="ilosc'+i+'" size="1">'  + '<button type="button" onclick="zmianaliczby('+i+')">zmień</button>' + "</td>" +"<td>" + '<button type="button" onclick="usun('+i+')">X</button>' +  "</td></tr>";
        };
    }
    else alert("Koszyk jest pusty");
    
}
 
function czysc(){
    localStorage.clear();
    document.getElementById('table').innerHTML="";
}
function usun(numer)
{      
    
    var klucz= numer+1;
    var lista=JSON.parse(localStorage.getItem('lista'));
  if(lista.length === 1) czysc();
    else { lista.splice((klucz-1),1);
    localStorage.setItem('lista', JSON.stringify(lista));
}
    wyswietl();
  
 
}

function zamow()
{
    
 var lista=JSON.parse(localStorage.getItem('lista'));
    
    daneZamowienia="Zamówienie:\n\n";

for(var i=0;i<(lista.length);i++)
        {
        daneZamowienia+= lista[i].nazwaValue + " sztuk: " + lista[i].liczbaValue + "\n";
        };
        daneZamowienia+= "\nzostanie złożone.\n";
  if (window.confirm(daneZamowienia)) czysc() ;
 
 
}

function zmianaliczby(i)
{

    var lista=JSON.parse(localStorage.getItem('lista'));

        lista[i].liczbaValue = document.getElementById("ilosc"+i+"").value;
 
        localStorage.setItem('lista', JSON.stringify(lista));
        wyswietl();
       
    
}