/**
 * B2, 12-dars — «Люди и роботы» (Liden & Denz, «Я ❤ Русский Язык», B1.2,
 * 3-urok 2-modul, 1-qism): robotlar tarixi (qadimgi avtomatlardan sun'iy
 * intellektgacha), texnologik ishsizlik, haydovchisiz avtomobillar, yosh
 * ixtirochi; grammatika — FE'L TURI (NSV / SV): jarayon / natija, takror /
 * bir martalik; infinitiv bilan: начинать, перестать, привыкать, хватит,
 * не надо, не стоит, бесполезно, напрасно + NSV; забыть, успеть, удаться,
 * решиться + SV; НЕ + NSV (harakat umuman bo'lmagan) va НЕ + SV (urinish
 * bor, natija yo'q); НЕЛЬЗЯ + NSV (taqiq) va НЕЛЬЗЯ + SV (imkonsiz).
 * Buyruq mayli (imperativ) — 13-darsda.
 *
 * Zinapoya: kontekstda tur → infinitivning turi → не + NSV / SV → нельзя
 * → не надо + NSV → tur juftlari → gap tuzish. Kollokatsiyalar (4–5-bosqich)
 * A. Absalomov lug'atidan — ish, mehnat, mahorat haqida. Lug'at 5 bosqich
 * (50 so'z). Matnlar o'zimizniki. 18 ta mashq.
 */
import type { SeedExercise, SeedQuestion } from "../seed-exercises";
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

