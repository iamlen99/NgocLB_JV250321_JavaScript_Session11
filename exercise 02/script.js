// let courses = [
//   {
//     id: 1,
//     content: "Learn Javascript Session 01",
//     dueDate: "2023-04-17",
//     status: "Pending",
//     assignedTo: "Anh Bách",
//   },

//   {
//     id: 2,
//     content: "Learn Javascript Session 02",
//     dueDate: "2023-04-17",
//     status: "Pending",
//     assignedTo: "Lâm",
//   },

//   {
//     id: 3,
//     content: "Learn CSS Session 01",
//     dueDate: "2023-04-17",
//     status: "Pending",
//     assignedTo: "Hiếu Ci ớt ớt",
//   },
// ];

let courses = JSON.parse(localStorage.coursesDB || "[]");
let edittingId = null;

function showCourses() {
  let myTasks = document.getElementById("myTasks");
  let showCourses = "";
  for (let index in courses) {
    let tr = `
          <tr>
            <td>${+index + 1}</td>
            <td>${courses[index].content}</td>
            <td>${courses[index].dueDate}</td>
            <td>${courses[index].status}</td>
            <td>${courses[index].assignedTo}</td>
            <td>
              <button class="edit-btn" onclick = "editCourse(${
                courses[index].id
              })">Sửa</button>
              <button class="delete-btn" onclick = "deleteCourse (${
                courses[index].id
              })">Xóa</button>
            </td>
          </tr>
    `;
    showCourses += tr;
  }
  myTasks.innerHTML = showCourses;
}

function addOrEditCourse() {
  let courseContent = document.getElementById("content");
  let courseDueDate = document.getElementById("date");
  let courseStatus = document.getElementById("status");
  let courseUsername = document.getElementById("username");
  if (courseContent.value.trim() === "") {
    alert("Nội dung khóa học không được để trống!");
    return;
  }
  if (courseDueDate.value.trim() === "") {
    alert("Thời hạn khóa học không được để trống!");
    return;
  }
  if (courseStatus.value === "") {
    alert("Tình trạng khóa học không được để trống!");
    return;
  }
  if (courseUsername.value.trim() === "") {
    alert("Tên người dùng không được để trống!");
    return;
  }

  if (edittingId === null) {
    let newCourse = {
      id: Date.now(),
      content: courseContent.value,
      dueDate: courseDueDate.value,
      status: courseStatus.value,
      assignedTo: courseUsername.value,
    };
    courses.push(newCourse);
  } else {
    let index = courses.findIndex((course) => course.id === edittingId);
    if (index !== -1) {
      courses[index].content = courseContent.value.trim();
      courses[index].dueDate = courseDueDate.value.trim();
      courses[index].status = courseStatus.value.trim();
      courses[index].assignedTo = courseUsername.value.trim();

      edittingId = null;
      document.getElementById("submit-btn").textContent = "Submit";
    }
  }

  showCourses();
  localStorage.coursesDB = JSON.stringify(courses);
  courseContent.value = "";
  courseDueDate.value = "";
  courseStatus.value = "";
  courseUsername.value = "";
}

function editCourse(id) {
  let editCourse = courses.find((course) => course.id === id);
  if (!editCourse) return;
  document.getElementById("content").value = editCourse.content;
  document.getElementById("date").value = editCourse.dueDate;
  document.getElementById("status").value = editCourse.status;
  document.getElementById("username").value = editCourse.assignedTo;

  edittingId = editCourse.id;
  document.getElementById("submit-btn").textContent = "Update";
}

function deleteCourse(id) {
  if (confirm("Bạn có chắc chắn muốn xóa khóa học này không?")) {
    courses = courses.filter((course) => course.id !== id);
    showCourses();
    alert("Đã xóa khóa học thành công");
    localStorage.coursesDB = JSON.stringify(courses);
  }
}

let taskManagementForm = document.getElementById("task-management-form");
taskManagementForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addOrEditCourse();
});

showCourses();
