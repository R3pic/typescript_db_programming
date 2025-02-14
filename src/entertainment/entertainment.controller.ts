import express from "express";
import {PostgresEntertainmentService} from "@/entertainment/postgres-entertainment-service.ts";
import {Employee} from "@/entertainment/entertainment.ts";

const router = express.Router();
const service = new PostgresEntertainmentService();

/**
 * @openapi
 * /entertainments/departments:
 *  get:
 *      tags:
 *          - Department
 *      summary: 모든 부서 목록
 *      description: 모든 부서 목록을 가져옵니다.
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Department'
 */
router.get('/departments', async (req, res) => {
    try {
        const results = await service.getDepartments();
        res.json(results);
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});

/**
 * @openapi
 * /entertainments/employees:
 *  get:
 *      tags:
 *          - Employee
 *      summary: 모든 관계자 목록
 *      description: 모든 관계자 목록을 가져옵니다.
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Employee'
 */
router.get('/employees', async (req, res) => {
    try {
        const results = await service.getEmployees();
        res.json(results);
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});

/**
 * @openapi
 * /entertainments/dramas:
 *  get:
 *      tags:
 *          - Drama
 *      summary: 모든 드라마 목록
 *      description: 모든 드라마 목록을 가져옵니다.
 *      parameters:
 *          - in: query
 *            name: broadcasts
 *            schema:
 *              type: string
 *            description: 방영사가 다수일 경우 ,로 구분하여 작성한다.
 *            example: 'KBC,SBC'
 *            required: false
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Drama'
 */
router.get('/dramas', async (req, res) => {
    try {
        const broadcastsQuery = req.query.broadcasts as string;

        if (broadcastsQuery) {
            const broadcasts = broadcastsQuery.split(",");
            const results = await service.getDramasByBroadcasts(broadcasts);

            res.json(results);
            return;
        }

        const results = await service.getDramas();
        res.json(results);
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});

/**
 * @openapi
 * /entertainments/dramas/broadcasts:
 *  get:
 *      tags:
 *          - Drama
 *      summary: 모든 드라마 방영사
 *      description: 모든 드라마 방영사 목록을 가져옵니다.
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: string
 *                              example: KBC
 */
router.get('/dramas/broadcasts', async (req, res) => {
    try {
        const results = await service.getDramaBroadcasts();
        res.json(results);
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});

/**
 * @openapi
 * /entertainments/employees/salaries/stats:
 *  get:
 *      tags:
 *          - Employee
 *      summary: 모든 관계자의 급여 총합 / 평균
 *      description: 모든 관계자의 급여 총합 / 평균을 반환합니다.
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              sum:
 *                                  type: number
 *                                  description: 급여 합계
 *                                  example: 1000
 *                              avg:
 *                                  type: number
 *                                  description: 급여 평균
 *                                  example: 500
 */
router.get('/employees/salaries/stats', async (req, res) => {
    try {
        const results = await service.getEmployeeSalarySumAndAvg();
        res.json(results);
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});

/**
 * @openapi
 * /entertainments/dramas/not-open:
 *  get:
 *      tags:
 *          - Drama
 *      summary: 방영되지 않은 드라마 목록
 *      description: 방영되지 않은 드라마 목록을 가져옵니다.
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: string
 *                              description: 드라마 이름
 *                              example: '수의사'
 */
router.get('/dramas/not-open', async (req, res) => {
    try {
        const results = await service.getDramasbyNotOpen();
        res.json(results);
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});

/**
 * @openapi
 * /entertainments/employees/managers:
 *  get:
 *      tags:
 *          - Employee
 *      summary: 모든 관계자 이름과 상사의 이름
 *      description: 모든 관계자 이름과 상사의 이름을 반환합니다.
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  emp_name:
 *                                      type: string
 *                                      description: 관계자 이름
 *                                  mgt_name:
 *                                      type: string
 *                                      description: 관계자 상사 이름
 */
router.get('/employees/managers', async (req, res) => {
    try {
        const results = await service.getAllEmployeeNameAndManagerName();
        res.json(results);
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});

/**
 * @openapi
 * /entertainments/employees/salaries:
 *  get:
 *      tags:
 *          - Employee
 *      summary: 관계자의 이름과 급여
 *      description: 관계자의 이름과 급여를 가져옵니다.
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  emp_name:
 *                                      type: string
 *                                      description: 관계자 이름
 *                                      example: 홍길동
 *                                  emp_sal:
 *                                      type: number
 *                                      description: 관계자 급여
 *                                      example: 5000
 */
router.get('/employees/salaries', async (req, res) => {
    try {
        const results = await service.getAllEmployeeNameAndSalary();
        res.json(results);
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});
/**
 * @openapi
 * /entertainments/employees/roles/salaries/stats:
 *  get:
 *      tags:
 *          - Employee
 *      summary: 특정 급여 이상 받는 직급
 *      description: 특정 급여 이상 급여 받는 직급을 반환합니다.
 *      parameters:
 *          - in: query
 *            name: filter
 *            schema:
 *              type: number
 *            description: 일정 급여 이상
 *            example: 5000
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  emp_rcode:
 *                                      type: string
 *                                      description: 직급 코드
 *                                      example: R001
 *                                  avg:
 *                                      type: number
 *                                      description: 급여 평균
 *                                      example: 5000
 *                                  max:
 *                                      type: number
 *                                      description: 최고 급여
 *                                      example: 5000
 *                                  min:
 *                                      type: number
 *                                      description: 최소 급여
 *                                      example: 5000
 */
router.get('/employees/roles/salaries/stats', async (req, res) => {
    try {
        const filter = parseInt(req.query.filter as string);

        if (Number.isNaN(filter)) {
            res.status(401).json({
                message: 'Bad Request',
            });
            return;
        }
        const results = await service.getEmployeesSalaryDataByRoleFromSalaryAvg(filter);
        res.json(results);
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});

/**
 * @openapi
 * /entertainments/employees/salaries/above-average:
 *  get:
 *      tags:
 *          - Employee
 *      summary: 평균 급여 이상 받는 관계자목록
 *      description: 평균 급여 이상 받는 관계자 목록을 반환합니다.
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  emp_name:
 *                                      type: string
 *                                      description: 관계자 이름
 *                                  emp_sal:
 *                                      type: string
 *                                      description: 관계자 급여
 */
router.get('/employees/salaries/above-average', async (req, res) => {
    try {
        const results = await service.getEmployeesByHigherThanAvgSalary();
        res.json(results);
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});

/**
 * @openapi
 * /entertainments/dramas/not-open:
 *  patch:
 *      tags:
 *          - Drama
 *      summary: 방영일자가 정해지지 않은 드라마의 방영일자
 *      description: 방영일자가 정해지지 않은 드라마의 방영일자를 업데이트합니다.
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          open_date:
 *                              type: string
 *                              description: 수정할 방영일자
 *                              example: '2013-05-01'
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      message:
 *                        type: string
 *                        description: 업데이트된 행의 갯수
 *                        example: 1개의 행이 업데이트되었습니다.
 */
router.patch('/dramas/not-open', async (req, res) => {
    try {
        const { open_date } = req.body;

        const results = await service.updateDramaOpenDateIfNull(open_date);
        res.json({
            message: `${results}개의 행이 업데이트되었습니다.`
        });
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});
/**
 * @openapi
 * /entertainments/employees/{id}/promotion:
 *  patch:
 *      tags:
 *          - Drama
 *      summary: 직급과 급여 상승
 *      description: 관계자의 직급과 급여를 상승시킵니다.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: 관계자 코드
 *          example: 'E203'
 *      requestBody:
 *        description: 어떤 직급으로 승진할지, 급여의 상승 퍼센테이지
 *        required: true
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 role_name:
 *                     type: string
 *                     description: 직급 이름
 *                     example: 실장
 *                 percentage:
 *                     type: number
 *                     description: 급여 인상률 (0~100)
 *                     example: 20
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: 업데이트된 행의 갯수
 *                                  example: 1개의 행이 업데이트되었습니다.
 */
router.patch('/employees/:id/promotion', async (req, res) => {
    try {
        const id = req.params.id as string;
        const { role_name, percentage } = req.body;
        const results = await service.updateEmployeeRoleAndSalary(id, role_name, percentage);

        res.json({
            message: `${results}개의 행이 업데이트되었습니다.`
        })
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});

/**
 * @openapi
 * /entertainments/employees:
 *  post:
 *      tags:
 *          - Employee
 *      summary: 새로운 관계자를 추가
 *      description: 새로운 관계자를 추가합니다.
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/CreateEmployeeDto'
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: 추가된 행의 갯수
 *                                  example: 1개의 행이 추가되었습니다.
 */
router.post('/employees', async (req, res) => {
    try {
        const { emp_code, emp_name, emp_mgt, emp_sal, emp_rcode } = req.body;
        const employee = new Employee(
            emp_code,
            emp_name,
            emp_mgt,
            emp_sal,
            emp_rcode
        );

        const results = await service.insertEmployee(employee);

        res.json({
            message: `${results}개의 행이 추가되었습니다`
        })
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});

/**
 * @openapi
 * /entertainments/employees:
 *  delete:
 *      tags:
 *          - Employee
 *      summary: 관계자 삭제.
 *      description: 관계자를 삭제합니다.
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          emp_code:
 *                              type: string
 *                              description: 삭제할 관계자의 코드
 *                              example: E903
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: 업데이트된 행의 갯수
 *                                  example: 1개의 행이 삭제되었습니다.
 */
router.delete('/employees', async (req, res) => {
    try {
        const { emp_code } = req.body;

        const results = await service.deleteEmployee(emp_code);

        res.json({
            message: `${results}개의 행이 삭제되었습니다.`
        })
    } catch (e) {
        console.error('Error fetching Entertainment : ', e);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});

export default router;