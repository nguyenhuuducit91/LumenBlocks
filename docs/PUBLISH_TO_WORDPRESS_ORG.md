# Hướng dẫn đưa Lumen Blocks lên WordPress.org Plugin Directory

Tài liệu này viết riêng cho plugin trong thư mục `lumen-blocks/`. Mỗi bước đều ghi
rõ lệnh cần chạy và những chỗ **hiện tại chưa đạt** cần sửa trước khi nộp.

Tổng thời gian thực tế: chuẩn bị 1–2 ngày, review của WordPress.org thường
**2 tuần đến 2 tháng** cho lần nộp đầu tiên (plugin lớn / plugin là fork thường lâu hơn).

---

## Bước 0 — Hiểu quy trình

```
Sửa readme + code cho đúng guideline
        ↓
Build ZIP (build/lumen-blocks.zip)
        ↓
Chạy Plugin Check (PCP) → sửa hết ERROR
        ↓
Upload tại wordpress.org/plugins/developers/add/
        ↓
Email tự động xác nhận → chờ reviewer
        ↓
Reviewer gửi email (thường có yêu cầu sửa) → sửa → gửi ZIP mới qua email
        ↓
Được duyệt → nhận quyền SVN → commit code lần đầu
        ↓
Upload assets (icon, banner, screenshot) → plugin xuất hiện public sau ~1–24h
```

Quan trọng: **chỉ upload ZIP một lần duy nhất**. Sau đó mọi trao đổi và bản sửa
đều qua email `plugins@wordpress.org` (trả lời đúng thread, đính kèm ZIP mới).

---

## Bước 1 — Tài khoản WordPress.org

1. Đăng ký tại https://login.wordpress.org/register (nếu chưa có).
   - Username này sẽ là **Contributor** của plugin, không đổi được sau đó.
2. Vào https://profiles.wordpress.org/me/profile/edit/ điền tên hiển thị, website.
3. Bật 2FA (khuyến nghị, sắp thành bắt buộc với committer):
   Account → Two-Factor. **Khi bật 2FA, mật khẩu SVN phải tạo riêng** tại
   Account → *SVN password*. Mật khẩu đăng nhập sẽ không dùng được cho SVN nữa.

---

## Bước 2 — Sửa `readme.txt` (bắt buộc, hiện đang thiếu)

File: [lumen-blocks/readme.txt](lumen-blocks/readme.txt)

### 2.1. Thiếu `Contributors:` — sẽ bị reviewer nhắc

Header hiện tại bắt đầu bằng `Tags:`. Phải bổ sung dòng đầu:

```
=== Lumen Blocks ===
Contributors: <username-wordpress-org-cua-ban>
Tags: blocks, gutenberg, page builder, block editor, patterns
Requires at least: 6.8
Tested up to: 7.0
Stable tag: 1.0.0
Requires PHP: 7.4
License: GPLv3 or later
License URI: https://www.gnu.org/licenses/gpl-3.0.html
```

Lưu ý sửa kèm:
- `Tags:` **tối đa 5 tag**, và không nên nhồi từ trùng lặp ("gutenberg" +
  "gutenberg blocks" + "WordPress blocks" bị coi là keyword stuffing).
- `Requires at least` / `Tested up to` nên ghi phiên bản **major.minor**
  (`6.8`, `7.0`), không ghi `6.8.2` / `7.0.2`.
