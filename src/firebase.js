import firebase from 'firebase';
import 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAVfbhgqLWFlYJOhwPu4-ODyOtsKtFOdi8',
  authDomain: 'todos-5164f.firebaseapp.com',
  databaseURL: 'https://todos-5164f.firebaseio.com',
  projectId: 'todos-5164f',
  storageBucket: 'todos-5164f.appspot.com',
  messagingSenderId: '655499072555',
  appId: '1:655499072555:web:32001f646e29ca4a0f866e',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const firestore = firebaseApp.firestore();
//
// firestore.settings({
//   timestampsInSnapshots: true,
// });

export default firestore;
