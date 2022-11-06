// const ses = new aws.SES()

const sendEmail = async (userEmail) => {
    const params = {
        // Source: sender,
        // Destination: {
        //     ToAddresses: [
        //         `${userEmail}`
        //     ],
        // },
        // Message: {
        //     Subject: {
        //         Data: subject,
        //         Charset: charset
        //     },
        //     Body: {
        //         Text: {
        //             Data: body_text,
        //             Charset: charset
        //         },
        //         Html: {
        //             Data: body_html,
        //             Charset: charset
        //         }
        //     }
        // }
    }

    await ses.sendEmail(params)
}

module.exports = {
    sendEmail
}