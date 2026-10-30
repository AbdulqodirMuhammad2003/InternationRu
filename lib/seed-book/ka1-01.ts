/**
 * A1, 1-dars «Привет!» — kitob («Я ❤ Русский язык. Для начинающих»),
 * 6–15-betlar: Модуль 1–3, «Повторяем!», «Свобода слова» va «Словарь».
 * Audio fayl nomi = kitobdagi topshiriq raqami (A1/lesson1/…).
 */
import { mixAnswers, type SeedQuestion } from "../seed-exercises";
import { rule, q } from "../seed-lessons/rules/types";
import type { BookExercise, BookLesson } from "./types";
import { words } from "./vocab";

const AUDIO = "A1/lesson1/";
const IMG = "/book/a1/";
const M1 = "Модуль 1";
const M2 = "Модуль 2";
const M3 = "Модуль 3";
const R = "Повторяем!";
const S = "Свобода слова";

const stress = (syllables: string, correct: number, explanation?: string): SeedQuestion => ({
  prompt: "Urg'uli bo'g'inni toping",
  audio: syllables.replace(/\|/g, ""),
  options: syllables.split("|"),
  correct,
  explanation,
});
const fill = (prompt: string, answer: string, explanation?: string): SeedQuestion => ({ prompt, answer, explanation });
const say = (phrase: string): SeedQuestion => ({ prompt: phrase, answer: phrase });
const pick = (prompt: string, options: string[], explanation?: string): SeedQuestion => ({
  prompt,
  options,
  correct: 0,
  explanation,
});
/** Gap tuzish: o'quvchi so'z plitkalaridan `answer`ni yig'adi. */
const build = (prompt: string, answer: string): SeedQuestion => ({ prompt, answer });
const GENDER = ["он", "она", "оно", "они"];
const gender = (word: string, g: 0 | 1 | 2 | 3, explanation: string): SeedQuestion => ({
  prompt: word,
  options: GENDER,
  correct: g,
  explanation,
});
const RULE_1: BookExercise = {
  ref: "Грамматика",
  ...rule(
    "Olmoshlar va «Меня зовут…»",
    `## Kishilik olmoshlari (Местоимения)
• **я** — men, **ты** — sen, **он** — u (erkak), **она** — u (ayol)
• **мы** — biz, **вы / Вы** — siz, **они** — ular
• **ты** — do'st, tengdosh, bola bilan; **Вы** — notanish yoki katta odam bilan (hurmat).
→ Я студент. А ты? — Я тоже студент.

## Ismni aytish: «Меня зовут…»
So'zma-so'z «meni … deb chaqirishadi». Shuning uchun olmosh boshqacha shaklda:
• я → **меня**, ты → **тебя**, он → **его**, она → **её**
• мы → **нас**, вы → **вас**, они → **их**
→ Как тебя зовут? — Меня зовут Коля.
→ Как его зовут? — Его зовут Сергей.
→ Как их зовут? — Их зовут Ирина и Антон.

## Urg'usiz «о»
Urg'uli **о** — [о], urg'usiz **о** — [а] o'qiladi: окно́ [акно́], хорошо́ [харашо́].`,
    mixAnswers([
      q("Как ___ зовут? (sen)", ["тебя", "ты", "твой", "тебе"], "ты → тебя: Как тебя зовут?"),
      q("___ зовут Анна. (men)", ["Меня", "Я", "Мне", "Мой"], "я → меня: Меня зовут Анна."),
      q("Это Сергей. ___ студент.", ["Он", "Его", "Она", "Они"], "Kim? — он (erkak)."),
      q("Это Сергей. ___ зовут Сергей.", ["Его", "Он", "Её", "Их"], "он → его зовут."),
      q("Это Мария. ___ зовут Мария.", ["Её", "Она", "Его", "Их"], "она → её зовут."),
      q("Notanish kattaga qanday so'raysiz?", ["Как Вас зовут?", "Как тебя зовут?", "Как ты зовут?", "Как Вы зовут?"], "Hurmat bilan — Вы → Вас."),
      q("Ирина и Антон — ___ студенты.", ["они", "мы", "вы", "их"], "Ko'plik — они."),
      q("___ зовут Ирина и Антон.", ["Их", "Они", "Его", "Нас"], "они → их зовут."),
      q("«окно» qanday o'qiladi?", ["[акно́]", "[окно́]", "[акна́]", "[о́кно]"], "Urg'usiz о → [а]."),
      q("— Как дела? — …", ["Спасибо, хорошо.", "Меня зовут Анна.", "Очень приятно.", "Это стол."]),
    ]),
  ),
};

