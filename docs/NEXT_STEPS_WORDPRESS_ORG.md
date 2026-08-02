# Các bước tiếp theo để đẩy Lumen Blocks lên WordPress.org

Tài liệu này nối tiếp [PUBLISH_TO_WORDPRESS_ORG.md](PUBLISH_TO_WORDPRESS_ORG.md), chỉ ghi
những việc **còn lại**. Phần chuẩn bị mã nguồn đã xong.

Cập nhật: 02/08/2026 — plugin 1.0.0, gói `build/lumen-blocks.zip` (2.0 MB, 615 file).

---

## Trạng thái hiện tại

| Hạng mục | Trạng thái |
|---|---|
| `readme.txt` — Contributors, tags, requires, External services, Development | ✅ xong |
| Quét bảo mật PHPCS (escape / sanitize / nonce / redirect) | ✅ 0 lỗi |
| **Plugin Check** | ✅ **0 ERROR, 0 WARNING** |
| Gói ZIP có thư mục gốc `lumen-blocks/`, không rác | ✅ xong |
| Ghi công GPL cho Stackable (NOTICE.txt, header, About, Credits) | ✅ xong |
| Source công khai trên GitHub | ✅ đã đẩy (8 commits, có `NOTICE.txt`, `lumen_is_frontend`, text domain literal) |
| Ảnh screenshot / icon / banner | ✅ 9 file trong [docs/assets/wporg/](assets/wporg/) |
| Test lại trong editor sau đợt sửa | ✅ chạy trên WP 7.0.2, không có notice/warning |
| Nộp plugin | ⬜ **việc tiếp theo — Bước 4** |

---

## Bước 1 — Đẩy source mới lên GitHub (làm trước tiên)

`readme.txt` khai với reviewer rằng mã nguồn chưa minify nằm ở
https://github.com/nguyenhuuducit91/LumenBlocks. Repo đang là bản cũ, chưa có các sửa
hôm nay. Nếu reviewer mở ra và thấy khác với ZIP thì gần như chắc chắn bị trả về.

Thư mục làm việc hiện **không phải git repo**, nên clone ra chỗ khác rồi copy đè:

```bash
cd /tmp
git clone https://github.com/nguyenhuuducit91/LumenBlocks.git lumen-sync
cd lumen-sync
rsync -a --delete \
  --exclude='.git/' --exclude='node_modules/' --exclude='vendor/' \
  --exclude='dist/' --exclude='build/' \
  /media/vietis/DATA_ME/PROJECT_ME/WordpressPlugin/lumen-blocks/ ./
git add -A
git commit -m "Prefix global functions and variables, fix i18n domains, clear Plugin Check"
git push
```

Kiểm tra trên GitHub sau khi push:

- có `src/`, `package.json`, `gulpfile.js`, `.config/`
- **không** có `node_modules/`, `dist/`, `build/`, `vendor/`
- có `NOTICE.txt` (không còn `NOTICE.md`)

---

## Bước 2 — Ảnh cho trang plugin

`readme.txt` đã khai 5 screenshot với nội dung cụ thể. Ảnh phải khớp đúng thứ tự đó:

| File | Nội dung theo readme |
|---|---|
| `screenshot-1.png` | Design Library với 70 pattern trên 10 bảng màu |
| `screenshot-2.png` | Full page templates |
| `screenshot-3.png` | Global design system — đặt màu, chữ, khoảng cách một lần |
| `screenshot-4.png` | Block settings, có ô tìm setting và danh sách applied settings |
| `screenshot-5.png` | Responsive controls — giá trị khác nhau theo thiết bị |
| `icon-256x256.png` | Logo mặt trời, nền trong suốt hoặc phẳng |
| `icon-128x128.png` | Bản nhỏ của icon trên |
| `banner-772x250.png` | Banner đầu trang plugin |
| `banner-1544x500.png` | Bản retina (tuỳ chọn) |

