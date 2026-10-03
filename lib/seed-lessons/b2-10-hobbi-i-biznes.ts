/**
 * B2, 10-dars — «Хобби и бизнес» (Liden & Denz, «Я ❤ Русский Язык», B1.2,
 * 2-urok 2-modul, 2-qism va modul testi): hobbi daromad manbai sifatida
 * (kvest loyihasi asoschisi bilan intervyu), tarixdagi buyuk odamlarning
 * hobbilari (Pyotr I, Nikolay I va II, Mendeleyev, Tolstoy); grammatika —
 * harakat fe'llarining KO'CHMA ma'nosi: ИДТИ (время идёт, дождь идёт,
 * фильм идёт, автобус идёт до…, кому идёт что, мысль пришла в голову,
 * выставка проходит), ЛЕТЕТЬ (время летит, вылететь из головы), ВЕСТИ /
 * ВОДИТЬ (вести блог, дневник, урок; водить машину; завести знакомство),
 * НОСИТЬ / НЕСТИ (носить очки, носить имя; приносить радость), ВЕЗТИ
 * (кому везёт / повезло — Д.п.); fe'ldan yasalgan otlar (вязать →
 * вязание).
 *
 * Zinapoya: to'g'ri yoki ko'chma → fe'lni tanlash → boshqacha aytish →
 * kimga? (Д.п.) → fe'ldan ot → gap tuzish. Kollokatsiyalar (4-bosqich)
 * A. Absalomov lug'atidan, 5-bosqich — harakat fe'llari bilan keng
 * tarqalgan iboralar. Lug'at 5 bosqich (50 so'z). Matnlar o'zimizniki.
 * 18 ta mashq.
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

export const B2_10_ROUNDS: { title: string; words: VocabSeed[] }[] = [
  {
    title: "1-bosqich · Hobbidan biznesgacha",
    words: [
      w("🗝️", "Квест", "kvest", "ot", "Kvest (topishmoqli o'yin)", "Игра, где нужно решать загадки и искать выход.", "Мы прошли квест за пятьдесят минут.", "Kvestni ellik daqiqada o'tdik."),
      w("🚀", "Стартап", "startáp", "ot", "Startap", "Новый молодой бизнес-проект.", "Его стартап быстро стал популярным.", "Uning startapi tezda mashhur bo'ldi."),
      w("💹", "Прибыльный", "príbyl'nyy", "sifat", "Daromadli", "Такой, который приносит деньги.", "Это прибыльный бизнес.", "Bu daromadli biznes."),
      w("📉", "Убыточный", "ubýtachnyy", "sifat", "Zarar keltiruvchi", "Такой, который приносит потери.", "Убыточный проект пришлось закрыть.", "Zarar keltiruvchi loyihani yopishga to'g'ri keldi."),
      w("🔁", "Окупаться", "akupát'sa", "fe'l", "O'zini oqlamoq (xarajat)", "Возвращать вложенные деньги. СВ: окупиться.", "Хороший бизнес должен окупаться за два-три года.", "Yaxshi biznes ikki-uch yilda o'zini oqlashi kerak."),
      w("📋", "Бизнес-план", "bíznis-plan", "ot", "Biznes-reja", "План, как будет работать новый бизнес.", "Перед стартом нужно написать бизнес-план.", "Boshlashdan oldin biznes-reja yozish kerak."),
      w("🏪", "Франшиза", "franshýza", "ot", "Franshiza", "Право работать под известным брендом.", "Франшиза позволяет открыть бизнес под известным брендом.", "Franshiza mashhur brend nomi ostida biznes ochishga imkon beradi."),
      w("🪙", "Нумизмат", "numizmát", "ot", "Numizmat (tanga yig'uvchi)", "Человек, который собирает монеты.", "Мой сосед — опытный нумизмат.", "Qo'shnim — tajribali numizmat."),
      w("🔥", "Увлечённый", "uvlichónnyy", "sifat", "Ishqiboz, berilib ketgan", "Тот, кто очень любит своё дело.", "Увлечённый человек не замечает времени.", "Ishqiboz odam vaqtni sezmaydi."),
      w("💰", "Монетизировать", "manitizíravat'", "fe'l", "Pulga aylantirmoq", "Что? Начать зарабатывать на чём-то.", "Многие блогеры хотят монетизировать свой канал.", "Ko'p blogerlar o'z kanalini pulga aylantirmoqchi."),
    ],
  },
  {
    title: "2-bosqich · ИДТИ va ЛЕТЕТЬ",
    words: [
      w("🕰️", "Время идёт", "vryémya idyót", "ibora", "Vaqt o'tyapti", "Время проходит.", "Время идёт, а мы всё ещё ждём.", "Vaqt o'tyapti, biz esa hamon kutyapmiz."),
      w("⏩", "Время летит", "vryémya litít", "ibora", "Vaqt uchib o'tyapti", "Время проходит очень быстро.", "С любимым делом время летит незаметно.", "Sevimli ish bilan vaqt sezilmay uchib o'tadi."),
      w("👗", "Тебе идёт", "tibyé idyót", "ibora", "Senga yarashadi", "Кому идёт что? Хорошо смотрится на ком-то.", "Тебе идёт этот зелёный цвет.", "Bu yashil rang senga yarashadi."),
      w("🎬", "Фильм идёт", "fil'm idyót", "ibora", "Film namoyish etilyapti", "Фильм показывают в кино.", "Новый фильм идёт во всех кинотеатрах.", "Yangi film hamma kinoteatrlarda namoyish etilyapti."),
      w("💡", "Мысль пришла", "mysl' prishlá", "ibora", "Fikr keldi", "Кому? В голову: появилась идея.", "Вдруг мысль пришла мне в голову.", "To'satdan xayolimga bir fikr keldi."),
      w("😍", "Сходить с ума", "skhadít' s umá", "ibora", "Telbalarcha yaxshi ko'rmoq", "По чему? По кому? (разг.) Очень сильно любить что-то.", "Многие подростки начинают сходить с ума по аниме.", "Ko'p o'smirlar animeni telbalarcha yaxshi ko'ra boshlaydi."),
      w("🖼️", "Выставка проходит", "výstafka prakhódit", "ibora", "Ko'rgazma bo'lib o'tmoqda", "Где? Выставка работает.", "Выставка проходит в центре города.", "Ko'rgazma shahar markazida bo'lib o'tmoqda."),
      w("🤯", "Вылететь из головы", "výlitit' iz galavý", "ibora", "Esdan chiqib ketmoq", "У кого? Быстро забыться.", "Его имя может легко вылететь из головы.", "Uning ismi osongina esdan chiqib ketishi mumkin."),
      w("🚌", "Автобус идёт", "aftóbus idyót", "ibora", "Avtobus qatnaydi", "До чего? Ходит по маршруту.", "Этот автобус идёт до вокзала.", "Bu avtobus vokzalgacha qatnaydi."),
      w("🎭", "Спектакль идёт", "spiktákl' idyót", "ibora", "Spektakl qo'yilyapti", "Спектакль показывают в театре.", "Этот спектакль идёт в театре уже двадцать лет.", "Bu spektakl teatrda yigirma yildan beri qo'yilyapti."),
    ],
  },
  {
    title: "3-bosqich · ВЕСТИ, НОСИТЬ, ВЕЗТИ",
    words: [
      w("💻", "Вести блог", "vistí blok", "ibora", "Blog yuritmoq", "Регулярно писать в интернете.", "Она начала вести блог о рукоделии.", "U qo'l hunari haqida blog yurita boshladi."),
      w("📔", "Вести дневник", "vistí dnivník", "ibora", "Kundalik yuritmoq", "Регулярно записывать события.", "Писатель советует вести дневник каждый день.", "Yozuvchi har kuni kundalik yuritishni maslahat beradi."),
      w("👩‍🏫", "Вести урок", "vistí urók", "ibora", "Dars o'tmoq", "Проводить занятие.", "Новый учитель будет вести урок йоги.", "Yoga darsini yangi o'qituvchi o'tadi."),
      w("🚗", "Водить машину", "vadít' mashýnu", "ibora", "Mashina haydamoq", "Уметь управлять машиной.", "Катя умеет водить машину с восемнадцати лет.", "Katya o'n sakkiz yoshidan mashina hayday oladi."),
      w("🤝", "Завести знакомство", "zavistí znakómstva", "ibora", "Tanishlik orttirmoq", "С кем? Познакомиться.", "На фестивале легко завести знакомство.", "Festivalda tanishlik orttirish oson."),
      w("👓", "Носить очки", "nasít' achkí", "ibora", "Ko'zoynak taqmoq", "Всегда быть в очках.", "Он начал носить очки в школе.", "U maktabda ko'zoynak taqa boshladi."),
      w("🏛️", "Носить имя", "nasít' ímya", "ibora", "Nomini olgan bo'lmoq", "Чьё? Называться в честь кого-то.", "Музей будет носить имя Пушкина.", "Muzey Pushkin nomini oladi."),
      w("😊", "Приносить радость", "prinasít' rádast'", "ibora", "Quvonch keltirmoq", "Кому? Делать кого-то счастливым.", "Любимое дело должно приносить радость.", "Sevimli ish quvonch keltirishi kerak."),
      w("🍀", "Мне везёт", "mnye vizyót", "ibora", "Menga omad kulib boqyapti", "Кому везёт? У кого-то удача.", "В последнее время мне везёт во всём.", "So'nggi paytlarda menga hamma narsada omad kulib boqyapti."),
      w("🎉", "Повезло", "pavizló", "fe'l", "Omadi keldi", "Кому? С чем? Была удача (прош. вр.).", "Нам повезло с погодой.", "Ob-havo bo'yicha omadimiz keldi."),
    ],
  },
  {
    title: "4-bosqich · Kollokatsiyalar",
    words: [
      w("⌛", "Время не ждёт", "vryémya ni zhdyót", "ibora", "Vaqt ziq (g'animat)", "Надо спешить.", "Решай быстрее — время не ждёт!", "Tezroq qaror qil — vaqt ziq!"),
      w("🌷", "Весна идёт", "visná idyót", "ibora", "Bahor kelyapti", "Наступает весна.", "Весна идёт, на улице всё теплее.", "Bahor kelyapti, tashqari tobora iliq."),
      w("🏁", "Дело идёт к концу", "dyéla idyót k kantsú", "ibora", "Ish oxiriga yetyapti", "Скоро всё будет закончено.", "Ремонт почти закончен — дело идёт к концу.", "Ta'mir deyarli tugadi — ish oxiriga yetyapti."),
      w("📱", "Идти в ногу с современностью", "ití v nógu s savrimyénnast'yu", "ibora", "Zamon bilan hamnafas bo'lmoq", "Не отставать от времени.", "Музеи стараются идти в ногу с современностью.", "Muzeylar zamon bilan hamnafas bo'lishga harakat qiladi."),
      w("🗯️", "Нести чепуху", "nistí chipukhú", "ibora", "Bema'ni gaplarni valdiramoq", "Говорить глупости.", "Не надо нести чепуху, говори серьёзно!", "Bema'ni gaplarni valdirama, jiddiy gapir!"),
      w("🥛", "Молоко бежит", "malakó bizhýt", "ibora", "Sut toshyapti", "Молоко кипит и выливается.", "Выключи плиту, молоко бежит!", "Plitani o'chir, sut toshyapti!"),
      w("🧊", "Идёт град", "idyót grat", "ibora", "Do'l yog'yapti", "С неба падают кусочки льда.", "На улице идёт град, не выходи.", "Tashqarida do'l yog'yapti, chiqma."),
      w("🌲", "Дорога идёт лесом", "daróga idyót lyésam", "ibora", "Yo'l o'rmon ichidan o'tadi", "Дорога проходит через лес.", "Дальше дорога идёт лесом.", "Bundan keyin yo'l o'rmon ichidan o'tadi."),
      w("🎖️", "Нести службу", "nistí slúzhbu", "ibora", "Xizmat qilmoq (harbiy)", "Служить в армии.", "Мой брат будет нести службу на границе.", "Akam chegarada xizmat qiladi."),
      w("💨", "Время быстро мчится", "vryémya býstra mchítsa", "ibora", "Vaqt tez o'tib ketyapti", "Время проходит очень быстро.", "Дети растут, время быстро мчится.", "Bolalar o'syapti, vaqt tez o'tib ketyapti."),
    ],
  },
  {
    title: "5-bosqich · Kollokatsiyalar",
    words: [
      w("🗣️", "Речь идёт", "ryech' idyót", "ibora", "Gap … haqida bormoqda", "О чём? Говорят о чём-то.", "Речь идёт о новом проекте.", "Gap yangi loyiha haqida bormoqda."),
      w("📈", "Дела идут", "dilá idút", "ibora", "Ishlar yurishyapti", "Как? Работа или жизнь развивается.", "Дела идут хорошо, проект окупился.", "Ishlar yaxshi yurishyapti, loyiha o'zini oqladi."),
      w("🎲", "Идти на риск", "ití na risk", "ibora", "Tavakkal qilmoq", "Делать что-то опасное ради цели.", "Чтобы открыть бизнес, нужно идти на риск.", "Biznes ochish uchun tavakkal qilish kerak."),
      w("🤲", "Идти навстречу", "ití nafstryéchu", "ibora", "Yon bosmoq, kelishmoq", "Кому? Помогать, соглашаться.", "Директор всегда готов идти навстречу сотрудникам.", "Direktor doim xodimlarga yon bosishga tayyor."),
      w("⚖️", "Нести ответственность", "nistí atvyétstvinnast'", "ibora", "Javobgar bo'lmoq", "За что? Отвечать за результат.", "Руководитель должен нести ответственность за команду.", "Rahbar jamoa uchun javobgar bo'lishi kerak."),
      w("🤥", "Водить за нос", "vadít' za nos", "ibora", "Laqillatmoq", "Кого? Обманывать, обещать и не делать.", "Он любит водить за нос своих друзей.", "U do'stlarini laqillatishni yaxshi ko'radi."),
      w("🤝", "Вести переговоры", "vistí pirigavóry", "ibora", "Muzokara olib bormoq", "С кем? Обсуждать условия.", "Директор будет вести переговоры с инвесторами.", "Direktor investorlar bilan muzokara olib boradi."),
      w("🔢", "Вести счёт", "vistí shchyot", "ibora", "Hisob yuritmoq", "Чему? Считать очки, деньги.", "В игре нужно вести счёт очкам.", "O'yinda ochkolar hisobini yuritish kerak."),
      w("🌙", "Приходить в голову", "prikhadít' v galavú", "ibora", "Xayolga kelmoq", "Кому? О мыслях, идеях: появляться.", "Лучшие идеи могут приходить в голову ночью.", "Eng yaxshi g'oyalar kechasi xayolga kelishi mumkin."),
      w("⚙️", "Работа кипит", "rabóta kipít", "ibora", "Ish qizg'in", "Все активно работают.", "До фестиваля неделя, работа кипит!", "Festivalgacha bir hafta, ish qizg'in!"),
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
/** Ma'no turi — bir xil tartib. */
const SENSE = ["To'g'ri ma'no (harakat)", "Ko'chma ma'no"];
const sense = (prompt: string, k: number): SeedQuestion => ({ prompt, options: SENSE, correct: k });

