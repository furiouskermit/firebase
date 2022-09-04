 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
 import { getFirestore, collection, Timestamp, FieldValue, addDoc, setDoc, getDocs, doc, query, where, onSnapshot, orderBy } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
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

 // Initialize Firebase
 const init = initializeApp(firebaseConfig);
 const db = getFirestore(init);

 const currentUl = document.querySelector("#test");
 const formInput = document.querySelectorAll(".form-input");


 function onChange(item) {
   const inputVal = item.value;
   return inputVal;
 }

 formInput.forEach(item => item.addEventListener("change", onChange));

 const dataCol = collection(db, 'board');
 const dataDoc = doc(dataCol);

 //add
 async function addData() {
   const inputName = document.getElementById("name").value;
   const inputText = document.getElementById("writing").value;
   const newDate = new Date();
   const data = {
     name: inputName,
     text: inputText,
     timeStamp: Timestamp.fromDate(newDate),
     year: newDate.getFullYear(),
     month: String(newDate.getMonth() + 1).padStart(2, "0"),
     day: String(newDate.getDate()).padStart(2, "0"),
     hour: String(newDate.getHours()).padStart(2, "0"),
     min: String(newDate.getMinutes()).padStart(2, "0"),
     boolean: true
   }
   const setData = await addDoc(dataCol, data);
   return setData;
 }

 /* read */
 function addElement(item1){
   const newLi = document.createElement("li");
   newLi.classList.add("list-item");
   newLi.setAttribute("data-id", item1.id);
newLi.innerHTML = `<span class='data-name'>${item1.data().name}</span><span class='data-time'>${item1.data().year}/${item1.data().month}/${item1.data().day} ${item1.data().hour}:${item1.data().min}</span><span class='data-text'><pre>${item1.data().text}</pre></span>`
   currentUl.appendChild(newLi)
 }

 //read
 async function getData() {
   const order = query(dataCol, orderBy("timeStamp", "desc"))
   const loadData = await getDocs(order);
   loadData.forEach((item) => {
     addElement(item)
   })
 }
 getData()

 //submit
 function onSubmit() {
   event.preventDefault();

   //add data
   addData().then(() => console.log('gg'))

   //데이터 db 추가 후 input값 초기화
   formInput.forEach(item => item.value = null);

   currentUl.innerHTML = null
   getData()
   
 }

 document.getElementById("btnSubmit").addEventListener("click", onSubmit);