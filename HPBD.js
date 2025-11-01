const EMAIL_SERVICE_ID = "service_3yg5oxl";
const EMAIL_TEMPLATE_ID = "template_onhp93b";
const EMAIL_PUBLIC_KEY = "BN3XgI_HJGo8Sqri9";

emailjs.init(EMAIL_PUBLIC_KEY);

const container = document.getElementById("main-container");
const popup = document.getElementById("popup");
const popupMsg = document.getElementById("popup-message");
const popupOk = document.getElementById("popup-ok");
const nextBtn = document.getElementById("next-btn");

let userName = "", userEmail = "", userDOB = "";

function showPopup(msg, cb) {
  popupMsg.textContent = ""; 
  popupMsg.innerHTML = msg.replace(/\n/g, "<br>"); 
  popup.classList.remove("hidden");
  popupOk.onclick = () => {
    popup.classList.add("hidden");
    if (cb) cb();
  };
}


function sendBirthdayEmail() {
  const params = { email: userEmail };
  emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, params)
    .then(() => console.log("🎈 Email gửi thành công!"))
    .catch(err => console.error("Lỗi gửi email:", err));
}

nextBtn.addEventListener("click", handleNameStep);
document.addEventListener("keydown", e => {
  if (e.key === "Enter" && document.getElementById("name")) handleNameStep();
});

function handleNameStep() {
  userName = document.getElementById("name").value.trim();
  if (userName !== "Đặng Kim Ngân") {
    showPopup("Ồ, có vẻ bạn không phải là người được chọn 😅");
    return;
  }
  showEmailForm();
}

function showEmailForm() {
  container.innerHTML = `
    <h1>💌 Nhập Email</h1>
    <input type="email" id="email" placeholder="Nhập email..." />
    <div class="btn-group">
      <button id="back-name">⬅ Quay lại</button>
      <button id="email-btn">Tiếp tục</button>
    </div>
  `;

  document.getElementById("back-name").onclick = () => location.reload();
  document.getElementById("email-btn").onclick = handleEmailStep;
  document.addEventListener("keydown", e => {
    if (e.key === "Enter" && document.getElementById("email")) handleEmailStep();
  });
}

function handleEmailStep() {
  userEmail = document.getElementById("email").value.trim();
  if (userEmail !== "ngandang.dn@gmail.com") {
    showPopup("U sure?");
    return;
  }
  showDOBForm();
}

function showDOBForm() {
  container.innerHTML = `
    <h1>📅 Nhập Ngày Sinh</h1>
    <input type="date" id="dob" />
    <div class="btn-group">
      <button id="back-email">⬅ Quay lại</button>
      <button id="dob-btn">Xác nhận</button>
    </div>
  `;

  document.getElementById("back-email").onclick = showEmailForm;
  document.getElementById("dob-btn").onclick = handleDOBStep;
  document.addEventListener("keydown", e => {
    if (e.key === "Enter" && document.getElementById("dob")) handleDOBStep();
  });
}

function handleDOBStep() {
  userDOB = document.getElementById("dob").value;
  if (userDOB !== "2004-11-02") {
    showPopup("R u sure about that?");
    return;
  }

  showPopup(
    "Ồ, hóa ra hôm nay là sinh nhật của bạn sao. Vậy thì phải làm cho hôm nay trở thành 1 ngày đáng nhớ nào\nTuổi mới nhiều điều mới, mong bạn hãy bỏ đi những điều không tốt đẹp và luôn tiến về phía trước. Đừng quá lo lắng, có gì khó khăn cứ alo t nhé(sẽ nghe) \nChúc bạn Ngân luôn giữ nụ cười trên môi, luôn gặp mọi điều may mắn, luôn thành công trên mọi quãng đường đi qua, và luôn mạnh mẽ để đương đầu mọi khó khăn \nChúc bạn, à chúc mừng bạn dã trúng 2 lượt quay may mắn, đi đến vòng quay thôi",
    () => {
      window.location.href = `spin.html?name=${encodeURIComponent(userName)}&email=${encodeURIComponent(userEmail)}&dob=${encodeURIComponent(userDOB)}`;
    }
  );
}