const RULE_2: BookExercise = {
  ref: "Грамматика",
  ...rule(
    "Кто? Что? Otlarning jinsi, «где?»",
    `## Кто это? Что это?
• **Кто это?** — odam va hayvon: Кто это? — Это мама. Это собака.
• **Что это?** — narsa: Что это? — Это стол.

## Otlarning jinsi (Род существительных)
So'z oxiriga qarang:
• **он** — undosh, **-й**, ba'zi **-ь**: телефон, музей, словарь, преподаватель
• **она** — **-а, -я**, ba'zi **-ь**: книга, Россия, тетрадь, кровать
• **оно** — **-о, -е**: окно, кафе
• **они** (ko'plik) — **-ы, -и**: часы, очки
Istisnolar: **папа, дедушка** — он (erkak!); **кофе** — он; **время, имя** — оно.
→ Где карандаш? — Вот он. Где сумка? — Вот она. Где метро? — Оно там. Где часы? — Они здесь.

## Где? — qayerda?
• **здесь (тут)** — shu yerda, **там** — u yerda
• **слева** — chapda, **справа** — o'ngda
→ Извините, где аптека? — Она там, слева.

## Sonlar 11–19
Son + **надцать**: один + надцать = **одиннадцать**, пять + надцать = **пятнадцать**.`,
    mixAnswers([
      q("… это? — Это собака.", ["Кто", "Что", "Как", "Где"], "Hayvon — Кто это?"),
      q("… это? — Это стол.", ["Что", "Кто", "Как", "Где"], "Narsa — Что это?"),
      q("Где книга? — Вот ___.", ["она", "он", "оно", "они"], "книга (-а) — она."),
      q("Где окно? — Вот ___.", ["оно", "он", "она", "они"], "окно (-о) — оно."),
      q("Где папа? — Вот ___.", ["он", "она", "оно", "они"], "папа -а bilan tugasa ham erkak — он."),
      q("Где часы? — ___ здесь.", ["Они", "Он", "Она", "Оно"], "часы (-ы) — они."),
      q("кофе — …", ["он", "она", "оно", "они"], "кофе — он (istisno)."),
      q("Аптека ___ (chapda).", ["слева", "справа", "здесь", "там"]),
      q("Музей ___ (o'ngda).", ["справа", "слева", "здесь", "тут"]),
      q("15 — …", ["пятнадцать", "пятьнадцать", "пятдесять", "пятнацать"], "пять + надцать, «ь» tushib qoladi."),
    ]),
  ),
};

