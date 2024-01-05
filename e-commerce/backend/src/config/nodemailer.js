import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "jcaceresm1999@gmail.com",
      pass: process.env.PASSWORD_EMAIL,
      authMethod: "LOGIN",
    },
  });

export const sendRecoveryMail = (email, recoveryLink) => {
    const mailOptions = {
      from: "jcaceresm1999@gmail.com",
      to: email,
      subject: "Link para restablecer su contraseña",
      html: `
              <div>
                  <h1>Restablecimiento de contraseña</h1>
                  <p>Haga click en el siguiente enlace para restablecer su contraseña ${recoveryLink}</p>
              </div>
          `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        error ? console.log(error) : console.log('Email enviado correctamente')
    })
}
  