\c entertainment

SET ROLE yehwan;

-- 부서 생성
CREATE TABLE IF NOT EXISTS department (
                                          DEPT_CODE VARCHAR(4)  NOT NULL PRIMARY KEY,
    DEPT_NAME VARCHAR(10) NOT NULL,
    DEPT_LOC  VARCHAR(10) NULL
    );

INSERT INTO department (DEPT_CODE, DEPT_NAME, DEPT_LOC) VALUES
                                                            ('D001', '배우', '서울특별시'),
                                                            ('D002','뮤지컬배우', '서울특별시'),
                                                            ('D003','가수(솔로)', '서울특별시'),
                                                            ('D004', '가수(그룹)', '서울특별시'),
                                                            ('D005', '코미디언', '서울특별시'),
                                                            ('D101', '드라마제작', '서울특별시'),
                                                            ('D102', '영화제작', '대전광역시'),
                                                            ('D103', '음반제작', '수원시'),
                                                            ('D104', '예능제작', '서울특별시'),
                                                            ('D201', '스태프', NULL),
                                                            ('D301', '임원', '서울특별시');

-- 직급 생성
CREATE TABLE IF NOT EXISTS emp_role (
    EMP_RCODE VARCHAR(4)  PRIMARY KEY,
    EMP_RNAME VARCHAR(10) NOT NULL
);

INSERT INTO emp_role (EMP_RCODE, EMP_RNAME) VALUES
                                                ('R001', '엔터테이너'),
                                                ('R002', '국장'),
                                                ('R003', '실장'),
                                                ('R004', '대리'),
                                                ('R005', '사원'),
                                                ('R006', '이사'),
                                                ('R007', '사장');

-- 관계자 생성
CREATE TABLE IF NOT EXISTS employee (
    EMP_CODE  VARCHAR(4)  NOT NULL PRIMARY KEY,
    EMP_NAME  VARCHAR(10) NOT NULL,
    EMP_MGT   VARCHAR(4)  NOT NULL,
    EMP_SAL   INT         NOT NULL,
    EMP_RCODE VARCHAR(4)  NOT NULL,
    CONSTRAINT emp_rcode_fk FOREIGN KEY(EMP_RCODE) REFERENCES EMP_ROLE(EMP_RCODE)
);

INSERT INTO employee (EMP_CODE, EMP_NAME, EMP_MGT, EMP_SAL, EMP_RCODE) VALUES
                                                                           ('E001', '김민훈', 'E202', 5500, 'R001'),
                                                                           ('E002', '손지민', 'E201', 4500, 'R001'),
                                                                           ('E003', '이순신', 'E203', 9500, 'R001'),
                                                                           ('E004', '강혁민', 'E201', 3500,'R001'),
                                                                           ('E005', '옥주인', 'E201', 3500, 'R001'),
                                                                           ('E006', '신승모', 'E202', 7500, 'R001'),
                                                                           ('E007', '김건훈', 'E202', 7500, 'R001'),
                                                                           ('E008', '소년시대', 'E203', 8500, 'R001'),
                                                                           ('E009', '유재동', 'E203', 8500, 'R001'),
                                                                           ('E101', '강동민', 'E902', 7500, 'R002'),
                                                                           ('E102', '문성준', 'E902', 7500, 'R002'),
                                                                           ('E103', '한동화', 'E902', 7500, 'R002'),
                                                                           ('E201', '홍길동', 'E902', 3000, 'R003'),
                                                                           ('E202', '일지매', 'E101', 2750, 'R004'),
                                                                           ('E203', '김수현', 'E102', 2750, 'R004'),
                                                                           ('E204', '신용주', 'E103', 2500, 'R005'),
                                                                           ('E901', '이수민', '', 5000, 'R007'),
                                                                           ('E902', '김형석', 'E901', 4000, 'R006');


-- 관계자-부서 생성
CREATE TABLE IF NOT EXISTS rel_department (
    RD_EMP_CODE  VARCHAR(4)  NOT NULL,
    RD_DEPT_CODE VARCHAR(10) NOT NULL,
    PRIMARY KEY(RD_EMP_CODE, RD_DEPT_CODE),
    CONSTRAINT rd_emp_code_fk  FOREIGN KEY(RD_EMP_CODE)  REFERENCES employee(EMP_CODE),
    CONSTRAINT rd_dept_code_fk FOREIGN KEY(RD_DEPT_CODE) REFERENCES department(DEPT_CODE)
    );

