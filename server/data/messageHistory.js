
//format : [{ type: "outgoing", message: "Hi I am sending this" }, { type: "incoming", message: "Hi you will recieve this" }]

export const messageHistory = [

]

export function sendMessage(msgObj, messageHistory) {

    const newMsgObj = { type: msgObj.type, message: msgObj.message }
    messageHistory.push(newMsgObj)
    return newMsgObj

}

