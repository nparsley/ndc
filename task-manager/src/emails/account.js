const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'nickparsley5@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}


const sendDeleteEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'nickparsley5@gmail.com',
        subject: 'Cancel account',
        text: `Sorry to see you go ${name}.  Is there a reason you canceled?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendDeleteEmail
}



























