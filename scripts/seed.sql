USE roster_rocket_db;
-- USER LIST --
INSERT INTO Users(
    isAdmin,
    createdAt,
    updatedAt,
    email,
    name,
    phone,
    password,
    img
  )
VALUES
  (
    true,
    now(),
    now(),
    "blah1@blah.com",
    "Adam Anderson",
    "555-1212",
    "$2a$10$JaQb7W6/Rwi5yQJTmPEYCOYh8Qdkf6VcRYLhyai8eeTOStq5piPkG",
    "https://via.placeholder.com/150"
  ),
  (
    false,
    now(),
    now(),
    "blah2@blah.com",
    "Brian Boyd",
    "555-1213",
    "$2a$10$JaQb7W6/Rwi5yQJTmPEYCOYh8Qdkf6VcRYLhyai8eeTOStq5piPkG",
    "https://via.placeholder.com/150"
  ),
  (
    false,
    now(),
    now(),
    "blah3@blah.com",
    "Chris Cousins",
    "555-1214",
    "$2a$10$JaQb7W6/Rwi5yQJTmPEYCOYh8Qdkf6VcRYLhyai8eeTOStq5piPkG",
    "https://via.placeholder.com/150"
  );
-- STUDENTS LIST --
INSERT INTO Students (name, age, createdAt, updatedAt, ParentId)
VALUES
  ("Adam Jones", 13, now(), now(), 1),
  -- 1
  ("Bruce Davis", 14, now(), now(), 2),
  -- 2
  ("Cindy Davis", 12, now(), now(), 2),
  -- 3
  ("Danny Davis", 11, now(), now(), 2),
  -- 4
  ("Eddie Davis", 10, now(), now(), 2),
  -- 5
  ("Fiona Davis", 9, now(), now(), 2),
  -- 6
  ("Greg Gulp", 10, now(), now(), 3);
-- 7
  -- COURSE LIST --
INSERT INTO Courses(
    title,
    location,
    cost,
    capacity,
    createdAt,
    updatedAt,
    TeacherId
  )
VALUES
  ("Algebra", "Room 2", 100, 10, now(), now(), 1),
  -- 1
  ("English", "Room 3", 50, 8, now(), now(), 2),
  -- 2
  ("History", "Room 12", 75, 15, now(), now(), null),
  -- 3
  (
    "Pre-calculus",
    "Room 1",
    100,
    15,
    now(),
    now(),
    null
  );
-- 4
INSERT INTO StudentCourses(CourseId, StudentId, paid, createdAt, updatedAt)
VALUES
  (1, 1, true, now(), now()),
  -- 1
  (1, 2, false, now(), now()),
  -- 2
  (2, 1, false, now(), now()),
  -- 3
  (2, 2, true, now(), now()),
  -- 4
  (3, 1, false, now(), now()),
  -- 5
  (3, 2, false, now(), now()),
  (1, 7, false, now(), now());
-- 6
INSERT INTO Codes(code, createdAt, updatedAt)
VALUES
  (123456, now(), now());
SELECT
  *
FROM Users;
-- SELECT * FROM Students;
  -- SELECT * FROM Courses;
  -- SELECT * FROM StudentCourses;
  -- SELECT * FROM Students
  -- JOIN USERS ON Users.id = Students.ParentId
  -- WHERE Students.age < 13;