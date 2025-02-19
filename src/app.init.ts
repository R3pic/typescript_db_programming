import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import studentController from "@student/student.controller.ts";
import entertainmentController from "@/entertainment/entertainment.controller.ts";
import swaggerDoc from "@common/swagger.ts";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/entertainments', entertainmentController);
app.use('/students', studentController);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(port, () => {
    console.info(`서버가 http://localhost:${port}에서 실행중입니다.`);
    console.info(`swagger : http://localhost:${port}/api-docs`);
})