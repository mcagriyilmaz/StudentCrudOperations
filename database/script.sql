create table STUDENTS
(
    FIRSTNAME   VARCHAR(40),
    LASTNAME    VARCHAR(40),
    PHONE       VARCHAR(20),
    ID          INTEGER identity
        constraint "STUDENTS_pk"
            primary key,
    CITY        VARCHAR(20),
    DISTRICT    VARCHAR(50),
    DESCRIPTION VARCHAR(200)
);


