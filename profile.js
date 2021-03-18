firebase.auth().onAuthStateChanged(async function (user) {

  let db = firebase.firestore()

  if (user) {
    // Signed in
    console.log('signed in')

    // db.collection('users').doc(user.uid).set({
    //   name: user.displayName,
    //   email: user.email
    // })

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
    let response = await fetch(`/.netlify/functions/get_selected?userId=${user.uid}`)
    let selectedQuestions = await response.json()

    for (let i = 0; i < selectedQuestions.length; i++) {
      let selectedQuestionId = selectedQuestions[i].id
      let text = selectedQuestions[i].text
      let opacityClass = ''
      if (selectedQuestions) {
        opacityClass = 'opacity-20'
      }

    document.querySelector('.selectedQuestions').insertAdjacentHTML('beforeend', `
   <div class="selectedQuestion-${selectedQuestionId} ${opacityClass}  py-4 text-xl border-b-2 border-purple-500 w-full">
     <a href="#" class="done p-2 text-sm bg-green-500 text-white">✓</a>
     ${text}
   </div>
 `)

//  document.querySelector(`.selectedQuestions-${selectedQuestionId} .done`).addEventListener('click', async function (event) {
//   event.preventDefault()
//   console.log(`eventselected I can't think of something`)
  //let Element = document.querySelector(`.selectedQuestions-${selectedQuestionId}`)
 
  // let response = await fetch(`/.netlify/functions/create_selected`, { //create a new netlify for create
  //   method: 'POST',
  //   body: JSON.stringify({ // JSON has data in it if you want to send it to netlify then need to use stringify
  //     //the one on the left is what the post itself will expect and the one on the right is whatever you named the variable
  //     userId: user.uid, //can call all of these whatever we want we just need to call it on the other side in our lamda function (create_posts.js) //uid is a unique identifier
  //     text: text,
  //     userId: userId
    // })
  // })
  // if (response.ok) {
  //   Element.classList.add('opacity-20')
  // }
//})
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

// async function renderPost(currenteventText) {
//   document.querySelector('.currentevents').insertAdjacentHTML('beforeend', `
//     <div class="currentevent-${currenteventText} md:mt-16 mt-8 space-y-8">

//     `)

//}
