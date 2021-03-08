firebase.auth().onAuthStateChanged(async function(user) {

  let db = firebase.firestore()

  if (user) {
    // Signed in
    console.log('signed in')

    
    db.collection('users').doc(user.uid).set({ 
      name: user.displayName,
      email: user.email
    })

        // Create a sign-out button
        document.querySelector('.sign-in-or-sign-out').innerHTML = `
        <button class="text-pink-500 underline sign-out">Sign Out</button>
      `
        document.querySelector('.sign-out').addEventListener('click', function(event) {
        console.log('sign out clicked')
        firebase.auth().signOut()
        document.location.href = 'index.html'
      })

      // listen for the form submit and create new post

    document.querySelector('form').addEventListener('submit', async function(event) {
      event.preventDefault()
      let currenteventsText = document.querySelector('#currentevents').value
      let docRef = await db.collection('currentevents').add({
          text: currenteventsText
      })
      let currenteventsId = docRef.id
      console.log(`New Icebreaker question with ID ${currenteventsId} created`)
      renderPost(currenteventsText)
    })
        
    //Render all questions when the page is loaded
    let querySnapshot = await db.collection('currentevents').get()
    let currentevents = querySnapshot.docs
    for (let i=0; i<currentevents.length; i++) {
      // let currenteventsId = currentevents[i].id
      // let currenteventsData = currentevents[i].data()
       let currenteventsText = currentevents.text
       renderPost(currenteventsText)
    }
   
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
      signInSuccessUrl: 'index.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})

async function renderPost(currenteventsText) {
  document.querySelector('.currentevents').insertAdjacentHTML('beforeend', `
    <div class="post-${currenteventsText} md:mt-16 mt-8 space-y-8">
 
    `)
 
}
