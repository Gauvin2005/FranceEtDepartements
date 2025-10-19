import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendConfirmationEmail(email: string, pseudo: string, token: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const confirmUrl = `${appUrl}/api/auth/confirm?token=${token}`;

  const mailOptions = {
    from: process.env.SMTP_FROM || 'no-reply@departements-de-france.fr',
    to: email,
    subject: 'Confirmez votre inscription - La France et ses 101 départements',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background-color: #f4f4f4;
            padding: 30px;
            border-radius: 10px;
          }
          .header {
            background-color: #2563eb;
            color: white;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            text-align: center;
          }
          .content {
            background-color: white;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background-color: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Bienvenue sur La France et ses 101 départements!</h1>
          </div>
          <div class="content">
            <h2>Bonjour ${pseudo},</h2>
            <p>Merci de vous être inscrit sur notre plateforme de jeu!</p>
            <p>Pour activer votre compte et commencer à jouer, veuillez cliquer sur le bouton ci-dessous:</p>
            <div style="text-align: center;">
              <a href="${confirmUrl}" class="button">Confirmer mon inscription</a>
            </div>
            <p>Ou copiez ce lien dans votre navigateur:</p>
            <p style="word-break: break-all; color: #2563eb;">${confirmUrl}</p>
            <p><strong>Ce lien expirera dans 24 heures.</strong></p>
            <p>Si vous n'êtes pas à l'origine de cette inscription, vous pouvez ignorer cet email.</p>
            <p>À bientôt dans le jeu!</p>
          </div>
          <div class="footer">
            <p>La France et ses 101 départements - Jeu éducatif et ludique</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Bonjour ${pseudo},
      
      Merci de vous être inscrit sur La France et ses 101 départements!
      
      Pour activer votre compte, cliquez sur ce lien:
      ${confirmUrl}
      
      Ce lien expirera dans 24 heures.
      
      Si vous n'êtes pas à l'origine de cette inscription, ignorez cet email.
      
      À bientôt!
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email de confirmation envoyé à ${email}`);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
}

export async function sendPasswordResetEmail(email: string, pseudo: string, token: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const resetUrl = `${appUrl}/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.SMTP_FROM || 'no-reply@departements-de-france.fr',
    to: email,
    subject: 'Réinitialisation de votre mot de passe',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
      </head>
      <body>
        <h2>Bonjour ${pseudo},</h2>
        <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
        <p>Cliquez sur ce lien pour définir un nouveau mot de passe:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>Ce lien expirera dans 1 heure.</p>
        <p>Si vous n'avez pas fait cette demande, ignorez cet email.</p>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email de reset envoyé à ${email}`);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
}