const PART_1: BookExercise[] = [
  RULE_1,
  // ---------- Модуль 1 ----------
  {
    ref: "1.1.1",
    section: M1,
    audio: AUDIO + "1.1.1.mp3",
    title: "Слушайте, повторяйте, читайте",
    skill: "Fonetika",
    kind: "speak",
    instructions:
      "Kitob, 6-bet, 1-topshiriq. Audioni tinglang: avval bo'g'inlar (за-зо-зу-зы…), keyin so'zlar o'qiladi. So'ng har bir so'zni mikrofonga o'zingiz ayting.",
    questions: ["зонт", "зуб", "язык", "сад", "сок", "суп", "сын", "привет", "приятно", "страна"].map(say),
  },
  {
    ref: "1.1.2",
    section: M1,
    audio: AUDIO + "1.1.2.mp3",
    title: "Слушайте и читайте диалоги",
    skill: "Dialog",
    kind: "dialog",
    instructions:
      "Kitob, 6-bet, 2-topshiriq. Ikki dialogni tinglang: rasmiy («Вы») va do'stona («ты»). Keyin suhbatdoshga to'g'ri javobni tanlang.",
    questions: mixAnswers([
      pick("Здравствуйте!", ["Здравствуйте!", "Пока!", "Спасибо!"]),
      pick("Меня зовут Алексей. А как Вас зовут?", ["Меня зовут Елена.", "Я зовут Елена.", "Вас зовут Елена."], "Javob: Меня зовут…"),
      pick("Меня зовут Елена.", ["Очень приятно!", "До свидания!", "Как Вас зовут?"]),
      pick("Привет!", ["Привет!", "Спасибо!", "Пожалуйста!"]),
      pick("Как тебя зовут?", ["Меня зовут Наташа!", "Тебя зовут Наташа!", "Его зовут Коля."]),
      pick("Меня зовут Коля. А как тебя зовут?", ["Меня зовут Наташа.", "Очень приятно, Коля.", "Как дела?"]),
      pick("Меня зовут Наташа!", ["Очень приятно!", "Привет, Коля!", "Меня зовут Наташа."]),
    ]),
  },
  {
    ref: "1.1.3",
    section: M1,
    audio: AUDIO + "1.1.3.mp3",
    image: IMG + "1-1-3.webp",
    title: "Слушайте диалоги и соедините их с картинками",
    skill: "Tinglash",
    kind: "choice",
    instructions: "Kitob, 6-bet, 3-topshiriq. 4 ta dialogni tinglang. Har bir dialog qaysi rasmga (а, б, в, г) mos keladi?",
    questions: (
      [
        ["1) — Здравствуйте! Меня зовут Елена. Я ваш преподаватель.", 2, "O'qituvchi sinfda — в."],
        ["2) — Привет! — Привет! — Меня зовут Катя. — Очень приятно! А меня зовут Анна.", 0, "Ikki qiz «Привет!» deb tanishmoqda — а."],
        ["3) — Здравствуйте! Меня зовут Александр. — Здравствуйте! Меня зовут Михаил. — Очень приятно!", 3, "Ikki erkak qo'l berib ko'rishmoqda — г."],
        ["4) — Привет! — Привет! — Меня зовут Николай. А как тебя зовут? — Меня зовут Маша.", 1, "Yigit va qiz do'stona tanishmoqda — б."],
      ] as [string, number, string][]
    ).map(([prompt, correct, explanation]) => ({ prompt, options: ["а", "б", "в", "г"], correct, explanation })),
  },
  {
    ref: "1.1.4",
    section: M1,
    audio: AUDIO + "1.1.4b.mp3",
    title: "Дополните диалоги. Слушайте и проверяйте",
    skill: "Yozish",
    kind: "fill",
    instructions:
      "Kitob, 7-bet, 4-topshiriq. a) Dialogdagi bo'sh joyga kerakli so'zni yozing. b) Audioni tinglab, o'zingizni tekshiring.",
    questions: [
      fill("— Привет! — Привет! — Меня ___ Наташа.", "зовут"),
      fill("А как ___ зовут?", "тебя", "Do'stga — «ты»: Как тебя зовут?"),
      fill("— Катя. — Очень приятно! — Очень ___!", "приятно"),
      fill("— Здравствуйте! — ___!", "Здравствуйте"),
      fill("— ___ зовут Владимир.", "Меня"),
      fill("А ___ Вас зовут?", "как"),
      fill("— Меня ___ Ольга.", "зовут"),
      fill("— ___ приятно! — Очень приятно!", "Очень"),
    ],
  },
  {
    ref: "1.1.5",
    section: M1,
    title: "Спрашивайте и отвечайте",
    skill: "Gap tuzish",
    kind: "order",
    instructions: "Kitob, 7-bet, 5-topshiriq. So'zlardan tanishuv gaplarini tuzing.",
    questions: [
      build("Salom! Mening ismim Anna.", "Привет! Меня зовут Анна."),
      build("Sening isming nima?", "Как тебя зовут?"),
      build("Mening ismim Timur.", "Меня зовут Тимур."),
      build("Juda xursandman!", "Очень приятно!"),
      build("Sizning ismingiz nima?", "Как Вас зовут?"),
    ],
  },
  {
    ref: "1.1.6",
    section: M1,
    title: "Найдите имена. Дополните таблицу",
    skill: "Lug'at",
    kind: "match",
    instructions:
      "Kitob, 7-bet, 6-topshiriq. Rus ismlarining to'liq va qisqa (do'stona) shakli bor: Александр — Саша. Juftlarni ulang.",
    questions: [
      { prompt: "Erkak ismlari", options: ["Александр|Саша", "Владимир|Володя", "Николай|Коля", "Алексей|Лёша"] },
      { prompt: "Ismlar", options: ["Михаил|Миша", "Сергей|Серёжа", "Мария|Маша", "Екатерина|Катя"] },
      { prompt: "Ayol ismlari", options: ["Елена|Лена", "Наталья|Наташа", "Ольга|Оля", "Анна|Аня"] },
    ],
  },
  {
    ref: "1.1.8",
    section: M1,
    audio: AUDIO + "1.1.8.mp3",
    title: "Слушайте диалог, повторяйте",
    skill: "Talaffuz",
    kind: "speak",
    instructions: "Kitob, 7-bet, 8-topshiriq. Dialogni tinglang va har bir gapni o'zingiz ayting. «Как дела?» — «Ishlar qalay?»",
    questions: ["Привет!", "Привет! Как дела?", "Спасибо, хорошо. А у тебя?", "Спасибо. Нормально."].map(say),
  },
  {
    ref: "1.1.9",
    section: M1,
    audio: AUDIO + "1.1.9a.mp3",
    image: IMG + "1-1-9.webp",
    title: "Как дела? Слушайте и повторяйте",
    skill: "Talaffuz",
    kind: "speak",
    instructions:
      "Kitob, 7-bet, 9-topshiriq. «Как дела?» savoliga javoblar: очень хорошо — juda yaxshi, хорошо — yaxshi, нормально — normal, так себе — unchalik emas, плохо — yomon. Tinglang va takrorlang.",
    questions: ["очень хорошо", "хорошо", "нормально", "так себе", "плохо", "Как дела?", "Спасибо, нормально. А у тебя?"].map(say),
  },
  // ---------- Модуль 2 ----------
  {
    ref: "1.2.1а",
    section: M2,
    audio: AUDIO + "1.2.1a.mp3",
    title: "Слушайте, повторяйте, читайте слова",
    skill: "Urg'u",
    kind: "stress",
    instructions:
      "Kitob, 8-bet, 1a-topshiriq. Urg'uli «о» — [о], urg'usiz «о» — [а] o'qiladi: окно́ [акно́]. So'zlarni tinglang va urg'uli bo'g'inni toping.",
    questions: [
      stress("о|но", 1, "оно́ [ано́]"),
      stress("сло|во", 0, "сло́во [сло́ва]"),
      stress("ра|бо|та", 1, "рабо́та [рабо́та]"),
      stress("ок|но", 1, "окно́ [акно́]"),
      stress("пло|хо", 0, "пло́хо [пло́ха]"),
      stress("со|ба|ка", 1, "соба́ка [саба́ка]"),
      stress("мо|ло|ко", 2, "молоко́ [малако́]"),
      stress("мно|го", 0, "мно́го [мно́га]"),
      stress("по|го|да", 1, "пого́да [паго́да]"),
      stress("по|нят|но", 1, "поня́тно [паня́тна]"),
    ],
  },
  {
    ref: "1.2.1б",
    section: M2,
    audio: AUDIO + "1.2.1b.mp3",
    title: "Слушайте, ставьте ударения",
    skill: "Urg'u",
    kind: "stress",
    instructions: "Kitob, 8-bet, 1b-topshiriq. So'zlarni tinglang va urg'uni qo'ying. Qaysi «о» [а] bo'lib o'qilishini kuzating.",
    questions: [
      stress("хо|ро|шо", 2, "хорошо́ [харашо́]"),
      stress("го|род", 0, "го́род [го́рат]"),
      stress("спа|си|бо", 1, "спаси́бо [спаси́ба]"),
      stress("хо|лод|но", 0, "хо́лодно [хо́ладна]"),
      stress("по|ка", 1, "пока́ [пака́]"),
      stress("о|чень", 0, "о́чень"),
      stress("Моск|ва", 1, "Москва́ [Масква́]"),
      stress("спорт|смен", 1, "спортсме́н [спартсме́н]"),
      stress("по|жа|луй|ста", 1, "пожа́луйста [пажа́луста]"),
      stress("о|на", 1, "она́ [ана́]"),
    ],
  },
  {
    ref: "1.2.2",
    section: M2,
    audio: AUDIO + "1.2.2.mp3",
    image: IMG + "1-2-2.webp",
    title: "Слушайте диалоги. Кто эти люди?",
    skill: "Tinglash",
    kind: "choice",
    instructions: "Kitob, 8-bet, 2-topshiriq. Dialoglarni tinglang: bu odamlar kim?",
    questions: mixAnswers([
      pick("Это Алексей. Он …", ["бизнесмен", "студентка", "секретарь"]),
      pick("Это Лиза. Она …", ["студентка", "бизнесмен", "директор"]),
      pick("— Извините, вы директор? — Нет, я …", ["секретарь", "студенты", "бизнесмен"]),
      pick("— Я студент. А ты? Кто ты? — Я тоже …", ["студент", "студентка", "директор"]),
      pick("— Извините, вы студенты? — Да, мы …", ["студенты", "студент", "секретарь"]),
      pick("Алексей — … бизнесмен.", ["он", "она", "они"], "Erkak — он."),
      pick("Лиза — … студентка.", ["она", "он", "оно"], "Ayol — она."),
      pick("Да, мы студенты. И … тоже студенты.", ["они", "он", "она"], "Ko'plik — они."),
    ]),
  },
  {
    ref: "1.2.3",
    section: M2,
    title: "Дополните диалоги",
    skill: "Grammatika",
    kind: "fill",
    instructions: "Kitob, 9-bet, 3-topshiriq. Bo'sh joyga olmosh yozing: я, ты, он, она, мы, вы, они.",
    questions: [
      fill("— Лена, вы преподаватель? — Нет, ___ студентка.", "я"),
      fill("— А кто она? — ___ преподаватель.", "Она"),
      fill("— Ты студент? — Да, ___ студент.", "я"),
      fill("А кто ___? (Денис haqida)", "он"),
      fill("— ___ тоже студент.", "Он"),
      fill("А кто они? — ___ тоже студенты.", "Они"),
      fill("Меня зовут Александр. ___ менеджер.", "Я"),
      fill("Это Наталья. ___ тоже секретарь.", "Она"),
      fill("— А кто это? — Это Борис. — Кто ___?", "он"),
      fill("— ___ директор.", "Он"),
    ],
  },
  {
    ref: "1.2.4",
    section: M2,
    image: IMG + "1-2-4.webp",
    title: "Соедините предложения с фотографиями",
    skill: "O'qish",
    kind: "choice",
    instructions: "Kitob, 9-bet, 4-topshiriq. Gaplarni o'qing. Har bir gap qaysi fotosuratga (а–е) mos?",
    questions: (
      [
        ["Её зовут Мишель Бачелет. Она президент.", 4, "Ayol, prezident — д."],
        ["Его зовут Александр Овечкин. Он спортсмен.", 3, "Xokkeychi — г."],
        ["Их зовут Татьяна Навка и Роман Костомаров. Они спортсмены.", 1, "Figurali uchuvchilar juftligi — б."],
        ["Его зовут Владимир Потанин. Он бизнесмен.", 5, "Biznesmen — е."],
        ["Её зовут Мария Шарапова. Она спортсменка.", 2, "Tennischi — в."],
        ["Их зовут Билл и Хилари Клинтон. Они политики.", 0, "Er-xotin siyosatchilar — а."],
      ] as [string, number, string][]
    ).map(([prompt, correct, explanation]) => ({ prompt, options: ["а", "б", "в", "г", "д", "е"], correct, explanation })),
  },
  {
    ref: "1.2.5",
    section: M2,
    title: "Дополните таблицу",
    skill: "Grammatika",
    kind: "fill",
    instructions:
      "Kitob, 10-bet, 5-topshiriq. «Kim?» va «ismi nima?» juftlari: я — меня, ты — тебя, он — его, она — её, мы — нас, вы — вас, они — их.",
    questions: [
      fill("Я студент. — ___ зовут Тимур.", "Меня"),
      fill("Кто ___? — Как тебя зовут?", "ты"),
      fill("Он бизнесмен. — ___ зовут Владимир.", "Его"),
      fill("___ спортсменка. — Её зовут Мария.", "Она"),
      fill("___ студенты. — Нас зовут Каспер и Штефан.", "Мы"),
      fill("Кто вы? — Как ___ зовут?", "вас"),
      fill("___ спортсмены. — Их зовут Татьяна и Максим.", "Они"),
    ],
  },
  {
    ref: "1.2.6",
    section: M2,
    title: "Пишите вопросы",
    skill: "Gap tuzish",
    kind: "order",
    instructions: "Kitob, 10-bet, 6-topshiriq. Javobga mos savol tuzing.",
    questions: [
      build("— … ? — Он преподаватель.", "Кто он?"),
      build("— … ? — Её зовут Катя.", "Как её зовут?"),
      build("— … ? — Она спортсменка.", "Кто она?"),
      build("— … ? — Они политики.", "Кто они?"),
      build("— … ? — Их зовут Ирина и Антон.", "Как их зовут?"),
      build("— … ? — Нас зовут Миша и Наташа.", "Как вас зовут?"),
      build("— … ? — Мы студенты.", "Кто вы?"),
    ],
  },
  {
    ref: "1.2.7",
    section: M2,
    title: "Подчеркните правильную форму",
    skill: "Grammatika",
    kind: "choice",
    instructions: "Kitob, 10-bet, 7-topshiriq. To'g'ri shaklni tanlang: «kim?» — я/он…, «ismi» — меня/его… зовут.",
    questions: (
      [
        ["___ зовут Марк.", "Я", "Меня", 1],
        ["___ бизнесмен.", "Я", "Меня", 0],
        ["___ студент.", "Он", "Его", 0],
        ["___ зовут Тим.", "Он", "Его", 1],
        ["___ зовут Михаэль и Ральф.", "Они", "Их", 1],
        ["___ спортсмены.", "Они", "Их", 0],
        ["Как ___ зовут?", "ты", "тебя", 1],
        ["Кто ___?", "Вы", "Вас", 0],
        ["___ зовут Елена.", "Она", "Её", 1],
        ["___ студенты.", "Мы", "Нас", 0],
      ] as [string, string, string, number][]
    ).map(([prompt, a, b, correct]) => ({
      prompt,
      options: [a, b],
      correct,
      explanation: correct === 1 ? `«зовут» bilan — ${b}.` : `«Kim?» — ${a}.`,
    })),
  },
];

