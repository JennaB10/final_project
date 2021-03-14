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
    let querySnapshot = await db.collection('experiences').get()

    let experiences = querySnapshot.docs
    for (let i=0; i<experiences.length; i++) {
       let experienceId = experiences[i].id
       let experience = experiences[i].data()
       let experienceText = experience.text
       let docRef = await db.collection('selected').doc(`${experienceId}-${user.uid}`).get()
       let selectedQuestion = docRef.data()
       let opacityClass = ''
       if(selectedQuestion) {
         opacityClass = 'opacity-20'
       }
      // renderPost(currenteventsText)

      // docRef = await db.collection('selected').add({
      // text: currenteventText,
      // userId: user.uid     })

       document.querySelector('.experiences').insertAdjacentHTML('beforeend', `
       <div class="experience-${experienceId} ${opacityClass} py-4 text-xl border-b-2 border-purple-500 w-full">
         <a href="#" class="done p-2 text-sm bg-green-500 text-white">✓</a>
         ${experienceText}
       </div> 
     `) //after this line check if opacity needed //maybe we can 
     
     //if statement - check database for currenteventid-userid 
     //if found, then ad opacity (same as 79)

     document.querySelector(`.experience-${experienceId} .done`).addEventListener('click', async function(event) {
       event.preventDefault()
       let lifeElement = document.querySelector(`.experience-${experienceId}`)
       lifeElement.classList.add('opacity-20') //if statement

      //  if (currentElement.classList.contains('opacity-20')) { // the movie is watched, un-watch it
      //   currentElement.classList.remove('opacity-20')
      //   await db.collection('selected').doc(`${currenteventId}`).delete()
      // } else { // the movie is not watched, watch it
      //   currentElement.classList.add('opacity-20')
    
       await db.collection('selected').doc(`${experienceId}-${user.uid}`).set({
        text: experienceText,
        userId: user.uid       
    })
     })
      // document.querySelector('#currentevent').value = ''
     
            // need to add current event text here somehow but the HTML anchor error?
    //instead of set //change to selected?
     // }
      
    }

      // listen for the form submit and create new post

    document.querySelector('form').addEventListener('submit', async function(event) {
      //event.preventDefault()
      let experienceText = document.querySelector('#currentevent').value

    //  if(currenteventText.length > 0){
      
          let docRef = await db.collection('experiences').add({
          text: experienceText,
          userId: user.uid       
      })
      let experienceId = docRef.id
      console.log(`New Icebreaker question with ID ${experienceId} created`)
      
      //renderPost(currenteventsText)
      document.querySelector('.experience').insertAdjacentHTML('beforeend', `
      <div class="experience-${experienceId} ${opacityClass} py-4 text-xl border-b-2 border-purple-500 w-full">
        <a href="#" class="done p-2 text-sm bg-green-500 text-white">✓</a>
        ${experienceText}
      </div>
    `)

    document.querySelector(`.experience-${experienceId} .done`).addEventListener('click', async function(event) {
      event.preventDefault()
      let lifeElement = document.querySelector(`.experience-${experienceId}`)
      lifeElement.classList.add('opacity-20') 
      await db.collection('selected').doc(`${experienceId}-${user.uid}`).set({})
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

async function renderPost(experienceText) {
  document.querySelector('.experiences').insertAdjacentHTML('beforeend', `
    <div class="experience-${experienceText} md:mt-16 mt-8 space-y-8">
 
    `)
 
}