INSERT INTO rel_department (RD_EMP_CODE, RD_DEPT_CODE) VALUES
                                                           ('E001', 'D001'),
                                                           ('E001', 'D002'),
                                                           ('E002', 'D001'),
                                                           ('E003', 'D001'),
                                                           ('E003', 'D003'),
                                                           ('E004', 'D001'),
                                                           ('E004', 'D002'),
                                                           ('E005', 'D002'),
                                                           ('E006', 'D003'),
                                                           ('E007', 'D003'),
                                                           ('E008', 'D004'),
                                                           ('E009', 'D005'),
                                                           ('E101', 'D101'),
                                                           ('E102', 'D102'),
                                                           ('E103', 'D103'),
                                                           ('E201', 'D201'),
                                                           ('E202', 'D201'),
                                                           ('E203', 'D201'),
                                                           ('E204', 'D201'),
                                                           ('E901', 'D301'),
                                                           ('E902', 'D301');

-- 영화 생성
CREATE TABLE IF NOT EXISTS movie (
    MOV_CODE   VARCHAR(5)  PRIMARY KEY,
    MOV_NAME   VARCHAR(20) NOT NULL,
    MOV_MPAA   VARCHAR(2)  NOT NULL,
    MOV_PDDATE DATE        NOT NULL,
    MOV_OPDATE DATE        NULL
);

INSERT INTO movie (MOV_CODE, MOV_NAME, MOV_MPAA, MOV_PDDATE, MOV_OPDATE) VALUES
                                                                             ('MOV01', '모래가 흐르는 바다', 'A', '2013-01-01', '2013-01-01'),
                                                                             ('MOV02', '프랜드', '18', '2013-01-15', '2014-01-15'),
                                                                             ('MOV03', '5급 공무원', '15', '2013-02-01', '2015-02-01'),
                                                                             ('MOV04', '사랑', '18', '2013-02-01', '2016-02-01'),
                                                                             ('MOV05', '킬러', '18', '2013-02-08', '2017-02-08'),
                                                                             ('MOV06', '스토커', '18', '2013-02-28', '2018-02-28'),
                                                                             ('MOV07', '더 울버린', '15', '2013-07-25', NULL),
                                                                             ('MOV08', '여름', '15', '2013-07-31', NULL),
                                                                             ('MOV09', '봄', 'A', '2013-03-01', '2021-03-01'),
                                                                             ('MOV10', '저스트 어 이어어', '12',  '2013-05-01', NULL);

-- 영화 출연 생성
CREATE TABLE IF NOT EXISTS part_movie (
                                          PM_EMP_CODE VARCHAR(4) NOT NULL,
    PM_MOV_CODE VARCHAR(5) NOT NULL,
    PM_EMP_ROLE VARCHAR(2) NOT NULL,
    PM_MOV_FEE  INT        NULL,
    PRIMARY KEY(PM_EMP_CODE, PM_MOV_CODE),
    CONSTRAINT pm_emp_code_fk FOREIGN KEY(PM_EMP_CODE) REFERENCES employee(EMP_CODE),
    CONSTRAINT pm_mov_code_fk FOREIGN KEY(PM_MOV_CODE) REFERENCES movie(MOV_CODE)
    );

INSERT INTO part_movie (PM_EMP_CODE, PM_MOV_CODE, PM_EMP_ROLE, PM_MOV_FEE) VALUES
                                                                               ('E003', 'MOV03', '주연', 13500),
                                                                               ('E001', 'MOV03', '조연', 7500),
                                                                               ('E002', 'MOV05', '단역', 3500),
                                                                               ('E004', 'MOV08', '단역', 3500),
                                                                               ('E001', 'MOV09', '조연', 8000),
                                                                               ('E004', 'MOV09', '단역', 3000);

-- 드라마 생성
CREATE TABLE IF NOT EXISTS drama (
                                     DRM_CODE   VARCHAR(5)  PRIMARY KEY,
    DRM_NAME   VARCHAR(20) NOT NULL,
    DRM_PRD    VARCHAR(5)  NOT NULL,
    DRM_BRD    VARCHAR(3)  NOT NULL,
    DRM_OPDATE DATE        NULL
    );

INSERT INTO drama (DRM_CODE, DRM_NAME, DRM_PRD, DRM_BRD, DRM_OPDATE) VALUES
                                                                         ('DRM01', '왕의 게임', 'TG', 'SBC', '2013-01-01'),
                                                                         ('DRM02', '아이러시', 'SN', 'KBC', '2013-01-01'),
                                                                         ('DRM03', '야킹', 'TG','SBC', '2013-02-01'),
                                                                         ('DRM04', '닥터 호', 'HNU-E', 'MBS', '2013-02-01'),
                                                                         ('DRM05', '5급 사무관', 'SN', 'MBS', '2013-02-15'),
                                                                         ('DRM06', '그 사람', 'XTS', 'XTS', '2013-02-15'),
                                                                         ('DRM07', '여왕의 꿈', 'HNU-E', 'KBC', '2013-03-15'),
                                                                         ('DRM08', '머니의 화신', 'TG', 'SBC', '2013-03-15'),
                                                                         ('DRM09', '회사의 신', 'SN', 'KBC', NULL),
                                                                         ('DRM10', '수의사', 'HNU-E', 'XTS',NULL);