const PART_2: BookExercise[] = [
  RULE_2,
  // ---------- Модуль 3 ----------
  {
    ref: "1.3.1",
    section: M3,
    audio: AUDIO + "1.3.1.mp3",
    title: "Слушайте и повторяйте: 0–10",
    skill: "Sonlar",
    kind: "number",
    instructions: "Kitob, 11-bet, 1-topshiriq. Sonlarni tinglang. Keyin har bir eshitgan sonni raqam bilan yozing.",
    questions: [
      ["ноль", "0"],
      ["один", "1"],
      ["два", "2"],
      ["три", "3"],
      ["четыре", "4"],
      ["пять", "5"],
      ["шесть", "6"],
      ["семь", "7"],
      ["восемь", "8"],
      ["девять", "9"],
      ["десять", "10"],
    ].map(([audio, answer]) => ({ prompt: "Eshitgan soningizni yozing", audio, answer })),
  },
  {
    ref: "1.3.2а",
    section: M3,
    title: "Пишите числа",
    skill: "Sonlar",
    kind: "type",
    instructions:
      "Kitob, 11-bet, 2a-topshiriq. 11–19: son + «надцать» (один + надцать = одиннадцать, пять + надцать = пятнадцать). Raqamni so'z bilan yozing.",
    questions: [
      ["16", "шестнадцать"],
      ["17", "семнадцать"],
      ["18", "восемнадцать"],
      ["19", "девятнадцать"],
      ["13", "тринадцать"],
      ["20", "двадцать"],
    ].map(([prompt, answer]) => ({ prompt, answer })),
  },
  {
    ref: "1.3.2б",
    section: M3,
    audio: AUDIO + "1.3.2b.mp3",
    title: "Слушайте и повторяйте: 11–20",
    skill: "Sonlar",
    kind: "number",
    instructions: "Kitob, 11-bet, 2b-topshiriq. Tinglang va eshitgan sonni raqam bilan yozing.",
    questions: [
      ["одиннадцать", "11"],
      ["двенадцать", "12"],
      ["тринадцать", "13"],
      ["четырнадцать", "14"],
      ["пятнадцать", "15"],
      ["шестнадцать", "16"],
      ["семнадцать", "17"],
      ["восемнадцать", "18"],
      ["девятнадцать", "19"],
      ["двадцать", "20"],
    ].map(([audio, answer]) => ({ prompt: "Eshitgan soningizni yozing", audio, answer })),
  },
  {
    ref: "1.3.3",
    section: M3,
    audio: AUDIO + "1.3.3a.mp3",
    image: IMG + "1-3-3.webp",
    title: "Что это? Кто это?",
    skill: "Lug'at",
    kind: "choice",
    instructions:
      "Kitob, 11-bet, 3-topshiriq. So'zlarni tinglang va takrorlang. Odam va hayvon — «Кто это?», narsa — «Что это?». Har bir so'zga to'g'ri savolni tanlang.",
    questions: (
      [
        ["карандаш", false],
        ["собака", true],
        ["окно", false],
        ["студент", true],
        ["журнал", false],
        ["Анна", true],
        ["преподаватель", true],
        ["кофе", false],
        ["спортсмен", true],
        ["стул", false],
      ] as [string, boolean][]
    ).map(([word, alive]) => ({
      prompt: `Это ${word}.`,
      options: ["Что это?", "Кто это?"],
      correct: alive ? 1 : 0,
      explanation: alive ? "Jonli (odam, hayvon) — Кто это?" : "Narsa — Что это?",
    })),
  },
  {
    ref: "1.3.5",
    section: M3,
    title: "Он, она, оно или они?",
    skill: "Grammatika",
    kind: "choice",
    instructions: "Kitob, 12-bet, 5-topshiriq. 3-topshiriqdagi so'zlarni jinsiga qarab ajrating.",
    questions: [
      gender("журнал", 0, "Undosh — он."),
      gender("лампа", 1, "-а — она."),
      gender("радио", 2, "-о — оно."),
      gender("тетрадь", 1, "тетрадь — она (yodlang)."),
      gender("часы", 3, "-ы — они."),
      gender("кафе", 2, "-е — оно."),
      gender("телефон", 0, "Undosh — он."),
      gender("метро", 2, "-о — оно."),
      gender("очки", 3, "-и — они."),
      gender("книга", 1, "-а — она."),
    ],
  },
  {
    ref: "1.3.6",
    section: M3,
    audio: AUDIO + "1.3.6.mp3",
    image: IMG + "1-3-6.webp",
    title: "Слушайте диалоги. Подчеркните правильный вариант",
    skill: "Tinglash",
    kind: "choice",
    instructions: "Kitob, 12-bet, 6-topshiriq. Dialoglarni tinglang va to'g'ri olmoshni tanlang.",
    questions: [
      ["— Где карандаш? — Вот ___.", 0, "карандаш — он"],
      ["— Где сумка? — Вот ___.", 1, "сумка (-а) — она"],
      ["— Где метро? — ___ там.", 2, "метро (-о) — оно"],
      ["— Где часы? — ___ здесь.", 3, "часы (-ы) — они"],
    ].map(([prompt, correct, explanation]) => ({
      prompt: prompt as string,
      options: GENDER,
      correct: correct as number,
      explanation: explanation as string,
    })),
  },
  {
    ref: "1.3.7",
    section: M3,
    image: IMG + "1-3-7.webp",
    title: "Где? Слева или справа?",
    skill: "Nutq",
    kind: "choice",
    instructions:
      "Kitob, 12-bet, 7-topshiriq. Rasmga qarang: odam o'rtada turibdi. слева — chapda, справа — o'ngda, здесь (тут) — shu yerda, там — u yerda. «Извините, где…?» savoliga javob bering.",
    questions: mixAnswers([
      pick("— Извините, где аптека?", ["Она там, слева.", "Она там, справа.", "Он там, слева."], "аптека — она; chapda."),
      pick("— Извините, где музей?", ["Он там, справа.", "Он там, слева.", "Она там, справа."], "музей — он; o'ngda."),
      pick("— Извините, где кино?", ["Оно там, слева.", "Оно там, справа.", "Он там, слева."], "кино — оно; chapda."),
      pick("— Извините, где школа?", ["Она там, справа.", "Она там, слева.", "Оно там, справа."], "школа — она; o'ngda."),
      pick("— Извините, где магазин?", ["Он там, слева.", "Он там, справа.", "Она там, слева."], "магазин — он; chapda."),
      pick("— Извините, где метро?", ["Оно там, справа.", "Оно там, слева.", "Он там, справа."], "метро — оно; o'ngda."),
      pick("— Извините, где кафе?", ["Оно там, слева.", "Оно там, справа.", "Она там, слева."], "кафе — оно; chapda."),
      pick("— Извините, где ресторан?", ["Он там, справа.", "Он там, слева.", "Оно там, справа."], "ресторан — он; o'ngda."),
    ]),
  },
  // ---------- Повторяем! ----------
  {
    ref: "П.1",
    section: R,
    audio: AUDIO + "1.repeat.1.mp3",
    title: "Слушайте слова, ставьте ударения",
    skill: "Urg'u",
    kind: "stress",
    instructions: "Kitob, 13-bet, 1-topshiriq. So'zlarni tinglang va urg'uli bo'g'inni toping.",
    questions: [
      stress("ком|на|та", 0),
      stress("руч|ка", 0),
      stress("шо|ко|лад", 2),
      stress("ка|фе", 1),
      stress("ра|ди|о", 0),
      stress("ап|те|ка", 1),
      stress("сло|варь", 1),
      stress("ка|ран|даш", 2),
      stress("му|зей", 1),
      stress("ча|сы", 1),
    ],
  },
  {
    ref: "П.2",
    section: R,
    audio: AUDIO + "1.repeat.2.mp3",
    title: "Дополните диалоги. Слушайте и проверяйте",
    skill: "Yozish",
    kind: "fill",
    instructions: "Kitob, 13-bet, 2-topshiriq. Bo'sh joyni to'ldiring, keyin audio bilan tekshiring.",
    questions: [
      fill("— Меня зовут Коля. ___ тебя зовут?", "Как"),
      fill("— Меня ___ Алексей.", "зовут"),
      fill("— ___ приятно! — Очень приятно!", "Очень"),
      fill("— ___! — Здравствуйте!", "Здравствуйте"),
      fill("Меня ___ Александр.", "зовут"),
      fill("А как ___ зовут?", "Вас", "Notanish kattaga — «Вы»: Как Вас зовут?"),
      fill("— ___ зовут Елена.", "Меня"),
      fill("— Очень ___!", "приятно"),
    ],
  },
  {
    ref: "П.3",
    section: R,
    title: "Дополните предложения",
    skill: "Grammatika",
    kind: "fill",
    instructions: "Kitob, 13-bet, 3-topshiriq. Он yoki его, она yoki её, они yoki их — qaysi biri?",
    questions: [
      fill("Его зовут Антон. ___ спортсмен.", "Он"),
      fill("___ секретарь. Её зовут Мария.", "Она"),
      fill("Она секретарь. ___ зовут Мария.", "Её"),
      fill("___ зовут Иван и Анна.", "Их"),
      fill("Их зовут Иван и Анна. ___ студенты.", "Они"),
      fill("___ зовут Ирина.", "Её"),
      fill("Её зовут Ирина. ___ преподаватель.", "Она"),
      fill("___ спортсмены.", "Они"),
      fill("Они спортсмены. ___ зовут Наталья и Александр.", "Их"),
    ],
  },
  {
    ref: "П.4",
    section: R,
    audio: AUDIO + "1.repeat.4.mp3",
    title: "Дополните диалоги. Слушайте и проверяйте",
    skill: "Grammatika",
    kind: "fill",
    instructions: "Kitob, 13-bet, 4-topshiriq. Olmosh qo'ying, keyin audio bilan tekshiring.",
    questions: [
      fill("— Меня зовут Саша. ___ студент.", "Я"),
      fill("А кто ___? — Я тоже студент.", "ты"),
      fill("— Здравствуйте! Как ___ зовут?", "Вас"),
      fill("— ___ зовут Александр.", "Меня"),
      fill("— ___ бизнесмен? — Нет, я политик.", "Вы"),
      fill("— Это директор. ___ зовут Михаил Сергеевич.", "Его"),
      fill("А это Елена. ___ секретарь.", "Она"),
      fill("— ___ менеджеры. Их зовут Алексей и Владимир.", "Они"),
      fill("— Как ___ зовут? — Его зовут Майкл Джордан.", "его"),
      fill("— Кто он? — ___ спортсмен.", "Он"),
    ],
  },
  {
    ref: "П.5",
    section: R,
    image: IMG + "1-povt-5.webp",
    title: "Опишите картинку",
    skill: "O'qish",
    kind: "choice",
    instructions:
      "Kitob, 13-bet, 5-topshiriq. Rasmda Aleksandrning oilasi. «Это я. Меня зовут Александр. Я студент. Это моя семья.» Kim kim? (мама, папа, дедушка, бабушка, брат, сестра, собака, кот)",
    questions: mixAnswers([
      pick("Это мама. Её зовут Анна. Она …", ["преподаватель", "директор", "менеджер"]),
      pick("Это папа. Его зовут Иван. Он …", ["директор", "студент", "пенсионер"]),
      pick("Это сестра. Её зовут Лена. Она …", ["менеджер", "преподаватель", "школьница"]),
      pick("Это брат. Его зовут Сергей. Он …", ["школьник", "директор", "менеджер"]),
      pick("Это дедушка. … зовут Антон Викторович.", ["Его", "Её", "Он"]),
      pick("Это бабушка. Её зовут …", ["Наталья Михайловна", "Анна", "Лена"]),
      pick("Это собака. Её зовут …", ["Жучка", "Барсик", "Сергей"]),
      pick("Это кот. Его зовут …", ["Барсик", "Жучка", "Иван"]),
      pick("Александр — кто он?", ["студент", "директор", "школьник"]),
    ]),
  },
  {
    ref: "П.6",
    section: R,
    title: "Соедините слова с числами",
    skill: "Sonlar",
    kind: "match",
    instructions: "Kitob, 14-bet, 6-topshiriq. Raqamni so'z bilan ulang.",
    questions: [
      { prompt: "Sonlar", options: ["9|девять", "13|тринадцать", "5|пять", "7|семь"] },
      { prompt: "Sonlar", options: ["11|одиннадцать", "4|четыре", "15|пятнадцать", "8|восемь"] },
      { prompt: "Sonlar", options: ["12|двенадцать", "19|девятнадцать", "6|шесть", "16|шестнадцать"] },
    ],
  },
  {
    ref: "П.7",
    section: R,
    title: "Пишите ответы",
    skill: "Sonlar",
    kind: "type",
    instructions: "Kitob, 14-bet, 7-topshiriq. Misolni yeching va javobni ruscha so'z bilan yozing: 1 + 1 = два.",
    questions: [
      ["1 + 5 =", "шесть"],
      ["10 + 4 =", "четырнадцать"],
      ["8 + 8 =", "шестнадцать"],
      ["19 − 5 =", "четырнадцать"],
      ["5 + 4 =", "девять"],
      ["11 − 9 =", "два"],
      ["15 + 2 =", "семнадцать"],
      ["11 + 8 =", "девятнадцать"],
      ["14 − 3 =", "одиннадцать"],
    ].map(([prompt, answer]) => ({ prompt, answer })),
  },
  {
    ref: "П.8",
    section: R,
    title: "Заполните таблицу: он, она, оно, они",
    skill: "Grammatika",
    kind: "choice",
    instructions: "Kitob, 14-bet, 8-topshiriq. So'z qaysi guruhga kiradi? Istisnolarga e'tibor bering!",
    questions: [
      gender("папа", 0, "папа — erkak, shuning uchun он."),
      gender("тетрадь", 1, "тетрадь — она."),
      gender("кофе", 0, "кофе — он (istisno)."),
      gender("время", 2, "время — оно (istisno)."),
      gender("имя", 2, "имя — оно (istisno)."),
      gender("дедушка", 0, "дедушка — erkak, он."),
      gender("кровать", 1, "кровать — она."),
      gender("словарь", 0, "словарь — он."),
      gender("кино", 2, "кино — оно."),
      gender("студенты", 3, "Ko'plik — они."),
    ],
  },
  {
    ref: "П.10",
    section: R,
    title: "Читайте текст и отвечайте",
    skill: "O'qish",
    kind: "reading",
    instructions: "Kitob, 14-bet, 10-topshiriq. Matnni o'qing va savollarga javob bering.",
    questions: mixAnswers(
      (
        [
          ["Что это?", ["Это Москва.", "Это их комната.", "Это дом."]],
          ["Как их зовут?", ["Ира и Коля.", "Анна и Антон.", "Лена и Саша."]],
          ["Кто они?", ["Они студенты.", "Они менеджеры.", "Они спортсмены."]],
          ["Где они?", ["Они дома.", "Они в кафе.", "Они в школе."]],
          ["Где шкаф и окно?", ["Слева.", "Справа.", "Там, в Москве."]],
          ["Где кровать и кресло?", ["Справа.", "Слева.", "На столе."]],
          ["Где книги и тетради?", ["Слева.", "Справа.", "Там, в шкафу."]],
          ["Где лампа?", ["Справа.", "Слева.", "В кафе."]],
        ] as [string, string[]][]
      ).map(([question, options]) => ({
        prompt: `Это Москва. Там дом. Это Ира и Коля. Они студенты. Они дома.\nВот их комната. Слева шкаф и окно. Справа кровать и кресло.\nВот стол. Слева книги и тетради, справа лампа.||${question}`,
        options,
        correct: 0,
      }))
    ),
  },
  // ---------- Свобода слова ----------
  {
    ref: "С.1",
    section: S,
    audio: AUDIO + "1.svoboda_slova.mp3",
    image: IMG + "1-svoboda.webp",
    title: "Слушайте, читайте, повторяйте",
    skill: "Nutq",
    kind: "dialog",
    instructions: "Kitob, 15-bet, «Свобода слова». Kundalik iboralarni tinglang. Keyin har bir gapga mos javobni tanlang.",
    questions: mixAnswers([
      pick("Как дела?", ["Хорошо, спасибо!", "Пожалуйста.", "Это стол."]),
      pick("Извините, где метро?", ["Там, справа.", "Я студент.", "До свидания!"]),
      pick("Спасибо!", ["Пожалуйста.", "Как дела?", "Там, слева."]),
      pick("Пока!", ["Пока!", "Доброе утро!", "Очень приятно!"]),
      pick("Добрый вечер!", ["Добрый вечер!", "Доброе утро!", "Спасибо!"]),
      pick("Как тебя зовут?", ["Меня зовут Джим.", "Это Джим.", "Хорошо, спасибо!"]),
      pick("Кто ты?", ["Я студент.", "Это стол.", "Меня зовут."]),
      pick("Что это?", ["Это стол.", "Это студент.", "Я стол."]),
      pick("Кто это?", ["Это студент.", "Это стол.", "Я студент."]),
      pick("Извините, где аптека?", ["Она там, слева.", "Он там, слева.", "Оно там, слева."], "аптека (-а) — она"),
    ]),
  },
  {
    ref: "С.2",
    section: S,
    title: "Теперь вы можете сказать",
    skill: "Talaffuz",
    kind: "speak",
    instructions: "Kitob, 15-bet. Endi siz shularni ayta olasiz — har bir iborani mikrofonga ayting.",
    questions: [
      "Доброе утро!",
      "Добрый день!",
      "До свидания!",
      "Как тебя зовут?",
      "Меня зовут Джим.",
      "Хорошо, спасибо!",
      "Извините, где аптека?",
      "Она там, слева.",
    ].map(say),
  },
];

