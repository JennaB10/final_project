let firebase = require('./firebase')

exports.handler = async function(event) {
    // console.log()
    console.log(event)    
    let db = firebase.firestore()

    let body = JSON.parse(event.body)
    console.log(body)
    
    let UserId = body.userId
    let hypotheticaleventText = hypotheticalevent.text

    let newPost = {
        text: hypotheticaleventText,
        userId: UserId
    }
    console.log(newPost)

    let docRef = await db.collection('hypotheticalevents').add(newPost)
 
    let postId = docRef.UserId
    newPost.postId = postId
 
           

    return {
        statusCode: 200,
        body: JSON.stringify(newPost)
        
    }
}