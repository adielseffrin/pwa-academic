const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");


window.addEventListener('load', () => {
    const base = document.querySelector('base');
    let baseUrl = base && base.href || '';
    if (!baseUrl.endsWith('/')) {
      baseUrl = `${baseUrl}/`;
    }  
  
  
    if('serviceWorker' in navigator){
     navigator.serviceWorker
     .register(`${baseUrl}serviceWorker.js`)
     .then(reg => {})
     .catch (err => { console.log('😥 Service worker registration failed: ', err); });
    }
  });

  const container = document.querySelector(".container");
  /* Firebase variables */
  var db = firebase.firestore();


  /* Methods for home page */
  const inicioContent = [
      {name: "Inicio", image: "images/coffee1.jpg", content: "esse é o inicio"},
      {name: "Inicio", image: "images/coffee1.jpg", content: "esse é o inicio"},
      
  ]

const showInicio = () => {
    container.innerHTML = cardMaker(inicioContent)
}

/* Methods for presence control */

const chamadaContent = [
    {name: "11/05/2021", image: "images/coffee1.jpg", content: "Chamada de Cálculo"},
    {name: "12/05/2021", image: "images/coffee1.jpg", content: "Chamada de Álgebra"},
    {name: "13/05/2021", image: "images/coffee1.jpg", content: "Chamada de Estatística"},
    
]

const showChamada = () => {
  db.collection("schedule").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});
  container.innerHTML = cardMaker(chamadaContent)
}

/* Methods for schedule */

const scheduleContent = [
    {data: "11/05/2021", content: "Limites"},
    {data: "12/05/2021", content: "Derivadas"},
    {data: "13/05/2021", content: "Regras de derivação"},
    {data: "14/05/2021", content: "Regras da cadeia"},
    {data: "15/05/2021", content: "Derivadas parciais"},
    
]

const showSchedule = () => {
  container.innerHTML = tableMaker(scheduleContent)
}

/* General purpose methods */

const tableMaker = (details) => {
  let output = ''
  console.log(details.length);
  if(details.length > 0){
    output = '<table class="schedule-table">'    
    output += '<tr><th>Data</th><th>Assunto</th></tr>';
  
    details.forEach(
      ({data, content}) => 
      (output += `
      <tr class="row">
        <td class="schedule-data">${data}</td>
        <td class="schedule-data">${content}</td>
      </tr>
      `)
    )
    output += '</table>'
  }else{
    output = 'Sem dados cadastrados';
  }
  return output;
}

const cardMaker = (details) => {
    let output =""
    details.forEach(
    ({name, image, content}) => 
    (output += `
    <div class="card">
        <img class="card--avatar" src=${image} />
        <h1 class="card--title">${name}</h1>
        <div class="card--content">${content}</div>
        <a class="card--link" href="#">Taste</a>
    </div>
    `)
    )
    return output;
}

/* Listeners */

document.addEventListener("DOMContentLoaded", showInicio)
document.querySelector('#inicioNav').addEventListener('click',showInicio)
document.querySelector('#chamadaNav').addEventListener('click',showChamada)
document.querySelector('#cronogramaNav').addEventListener('click',showSchedule)
