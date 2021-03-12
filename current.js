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
    let querySnapshot = await db.collection('currentevents').get()

    let currentevents = querySnapshot.docs
    for (let i=0; i<currentevents.length; i++) {
       let currenteventId = currentevents[i].id
       let currentevent = currentevents[i].data()
       let currenteventText = currentevent.text
       let docRef = await db.collection('selected').doc(`${currenteventId}-${user.uid}`)
       
       let selectedQuestion = docRef.data()
       let opacityClass = ''
       if(selectedQuestion) {
         opacityClass = 'opacity-20'
       }
      // renderPost(currenteventsText)

      // it's something like this put this isn't quite right because it's pulling it many times -->
      
     // docRef = await db.collection('selected').add({
     //   text: currenteventText,
     //   userId: user.uid     })

       document.querySelector('.currentevents').insertAdjacentHTML('beforeend', `
       <div class="currentevent-${currenteventId} ${opacityClass} py-4 text-xl border-b-2 border-purple-500 w-full">
         <a href="#" class="done p-2 text-sm bg-green-500 text-white">✓</a>
         ${currenteventText}
       </div>
     `) //after this line check if opacity needed
     
     //if statement - check database for currenteventid-userid 
     //if found, then ad opacity (same as 79)

     document.querySelector(`.currentevent-${currenteventId} .done`).addEventListener('click', async function(event) {
       event.preventDefault()
       let currentElement = document.querySelector(`.currentevent-${currenteventId}`)
       currentElement.classList.add('opacity-20') //if statement

      //  if (currentElement.classList.contains('opacity-20')) { // the movie is watched, un-watch it
      //   currentElement.classList.remove('opacity-20')
      //   await db.collection('selected').doc(`${currenteventId}`).delete()
      // } else { // the movie is not watched, watch it
      //   currentElement.classList.add('opacity-20')
    
       await db.collection('selected').doc(`${currenteventId}-${user.uid}`).set({})  // need to add current event text here somehow but the HTML anchor error?
     //instead of set //change to selected?
     // }
      })
    }


      // listen for the form submit and create new post

    document.querySelector('form').addEventListener('submit', async function(event) {
      //event.preventDefault()
      let currenteventText = document.querySelector('#currentevent').value

    //  if(currenteventText.length > 0){
      
          let docRef = await db.collection('currentevents').add({
          text: currenteventText,
          userId: user.uid       
      })
      let currenteventId = docRef.id
      console.log(`New Icebreaker question with ID ${currenteventId} created`)
      
      //renderPost(currenteventsText)
      document.querySelector('.currentevents').insertAdjacentHTML('beforeend', `
      <div class="currentevent-${currenteventId} ${opacityClass} py-4 text-xl border-b-2 border-purple-500 w-full">
        <a href="#" class="done p-2 text-sm bg-green-500 text-white">✓</a>
        ${currenteventText}
      </div>
    `)

    document.querySelector(`.currentevent-${currenteventId} .done`).addEventListener('click', async function(event) {
      event.preventDefault()
      let currentElement = document.querySelector(`.currentevent-${currenteventId}`)
      currentElement.classList.add('opacity-20') 
      await db.collection('selected').doc(`${currenteventId}-${user.uid}`).set({})
    //doc combination current id-yourid

      // document.querySelector(`.post-${postId} .like-button`).addEventListener('click', async function(event) {
      //   event.preventDefault()
      //   console.log(`post ${postId} like button clicked!`)
      //   let existingNumberOfLikes = document.querySelector(`.post-${postId} .likes`).innerHTML
      //   let newNumberOfLikes = parseInt(existingNumberOfLikes) + 1
      //   document.querySelector(`.post-${postId} .likes`).innerHTML = newNumberOfLikes
      //   await db.collection('posts').doc(postId).update({
      //     likes: firebase.firestore.FieldValue.increment(1)



    }) 
   // document.querySelector('#currentevent').value = ''
 // }
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

async function renderPost(currenteventText) {
  document.querySelector('.currentevents').insertAdjacentHTML('beforeend', `
    <div class="currentevent-${currenteventText} md:mt-16 mt-8 space-y-8">
 
    `)
 
}
