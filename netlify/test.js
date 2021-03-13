//when I hear an event, this is what I need to run:
exports.handler = async function(event) {
    return {
        status: 200
        body: JSON.stringify({
            thingToKnow: 'KIEI-451 is awesome' //whatever is in here, this is what comes up. JS response
        })
    }
}