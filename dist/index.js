"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = (0, express_1.default)();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 3010;
const SMTP_LOGIN = process.env.SMTP_LOGIN;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SMTP_LOGIN,
        pass: SMTP_PASSWORD // generated ethereal password
    }
});
app.get('/sendMessage', (req, res) => {
    res.send('Hello World!');
});
app.post('/sendMessage', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, message } = req.body;
    yield transporter.sendMail({
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
    res.send({ result: 'message sent successfully' });
}));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