- `Stable tag` phải trùng đúng `Version:` trong [lumen-blocks.php](lumen-blocks/lumen-blocks.php#L6).

### 2.2. Thiếu mục "External services" — đây là lỗi bị từ chối phổ biến nhất

Plugin có gọi ra dịch vụ ngoài, đã kiểm tra thấy:

| Dịch vụ | Nơi dùng | Dữ liệu gửi đi |
|---|---|---|
| Google Fonts (`fonts.googleapis.com`) | `src/fonts.php` — nạp font cho block | IP người truy cập, user-agent |
| Google Maps (`maps.googleapis.com`) | block Map | IP người truy cập |
| Unsplash (`source.unsplash.com`) | ảnh placeholder trong editor | IP người dùng admin |
| Design Library CDN | `LUMEN_DESIGN_LIBRARY_URL` (mặc định rỗng) | chỉ khi người dùng tự cấu hình |

Thêm vào cuối `readme.txt` (trước `== Changelog ==`) một mục như sau, sửa lại
cho khớp thực tế và **kèm link Terms/Privacy của từng dịch vụ**:

```
== External services ==

This plugin connects to the following third-party services.

**Google Fonts** – used to load web fonts selected in the block typography settings.
The visitor's browser requests the font files from fonts.googleapis.com, which
transmits the visitor IP address and user agent to Google.
Terms: https://policies.google.com/terms — Privacy: https://policies.google.com/privacy

**Google Maps** – only loaded when the Map block is used on a page. …

**Unsplash** – placeholder images shown inside the block editor. …

**Design Library CDN** – disabled by default. Patterns are fetched only after the
site owner defines the LUMEN_DESIGN_LIBRARY_URL constant or the
lumen_design_library_url filter. No data is sent unless configured.
```

### 2.3. Thêm mục Screenshots (tùy chọn nhưng nên có)

```
== Screenshots ==

1. Bộ block hiển thị trong inserter của Block Editor
2. Màn hình Global Settings
3. Design Library
```

Số thứ tự phải khớp file `screenshot-1.png`, `screenshot-2.png`… ở Bước 7.

### 2.4. Kiểm tra readme

Dán nội dung vào https://wordpress.org/plugins/developers/readme-validator/ →
phải không còn lỗi.

---

## Bước 3 — Rà soát tuân thủ Plugin Guidelines

Guideline đầy đủ: https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/

Trạng thái hiện tại của plugin này:

| Mục | Trạng thái | Ghi chú |
|---|---|---|
| License GPL-3.0 (tương thích GPL) | ✅ | có `LICENSE`, header khớp |
| Prefix riêng `lumen_` / `LUMEN_` | ✅ | không đụng namespace plugin khác |
| Text domain = slug (`lumen-blocks`) | ✅ | |
| Không có tracking/telemetry ngầm | ✅ | PostHog đã bị loại khỏi build |
| Không tải code từ xa (remote code) | ✅ | Design Library chỉ tải JSON pattern |
| Không có "powered by" link ngoài | ⚠️ kiểm tra lại footer/dashboard |
| Fork của Stackable, có `NOTICE.md` | ⚠️ xem 3.1 |
| Mã JS/CSS đã minify trong `dist/` | ⚠️ xem 3.2 |
| Escape/sanitize/nonce | ⚠️ xem 3.3 |

### 3.1. Vì đây là fork của Stackable

Reviewer sẽ soi kỹ. Cần đảm bảo:
- **Không dùng tên/logo/branding "Stackable"** ở tên plugin, slug, tags, banner,
  icon, screenshot. Chỉ giữ phần ghi công dạng văn bản trong `== Credits ==`
  và `NOTICE.md` — điều này là bắt buộc theo GPL, và đang làm đúng.
- Không sao chép nguyên trang mô tả / assets của plugin gốc.
- Nếu reviewer hỏi, trả lời rõ: fork hợp pháp theo GPL-3.0-or-later, đã liệt kê
  thay đổi trong `NOTICE.md`.

### 3.2. Mã đã build (bắt buộc phải khai báo source)

Gói ZIP chỉ chứa `dist/*.js` đã minify. WordPress.org **không cho phép** ship
mã compiled mà không có nguồn. Hai cách hợp lệ, chọn một:

- **Cách A (khuyến nghị):** đẩy source lên một repo công khai (GitHub/GitLab)
  rồi ghi vào `readme.txt`:

  ```
  == Development ==

  Source code (unminified JavaScript/SCSS) and build instructions:
  https://github.com/<user>/lumen-blocks
  Build with: npm ci && npm run build:no-translate
  ```

- **Cách B:** thêm thư mục `src/` (JS/SCSS gốc) vào gói ZIP bằng cách sửa
  `buildInclude` trong [gulpfile.js:27-43](lumen-blocks/gulpfile.js#L27-L43).
  Cách này làm ZIP nặng thêm đáng kể.

### 3.3. Quét bảo mật trước khi nộp

```bash
cd lumen-blocks
# PHPCS theo chuẩn WordPress (đã có phpcs.xml.dist)
composer install
./vendor/bin/phpcs --standard=phpcs.xml.dist src lumen-blocks.php
```

Reviewer sẽ chặn nếu thấy: `$_POST`/`$_GET` không `sanitize_*`, output không
`esc_html`/`esc_attr`/`wp_kses_post`, AJAX/REST không kiểm tra `current_user_can`
+ nonce, SQL không dùng `$wpdb->prepare()`.

---

## Bước 4 — Build gói ZIP để nộp

```bash
cd /media/vietis/DATA_ME/PROJECT_ME/WordpressPlugin/lumen-blocks

# 1. Cài dependency sạch
npm ci

# 2. Build (dùng build:no-translate — script "build" đầy đủ cần thư mục
#    pro__premium_only vốn không tồn tại trong bản free này)
npm run build:no-translate
```

Kết quả:

```
build/lumen-blocks/        ← thư mục plugin sạch
build/lumen-blocks.zip     ← file nộp (~1.8 MB)
```

### Kiểm tra ZIP trước khi nộp

```bash
# Không được có node_modules, .git, .map, .env, file dev
unzip -l build/lumen-blocks.zip | grep -Ei "node_modules|\.git|\.map|\.env|\.DS_Store"   # phải rỗng

# Thư mục gốc trong zip phải đúng tên slug
unzip -l build/lumen-blocks.zip | head -20   # mọi path bắt đầu bằng lumen-blocks/

# Version phải khớp nhau
grep -m1 "Version:" build/lumen-blocks/lumen-blocks.php
grep -m1 "Stable tag" build/lumen-blocks/readme.txt
```

---

## Bước 5 — Chạy Plugin Check (bắt buộc, tự làm trước khi reviewer làm)

Đây chính là công cụ team review dùng.

```bash
# Trên một site WordPress sạch (local): cài plugin Lumen Blocks vừa build,
# rồi cài thêm plugin "Plugin Check" của WordPress.org
wp plugin install plugin-check --activate
wp plugin install /duong/dan/build/lumen-blocks.zip
wp plugin check lumen-blocks
```

Hoặc dùng giao diện: **Tools → Plugin Check** → chọn Lumen Blocks → Check it.

Nguyên tắc: **phải sửa hết ERROR**. WARNING nên sửa; cái nào cố tình giữ thì
chuẩn bị sẵn giải thích cho reviewer.

Test thêm thủ công trên WP sạch:
- Kích hoạt / hủy kích hoạt / xóa plugin — không lỗi PHP.
- Bật `WP_DEBUG` + `WP_DEBUG_LOG`, dùng thử vài block — log không có notice/warning.
- Thử với PHP 7.4 (bản tối thiểu đã khai báo) và PHP mới nhất.

---

## Bước 6 — Nộp plugin

1. Vào https://wordpress.org/plugins/developers/add/ (phải đăng nhập).
2. Upload `build/lumen-blocks.zip`.
3. Hệ thống tự đọc `Plugin Name: Lumen Blocks` → đề xuất slug `lumen-blocks`.
   **Slug không đổi được về sau** — kiểm tra kỹ trước khi bấm gửi.
   Nếu slug `lumen-blocks` đã bị chiếm, phải đổi tên plugin.
4. Nhận email xác nhận "You have submitted…". Từ giờ chỉ trả lời qua email đó.
5. Reviewer trả lời:
   - **Approved** → sang Bước 7.
   - **Cần sửa** → sửa code, build lại ZIP, **reply đúng email thread** kèm ZIP mới
     và mô tả ngắn gọn đã sửa gì. Không nộp lại qua form.

Mẹo rút ngắn: trong lần trả lời đầu tiên, chủ động nói rõ (a) plugin là fork
GPL-3.0 của Stackable, đã ghi công trong NOTICE.md; (b) link repo chứa source
chưa minify; (c) danh sách dịch vụ ngoài đã khai trong readme.

---

## Bước 7 — Commit lần đầu qua SVN (sau khi được duyệt)

Email approval sẽ cho URL dạng `https://plugins.svn.wordpress.org/lumen-blocks/`.

```bash
cd ~/
svn checkout https://plugins.svn.wordpress.org/lumen-blocks/ lumen-blocks-svn --username <wporg-user>
cd lumen-blocks-svn
```

Cấu trúc SVN:

```
lumen-blocks-svn/
├── assets/     ← icon, banner, screenshot (KHÔNG nằm trong plugin)
├── branches/   ← không dùng
├── tags/       ← mỗi bản phát hành 1 thư mục: tags/1.0.0/
└── trunk/      ← code mới nhất
```

### 7.1. Đưa code vào trunk

```bash
rsync -a --delete \
  /media/vietis/DATA_ME/PROJECT_ME/WordpressPlugin/lumen-blocks/build/lumen-blocks/ \
  ./trunk/

svn add --force trunk/* --auto-props --parents --depth infinity -q
# Xóa khỏi SVN những file đã bị gỡ ở bản build mới
svn status | grep '^!' | awk '{print $2}' | xargs -r svn rm
```

### 7.2. Assets (icon / banner / screenshot)

Đặt vào `assets/`, đúng tên file:

| File | Kích thước | Bắt buộc |
|---|---|---|
| `icon-256x256.png` | 256×256 | nên có |
| `icon-128x128.png` | 128×128 | nên có |
| `banner-772x250.png` | 772×250 | nên có |
| `banner-1544x500.png` | 1544×500 | tùy chọn (retina) |
| `screenshot-1.png` … | tự do, ~1200px ngang | khớp mục Screenshots trong readme |

```bash
svn add assets/* --force
```

### 7.3. Commit + tạo tag phát hành

```bash
svn ci -m "Initial release: Lumen Blocks 1.0.0" --username <wporg-user>

# Tạo tag từ trunk (đây mới là thứ quyết định bản người dùng tải về)
svn cp trunk tags/1.0.0
svn ci -m "Tagging version 1.0.0" --username <wporg-user>
```

`Stable tag: 1.0.0` trong `readme.txt` trỏ tới `tags/1.0.0` → WordPress.org phát
hành bản đó. Sau 5–30 phút trang https://wordpress.org/plugins/lumen-blocks/ sẽ live.

> Nếu bật 2FA: `--username` là username wp.org, nhưng password phải là **SVN
> password** tạo ở Bước 1.3.

---

## Bước 8 — Phát hành phiên bản mới (lần sau)

1. Tăng version ở **3 chỗ**, phải khớp nhau:
   - [lumen-blocks.php](lumen-blocks/lumen-blocks.php#L6) → `Version: 1.0.1`
   - [readme.txt](lumen-blocks/readme.txt) → `Stable tag: 1.0.1`
   - [package.json](lumen-blocks/package.json#L3) → `"version": "1.0.1"`
2. Thêm mục changelog mới ở đầu `== Changelog ==`.
3. `npm run build:no-translate`
4. rsync vào `trunk/`, `svn ci -m "Version 1.0.1"`.
5. `svn cp trunk tags/1.0.1 && svn ci -m "Tagging version 1.0.1"`

Chỉ sửa readme/assets (không đổi code)? Sửa trong `trunk` **và** trong thư mục
`tags/<version>` đang phát hành, rồi commit — không cần tạo tag mới.

---

## Bước 9 — Những lỗi hay bị reviewer trả về (và cách tránh)

| Lỗi | Cách xử lý |
|---|---|
| Thiếu khai báo external services | Bước 2.2 |
| Ship mã minify không có source | Bước 3.2 |
| Output không escape / input không sanitize | Bước 3.3 |
| Thiếu nonce + `current_user_can` ở AJAX/REST/form admin | Rà `src/**/*.php` |
| Dùng `file_get_contents()` với URL thay vì `wp_remote_get()` | Đổi sang HTTP API |
| Tự nạp thư viện JS đã có trong core (React, jQuery…) | Dùng handle của core |
| Prefix hàm/hằng/option quá chung chung | Đang OK (`lumen_` / `LUMEN_`) |
| Tag readme quá 5 / nhồi từ khóa | Bước 2.1 |
| Tên/branding trùng thương hiệu bên thứ ba | Bước 3.1 |
| Tạo bảng DB / ghi file ngoài `uploads` mà không cần thiết | Giải thích rõ hoặc bỏ |

---

## Checklist cuối trước khi bấm Upload

- [ ] `readme.txt` có `Contributors:` với đúng username wp.org
- [ ] `Tags:` ≤ 5, không nhồi từ khóa
- [ ] `Stable tag` == `Version:` trong file PHP == `package.json`
- [ ] Có mục `== External services ==` liệt kê Google Fonts / Maps / Unsplash / Design Library CDN
- [ ] Readme validator không báo lỗi
- [ ] Có link repo source (hoặc đã đóng gói kèm `src/` chưa minify)
- [ ] `npm run build:no-translate` chạy sạch, ZIP ~1.8 MB
- [ ] ZIP không chứa `node_modules`, `.git`, `.map`, `.env`
- [ ] Plugin Check: 0 ERROR
- [ ] Kích hoạt/gỡ trên WP sạch với `WP_DEBUG` bật: không notice/warning
- [ ] `NOTICE.md` + `== Credits ==` ghi rõ nguồn gốc fork từ Stackable
- [ ] Không còn bất kỳ chuỗi branding nào của plugin gốc trong UI/assets

---

## Liên kết tham khảo

- Guidelines: https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/
- Nộp plugin: https://wordpress.org/plugins/developers/add/
- Readme validator: https://wordpress.org/plugins/developers/readme-validator/
- Hướng dẫn SVN: https://developer.wordpress.org/plugins/wordpress-org/how-to-use-subversion/
- Assets/ảnh: https://developer.wordpress.org/plugins/wordpress-org/plugin-assets/
- Plugin Check: https://wordpress.org/plugins/plugin-check/
