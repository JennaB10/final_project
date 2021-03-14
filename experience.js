firebase.auth().onAuthStateChanged(async function (user) {

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
    document.querySelector('.sign-out').addEventListener('click', function (event) {
      console.log('sign out clicked')
      event.preventDefault
      firebase.auth().signOut()
      document.location.href = 'login.html'
    })

    //Render all questions when the page is loaded
    let querySnapshot = await db.collection('lifeexperiences').get()

    let lifeexperiences = querySnapshot.docs
    for (let i = 0; i < lifeexperiences.length; i++) {
      let lifeexperienceId = lifeexperiences[i].id
      let lifeexperience = lifeexperiences[i].data()
      let lifeexperienceText = lifeexperience.text
      let docRef = await db.collection('selected').doc(`${lifeexperienceId}-${user.uid}`).get()
      let selectedQuestion = docRef.data()
      let opacityClass = ''
        if (selectedQuestion) {
        opacityClass = 'opacity-20'
      }
      //currentevent.name
      // renderPost(currenteventsText)

      document.querySelector('.lifeexperiences').insertAdjacentHTML('beforeend', `
       <div class="lifeexperience-${lifeexperienceId} ${opacityClass} py-4 text-xl border-b-2 border-purple-500 w-full">
         <a href="#" class="done p-2 text-sm bg-green-500 text-white">✓</a>
         ${lifeexperienceText}
       </div>
     `)

      //  //add event listener for click week 6
      //   }

      document.querySelector(`.lifeexperience-${lifeexperienceId}`).addEventListener('click', async function (event) {
        event.preventDefault()
        let lifeElement = document.querySelector(`.lifeexperience-${lifeexperienceId}`)
        currentElement.classList.add('opacity-20')
        await db.collection('selected').doc(`${lifeexperienceId}-${user.uid}`).set({
          text: lifeexperienceText,
          userId: user.uid    
        }) //need to set things within brackets -- is selected true or false
      })
    }

    // listen for the form submit and create new post

    document.querySelector('form').addEventListener('submit', async function (event) {
 // event.preventDefault()

      let lifeexperienceText = document.querySelector('#lifeexperience').value

      let lifeexperience = await db.collection('lifeexperiences').add({
        text: lifeexperienceText,
        userId: user.uid
      })
     //let currenteventId = docRef.id
      console.log(`New Icebreaker question with ID ${lifeexperienceId} created`)

      document.querySelector('.lifeexperiences').insertAdjacentHTML('beforeend', `
      <div class="clifeexperience-${lifeexperienceId} ${opacityClass}py-4 text-xl border-b-2 border-purple-500 w-full">
        <a href="#" class="done p-2 text-sm bg-green-500 text-white">✓</a>
        ${lifeexperienceText}
      </div>
    `)

      document.querySelector(`.lifeexperience-${lifeexperienceId}`).addEventListener('click', async function (event) {
        event.preventDefault()
        let lifeElement = document.querySelector(`lifeexperience-${lifeexperienceId}`)
        lifeElement.classList.add('opacity-20') 
        await db.collection('selected').doc(`${lifeexperienceId}-${user.uid}`).set({})
      })
    //  document.querySelector('#lifeexperience').value = ''

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

// async function renderPost(currenteventText) {
//   document.querySelector('.currentevents').insertAdjacentHTML('beforeend', `
//     <div class="currentevent-${currenteventText} md:mt-16 mt-8 space-y-8">

//     `)

//}
