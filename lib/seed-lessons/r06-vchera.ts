/**
 * 7-dars — «Что вы делали вчера?» (Liden & Denz, «Я ❤ Русский Язык»,
 * 6-urok asosida): hafta kunlari, Когда? (в понедельник, утром), быть va
 * boshqa fe'llarning o'tgan zamoni, в/на tadbirlar bilan, -у istisnolari
 * (в саду, в лесу), согласен/согласна. Lug'at 5 bosqich (50 so'z), 16 ta mashq.
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

export const R06_ROUNDS: { title: string; words: VocabSeed[] }[] = [
  {
    title: "1-bosqich",
    words: [
      w("😩", "Понедельник", "panidyél'nik", "ot", "Dushanba", "Первый день недели. Когда? — в понедельник.", "Понедельник — самый трудный день!", "Dushanba — eng og'ir kun!"),
      w("📆", "Вторник", "ftórnik", "ot", "Seshanba", "Второй день недели. Когда? — во вторник.", "Вторник — мой любимый день: у меня тренировка.", "Seshanba — sevimli kunim: mashg'ulotim bor."),
      w("🐫", "Среда", "sridá", "ot", "Chorshanba", "Третий день недели. Когда? — в среду.", "Среда — середина недели.", "Chorshanba — haftaning o'rtasi."),
      w("🍕", "Четверг", "chitvyérk", "ot", "Payshanba", "Четвёртый день недели. Когда? — в четверг.", "Каждый четверг мы едим пиццу.", "Har payshanba pitsa yeymiz."),
      w("🥳", "Пятница", "pyátnitsa", "ot", "Juma", "Пятый день недели. Когда? — в пятницу.", "Ура, пятница! Скоро выходные!", "Ura, juma! Tez orada dam olish kunlari!"),
      w("🛌", "Суббота", "subóta", "ot", "Shanba", "Шестой день недели, выходной. Когда? — в субботу.", "Суббота — день, когда можно долго спать.", "Shanba — uzoq uxlash mumkin bo'lgan kun."),
      w("🧺", "Воскресенье", "vaskrisyén'ye", "ot", "Yakshanba", "Седьмой день недели, выходной. Когда? — в воскресенье.", "Воскресенье мы проводим вместе с семьёй.", "Yakshanbani oila bilan birga o'tkazamiz."),
      w("🗓️", "Неделя", "nidyélya", "ot", "Hafta", "Семь дней: от понедельника до воскресенья.", "Неделя пролетела очень быстро!", "Hafta juda tez o'tib ketdi!"),
      w("🛝", "Выходные", "vikhadníye", "ot", "Dam olish kunlari", "Суббота и воскресенье. Когда? — в выходные.", "Выходные мы отдыхали на даче.", "Dam olish kunlarini dachada o'tkazdik."),
      w("🎂", "День рождения", "dyen' razhdyéniya", "ibora", "Tug'ilgan kun", "Праздник в тот день, когда человек родился.", "Сегодня у меня день рождения!", "Bugun mening tug'ilgan kunim!"),
    ],
  },
  {
    title: "2-bosqich",
    words: [
      w("⏮️", "Позавчера", "pazafchirá", "ravish", "O'tgan kuni", "День перед вчера.", "Позавчера я был в театре.", "O'tgan kuni men teatrda edim."),
      w("🔙", "Вчера", "fchirá", "ravish", "Kecha", "День перед сегодня.", "Вчера было холодно, а сегодня тепло.", "Kecha sovuq edi, bugun esa iliq."),
      w("🌞", "Сегодня", "sivódnya", "ravish", "Bugun", "Этот день.", "Сегодня я не работаю!", "Bugun men ishlamayman!"),
      w("🔜", "Завтра", "záftra", "ravish", "Ertaga", "День после сегодня.", "Завтра у нас экзамен.", "Ertaga imtihonimiz bor."),
      w("⏭️", "Послезавтра", "paslizáftra", "ravish", "Indinga", "День после завтра.", "Послезавтра мы едем на море!", "Indinga dengizga ketamiz!"),
      w("🌄", "Утро", "útra", "ot", "Tong", "Время с 4 до 12 часов. Когда? — утром.", "Утро начинается с кофе.", "Tong qahvadan boshlanadi."),
      w("🌆", "Вечер", "vyéchir", "ot", "Kechqurun, oqshom", "Время с 17 до 24 часов. Когда? — вечером.", "Какой прекрасный вечер!", "Qanday ajoyib oqshom!"),
      w("🌃", "Ночь", "noch'", "ot", "Tun", "Время, когда темно и люди спят. Когда? — ночью.", "Ночь была тихая и тёплая.", "Tun tinch va iliq edi."),
      w("🕛", "Днём", "dnyom", "ravish", "Kunduzi", "Когда? — с 12 до 17 часов.", "Днём я работаю, а вечером отдыхаю.", "Kunduzi ishlayman, kechqurun dam olaman."),
      w("⌛", "Раньше", "rán'she", "ravish", "Ilgari", "В прошлом, не сейчас.", "Раньше я жил в деревне.", "Ilgari men qishloqda yashardim."),
    ],
  },
  {
    title: "3-bosqich",
    words: [
      w("🎻", "Концерт", "kantsért", "ot", "Konsert", "Где? — на концерте.", "Концерт был просто супер!", "Konsert shunchaki zo'r edi!"),
      w("🎙️", "Опера", "ópira", "ot", "Opera", "Спектакль, где все поют. Где? — на опере.", "Опера «Кармен» очень красивая.", "«Karmen» operasi juda chiroyli."),
      w("🩰", "Балет", "balyét", "ot", "Balet", "Спектакль, где танцуют. Где? — на балете.", "Русский балет знают во всём мире.", "Rus baletini butun dunyo biladi."),
      w("🤹", "Спектакль", "spiktákl'", "ot", "Spektakl", "Представление в театре. Где? — на спектакле.", "Спектакль был длинный, но интересный.", "Spektakl uzun, lekin qiziqarli edi."),
      w("🖼️", "Выставка", "vístafka", "ot", "Ko'rgazma", "Где показывают картины или фото. Где? — на выставке.", "Выставка картин открыта до пятницы.", "Rasmlar ko'rgazmasi jumagacha ochiq."),
      w("🚌", "Экскурсия", "ekskúrsiya", "ot", "Ekskursiya", "Прогулка с гидом. Где? — на экскурсии.", "Экскурсия по Москве была очень интересной.", "Moskva bo'ylab ekskursiya juda qiziqarli bo'ldi."),
      w("💃", "Дискотека", "diskatyéka", "ot", "Diskoteka", "Где танцуют под музыку. Где? — на дискотеке.", "Дискотека была до утра!", "Diskoteka tonggacha davom etdi!"),
      w("🥂", "Вечеринка", "vichirínka", "ot", "Bazm, kecha", "Весёлый вечер с друзьями. Где? — на вечеринке.", "Вечеринка у Маши — в субботу!", "Mashaning bazmi — shanbada!"),
      w("💑", "Свидание", "svidániye", "ot", "Uchrashuv (sevgi)", "Встреча двух влюблённых. Где? — на свидании.", "Первое свидание было в кафе.", "Birinchi uchrashuv kafeda bo'lgan."),
      w("🏋️", "Тренировка", "trinirófka", "ot", "Mashg'ulot", "Занятие спортом. Где? — на тренировке.", "Тренировка в семь утра — это трудно!", "Ertalab soat yettidagi mashg'ulot — qiyin!"),
    ],
  },
  {
    title: "4-bosqich",
    words: [
      w("🐄", "Деревня", "diryévnya", "ot", "Qishloq", "Маленькое место не в городе. Где? — в деревне.", "Деревня бабушки — тихое и красивое место.", "Buvimning qishlog'i — tinch va chiroyli joy."),
      w("⛱️", "Берег", "byérik", "ot", "Qirg'oq", "Земля у воды. Где? — на берегу.", "Берег моря — лучшее место летом.", "Dengiz qirg'og'i — yozda eng yaxshi joy."),
      w("🔲", "Угол", "úgal", "ot", "Burchak", "Где? — в углу (в комнате), на углу (на улице).", "Этот угол — моё любимое место.", "Bu burchak — mening sevimli joyim."),
      w("🟫", "Пол", "pol", "ot", "Pol", "Низ комнаты, по нему ходят. Где? — на полу.", "Пол в комнате чистый.", "Xonadagi pol toza."),
      w("🗄️", "Шкаф", "shkaf", "ot", "Shkaf", "Там лежат вещи. Где? — в шкафу.", "Шкаф такой старый, как дедушка!", "Shkaf xuddi bobomdek eski!"),
      w("👨‍🏫", "Лекция", "lyéktsiya", "ot", "Ma'ruza", "Занятие в университете. Где? — на лекции.", "Лекция начинается в девять.", "Ma'ruza to'qqizda boshlanadi."),
      w("🧾", "Экзамен", "egzámin", "ot", "Imtihon", "Проверка знаний. Где? — на экзамене.", "Экзамен был трудный, но я сдал!", "Imtihon qiyin edi, lekin topshirdim!"),
      w("🧑‍💻", "Работа", "rabóta", "ot", "Ish", "Где? — на работе.", "Работа — это не только деньги.", "Ish — bu faqat pul emas."),
      w("🧳", "Отпуск", "ótpusk", "ot", "Ta'til", "Время, когда не работают и отдыхают. Где? — в отпуске.", "Отпуск был на море, в Турции.", "Ta'til dengizda, Turkiyada o'tdi."),
      w("🚦", "Проспект", "praspyékt", "ot", "Prospekt", "Большая широкая улица. Где? — на проспекте.", "Проспект Мира — длинная улица в Москве.", "Mira prospekti — Moskvadagi uzun ko'cha."),
    ],
  },
  {
    title: "5-bosqich",
    words: [
      w("🪞", "Быть", "bit'", "fe'l", "Bo'lmoq", "Прошедшее время: был, была, было, были.", "Хорошо быть дома в воскресенье!", "Yakshanbada uyda bo'lish yaxshi!"),
      w("🕺", "Танцевать", "tantsivát'", "fe'l", "Raqsga tushmoq", "Я танцую, ты танцуешь, они танцуют.", "Мой дедушка любит танцевать!", "Bobom raqs tushishni yaxshi ko'radi!"),
      w("👀", "Смотреть", "smatryét'", "fe'l", "Ko'rmoq, tomosha qilmoq", "Смотреть фильм, телевизор. Я смотрю, ты смотришь.", "Вечером я люблю смотреть кино.", "Kechqurun kino ko'rishni yaxshi ko'raman."),
      w("😮‍💨", "Устать", "ustát'", "fe'l", "Charchamoq", "Прошедшее время: устал, устала, устали.", "Устать после работы — это нормально.", "Ishdan keyin charchash — normal."),
      w("🍛", "Обедать", "abyédat'", "fe'l", "Tushlik qilmoq", "Есть днём. Я обедаю, они обедают.", "Мы любим обедать в кафе.", "Kafeda tushlik qilishni yaxshi ko'ramiz."),
      w("🙆‍♂️", "Согласен", "saglásin", "sifat", "Roziman (erkak)", "Он согласен, она согласна, они согласны.", "Я не согласен с тобой!", "Men sen bilan rozi emasman!"),
      w("📋", "Занятие", "zanyátiye", "ot", "Dars, mashg'ulot", "Урок, лекция или тренировка. Где? — на занятии.", "Занятие по русскому языку — в понедельник.", "Rus tili darsi — dushanbada."),
      w("🌿", "Бульвар", "bul'vár", "ot", "Xiyobon", "Улица с деревьями, где гуляют. Где? — на бульваре.", "Бульвар — прекрасное место для прогулки.", "Xiyobon — sayr uchun ajoyib joy."),
      w("😎", "Классно", "klásna", "ravish", "Zo'r (so'zlashuv)", "Очень хорошо, здорово.", "На вечеринке было классно!", "Bazm zo'r o'tdi!"),
      w("💯", "Отлично", "atlíchna", "ravish", "A'lo darajada", "Очень хорошо.", "Ты отлично говоришь по-русски!", "Sen ruschani a'lo gapirasan!"),
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

const BYL = ["был", "была", "было", "были"];
const V_NA = ["в", "на"];
const SOGLASEN = ["согласен", "согласна", "согласны"];
const DAY_PART = ["утром", "днём", "вечером", "ночью"];
const DAYS = ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье"];
const TF = ["To'g'ri", "Noto'g'ri"];
const TEXT =
  "В субботу утром Бекзод был на тренировке. Днём он обедал в кафе с другом. Вечером они были на концерте. Там было очень весело! В воскресенье Бекзод отдыхал за городом, в деревне. Он гулял в лесу и на берегу реки. Вечером он смотрел телевизор. Он очень устал.";
const tf = (statement: string, isTrue: boolean, explanation?: string): SeedQuestion => ({
  prompt: `${TEXT}||${statement}`,
  options: TF,
  correct: isTrue ? 0 : 1,
  explanation,
});

export const R06_EXERCISES: SeedExercise[] = [
  {
    title: "Tinglang va toping",
    skill: "Tinglash",
    kind: "listen",
    instructions: "Gap ovoz chiqarib o'qiladi. Eshitgan gapingizni toping.",
    questions: [
      listen("Вчера я был в театре.", ["Вчера я был в театре.", "Вчера я был в кино.", "Сегодня я в театре.", "Вчера она была в театре."]),
      listen("В субботу мы гуляли в парке.", ["В субботу мы гуляли в парке.", "В среду мы гуляли в парке.", "В субботу мы играли в парке.", "В субботу мы гуляли в лесу."]),
      listen("Там было весело.", ["Там было весело.", "Там было скучно.", "Тут было весело.", "Там было грустно."]),
      listen("Она работала весь день.", ["Она работала весь день.", "Он работал весь день.", "Она отдыхала весь день.", "Она работала вечером."]),
      listen("Сегодня понедельник.", ["Сегодня понедельник.", "Сегодня пятница.", "Вчера был понедельник.", "Завтра понедельник."]),
      listen("Мы были на концерте.", ["Мы были на концерте.", "Мы были на лекции.", "Вы были на концерте.", "Мы были на выставке."]),
      listen("Он очень устал.", ["Он очень устал.", "Она очень устала.", "Он не устал.", "Мы очень устали."]),
      listen("Позавчера я был дома.", ["Вчера я был дома.", "Позавчера я был дома.", "Послезавтра я дома.", "Позавчера я был на даче."]),
      listen("Вечером они танцевали.", ["Утром они танцевали.", "Вечером они танцевали.", "Вечером мы танцевали.", "Вечером они гуляли."]),
      listen("Я не согласна.", ["Я согласна.", "Я не согласна.", "Я не согласен.", "Мы не согласны."]),
    ],
  },
  {
    title: "Hafta kunlari",
    skill: "Juftlik",
    kind: "match",
    instructions: "Ruscha so'zni o'zbekcha tarjimasi bilan ulang.",
    questions: [
      ["понедельник|dushanba", "вторник|seshanba", "среда|chorshanba", "четверг|payshanba"],
      ["пятница|juma", "суббота|shanba", "воскресенье|yakshanba", "выходные|dam olish kunlari"],
      ["вчера|kecha", "сегодня|bugun", "завтра|ertaga", "позавчера|o'tgan kuni"],
      ["утром|ertalab", "днём|kunduzi", "вечером|kechqurun", "ночью|tunda"],
      ["неделя|hafta", "отпуск|ta'til", "работа|ish", "экзамен|imtihon"],
      ["концерт|konsert", "выставка|ko'rgazma", "экскурсия|ekskursiya", "свидание|uchrashuv"],
      ["деревня|qishloq", "берег|qirg'oq", "угол|burchak", "шкаф|shkaf"],
      ["танцевать|raqsga tushmoq", "смотреть|ko'rmoq", "обедать|tushlik qilmoq", "устать|charchamoq"],
      ["вторник|seshanba", "четверг|payshanba", "суббота|shanba", "послезавтра|indinga"],
      ["вечеринка|bazm", "тренировка|mashg'ulot", "лекция|ma'ruza", "день рождения|tug'ilgan kun"],
    ].map((options) => ({ prompt: "Juftlarni ulang", options })),
  },
  {
    title: "Когда? В понедельник",
    skill: "Qachon?",
    kind: "choice",
    instructions:
      "«Qachon?» — в + kun: в понедельник, в среду, в пятницу, в субботу. Diqqat: во вторник. Kunning qismi: утром, днём, вечером, ночью.",
    questions: [
      pick("Когда? (понедельник)", ["в понедельник", "в понедельнике", "на понедельник", "в понедельника"], 0),
      pick("Когда? (среда)", ["в среда", "в среду", "в среде", "на среду"], 1, "-а → -у: среда → в среду."),
      pick("Когда? (пятница)", ["в пятнице", "в пятница", "в пятницу", "на пятницу"], 2),
      pick("Когда? (суббота)", ["в субботу", "в субботе", "в суббота", "на субботу"], 0),
      pick("Когда? (вторник)", ["в вторник", "во вторник", "на вторник", "во вторнике"], 1, "«в вторник» aytish qiyin, shuning uchun — «во вторник»."),
      pick("Когда? (четверг)", ["в четверге", "на четверг", "в четверг", "во четверг"], 2),
      pick("Когда? (воскресенье)", ["в воскресенье", "в воскресенья", "на воскресенье", "в воскресенью"], 0),
      pick("Когда? (выходные)", ["на выходных", "в выходные", "в выходных", "во выходные"], 1),
      pick("Когда? (утро)", ["в утро", "утром", "на утро", "утро"], 1),
      pick("Когда? (вечер)", ["вечером", "в вечер", "на вечер", "вечер"], 0),
    ],
  },
  {
    title: "Был, была, было, были",
    skill: "O'tgan zamon",
    kind: "choice",
    instructions:
      "быть (o'tgan zamon): он был, она была, оно было, они/мы/вы были. «Там было весело» — o'zgarmaydi.",
    questions: [
      pick("Вчера Антон … в баре.", BYL, 0),
      pick("Анна … в кафе.", BYL, 1),
      pick("Мы … на дискотеке.", BYL, 3),
      pick("Там … весело.", BYL, 2),
      pick("Маша, где ты … вчера?", BYL, 1),
      pick("Дети … в парке.", BYL, 3),
      pick("Погода … хорошая.", BYL, 1),
      pick("Концерт … интересный.", BYL, 0),
      pick("Иван Петрович, где Вы … в субботу?", BYL, 3, "Вы (rasmiy ham) → были."),
      pick("Вчера … холодно.", BYL, 2),
    ],
  },
  {
    title: "Fe'lni o'tgan zamonda yozing",
    skill: "O'tgan zamon",
    kind: "fill",
    instructions:
      "O'tgan zamon: -ть → -л (он), -ла (она), -ли (они, мы, вы). -ся fe'l: занимался, занималась, занимались.",
    questions: [
      ["Вчера Олег ___ в футбол. (играть)", "играл"],
      ["Анна ___ музыку. (слушать)", "слушала"],
      ["Мы ___ на море. (отдыхать)", "отдыхали"],
      ["Вечером он ___ телевизор. (смотреть)", "смотрел"],
      ["Лариса весь день ___. (работать)", "работала"],
      ["Они ___ в клубе. (танцевать)", "танцевали"],
      ["Раньше Иван ___ в Риме. (жить)", "жил"],
      ["Она ___ в университете. (учиться)", "училась", "-ся → -лась (ayol)."],
      ["Утром он ___ спортом. (заниматься)", "занимался"],
      ["Что вы ___ вчера? (делать)", "делали"],
    ].map(([prompt, answer, explanation]) => ({ prompt, answer, explanation })),
  },
  {
    title: "В или на?",
    skill: "Grammatika",
    kind: "choice",
    instructions:
      "Tadbirlar va ba'zi joylar bilan — «на»: на концерте, на лекции, на работе, на почте, на острове. Bino ichida — «в»: в театре, в университете.",
    questions: [
      pick("Я был … концерте.", V_NA, 1),
      pick("Студенты … лекции.", V_NA, 1),
      pick("Она … экзамене.", V_NA, 1),
      pick("Папа … работе.", V_NA, 1),
      pick("Мы были … выставке.", V_NA, 1),
      pick("Он учится … университете.", V_NA, 0),
      pick("Вечером мы были … театре.", V_NA, 0),
      pick("Мама работает … почте.", V_NA, 1),
      pick("Они отдыхали … острове.", V_NA, 1),
      pick("Бабушка живёт … деревне.", V_NA, 0),
    ],
  },
  {
    title: "В саду или в саде?",
    skill: "Istisnolar",
    kind: "choice",
    instructions:
      "Ba'zi so'zlar «где?» savolida -у oladi: в саду, в лесу, на полу, в шкафу, на берегу, в углу, в аэропорту, на мосту. Qolganlari odatdagidek: в парке, в городе.",
    questions: [
      pick("Дети играют … (сад)", ["в саде", "в саду"], 1),
      pick("Мы гуляли … (лес)", ["в лесу", "в лесе"], 0),
      pick("Игрушки … (пол)", ["на поле", "на полу"], 1),
      pick("Пальто … (шкаф)", ["в шкафу", "в шкафе"], 0),
      pick("Они отдыхают … (берег)", ["на береге", "на берегу"], 1),
      pick("Шкаф стоит … (угол)", ["в углу", "в угле"], 0),
      pick("Туристы … (аэропорт)", ["в аэропорте", "в аэропорту"], 1),
      pick("Мы стоим … (мост)", ["на мосту", "на мосте"], 0),
      pick("Мы гуляли … (парк)", ["в парку", "в парке"], 1, "Парк — odatiy: в парке."),
      pick("Он живёт … (город)", ["в городе", "в городу"], 0, "Город — odatiy: в городе."),
    ],
  },
  {
    title: "Bu nima?",
    skill: "Rasm",
    kind: "picture",
    instructions: "Rasmga qarang va uning ruscha nomini toping.",
    questions: [
      pick("💃", ["дискотека", "выставка", "лекция", "экзамен"], 0),
      pick("🖼️", ["концерт", "выставка", "свидание", "опера"], 1),
      pick("🚌", ["отпуск", "экзамен", "экскурсия", "неделя"], 2),
      pick("💑", ["свидание", "тренировка", "вечеринка", "работа"], 0),
      pick("🏋️", ["лекция", "тренировка", "дискотека", "балет"], 1),
      pick("🎻", ["выставка", "концерт", "экскурсия", "пол"], 1),
      pick("🩰", ["балет", "опера", "спектакль", "концерт"], 0),
      pick("🎂", ["вечер", "отпуск", "день рождения", "неделя"], 2),
      pick("🐄", ["город", "деревня", "проспект", "бульвар"], 1),
      pick("🗄️", ["шкаф", "угол", "пол", "берег"], 0),
    ],
  },
  {
    title: "Kunning qaysi qismi?",
    skill: "Vaqt",
    kind: "situation",
    instructions:
      "Soatga qarang: 04:00–12:00 — утром, 12:00–17:00 — днём, 17:00–00:00 — вечером, 00:00–04:00 — ночью.",
    questions: [
      pick("🕗 08:00", DAY_PART, 0),
      pick("🕑 14:00", DAY_PART, 1),
      pick("🕗 20:00", DAY_PART, 2),
      pick("🕑 02:00", DAY_PART, 3),
      pick("🕙 10:00", DAY_PART, 0),
      pick("🕞 15:30", DAY_PART, 1),
      pick("🕙 22:00", DAY_PART, 2),
      pick("🕐 01:00", DAY_PART, 3),
      pick("🕖 07:00", DAY_PART, 0),
      pick("🕕 18:00", DAY_PART, 2),
    ],
  },
  {
    title: "Qaysi kun?",
    skill: "Vaziyat",
    kind: "situation",
    instructions:
      "позавчера — o'tgan kuni, вчера — kecha, сегодня — bugun, завтра — ertaga, послезавтра — indinga.",
    questions: [
      pick("Сегодня среда. Вчера был …", DAYS.slice(0, 4), 1),
      pick("Сегодня среда. Позавчера был …", DAYS.slice(0, 4), 0),
      pick("Сегодня среда. Завтра — …", DAYS.slice(1, 5), 2),
      pick("Сегодня среда. Послезавтра — …", DAYS.slice(2, 6), 2),
      pick("Сегодня пятница. Вчера был …", DAYS.slice(2, 6), 1),
      pick("Сегодня суббота. Завтра — …", DAYS.slice(3, 7), 3),
      pick("Сегодня понедельник. Вчера было …", ["суббота", "пятница", "воскресенье", "вторник"], 2),
      pick("Сегодня вторник. Послезавтра — …", DAYS.slice(1, 5), 2),
      pick("Сегодня воскресенье. Позавчера была …", DAYS.slice(3, 7), 1),
      pick("Сегодня четверг. Завтра — …", DAYS.slice(2, 6), 2),
    ],
  },
  {
    title: "Suhbatni davom ettiring",
    skill: "Dialog",
    kind: "dialog",
    instructions: "Suhbatdoshingiz savol berdi. Mos javobni tanlang.",
    questions: [
      pick("Где ты был вчера?", ["Я был на дискотеке.", "Я была на дискотека.", "Я на дискотеку.", "Я буду на дискотеке."], 0),
      pick("Что ты делал в субботу?", ["Я гулял в парке.", "Я гуляю в парк.", "Я гулять парк.", "В субботу."], 0),
      pick("Как было на концерте?", ["Там было весело.", "Там был весело.", "Там была весело.", "Концерт весело."], 0),
      pick("Когда у тебя тренировка?", ["В среду.", "В среда.", "Среду.", "На среду."], 0),
      pick("Какой сегодня день?", ["Сегодня пятница.", "Сегодня пятницу.", "В пятницу.", "Пятница был."], 0),
      pick("Где была Анна?", ["Она была на работе.", "Она был на работе.", "Она была на работа.", "Она работе."], 0),
      pick("Ты устал?", ["Да, очень устал.", "Да, очень устала работать.", "Да, я усталый есть.", "Да, устать."], 0),
      pick("Вы согласны?", ["Да, согласен.", "Да, согласна быть.", "Да, согласный.", "Да, согласие."], 0),
      pick("Где вы отдыхали в отпуске?", ["Мы отдыхали на море.", "Мы отдыхаем на море.", "Мы отдыхали на моря.", "На море был."], 0),
      pick("Что вы смотрели?", ["Мы смотрели фильм.", "Мы смотрим фильм.", "Мы смотрели фильма.", "Фильм смотрел мы."], 0),
    ],
  },
  {
    title: "To'g'ri yoki noto'g'ri?",
    skill: "O'qish",
    kind: "truefalse",
    instructions: "Matnni o'qing va gap to'g'ri yoki noto'g'ri ekanini belgilang.",
    questions: [
      tf("В субботу утром Бекзод был на тренировке.", true),
      tf("Днём он обедал дома.", false, "Днём он обедал в кафе с другом."),
      tf("Вечером в субботу они были на концерте.", true),
      tf("На концерте было скучно.", false, "Там было очень весело."),
      tf("В воскресенье Бекзод работал.", false, "В воскресенье он отдыхал за городом."),
      tf("В воскресенье он был в деревне.", true),
      tf("Он гулял в лесу.", true),
      tf("Он гулял на берегу моря.", false, "Он гулял на берегу реки."),
      tf("Вечером в воскресенье он смотрел телевизор.", true),
      tf("Бекзод совсем не устал.", false, "Он очень устал."),
    ],
  },
  {
    title: "Согласен или согласна?",
    skill: "Grammatika",
    kind: "choice",
    instructions: "Erkak — согласен, ayol — согласна, ko'plik va Вы — согласны.",
    questions: [
      pick("Иван …", SOGLASEN, 0),
      pick("Анна …", SOGLASEN, 1),
      pick("Мы …", SOGLASEN, 2),
      pick("Я (Олег) …", SOGLASEN, 0),
      pick("Я (Мария) …", SOGLASEN, 1),
      pick("Вы …?", SOGLASEN, 2),
      pick("Они …", SOGLASEN, 2),
      pick("Катя, ты …?", SOGLASEN, 1),
      pick("Мой папа не …", SOGLASEN, 0),
      pick("Мама не …", SOGLASEN, 1),
    ],
  },
  {
    title: "Harflardan so'z",
    skill: "Harflar",
    kind: "anagram",
    instructions: "Harflar aralashib ketgan. Ularni to'g'ri tartibda bosib, so'zni yig'ing.",
    questions: ["понедельник", "воскресенье", "пятница", "суббота", "вечеринка", "выставка", "экскурсия", "концерт", "послезавтра", "тренировка"].map(
      (word) => ({ prompt: scramble(word), answer: word })
    ),
  },
  {
    title: "Gap tuzing",
    skill: "Gap tuzish",
    kind: "order",
    instructions: "So'zlarni to'g'ri tartibda bosib, gap tuzing.",
    questions: [
      "Вчера я был в театре.",
      "В субботу мы гуляли в парке.",
      "Там было очень весело.",
      "Какой сегодня день?",
      "Вечером она смотрела телевизор.",
      "Где ты был в пятницу?",
      "Утром я работал.",
      "В воскресенье мы отдыхали на даче.",
      "Они танцевали в клубе.",
      "Я очень устал.",
    ].map((answer) => ({ prompt: "Gap tuzing", answer })),
  },
  {
    title: "Ayting",
    skill: "Talaffuz",
    kind: "speak",
    instructions: "Gapni eshiting, keyin mikrofon tugmasini bosib o'zingiz ayting.",
    questions: [
      "Где ты был вчера?",
      "Вчера я был в театре.",
      "Там было весело.",
      "Какой сегодня день?",
      "Сегодня пятница.",
      "В субботу мы гуляли в парке.",
      "Я очень устал.",
      "Что ты делал вечером?",
      "Я смотрел телевизор.",
      "Я не согласен.",
    ].map((phrase) => ({ prompt: phrase, answer: phrase })),
  },
];
