import './../styles/styles.css';
import { initializeApp } from "firebase/app";
import { deleteObject, getStorage, listAll, ref as storageRef, uploadBytes, list, getDownloadURL } from "firebase/storage";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAGcT0oYRyuEm-VZkGlK6wXA0BD2ftaLEU",
  authDomain: "project-firebase13.firebaseapp.com",
  databaseURL: "https://project-firebase13-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "project-firebase13",
  storageBucket: "project-firebase13.appspot.com",
  messagingSenderId: "1005958775270",
  appId: "1:1005958775270:web:b7d92f6522573c604cd627",
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// const db = getFirestore(app);
const db = getDatabase();

// TASK 01
// const myBtn = document.getElementById("mySendBtn");
// myBtn.addEventListener("click", () => {
//   const myResult = document.getElementById("myResult");

//   const file = document.getElementById("myFileInput").files[0];
//   if (file) {
//     myResult.innerText = "Przesyłam...";
//     const myFileNameInput = document.getElementById("myFileNameInput");
//     const myFileRef = ref(storage, myFileNameInput.value);

//     uploadBytes(myFileRef, file).then((result) => {
//       myResult.innerText = "Przesłano!";

//       getDownloadURL(result.ref).then((url) => {
//         const myImage = document.getElementById("myImage");
//         myImage.src = url;
//       });
//     });
//   } else {
//     myResult.innerText = "Error: Wybierz plik!";
//   }
// });
//TASK 02 
// const storageRef = ref(storage);
// listAll(storageRef).then((res) => {
//   const myList = document.getElementById("myFilesList");
//   res.items.forEach(item => {
//     const listItem = document.createElement("li");
//     listItem.innerText = item.fullPath;
//     myList.appendChild(listItem);
//   });
// });
//TASK 03
// const imageRef = ref(storage, "fotka.jpg");

// deleteObject(imageRef).then(() =>{
// console.log("Plik Usunięto!");
// });

// TASK 04 
//  const storageRef = ref(storage);
//  listAll(storageRef).then((res) => {
  
//   res.items.forEach(item => {
//     const img = document.createElement("img");
//     const div = document.createElement("div");

//     div.classList.add("card");
//     img.classList.add('image');

//     div.appendChild(img);
//     document.body.appendChild(div);

//     getDownloadURL(item).then((url) =>{
//         img.src = url;
//     })
//   });
// });

//TASK 05

// function loadImagesList() {
//  const storageRef = ref(storage);
//  document.body.innerHTML = "";
//  listAll(storageRef).then((res) => {
//    res.items.forEach((item) => {
//      const img = document.createElement("img");
//      const div = document.createElement("div");
//      const deleteBtn = document.createElement("button");
//      deleteBtn.innerText = "Delete";
//      deleteBtn.dataset.imageName = item.fullPath;

//      deleteBtn.addEventListener("click", (event) =>{
//        const imageRef = ref(storage, event.target.dataset.imageName);
//        deleteObject(imageRef).then(() =>{
//            loadImagesList();
//        });
//      });

//      div.classList.add("card");
//      img.classList.add("image");


//      div.appendChild(img);
//      div.appendChild(deleteBtn);
//      document.body.appendChild(div);

//      getDownloadURL(item).then((url) => {
//        img.src = url;
//      });
//    });
//  });
// }

// loadImagesList()

//FIRESTORE(add)


// const usersCollection = collection(db, "users");
// addDoc(usersCollection, {
//     Name: "Juri",
//     Surname: "Lozenko"
// });
//AKTUALIZACJA 
// const myDoc = doc(db, "users", "NowyUserId" )
// getDoc(myDoc).then((respData) => {
//     console.log(respData.data());
// });

//TASK  Database (Firestore)

// const myName = document.getElementById("myName");
// const mySurname = document.getElementById("mySurname");
// const myAge = document.getElementById("myAge");
// const myBtn = document.getElementById("myBtn");
// const myUsersList = document.getElementById("myUsersList");

// const usersCollection = collection(db, "users");
// getDocs(usersCollection).then((docs) => {
//   docs.forEach((userDoc) => {
//     const user = userDoc.data();
//     const listItem = document.createElement("li");
//     const editBtn = document.createElement("button");
//     editBtn.innerText = "Edit";

//     editBtn.addEventListener("click", () => {
//         myName.value = user.Name;
//         mySurname.value = user.Surname;
//         myAge.value = user.Age;
//         myBtn.dataset.userId = userDoc.id;
//     });

//     listItem.innerText = `${user.Name} ${user.Surname}`;
//     listItem.appendChild(editBtn);
//     myUsersList.appendChild(listItem);
//   });
// });

// myBtn.addEventListener("click", (event) => {
//     const myDoc = doc(db, "users", event.target.dataset.userId);
//     updateDoc(myDoc, {
//         Name: myName.value,
//         Surname: mySurname.value,
//         Age: parseInt(myAge.value)
//     })   
// });

// TASK QUERY

// const myName = document.getElementById("myName");
// const myBtn = document.getElementById("myBtn");
// const myUsersList = document.getElementById("myUsersList");

// myBtn.addEventListener("click", () => {
//   const usersCollection = collection(db, "users");
//   const myQuery = query(usersCollection, where("Name", "==", myName.value));
//   getDocs(myQuery).then((docs) => {
//     myUsersList.innerHTML = "";
//     docs.forEach((userDoc) => {
//       const user = userDoc.data();
//       const listItem = document.createElement("li");
//       listItem.innerText = `${user.Name} ${user.Surname}`;
//       myUsersList.appendChild(listItem);
//     });
//   });
// });

// TASK ACTUAL. and DELETE (FIRESTORE)

// const childrenList = document.getElementById("childrenList");
// const childNameInput = document.getElementById("childName");
// const addChildBtn = document.getElementById("addChildBtn");
// const janKowalskiDoc = doc(db, "users", "JanKowalskiId");

// onSnapshot(janKowalskiDoc, (docRes) => {
//     childrenList.innerHTML = "";
//         const janek = docRes.data();
//         janek.Dzieci.forEach(dziecko => {
//             const itemDziecko = document.createElement("li");
//             itemDziecko.innerText = dziecko;
//             childrenList.appendChild(itemDziecko);
//             //TUTAJ DODAJ PRZYCISK DELETE
//             // + EVENT LISTENER NA CLICK
//         });
//     });
// addChildBtn.addEventListener("click", () => {
//     updateDoc(janKowalskiDoc, {
//         Dzieci: arrayUnion(childNameInput.value)
//     });
// });

// REALTIME DATABASE
const userName = document.getElementById("userName");
const userSurname = document.getElementById("userSurname");
const addUserBtn = document.getElementById("addUserBtn");
const usersRef = ref(db, "users");

addUserBtn.addEventListener("click", () => {
    const userRef = push(usersRef);
set(userRef, {
  name: userName.value,
  surname: userSurname.value,
   });
});

onValue(usersRef, (snapshot) => {
    snapshot.forEach(user => {
        console.log(user.key);
    });
});
