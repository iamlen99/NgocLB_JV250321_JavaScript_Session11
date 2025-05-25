function setAccountStorage(account) {
  localStorage.setItem("AccountStorage", JSON.stringify(account));
}

function getAccountStorage() {
  return JSON.parse(localStorage.getItem("AccountStorage") || "[]");
}

function validateEmail(email) {
  const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  return regex.test(email);
}

function validatePassword(password) {
  let errors = [];
  // Check length
  if (password.length < 8) {
    errors.push("Mật khẩu phải có ít nhất 8 ký tự");
  }

  // Check lowercase
  if (!/[a-z]/.test(password)) {
    errors.push("Mật khẩu phải có ít nhất 1 chữ cái thường");
  }

  // Check uppercase
  if (!/[A-Z]/.test(password)) {
    errors.push("Mật khẩu phải có ít nhất 1 chữ cái hoa");
  }
  //Check number
  if (!/[0-9]/.test(password)) {
    errors.push("Mật khẩu phải có ít nhất 1 chữ số");
  }

  // Check special character
  if (!/[!@#$%&?]/.test(password)) {
    errors.push("Mật khẩu phải có ít nhất 1 ký tự đặc biệt (!@#$%&?)");
  }
  if (errors.length > 0) {
    alert(errors.join("\n"));
    return false;
  }
  return true;
}

function checkValidateInput(event) {
  event.preventDefault();
  let emailValue = document.getElementById("email").value.trim();
  let passwordValue = document.getElementById("password").value.trim();
  let confirmPasswordValue = document
    .getElementById("confirm-password")
    .value.trim();
  if (emailValue === "") {
    alert("Email không được bỏ trống");
    return;
  }
  if (passwordValue === "") {
    alert("Mật khẩu không được bỏ trống");
    return;
  }
  if (passwordValue !== confirmPasswordValue) {
    alert("Mật khẩu không trùng khớp");
    return;
  }

  if (!validateEmail(emailValue)) {
    alert("Email không hợp lệ!");
    return;
  }

  let accountList = getAccountStorage();
  let index = accountList.findIndex((obj) => obj.email === emailValue);
  if (index !== -1) {
    alert("Email đã tồn tại!");
    return;
  }

  if (!validatePassword(passwordValue)) {
    return;
  }

  let newAccount = {
    email: emailValue,
    password: passwordValue,
  };

  accountList.push(newAccount);
  setAccountStorage(accountList);
  alert("Đăng kí thành công!");
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirm-password").value = "";
}

let registerButton = document.getElementById("register-button");
registerButton.addEventListener("click", checkValidateInput);
