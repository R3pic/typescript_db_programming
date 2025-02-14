/**
 * @swagger
 * components:
 *  schemas:
 *      Department:
 *          type: object
 *          properties:
 *              dept_code:
 *                  type: string
 *                  description: 부서 코드
 *                  example: D001
 *              dept_name:
 *                  type: string
 *                  description: 부서 이름
 *                  example: 부서이름
 *              dept_loc:
 *                  type: string
 *                  description: 부서 위치
 *                  example: 서울특별시
 */
export class Department {
    constructor(
        public dept_code: string,
        public dept_name: string,
        public dept_loc: string,
    ) {}
}

/**
 * @swagger
 * components:
 *  schemas:
 *      Employee:
 *          type: object
 *          properties:
 *              emp_code:
 *                  type: string
 *                  description: 관계자 코드
 *                  example: E903
 *              emp_name:
 *                  type: string
 *                  description: 관계자 이름
 *                  example: 손진현
 *              emp_mgt:
 *                  type: string
 *                  description: 관계자 상사 코드
 *                  example: E901
 *              emp_sal:
 *                  type: int
 *                  description: 급여
 *                  example: 4000
 *      CreateEmployeeDto:
 *          allOf:
 *              - $ref: '#/components/schemas/Employee'
 *              - type: object
 *                required:
 *                  - emp_code
 *                  - emp_name
 *                  - emp_mgt
 *                  - emp_sal
 *                  - emp_rcode
 *                properties:
 *                  emp_rcode:
 *                      type: string
 *                      description: 직급 코드
 *                      example: R001
 *
 */
export class Employee {
    constructor(
        public emp_code: string,
        public emp_name: string,
        public emp_mgt: string,
        public emp_sal: number,
        public emp_rcode: string,
    ) {}
}

export class EmployeeNameAndManager {
    constructor(
        public emp_name: string,
        public mgt_name: string,
    ) {}
}

export class EmployeeNameAndSalary {
    constructor(
        public emp_name: string,
        public emp_sal: string,
    ) {}
}

/**
 * @swagger
 * components:
 *  schemas:
 *      Drama:
 *          type: object
 *          properties:
 *              drm_code:
 *                  type: string
 *                  description: 드라마 코드
 *                  example: D001
 *              drm_name:
 *                  type: string
 *                  description: 드라마 이름
 *                  example: 드라마 이름
 */
export class Drama {
    constructor(
        public drm_code: string,
        public drm_name: string,
        public drm_prd: string,
        public drm_brd: string,
        public drm_opdate: Date,
    ) {}
}

export class DramaCodeAndName {
    constructor(
        public drm_code: string,
        public drm_name: string,
    ) {
    }
}
