# 01 — Cải tiến UI/UX phần config block

Kế hoạch cho **Lumen Blocks** (fork Stackable 3.19.10). Mọi con số dưới đây đo trên editor thật đang chạy, không phải ước lượng.

---

## 1. Hiện trạng đo được

| Chỉ số | Giá trị | Cách đo |
|---|---|---|
| Số block | 47 | `getBlockTypes()` lọc `lumen/` |
| Tổng attribute | **16.784** | cộng `Object.keys(attributes)` mọi block |
| Trung bình attribute/block | ~357 | |
| Control hiện cùng lúc ở tab Style của **một** block Card | **62** | đếm `.components-base-control` sau khi mở hết panel |
| Ô nhập trong tab đó | 32 | `input, select, textarea` |
| Chiều cao cuộn của sidebar | **978 px** | `scrollHeight` |
| Tìm kiếm cài đặt | **không có** | |
| Chỉ báo "tôi đã sửa gì" | **không có** | |

Đây chính là điều bạn phàn nàn ngay từ đầu dự án: *"Quá nhiều option, UI ngợp."* Giờ nó có số.

### Vấn đề nhìn thấy ngay trên ảnh chụp sidebar

1. **Panel trùng khái niệm.** Cùng một block Card có cả `Background` lẫn `Container Background`, cả `Borders & Shadows` lẫn `Container Borders & Shadow`. Người dùng phải đoán cái nào tác động lên cái gì.
2. **Panel không nhất quán.** `Background` có công tắc bật/tắt ở header, `Borders & Shadows` thì không, dù cùng là "nhóm tuỳ chọn có thể không dùng".
3. **Không biết mình đã sửa gì.** Với 357 attribute/block, sau mười phút chỉnh không có cách nào tìm lại giá trị vừa đặt ngoài việc cuộn hết 978px.
4. **Icon responsive/hover không nói trạng thái.** Có icon màn hình và icon con trỏ cạnh nhãn, nhưng chúng không cho biết viewport nào / trạng thái nào **đã có giá trị**. Người dùng đặt padding ở tablet rồi quên, desktop trông vẫn "sạch".
5. **Link chết còn sót.** "Manage your color schemes." trỏ về tính năng của bản upstream.

---

## 2. Repo này đã build được từ nguồn

Không có rào chắn nào ở đây. Repo có sẵn **1.358 tệp JS nguồn** đã đổi tên, cấu hình build đầy đủ (`.config/`, `gulpfile.js`, `eslint/`), và `npm run build` chạy được.

Quy ước thư mục của repo — dùng đúng những tên này, không phải tên của upstream:

| Upstream | Repo này |
|---|---|
| `src/block` | `src/block-library` |
| `src/components` | `src/ui` |
| `src/lazy-components` | `src/ui-lazy` |
| `src/higher-order` | `src/hoc` |
| `src/util` | `src/utils` |
| `src/deprecated` | `src/legacy` |
| `src/welcome` | `src/dashboard` |
| `src/plugins` | `src/extensions` + `src/features` |

**Bẫy đã sập một lần:** tôi từng sửa nhầm vào bản đã cài ở `source/wp-content/plugins/lumen-blocks` — thư mục đó là **bản triển khai** (thuộc `www-data`), không phải mã nguồn. Mọi thay đổi phải làm ở repo này rồi build và triển khai sang đó.

---

## 4. Cải tiến UX, xếp theo mức đau

### P1 — Tìm cài đặt *(giải trực tiếp con số 62 control / 978px)*

Ô tìm ở đầu sidebar, gõ ≥2 ký tự thì mọi panel gập lại thành một danh sách phẳng chỉ chứa control khớp.

- Khớp theo **nhãn**, **tên attribute**, và **từ đồng nghĩa** — "rounded" phải ra Border Radius, "shadow" ra Box Shadow, "khoảng cách" ra Padding/Margin.
- Xoá ô tìm thì panel trở lại đúng trạng thái đóng/mở trước đó.

**Đo lại sau khi làm:** số thao tác để tới một control bất kỳ ≤ 2 (gõ + bấm), thay cho "mở tab → mở panel → cuộn".

### P2 — Bảng "Đã sửa gì"

Một panel ở đầu tab Advanced liệt kê mọi giá trị block này đang đặt, kèm viewport và trạng thái, mỗi dòng có nút nhảy tới và nút xoá.

Lý do: 357 attribute/block khiến việc *hoàn tác một thay đổi cụ thể* trở nên bất khả thi nếu không nhớ mình đã bấm ở đâu.

### ~~P3 — Chỉ báo trạng thái trên nhãn control~~ — **rút lại, upstream đã có**

Nhận định ban đầu của tôi sai. Khi soát tôi chỉ nhìn ảnh chụp một block **chưa đặt giá trị nào**, nên không có gì để chỉ báo — rồi kết luận là thiếu tính năng.

Kiểm chứng lại bằng cách đặt giá trị thật:

| Thao tác | Kết quả |
|---|---|
| Đặt `blockPaddingTablet` | đúng **1** toggle chuyển nền hổ phách `#ffc107` |
| Panel chứa giá trị | có `lmn-panel-modified-indicator` |

Mã nguồn cũng xác nhận: `ResponsiveToggle` và `HoverStateToggle` đều tính `hasValue` cho từng viewport/trạng thái rồi truyền vào `ControlIconToggle`, và SCSS tô nền hổ phách cho `.has-value`.

