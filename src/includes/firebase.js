import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCtq4ODgw8KwOWM_n-v2VWi6r4oleakj6A',
  authDomain: 'music-39e7b.firebaseapp.com',
  projectId: 'music-39e7b',
  storageBucket: 'music-39e7b.appspot.com',
  appId: '1:476605611371:web:d0811da04d212834ed602e',
};

export default firebase.initializeApp(firebaseConfig);