**Đã chụp xong**, nằm ở [docs/assets/wporg/](assets/wporg/) — 5 screenshot 1600×1000 chụp
trên WordPress 7.0.2 với theme Twenty Twenty-Five, cộng icon 256/128 và banner
772×250 / 1544×500 dựng từ logo mặt trời của plugin.

Ảnh **không nằm trong ZIP** — chúng đi vào thư mục `assets/` của SVN ở Bước 6.

---

## Bước 3 — Kiểm tra lần cuối trên WordPress sạch

### 3.1. Đưa gói mới vào WordPress local

```bash
rsync -a --delete \
  /media/vietis/DATA_ME/PROJECT_ME/WordpressPlugin/lumen-blocks/build/lumen-blocks/ \
  /media/vietis/DATA_ME/PROJECT_ME/WordpressPlugin/source/wp-content/plugins/lumen-blocks/
```

Hoặc: Plugins → xoá Lumen Blocks → Add New → Upload Plugin → `build/lumen-blocks.zip`.

Xác nhận đúng bản mới:

```bash
cd /media/vietis/DATA_ME/PROJECT_ME/WordpressPlugin/source/wp-content/plugins/lumen-blocks
find . -type f | wc -l        # 615
ls NOTICE.txt                 # phải có
ls dist/*fallback*            # 2 file
grep -c LUMEN_I18N lumen-blocks.php   # 1 (chỉ dòng define)
```

### 3.2. Plugin Check

Tools → Plugin Check → Lumen Blocks → Check it → phải ra **0 ERROR, 0 WARNING**.

Muốn chạy bằng dòng lệnh:

```bash
curl -sSLO https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
php wp-cli.phar --path=/media/vietis/DATA_ME/PROJECT_ME/WordpressPlugin/source \
  plugin check lumen-blocks --slug=lumen-blocks --format=csv
```

> `--slug=lumen-blocks` là bắt buộc nếu thư mục plugin mang tên khác, nếu không sẽ ra
> hàng loạt lỗi `TextDomainMismatch` giả.

### 3.3. Test chức năng — quan trọng vì đợt sửa vừa rồi đụng nhiều thứ

Bật `WP_DEBUG` và `WP_DEBUG_LOG` trong `wp-config.php`, rồi đi qua danh sách này. Cột
bên phải là lý do phải thử đúng chỗ đó.

| Việc cần thử | Vì đã sửa gì |
|---|---|
| Kích hoạt / hủy kích hoạt / xoá plugin | gỡ `load_plugin_textdomain`, đổi `$GLOBALS['lumen_other_plugin_file']` |
| Mở editor, chèn vài block, lưu, xem trang | script editor chuyển xuống footer (`$in_footer = true`) |
| Mở Design Library, chèn 1 pattern và 1 page template | đổi `parse_url` → `wp_parse_url` khi import ảnh |
| Màn Lumen → Settings và Lumen → About | escape lại toàn bộ output, đổi tên hằng text domain |
| Bật/tắt vài block ở Settings rồi reload | `$_POST` được sanitize lại |
| Block Posts: lọc theo category / tag / taxonomy | thêm `phpcs:ignore`, đổi tên 2 hàm `generate_*` |
| Block Accordion bật FAQ schema → xem `<script type="application/ld+json">` ở nguồn trang | đổi cách sinh JSON-LD sang `wp_json_encode` |
| Block Video Popup → cũng kiểm tra JSON-LD | như trên |
| Xem trang bằng Safari hoặc Firefox | đổi tên file fallback `:has()` và prefix biến |
| Đổi Global Colors / Typography rồi xem trang | hook `lumen_register_global_settings` đổi tên |

`wp-content/debug.log` không được có warning/notice nào của Lumen.

### 3.4. Kết quả lần chạy ngày 02/08/2026

Đã chạy trên WordPress 7.0.2 tại `http://localhost:8004` với `WP_DEBUG` bật:

