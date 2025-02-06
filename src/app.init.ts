import express from 'express';
import studentController from "@student/student.controller.ts";

const app = express();
const port = 3000;

app.use(express.json());
app.use('/students', studentController);

app.listen(port, () => {
    console.info(`서버가 http:/localhost:${port}에서 실행중입니다.`);
})