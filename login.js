firebase.auth().onAuthStateChanged(async function(user) {

  let db = firebase.firestore()

  if (user) {
    // Signed in
    console.log('signed in')
   
           // Create a sign-out button
        document.querySelector('.sign-in-or-sign-out').innerHTML = `
        <button class="text-pink-500 underline sign-out">Sign Out</button>
      `
        document.querySelector('.sign-out').addEventListener('click', function(event) {
        console.log('sign out clicked')
        event.preventDefault
        firebase.auth().signOut()
        document.location.href = 'login.html'
      })

      
  } else {
    // Signed out
    console.log('signed out')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'categories.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})