export const B2_12_ROUNDS: { title: string; words: VocabSeed[] }[] = [
  {
    title: "1-bosqich · Robotlar",
    words: [
      w("🧠", "Искусственный интеллект", "iskússtvinnyy intillyékt", "ibora", "Sun'iy intellekt", "Компьютерные программы, которые умеют «думать».", "Искусственный интеллект уже пишет стихи.", "Sun'iy intellekt allaqachon she'r yozyapti."),
      w("🛞", "Автопилот", "aftapilót", "ot", "Avtopilot", "Система, которая управляет машиной без человека.", "Автопилот сам регулирует скорость.", "Avtopilot tezlikni o'zi boshqaradi."),
      w("🚁", "Беспилотник", "bispilótnik", "ot", "Uchuvchisiz (haydovchisiz) apparat", "Машина или дрон без водителя.", "Беспилотник доставил посылку за десять минут.", "Uchuvchisiz apparat posilkani o'n daqiqada yetkazdi."),
      w("🗺️", "Навигатор", "navigátar", "ot", "Navigator", "Программа, которая показывает дорогу.", "Навигатор показал самый короткий путь.", "Navigator eng qisqa yo'lni ko'rsatdi."),
      w("⚙️", "Механизм", "mikhanízm", "ot", "Mexanizm", "Устройство из деталей, которые двигаются.", "Механизм старых часов очень сложный.", "Eski soat mexanizmi juda murakkab."),
      w("☕", "Автомат", "aftamát", "ot", "Avtomat (qurilma)", "Устройство, которое работает само.", "Кофейный автомат стоит у входа.", "Qahva avtomati kirishda turibdi."),
      w("📉", "Безработица", "bizrabótitsa", "ot", "Ishsizlik", "Когда много людей не могут найти работу.", "Безработица в городе выросла.", "Shahardagi ishsizlik oshdi."),
      w("🏭", "Автоматизация", "aftamatizátsiya", "ot", "Avtomatlashtirish", "Когда работу людей делают машины.", "Автоматизация меняет многие профессии.", "Avtomatlashtirish ko'p kasblarni o'zgartiryapti."),
      w("↩️", "Вытеснять", "vytisnyát'", "fe'l", "Siqib chiqarmoq", "Кого? Что? Занимать чужое место. СВ: вытеснить.", "Машины начинают вытеснять людей с заводов.", "Mashinalar odamlarni zavodlardan siqib chiqara boshlayapti."),
      w("📩", "Поручение", "paruchéniye", "ot", "Topshiriq", "Задание, которое кто-то дал.", "Робот выполнил поручение хозяина.", "Robot egasining topshirig'ini bajardi."),
    ],
  },
  {
    title: "2-bosqich · Texnika fe'llari",
    words: [
      w("🎮", "Управлять", "upravlyát'", "fe'l", "Boshqarmoq", "Чем? Кем? Руководить, вести.", "Ребёнок может управлять дроном с телефона.", "Bola dronni telefondan boshqara oladi."),
      w("✅", "Выполнять", "vypalnyát'", "fe'l", "Bajarmoq", "Что? Делать то, что нужно. СВ: выполнить.", "Робот может выполнять простые команды.", "Robot oddiy buyruqlarni bajara oladi."),
      w("👤", "Распознавать", "raspaznavát'", "fe'l", "Tanib olmoq", "Что? Кого? Узнавать по признакам. СВ: распознать.", "Камера может распознавать лица.", "Kamera yuzlarni tanib olishi mumkin."),
      w("⬇️", "Скачивать", "skáchivat'", "fe'l", "Yuklab olmoq", "Что? Загружать из интернета. СВ: скачать.", "Не надо скачивать эту программу.", "Bu dasturni yuklab olish shart emas."),
      w("💿", "Устанавливать", "ustanávlivat'", "fe'l", "O'rnatmoq (dastur)", "Что? Ставить программу. СВ: установить.", "Мастер будет устанавливать антивирус.", "Usta antivirus o'rnatadi."),
      w("🔌", "Подключать", "padklyuchát'", "fe'l", "Ulamoq", "Что? К чему? Соединять. СВ: подключить.", "Как подключать ноутбук к вайфаю?", "Noutbukni vayfayga qanday ulash kerak?"),
      w("🪫", "Разрядиться", "razridít'sa", "fe'l", "Zaryadi tugamoq", "О телефоне: потерять заряд. НСВ: разряжаться.", "Телефон может разрядиться в самый важный момент.", "Telefonning zaryadi eng muhim paytda tugashi mumkin."),
      w("🔄", "Обновление", "abnavlyéniye", "ot", "Yangilanish", "Новая версия программы (обновлять).", "Обновление программы заняло час.", "Dasturning yangilanishi bir soat oldi."),
      w("📡", "Датчик", "dátchik", "ot", "Datchik, sensor", "Прибор, который реагирует на свет, дым, движение.", "Датчик сообщает, если в доме дым.", "Uyda tutun bo'lsa, datchik xabar beradi."),
      w("🏠", "Умный дом", "úmnyy dom", "ibora", "Aqlli uy", "Дом, где техникой можно управлять с телефона.", "Умный дом сам включает свет вечером.", "Aqlli uy kechqurun chiroqni o'zi yoqadi."),
    ],
  },
  {
    title: "3-bosqich · Fe'l + infinitiv",
    words: [
      w("🛑", "Перестать", "piristát'", "fe'l", "To'xtatmoq (biror ishni)", "+ инф. НСВ. Больше не делать.", "Я решил перестать сидеть в телефоне ночью.", "Kechasi telefonda o'tirishni to'xtatishga qaror qildim."),
      w("⏱️", "Успеть", "uspyét'", "fe'l", "Ulgurmoq", "+ инф. СВ. Сделать вовремя.", "Я хочу успеть закончить проект до пятницы.", "Loyihani jumagacha tugatishga ulgurmoqchiman."),
      w("🎯", "Удаться", "udát'sa", "fe'l", "Muvaffaqiyatli chiqmoq", "Кому? + инф. СВ. Получиться.", "Учёным должно удаться создать новый материал.", "Olimlarga yangi material yaratish muvaffaqiyatli chiqishi kerak."),
      w("✋", "Хватит", "khvátit", "so'z", "Bas, yetar", "+ инф. НСВ. Пора перестать.", "Хватит играть, садись за уроки!", "Bas, o'ynama, darsga o'tir!"),
      w("🙅", "Бесполезно", "bispalyézna", "ravish", "Foydasiz", "+ инф. НСВ. Нет смысла.", "Бесполезно спорить с роботом.", "Robot bilan bahslashish foydasiz."),
      w("🌫️", "Напрасно", "naprásna", "ravish", "Behuda", "+ инф. НСВ. Зря.", "Напрасно ты волнуешься, всё будет хорошо.", "Behuda xavotirlanyapsan, hammasi yaxshi bo'ladi."),
      w("🤚", "Не стоит", "ni stóit", "ibora", "Arzimaydi, kerak emas", "+ инф. НСВ. Не нужно.", "Не стоит покупать дорогой телефон.", "Qimmat telefon sotib olishga arzimaydi."),
      w("📵", "Отвыкнуть", "atvýknut'", "fe'l", "Odatdan chiqmoq", "От чего? + инф. НСВ. Потерять привычку.", "Трудно отвыкнуть от смартфона.", "Smartfondan voz kechish qiyin."),
      w("💪", "Решиться", "rishýt'sa", "fe'l", "Jur'at qilmoq", "На что? + инф. СВ. Смело решить.", "Он долго не мог решиться купить машину.", "U uzoq vaqt mashina sotib olishga jur'at qila olmadi."),
      w("🔔", "Пора", "pará", "so'z", "Vaqt keldi", "Кому? + инф. Настало время.", "Пора выключить компьютер и лечь спать.", "Kompyuterni o'chirib, uxlash vaqti keldi."),
    ],
  },
  {
    title: "4-bosqich · Kollokatsiyalar",
    words: [
      w("🛠️", "Приняться за дело", "prinyát'sa za dyéla", "ibora", "Ishga kirishmoq", "Начать работу.", "После обеда мы снова решили приняться за дело.", "Tushlikdan keyin yana ishga kirishishga qaror qildik."),
      w("💬", "Дело в том, что", "dyéla f tom, shto", "ibora", "Gap shundaki", "Объяснение причины.", "Дело в том, что робот не понимает шуток.", "Gap shundaki, robot hazilni tushunmaydi."),
      w("💡", "Вот в чём дело", "vot f chom dyéla", "ibora", "Gap bu yerda ekan", "Теперь понятна причина.", "Ах, вот в чём дело! Батарейка села.", "Ha, gap bu yerda ekan! Batareya o'tirib qolibdi."),
      w("🔁", "То и дело", "to i dyéla", "ibora", "Tez-tez, ora-sira", "Часто, постоянно.", "Телефон то и дело звонил.", "Telefon tez-tez jiringlab turdi."),
      w("🙌", "Руки не доходят", "rúki ni dakhódyat", "ibora", "Qo'lim tegmaydi", "До чего? Не хватает времени.", "До ремонта всё руки не доходят.", "Ta'mirga hech qo'lim tegmayapti."),
      w("💼", "Жить своим трудом", "zhyt' svaím trudóm", "ibora", "O'z mehnati bilan yashamoq", "Зарабатывать самому.", "Он привык жить своим трудом.", "U o'z mehnati bilan yashashga o'rgangan."),
      w("🧰", "Мастер на все руки", "mástir na fsye rúki", "ibora", "Har ishning ustasi", "Человек, который умеет всё.", "Мой дед — мастер на все руки.", "Bobom — har ishning ustasi."),
      w("😴", "Сидеть сложа руки", "sidyét' slazhá rúki", "ibora", "Qo'l qovushtirib o'tirmoq", "Ничего не делать.", "Нельзя сидеть сложа руки, надо действовать!", "Qo'l qovushtirib o'tirib bo'lmaydi, harakat qilish kerak!"),
      w("📌", "Серьёзно взяться за дело", "sir'yózna vzyát'sa za dyéla", "ibora", "Ishga jiddiy kirishmoq", "Начать работать всерьёз.", "Пора серьёзно взяться за дело.", "Ishga jiddiy kirishish vaqti keldi."),
      w("👌", "Это не составит труда", "éta ni sastávit trudá", "ibora", "Bu qiyin bo'lmaydi", "Это легко.", "Помочь тебе — это не составит труда.", "Senga yordam berish — bu qiyin bo'lmaydi."),
    ],
  },
  {
    title: "5-bosqich · Kollokatsiyalar",
    words: [
      w("🍎", "Плод многолетнего труда", "plot mnagalyétniva trudá", "ibora", "Ko'p yillik mehnat samarasi", "Результат долгой работы.", "Эта книга — плод многолетнего труда.", "Bu kitob — ko'p yillik mehnat samarasi."),
      w("⏳", "Изобрести машину", "izabristí mashýnu", "ibora", "Mashina ixtiro qilmoq", "Придумать новое устройство.", "Он мечтал изобрести машину времени.", "U vaqt mashinasini ixtiro qilishni orzu qilardi."),
      w("▶️", "Машина заработала", "mashýna zarabótala", "ibora", "Mashina ishlab ketdi", "Устройство начало работать.", "Наконец машина заработала!", "Nihoyat mashina ishlab ketdi!"),
      w("🧪", "Испытание машины", "ispytániye mashýny", "ibora", "Mashinani sinash", "Проверка нового устройства.", "Испытание машины прошло успешно.", "Mashinani sinash muvaffaqiyatli o'tdi."),
      w("🙊", "Лезть не в своё дело", "lyest' ni f svayó dyéla", "ibora", "Birovning ishiga aralashmoq", "Вмешиваться в чужие дела.", "Не надо лезть не в своё дело.", "Birovning ishiga aralashish kerak emas."),
      w("🧗", "Встретиться с трудностями", "fstryétit'sa s trúdnastyami", "ibora", "Qiyinchiliklarga duch kelmoq", "Получить проблемы.", "Каждый изобретатель может встретиться с трудностями.", "Har bir ixtirochi qiyinchiliklarga duch kelishi mumkin."),
      w("🏳️", "Отступить перед трудностями", "atstupít' pyérit trúdnastyami", "ibora", "Qiyinchiliklar oldida chekinmoq", "Бросить дело, потому что трудно.", "Настоящий учёный не должен отступить перед трудностями.", "Haqiqiy olim qiyinchiliklar oldida chekinmasligi kerak."),
      w("📈", "Развитие навыков", "razvítiye návykaf", "ibora", "Malakani oshirish", "Когда умения становятся лучше.", "Развитие навыков требует времени.", "Malakani oshirish vaqt talab qiladi."),
      w("🗣️", "Хватит спорить", "khvátit spórit'", "ibora", "Bahsni bas qiling", "Пора закончить спор.", "Хватит спорить, давайте работать!", "Bahsni bas qilinglar, ishlaylik!"),
      w("🧘", "Не стоит волноваться", "ni stóit valnavát'sa", "ibora", "Xavotirga o'rin yo'q", "Не нужно переживать.", "Не стоит волноваться, робот всё сделает.", "Xavotirga o'rin yo'q, robot hammasini qiladi."),
    ],
  },
];

