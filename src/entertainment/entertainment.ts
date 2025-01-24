export class Department {
    constructor(
        public dept_code: string,
        public dept_name: string,
        public dept_loc: string,
    ) {}
}

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
