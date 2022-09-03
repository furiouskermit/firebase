// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyjXADJCKn6se5AqfJufeDNb1l3g6GbDk",
  authDomain: "hyewon-d56d6.firebaseapp.com",
  projectId: "hyewon-d56d6",
  storageBucket: "hyewon-d56d6.appspot.com",
  messagingSenderId: "578350137923",
  appId: "1:578350137923:web:ebd46e6e70f218d6038af6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const currentUl = document.getElementById("test");

const formInput = document.querySelectorAll(".form-input");


function onChange(item) {
  const inputVal = item.value;
  return inputVal;
}

//add data
async function addString() {
  const inputText = document.getElementById("writing");
  const inputName = document.getElementById("name");

  formInput.forEach(item => item.addEventListener("change", onChange));
  const dataText = inputText.value;
  const dataName = inputName.value;

  const dataTime = new Date();
  const dataYear = dataTime.getFullYear()
  const dataMonth = dataTime.getMonth()
  const dataDay = dataTime.getDay()
  const dataHour = dataTime.getHours()
  const dataMin = dataTime.getMinutes()
  const dataSec = dataTime.getSeconds()
  const dataMilSec = dataTime.getMilliseconds()


  const addDb = await addDoc(collection(db, "writings2"), {
    text: dataText,
    name: dataName,
    year: dataYear,
    month: dataMonth,
    day: dataDay,
    hour: dataHour,
    min: dataMin,
    sec: dataSec,
    millisec: dataMilSec
  });
  return addDb;
}

function addElement(item1){
  const newLi = document.createElement("li");
  newLi.classList.add('list-item');
  newLi.setAttribute("id", item1.id)
  newLi.innerHTML = `<strong class='doc-text'>${item1.data().text}</strong><span class='data-name'>${item1.data().name}</span><span class='data-time' data-index><span class='data-year'>${item1.data().year}</span>/<span class='data-month'>${item1.data().month}</span>/<span class='data-day'>${item1.data().day}</span><span class='data-hour'>${item1.data().hour}</span>:<span class='data-min'>${item1.data().min}</span>:<span class='data-sec'>${item1.data().sec}</span><span class='data-millisec'>${item1.data().millisec}</span></span>`

  currentUl.appendChild(newLi)
  document.body.appendChild(currentUl)
}

//read data
async function readString() {
  const readDb = await getDocs(collection(db, "writings2"))
  readDb.forEach((item) => {
    addElement(item);
  })
}

readString()


function onSubmit() {

  event.preventDefault();
  
  //데이터 추가
  addString();

  
  //데이터 db 추가 후 input값 초기화
  formInput.forEach(item => item.value = null);

  currentUl.innerHTML = null;
  
  //데이터 읽기
  readString();

}

document.getElementById("btnSubmit").addEventListener("click", onSubmit);