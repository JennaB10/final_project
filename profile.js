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

    

//  // Show only my to-dos
//  let response = await fetch(`/.netlify/functions/get_todos?userId=${user.uid}`)
//  let todos = await response.json()
//  console.log(todos)

//  for (let i=0; i<todos.length; i++) {
//    let todo = todos[i]
//    let todoId = todo.id
//    let todoText = todo.text

//    document.querySelector('.todos').insertAdjacentHTML('beforeend', `
//      <div class="todo-${todoId} py-4 text-xl border-b-2 border-purple-500 w-full">
//        <a href="#" class="done p-2 text-sm bg-green-500 text-white">✓</a>
//        ${todoText}
//      </div>
//    `)

//    document.querySelector(`.todo-${todoId} .done`).addEventListener('click', async function(event) {
//      event.preventDefault()
//      document.querySelector(`.todo-${todoId}`).classList.add('opacity-20')
//      await db.collection('todos').doc(todoId).delete()
//    })
//  }




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
