import express from 'express';
import {MyBatisStudentService} from "@student/mybatis-student-service.ts";
import {Student} from "@student/student.ts";

const router = express.Router();
const service = new MyBatisStudentService();

router.get('/', async (req, res) => {
    try {
        const name = req.query.name as string;
        const birthday = req.query.birthday as string;

        let result;

        if (name) {
            result = await service.getStudentByName(name);
        } else if(birthday) {
            result = await service.getStudentByBirthday(birthday);
        } else {
            result = await service.getStudents();
        }

        res.json(result);
    } catch (e) {
        console.error('Error fetching students: ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
})

router.get('/:no', async (req, res) => {
    try {
        const studentNo = req.params.no;
        const result = await service.getStudentByNo(studentNo);
        res.json(result);
    } catch (e) {
        console.error('Error fetching students: ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
})

router.post('/', async (req, res) => {
    try {
        const student = new Student(req.body.no, req.body.name);
        const result = await service.insertStudent(student);
        res.json({ inserted: result });
    } catch (e) {
        console.error('Error fetching students: ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
})

router.post('/batch', async (req, res) => {
    try {
        const students = req.body.map((student: Student) => new Student(student.no, student.name));
        const result = await service.insertStudentsMulti(students);
        res.json({ inserted: result });
    } catch (e) {
        console.error('Error fetching students: ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
})

router.patch('/', async (req, res) => {
    try {
        const student = new Student(req.body.no, '', new Date(req.body.birthday));
        const result = await service.updateStudent(student);
        res.json({ inserted: result });
    } catch (e) {
        console.error('Error fetching students: ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
})

router.patch('/batch', async (req, res) => {
    try {
        const students = req.body.map((student: any) => new Student(student.no, '', new Date(student.birthday)));
        const result = await service.updateStudentMulti(students);
        res.json({ inserted: result });
    } catch (e) {
        console.error('Error fetching students: ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
})

router.delete('/', async (req, res) => {
    try {
        const studentNo = req.body.no;
        const result = await service.deleteStudentByNo(studentNo);
        res.json({ deleted: result });
    } catch (e) {
        console.error('Error fetching students: ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
})

router.delete('/batch', async (req, res) => {
    try {
        const students = req.body.map((student: Student) => new Student(student.no));
        const result = await service.deleteStudentNoMulti(students);
        res.json({ deleted: result });
    } catch (e) {
        console.error('Error fetching students: ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
})

export default router;