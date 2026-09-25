/**
 * 6-dars — «Города, страны» (Liden & Denz, «Я ❤ Русский Язык», 5-urok
 * asosida): shahar joylari, ko'plik (shu jumladan noyob shakllar), sifatlar
 * (какой? -ый/-ой/-ий, -ая, -ое, -ые/-ие), и/а/но, dunyo tomonlari.
 * Lug'at 5 bosqich (50 so'z), 15 ta mashq. O'qish matni — Samarqand haqida.
 */
import { scramble, type SeedExercise, type SeedQuestion } from "../seed-exercises";
import type { VocabSeed } from "./types";

const w = (
  emoji: string,
  word: string,
  transcription: string,
  pos: string,
  uz: string,
  def: string,
  ex: string,
  exUz: string
): VocabSeed => ({ emoji, word, transcription, pos, uz, def, ex, exUz });

export const R05_ROUNDS: { title: string; words: VocabSeed[] }[] = [
  {
    title: "1-bosqich",
    words: [
      w("🚉", "Вокзал", "vakzál", "ot", "Vokzal", "Там садятся на поезд.", "Вокзал — место встреч и прощаний.", "Vokzal — uchrashuv va xayrlashuvlar joyi."),
      w("✈️", "Аэропорт", "aerapórt", "ot", "Aeroport", "Там садятся на самолёт.", "Аэропорт Ташкента работает круглосуточно.", "Toshkent aeroporti kecha-kunduz ishlaydi."),
      w("🏤", "Почта", "póchta", "ot", "Pochta", "Туда приходят письма.", "Почта рядом с банком.", "Pochta bankning yonida."),
      w("🧺", "Рынок", "rínak", "ot", "Bozor", "Там покупают фрукты и овощи.", "Рынок Чорсу — самый известный в Ташкенте.", "Chorsu bozori — Toshkentdagi eng mashhur bozor."),
      w("🏪", "Супермаркет", "supirmárkit", "ot", "Supermarket", "Большой магазин, где есть всё.", "Супермаркет открыт до полуночи.", "Supermarket yarim tungacha ochiq."),
      w("🏟️", "Стадион", "stadión", "ot", "Stadion", "Там играют в футбол.", "Стадион полный — все смотрят футбол!", "Stadion to'la — hamma futbol tomosha qilyapti!"),
      w("🏊", "Бассейн", "basyéyn", "ot", "Basseyn", "Там плавают.", "Бассейн — лучшее место в жару.", "Basseyn — jaziramada eng yaxshi joy."),
      w("🤸", "Спортзал", "spartzál", "ot", "Sport zali", "Там занимаются спортом.", "Спортзал открыт с шести утра.", "Sport zali ertalab oltidan ochiq."),
      w("🍿", "Кинотеатр", "kinatiátr", "ot", "Kinoteatr", "Там смотрят фильмы.", "Кинотеатр показывает новый фильм.", "Kinoteatr yangi filmni ko'rsatyapti."),
      w("⛪", "Церковь", "tsérkav'", "ot", "Cherkov", "Там молятся христиане. Слово женского рода: старая церковь.", "Эта церковь очень старая и красивая.", "Bu cherkov juda eski va chiroyli."),
    ],
  },
  {
    title: "2-bosqich",
    words: [
      w("🌷", "Сад", "sat", "ot", "Bog'", "Место, где растут цветы и деревья.", "Сад бабушки полон яблок.", "Buvimning bog'i olmalarga to'la."),
      w("🌲", "Лес", "lyes", "ot", "O'rmon", "Место, где много деревьев.", "Лес — дом для зверей.", "O'rmon — hayvonlar uchun uy."),
      w("🏞️", "Озеро", "ózira", "ot", "Ko'l", "Большая вода, но не море.", "Озеро Байкал — самое глубокое в мире.", "Baykal ko'li — dunyodagi eng chuqur ko'l."),
      w("🏝️", "Остров", "óstraf", "ot", "Orol", "Земля, вокруг которой вода.", "Остров в океане — мечта туриста.", "Okeandagi orol — sayyohning orzusi."),
      w("🏖️", "Пляж", "plyash", "ot", "Plyaj", "Место у моря, где отдыхают.", "Пляж, солнце, море — и никакой работы!", "Plyaj, quyosh, dengiz — va hech qanday ish yo'q!"),
      w("🛶", "Река", "riká", "ot", "Daryo", "Большая вода, которая течёт.", "Река Волга — самая длинная в Европе.", "Volga daryosi — Yevropadagi eng uzun daryo."),
      w("🌉", "Мост", "most", "ot", "Ko'prik", "По нему идут над рекой.", "Мост соединяет два берега.", "Ko'prik ikki qirg'oqni bog'laydi."),
      w("⛲", "Площадь", "plóshchat'", "ot", "Maydon", "Большое открытое место в городе. Слово женского рода.", "Площадь Регистан — сердце Самарканда.", "Registon maydoni — Samarqandning yuragi."),
      w("👑", "Дворец", "dvaryéts", "ot", "Saroy", "Большой красивый дом короля.", "Дворец царя сегодня — музей.", "Podshoh saroyi bugun — muzey."),
      w("🏕️", "Дача", "dácha", "ot", "Dacha", "Дом за городом, где отдыхают летом.", "Дача — это огород, шашлык и отдых.", "Dacha — bu tomorqa, kabob va dam olish."),
    ],
  },
  {
    title: "3-bosqich",
    words: [
      w("🐘", "Большой", "bal'shóy", "sifat", "Katta", "Не маленький.", "Большой город — большие возможности.", "Katta shahar — katta imkoniyatlar."),
      w("🐭", "Маленький", "mál'in'kiy", "sifat", "Kichik", "Не большой.", "Маленький котёнок спит в коробке.", "Kichkina mushukcha qutida uxlayapti."),
      w("🆕", "Новый", "nóviy", "sifat", "Yangi", "Не старый.", "Новый год — мой любимый праздник.", "Yangi yil — sevimli bayramim."),
      w("🏚️", "Старый", "stáriy", "sifat", "Eski; qari", "Не новый или не молодой.", "Старый друг лучше новых двух.", "Eski do'st yangi ikkitasidan yaxshi (maqol)."),
      w("🌱", "Молодой", "maladóy", "sifat", "Yosh", "Не старый (о человеке).", "Молодой человек, вы потеряли ключ!", "Yigit, kalitingizni tushirib qoldirdingiz!"),
      w("🌸", "Красивый", "krasíviy", "sifat", "Chiroyli", "Приятный на вид.", "Какой красивый закат!", "Qanday chiroyli quyosh botishi!"),
      w("✨", "Хороший", "kharóshiy", "sifat", "Yaxshi", "Не плохой.", "Хороший сон — лучшее лекарство.", "Yaxshi uyqu — eng yaxshi dori."),
      w("🌧️", "Плохой", "plakhóy", "sifat", "Yomon", "Не хороший.", "Плохой день бывает у всех.", "Yomon kun hammada bo'ladi."),
      w("💎", "Дорогой", "daragóy", "sifat", "Qimmat", "Стоит много денег.", "Это дорогой телефон — осторожно!", "Bu qimmat telefon — ehtiyot bo'l!"),
      w("🏷️", "Дешёвый", "dishóviy", "sifat", "Arzon", "Стоит мало денег.", "Дешёвый билет — на поезд, а не на самолёт.", "Arzon chipta — samolyotga emas, poyezdga."),
    ],
  },
  {
    title: "4-bosqich",
    words: [
      w("↔️", "Широкий", "shirókiy", "sifat", "Keng", "Не узкий.", "Широкий проспект ведёт к площади.", "Keng prospekt maydonga olib boradi."),
      w("📏", "Узкий", "úskiy", "sifat", "Tor", "Не широкий.", "Узкий мост — только для людей.", "Tor ko'prik — faqat odamlar uchun."),
      w("📢", "Шумный", "shúmniy", "sifat", "Shovqinli", "Где много шума, не тихий.", "Шумный сосед играет на барабане!", "Shovqinli qo'shni baraban chalyapti!"),
      w("🤫", "Тихий", "tíkhiy", "sifat", "Tinch", "Не шумный.", "Тихий вечер на берегу реки.", "Daryo bo'yidagi tinch oqshom."),
      w("🌡️", "Тёплый", "tyópliy", "sifat", "Iliq", "Не холодный.", "Тёплый чай в холодный день — это счастье.", "Sovuq kunda iliq choy — bu baxt."),
      w("❄️", "Холодный", "khalódniy", "sifat", "Sovuq", "Не тёплый.", "Холодный лимонад в жару — супер!", "Jaziramada sovuq limonad — zo'r!"),
      w("🧩", "Интересный", "intiryésniy", "sifat", "Qiziqarli", "Не скучный.", "Какой интересный фильм!", "Qanday qiziqarli film!"),
      w("🥵", "Трудный", "trúdniy", "sifat", "Qiyin", "Не лёгкий.", "Русский язык трудный, но красивый.", "Rus tili qiyin, lekin chiroyli."),
      w("🎈", "Лёгкий", "lyókhkiy", "sifat", "Oson; yengil", "Не трудный.", "Лёгкий завтрак — и в путь!", "Yengil nonushta — va yo'lga!"),
      w("🔚", "Последний", "paslyédniy", "sifat", "Oxirgi", "Который в конце.", "Последний урок — самый длинный!", "Oxirgi dars — eng uzuni!"),
    ],
  },
  {
    title: "5-bosqich",
    words: [
      w("⬆️", "Север", "syévir", "ot", "Shimol", "Сторона света, где холодно. Где? — на севере.", "Север — это снег и белые медведи.", "Shimol — bu qor va oq ayiqlar."),
      w("⬅️", "Запад", "zápat", "ot", "G'arb", "Сторона света. Где? — на западе.", "Запад и Восток — разные миры.", "G'arb va Sharq — turli olamlar."),
      w("🗾", "Восток", "vastók", "ot", "Sharq", "Сторона света. Где? — на востоке.", "Восток — дело тонкое!", "Sharq — nozik ish! (mashhur film iborasi)"),
      w("🎯", "Центр", "tsentr", "ot", "Markaz", "Середина города или страны. Где? — в центре.", "Центр города — самое красивое место.", "Shahar markazi — eng chiroyli joy."),
      w("⭐", "Столица", "stalítsa", "ot", "Poytaxt", "Главный город страны.", "Ташкент — столица Узбекистана.", "Toshkent — O'zbekiston poytaxti."),
      w("📌", "Район", "rayón", "ot", "Tuman, mavze", "Часть города.", "Мой район тихий и зелёный.", "Mening mavzeim tinch va yashil."),
      w("🕍", "Собор", "sabór", "ot", "Sobor (katta cherkov)", "Большая главная церковь.", "Собор Василия Блаженного — на Красной площади.", "Avliyo Vasiliy sobori — Qizil maydonda."),
      w("🏭", "Завод", "zavót", "ot", "Zavod", "Там делают машины и технику.", "Завод делает машины.", "Zavod mashinalar ishlab chiqaradi."),
      w("🤷", "Какой", "kakóy", "so'roq", "Qanday?", "Вопрос о признаке: какой, какая, какое, какие.", "Какой сегодня прекрасный день!", "Bugun qanday ajoyib kun!"),
      w("💫", "Уникальный", "unikál'niy", "sifat", "Noyob, betakror", "Такой, как никакой другой.", "Каждый человек — уникальный.", "Har bir inson — betakror."),
    ],
  },
];

