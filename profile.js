firebase.auth().onAuthStateChanged(async function (user) {

  let db = firebase.firestore()

  if (user) {
    // Signed in
    console.log('signed in')

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
      let selectedQuestionText = selectedQuestions[i].text
      let opacityClass = ''
      if (selectedQuestions) {
        opacityClass = 'opacity-20'
      }

    document.querySelector('.selected').insertAdjacentHTML('afterend', `
   <div class="selected-${selectedQuestionId} ${opacityClass}  py-4 text-xl border-b-2 border-purple-500 w-full">
     <a href="#" class="done p-2 text-sm bg-green-500 text-white">✓</a>
     ${selectedQuestionText}
   </div>
 `)

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
      signInSuccessUrl: 'categories.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})