const pick = (prompt: string, options: string[], explanation?: string): SeedQuestion => ({
  prompt,
  options,
  correct: 0,
  explanation,
});
const listen = (audio: string, options: string[]): SeedQuestion => ({
  prompt: "Eshitgan gapingizni toping",
  audio,
  options,
  correct: options.indexOf(audio),
});
const fill = (prompt: string, answer: string, explanation?: string): SeedQuestion => ({ prompt, answer, explanation });
const build = (answer: string): SeedQuestion => ({ prompt: "Gap tuzing", answer });
/** Urg'u: bo'g'inlar "|" bilan, `correct` — urg'uli bo'g'in raqami (0 dan). */
const stress = (syllables: string, correct: number, explanation?: string): SeedQuestion => ({
  prompt: "Urg'uli bo'g'inni toping",
  audio: syllables.replace(/\|/g, ""),
  options: syllables.split("|"),
  correct,
  explanation,
});
/** НЕ + tur — bir xil tartib. */
const NEG = ["Harakat umuman bo'lmagan (не + NSV)", "Urinish bo'lgan, natija yo'q (не + SV)"];
const neg = (prompt: string, k: number): SeedQuestion => ({ prompt, options: NEG, correct: k });
/** НЕЛЬЗЯ + tur — bir xil tartib. */
const BAN = ["Taqiq — ruxsat yo'q (нельзя + NSV)", "Imkonsiz — qilib bo'lmaydi (нельзя + SV)"];
const ban = (prompt: string, k: number): SeedQuestion => ({ prompt, options: BAN, correct: k });

const TF = ["To'g'ri", "Noto'g'ri"];
const ROBOTS =
  "Люди и роботы\n\nМечты о механических помощниках появились у людей задолго до того, как появилось само слово «робот». Ещё в Древней Греции рассказывали о служанке-автомате, которая наливала гостям вино. В восемнадцатом веке в Европе большой популярностью пользовались механические куклы: одна играла на флейте, другая писала письма.\n\nСлово «робот» впервые появилось в пьесе чешского писателя Карела Чапека в 1920 году. Сегодня роботы умеют гораздо больше, чем писатели прошлого могли себе представить. Они собирают машины на заводах, помогают хирургам делать операции, убирают квартиры и даже играют в шахматы лучше чемпионов мира.\n\nНо у технологий есть и обратная сторона. Многие боятся, что машины вытеснят человека из многих профессий и начнётся технологическая безработица. Учёные отвечают, что исчезнут скучные и опасные профессии, но появятся новые. Главное — не переставать учиться.";
