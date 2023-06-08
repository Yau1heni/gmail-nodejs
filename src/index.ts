import express, {Request, Response} from 'express';

const app = express();
const port = 3010;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.get('/sendMessage', (req: Request, res: Response) => {
    res.send('send message');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
