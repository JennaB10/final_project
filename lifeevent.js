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
//Render all questions when the page is loaded
let querySnapshot = await db.collection('events').get()
let events = querySnapshot.docs

for (let i=0; i<events.length; i++) {
   let eventId = events[i].id
   let event = events[i].data()
   let eventText = event.text
   let docRef = await db.collection('selected').doc(`${eventId}-${user.uid}`).get()
   let selectedQuestion = docRef.data()
   let opacityClass = ''
   if(selectedQuestion) {
     opacityClass = 'opacity-20'
   }
 
   // renderPost(eventsText)
   document.querySelector('.events').insertAdjacentHTML('beforeend', `
   <div class="event-${eventId} ${opacityClass}  py-4 text-xl border-b-2 border-purple-500 w-full">
     <a href="#" class="done p-2 text-sm bg-green-500 text-white">✓</a>
     ${eventText}
   </div>
 `)

 //if statement - check database for currenteventid-userid 
 //if found, then ad opacity (same as 79)
 document.querySelector(`.event-${eventId} .done`).addEventListener('click', async function(event) {
   event.preventDefault()
   let lifeElement = document.querySelector(`.event-${eventId}`)
   lifeElement.classList.add('opacity-20')

   await db.collection('selected').doc(`${eventId}-${user.uid}`).set({ 
    text: eventText,
    userId: user.uid })
 })
}


      // listen for the form submit and create new post
    document.querySelector('form').addEventListener('submit', async function(event) {
    //  event.preventDefault()
      let eventText = document.querySelector('#event').value
          let docRef = await db.collection('events').add({
          text: eventText,
          userId: user.uid       
      })

      let eventId = docRef.id
      console.log(`New Icebreaker question with ID ${eventId} created`)
      //renderPost(eventsText)
      document.querySelector('.events').insertAdjacentHTML('beforeend', `
      <div class="event-${eventId} ${opacityClass} py-4 text-xl border-b-2 border-purple-500 w-full">
        <a href="#" class="done p-2 text-sm bg-green-500 text-white">✓</a>
        ${heventText}
      </div>
    `)
    document.querySelector(`.event-${eventId} .done`).addEventListener('click', async function(event) {
      event.preventDefault()
     let lifeElement = document.querySelector(`.event-${eventId}`)
     lifeElement.classList.add('opacity-20')
      await db.collection('selected').doc(`${eventId}-${user.uid}`).set({})
    })
    // document.querySelector('#event').value = ''
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
      signInSuccessUrl: 'home.html'
    }
    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})
async function renderPost(eventText) {
  document.querySelector('.events').insertAdjacentHTML('beforeend', `
    <div class="event-${eventText} md:mt-16 mt-8 space-y-8">
    `)
}