const TF = ["To'g'ri", "Noto'g'ri"];
const LUCKY =
  "Как мне повезло\n\nВ понедельник у меня всё шло не так. Будильник не зазвонил, на улице шёл холодный дождь, а мой автобус ушёл прямо перед носом. Следующий автобус шёл только через двадцать минут. На работе я понял, что забыл дома очки, — а я ношу их уже десять лет. Кроме того, у меня совершенно вылетело из головы, что в десять часов я веду урок для новых сотрудников. Я пришёл в класс без плана, но тут мне в голову пришла отличная идея: я предложил всем рассказать о своих хобби. Урок прошёл замечательно, и время пролетело незаметно. После работы коллега пригласил меня на выставку фотографии, которая проходит в центре города. Там я познакомился с фотографом, который ведёт популярный блог о путешествиях. Мы завели разговор и решили вместе поехать в горы. Вечером я подумал: всё-таки мне сегодня очень повезло!";
const tf = (statement: string, isTrue: boolean, explanation?: string): SeedQuestion => ({
  prompt: `${LUCKY}||${statement}`,
  options: TF,
  correct: isTrue ? 0 : 1,
  explanation,
});
const GREAT =
  "Великие люди и их хобби\n\nУ знаменитых людей прошлого тоже были увлечения, иногда очень неожиданные. Пётр Первый любил работать руками: он часами стоял у токарного станка и даже сам лечил зубы своим придворным. Император собирал редкие вещи со всего мира — так появилась Кунсткамера, первый музей России.\n\nНиколай Первый сам рисовал эскизы военной формы для армии: говорят, это занятие помогало ему отдохнуть от государственных дел. А Николай Второй увлекался фотографией — его семья оставила тысячи снимков.\n\nДмитрий Менделеев, автор периодической таблицы, в свободное время делал чемоданы. Делал он это так хорошо, что люди заказывали у него чемоданы, а в магазинах о нём говорили как о «чемоданных дел мастере».\n\nЛев Толстой научился кататься на велосипеде, когда ему было шестьдесят семь лет, и каждое утро делал зарядку. Видно, правду говорят: учиться новому никогда не поздно.";
