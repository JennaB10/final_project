let firebase = require('./firebase')

exports.handler = async function(event) {
    // console.log()
    console.log(event)    
    let db = firebase.firestore()
    let body = JSON.parse(event.body)
    //console.log(body)
    let UserId = body.userId
    let username = body.username
    let hypotheticaleventText = hypotheticalevent.text

    console.log(`user: ${userId}`)

    let newPost = {
        text: hypotheticaleventText,
        username: username,
        userId: UserId,
        created:firebase.firestore.FieldValue.serverTimestamp()
    }
    console.log(newPost)

    let docRef = await db.collection('hypotheticalevents').add(newPost)
    let post.id = docRef.id
    newPost.postId = postId
 
    return {
        statusCode: 200,
        body: JSON.stringify(newPost)
        
    }
}