-- 드라마 출연 생성
CREATE TABLE IF NOT EXISTS part_drama (
                                          PD_DRM_CODE VARCHAR(5) NOT NULL,
    PD_EMP_CODE VARCHAR(4) NOT NULL,
    PD_EMP_ROLE VARCHAR(2) NOT NULL,
    PD_EMP_FEE  INT        NULL,
    PRIMARY KEY(PD_DRM_CODE, PD_EMP_CODE),
    CONSTRAINT pd_emp_code_fk FOREIGN KEY(PD_EMP_CODE) REFERENCES employee(EMP_CODE),
    CONSTRAINT pd_drm_code_fk FOREIGN KEY(PD_DRM_CODE) REFERENCES drama(DRM_CODE)
    );

INSERT INTO part_drama (PD_EMP_CODE, PD_DRM_CODE, PD_EMP_ROLE, PD_EMP_FEE) VALUES
                                                                               ('E003', 'DRM02', '주연', 13500),
                                                                               ('E001', 'DRM02', '조연', 7500),
                                                                               ('E004', 'DRM02', '단역', 3500),
                                                                               ('E001', 'DRM05', '주역', 7500),
                                                                               ('E004', 'DRM05', '단연', 0),
                                                                               ('E002', 'DRM05', '단역', 0),
                                                                               ('E002', 'DRM08', '조연', 6500),
                                                                               ('E003', 'DRM10', '주연', 15000);

-- 음반
CREATE TABLE IF NOT EXISTS music (
                                     MSC_CODE   VARCHAR(5)  PRIMARY KEY,
    MSC_NAME   VARCHAR(20) NOT NULL,
    MSC_DATE   DATE        NOT NULL,
    MSC_PRICE  INT         NOT NULL,
    MSC_CSF    VARCHAR(2)  NULL
    );

INSERT INTO music (MSC_CODE, MSC_NAME, MSC_DATE, MSC_PRICE, MSC_CSF) VALUES
                                                                         ('MSC01', '소년시대 2013', '2013.01.01', 8000, '싱글'),
                                                                         ('MSC02', '하이퍼주니어 4집', '2013.01.05', 15500, '정규'),
                                                                         ('MSC03', '이승모 연인', '2013.01.31', 7000, '싱글'),
                                                                         ('MSC04', '박장현 사랑', '2013.02.01', 7000, '싱글'),
                                                                         ('MSC05', '김건훈 5집', '2013.02.08', 12500, '정규'),
                                                                         ('MSC06', '원더우먼 봄', '2013.02.28', 9500, '싱글'),
                                                                         ('MSC07', '슈퍼맨 안녕', '2013.03.25', 9500, '싱글'),
                                                                         ('MSC08', '소년시대 4집', '2013.04.01', 13500, '정규'),
                                                                         ('MSC09', '핑키 러브', '2013.04.01', 10500, '싱글'),
                                                                         ('MSC10', '신승모 6집', '2013.04.02', 18500, '정규');

-- 음반 참여 생성
CREATE TABLE IF NOT EXISTS part_music (
                                          PM_MSC_CODE VARCHAR(5) NOT NULL,
    PM_EMP_CODE VARCHAR(4) NOT NULL,
    PM_EMP_ROLE VARCHAR(3) NOT NULL,
    PM_EMP_FEE  INT        NULL,
    PRIMARY KEY(PM_MSC_CODE, PM_EMP_CODE),
    CONSTRAINT pd_emp_code_fk FOREIGN KEY(PM_EMP_CODE) REFERENCES employee(EMP_CODE),
    CONSTRAINT pd_msc_code_fk FOREIGN KEY(PM_MSC_CODE) REFERENCES music(MSC_CODE)
    );

INSERT INTO part_music (PM_EMP_CODE, PM_MSC_CODE, PM_EMP_ROLE, PM_EMP_FEE) VALUES
                                                                               ('E008', 'MSC01', '메인', 8500),
                                                                               ('E007', 'MSC03', '피처링', 1500),
                                                                               ('E003', 'MSC04', '피처링', 1500),
                                                                               ('E008', 'MSC08', '메인', 13500),
                                                                               ('E006', 'MSC10', '메인', 15500);
