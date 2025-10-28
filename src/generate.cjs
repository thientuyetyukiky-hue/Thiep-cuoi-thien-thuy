const fs = require("fs");
const path = require("path");

// Đọc danh sách tên khách
const names = fs.readFileSync("src/tenkhach.txt", "utf8")
  .split("\n")
  .map(n => n.trim())
  .filter(n => n.length > 0);

// Đọc template HTML
const template = fs.readFileSync("index.html", "utf8");

// Tạo thư mục output nếu chưa có
if (!fs.existsSync("output")) {
  fs.mkdirSync("output");
}

// Hàm tạo slug (link thân thiện)
function toSlug(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
}

// Sinh từng file thiệp
names.forEach(name => {
  const html = template.replace("Tên khách", name);
  const filename = `${toSlug(name)}.html`;
  fs.writeFileSync(path.join("output", filename), html);
  console.log(`✅ Đã tạo: ${filename}`);
});

console.log(`\nTổng cộng: ${names.length} thiệp đã được tạo!`);

// Copy thư mục ảnh (nếu có)
fs.cpSync("images", "output/images", { recursive: true });
fs.cpSync("src", "output/src", { recursive: true });