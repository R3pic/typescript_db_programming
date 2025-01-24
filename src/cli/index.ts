import { CLI } from './cli.ts';
import { MyBatisStudentService } from "@student/mybatis-student-service.ts";

new CLI(new MyBatisStudentService())
    .run()
    .then()
    .catch(console.error);