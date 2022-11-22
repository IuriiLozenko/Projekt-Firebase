import './../styles/styles.css';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGcT0oYRyuEm-VZkGlK6wXA0BD2ftaLEU",
  authDomain: "project-firebase13.firebaseapp.com",
  projectId: "project-firebase13",
  storageBucket: "project-firebase13.appspot.com",
  messagingSenderId: "1005958775270",
  appId: "1:1005958775270:web:b7d92f6522573c604cd627"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const myBtn = document.getElementById("mySendBtn");
myBtn.addEventListener("click", () => {
  const myResult = document.getElementById("myResult");

  const file = document.getElementById("myFileInput").files[0];
  if (file) {
    myResult.innerText = "Przesyłam...";
    const myFileNameInput = document.getElementById("myFileNameInput");
    const myFileRef = ref(storage, myFileNameInput.value);

    uploadBytes(myFileRef, file).then((result) => {
      myResult.innerText = "Przesłano!";

      getDownloadURL(result.ref).then((url) => {
        const myImage = document.getElementById("myImage");
        myImage.src = url;
      });
    });
  } else {
    myResult.innerText = "Error: Wybierz plik!";
  }
});

const storageRef = ref(storage);
listAll(storageRef).then((res) => {
  const myList = document.getElementById("myFilesList");
  res.items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerText = item.fullPath;
    myList.appendChild(listItem);
  });
});