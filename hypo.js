firebase.auth().onAuthStateChanged(async function (user) {
  let db = firebase.firestore()

  if (user) {
    // Signed in
    console.log('signed in')

    // db.collection('users').doc(user.uid).set({ 
    //   name: user.displayName,
    //   email: user.email
    //  })
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
    // 
    //Render all questions when the page is loaded
    let response = await fetch(`/.netlify/functions/get_hypo`)
    let hypotheticalevents = await response.json()

    //let hypotheticalevents = querySnapshot.docs
    for (let i = 0; i < hypotheticalevents.length; i++) {
      let hypotheticaleventId = hypotheticalevents[i].id
      //let hypotheticalevent = hypotheticalevents[i].data()
      let hypotheticaleventText = hypotheticalevents[i].text
      //let docRef = await db.collection('selected').doc(`${user.uid}`).get() //not sure we need lines 33 if we have defined in 24
      //let selectedQuestion = docRef.data() //docRef with response
      let response = await fetch(`/.netlify/functions/get_selected?userId=${user.uid}`)
      let selectedQuestion = await response.json()
      let opacityClass = ''
      if (selectedQuestion) {
        opacityClass = 'opacity-20'
      }

      // renderPost(hypotheticaleventsText)
      document.querySelector('.hypotheticalevents').insertAdjacentHTML('beforeend', `
   <div class="hypotheticalevent-${hypotheticaleventId} ${opacityClass}  py-4 text-xl border-b-2 border-purple-500 w-full">
     <a href="#" class="done p-2 text-sm bg-green-500 text-white">✓</a>
     ${hypotheticaleventText}
   </div>
 `)

      //if statement - check database for currenteventid-userid 
      //if found, then ad opacity (same as 79)
      document.querySelector(`.hypotheticalevent-${hypotheticaleventId} .done`).addEventListener('click', async function (event) {
        event.preventDefault()
        console.log(`eventselected I can't think of something`)
        let hypotheticalElement = document.querySelector(`.hypotheticalevent-${hypotheticaleventId}`)
       
        let response = await fetch(`/.netlify/functions/create_selected`, { //create a new netlify for create
          method: 'POST',
          body: JSON.stringify({ // JSON has data in it if you want to send it to netlify then need to use stringify
            //the one on the left is what the post itself will expect and the one on the right is whatever you named the variable
            userId: user.uid, //can call all of these whatever we want we just need to call it on the other side in our lamda function (create_posts.js) //uid is a unique identifier
            text: hypotheticaleventText,
            hypotheticalId: hypotheticaleventId
          })
        })
        if (response.ok) {
          hypotheticalElement.classList.add('opacity-20')
        }
      })
    }

    // listen for the form submit and create new post
    document.querySelector('form').addEventListener('submit', async function (event) {
      event.preventDefault()
      let hypotheticaleventText = document.querySelector('#hypotheticalevent').value

      let response = await fetch(`/.netlify/functions/create_hypo`, { //create a new netlify for create
        method: 'POST',
        body: JSON.stringify({ // JSON has data in it if you want to send it to netlify then need to use stringify
          //the one on the left is what the post itself will expect and the one on the right is whatever you named the variable
          userId: user.uid, //can call all of these whatever we want we just need to call it on the other side in our lamda function (create_posts.js) //uid is a unique identifier
          text: hypotheticaleventText
        })
      })
      console.log(response)

      let json = await response.json()
      console.log(json)
      let hypotheticaleventId = json.id

      //let hypotheticaleventId = docRef.id
      console.log(`New Icebreaker question with ID ${hypotheticaleventId} created`)
      //renderPost(hypotheticaleventsText)
      document.querySelector('.hypotheticalevents').insertAdjacentHTML('beforeend', `
      <div class="hypotheticalevent-${hypotheticaleventId}  py-4 text-xl border-b-2 border-purple-500 w-full">
        <a href="#" class="done p-2 text-sm bg-green-500 text-white">✓</a>
        ${hypotheticaleventText}
      </div>
    `)

    document.querySelector(`.hypotheticalevent-${hypotheticaleventId} .done`).addEventListener('click', async function (event) {
      event.preventDefault()
      console.log(`eventselected I can't think of something`)
      let hypotheticalElement = document.querySelector(`.hypotheticalevent-${hypotheticaleventId}`)
     
      let response = await fetch(`/.netlify/functions/create_selected`, { //create a new netlify for create
        method: 'POST',
        body: JSON.stringify({ // JSON has data in it if you want to send it to netlify then need to use stringify
          //the one on the left is what the post itself will expect and the one on the right is whatever you named the variable
          userId: user.uid, //can call all of these whatever we want we just need to call it on the other side in our lamda function (create_posts.js) //uid is a unique identifier
          text: hypotheticaleventText,
          hypotheticalId: hypotheticaleventId
        })
      })
      if (response.ok) {
        hypotheticalElement.classList.add('opacity-20')
      }
    })
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
async function renderPost(hypotheticaleventText) {
  document.querySelector('.hypotheticalevents').insertAdjacentHTML('beforeend', `
    <div class="hypotheticalevent-${hypotheticaleventText} md:mt-16 mt-8 space-y-8">
    `)
}











