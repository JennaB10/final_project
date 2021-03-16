let firebase = require('./firebase')

exports.handler = async function(event) {
    // console.log()
    console.log(event)    
    let db = firebase.firestore()
    let selectedQuestionsData = []
    
   let queryStringUserId = event.queryStringParameters.userId

    let querySnapshot = await db.collection('selected') 
                                .where('userId', '==', queryStringUserId)
                                .get()
                          
   console.log(`number of selected: ${querySnapshot.size}`)

    //return  data
    let selectedQuestions = querySnapshot.docs
    for(let i = 0; i < selectedQuestions.length; i++) {
        let selectedQuestionId = selectedQuestionss[i].id 
        let selectedQuestion = selectedQuestionss[i].data()
        // console.log(hypothetical)

        // push hypothetical 
        selectedQuestionssData.push({
           id: selectedQuestionId,
           text: selectedQuestion.text 
        })
    }

    return {
        statusCode: 200,
        body: JSON.stringify(selectedQuestionsData)
        
    }
}