const pick = (prompt: string, options: string[], correct: number, explanation?: string): SeedQuestion => ({
  prompt,
  options,
  correct,
  explanation,
});
const listen = (audio: string, options: string[], explanation?: string): SeedQuestion => ({
  prompt: "Eshitgan gapingizni toping",
  audio,
  options,
  correct: options.indexOf(audio),
  explanation,
});
const place = (prompt: string, answer: string, options: string[]): SeedQuestion =>
  pick(prompt, options, options.indexOf(answer));

const KAKOY = ["какой", "какая", "какое", "какие"];
const SIDE = ["на севере", "на юге", "на западе", "на востоке", "в центре"];
const I_A_NO = ["и", "а", "но"];
const TF = ["To'g'ri", "Noto'g'ri"];
const TEXT =
  "Меня зовут Азиз. Я живу в Самарканде. Самарканд — старый и очень красивый город. Он находится в центре Узбекистана. Здесь есть уникальные площади, большие рынки и тихие парки. Главная достопримечательность — площадь Регистан. Летом здесь тёплая погода, а зимой холодная. Жить здесь недорого и интересно.";
const tf = (statement: string, isTrue: boolean, explanation?: string): SeedQuestion => ({
  prompt: `${TEXT}||${statement}`,
  options: TF,
  correct: isTrue ? 0 : 1,
  explanation,
});

