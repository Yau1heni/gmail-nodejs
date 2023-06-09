import express, {Request, Response} from 'express';

const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port = process.env.PORT || 3010;
const SMTP_LOGIN = process.env.SMTP_LOGIN
const SMTP_PASSWORD = process.env.SMTP_PASSWORD

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SMTP_LOGIN, // generated ethereal user
    pass: SMTP_PASSWORD // generated ethereal password
  }
});
app.get('/sendMessage', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.post('/sendMessage', async (req: Request, res: Response) => {
  const {name, email, message} = req.body;

  await transporter.sendMail({
    from: name,
    to: SMTP_LOGIN,
    subject: 'WORK✔',
    html: `
        <div>
            <b>Hello, my name: ${name}</b>
                <div>
                    ${email}
                </div>
                <p>
                    ${message}
                </p>
        </div>
    `
  });

  res.send({result: 'message sent successfully'})
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
