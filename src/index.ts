import express, { Router } from 'express';

console.log('oi');
const app = express()
const route = Router();
route.get('/api/ola/:info', () => { console.log('ola') });
app.use(express.json());
app.use(route);
app.listen(3000, () => {
    console.log('na 3000');
});