export const R05_EXERCISES: SeedExercise[] = [
  {
    title: "Tinglang va toping",
    skill: "Tinglash",
    kind: "listen",
    instructions: "Gap ovoz chiqarib o'qiladi. Eshitgan gapingizni toping.",
    questions: [
      listen("Это большой город.", ["Это большой город.", "Это маленький город.", "Это большая площадь.", "Это старый город."]),
      listen("Здесь есть старые церкви.", ["Здесь есть новые церкви.", "Здесь есть старые церкви.", "Здесь есть старые парки.", "Там есть старые церкви."]),
      listen("Москва находится на западе России.", ["Москва находится на западе России.", "Москва находится на востоке России.", "Москва находится на юге России.", "Москва находится в центре России."]),
      listen("Где вокзал?", ["Где вокзал?", "Где аэропорт?", "Где почта?", "Где рынок?"]),
      listen("Там тёплое море.", ["Там тёплое море.", "Там холодное море.", "Там тёплое озеро.", "Тут тёплое море."]),
      listen("Это узкая улица.", ["Это широкая улица.", "Это узкая улица.", "Это узкий мост.", "Это тихая улица."]),
      listen("Какой красивый дворец!", ["Какой красивый дворец!", "Какой большой дворец!", "Какой красивый собор!", "Какая красивая площадь!"]),
      listen("Наш город шумный.", ["Наш город тихий.", "Наш город шумный.", "Наш город новый.", "Ваш город шумный."]),
      listen("В центре есть большая площадь.", ["В центре есть большая площадь.", "В центре есть большой парк.", "На севере есть большая площадь.", "В центре есть старая площадь."]),
      listen("Москва — столица России.", ["Москва — столица России.", "Москва — город России.", "Самарканд — столица России.", "Москва — центр России."]),
    ],
  },
  {
    title: "Какой? Какая? Какое? Какие?",
    skill: "Sifat",
    kind: "choice",
    instructions: "он → какой, она → какая, оно → какое, они → какие. Mos savol so'zini tanlang.",
    questions: [
      pick("… город?", KAKOY, 0),
      pick("… площадь?", KAKOY, 1, "Площадь -ь bilan tugaydi, lekin u — она."),
      pick("… озеро?", KAKOY, 2),
      pick("… улицы?", KAKOY, 3),
      pick("… море?", KAKOY, 2),
      pick("… река?", KAKOY, 1),
      pick("… мост?", KAKOY, 0),
      pick("… парки?", KAKOY, 3),
      pick("… погода?", KAKOY, 1),
      pick("… музей?", KAKOY, 0),
    ],
  },
  {
    title: "Ko'plikni yozing",
    skill: "Ko'plik",
    kind: "type",
    instructions:
      "Ko'plik: магазин → магазины, школа → школы, музей → музеи, церковь → церкви, окно → окна. к, г, х, ж, ш, ч, щ dan keyin -и: банк → банки.",
    questions: [
      ["магазин", "магазины"],
      ["школа", "школы"],
      ["музей", "музеи", "-й → -и."],
      ["церковь", "церкви", "-ь → -и."],
      ["банк", "банки", "к dan keyin -и."],
      ["рынок", "рынки", "рынок → рынки («о» tushib qoladi)."],
      ["аптека", "аптеки"],
      ["окно", "окна", "-о → -а."],
      ["море", "моря", "-е → -я."],
      ["город", "города", "Istisno: город → города."],
    ].map(([prompt, answer, explanation]) => ({ prompt, answer, explanation })),
  },
  {
    title: "Qarama-qarshi sifatlar",
    skill: "Juftlik",
    kind: "match",
    instructions: "Sifatni qarama-qarshisi yoki tarjimasi bilan ulang.",
    questions: [
      ["большой|маленький", "новый|старый", "хороший|плохой", "дорогой|дешёвый"],
      ["широкий|узкий", "шумный|тихий", "тёплый|холодный", "трудный|лёгкий"],
      ["красивый|некрасивый", "молодой|немолодой", "прекрасный|ужасный", "интересный|скучный"],
      ["большой|katta", "маленький|kichik", "новый|yangi", "старый|eski"],
      ["широкий|keng", "узкий|tor", "шумный|shovqinli", "тихий|tinch"],
      ["тёплый|iliq", "холодный|sovuq", "красивый|chiroyli", "дорогой|qimmat"],
      ["север|shimol", "юг|janub", "запад|g'arb", "восток|sharq"],
      ["река|daryo", "озеро|ko'l", "мост|ko'prik", "остров|orol"],
      ["лес|o'rmon", "пляж|plyaj", "сад|bog'", "площадь|maydon"],
      ["вокзал|vokzal", "почта|pochta", "рынок|bozor", "столица|poytaxt"],
    ].map((options) => ({ prompt: "Juftlarni ulang", options })),
  },
  {
    title: "Qayerda joylashgan?",
    skill: "Tomonlar",
    kind: "choice",
    instructions:
      "Dunyo tomonlari: на севере (shimolda), на юге (janubda), на западе (g'arbda), на востоке (sharqda), в центре (markazda).",
    questions: [
      pick("Мурманск находится … России.", SIDE, 0),
      pick("Сочи находится … России.", SIDE, 1),
      pick("Калининград находится … России.", SIDE, 2),
      pick("Владивосток находится … России.", SIDE, 3),
      pick("Кремль находится … Москвы.", SIDE, 4),
      pick("Италия находится … Европы.", SIDE, 1),
      pick("Норвегия находится … Европы.", SIDE, 0),
      pick("Япония находится … Азии.", SIDE, 3),
      pick("Португалия находится … Европы.", SIDE, 2),
      pick("Самарканд находится … Узбекистана.", SIDE, 4),
    ],
  },
  {
    title: "Bu nima?",
    skill: "Rasm",
    kind: "picture",
    instructions: "Rasmga qarang va uning ruscha nomini toping.",
    questions: [
      pick("🏊", ["бассейн", "стадион", "спортзал", "пляж"], 0),
      pick("🏟️", ["вокзал", "стадион", "театр", "рынок"], 1),
      pick("🚉", ["аэропорт", "почта", "вокзал", "мост"], 2),
      pick("✈️", ["аэропорт", "вокзал", "завод", "остров"], 0),
      pick("🏤", ["банк", "почта", "школа", "дворец"], 1),
      pick("⛪", ["дворец", "собор", "церковь", "дача"], 2, "Церковь — kichikroq, собор — katta cherkov."),
      pick("🌲", ["сад", "лес", "парк", "остров"], 1),
      pick("🏝️", ["остров", "озеро", "море", "пляж"], 0),
      pick("🌉", ["улица", "площадь", "мост", "река"], 2),
      pick("🏖️", ["пляж", "лес", "озеро", "сад"], 0),
    ],
  },
  {
    title: "Qayerga borasiz?",
    skill: "Vaziyat",
    kind: "situation",
    instructions: "Vaziyatni o'qing. Qaysi joyga borasiz?",
    questions: [
      place("Poyezdga chiqmoqchisiz.", "вокзал", ["вокзал", "аэропорт", "почта", "рынок"]),
      place("Samolyotda uchmoqchisiz.", "аэропорт", ["вокзал", "аэропорт", "стадион", "мост"]),
      place("Xat jo'natmoqchisiz.", "почта", ["банк", "почта", "рынок", "школа"]),
      place("Meva va sabzavot olmoqchisiz.", "рынок", ["рынок", "почта", "бассейн", "завод"]),
      place("Futbol o'yinini ko'rmoqchisiz.", "стадион", ["театр", "стадион", "музей", "вокзал"]),
      place("Suzmoqchisiz.", "бассейн", ["бассейн", "библиотека", "рынок", "дворец"]),
      place("Film ko'rmoqchisiz.", "кинотеатр", ["кинотеатр", "спортзал", "почта", "аэропорт"]),
      place("Sport bilan shug'ullanmoqchisiz.", "спортзал", ["банк", "спортзал", "собор", "рынок"]),
      place("O'rmonda sayr qilmoqchisiz.", "лес", ["лес", "мост", "завод", "почта"]),
      place("Dengizda cho'milmoqchisiz.", "пляж", ["площадь", "пляж", "вокзал", "стадион"]),
    ],
  },
  {
    title: "И, а или но?",
    skill: "Bog'lovchi",
    kind: "choice",
    instructions:
      "«и» — ikkalasi bir xil (+ и +), «а» — solishtirish (bu — …, u esa — …), «но» — kutilmagan qarama-qarshilik (+ но −).",
    questions: [
      pick("Петербург большой … красивый город.", I_A_NO, 0),
      pick("Наша комната большая, … совсем некрасивая.", I_A_NO, 2),
      pick("Наша комната большая, … ваша комната маленькая.", I_A_NO, 1),
      pick("Это озеро большое … очень красивое.", I_A_NO, 0),
      pick("Петербург — большой город, … Люцерн — маленький.", I_A_NO, 1),
      pick("Рестораны хорошие, … очень дорогие.", I_A_NO, 2),
      pick("Этот дом новый … симпатичный.", I_A_NO, 0),
      pick("На севере холодно, … на юге тепло.", I_A_NO, 1),
      pick("Город маленький, … очень интересный.", I_A_NO, 2),
      pick("Здесь есть парки … сады.", I_A_NO, 0),
    ],
  },
  {
    title: "Suhbatni davom ettiring",
    skill: "Dialog",
    kind: "dialog",
    instructions: "Suhbatdoshingiz savol berdi. Mos javobni tanlang.",
    questions: [
      pick("Какой это город?", ["Это большой и красивый город.", "Это большая и красивая город.", "Это город большой красиво.", "Какой город."], 0),
      pick("Где находится Москва?", ["На западе России.", "На запад России.", "В запад России.", "Западе."], 0),
      pick("Какая там погода?", ["Там всегда холодная погода.", "Там всегда холодный погода.", "Там всегда холодно погода.", "Там погода холодные."], 0),
      pick("Какие достопримечательности есть в городе?", ["Здесь есть старый собор и музеи.", "Здесь есть старая собор.", "Здесь музей.", "Здесь старые."], 0),
      pick("Это новый дом?", ["Нет, это старый дом.", "Нет, это старая дом.", "Нет, это старое дом.", "Нет, дом."], 0),
      pick("Там дорогие рестораны?", ["Нет, там дешёвые рестораны.", "Нет, там дешёвый рестораны.", "Нет, дешёвая.", "Нет, ресторан."], 0),
      pick("Где стадион?", ["Стадион в центре.", "Стадион центр.", "В центр стадион.", "Стадион на центре."], 0),
      pick("Какая это площадь?", ["Это Красная площадь.", "Это Красный площадь.", "Это Красное площадь.", "Это площадь Красные."], 0),
      pick("Это тихий город?", ["Нет, очень шумный.", "Нет, очень шумная.", "Да, шумный.", "Нет, тихая."], 0),
      pick("Что это?", ["Это мост.", "Это мостом.", "Это мосты мост.", "Мост это что."], 0),
    ],
  },
  {
    title: "To'g'ri yoki noto'g'ri?",
    skill: "O'qish",
    kind: "truefalse",
    instructions: "Matnni o'qing va gap to'g'ri yoki noto'g'ri ekanini belgilang.",
    questions: [
      tf("Азиз живёт в Самарканде.", true),
      tf("Самарканд — новый город.", false, "Самарканд — старый город."),
      tf("Самарканд находится на севере Узбекистана.", false, "Он находится в центре Узбекистана."),
      tf("Здесь есть большие рынки.", true),
      tf("Парки здесь шумные.", false, "Здесь тихие парки."),
      tf("Главная достопримечательность — площадь Регистан.", true),
      tf("Летом здесь холодная погода.", false, "Летом тёплая, а зимой холодная."),
      tf("Зимой здесь холодная погода.", true),
      tf("Жить в Самарканде дорого.", false, "Жить здесь недорого."),
      tf("Азиз думает, что жить здесь интересно.", true),
    ],
  },
  {
    title: "Noyob ko'plik",
    skill: "Istisnolar",
    kind: "choice",
    instructions:
      "Ba'zi so'zlarning ko'pligi qoidaga bo'ysunmaydi. Ularni yodlang: дом → дома, друг → друзья, человек → люди…",
    questions: [
      pick("дом → ?", ["домы", "дома", "доми", "домов"], 1),
      pick("город → ?", ["городы", "городи", "города", "городя"], 2),
      pick("друг → ?", ["други", "друзья", "друга", "другы"], 1),
      pick("брат → ?", ["браты", "брати", "братья", "брата"], 2),
      pick("сын → ?", ["сыны", "сыновья", "сына", "сыни"], 1),
      pick("стул → ?", ["стулы", "стули", "стула", "стулья"], 3),
      pick("человек → ?", ["человеки", "люди", "человеков", "человека"], 1),
      pick("ребёнок → ?", ["ребёнки", "дети", "ребята", "ребёнка"], 1),
      pick("мать → ?", ["мати", "матери", "матья", "матеры"], 1),
      pick("дочь → ?", ["дочи", "дочери", "дочьи", "дочеры"], 1),
    ],
  },
  {
    title: "Harflardan so'z",
    skill: "Harflar",
    kind: "anagram",
    instructions: "Harflar aralashib ketgan. Ularni to'g'ri tartibda bosib, so'zni yig'ing.",
    questions: ["вокзал", "аэропорт", "стадион", "бассейн", "кинотеатр", "площадь", "красивый", "маленький", "холодный", "столица"].map(
      (word) => ({ prompt: scramble(word), answer: word })
    ),
  },
  {
    title: "Gap tuzing",
    skill: "Gap tuzish",
    kind: "order",
    instructions: "So'zlarni to'g'ri tartibda bosib, gap tuzing.",
    questions: [
      "Это большой и красивый город.",
      "Москва — столица России.",
      "Где находится вокзал?",
      "Здесь есть старые церкви.",
      "Италия на юге Европы.",
      "Какая там погода?",
      "Наш город маленький, но красивый.",
      "В центре есть большая площадь.",
      "Здесь тёплое море.",
      "Это новый стадион.",
    ].map((answer) => ({ prompt: "Gap tuzing", answer })),
  },
  {
    title: "Sifat qo'shimchasi",
    skill: "Yozish",
    kind: "fill",
    instructions:
      "Sifat qo'shimchasini yozing: он → -ый/-ой/-ий, она → -ая, оно → -ое, они → -ые/-ие. к, г, х dan keyin -ий, -ие.",
    questions: [
      ["Это красив___ город.", "ый"],
      ["Это больш___ площадь.", "ая"],
      ["Это нов___ кафе.", "ое", "Кафе — оно."],
      ["Это стар___ церкви.", "ые"],
      ["Это молод___ женщина.", "ая"],
      ["Там хорош___ погода.", "ая"],
      ["Здесь тёпл___ море.", "ое"],
      ["Это маленьк___ озеро.", "ое"],
      ["Здесь дорог___ рестораны.", "ие", "г dan keyin -ие."],
      ["Это русск___ язык.", "ий", "к dan keyin -ий."],
    ].map(([prompt, answer, explanation]) => ({ prompt, answer, explanation })),
  },
  {
    title: "Ayting",
    skill: "Talaffuz",
    kind: "speak",
    instructions: "Gapni eshiting, keyin mikrofon tugmasini bosib o'zingiz ayting.",
    questions: [
      "Это большой и красивый город.",
      "Москва — столица России.",
      "Где находится вокзал?",
      "Здесь есть старые церкви.",
      "Там тёплое море.",
      "Наш город маленький, но красивый.",
      "Италия на юге Европы.",
      "Это узкая улица.",
      "Какая там погода?",
      "Самарканд — уникальный город.",
    ].map((phrase) => ({ prompt: phrase, answer: phrase })),
  },
];
