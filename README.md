# Avangard — o'zbek o'quvchilari uchun rus tili platformasi

O'zbek o'quvchilariga rus tilini o'rgatadigan to'liq funksional veb-sayt:
darajalar (A1, A2, B1, B2), darslar (lug'at, video dars, mashqlar), mashq
qilish, baholar, reyting va qo'shimcha darslarga yozilish. Interfeys
asosan o'zbek tilida, o'rganiladigan kontent esa rus tilida — har bir
so'zning talaffuzi, so'z turkumi va o'zbekcha tarjimasi bilan.

## Texnologiyalar

- **Next.js 16** (App Router, React 19, Server Actions)
- **TypeScript** + **Tailwind CSS 4**
- **node:sqlite** — Node.js ichiga o'rnatilgan SQLite moduli (tashqi
  nativ bog'liqliklarsiz, baza fayli `data/app.db`)
- Autentifikatsiya — JWT + httpOnly cookie asosidagi o'z yechimi

## Tezkor ishga tushirish

```bash
npm install
npm run db:seed   # data/app.db ni yaratadi va namunaviy kontent bilan to'ldiradi
npm run dev        # http://localhost:3000
```

Demo kirish:

- **Email:** demo@avangard.uz
- **Parol:** demo1234

## Loyiha tuzilishi

- `app/(app)/` — shaxsiy kabinet sahifalari (Bosh sahifa, Darslar,
  Mashqlar, Baholar, Reyting, Qo'shimcha dars), sessiya tekshiruvi
  `layout.tsx` da amalga oshiriladi.
- `app/login/` — kirish sahifasi.
- `app/actions.ts` — Server Actions: kirish/chiqish, so'zni yodlandi deb
  belgilash, mashq natijalarini saqlash, qo'shimcha darsga yozilish.
- `lib/db.ts`, `lib/schema.sql` — SQLite ulanishi va baza sxemasi
  (`levels` — darajalar, `units` — darslar, `vocabulary_*` — lug'at,
  `exercises` — mashqlar).
- `lib/data.ts` — ma'lumot o'qish funksiyalari (faqat server uchun).
- `scripts/seed.ts` — bazani namunaviy kontent bilan to'ldirish (A1
  darajasi: salomlashish, oila, sonlar/ranglar, oziq-ovqat mavzulari).
- `components/` — qayta ishlatiladigan UI-komponentlar, jumladan
  darsning interaktiv paneli (`components/lessons/LessonsBoard.tsx`) —
  lug'at kartochkalari va mashqlar bilan.

## Foydali buyruqlar

```bash
npm run build   # production-sborka
npm run start   # production-sborkani ishga tushirish
npm run lint    # kodni linter bilan tekshirish
npm run db:seed # namunaviy ma'lumotlarni qayta yaratish (joriy progressni o'chiradi)
```

## Nima ishlayapti

- Kirish/chiqish, himoyalangan marshrutlar.
- Profil paneli: tangalar, yulduzlar, filial/guruh reytingi, oylik
  o'rtacha ball va ko'nikmalar foizi (O'qish/Yozish/Tinglash/Gapirish).
- Daraja tanlash (A1 — ochiq, A2/B1/B2 — "tez orada" holatida).
- Darslar karuseli va har bir dars uchun yon panel: lug'at (bosqichlar →
  flesh-kartochkalar, Web Speech API orqali rus tilida talaffuz eshittirish,
  "yodlandi" belgisi), video dars (hozircha yopiq — keyingi bosqich uchun)
  va mashqlar (test savollari, natija hisoblanadi va bazaga saqlanadi).
- Mashqlar — barcha darslardagi topshiriqlar bir joyda.
- Baholar — natijalar tarixi.
- Reyting — "filial bo'yicha" / "guruh bo'yicha" bo'limlari, joriy
  foydalanuvchi ajratib ko'rsatiladi.
- Qo'shimcha dars — o'qituvchilar bilan darslarga yozilish (bo'sh
  o'rinlar sonini yangilaydi).

## Keyingi bosqichda qo'shish tavsiya etiladi

Bu — mustahkam ishchi asos, lekin haqiqiy o'quvchilarga ochishdan oldin
quyidagilarni qo'shish tavsiya etiladi:

- Yangi foydalanuvchilarni ro'yxatdan o'tkazish va parolni tiklash.
- Darslar/so'zlar/mashqlarni kod yozmasdan qo'shish uchun admin-panel.
- A2, B1, B2 darajalari uchun to'liq kontent (hozircha faqat A1 to'liq).
- Haqiqiy video darslar (hozircha bu — keyingi bosqich uchun joy egallovchi).
- Katta yuklama uchun ishonchliroq baza (PostgreSQL/MySQL) — `node:sqlite`
  demo va kichik yuklamalar uchun juda mos, lekin ko'p bir vaqtdagi
  foydalanuvchilar uchun klient-server SUBD ga o'tish tavsiya etiladi.
- Qo'shimcha xavfsizlik choralari (so'rovlar sonini cheklash, email
  tasdiqlash va h.k.).
