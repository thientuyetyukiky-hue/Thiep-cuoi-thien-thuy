document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.anh-cuoi, .anh-cuoi2, .anh-cuoi3, .anh-cuoi4');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show'); // thêm class hiệu ứng
        observer.unobserve(entry.target);   // chỉ chạy 1 lần
      }
    });
  }, { threshold: 0.2 });

  images.forEach(img => observer.observe(img));
});




//Xác nhận tham dự
  const form = document.getElementById("rsvpForm");
  const status = document.getElementById("status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      ten: form.ten.value,
      thamdu: form.thamdu.value,
      loichuc: form.loichuc.value
    };

    try {
      const response = await fetch("http://localhost:3000/gui-xac-nhan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error("Server trả lỗi " + response.status);
      const result = await response.text();

      console.log("✅ Server trả về:", result);
      status.textContent = result;
      form.reset();
    } catch (err) {
      console.error("❌ Lỗi gửi dữ liệu:", err);
      status.textContent = "Gửi thất bại, vui lòng thử lại.";
    }
  });


  // -------------------- Hộp mừng cưới --------------------
  const openPopup = document.getElementById('openPopup');
  const popup = document.getElementById('popup');
  const closePopup = document.getElementById('closePopup');

  openPopup.addEventListener('click', () => {
    popup.style.display = 'flex';
  });

  closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  // Bấm ngoài popup để đóng
  window.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.style.display = 'none';
    }
  });