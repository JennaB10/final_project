let firebase = require('./firebase')

exports.handler = async function(event) {
    // console.log()
    console.log(event)    
     
   let queryStringUserId = event.queryStringParameters.userId

   let selectedQuestionData = []
   let db = firebase.firestore()

    let querySnapshot = await db.collection('selected') 
                                .where('userId', '==', queryStringUserId)
                                .get()
                          
   console.log(`number of selected: ${querySnapshot.size}`)

    //return  data
    let selectedQuestions = querySnapshot.docs
    for(let i = 0; i < selectedQuestions.length; i++) {
        let selectedQuestionId = selectedQuestions[i].id 
        let selectedQuestion = selectedQuestions[i].data()
        // console.log(hypothetical)

        // push hypothetical 
        selectedQuestionData.push({
           id: selectedQuestionId,
           text: selectedQuestion.text 
        })
    }

    return {
        statusCode: 200,
        body: JSON.stringify(selectedQuestionData)
        
    }
}