- Cài lại plugin từ ZIP qua `wp plugin install --force` → kích hoạt bình thường.
- `wp plugin check lumen-blocks` → **0 ERROR, 0 WARNING**.
- Design Library mở được, 70 pattern và 34 page template hiện đủ; chèn template
  *Home — corporate* vào trang chạy đúng.
- Lumen Design System, Settings, About đều render đúng; About hiện "NOTICE.txt".
- Chọn block → inspector có ô tìm setting và danh sách Applied settings; chuyển sang
  Tablet thì các control đổi sang giá trị theo thiết bị.
- Xuất bản một trang chứa pattern FAQ với `enableFAQ` → JSON-LD ngoài front end parse
  đúng: `FAQPage` với 4 câu hỏi (xác nhận phần `wp_json_encode` mới hoạt động).
- **Không sinh ra `wp-content/debug.log`** — không có notice/warning nào.

---

## Bước 4 — Nộp plugin

1. Đăng nhập wordpress.org bằng tài khoản **ducnguyenhuu**.
2. Vào https://wordpress.org/plugins/developers/add/
3. Upload `build/lumen-blocks.zip`.
4. Xác nhận slug đề xuất là `lumen-blocks` — **không đổi được về sau**.
5. Nhận email "You have submitted…". Từ lúc này mọi trao đổi qua email
   `plugins@wordpress.org`, trả lời đúng thread, đính kèm ZIP mới nếu phải sửa.

Thời gian chờ thực tế: vài ngày đến vài tuần. Plugin là fork thường lâu hơn.

---

## Bước 5 — Trả lời reviewer

Reply ngay vào email xác nhận, chủ động nêu 3 điểm reviewer chắc chắn sẽ hỏi. Bản
tiếng Anh dùng luôn được:

```
Hello,

A few notes that should save you time reviewing Lumen Blocks:

1. Fork and attribution
Lumen Blocks is a fork of Stackable by Gambit Technologies, Inc., which is
distributed under GPL-3.0-or-later. Lumen Blocks keeps the same licence. The full
list of changes is in NOTICE.txt inside the plugin, the plugin header points at it,
and the Credits section of readme.txt states it as well. No Stackable branding,
naming or assets are used anywhere in the plugin or on the plugin page.

2. Human-readable source
The plugin ships compiled JavaScript in /dist. The unminified JavaScript and SCSS,
together with the build tooling, are public at:
https://github.com/nguyenhuuducit91/LumenBlocks
Build with: npm ci && npm run build:no-translate

3. External services
Every third-party service the plugin can contact is documented in the "External
services" section of readme.txt: Google Fonts, Google Maps, the Font Awesome icon
search API, Unsplash placeholder images in the editor, and an optional Design
Library endpoint that is empty by default. None of them is contacted unless the
corresponding feature is used.

The plugin passes Plugin Check with no errors and no warnings.

Thank you for your time,
Nguyen Huu Duc
```

Nếu reviewer yêu cầu sửa: sửa code → `npm run build:no-translate` → đính kèm
`build/lumen-blocks.zip` mới vào **chính thread email đó** (không nộp lại qua form).

---

## Bước 6 — Commit SVN sau khi được duyệt

**Chỉ chạy được sau khi plugin được duyệt** — repo SVN không tồn tại trước đó, URL nằm
trong email approval, dạng `https://plugins.svn.wordpress.org/lumen-blocks/`.

Chuẩn bị:

| Cần gì | Trạng thái |
|---|---|
| `svn` client | ✅ đã có (1.14.5) |
| Nội dung `trunk/` | ✅ `build/lumen-blocks/` |
| Nội dung `assets/` | ✅ `docs/assets/wporg/` (9 file) |
| URL repo | ⬜ từ email approval |
| Mật khẩu SVN | ⬜ wordpress.org → Account → *SVN password* (bắt buộc khi bật 2FA) |

### Cách nhanh — dùng script

```bash
./tools/publish-to-wporg.sh --user ducnguyenhuu
```

