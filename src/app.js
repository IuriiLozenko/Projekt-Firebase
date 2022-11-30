import './../styles/styles.css';
import { initializeApp } from "firebase/app";
import { deleteObject, getStorage, listAll, ref as storageRef, uploadBytes, list, getDownloadURL } from "firebase/storage";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { getDatabase, onChildAdded, onValue, push, ref, remove, set } from "firebase/database";
import { getAuth, EmailAuthProvider, onAuthStateChanged, signOut, updateProfile, GoogleAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";

const firebaseConfig = {
  apiKey: "AIzaSyAGcT0oYRyuEm-VZkGlK6wXA0BD2ftaLEU",
  authDomain: "project-firebase13.firebaseapp.com",
  databaseURL: "https://project-firebase13-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "project-firebase13",
  storageBucket: "project-firebase13.appspot.com",
  messagingSenderId: "1005958775270",
  appId: "1:1005958775270:web:b7d92f6522573c604cd627",
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
// const db = getDatabase();

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
// const userName = document.getElementById("userName");
// const userSurname = document.getElementById("userSurname");
// const addUserBtn = document.getElementById("addUserBtn");
// const usersRef = ref(db, "users");
// const usersList = document.getElementById("usersList");

// addUserBtn.addEventListener("click", () => {
//     const userRef = push(usersRef);
// set(userRef, {
//   name: userName.value,
//   surname: userSurname.value,
//    });
// });

// onValue(usersRef, (snapshot) => {
//   usersList.innerHTML = "";
//   snapshot.forEach((userSnapshot) => {
//     const user = userSnapshot.val();
//     const listItem = document.createElement("li");
//     listItem.innerText = `${user.name} ${user.surname}`;

//     const removeBtn = document.createElement("button");
//     removeBtn.innerText = "Remove";
//     removeBtn.addEventListener("click", () => {
//         remove(userSnapshot.ref);
//     });
//     listItem.appendChild(removeBtn);

//     usersList.appendChild(listItem);
//   });
// });

// TASK 03 REALTIME DATABASE

// const fakeDoc = document.getElementById("fakeDoc");
// const docRef = ref(db, "doc");
// fakeDoc.addEventListener("input", () => {
//     set(docRef, {
//         text: fakeDoc.value
//     });
// });

// onValue(docRef, (snapshot) => {
//     const docObj = snapshot.val();
//     if(fakeDoc.value !== docObj.text){
//         fakeDoc.value = docObj.text;
//     }
// });

//TASK REALTIME DATABASE

// const usernameInput = document.getElementById("username");
// const usercolorInput = document.getElementById("usercolor");
// const adduserBtn = document.getElementById("adduser");
// const userSelect = document.getElementById("userselect");
// const selectedUserHeader = document.getElementById("selecteduser");
// const messageInput = document.getElementById("message");
// const sendMessageBtn = document.getElementById("sendmessage");
// const messagesDiv = document.getElementById("messages");
// let selectedUser = {};
// const messagesRef = ref(db, "messages");

// onChildAdded(messagesRef, (messageSnapshot) => {
//   const message = messageSnapshot.val();

//   const messageDiv = document.createElement("div");
//   const textSpan = document.createElement("span");
//   const authorSpan = document.createElement("span");
//   const dateSpan = document.createElement("span");

//   textSpan.innerText = message.text;
//   authorSpan.innerText = message.createdBy;
//   dateSpan.innerText = message.createdAt;

//   messageDiv.appendChild(textSpan);
//   messageDiv.appendChild(authorSpan);
//   messageDiv.appendChild(dateSpan);
//   messageDiv.style.backgroundColor = message.color;
//   messageDiv.classList.add("message");

//   messagesDiv.appendChild(messageDiv);
// });

// sendMessageBtn.addEventListener("click", () => {
//   const message = {
//     text: messageInput.value,
//     createdAt: new Date().toISOString(),
//     createdBy: selectedUser.username,
//     color: selectedUser.color,
//   };

//   const messageRef = push(messagesRef);
//   set(messageRef, message);
// });

// adduserBtn.addEventListener("click", () => {
//   const userRef = ref(db, `users/${usernameInput.value}`);
//   set(userRef, {
//     color: usercolorInput.value,
//   });
// });

// userSelect.addEventListener("change", () => {
//   selectedUser = {
//     username: userSelect.value,
//     color: userSelect.selectedOptions[0].dataset.color,
//   };
//   selectedUserHeader.innerText = userSelect.value;
//   selectedUserHeader.style.color = userSelect.selectedOptions[0].dataset.color;
// });

// const usersRef = ref(db, "users");
// onValue(usersRef, (snapshot) => {
//   userSelect.innerHTML = "";
//   const emptyOption = document.createElement("option");
//   userSelect.appendChild(emptyOption);

//   snapshot.forEach((userSnapshot) => {
//     const user = userSnapshot.val();
//     const option = document.createElement("option");
//     option.innerText = userSnapshot.key;
//     option.dataset.color = user.color;
//     userSelect.appendChild(option);
//   });
// });

//Authentication.

const auth = getAuth(app);


const loginHeader = document.getElementById("loginHeader");
const buttonSignOut = document.getElementById("signOutButton");
const profilePhotoInput = document.getElementById("profilePhotoInput");
const sendPhotoBtn = document.getElementById("sendPhoto");
const photoProfileImg = document.getElementById("profilePhoto");
const addressInput = document.getElementById("address");
const motherNameInput = document.getElementById("motherName");
const salary = document.getElementById("salary");
const phoneNumber = document.getElementById("phoneNumber");
const updateBtn = document.getElementById("updateBtn");

buttonSignOut.addEventListener("click", () => {
    signOut(auth);
});

updateBtn.addEventListener("click", () => {
  const docRef = doc(db, `users/${auth.currentUser.uid}`);
  setDoc(docRef, {
    address: addressInput.value,
    motherName: motherNameInput.value,
    salary: salary.value,
    phoneNumber: phoneNumber.value,
  });
});


sendPhotoBtn.addEventListener("click", async () => {
  const file = profilePhotoInput.files[0];
  const fileRef = storageRef(storage, `${auth.currentUser.uid}/${file.name}`);
  const _ = await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  updateProfile(auth.currentUser, {
    photoURL: url,
  });
});


onAuthStateChanged(auth, (user) => {
    if (user) {
        loginHeader.innerText = `Witaj ${user.displayName}!`;
        photoProfileImg.src = user.photoURL;
        buttonSignOut.classList.remove("hidden");
        profilePhotoInput.classList.remove("hidden");
        sendPhotoBtn.classList.remove("hidden");
        photoProfileImg.classList.remove("hidden");
    }
    else {
        loginHeader.innerText = "Zaloguj się! Dziadu!";
        buttonSignOut.classList.add("hidden");
        profilePhotoInput.classList.remove("hidden");
        sendPhotoBtn.classList.remove("hidden");
        photoProfileImg.classList.remove("hidden");

        const ui = new firebaseui.auth.AuthUI(auth);
        ui.start('#firebaseui-auth-container', {
            callbacks: {
                signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                    console.log(authResult);
                    console.log(redirectUrl);
                }
            },
            signInOptions: [
                EmailAuthProvider.PROVIDER_ID,
                GoogleAuthProvider.PROVIDER_ID,
            ],
            signInSuccessUrl: "http://localhost:8080/"
        });
    };
});