Việc còn đáng làm ở đây chỉ là **độ nổi**: ô hổ phách 14px trên icon xám rất dễ bỏ qua. Xếp vào P5 (đánh bóng), không phải tính năng mới.

### P4 — ~~Gộp panel trùng khái niệm~~ → **Chỉ rõ panel nào tô hộp nào**

Kiểm tra mã trước khi gộp, và may là đã kiểm tra: **hai panel không trùng nhau**. `block-div` tô lên chính block; `container-div` tô lên một hộp con chỉ tồn tại khi `hasContainer` bật. Gộp lại sẽ **mất một năng lực thật** — section rộng hết màn hình với thẻ hẹp bên trong cần cả hai cùng lúc.

Thứ thiếu không phải là panel, mà là câu trả lời cho *"cái này tô lên hộp nào?"*. Và plugin đã có sẵn cơ chế: `visualGuide` — rê chuột lên nhãn thì viền nét đứt hiện lên đúng phần tử trong canvas. Các control kích thước của container đã dùng nó; các control nền và viền thì chưa.

Không đụng một attribute nào, không cần migration.

### P5 — Panel nhất quán + dọn link chết

Mọi panel "có thể không dùng" đều có công tắc ở header như `Background`. Gỡ link "Manage your color schemes." nếu tính năng không còn.

---

## 5. Cách kiểm chứng

Mỗi mục xong phải qua đủ bốn cửa, không bỏ cửa nào:

1. `npm run lint` sạch.
2. Build lại, **47 block vẫn đăng ký**, 0 lỗi console.
3. Chèn thử block, thao tác thật đúng luồng vừa sửa.
4. **Chụp ảnh sidebar và nhìn.** Hai lỗi nặng nhất từng gặp ở dự án này (kses nuốt SVG, cascade layer nuốt style tác giả) đều lọt qua test và chỉ lộ ra khi nhìn ảnh.

---

## 6. Thứ tự

**Phase 0** (bắt buộc, chặn mọi thứ) → **P1** → **P3** → **P2** → **P5** → **P4**.

P4 để cuối vì nó đụng attribute và cần migration; ba việc đầu chỉ đụng lớp giao diện nên rẻ và hoàn tác được.

---

## 7. Đã làm

| Mục | Trạng thái | Kiểm chứng trên editor thật |
|---|---|---|
| **P1** — Tìm cài đặt | ✅ `src/ui/inspector-search/` | 26 control → **4** khi gõ "rounded" → **26** khi xoá |
| **P2** — Bảng "Changed settings" | ✅ `src/ui/block-changes-panel/` | Đặt 2 giá trị → đúng 2 dòng, có huy hiệu `Tablet`, reset từng dòng chạy |
| **P5** — Độ nổi chỉ báo | ✅ thêm chấm viền trắng vào ô hổ phách | |
| **P5** — Va chạm null | ✅ `color-schemes-help` guard `?.` | |
| **P3** | ⛔ **rút lại** — upstream đã có | Đặt `paddingTablet` → 1 toggle chuyển hổ phách |
| **P6** | ⛔ **không cần ở repo này** | `grep -ril stackable src/` → **0 tệp** |
| **P4** — Chỉ rõ panel nào tô hộp nào | ✅ nối `visualGuide` vào control nền và viền | Rê chuột: `Background` → `.lmn-<id>`; `Container Background` → `.lmn-<id> .lmn-<id>-container` |
| **Lỗi có sẵn** — guide không chạy với block chưa lưu | ✅ `with-visual-guide` dùng `createUniqueClass( clientId )` khi chưa có `uniqueId` | Trước: selector ra `.lmn-` (không khớp gì). Sau: `.lmn-3b57660` |

Sau khi build: **47 block đăng ký, 0 lỗi console.**

### Ba lần tôi kết luận sai, ghi lại để không lặp

Cả ba đều cùng một nguyên nhân: **đọc giao diện ở trạng thái rỗng rồi suy ra là thiếu tính năng**, thay vì đặt giá trị vào và thử.

1. *"Icon responsive không nói trạng thái"* — có nói, bằng nền hổ phách; lúc soát chưa có giá trị nào nên không có gì để hiện.
2. *"Link Manage your color schemes đã chết"* — nó mở Global Settings và bung đúng panel màu.
3. *"Panel không nhất quán: Background có công tắc, Container Background thì không"* — `hasContainer` đã có công tắc riêng ở panel **Container** trong tab Layout. Hai panel khác bản chất: nền block là lớp style, container là bọc cấu trúc.

### Một lần làm nhầm chỗ

Tôi đã sửa vào `source/wp-content/plugins/lumen-blocks` — **bản triển khai**, không phải mã nguồn. Ở đó không có JS nguồn nên tôi còn dựng cả một Phase 0 để chép nguồn từ `Stackable-develop` sang. Toàn bộ việc đó là thừa: repo này vốn đã có 1.358 tệp JS và build được.

Đã dọn: gỡ `node_modules`, `.config`, `tools`, `eslint`, `package.json`, `gulpfile.js` và cây `src-phponly.bak` khỏi bản cài, rồi đồng bộ lại `src` + `dist` từ repo — hai bên giờ khớp **0 khác biệt**.

**Quy tắc rút ra:** sửa ở `/WordpressPlugin/lumen-blocks`, build, rồi `rsync src/ dist/` sang bản cài. Không bao giờ sửa thẳng trong `wp-content/plugins/`.

### Còn lại

**P4** — gộp `Background` + `Container Background` (và cặp Borders tương ứng). Để cuối vì đụng attribute nên cần migration.
