let firebase = require('./firebase')

exports.handler = async function(event) {
    // console.log()
    console.log(event)    
    let db = firebase.firestore()
    let body = JSON.parse(event.body)
    //console.log(body)
    let userId = body.userId
    //let username = body.username
    let hypotheticaleventText = body.text

    console.log(`user: ${userId}`)

    let newPost = {
        text: hypotheticaleventText,
        userId: userId,
     
    }
    console.log(newPost)

    let docRef = await db.collection('hypotheticalevents').add(newPost)
    newPost.id = docRef.id
    // newPost.postId = postId
 
    return {
        statusCode: 200,
        body: JSON.stringify(newPost)
        
    }
}