const tf = (statement: string, isTrue: boolean, explanation?: string): SeedQuestion => ({
  prompt: `${ROBOTS}||${statement}`,
  options: TF,
  correct: isTrue ? 0 : 1,
  explanation,
});
const AUTO =
  "Машина без водителя\n\nВозможно, скоро автомобили, которыми управляет человек, станут частью истории, а на смену им придут беспилотники. Некоторые функции автопилота водители могут использовать уже сейчас: автомобиль сам регулирует скорость, видит знаки на дороге и даже паркуется. Беспилотные автомобили разрабатывают многие компании мира, в том числе и в России.\n\nСторонники беспилотников говорят, что такие машины будут безопаснее: автопилот не устаёт, не отвлекается на телефон и никогда не садится за руль после праздника. Но специалисты пока не смогли решить все проблемы. Например, если перед машиной вдруг пробежит животное, автопилот должен за секунду принять решение. А как он поступит, если у дороги просто стоят люди и разговаривают? Если машина каждый раз будет останавливаться, ехать станет невозможно.\n\nЧтобы беспилотники стали массовыми, разработчикам нужно доказать, что они не опаснее, чем обычные автомобили. Удастся ли им это сделать — покажет время.";
const read = (question: string, options: string[]): SeedQuestion => ({
  prompt: `${AUTO}||${question}`,
  options,
  correct: 0,
});
const TIMUR =
  "Привет! Меня зовут Тимур, мне четырнадцать лет. Я изобретатель: собираю разные устройства и веду канал о технологиях. Своё первое изобретение я сделал в десять лет — это был робот, который поливал цветы, пока мама была в командировке. Правда, однажды он полил не цветы, а кошку! Пришлось его переделать. Сейчас я работаю над умным домом для бабушки: свет включается голосом, а датчик сам сообщает мне, если бабушка забыла выключить плиту. Многие спрашивают, не боюсь ли я, что роботы оставят людей без работы. Я думаю, бояться не стоит. Роботы будут выполнять скучную и тяжёлую работу, а люди будут заниматься творчеством. Но есть одна вещь, которую машинам никогда не удастся сделать: научиться по-настоящему любить. Поэтому учитесь, изобретайте и не переставайте мечтать!";
const hear = (question: string, options: string[]): SeedQuestion => ({
  prompt: question,
  audio: TIMUR,
  options,
  correct: 0,
});

