let firebase = require('./firebase/')

exports.handler = async function(event) {
    console.log()

    let hypothetical = []
    let db = firebase.firestore() //talk to the database
    let querySnapshot = await db.collection('hypothetical').get()
    console.log(`number of hypothetical: ${querySnapshot.size}`)

    //return  data
    let hypothetical = querySnapshot.docs
    for(let i = 0; i < hypothetical.length; i++) {
        let hypotheticalId = hypothetical[i].hypotheticalId 
        let hypothetical = hypothetical[i].data()
        // console.log(hypothetical)

        // push hypothetical 
        hypothetical.push()({
           id: hypotheticalId,
           test: hypothetical.text 
        })
    }

    return {
        statusCode: 200,
        body: JSON.stringify(hypothetical)
    }
}