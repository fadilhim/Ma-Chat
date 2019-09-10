import firebase from 'firebase'

class firebaseConfig {
    constructor() {
        var firebaseConfig = {
            apiKey: "AIzaSyBKOp45FtfrhBfFMScN2RU2sDzpnk5nLiI",
            authDomain: "ma-chat-f90bc.firebaseapp.com",
            databaseURL: "https://ma-chat-f90bc.firebaseio.com",
            projectId: "ma-chat-f90bc",
            storageBucket: "",
            messagingSenderId: "923623573065",
            appId: "1:923623573065:web:7d673ef4f9fc47699b6198"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }
}

export default new firebaseConfig()