(function() {
  // Initialize Firebase
  var config = {
    apiKey: masterFirebaseConfig.apiKey,
    authDomain: masterFirebaseConfig.authDomain,
    databaseURL: masterFirebaseConfig.databaseURL,
    projectId: masterFirebaseConfig.projectId,
    storageBucket: masterFirebaseConfig.storageBucket,
    messagingSenderId: masterFirebaseConfig.messagingSenderId
  };

  firebase.initializeApp(config);

  // get elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogIn = document.getElementById('btnLogIn');
  const btnLogOut = document.getElementById('btnLogOut');
  const btnSignUp = document.getElementById('btnSignUp');

  // add login event
  btnLogIn.addEventListener('click', e => {
    // get email and password
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();

    // log in
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
  });

  // add sign up event
  btnSignUp.addEventListener('click', e => {
    // get email and password
    // TODO: Check for real email
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();

    // log in
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
  });

  // sign out
  btnLogOut.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  // add realtime authentication listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    // if user is loged in
    if(firebaseUser) {
      console.log(firebaseUser);
      // show logout button and update greeting
      btnLogOut.classList.remove('hide');
      document.getElementById('greeting').innerText = `Welcome ${firebaseUser.email}`;
      // else user is null
    } else {
      console.log("Not logged in...");
      // hide logout button and update greeting
      btnLogOut.classList.add('hide');
      document.getElementById('greeting').innerText = `no user logged in`;
    }
  });



}());