const read = (question: string, options: string[]): SeedQuestion => ({
  prompt: `${GREAT}||${question}`,
  options,
  correct: 0,
});
const QUEST =
  "— Артём, как появилась идея вашего проекта?\n— Мысль пришла мне в голову случайно. Я работал менеджером в банке, а в свободное время с друзьями придумывал квесты по городу. Сначала это было просто хобби: мы водили друзей по старым улицам и прятали загадки в кафе и музеях.\n— Когда вы поняли, что хобби может приносить доход?\n— Когда о наших квестах узнали незнакомые люди и стали спрашивать, сколько стоит игра. Тогда я написал бизнес-план и ушёл из банка. Честно говоря, было страшно: я шёл на риск.\n— И как идут дела сейчас?\n— Неплохо! Проект окупился за полтора года. Сейчас наши квесты проходят в двенадцати городах, а в прошлом году мы продали первую франшизу.\n— В чём секрет успеха?\n— Я думаю, бизнесом нужно заниматься как хобби — с удовольствием. Если работа не приносит радости, время идёт медленно, а если ты увлечён, время летит.\n— А на свои хобби время остаётся?\n— Мне повезло: моё хобби и есть моя работа. Но я ещё веду блог о путешествиях и учусь водить яхту.";
const hear = (question: string, options: string[]): SeedQuestion => ({
  prompt: question,
  audio: QUEST,
  options,
  correct: 0,
});

