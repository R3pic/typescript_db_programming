\c exercise

CREATE TABLE student (
    no          VARCHAR(8) NOT NULL PRIMARY KEY,
    name        VARCHAR(4) NOT NULL,
    birthday    DATE
);

INSERT INTO public.student (no, name, birthday) VALUES ('20110101', '홍길동', '1990-03-01');
INSERT INTO public.student (no, name, birthday) VALUES ('20110301', '황진이', '1991-02-28');
INSERT INTO public.student (no, name, birthday) VALUES ('20110201', '일지매', '1991-01-31');