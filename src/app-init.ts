import { PostgresEntertainmentService } from "@/entertainment/postgres-entertainment-service.ts";
import { Employee } from "@/entertainment/entertainment.ts";

import { PostgresStudentService } from "@student/postgres-student-service.ts";
import { MyBatisStudentService } from "@student/mybatis-student-service.ts";
import { Student } from "@student/student.ts";
import type { StudentService } from "@student/student-service.ts";

class AppInit {
    public static async main(): Promise<void> {
        let result;
        if (Bun.env.DATABASE === 'exercise') {
            let studentService: StudentService;
            switch (Bun.env.SERVICE) {
                case "postgres":
                    studentService = new PostgresStudentService();
                    break;
                case "mybatis":
                    studentService = new MyBatisStudentService();
                    break;
                default:
                    studentService = new MyBatisStudentService();
            }

            //#region Student 테스트

            console.info("01. 학생 전체 목록을 조회합니다.");
            result = await studentService.getStudents();
            console.info(result);
            console.info();

            console.info("02. 학번이 20110101인 학생을 조회합니다.");
            result = await studentService.getStudentByNo("20110101");
            console.info(result);
            console.info();

            console.info("03. 이름이 홍길동인 학생을 조회합니다.");
            result = await studentService.getStudentByName("홍길동");
            console.info(result);
            console.info();

            console.info("04. 생일이 1990-03-01인 학생을 조회합니다.");
            result = await studentService.getStudentByBirthday("1990-03-01");
            console.info(result);
            console.info();

            console.info("05. 학번이 20110402이고, 이름이 이순신인 학생을 추가합니다.");
            let student = new Student("20110402", "이순신");
            result = await studentService.insertStudent(student);
            console.info(`${result}건이 등록되었습니다.`);
            console.info();

            console.info("06. 학번이 20110502, 20110602, 20110702, 20110802이고,\n " +
                "이름이 이율곡, 이수일, 심순애, 임꺽정인 학생을 추가합니다.");
            let students = [
                new Student("20110502", "이율곡"),
                new Student("20110602", "이수일"),
                new Student("20110702", "심순애"),
                new Student("20110802", "임꺽정"),
            ];
            result = await studentService.insertStudentsMulti(students);
            console.info(`${result}건이 등록되었습니다.`);
            console.info();

            console.info("07. 학번이 20110902, 20111002, 20111102, 20111202이고,\n " +
                "이름이 이상훈, 강동희, 김호성, 김정준인 학생을 추가합니다.");
            students = [
                new Student("20110902", "이상훈"),
                new Student("20111002", "강동희"),
                new Student("20111102", "김호성"),
                new Student("20111202", "김정준"),
            ];
            result = await studentService.insertStudentsMulti(students);
            console.info(`${result}건이 등록되었습니다.`);
            console.info();

            console.log("08. 학번 20110402인 학생의 생일을 1990-03-25로 변경합니다.");
            result = await studentService.updateStudent(new Student("20110401", '', new Date("1990-03-25")));
            console.info(`${result}건이 변경되었습니다.`);
            console.info();

            console.log("09. 학번이 20110402인 학생의 생일을 1990-03-25으로 변경합니다.");
            result = await studentService.updateStudent(new Student("20110402", "이순신", new Date("1990-03-25")));
            console.info(`${result}건이 변경되었습니다.`);
            console.info();

            console.log("10. 학번이 20110502, 20110602, 20110702, 20110802인 학생의 생일을 각각 \n" +
                "1990-03-01, 1990-04-01, 1990-05-01, 1990-06-01, 1990-07-01, 1990-08-01, 1990-09-01, 1990-10-01으로 변경합니다.");
            students = [
                new Student("20110502", "이율곡", new Date("1990-03-01")),
                new Student("20110602", "이수일", new Date("1990-04-01")),
                new Student("20110702", "심순애", new Date("1990-05-01")),
                new Student("20110802", "임꺽정", new Date("1990-06-01")),
                new Student("20110902", "이상훈", new Date("1990-07-01")),
                new Student("20111002", "강동희", new Date("1990-08-01")),
                new Student("20111102", "김호성", new Date("1990-09-01")),
                new Student("20111202", "김정준", new Date("1990-10-01")),
            ];
            result = await studentService.updateStudentMulti(students);
            console.info(`${result}건이 변경되었습니다.`);
            console.info();

            console.log("11. 학번이 20110402인 학생을 목록에서 제거합니다.");
            result = await studentService.deleteStudentByNo("20110402");
            console.info(`${result}건이 삭제되었습니다.`);
            console.info();

            console.log("12. 학번이 20110502, 20110602, 20110702, 20110802인 학생을 목록에서 제거합니다.");
            students = [
                new Student("20110502"),
                new Student("20110602"),
                new Student("20110702"),
                new Student("20110802"),
                new Student("20110902"),
                new Student("20111002"),
                new Student("20111102"),
                new Student("20111202"),
            ];
            result = await studentService.deleteStudentNoMulti(students);
            console.info(`${result}건이 삭제되었습니다.`);
            console.info();
            //#endregion
        }

        if (Bun.env.DATABASE === 'entertainment') {
            const service = new PostgresEntertainmentService();
            //#region Entertainment 테스트

            console.info('Quiz 01. HNU Entertainment의 부서 코드, 이름, 위치를 검색하시오.');
            result = await service.getDepartments();
            console.info(result);
            console.info();

            console.info('Quiz 02. HNU Entertainment의 연예관계자 코드, 이름, 관리자, 급여를 검색하시오.');
            result = await service.getEmployees();
            console.info(result);
            console.info();

            console.info('Quiz 03. HNU Entertainment에서 제작한 드라마의 코드와 이름을 검색하시오.');
            result = await service.getDramas();
            console.info(result);
            console.info();

            console.info('Quiz 04. 드라마 방영사가 KBC이거나 SBC인 드라마를 검색하시오');
            result = await service.getDramasByKBCOrSBC();
            console.info(result);
            console.info();

            console.info('Quiz 05. 드라마 제작사를 검색하시오. 단, 중복된 값이 있으면 제거하시오.');
            result = await service.getDramaBroadcasts();
            console.info(result);
            console.info();

            console.info('Quiz 06. 연예관계자들의 급여의 총합과 평균 급여액을 계산하시오.');
            result = await service.getEmployeeSalarySumAndAvg();
            console.info(result);
            console.info();

            console.info('Quiz 07. 방영일자가 아직 확정되지 않은 드라마의 이름을 검색하시오.');
            result = await service.getDramasbyNotOpen();
            console.info(result);
            console.info();

            console.info('Quiz 08. 연예관계자에 대해 연예관계자의 이름과 직속 상사의 이름을 검색하시오');
            result = await service.getAllEmployeeNameAndManagerName();
            console.info(result);
            console.info();

            console.info('Quiz 09. 연예관계자에 대해 이름과 급여를 출력하고, 급여의 내림차순으로 정렬하시오. 단, 동일 급여일 때는 이름의 오름차순으로 정렬하시오.');
            result = await service.getAllEmployeeNameAndSalary();
            console.info(result);
            console.info();

            console.info('Quiz 10. 모든 연예관계자를 직급별로 그룹화하고, 평균 급여액이 5000 이상인 직급에 대해 연예 관계자의 직급, 평균 급여액, 최소 급여액, 최대 급여액을 검색하시오');
            result = await service.getEmployeesSalaryDataByRoleFromSalaryAvg(5000);
            console.info(result);
            console.info();

            console.info('Quiz 11. 모든 연예관계자의 평균 급여액보다 많은 급여를 받는 연예관계자의 이름과 급여를 검색하라.');
            result = await service.getEmployeesByHigherThanAvgSalary();
            console.info(result);
            console.info();

            console.info('Quiz 12. 방영일자가 확정되지 않은 드라마의 방영일자가 2013-05-01로 편성되었습니다. 알맞게 변경하시오.');
            result = await service.updateDramaOpenDateIfNull('2013-05-01');
            console.info(`${result}개의 드라마가 변경되었습니다.`);
            console.info();

            console.info('Quiz 13. 연예관계자 김수현 씨가 대리에서 실장으로 승진하고 급여가 20% 증가되었습니다. 알맞게 변경하시오');
            result = await service.updateEmployeeRoleAndSalary('E203', '실장', 20);
            console.info(`${result}개의 사원이 변경되었습니다.`);
            console.info();

            console.info('Quiz 14. 우리 회사에 한 명의 임원이 등록되었습니다. 코드는 E903, 이름은 손진현, 관리자는 E901, 급여는 4000입니다. 알맞게 등록하시오');
            // result = await entertainmentService.insertEmployee(new Employee('E903', '손진현', 'E901', 4000, 'R006'), 'D301');
            result = await service.insertEmployee(new Employee('E903', '손진현', 'E901', 4000, 'R006'));
            console.info(result);
            console.info();

            console.info('Quiz 15. 연예관계자인 손진현님이 퇴직했습니다. 연예관계자 목록에서 제거하시오.');
            result = await service.deleteEmployee('E903');
            console.info(result);
            console.info();

            //#endregion
        }
    }
}

AppInit.main()
        .catch(console.error);