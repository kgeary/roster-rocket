USE roster_rocket_db;
-- USER LIST --
INSERT INTO Users(
    isAdmin,
    createdAt,
    updatedAt,
    email,
    name,
    phone,
    password
    
  )
VALUES
  (
    true,
    now(),
    now(),
    "blah1@blah.com",
    "Adam Anderson",
    "555-1212",
    "$2a$10$JaQb7W6/Rwi5yQJTmPEYCOYh8Qdkf6VcRYLhyai8eeTOStq5piPkG"
  ),
  (
    false,
    now(),
    now(),
    "blah2@blah.com",
    "Brian Boyd",
    "555-1213",
    "$2a$10$JaQb7W6/Rwi5yQJTmPEYCOYh8Qdkf6VcRYLhyai8eeTOStq5piPkG"
  ),
  (
    false,
    now(),
    now(),
    "blah3@blah.com",
    "Chris Cousins",
    "555-1214",
    "$2a$10$JaQb7W6/Rwi5yQJTmPEYCOYh8Qdkf6VcRYLhyai8eeTOStq5piPkG"
  ),
   (
    false,
    now(),
    now(),
    "blah4@blah.com",
    "Denny Davers",
    "555-1215",
    "$2a$10$JaQb7W6/Rwi5yQJTmPEYCOYh8Qdkf6VcRYLhyai8eeTOStq5piPkG"
  ),
   (
    false,
    now(),
    now(),
    "blah5@blah.com",
    "Edgar Easter",
    "555-1216",
    "$2a$10$JaQb7W6/Rwi5yQJTmPEYCOYh8Qdkf6VcRYLhyai8eeTOStq5piPkG"
  ),
   (
    false,
    now(),
    now(),
    "blah6@blah.com",
    "Fatima Fellows",
    "555-1217",
    "$2a$10$JaQb7W6/Rwi5yQJTmPEYCOYh8Qdkf6VcRYLhyai8eeTOStq5piPkG"
  ),
  (
    false,
    now(),
    now(),
    "blah7@blah.com",
    "Georgina Gilroy",
    "555-1218",
    "$2a$10$JaQb7W6/Rwi5yQJTmPEYCOYh8Qdkf6VcRYLhyai8eeTOStq5piPkG"
  ),
   (
    false,
    now(),
    now(),
    "blah8@blah.com",
    "Henrietta Harris",
    "555-1219",
    "$2a$10$JaQb7W6/Rwi5yQJTmPEYCOYh8Qdkf6VcRYLhyai8eeTOStq5piPkG"
  ),
  (
    false,
    now(),
    now(),
    "blah9@blah.com",
    "Isabelle Illes",
    "555-1220",
    "$2a$10$JaQb7W6/Rwi5yQJTmPEYCOYh8Qdkf6VcRYLhyai8eeTOStq5piPkG"
  ),
  (
    false,
    now(),
    now(),
    "blah10@blah.com",
    "Joe Jacoby",
    "555-1221",
    "$2a$10$JaQb7W6/Rwi5yQJTmPEYCOYh8Qdkf6VcRYLhyai8eeTOStq5piPkG"
  ),
   (
    false,
    now(),
    now(),
    "blah11@blah.com",
    "Kelly Kraft",
    "555-1222",
    "$2a$10$JaQb7W6/Rwi5yQJTmPEYCOYh8Qdkf6VcRYLhyai8eeTOStq5piPkG"
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
("Greg Cousins", 10, now(), now(), 3),
-- 7
("Sally Cousins", 12, now(), now(), 3),
-- 8
("Sally Cousins", 14, now(), now(), 3),
-- 9
("Cad Davers", 8, now(), now(), 4),
-- 10
("Emma Easter", 17, now(), now(), 5),
-- 11
("Ernie Easter", 4, now(), now(), 5),
-- 12
("Ethan Easter", 7, now(), now(), 5),
-- 13
("Hank Fellows Jr", 8, now(), now(), 6),
-- 14
("Crystal Fellows", 12, now(), now(), 6),
-- 15
("Joshua Fellows", 14, now(), now(), 6),
-- 16
("Harry Fellows III", 16, now(), now(), 6),
-- 17
("Gregory Fellows", 17, now(), now(), 6),
-- 18
("Hillary Fellows", 11, now(), now(), 6),
-- 19
("Hank Gilroy", 4, now(), now(), 7),
-- 20
("Crystal Gilroy", 5, now(), now(), 7),
-- 21
("Joshua Gilroy", 8, now(), now(), 7),
-- 22
("Harry Gilroy", 10, now(), now(), 7),
-- 23
("Gregory Gilroy", 15, now(), now(), 7),
-- 24
("Hillary Gilroy", 17, now(), now(), 7),
-- 25
("Mark Harris", 6, now(), now(), 8),
-- 26
("Mary Harris", 8, now(), now(), 8),
-- 27
("Elizabeth Harris", 10, now(), now(), 8),
-- 28
("Rachel Harris", 12, now(), now(), 8),
-- 29
("Susie Illes", 2, now(), now(), 9),
-- 30
("Sabrina Illes", 4, now(), now(), 9),
-- 31
("Marcus Illes", 6, now(), now(), 9),
-- 32
("Zeke Jacoby", 14, now(), now(), 10),
-- 33
("Austin Jacoby", 1, now(), now(), 10),
-- 34
("Holly Jacoby", 3, now(), now(), 10),
-- 35
("Jan Jacoby", 4, now(), now(), 10),
-- 36
("Heather Kraft", 2, now(), now(), 11),
-- 37
("Christian Kraft", 5, now(), now(), 11),
-- 38
("Hector Kraft", 8, now(), now(), 11),
-- 39
("Brady Kraft", 12, now(), now(), 11),
-- 40
("Mikey Kraft", 14, now(), now(), 11),
-- 41
("Georgette Kraft", 16, now(), now(), 11),
-- 42
("Riley Kraft", 17, now(), now(), 11);
-- 43

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
  ("Pre-calculus", "Room 1", 100, 15, now(), now(), null),
  -- 4
  ("Climb on the Magic School Bus", "Atrium", 20, 15, now(), now(), null),
  -- 5
  ("Theatre", "Auditorium", 50, 10, now(), now(), null),
  -- 6
   ("DIY Handcrafts", "Cafeteria", 30, 5, now(), now(), null),
  -- 7
  ("Fairy Tale STEM", "Science Room 1", 200, 10, now(), now(), null),
  -- 8
  ("Working with Animals", "Playground", 10, 10, now(), now(), null),
  -- 9
  ("Physiology", "8", 25, 8, now(), now(), null),
  -- 10
  ("Nursery", "Nursery", 5, 50, now(), now(), null);
  -- 11



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