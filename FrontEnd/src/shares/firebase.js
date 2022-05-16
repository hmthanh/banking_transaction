// import firebase from "firebase";
// const config = {
//     apiKey: "XXXXXXXkZO0xs4tik5CUdmAkb5KvSfnXU",
//     authDomain: "XXXXX.firebaseapp.com",
//     databaseURL: "https://XXXX.firebaseio.com",
//     projectId: "tXXX",
//     storageBucket: "XXXXX.appspot.com",
//     messagingSenderId: "749186653813",
//     appId: "1:XXXXX:web:d54a829d6d89b656abe23c",
//     measurementId: "GXXXJ"
// };
// if (!firebase.apps.length) {
//     firebase.initializeApp(config);
// }
// // Tham chiếu tới cơ sở dữ liệu
// export const realtimeDB = firebase.database();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, onValue, ref } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyALwORDyjI9RIOZK-aqfm6Jg5dxS84UV_o",
    authDomain: "banking-transaction-29880.firebaseapp.com",
    databaseURL: "https://banking-transaction-29880-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "banking-transaction-29880",
    storageBucket: "banking-transaction-29880.appspot.com",
    messagingSenderId: "794076476766",
    appId: "1:794076476766:web:e93c45bd04a64094ef0bcf",
    measurementId: "G-K09126BCFZ"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const firebaseDB = getDatabase(app);
// const realtimeDB = firebaseDB.ref("restricted_access/secret_document");
// realtimeDB.once("value", function (snapshot) {
//     console.log("snapshot : ", snapshot.val());
// });


const starCountRef = ref(firebaseDB, 'restricted_access/secret_document');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
//   updateStarCount(postElement, data);
});
export default firebaseDB;
