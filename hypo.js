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
        event.preventDefault
        firebase.auth().signOut()
        document.location.href = 'login.html'
      })
      // 
      // listen for the form submit and create new post
    document.querySelector('form').addEventListener('submit', async function(event) {
      event.preventDefault()
      let hypotheticaleventText = document.querySelector('#hypotheticalevent').value
          let docRef = await db.collection('hypothetical').add({
          text: hypotheticaleventText,
          userId: user.uid       
      })

      let hypotheticaleventId = docRef.id
      console.log(`New Icebreaker question with ID ${hypotheticaleventId} created`)
      //renderPost(hypotheticaleventsText)
      document.querySelector('.hypotheticalevents').insertAdjacentHTML('beforeend', `
      <div class="hypotheticalevent-${hypotheticaleventId} py-4 text-xl border-b-2 border-purple-500 w-full">
        <a href="#" class="done p-2 text-sm bg-green-500 text-white">✓</a>
        ${hypotheticaleventText}
      </div>
    `)
    document.querySelector(`.hypotheticalevent-${hypotheticaleventId} .done`).addEventListener('click', async function(event) {
      event.preventDefault()
      document.querySelector(`.hypotheticalevent-${hypotheticaleventId}`).classList.add('opacity-20')
      await db.collection('hypotheticalevent').doc(`${hypotheticaleventId}-${user.uid}`).set({})
    })
    document.querySelector('#hypotheticalevent').value = ''
    })
    //Render all questions when the page is loaded
    let querySnapshot = await db.collection('hypotheticalevents').where('userId', '==', user.uid).get()
    let hypotheticalevents = querySnapshot.docs
    for (let i=0; i<hypotheticalevents.length; i++) {
       let hypotheticaleventId = hypotheticalevents[i].id
       let hypotheticalevent = hypotheticalevents[i].data()
       let hypotheticaleventText = hypotheticalevent.text
      // renderPost(hypotheticaleventsText)
       document.querySelector('.hypotheticalevents').insertAdjacentHTML('beforeend', `
       <div class="hypotheticalevent-${hypotheticaleventId} py-4 text-xl border-b-2 border-purple-500 w-full">
         <a href="#" class="done p-2 text-sm bg-green-500 text-white">✓</a>
         ${hypotheticaleventText}
       </div>
     `)//after this line check if opacity needed
     //if statement - check database for currenteventid-userid 
     //if found, then ad opacity (same as 79)
     document.querySelector(`.hypotheticalevent-${hypotheticaleventId} .done`).addEventListener('click', async function(event) {
       event.preventDefault()
       document.querySelector(`.hypotheticalevent-${hypotheticaleventId}`).classList.add('opacity-20')
       await db.collection('selected').doc(`${hypotheticaleventId}-${user.uid}`).set({})
     })
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
      signInSuccessUrl: 'home.html'
    }
    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})
async function renderPost(hypotheticaleventText) {
  document.querySelector('.hypotheticalevents').insertAdjacentHTML('beforeend', `
    <div class="hypotheticalevent-${hypotheticaleventText} md:mt-16 mt-8 space-y-8">
    `)
}