Script [tools/publish-to-wporg.sh](../tools/publish-to-wporg.sh) sẽ: đối chiếu version ở
3 chỗ, kiểm tra `build/` đúng version, checkout SVN về `~/lumen-blocks-svn`, rsync
`trunk/` + `assets/`, `svn add` file mới và `svn rm` file đã xoá, in ra danh sách thay
đổi rồi **hỏi trước khi commit**, cuối cùng tạo `tags/<version>`.

SVN sẽ hỏi mật khẩu — nhập **SVN password**, không phải mật khẩu đăng nhập.

Tuỳ chọn: `--version 1.0.1`, `--url <repo>`, `--checkout <thư mục>`, `--yes` (bỏ hỏi).

### Cách thủ công

Nếu muốn tự làm từng lệnh:

```bash
cd ~
svn checkout https://plugins.svn.wordpress.org/lumen-blocks/ lumen-blocks-svn --username ducnguyenhuu
cd lumen-blocks-svn

# 1. Code vào trunk
rsync -a --delete \
  /media/vietis/DATA_ME/PROJECT_ME/WordpressPlugin/lumen-blocks/build/lumen-blocks/ \
  ./trunk/
svn add --force trunk/* --auto-props --parents --depth infinity -q
svn status | grep '^!' | awk '{print $2}' | xargs -r svn rm

# 2. Ảnh vào assets (Bước 2)
cp /duong/dan/screenshot-*.png icon-*.png banner-*.png ./assets/
svn add --force assets/* -q

# 3. Commit
svn ci -m "Initial release: Lumen Blocks 1.0.0" --username ducnguyenhuu

# 4. Tag — đây mới là thứ quyết định bản người dùng tải về
svn cp trunk tags/1.0.0
svn ci -m "Tagging version 1.0.0" --username ducnguyenhuu
```

`Stable tag: 1.0.0` trong `readme.txt` trỏ tới `tags/1.0.0`. Trang
https://wordpress.org/plugins/lumen-blocks/ sẽ hiện sau 5–30 phút.

---

## Bước 7 — Phát hành phiên bản sau

1. Tăng version ở **3 chỗ**, phải khớp nhau:
   - `lumen-blocks.php` → `Version: 1.0.1`
   - `readme.txt` → `Stable tag: 1.0.1`
   - `package.json` → `"version": "1.0.1"`
2. Thêm mục mới ở đầu `== Changelog ==`.
3. `npm run build:no-translate`
4. Chạy lại Plugin Check → 0/0.
5. rsync vào `trunk/`, `svn ci -m "Version 1.0.1"`.
6. `svn cp trunk tags/1.0.1 && svn ci -m "Tagging version 1.0.1"`

Chỉ sửa readme hoặc ảnh, không đổi code? Sửa trong `trunk` **và** trong
`tags/<version>` đang phát hành rồi commit — không cần tag mới.

---

## Nhắc lại vài chi tiết dễ quên

- **Sau mỗi lần build, `src/lmn-block-types.php` và `src/dynamic-breakpoints.php` được
  sinh lại** bởi gulp. Bộ sinh đã được sửa để không đẻ ra `LUMEN_I18N` và heredoc nữa
  — đừng sửa tay hai file này, sửa ở [gulpfile.js](../gulpfile.js).
- Text domain trong PHP phải luôn là chuỗi literal `'lumen-blocks'`. Dùng lại hằng
  `LUMEN_I18N` là 286 lỗi Plugin Check quay về.
- Không đặt tên file mới chứa chữ `polyfill` — Plugin Check chặn vì trùng `wp-polyfill`
  của core. Dùng `fallback`.
- Mọi hàm, biến, hook mới ở global scope phải bắt đầu bằng `lumen_` / `LUMEN_`.
- `dist/videos/` (11 MB) cố tình không nằm trong gói, nên tooltip có video sẽ không phát
  trên bản cài từ store. Muốn có thì bỏ dòng loại trừ trong `buildInclude` của
  [gulpfile.js](../gulpfile.js).
