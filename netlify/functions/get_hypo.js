let firebase = require('./firebase')

exports.handler = async function(event) {
    // console.log()
    console.log(event)    
    let db = firebase.firestore()
    let hypotheticaleventsData = []
    
   let queryStringUserId = event.queryStringParameters.userId

    let querySnapshot = await db.collection('hypotheticalevents')
                                .where('userId', '==', queryStringUserId)
                                .add({
                                    text: hypotheticaleventText,
                                    userId: user.uid       
                                })
                          
   console.log(`number of hypotheticalevents: ${querySnapshot.size}`)

    //return  data
    let hypotheticalevents = querySnapshot.docs
    for(let i = 0; i < hypotheticalevents.length; i++) {
        let hypotheticaleventId = hypotheticalevents[i].id 
        let hypotheticalevent = hypotheticalevents[i].data()
        // console.log(hypothetical)

        // push hypothetical 
        hypotheticalData.push({
           id: hypotheticaleventId,
           text: hypotheticalevent.text 
        })
    }

    return {
        statusCode: 200,
        body: JSON.stringify(hypotheticaleventsData)
        
    }
}