export const B2_12_EXERCISES: SeedExercise[] = [
  {
    title: "Tinglang va toping",
    skill: "Tinglash",
    kind: "listen",
    instructions: "Gap ovoz chiqarib o'qiladi. Eshitgan gapingizni toping: fe'l turiga e'tibor bering.",
    questions: [
      listen("Вчера я весь вечер писал статью.", ["Вчера я весь вечер писал статью.", "Вчера я весь вечер читал статью.", "Вчера я написал статью.", "Сегодня я весь вечер писал статью."]),
      listen("Хватит сидеть за компьютером!", ["Хватит сидеть за компьютером!", "Хватит сидеть за телефоном!", "Пора сидеть за компьютером!", "Хватит играть за компьютером!"]),
      listen("Я не успел закончить отчёт.", ["Я не успел закончить отчёт.", "Я успел закончить отчёт.", "Я не успел начать отчёт.", "Он не успел закончить отчёт."]),
      listen("Учёным удалось получить графен.", ["Учёным удалось получить графен.", "Учёным не удалось получить графен.", "Учёные смогли получить графен.", "Учёным удалось создать графен."]),
      listen("В этом музее нельзя фотографировать.", ["В этом музее нельзя фотографировать.", "В этом музее можно фотографировать.", "В этом зале нельзя фотографировать.", "В этом музее нельзя сфотографировать."]),
      listen("Не надо скачивать это приложение.", ["Не надо скачивать это приложение.", "Надо скачать это приложение.", "Не надо скачивать эту программу.", "Не надо устанавливать это приложение."]),
      listen("Мой телефон разрядился.", ["Мой телефон разрядился.", "Мой телефон зарядился.", "Мой телефон разряжается.", "Твой телефон разрядился."]),
      listen("Робот выполнил поручение.", ["Робот выполнил поручение.", "Робот выполнял поручение.", "Робот не выполнил поручение.", "Робот выполнит поручение."]),
      listen("Он не сдавал экзамен.", ["Он не сдавал экзамен.", "Он не сдал экзамен.", "Она не сдавала экзамен.", "Он не сдавал зачёт."]),
      listen("Мой дед — мастер на все руки.", ["Мой дед — мастер на все руки.", "Мой дед — мастер спорта.", "Мой брат — мастер на все руки.", "Мой дед — мастер своего дела."]),
    ],
  },
  {
    title: "Diktant",
    skill: "Eshitib yozish",
    kind: "dictation",
    instructions:
      "Gap ovoz chiqarib o'qiladi. Uni eshitib, ruscha yozing (kerak bo'lsa, qayta yoki sekinroq tinglang). Tinish belgilari hisobga olinmaydi.",
    questions: [
      "Вчера я весь вечер писал статью.",
      "Хватит сидеть за компьютером.",
      "Я не успел закончить отчёт.",
      "Учёным удалось получить графен.",
      "В этом музее нельзя фотографировать.",
      "Не надо скачивать это приложение.",
      "У меня разрядился телефон.",
      "Робот выполнил поручение хозяина.",
      "Мой дед — мастер на все руки.",
      "Нельзя сидеть сложа руки.",
    ].map((sentence) => ({ prompt: "Eshitganingizni yozing", audio: sentence, answer: sentence })),
  },
  {
    title: "Juftini toping",
    skill: "Juftlik",
    kind: "match",
    instructions: "Ruscha so'z yoki iborani o'zbekcha tarjimasi bilan ulang.",
    questions: [
      ["искусственный интеллект|sun'iy intellekt", "автопилот|avtopilot", "беспилотник|uchuvchisiz apparat", "навигатор|navigator"],
      ["механизм|mexanizm", "автомат|avtomat", "безработица|ishsizlik", "автоматизация|avtomatlashtirish"],
      ["вытеснять|siqib chiqarmoq", "поручение|topshiriq", "управлять|boshqarmoq", "выполнять|bajarmoq"],
      ["распознавать|tanib olmoq", "скачивать|yuklab olmoq", "устанавливать|o'rnatmoq", "подключать|ulamoq"],
      ["разрядиться|zaryadi tugamoq", "обновление|yangilanish", "датчик|datchik", "умный дом|aqlli uy"],
      ["перестать|to'xtatmoq", "успеть|ulgurmoq", "удаться|muvaffaqiyatli chiqmoq", "хватит|bas"],
      ["бесполезно|foydasiz", "напрасно|behuda", "отвыкнуть|odatdan chiqmoq", "решиться|jur'at qilmoq"],
      ["приняться за дело|ishga kirishmoq", "дело в том, что|gap shundaki", "то и дело|tez-tez", "руки не доходят|qo'lim tegmaydi"],
      ["мастер на все руки|har ishning ustasi", "сидеть сложа руки|qo'l qovushtirib o'tirmoq", "это не составит труда|bu qiyin bo'lmaydi", "жить своим трудом|o'z mehnati bilan yashamoq"],
      ["изобрести машину|mashina ixtiro qilmoq", "лезть не в своё дело|birovning ishiga aralashmoq", "встретиться с трудностями|qiyinchiliklarga duch kelmoq", "развитие навыков|malakani oshirish"],
    ].map((options) => ({ prompt: "Juftlarni ulang", options })),
  },
  {
    title: "Jarayon yoki natija?",
    skill: "Fe'l turi · 1-bosqich",
    kind: "choice",
    instructions:
      "NSV (НЕСОВЕРШЕННЫЙ ВИД) — jarayon, davomiylik, takror: писал весь вечер, каждое утро проверяет. SV (СОВЕРШЕННЫЙ ВИД) — natija, bir martalik tugallangan harakat: написал и отправил. Kelasi zamonda SV — natija: приду и включу. Mos shaklni tanlang.",
    questions: [
      pick("Вчера я весь вечер … статью.", ["писал", "написал", "напишу", "пишу"]),
      pick("Я … статью и сразу отправил её редактору.", ["написал", "писал", "пишу", "напишу"]),
      pick("Каждое утро он … почту.", ["проверяет", "проверит", "проверил", "проверять"]),
      pick("Подожди минутку, я … телефон и приду.", ["заряжу", "заряжал", "зарядил", "заряжать"]),
      pick("Учёные долго … новую программу, но так и не закончили.", ["разрабатывали", "разработали", "разработают", "разработать"]),
      pick("Наконец инженеры … программу, и робот заработал.", ["разработали", "разрабатывали", "разработают", "разрабатывать"]),
      pick("Ты уже … новое приложение?", ["скачал", "скачиваешь бы", "скачаешь бы", "скачивать"]),
      pick("Робот-пылесос … квартиру два раза в неделю.", ["убирает", "уберёт", "убрал", "убрать"]),
      pick("Когда я … домой, я включу свет голосом.", ["приду", "прихожу", "приходил", "пришёл"]),
      pick("Пока я смотрел фильм, телефон полностью … .", ["разрядился", "разряжается", "разрядится", "разряжаться"]),
    ],
  },
  {
    title: "Infinitiv: NSV yoki SV?",
    skill: "Fe'l turi · 2-bosqich",
    kind: "choice",
    instructions:
      "Faqat NSV infinitiv: начинать, продолжать, заканчивать, бросить, перестать, учиться, привыкать, уставать; не надо, не нужно, не стоит, хватит, бесполезно, напрасно. Faqat SV infinitiv: забыть, успеть, удаться. Mos infinitivni tanlang.",
    questions: [
      pick("Елене надоело … все выходные на уборку.", ["тратить", "потратить"]),
      pick("Когда появились электронные книги, Владимир перестал … бумажные.", ["читать", "прочитать"]),
      pick("Сегодня дети начинают … в компьютер раньше, чем учатся читать.", ["играть", "сыграть"]),
      pick("Не стоит … в телефоне больше двух часов в день.", ["сидеть", "посидеть"]),
      pick("Гейму и Новосёлову удалось … графен.", ["получить", "получать"]),
      pick("Хватит … за компьютером, иди гулять!", ["сидеть", "посидеть"]),
      pick("Вчера Сергей забыл … смартфон на зарядку.", ["поставить", "ставить"]),
      pick("Я не успел … отчёт до обеда.", ["закончить", "заканчивать"]),
      pick("Мой дед бросил … десять лет назад.", ["курить", "покурить"]),
      pick("Бесполезно … с ним, он всё равно не согласится.", ["спорить", "поспорить"]),
    ],
  },
  {
    title: "Не читал yoki не прочитал?",
    skill: "Fe'l turi · 3-bosqich",
    kind: "choice",
    instructions:
      "НЕ + NSV — harakat umuman bo'lmagan (kerak bo'lmagan yoki xohlamagan): Мария не читала статью — ochib ham ko'rmagan. НЕ + SV — urinish bo'lgan, lekin natija yo'q: Мария не прочитала статью — boshlagan, lekin tugatmagan. Gap nimani bildiradi?",
    questions: [
      neg("Хуан не искал слово в словаре: он и так всё понял.", 0),
      neg("Хуан не нашёл слово в словаре.", 1),
      neg("Вчера Катя не сдавала экзамен: у неё был выходной.", 0),
      neg("Вчера Катя не сдала экзамен.", 1),
      neg("Олег не подключал ноутбук к вайфаю.", 0),
      neg("Олег не подключил ноутбук к вайфаю, хотя пытался.", 1),
      neg("Я не покупала продукты в этом магазине.", 0),
      neg("Мой брат поступал в университет, но не поступил.", 1),
      neg("Ваня не скачивал это приложение.", 0),
      neg("Ваня не скачал приложение: не хватило памяти.", 1),
    ],
  },
  {
    title: "Нельзя: taqiq yoki imkonsiz?",
    skill: "Fe'l turi · 4-bosqich",
    kind: "choice",
    instructions:
      "НЕЛЬЗЯ + NSV — taqiq, ruxsat yo'q: В музее нельзя фотографировать. НЕЛЬЗЯ + SV — jismonan imkonsiz, qilib bo'lmaydi: Нельзя научить робота чувствовать. Gapdagi «нельзя» nimani bildiradi?",
    questions: [
      ban("В этом музее нельзя фотографировать.", 0),
      ban("Нельзя научить робота чувствовать.", 1),
      ban("Нельзя входить в кабинет без пропуска.", 0),
      ban("Нельзя осмотреть весь Эрмитаж за час.", 1),
      ban("Во время экзамена нельзя пользоваться телефоном.", 0),
      ban("Робота-помощника нельзя купить в магазинах нашего города.", 1),
      ban("Нельзя класть телефон рядом с подушкой.", 0),
      ban("Сегодня нельзя представить себе жизнь без интернета.", 1),
      ban("После одиннадцати вечера нельзя включать музыку громко.", 0),
      ban("На этом сайте нельзя оплатить покупку картой.", 1),
    ],
  },
  {
    title: "Не надо + NSV",
    skill: "Fe'l turi · 5-bosqich",
    kind: "fill",
    instructions:
      "НУЖНО / НАДО + SV (bir martalik vazifa) → inkorda НЕ НАДО / НЕ НУЖНО / НЕ СТОИТ + NSV: Нужно скачать приложение. — Не надо скачивать, оно уже есть. Bo'sh joyga NSV infinitivni yozing (kitobdagi mashq asosida).",
    questions: [
      fill("— Нужно скачать приложение такси. — Не надо ___ его, оно уже есть у меня.", "скачивать"),
      fill("— Нужно взять в музей мороженое? — Не нужно ___ мороженое, там нельзя есть.", "брать"),
      fill("— Нужно заранее купить билеты. — Не стоит ___ билеты заранее, их всегда много.", "покупать"),
      fill("— Нужно посмотреть прогноз погоды. — Не надо ___ прогноз, я уже посмотрел.", "смотреть"),
      fill("— Нужно вызвать такси. — Не надо ___ такси, я тебя отвезу.", "вызывать"),
      fill("— Нужно отказаться от гаджетов. — Не стоит ___ от них совсем, просто пользуйся меньше.", "отказываться"),
      fill("— Нужно обновить программу. — Не надо ___ её сейчас, это займёт час.", "обновлять"),
      fill("— Нужно установить антивирус. — Не нужно ___ его, он уже стоит.", "устанавливать"),
      fill("— Нужно позвонить мастеру. — Не надо ___ мастеру, я сам всё починю.", "звонить"),
      fill("— Нужно сделать пересадку. — Не нужно ___ пересадку, этот поезд идёт прямо.", "делать"),
    ],
  },
  {
    title: "SV juftini yozing",
    skill: "Fe'l juftlari",
    kind: "type",
    instructions: "NSV fe'lning SV juftini yozing: скачивать → скачать.",
    questions: [
      ["скачивать", "скачать"],
      ["устанавливать", "установить"],
      ["подключать", "подключить"],
      ["выполнять", "выполнить"],
      ["распознавать", "распознать"],
      ["решать", "решить"],
      ["получать", "получить"],
      ["заряжать", "зарядить"],
      ["покупать", "купить"],
      ["брать", "взять"],
    ].map(([prompt, answer]) => ({ prompt, answer })),
  },
  {
    title: "Texnika rasmlarda",
    skill: "Rasm",
    kind: "picture",
    instructions: "Rasmga mos so'zni tanlang.",
    questions: [
      pick("🤖", ["робот", "датчик", "навигатор", "автопилот"]),
      pick("🚗🤖", ["беспилотный автомобиль", "автобус", "велосипед", "самолёт"]),
      pick("🗺️📱", ["навигатор", "датчик", "пароль", "аккумулятор"]),
      pick("🏠📱", ["умный дом", "робот-пылесос", "беспилотник", "навигатор"]),
      pick("🔋⚡", ["аккумулятор", "датчик", "автопилот", "пароль"]),
      pick("📶", ["вайфай", "пароль", "навигатор", "датчик"]),
      pick("🔐", ["пароль", "вайфай", "датчик", "автомат"]),
      pick("⬇️📱", ["скачать приложение", "разрядить телефон", "подключить датчик", "управлять машиной"]),
      pick("🧠💻", ["искусственный интеллект", "умный дом", "навигатор", "автомат"]),
      pick("🧹🤖", ["робот-пылесос", "беспилотник", "навигатор", "автопилот"]),
    ],
  },
  {
    title: "Gap tuzing",
    skill: "Fe'l turi · 6-bosqich",
    kind: "order",
    instructions: "So'zlarni to'g'ri tartibda bosib, gap tuzing.",
    questions: [
      build("Вчера я весь вечер писал статью."),
      build("Я написал статью и отправил её редактору."),
      build("Хватит сидеть за компьютером."),
      build("Я не успел закончить отчёт."),
      build("Учёным удалось получить графен."),
      build("Мой дед бросил курить десять лет назад."),
      build("В этом музее нельзя фотографировать."),
      build("Нельзя научить робота чувствовать."),
      build("Не надо скачивать это приложение."),
      build("Робот выполнил поручение хозяина."),
    ],
  },
  {
    title: "Iborani yig'ing",
    skill: "Kollokatsiyalar",
    kind: "match",
    instructions: "Iboraning birinchi qismini ikkinchisi bilan ulang. Ko'pi Absalomov lug'atidan.",
    questions: [
      ["приняться|за дело", "дело в том,|что", "руки не|доходят", "жить своим|трудом"],
      ["мастер на|все руки", "сидеть|сложа руки", "серьёзно взяться|за дело", "это не составит|труда"],
      ["плод многолетнего|труда", "изобрести|машину", "машина|заработала", "испытание|машины"],
      ["лезть не в своё|дело", "встретиться|с трудностями", "отступить перед|трудностями", "развитие|навыков"],
      ["хватит|спорить", "не стоит|волноваться", "бесполезно|объяснять", "напрасно|ждать"],
      ["перестать|курить", "успеть|закончить", "удалось|решить", "решиться|купить"],
      ["искусственный|интеллект", "беспилотный|автомобиль", "умный|дом", "технологическая|безработица"],
      ["скачать|приложение", "установить|антивирус", "подключить|к вайфаю", "поставить|на зарядку"],
      ["управлять|машиной", "выполнять|поручение", "распознавать|лица", "вытеснять|человека"],
      ["вот в чём|дело", "начинать|учиться", "продолжать|работать", "привыкать|вставать рано"],
    ].map((options) => ({ prompt: "Juftlarni ulang", options })),
  },
  {
    title: "Urg'u qayerda?",
    skill: "Urg'u",
    kind: "stress",
    instructions: "So'zni eshiting va urg'uli bo'g'inni bosing.",
    questions: [
      stress("ав|то|пи|лот", 3, "автопило́т"),
      stress("бес|пи|лот|ник", 2, "беспило́тник"),
      stress("на|ви|га|тор", 2, "навига́тор"),
      stress("без|ра|бо|ти|ца", 2, "безрабо́тица"),
      stress("по|ру|че|ни|е", 2, "поруче́ние"),
      stress("дат|чик", 0, "да́тчик"),
      stress("ска|чи|вать", 0, "ска́чивать"),
      stress("на|прас|но", 1, "напра́сно"),
      stress("ус|петь", 1, "успе́ть"),
      stress("хва|тит", 0, "хва́тит"),
    ],
  },
  {
    title: "Texnika bilan vaziyatlar",
    skill: "Vaziyat",
    kind: "situation",
    instructions: "Vaziyatga mos ruscha gapni tanlang.",
    questions: [
      pick("Do'stingizga kompyuter oldida o'tirishni bas qilishni aytasiz.", ["Хватит сидеть за компьютером!", "Хватит посидеть за компьютером!", "Хватит сидел за компьютером!", "Хватит сидеть на компьютером!"]),
      pick("Hisobotni tugatishga ulgurmaganingizni aytasiz.", ["Я не успел закончить отчёт.", "Я не успел заканчивать отчёт.", "Я не успел закончил отчёт.", "Я не успел закончить отчёта."]),
      pick("Bu ilovani yuklab olish shart emasligini aytasiz (u sizda bor).", ["Не надо скачивать это приложение.", "Не надо скачать это приложение.", "Не надо скачиваешь это приложение.", "Не надо скачивать этого приложение."]),
      pick("Bu muzeyda suratga olish taqiqlanganini aytasiz.", ["Здесь нельзя фотографировать.", "Здесь нельзя сфотографировать.", "Здесь нельзя фотографировал.", "Здесь нельзя фотографию."]),
      pick("Telefoningiz zaryadi tugaganini aytasiz.", ["У меня разрядился телефон.", "У меня разрядил телефон.", "Меня разрядился телефон.", "У меня разрядилась телефон."]),
      pick("Kitobni o'qishni boshlaganingiz, ammo oxirigacha o'qimaganingizni aytasiz.", ["Я читал эту книгу, но не прочитал до конца.", "Я прочитал эту книгу, но не читал до конца.", "Я не читал эту книгу, но прочитал до конца.", "Я читал эту книгу, но не читал до конца."]),
      pick("Bu filmni umuman ko'rmaganingizni aytasiz.", ["Я не смотрел этот фильм.", "Я не посмотрю этот фильм вчера.", "Я не смотрю этот фильм вчера.", "Я не смотреть этот фильм."]),
      pick("Olimlar yangi material yaratishga muvaffaq bo'lganini aytasiz.", ["Учёным удалось создать новый материал.", "Учёные удалось создать новый материал.", "Учёным удалось создавать новый материал.", "Учёным удалось создали новый материал."]),
      pick("Do'stingizga xavotirlanishga o'rin yo'qligini aytasiz.", ["Не стоит волноваться!", "Не стоит взволноваться!", "Не стоит волнуйся!", "Не стоят волноваться!"]),
      pick("Vayfayga ulanishga urindingiz, lekin bo'lmadi.", ["Я не смог подключиться к вайфаю.", "Я не смог подключаться к вайфаю.", "Я не смог подключился к вайфаю.", "Я не смог подключиться вайфаю."]),
    ],
  },
  {
    title: "Odamlar va robotlar",
    skill: "O'qish",
    kind: "truefalse",
    instructions: "Robotlar tarixi haqidagi matnni o'qing va gap to'g'ri yoki noto'g'ri ekanini belgilang.",
    questions: [
      tf("Мечты о роботах появились раньше, чем слово «робот».", true),
      tf("В Древней Греции рассказывали о служанке-автомате.", true),
      tf("Механические куклы восемнадцатого века умели писать письма.", true),
      tf("Слово «робот» впервые появилось в двадцать первом веке.", false, "В 1920 году."),
      tf("Слово «робот» придумали в Америке.", false, "Оно появилось в пьесе чешского писателя."),
      tf("Роботы помогают хирургам делать операции.", true),
      tf("Роботы пока не умеют играть в шахматы.", false, "Они играют лучше чемпионов мира."),
      tf("Многие боятся технологической безработицы.", true),
      tf("Учёные считают, что новые профессии не появятся.", false, "Появятся новые профессии."),
      tf("Автор советует не переставать учиться.", true),
    ],
  },
  {
    title: "Haydovchisiz mashina",
    skill: "Matn bilan ishlash",
    kind: "reading",
    instructions: "Haydovchisiz avtomobillar haqidagi matnni o'qing va savollarga javob bering. NSV va SV fe'llarga e'tibor bering.",
    questions: [
      read("Что, возможно, скоро станет частью истории?", ["Автомобили, которыми управляет человек.", "Беспилотники.", "Дороги.", "Автопилот."]),
      read("Что автопилот умеет уже сейчас?", ["Регулировать скорость и парковаться.", "Летать.", "Сам себя чинить.", "Сам заправляться."]),
      read("Кто разрабатывает беспилотные автомобили?", ["Многие компании мира, в том числе в России.", "Только одна компания.", "Только университеты.", "Никто."]),
      read("Почему беспилотники могут быть безопаснее?", ["Автопилот не устаёт и не отвлекается.", "Они медленнее.", "Они дешевле.", "Они меньше."]),
      read("Решили ли специалисты все проблемы?", ["Нет, пока не смогли.", "Да, все.", "Да, в прошлом году.", "Об этом не сказано."]),
      read("Что должен сделать автопилот, если перед машиной пробежит животное?", ["За секунду принять решение.", "Позвонить владельцу.", "Ехать дальше.", "Выключиться."]),
      read("Какая проблема с людьми у дороги?", ["Если машина каждый раз будет останавливаться, ехать станет невозможно.", "Люди боятся машин.", "Машина их не видит.", "Люди закрывают знаки."]),
      read("Что нужно доказать разработчикам?", ["Что беспилотники не опаснее обычных машин.", "Что они быстрее.", "Что они красивее.", "Что они дешевле."]),
      read("Чем заканчивается текст?", ["Удастся ли это — покажет время.", "Беспилотники уже везде.", "Беспилотники запретят.", "Водители против беспилотников."]),
      read("Какое слово в тексте значит «машина без водителя»?", ["Беспилотник.", "Навигатор.", "Автомат.", "Механизм."]),
    ],
  },
  {
    title: "Yosh ixtirochi",
    skill: "Tinglab tushunish",
    kind: "audiotext",
    instructions:
      "O'n to'rt yoshli ixtirochi Temurning hikoyasini tinglang (kerak bo'lsa, qayta yoki sekinroq) va savollarga javob bering. Matn ekranda ko'rsatilmaydi.",
    questions: [
      hear("Сколько лет Тимуру?", ["Четырнадцать.", "Десять.", "Двадцать.", "Двенадцать."]),
      hear("Чем он занимается?", ["Собирает устройства и ведёт канал о технологиях.", "Играет в футбол.", "Рисует.", "Учит языки."]),
      hear("Когда он сделал первое изобретение?", ["В десять лет.", "В четырнадцать лет.", "В пять лет.", "В прошлом году."]),
      hear("Что делал его первый робот?", ["Поливал цветы.", "Убирал квартиру.", "Готовил еду.", "Играл в шахматы."]),
      hear("Что однажды случилось с роботом?", ["Он полил кошку.", "Он сломался.", "Он потерялся.", "Он разбил окно."]),
      hear("Для кого Тимур делает умный дом?", ["Для бабушки.", "Для мамы.", "Для себя.", "Для школы."]),
      hear("О чём сообщает датчик?", ["Что бабушка забыла выключить плиту.", "Что пришли гости.", "Что идёт дождь.", "Что пора спать."]),
      hear("Боится ли Тимур, что роботы оставят людей без работы?", ["Нет, он думает, что бояться не стоит.", "Да, очень.", "Он об этом не думал.", "Да, поэтому перестал изобретать."]),
      hear("Чем, по его мнению, будут заниматься люди?", ["Творчеством.", "Ничем.", "Тяжёлой работой.", "Ремонтом роботов."]),
      hear("Что машинам никогда не удастся, по мнению Тимура?", ["Научиться по-настоящему любить.", "Играть в шахматы.", "Водить машину.", "Поливать цветы."]),
    ],
  },
  {
    title: "Ayting",
    skill: "Talaffuz",
    kind: "speak",
    instructions: "Gapni eshiting, keyin mikrofon tugmasini bosib o'zingiz ayting.",
    questions: [
      "Хватит сидеть за компьютером!",
      "Я не успел закончить отчёт.",
      "Учёным удалось получить графен.",
      "Здесь нельзя фотографировать.",
      "Не надо скачивать это приложение.",
      "У меня разрядился телефон.",
      "Я не смог подключиться к вайфаю.",
      "Не стоит волноваться!",
      "Мой дед — мастер на все руки.",
      "Нельзя сидеть сложа руки.",
    ].map((phrase) => ({ prompt: phrase, answer: phrase })),
  },
];
