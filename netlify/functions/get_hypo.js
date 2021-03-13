let firebase = require('./firebase')

exports.handler = async function(event) {
    // console.log()
    console.log(event)
    let queryStringUserID = event.queryStringParameters.userId

    let hypotheticalData = []

    let db = firebase.firestore() //talk to the database
    let querySnapshot = await db.collection('hypothetical')
                                .where('userId', '==', queryStringUserId)
                                .get()
    console.log(`number of hypothetical: ${querySnapshot.size}`)

    //return  data
    let hypotheticals = querySnapshot.docs
    for(let i = 0; i < hypotheticals.length; i++) {
        let hypotheticalId = hypotheticals[i].id 
        let hypothetical = hypotheticals[i].data()
        // console.log(hypothetical)

        // push hypothetical 
        hypotheticalData.push()({
           id: hypotheticalId,
           text: hypothetical.text 
        })
    }

    return {
        statusCode: 200,
        body: JSON.stringify(hypotheticalData)
    }
}