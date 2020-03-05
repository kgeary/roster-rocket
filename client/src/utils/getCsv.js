function addLine(arr, ...params) {
  arr.push(params.join(","));
}

function getCsv(courses) {
  let lines = [];
  courses.forEach((course) => {
    addLine(lines, "Class", "Location", "Cost", "# Enrolled", "Max Size", "Teacher Name", "Teacher Phone");
    addLine(lines, course.title, course.location, course.cost, course.Students.length, course.capacity, course.User ? course.User.name : "Not Assigned", course.User ? course.User.phone : "N/A");
    addLine(lines, ""); // Separator Line
    if (course.Students.length > 0) {
      addLine(lines, "Student", "Name", "Age", "Parent", "Parent Phone");
    } else {
      addLine(lines, "No Students");
    }
    course.Students.forEach((student, index) => {
      addLine(lines, (index + 1).toString(), student.name, student.age, student.User.name, student.User.phone);
    })
    addLine(lines, ""); // Separator Line
    addLine(lines, ""); // Separator Line
    addLine(lines, ""); // Separator Line
  });
  return lines.join("\r\n");
}

export default getCsv;