/** Kitob «Словарь» (15-bet) + «Как?» javoblari. */
const OCHEN_HOROSHO = {
  emoji: "😄",
  word: "очень хорошо",
  transcription: "[о́чин' харашо́]",
  pos: "ibora",
  uz: "Juda yaxshi",
  def: "Лучше, чем просто «хорошо».",
  ex: "— Как дела? — Спасибо, очень хорошо!",
  exUz: "— Ishlar qalay? — Rahmat, juda yaxshi!",
};

export const KA1_01A: BookLesson = {
  code: "KA1-01A",
  level: "A1",
  subtitle: "Привет! · 1-qism",
  pages: "6–10",
  rounds: [
    { title: "Kim u?", words: words(["мама", "студент", "бизнесмен", "директор", "секретарь", "спортсмен"]) },
    { title: "Как дела?", words: words(["очень хорошо", "хорошо", "нормально", "так себе", "плохо"], [OCHEN_HOROSHO]) },
  ],
  exercises: PART_1,
};

export const KA1_01B: BookLesson = {
  code: "KA1-01B",
  level: "A1",
  subtitle: "Привет! · 2-qism",
  pages: "11–15",
  rounds: [
    { title: "Uy va narsalar", words: words(["дом", "окно", "стол", "стул", "кровать", "лампа", "телефон", "радио", "часы", "собака"]) },
    { title: "O'qish uchun", words: words(["книга", "журнал", "словарь", "тетрадь", "карандаш", "сумка", "очки", "кофе"]) },
    { title: "Shaharda", words: words(["аптека", "магазин", "школа", "музей", "кафе", "кино", "ресторан", "метро", "море", "сад"]) },
  ],
  exercises: PART_2,
};