export const B2_10_EXERCISES: SeedExercise[] = [
  {
    title: "Tinglang va toping",
    skill: "Tinglash",
    kind: "listen",
    instructions: "Gap ovoz chiqarib o'qiladi. Eshitgan gapingizni toping.",
    questions: [
      listen("Время летит незаметно.", ["Время летит незаметно.", "Время идёт незаметно.", "Время летело незаметно.", "Время летит заметно."]),
      listen("Тебе очень идёт это платье.", ["Тебе очень идёт это платье.", "Тебе очень идёт эта шапка.", "Тебе очень шло это платье.", "Ей очень идёт это платье."]),
      listen("Мне сегодня везёт!", ["Мне сегодня везёт!", "Мне сегодня повезло!", "Ему сегодня везёт!", "Мне сегодня не везёт!"]),
      listen("Она ведёт блог о рукоделии.", ["Она ведёт блог о рукоделии.", "Она вела блог о рукоделии.", "Она ведёт блог о путешествиях.", "Он ведёт блог о рукоделии."]),
      listen("Его имя вылетело у меня из головы.", ["Его имя вылетело у меня из головы.", "Её имя вылетело у меня из головы.", "Его имя пришло мне в голову.", "Его фамилия вылетела у меня из головы."]),
      listen("На улице идёт снег.", ["На улице идёт снег.", "На улице идёт дождь.", "На улице шёл снег.", "На улице идёт град."]),
      listen("Музей носит имя Пушкина.", ["Музей носит имя Пушкина.", "Музей носит имя Толстого.", "Улица носит имя Пушкина.", "Музей носил имя Пушкина."]),
      listen("Мне пришла в голову отличная идея.", ["Мне пришла в голову отличная идея.", "Ему пришла в голову отличная идея.", "Мне пришла в голову странная идея.", "Мне приходит в голову отличная идея."]),
      listen("Хобби приносит ему радость.", ["Хобби приносит ему радость.", "Хобби приносит ему деньги.", "Хобби приносило ему радость.", "Хобби приносит ей радость."]),
      listen("Дела идут хорошо.", ["Дела идут хорошо.", "Дела шли хорошо.", "Дела идут плохо.", "Дела пойдут хорошо."]),
    ],
  },
  {
    title: "Diktant",
    skill: "Eshitib yozish",
    kind: "dictation",
    instructions:
      "Gap ovoz chiqarib o'qiladi. Uni eshitib, ruscha yozing (kerak bo'lsa, qayta yoki sekinroq tinglang). Tinish belgilari hisobga olinmaydi.",
    questions: [
      "Время летит незаметно.",
      "Тебе очень идёт это платье.",
      "Мне сегодня везёт.",
      "Она ведёт блог о рукоделии.",
      "Его имя вылетело у меня из головы.",
      "На улице идёт снег.",
      "Музей носит имя Пушкина.",
      "Мне пришла в голову отличная идея.",
      "Хобби приносит ему радость.",
      "Время не ждёт.",
    ].map((sentence) => ({ prompt: "Eshitganingizni yozing", audio: sentence, answer: sentence })),
  },
  {
    title: "Juftini toping",
    skill: "Juftlik",
    kind: "match",
    instructions: "Ruscha so'z yoki iborani o'zbekcha tarjimasi bilan ulang.",
    questions: [
      ["квест|kvest", "стартап|startap", "прибыльный|daromadli", "убыточный|zarar keltiruvchi"],
      ["окупаться|o'zini oqlamoq", "бизнес-план|biznes-reja", "франшиза|franshiza", "нумизмат|numizmat"],
      ["увлечённый|ishqiboz", "монетизировать|pulga aylantirmoq", "время идёт|vaqt o'tyapti", "время летит|vaqt uchib o'tyapti"],
      ["тебе идёт|senga yarashadi", "фильм идёт|film namoyish etilyapti", "мысль пришла|fikr keldi", "сходить с ума|telbalarcha yaxshi ko'rmoq"],
      ["выставка проходит|ko'rgazma bo'lib o'tmoqda", "вылететь из головы|esdan chiqib ketmoq", "автобус идёт|avtobus qatnaydi", "спектакль идёт|spektakl qo'yilyapti"],
      ["вести блог|blog yuritmoq", "вести дневник|kundalik yuritmoq", "вести урок|dars o'tmoq", "водить машину|mashina haydamoq"],
      ["завести знакомство|tanishlik orttirmoq", "носить очки|ko'zoynak taqmoq", "носить имя|nomini olgan bo'lmoq", "приносить радость|quvonch keltirmoq"],
      ["мне везёт|menga omad kulib boqyapti", "повезло|omadi keldi", "время не ждёт|vaqt ziq", "молоко бежит|sut toshyapti"],
      ["идти в ногу с современностью|zamon bilan hamnafas bo'lmoq", "нести чепуху|bema'ni gaplarni valdiramoq", "идёт град|do'l yog'yapti", "нести службу|xizmat qilmoq"],
      ["идти на риск|tavakkal qilmoq", "идти навстречу|yon bosmoq", "водить за нос|laqillatmoq", "работа кипит|ish qizg'in"],
    ].map((options) => ({ prompt: "Juftlarni ulang", options })),
  },
  {
    title: "To'g'ri yoki ko'chma?",
    skill: "Ko'chma ma'no · 1-bosqich",
    kind: "choice",
    instructions:
      "Harakat fe'llari ko'pincha harakatni emas, boshqa narsani bildiradi: время идёт (vaqt o'tadi), тебе идёт (yarashadi), мне везёт (omadim keladi), вести блог (yuritmoq), носить очки (taqmoq). Gapdagi fe'l to'g'ri ma'nodami yoki ko'chma ma'nodami?",
    questions: [
      sense("Мальчик идёт в школу.", 0),
      sense("Время идёт быстро.", 1),
      sense("Эта шапка тебе очень идёт.", 1),
      sense("Мама несёт тяжёлую сумку.", 0),
      sense("Хобби приносит ему радость.", 1),
      sense("Папа ведёт сына в детский сад.", 0),
      sense("Она ведёт блог о кулинарии.", 1),
      sense("Мне сегодня везёт!", 1),
      sense("Грузовик везёт мебель.", 0),
      sense("Он носит очки с детства.", 1),
    ],
  },
  {
    title: "Fe'lni tanlang",
    skill: "Ko'chma ma'no · 2-bosqich",
    kind: "choice",
    instructions: "Gapga ma'nosi mos fe'lni tanlang (kitobdagi mashq asosida).",
    questions: [
      pick("Ты сегодня прекрасно выглядишь! Тебе очень … новая причёска!", ["идёт", "ходит", "несёт", "ведёт"]),
      pick("Любимое дело может … не только удовольствие, но и деньги.", ["приносить", "приводить", "привозить", "приходить"]),
      pick("Если занимаешься чем-то интересным, время … быстрее.", ["летит", "ходит", "везёт", "носит"]),
      pick("Из-за плохого зрения многие рукодельницы … очки.", ["носят", "несут", "водят", "ведут"]),
      pick("Многие творческие люди … дневники, чтобы записывать идеи.", ["ведут", "водят", "носят", "несут"]),
      pick("Сейчас в кино … фильм «Вязание по пятницам».", ["идёт", "ходит", "едет", "летит"]),
      pick("Андрей — настоящий счастливчик! Ему всегда … .", ["везёт", "ведёт", "носит", "идёт"]),
      pick("В Москве регулярно … выставки товаров для творчества.", ["проходят", "приходят", "заходят", "уходят"]),
      pick("В Санкт-Петербурге часто … дожди.", ["идут", "ходят", "едут", "бегут"]),
      pick("Ой, у меня совсем … из головы, что сегодня концерт!", ["вылетело", "улетело", "прилетело", "пролетело"]),
    ],
  },
  {
    title: "Boshqacha ayting",
    skill: "Ko'chma ma'no · 3-bosqich",
    kind: "fill",
    instructions: "Gapni harakat fe'lining ko'chma ma'nosi bilan qayta ayting: bo'sh joyga fe'lni to'g'ri shaklda yozing (kitobdagi mashq asosida).",
    questions: [
      fill("Карина часто ходит в джинсах. = Карина часто ___ джинсы.", "носит"),
      fill("Женя выиграла бесплатный курс в Париже! Вот удача! = Жене ___!", "повезло"),
      fill("Ольга отлично управляет машиной. = Ольга отлично ___ машину.", "водит"),
      fill("Музей назвали в честь поэта Пушкина. = Музей ___ имя поэта Пушкина.", "носит"),
      fill("Миша часто пишет на своей страничке в интернете. = Миша ___ блог.", "ведёт|ведет"),
      fill("Во время разговора у него появилась отличная идея. = Ему в голову ___ отличная идея.", "пришла"),
      fill("По пятницам по телевизору показывают интересные фильмы. = По пятницам по телевизору ___ интересные фильмы.", "идут"),
      fill("До музея можно доехать на автобусе номер 5. = До музея ___ автобус номер 5.", "идёт|идет"),
      fill("Для Олега гибкий график — это удобно. = Олегу ___ гибкий график.", "подходит"),
      fill("Я забыл его имя. = Его имя ___ у меня из головы.", "вылетело"),
    ],
  },
  {
    title: "Kimga? (Д.п.)",
    skill: "Ko'chma ma'no · 4-bosqich",
    kind: "choice",
    instructions:
      "ИДТИ (yarashmoq), ПОДХОДИТЬ, ВЕЗТИ / ПОВЕЗЛО, ПРИЙТИ В ГОЛОВУ — KIMGA? (Д.п.): Тебе идёт; Нам повезло; Мне пришла в голову идея. Mos shaklni tanlang.",
    questions: [
      pick("… очень повезло с погодой.", ["Нам", "Мы", "Нас", "Нами"]),
      pick("Этот цвет … не идёт.", ["тебе", "ты", "тебя", "тобой"]),
      pick("… всегда везёт в лотерею.", ["Брату", "Брат", "Брата", "Братом"]),
      pick("Это платье … очень идёт.", ["Маше", "Маша", "Машу", "Машей"]),
      pick("… пришла в голову интересная идея.", ["Ему", "Он", "Его", "Им"]),
      pick("Такая работа … не подходит.", ["мне", "я", "меня", "мной"]),
      pick("… совсем не везёт в любви.", ["Ей", "Она", "Её", "Ею"]),
      pick("Шляпа … идёт больше, чем кепка.", ["вам", "вы", "вас", "вами"]),
      pick("… повезло купить последний билет.", ["Студентам", "Студенты", "Студентов", "Студентами"]),
      pick("Эта мысль … даже не пришла в голову.", ["нам", "мы", "нас", "нами"]),
    ],
  },
  {
    title: "Fe'ldan ot yasang",
    skill: "So'z yasash",
    kind: "type",
    instructions:
      "Hobbilarning nomi ko'pincha fe'ldan -НИЕ / -АНИЕ / -ЕНИЕ qo'shimchasi bilan yasaladi: вязать → вязание, изучать → изучение, создавать → создание. Fe'ldan otni yasang.",
    questions: [
      ["вязать", "вязание"],
      ["вышивать", "вышивание"],
      ["раскрашивать", "раскрашивание"],
      ["изучать", "изучение"],
      ["посещать", "посещение"],
      ["декорировать", "декорирование"],
      ["создавать", "создание"],
      ["осваивать", "освоение"],
      ["увлекаться", "увлечение"],
      ["объединять", "объединение"],
    ].map(([prompt, answer]) => ({ prompt, answer })),
  },
  {
    title: "Rasmga qarab ayting",
    skill: "Rasm",
    kind: "picture",
    instructions: "Rasmga mos iborani tanlang.",
    questions: [
      pick("🌧️", ["идёт дождь", "ходит дождь", "едет дождь", "летит дождь"]),
      pick("❄️", ["идёт снег", "ходит снег", "бежит снег", "едет снег"]),
      pick("🍀", ["мне везёт", "мне ведёт", "мне несёт", "мне носит"]),
      pick("👓", ["носить очки", "нести очки", "вести очки", "водить очки"]),
      pick("📔✍️", ["вести дневник", "водить дневник", "носить дневник", "нести дневник"]),
      pick("💡", ["мне пришла в голову идея", "мне пришёл в голову идея", "мне пришла в голове идея", "меня пришла в голову идея"]),
      pick("⏳💨", ["время летит", "время ездит", "время носит", "время водит"]),
      pick("🎬", ["идёт фильм", "ходит фильм", "едет фильм", "ведёт фильм"]),
      pick("🚗", ["водить машину", "носить машину", "нести машину", "возить машину"]),
      pick("🥛♨️", ["молоко бежит", "молоко идёт", "молоко летит", "молоко ездит"]),
    ],
  },
  {
    title: "Gap tuzing",
    skill: "Ko'chma ma'no · 5-bosqich",
    kind: "order",
    instructions: "So'zlarni to'g'ri tartibda bosib, gap tuzing.",
    questions: [
      build("Время летит незаметно."),
      build("Тебе очень идёт это зелёное платье."),
      build("Нам повезло с погодой."),
      build("Моя сестра ведёт блог о рукоделии."),
      build("Его имя вылетело у меня из головы."),
      build("До музея идёт автобус номер пять."),
      build("Этот музей носит имя Пушкина."),
      build("Мне пришла в голову отличная идея."),
      build("Любимое дело приносит радость и деньги."),
      build("Чтобы открыть бизнес, нужно идти на риск."),
    ],
  },
  {
    title: "Iborani yig'ing",
    skill: "Kollokatsiyalar",
    kind: "match",
    instructions: "Iboraning birinchi qismini ikkinchisi bilan ulang. Bir qismi Absalomov lug'atidan, bir qismi kitobdan.",
    questions: [
      ["время|не ждёт", "весна|идёт", "дело идёт|к концу", "идти в ногу|с современностью"],
      ["нести|чепуху", "молоко|бежит", "идёт|град", "дорога идёт|лесом"],
      ["нести|службу", "время быстро|мчится", "речь|идёт", "дела|идут"],
      ["идти на|риск", "идти|навстречу", "нести|ответственность", "водить|за нос"],
      ["вести|переговоры", "приходить|в голову", "работа|кипит", "носить|имя"],
      ["вести|блог", "водить|машину", "завести|знакомство", "носить|очки"],
      ["приносить|радость", "вылететь|из головы", "сходить|с ума", "мысль|пришла"],
      ["тебе|идёт", "мне|везёт", "нам|повезло", "идёт|снег"],
      ["носить|джинсы", "вести|экскурсию", "заводить|друзей", "проводить|время"],
      ["прибыльный|бизнес", "написать|бизнес-план", "купить|франшизу", "пройти|квест"],
    ].map((options) => ({ prompt: "Juftlarni ulang", options })),
  },
  {
    title: "Urg'u qayerda?",
    skill: "Urg'u",
    kind: "stress",
    instructions: "So'zni eshiting va urg'uli bo'g'inni bosing.",
    questions: [
      stress("стар|тап", 1, "старта́п"),
      stress("при|быль|ный", 0, "при́быльный"),
      stress("у|бы|точ|ный", 1, "убы́точный"),
      stress("о|ку|пать|ся", 2, "окупа́ться"),
      stress("фран|ши|за", 1, "франши́за"),
      stress("ну|миз|мат", 2, "нумизма́т"),
      stress("у|вле|чён|ный", 2, "увлечённый"),
      stress("мо|не|ти|зи|ро|вать", 3, "монетизи́ровать"),
      stress("по|вез|ло", 2, "повезло́"),
      stress("ве|сти", 1, "вести́"),
    ],
  },
  {
    title: "Ko'chma ma'noda ayting",
    skill: "Vaziyat",
    kind: "situation",
    instructions: "Vaziyatga mos ruscha gapni tanlang.",
    questions: [
      pick("Dugonangizga yangi soch turmagi yarashganini aytasiz.", ["Тебе очень идёт новая причёска!", "Ты очень идёт новая причёска!", "Тебе очень ходит новая причёска!", "Тебя очень идёт новая причёска!"]),
      pick("Do'stingizga omadi kelganini aytasiz.", ["Тебе повезло!", "Ты повезло!", "Тебя повезло!", "Тебе повёз!"]),
      pick("Uning ismi esingizdan chiqib ketganini aytasiz.", ["Его имя вылетело у меня из головы.", "Его имя вылетел у меня из головы.", "Его имя улетело у меня в голову.", "Его имя вылетело меня из головы."]),
      pick("Vaqt qanchalik tez o'tishini aytasiz.", ["Как быстро летит время!", "Как быстро ходит время!", "Как быстро носит время!", "Как быстро ведёт время!"]),
      pick("Muzeygacha qaysi avtobus borishini so'raysiz.", ["Какой автобус идёт до музея?", "Какой автобус ведёт до музея?", "Какой автобус несёт до музея?", "Какой автобус едет в музее?"]),
      pick("Kinoda hozir qanday film ketayotganini so'raysiz.", ["Какой фильм сейчас идёт в кино?", "Какой фильм сейчас ходит в кино?", "Какой фильм сейчас ведёт в кино?", "Какой фильм сейчас летит в кино?"]),
      pick("Sayohat haqida blog yuritishingizni aytasiz.", ["Я веду блог о путешествиях.", "Я вожу блог о путешествиях.", "Я ношу блог о путешествиях.", "Я несу блог о путешествиях."]),
      pick("Bu ish sizga to'g'ri kelmasligini aytasiz.", ["Эта работа мне не подходит.", "Эта работа меня не подходит.", "Эта работа мне не подходят.", "Эта работа мной не подходит."]),
      pick("Xayolingizga ajoyib fikr kelganini aytasiz.", ["Мне пришла в голову отличная идея!", "Мне пришёл в голову отличная идея!", "Я пришла в голову отличная идея!", "Мне пришла на голову отличная идея!"]),
      pick("Do'stingizdan sizni laqillatmaslikni so'raysiz.", ["Не води меня за нос!", "Не веди меня за нос!", "Не носи меня за нос!", "Не води мне за нос!"]),
    ],
  },
  {
    title: "Do'kon va kino",
    skill: "Dialog",
    kind: "dialog",
    instructions: "Dugonangiz bilan do'kondasiz. Uning gapiga mos javobni tanlang.",
    questions: [
      pick("Как тебе это платье?", ["Очень красивое! Тебе идёт этот цвет.", "Очень красивое! Ты идёт этот цвет.", "Очень красивое! Тебе ходит этот цвет.", "Очень красивая! Тебе идёт этот цвет."]),
      pick("А может, взять синее?", ["Нет, синий цвет тебе меньше идёт.", "Нет, синий цвет тебя меньше идёт.", "Нет, синий цвет тебе меньше ходит.", "Нет, синий цвет тебе меньший идёт."]),
      pick("Ой, сегодня скидка тридцать процентов!", ["Вот повезло! Бери скорее.", "Вот повёз! Бери скорее.", "Вот везло! Бери скорее.", "Вот повезла! Бери скорее."]),
      pick("Сколько времени мы уже здесь?", ["Уже два часа! Время летит незаметно.", "Уже два часа! Время ходит незаметно.", "Уже два часа! Время ведёт незаметно.", "Уже два часа! Время носит незаметно."]),
      pick("Пойдём в кино? Что там сейчас идёт?", ["Идёт новая комедия, начало в семь.", "Ходит новая комедия, начало в семь.", "Едет новая комедия, начало в семь.", "Идёт новый комедия, начало в семь."]),
      pick("А как до кинотеатра добраться?", ["Туда идёт автобус номер пять.", "Туда ведёт автобус номер пять.", "Туда несёт автобус номер пять.", "Туда идёт автобусом номер пять."]),
      pick("Ой, я забыла, как называется фильм.", ["У меня тоже название вылетело из головы.", "У меня тоже название вылетел из головы.", "У меня тоже название улетело в голову.", "У меня тоже название вылетело из голове."]),
      pick("Ты ведь ведёшь блог о кино?", ["Да, уже два года веду.", "Да, уже два года вожу.", "Да, уже два года ношу.", "Да, уже два года ведёшь."]),
      pick("Напишешь о сегодняшнем фильме?", ["Конечно, если он принесёт мне вдохновение.", "Конечно, если он принесёт меня вдохновение.", "Конечно, если он приведёт мне вдохновение.", "Конечно, если он принесут мне вдохновение."]),
      pick("Тогда бежим, а то опоздаем!", ["Бежим! Время не ждёт.", "Бежим! Время не ждут.", "Бежим! Время не ждёшь.", "Бежим! Время не жди."]),
    ],
  },
  {
    title: "Omadli kun",
    skill: "O'qish",
    kind: "truefalse",
    instructions: "Matnni o'qing va gap to'g'ri yoki noto'g'ri ekanini belgilang. Harakat fe'llarining ko'chma ma'nosiga e'tibor bering.",
    questions: [
      tf("В понедельник утром шёл дождь.", true),
      tf("Автор успел на свой автобус.", false, "Автобус ушёл прямо перед носом."),
      tf("Следующий автобус шёл через двадцать минут.", true),
      tf("Автор не носит очки.", false, "Он носит их уже десять лет."),
      tf("Он забыл, что ведёт урок.", true),
      tf("На уроке время шло медленно.", false, "Время пролетело незаметно."),
      tf("Идея урока пришла ему в голову в классе.", true),
      tf("Выставка проходит за городом.", false, "В центре города."),
      tf("Фотограф ведёт блог о путешествиях.", true),
      tf("Вечером автор решил, что день был неудачным.", false, "Он решил, что ему повезло."),
    ],
  },
  {
    title: "Buyuk odamlarning hobbilari",
    skill: "Matn bilan ishlash",
    kind: "reading",
    instructions: "Tarixdagi mashhur odamlarning hobbilari haqidagi matnni o'qing va savollarga javob bering.",
    questions: [
      read("Что любил делать Пётр Первый?", ["Работать руками.", "Рисовать.", "Шить.", "Кататься на велосипеде."]),
      read("Кому Пётр Первый лечил зубы?", ["Своим придворным.", "Солдатам.", "Детям.", "Животным."]),
      read("Какой музей появился благодаря коллекции Петра?", ["Кунсткамера.", "Эрмитаж.", "Русский музей.", "Третьяковская галерея."]),
      read("Что рисовал Николай Первый?", ["Эскизы военной формы.", "Портреты.", "Карты.", "Пейзажи."]),
      read("Зачем он это делал?", ["Чтобы отдохнуть от государственных дел.", "Чтобы заработать.", "Для выставки.", "Для детей."]),
      read("Чем увлекался Николай Второй?", ["Фотографией.", "Боксом.", "Шитьём.", "Вязанием."]),
      read("Что делал Менделеев?", ["Чемоданы.", "Платья.", "Обувь.", "Шапки."]),
      read("Как о нём говорили в магазинах?", ["«Чемоданных дел мастер».", "«Великий химик».", "«Император».", "«Мастер на час»."]),
      read("Во сколько лет Толстой научился кататься на велосипеде?", ["В шестьдесят семь.", "В семь.", "В двадцать.", "В сорок."]),
      read("Какой вывод делает автор?", ["Учиться новому никогда не поздно.", "Хобби мешает работе.", "Великим людям некогда отдыхать.", "Велосипед опасен."]),
    ],
  },
  {
    title: "Hobbi biznesga aylanganda",
    skill: "Tinglab tushunish",
    kind: "audiotext",
    instructions:
      "Shahar kvestlari loyihasi asoschisi Artyom bilan intervyuni tinglang (kerak bo'lsa, qayta yoki sekinroq) va savollarga javob bering. Matn ekranda ko'rsatilmaydi.",
    questions: [
      hear("Кем Артём работал раньше?", ["Менеджером в банке.", "Гидом.", "Учителем.", "Программистом."]),
      hear("Что он делал в свободное время?", ["Придумывал квесты по городу.", "Вёл уроки.", "Водил машину.", "Собирал монеты."]),
      hear("Где они прятали загадки?", ["В кафе и музеях.", "В парках.", "В метро.", "В школах."]),
      hear("Когда он понял, что хобби может приносить доход?", ["Когда незнакомые люди стали спрашивать о цене игры.", "Когда его уволили.", "Когда выиграл конкурс.", "Когда открыл банк."]),
      hear("Что он сделал перед уходом из банка?", ["Написал бизнес-план.", "Купил франшизу.", "Взял кредит.", "Открыл кафе."]),
      hear("Почему ему было страшно?", ["Он шёл на риск.", "Он боялся темноты.", "У него не было друзей.", "Он не умел играть."]),
      hear("За сколько окупился проект?", ["За полтора года.", "За месяц.", "За пять лет.", "Ещё не окупился."]),
      hear("В скольких городах проходят квесты?", ["В двенадцати.", "В двух.", "В пятидесяти.", "В одном."]),
      hear("В чём, по мнению Артёма, секрет успеха?", ["Заниматься бизнесом как хобби — с удовольствием.", "Много работать без отдыха.", "Брать кредиты.", "Не рисковать."]),
      hear("Чем ещё увлекается Артём?", ["Ведёт блог и учится водить яхту.", "Собирает монеты.", "Вяжет.", "Играет на скрипке."]),
    ],
  },
  {
    title: "Ayting",
    skill: "Talaffuz",
    kind: "speak",
    instructions: "Gapni eshiting, keyin mikrofon tugmasini bosib o'zingiz ayting.",
    questions: [
      "Время летит незаметно.",
      "Тебе очень идёт это платье!",
      "Мне сегодня везёт!",
      "Нам повезло с погодой.",
      "Я веду блог о путешествиях.",
      "Его имя вылетело у меня из головы.",
      "Мне пришла в голову идея.",
      "Какой фильм сейчас идёт?",
      "Хобби приносит мне радость.",
      "Время не ждёт!",
    ].map((phrase) => ({ prompt: phrase, answer: phrase })),
  },
];
