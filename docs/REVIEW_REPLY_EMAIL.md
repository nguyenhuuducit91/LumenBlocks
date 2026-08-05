# Gửi bản build mới cho reviewer WordPress.org

Dùng khi plugin **đang trong vòng review** (chưa được duyệt, chưa có SVN).

Cập nhật: 02/08/2026 — `build/lumen-blocks.zip`, 2.0 MB, version 1.0.0,
Plugin Check 0 ERROR / 0 WARNING.

---

## Quy tắc quan trọng

- **Không nộp lại qua form** https://wordpress.org/plugins/developers/add/ — nộp lần hai
  sẽ tạo một hồ sơ trùng và làm rối hàng đợi.
- **Trả lời vào đúng email thread** của `plugins@wordpress.org` (email xác nhận nộp hoặc
  email reviewer gửi yêu cầu sửa). Giữ nguyên tiêu đề, đính kèm ZIP mới.
- Mỗi lần gửi ZIP mới là reviewer phải đọc lại từ đầu, nên chỉ gửi khi đã chắc chắn.
- Giữ nguyên version **1.0.0**: plugin chưa từng phát hành, nên không có gì để "nâng
  cấp". Tăng số version lúc này chỉ tạo ra 1.0.1, 1.0.2… mà không có bản nào tồn tại
  công khai. Nếu bạn muốn reviewer phân biệt rõ hai file zip, có thể đổi thành 1.0.1
  ở **cả ba chỗ** (`lumen-blocks.php`, `readme.txt` Stable tag, `package.json`) rồi build lại.

---

## File cần đính kèm

```
/media/vietis/DATA_ME/PROJECT_ME/WordpressPlugin/lumen-blocks/build/lumen-blocks.zip
```

2.0 MB, 618 mục, thư mục gốc `lumen-blocks/`, không chứa `node_modules`, `.git`,
`.map`, `.env`. MD5 `8746c6cddb433c7a7c68a51230c336d4` — build lúc 20:57 ngày 02/08/2026.

---

## Trước khi gửi: đồng bộ GitHub

`readme.txt` chỉ reviewer sang https://github.com/nguyenhuuducit91/LumenBlocks để xem
source chưa minify. Nếu repo cũ hơn ZIP thì reviewer sẽ hỏi. Đẩy lại:

```bash
cd /tmp && rm -rf lumen-sync
git clone https://github.com/nguyenhuuducit91/LumenBlocks.git lumen-sync
cd lumen-sync
rsync -a --delete \
  --exclude='.git/' --exclude='node_modules/' --exclude='vendor/' \
  --exclude='dist/' --exclude='build/' \
  /media/vietis/DATA_ME/PROJECT_ME/WordpressPlugin/lumen-blocks/ ./
git add -A
git status --short | head -20   # xem có gì thay đổi
git commit -m "Sync with the build submitted for review"
git push
```

Nếu `git status` không hiện gì thì repo đã khớp, bỏ qua bước này.

---

## Nội dung email

Trả lời vào thread, đính kèm `lumen-blocks.zip`, dán nội dung dưới đây.

> **Lưu ý:** phần "What changed" liệt kê những gì đã sửa **sau** lần nộp đầu tiên. Nếu
> bản zip bạn nộp lúc đầu đã có sẵn các sửa này thì xoá bớt những dòng tương ứng —
> đừng để reviewer thấy bạn liệt kê thứ họ không tìm ra khác biệt.

```
Hello,

Please find an updated build of Lumen Blocks attached. It replaces the zip in my
original submission — everything below is already in this build, so there is
nothing outstanding from my side.

What changed since the zip I first submitted

* A new Container block, and a way to step back out of a nested block: a toolbar
  button that names and selects the parent, plus a trail at the top of the
  sidebar for jumping several levels at once. readme.txt was updated to match.
* Internationalisation: every gettext call in PHP now passes the literal text
  domain 'lumen-blocks' instead of a constant, so the WordPress.org string
  parser can pick the strings up. Placeholders in strings with more than one
  argument are numbered, and every string with placeholders has a translators
  comment.
* Escaping and sanitising: all admin output now goes through esc_html/esc_attr/
  esc_url, superglobals are unslashed and sanitised before use, wp_redirect was
  replaced with wp_safe_redirect, and the FAQ and video JSON-LD is built as an
  array and emitted through wp_json_encode.
* Prefixes: every function, variable and hook the plugin defines in the global
  namespace now starts with lumen_ or LUMEN_.
* Blocks: the legacy block.json files declare apiVersion 3.
* Files: heredoc syntax removed, parse_url replaced with wp_parse_url, files no
  longer use names that collide with libraries bundled in core, and NOTICE.md is
  now NOTICE.txt.
* Scripts and styles are registered with a version and load in the footer.

The build passes Plugin Check (Plugin Repo, Security, Performance and
Accessibility categories) with no errors and no warnings.

Three things you will probably want to check, up front

1. Fork and attribution
Lumen Blocks is a fork of Stackable by Gambit Technologies, Inc., which is
distributed under GPL-3.0-or-later. Lumen Blocks keeps the same licence. The
full list of changes is in NOTICE.txt inside the plugin, the plugin header
points at it, and the Credits section of readme.txt states it as well. No
Stackable branding, naming or assets are used in the plugin or on the plugin
page.

2. Human-readable source
The plugin ships compiled JavaScript in /dist. The unminified JavaScript and
SCSS, along with the build tooling, are public at:
https://github.com/nguyenhuuducit91/LumenBlocks
Build with: npm ci && npm run build:no-translate

3. External services
Every third-party service the plugin can contact is documented in the "External
services" section of readme.txt: Google Fonts, the Google Maps embed and
optional Maps JavaScript API, the Font Awesome icon search API, Unsplash
placeholder images shown in the editor only, and an optional Design Library
endpoint that is empty by default. None of them is contacted unless the
corresponding feature is used. The 70 patterns and 34 page templates that ship
with the plugin are built in and need no connection.

Thank you for your time,
Nguyen Huu Duc
```

---

## Sau khi gửi

- Không gửi thêm email nhắc trong vòng vài tuần — hàng đợi review dài, nhắc nhiều
  không làm nhanh hơn.
- Nếu reviewer yêu cầu sửa tiếp: sửa code → `npm run build:no-translate` → chạy lại
  Plugin Check → đính kèm ZIP mới vào **cùng thread đó**.
- Khi được duyệt: chuyển sang Bước 6 trong
  [NEXT_STEPS_WORDPRESS_ORG.md](NEXT_STEPS_WORDPRESS_ORG.md), chạy
  `./tools/publish-to-wporg.sh --user ducnguyenhuu`.
