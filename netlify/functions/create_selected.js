let firebase = require('./firebase')

exports.handler = async function(event) {
    console.log(`selected`)
    console.log(event)    
    let db = firebase.firestore()
    let body = JSON.parse(event.body)
    //console.log(body)
    let userId = body.userId
    let text = body.text
    let hypotheticalId = body.hypotheticalId

    console.log(`user: ${userId}`)

    let newPost = { 
        text: text,
        userId: userId }
    console.log(newPost)

    let docRef = await db.collection('selected').doc(`${hypotheticalId}-${userId}`).set(newPost)
       // newPost.id = docRef.id
    // newPost.postId = postId
 
    return {
        statusCode: 200,
        body: JSON.stringify(docRef)
        
    }
}