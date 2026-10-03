/**
 * B2, 6-dars — «Писатели-путешественники» (Liden & Denz, «Я ❤ Русский
 * Язык», B1.2, 1-urok 2-modul grammatikasi, 3-qism va modul testi):
 * N. Gogol Rimda, I. Goncharov «Pallada» fregatida dunyo bo'ylab, Ilf va
 * Petrov «Bir qavatli Amerika»da; grammatika — prefiksli harakat
 * fe'llari: ПРО- (мимо + Р.п.; через / сквозь + В.п.; masofa; o'tib
 * bo'lmaslik), ПО- + II guruh (походить — qisqa) va ПРО- + II guruh
 * (проходить два часа — uzoq), ЗА- (yo'l-yo'lakay kirish: зайти в
 * аптеку, заехать за другом; за + Т.п. — orqasiga), ОБ-/ОБО- (вокруг +
 * Р.п. — aylanib o'tish, aylanib yurish); prefiks va predloglarni
 * takrorlash.
 *
 * Zinapoya: prefiks ma'nosi → ПРО- ma'nolari → походил/проходил → ЗА-
 * → ОБ- → predloglar → hamma prefikslar (takrorlash) → gap tuzish.
 * Kollokatsiyalar (4–5-bosqich) asosan A. Absalomov lug'atidan. Lug'at
 * 5 bosqich (50 so'z). Matnlar o'zimizniki. 19 ta mashq.
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

export const B2_06_ROUNDS: { title: string; words: VocabSeed[] }[] = [
  {
    title: "1-bosqich · Yozuvchi va safar",
    words: [
      w("🗒️", "Путевые заметки", "putyévyye zamyétki", "ibora", "Safar qaydlari", "Записи о том, что человек видел в путешествии.", "Гончаров превратил свои путевые заметки в книгу.", "Goncharov safar qaydlarini kitobga aylantirdi."),
      w("📰", "Очерк", "óchirk", "ot", "Ocherk", "Небольшой рассказ о реальных людях и событиях.", "Журналист написал очерк о маленьком городе.", "Jurnalist kichik shahar haqida ocherk yozdi."),
      w("📔", "Дневник", "dnivník", "ot", "Kundalik", "Тетрадь, где человек каждый день записывает события.", "Каждый вечер Петров записывал впечатления в дневник.", "Petrov har kecha taassurotlarini kundalikka yozib borardi."),
      w("🎙️", "Корреспондент", "karrispandyént", "ot", "Muxbir", "Журналист, который пишет для газеты из разных мест.", "Корреспондент газеты поехал в Америку.", "Gazeta muxbiri Amerikaga jo'nadi."),
      w("🧭", "Экспедиция", "ekspidítsiya", "ot", "Ekspeditsiya", "Поездка группы людей с научной или другой целью.", "Экспедиция продолжалась почти три года.", "Ekspeditsiya qariyb uch yil davom etdi."),
      w("⛵", "Фрегат", "frigát", "ot", "Fregat (harbiy kema)", "Большой военный парусный корабль.", "Фрегат «Паллада» вышел из Кронштадта в 1852 году.", "«Pallada» fregati 1852 yilda Kronshtadtdan chiqdi."),
      w("🌍", "Кругосветное путешествие", "krugasvyétnaye putishéstviye", "ibora", "Dunyo bo'ylab sayohat", "Путешествие вокруг всего мира.", "Кругосветное путешествие — мечта многих людей.", "Dunyo bo'ylab sayohat — ko'pchilikning orzusi."),
      w("🕊️", "Паломничество", "palómnichistva", "ot", "Ziyorat", "Путешествие к святым местам.", "В 1848 году Гоголь отправился в паломничество в Иерусалим.", "1848 yilda Gogol Quddusga ziyoratga jo'nadi."),
      w("📜", "Рукопись", "rúkapis'", "ot", "Qo'lyozma", "Текст, написанный рукой автора.", "Писатель сжёг рукопись второго тома.", "Yozuvchi ikkinchi jildning qo'lyozmasini yoqib yubordi."),
      w("💰", "Сокровищница", "sakróvishchnitsa", "ot", "Xazina", "Место, где хранятся большие ценности.", "Эрмитаж — настоящая сокровищница искусства.", "Ermitaj — san'atning haqiqiy xazinasi."),
    ],
  },
  {
    title: "2-bosqich · Prefiksli fe'llar",
    words: [
      w("🚗", "Проезжать", "prayezzhát'", "fe'l", "O'tib ketmoq (ulovda)", "Мимо чего? Через что? Ехать, не останавливаясь. СВ: проехать.", "Мне нравится проезжать по мосту ночью.", "Kechasi ko'prikdan o'tib ketishni yoqtiraman."),
      w("✈️", "Пролетать", "pralitát'", "fe'l", "Uchib o'tmoq", "Над чем? Мимо чего? Лететь, не останавливаясь. СВ: пролететь.", "Самолёты начали пролетать над нашим домом.", "Samolyotlar uyimiz ustidan uchib o'ta boshladi."),
      w("🚪", "Заходить", "zakhadít'", "fe'l", "Kirib chiqmoq (yo'l-yo'lakay)", "Куда? К кому? Ненадолго приходить по пути. СВ: зайти.", "Ты можешь заходить к нам в любое время.", "Bizga istalgan vaqtda kirib chiqishing mumkin."),
      w("🛒", "Заезжать", "zayezzhát'", "fe'l", "Yo'l-yo'lakay kirmoq (ulovda)", "Куда? За кем? Ненадолго приезжать по пути. СВ: заехать.", "По дороге домой я люблю заезжать на рынок.", "Uyga ketayotib bozorga kirib o'tishni yaxshi ko'raman."),
      w("🏃‍♀️", "Забегать", "zabigát'", "fe'l", "Yugurib kirib chiqmoq", "Куда? К кому? Ненадолго и быстро заходить. СВ: забежать.", "Дети любят забегать к бабушке после школы.", "Bolalar maktabdan keyin buvisinikiga yugurib kirib chiqishni yaxshi ko'radi."),
      w("🩺", "Обходить", "abkhadít'", "fe'l", "Atrofidan aylanib yurmoq", "Что? Вокруг чего? Идти вокруг; побывать во многих местах. СВ: обойти.", "Врач начинает обходить больных в девять утра.", "Shifokor bemorlarni ertalab soat to'qqizda aylanib chiqa boshlaydi."),
      w("🚧", "Объезжать", "abyezzhát'", "fe'l", "Aylanma yo'ldan o'tmoq (ulovda)", "Что? Ехать вокруг препятствия. СВ: объехать.", "Водителям приходится объезжать центр из-за ремонта.", "Haydovchilar ta'mir tufayli markazni aylanib o'tishga majbur."),
      w("🛰️", "Облетать", "ablitát'", "fe'l", "Uchib aylanmoq", "Что? Вокруг чего? Лететь вокруг. СВ: облететь.", "Спутник может облетать Землю за полтора часа.", "Sun'iy yo'ldosh Yerni bir yarim soatda aylanib chiqishi mumkin."),
      w("🚶", "Походить", "pakhadít'", "fe'l", "Biroz yurib turmoq", "По чему? Немного, недолго ходить. СВ.", "После обеда хорошо походить по парку.", "Tushlikdan keyin bog'da biroz yurish yaxshi."),
      w("🏊", "Проплыть", "praplýt'", "fe'l", "Suzib o'tmoq", "Что? Под чем? Плыть какое-то расстояние или мимо. НСВ: проплывать.", "Он смог проплыть пять километров без остановки.", "U to'xtamasdan besh kilometr suzib o'ta oldi."),
    ],
  },
  {
    title: "3-bosqich · Yo'lda",
    words: [
      w("🚧", "Шлагбаум", "shlagbáum", "ot", "Shlagbaum (to'siq)", "Палка, которая закрывает дорогу для машин.", "Мы не можем проехать, потому что шлагбаум не работает.", "O'ta olmaymiz, chunki shlagbaum ishlamayapti."),
      w("💧", "Лужа", "lúzha", "ot", "Ko'lmak", "Вода на земле после дождя.", "После дождя на дороге большая лужа.", "Yomg'irdan keyin yo'lda katta ko'lmak bor."),
      w("🌐", "Земной шар", "zimnóy shar", "ibora", "Yer shari", "Вся Земля, весь мир.", "Путешественник объехал весь земной шар.", "Sayohatchi butun yer sharini kezib chiqdi."),
      w("🪡", "Сквозь", "skvos'", "predlog", "Orqali (yorib)", "Что? (В.п.) Через что-то плотное.", "Мы прошли сквозь толпу и вышли на площадь.", "Olomonni yorib o'tib, maydonga chiqdik."),
      w("🌧️", "Насквозь", "naskvós'", "ravish", "Shilta bo'lib, butunlay", "Совсем, через всю толщину.", "Под дождём я промок насквозь.", "Yomg'irda shilta bo'lib ho'l bo'ldim."),
      w("🚷", "Проход", "prakhót", "ot", "O'tish yo'li", "Место, где можно пройти.", "Проход через парк закрыт.", "Bog' orqali o'tish yo'li yopiq."),
      w("⛽", "Заправка", "zapráfka", "ot", "Yoqilg'i quyish shoxobchasi", "Место, где покупают бензин для машины.", "Ближайшая заправка — через десять километров.", "Eng yaqin yoqilg'i quyish shoxobchasi — o'n kilometrdan keyin."),
      w("🛣️", "Обочина", "abóchina", "ot", "Yo'l cheti", "Край дороги, где не ездят машины.", "Обочина дороги была вся в цветах.", "Yo'l cheti butunlay gulga to'la edi."),
      w("🚛", "Колонна", "kalónna", "ot", "Kolonna (mashinalar qatori)", "Много машин или людей, которые идут друг за другом.", "Колонна грузовиков медленно ехала по дороге.", "Yuk mashinalari kolonnasi yo'lda sekin ketayotgan edi."),
      w("✏️", "Контур", "kóntur", "ot", "Kontur", "Линия, которая показывает форму предмета.", "Дети обвели контур рисунка карандашом.", "Bolalar rasm konturini qalam bilan aylantirib chizishdi."),
    ],
  },
  {
    title: "4-bosqich · Kollokatsiyalar",
    words: [
      w("🗣️", "Провести беседу", "pravistí bisyédu", "ibora", "Suhbat o'tkazmoq", "С кем? Поговорить на важную тему.", "Учитель решил провести беседу с родителями.", "O'qituvchi ota-onalar bilan suhbat o'tkazishga qaror qildi."),
      w("🚘", "Завести машину", "zavistí mashýnu", "ibora", "Mashinani o't oldirmoq", "Включить мотор машины.", "Зимой трудно завести машину.", "Qishda mashinani o't oldirish qiyin."),
      w("🐕", "Завести собаку", "zavistí sabáku", "ibora", "It boqmoq", "Взять собаку жить дома.", "Мы давно хотим завести собаку.", "Anchadan beri it boqmoqchimiz."),
      w("💬", "Завести разговор", "zavistí razgavór", "ibora", "Gap boshlamoq", "С кем? О чём? Начать разговор.", "В поезде легко завести разговор с попутчиком.", "Poyezdda hamroh bilan gap boshlash oson."),
      w("🤐", "Обойти щекотливый вопрос", "abaytí shchikatlívyy vaprós", "ibora", "Nozik masalani chetlab o'tmoq", "Не говорить о неприятной теме.", "Политик постарался обойти щекотливый вопрос.", "Siyosatchi nozik masalani chetlab o'tishga harakat qildi."),
      w("📣", "Облететь весь мир", "ablitét' vyes' mir", "ibora", "Butun dunyoga tarqalmoq (xabar)", "О новости: быстро стать известной везде.", "Эта новость успела облететь весь мир за час.", "Bu xabar bir soatda butun dunyoga tarqalishga ulgurdi."),
      w("👀", "Пробежать глазами", "prabizhát' glazámi", "ibora", "Ko'z yugurtirmoq", "Что? Быстро прочитать.", "Я успел только пробежать глазами статью.", "Maqolaga faqat ko'z yugurtirishga ulgurdim."),
      w("➖", "Провести черту", "pravistí chirtú", "ibora", "Chegara qo'ymoq", "Между чем? Чётко разделить.", "Пора провести черту между работой и отдыхом.", "Ish bilan dam olish o'rtasiga chegara qo'yish vaqti keldi."),
      w("💡", "Провести идею в жизнь", "pravistí idyéyu v zhyzn'", "ibora", "G'oyani amalga oshirmoq", "Сделать так, чтобы идея стала реальностью.", "Инженеру удалось провести идею в жизнь.", "Muhandis g'oyani amalga oshira oldi."),
      w("🎉", "Весело провести праздник", "vyésila pravistí prázdnik", "ibora", "Bayramni quvnoq o'tkazmoq", "Радостно отметить праздник.", "Мы хотим весело провести праздник с друзьями.", "Bayramni do'stlar bilan quvnoq o'tkazmoqchimiz."),
    ],
  },
  {
    title: "5-bosqich · Kollokatsiyalar",
    words: [
      w("🌲", "Пройти через лес", "praytí chéris lyes", "ibora", "O'rmondan o'tmoq", "Идти от одного края леса до другого.", "Чтобы дойти до деревни, надо пройти через лес.", "Qishloqqa yetish uchun o'rmondan o'tish kerak."),
      w("🏙️", "Проехать площадь", "prayékhat' plóshchat'", "ibora", "Maydondan o'tmoq (ulovda)", "Ехать через площадь до конца.", "Нужно проехать площадь и повернуть налево.", "Maydondan o'tib, chapga burilish kerak."),
      w("🔙", "Пойти обратно", "paytí abrátna", "ibora", "Orqaga qaytmoq", "Начать идти назад.", "Стемнело, и мы решили пойти обратно.", "Qorong'i tushdi va biz orqaga qaytishga qaror qildik."),
      w("⏰", "Завести часы", "zavistí chisý", "ibora", "Soatni burab qo'ymoq", "Сделать так, чтобы механические часы шли.", "Дедушка каждый вечер не забывает завести часы.", "Bobom har kecha soatni burab qo'yishni unutmaydi."),
      w("🧱", "Зайти в тупик", "zaytí f tupík", "ibora", "Boshi berk ko'chaga kirmoq", "Попасть в ситуацию, где нет выхода.", "Переговоры могут зайти в тупик.", "Muzokaralar boshi berk ko'chaga kirib qolishi mumkin."),
      w("⏳", "Время пролетело", "vryémya pralityéla", "ibora", "Vaqt uchib o'tdi", "Время прошло очень быстро.", "Отпуск закончился — время пролетело незаметно.", "Ta'til tugadi — vaqt sezilmay uchib o'tdi."),
      w("🚙", "Заехать за другом", "zayékhat' za drúgam", "ibora", "Do'stini olib ketish uchun kirmoq", "Приехать к другу, чтобы взять его с собой.", "По дороге в аэропорт нам нужно заехать за другом.", "Aeroportga ketayotib do'stimizni olib ketish uchun kirishimiz kerak."),
      w("🚶‍♂️", "Пройти мимо", "praytí mímo", "ibora", "Yonidan o'tib ketmoq", "Чего? Кого? Идти рядом и не остановиться.", "Нельзя пройти мимо такой красоты!", "Bunday go'zallik yonidan o'tib ketib bo'lmaydi!"),
      w("🗺️", "Обойти весь город", "abaytí vyes' górat", "ibora", "Butun shaharni aylanib chiqmoq", "Побывать пешком во всех местах города.", "За один день мы успели обойти весь город.", "Bir kunda butun shaharni aylanib chiqishga ulgurdik."),
      w("👋", "Проводить гостей", "pravadít' gastyéy", "ibora", "Mehmonlarni kuzatib qo'ymoq", "Пойти с гостями, когда они уходят.", "Хозяин вышел проводить гостей до машины.", "Uy egasi mehmonlarni mashinagacha kuzatib qo'ygani chiqdi."),
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
/** Prefiks ma'nosi — bir xil tartib. */
const PREFIXES = ["ПРО- — yonidan / orqali o'tish", "ЗА- — yo'l-yo'lakay kirish", "ОБ- — aylanib o'tish", "ПО- — biroz, qisqa vaqt"];
const prefix = (prompt: string, kind: number): SeedQuestion => ({ prompt, options: PREFIXES, correct: kind });
/** ПРО- ma'nosi — bir xil tartib. */
const PRO = ["Yonidan o'tish (мимо)", "Orqali o'tish (через, сквозь)", "Masofani bosib o'tish", "O'tib bo'lmaslik"];
const pro = (prompt: string, kind: number): SeedQuestion => ({ prompt, options: PRO, correct: kind });

const TF = ["To'g'ri", "Noto'g'ri"];
const ILF =
  "«Одноэтажная Америка»\n\nВ 1935 году писатели Илья Ильф и Евгений Петров поехали в Америку как корреспонденты газеты «Правда». Их путешествие продолжалось почти четыре месяца. Сначала они провели почти месяц в Нью-Йорке: ходили в театры, побывали на боксёрском поединке и даже в знаменитой тюрьме Синг-Синг. Потом писатели купили машину и отправились в путь. Вместе с ними ехала американская пара, которая хорошо знала страну. За два месяца они проехали больше шестнадцати тысяч километров и объехали двадцать пять штатов. Они заезжали в небольшие городки и индейские резервации, проезжали через пустыни и горы, а потом вернулись в Нью-Йорк. Писатели записывали впечатления в дневники, а Ильф ещё и делал фотографии. Их поразило, что американцы постоянно куда-то спешат, а по улицам городов бесконечно едут машины. Когда Ильф и Петров вернулись домой, их путевые заметки стали выходить в газете «Правда» и журнале «Огонёк», а позже вышла книга «Одноэтажная Америка».";
const tf = (statement: string, isTrue: boolean, explanation?: string): SeedQuestion => ({
  prompt: `${ILF}||${statement}`,
  options: TF,
  correct: isTrue ? 0 : 1,
  explanation,
});
const GONCHAROV =
  "Вокруг света на фрегате\n\nВ 1852 году Иван Гончаров, будущий автор романа «Обломов», отправился в кругосветное путешествие. Он плыл на фрегате «Паллада» секретарём экспедиции, которая шла в Японию. Друзья удивлялись: как такой спокойный, домашний человек решился на такую опасную дорогу?\n\nФрегат вышел из Кронштадта, зашёл в Англию, обошёл вокруг Африки, проплыл через Индийский океан и почти через год дошёл до берегов Японии. В пути Гончаров побывал в Лондоне, на мысе Доброй Надежды, в Сингапуре и Гонконге. В Лондоне писатель зашёл в Британский музей и назвал его огромной сокровищницей. Но Англия ему не очень понравилась: ему казалось, что люди там думают только о работе и торговле.\n\nДомой Гончаров вернулся не морем, а по суше: он проехал всю Сибирь на лошадях. Путешествие продолжалось больше двух лет. Свои путевые заметки писатель превратил в книгу «Фрегат „Паллада“», которую читают до сих пор.";
const read = (question: string, options: string[]): SeedQuestion => ({
  prompt: `${GONCHAROV}||${question}`,
  options,
  correct: 0,
});
const GOGOL =
  "Николай Васильевич Гоголь родился на Украине. Когда ему было девятнадцать лет, он переехал в Петербург. Как только Гоголь начал зарабатывать, он поехал в Европу и объездил много стран: Германию, Швейцарию, Францию. За границей писатель прожил с перерывами больше десяти лет. Больше всего он полюбил Италию, и особенно Рим. Гоголь поселился в маленькой квартире недалеко от площади Испании. Здесь он написал большую часть поэмы «Мёртвые души». Каждый день писатель подолгу ходил по городу: заходил в мастерские художников, в картинные галереи и в церкви. А друзей, которые приезжали в Рим, он сам водил по улицам, как настоящий гид. Гоголь говорил, что о России ему легче писать издалека. В 1848 году он отправился в паломничество: доплыл на корабле до Палестины, побывал в Иерусалиме, а потом через Константинополь и Одессу вернулся в Россию — уже навсегда.";
const hear = (question: string, options: string[]): SeedQuestion => ({
  prompt: question,
  audio: GOGOL,
  options,
  correct: 0,
});

export const B2_06_EXERCISES: SeedExercise[] = [
  {
    title: "Tinglang va toping",
    skill: "Tinglash",
    kind: "listen",
    instructions: "Gap ovoz chiqarib o'qiladi. Eshitgan gapingizni toping: fe'lning prefiksiga e'tibor bering.",
    questions: [
      listen("Мы прошли мимо музея.", ["Мы прошли мимо музея.", "Мы зашли в музей.", "Мы обошли музей.", "Мы прошли через музей."]),
      listen("По дороге я зашёл в аптеку.", ["По дороге я зашёл в аптеку.", "По дороге я пришёл в аптеку.", "По дороге я заехал в аптеку.", "По дороге я зашёл в библиотеку."]),
      listen("Туристы обошли вокруг памятника.", ["Туристы обошли вокруг памятника.", "Туристы подошли к памятнику.", "Туристы прошли мимо памятника.", "Туристы обходили вокруг памятника."]),
      listen("Самолёт пролетел над городом.", ["Самолёт пролетел над городом.", "Самолёт пролетает над городом.", "Самолёт облетел город.", "Самолёт пролетел над морем."]),
      listen("Заходите к нам в гости!", ["Заходите к нам в гости!", "Приходите к нам в гости!", "Заходите к ним в гости!", "Заходи к нам в гости!"]),
      listen("Мы объехали пробку.", ["Мы объехали пробку.", "Мы проехали пробку.", "Мы заехали в пробку.", "Мы объезжали пробку."]),
      listen("Днём мы немного походили по городу.", ["Днём мы немного походили по городу.", "Днём мы долго проходили по городу.", "Днём мы немного погуляли по городу.", "Вечером мы немного походили по городу."]),
      listen("Я заеду за тобой в семь.", ["Я заеду за тобой в семь.", "Я зайду за тобой в семь.", "Я заеду к тебе в семь.", "Я заехал за тобой в семь."]),
      listen("Мы не можем проехать: дорогу ремонтируют.", ["Мы не можем проехать: дорогу ремонтируют.", "Мы не можем объехать: дорогу ремонтируют.", "Мы не можем проехать: дорогу закрыли.", "Мы не можем пройти: дорогу ремонтируют."]),
      listen("Время пролетело незаметно.", ["Время пролетело незаметно.", "Время прошло незаметно.", "Время пролетит незаметно.", "Лето пролетело незаметно."]),
    ],
  },
  {
    title: "Diktant",
    skill: "Eshitib yozish",
    kind: "dictation",
    instructions:
      "Gap ovoz chiqarib o'qiladi. Uni eshitib, ruscha yozing (kerak bo'lsa, qayta yoki sekinroq tinglang). Tinish belgilari hisobga olinmaydi.",
    questions: [
      "Мы прошли мимо музея.",
      "По дороге домой я зашёл в магазин.",
      "Туристы обошли вокруг Кремля.",
      "Самолёт пролетел над городом.",
      "Я заеду за тобой в семь часов.",
      "Мы немного походили по парку.",
      "Проход запрещён.",
      "Гагарин облетел вокруг Земли.",
      "Время пролетело незаметно.",
      "Ильф и Петров объехали всю Америку.",
    ].map((sentence) => ({ prompt: "Eshitganingizni yozing", audio: sentence, answer: sentence })),
  },
  {
    title: "Juftini toping",
    skill: "Juftlik",
    kind: "match",
    instructions: "Ruscha so'z yoki iborani o'zbekcha tarjimasi bilan ulang.",
    questions: [
      ["путевые заметки|safar qaydlari", "очерк|ocherk", "дневник|kundalik", "корреспондент|muxbir"],
      ["экспедиция|ekspeditsiya", "фрегат|fregat", "кругосветное путешествие|dunyo bo'ylab sayohat", "паломничество|ziyorat"],
      ["рукопись|qo'lyozma", "сокровищница|xazina", "проезжать|o'tib ketmoq (ulovda)", "пролетать|uchib o'tmoq"],
      ["заходить|kirib chiqmoq", "заезжать|yo'l-yo'lakay kirmoq (ulovda)", "забегать|yugurib kirib chiqmoq", "обходить|atrofidan aylanib yurmoq"],
      ["объезжать|aylanma yo'ldan o'tmoq", "облетать|uchib aylanmoq", "походить|biroz yurib turmoq", "проплыть|suzib o'tmoq"],
      ["шлагбаум|shlagbaum", "лужа|ko'lmak", "земной шар|yer shari", "сквозь|orqali (yorib)"],
      ["насквозь|shilta bo'lib", "проход|o'tish yo'li", "заправка|yoqilg'i quyish shoxobchasi", "обочина|yo'l cheti"],
      ["колонна|kolonna", "контур|kontur", "провести беседу|suhbat o'tkazmoq", "завести машину|mashinani o't oldirmoq"],
      ["завести собаку|it boqmoq", "завести разговор|gap boshlamoq", "пробежать глазами|ko'z yugurtirmoq", "провести черту|chegara qo'ymoq"],
      ["зайти в тупик|boshi berk ko'chaga kirmoq", "время пролетело|vaqt uchib o'tdi", "заехать за другом|do'stini olib ketish uchun kirmoq", "проводить гостей|mehmonlarni kuzatib qo'ymoq"],
    ].map((options) => ({ prompt: "Juftlarni ulang", options })),
  },
  {
    title: "Prefiks nimani bildiradi?",
    skill: "Prefikslar · 1-bosqich",
    kind: "choice",
    instructions:
      "ПРО- — yonidan (мимо + Р.п.) yoki orqali (через, сквозь + В.п.) o'tish. ЗА- — yo'l-yo'lakay qisqa kirish (зайти в аптеку, заехать за другом). ОБ-/ОБО- — aylanib o'tish (обойти вокруг + Р.п.). ПО- + II guruh fe'li — biroz, qisqa vaqt (походить, побегать). Prefiks nimani bildiradi?",
    questions: [
      prefix("Мы прошли мимо кинотеатра.", 0),
      prefix("По дороге домой я зашёл в аптеку.", 1),
      prefix("Туристы обошли вокруг памятника.", 2),
      prefix("Днём мы немного походили по городу.", 3),
      prefix("Поезд проехал через тоннель.", 0),
      prefix("Заходите к нам на минутку!", 1),
      prefix("Мы объехали пробку по другой улице.", 2),
      prefix("Дети побегали во дворе и пришли домой.", 3),
      prefix("Самолёт пролетел над морем.", 0),
      prefix("Я заехал за другом, и мы поехали в кино.", 1),
    ],
  },
  {
    title: "ПРО- ning to'rt ma'nosi",
    skill: "Prefikslar · 2-bosqich",
    kind: "choice",
    instructions:
      "ПРО-: 1) yonidan o'tish — прошли мимо кинотеатра; 2) orqali o'tish — прошли через парк, сквозь толпу; 3) masofani bosib o'tish — за час прошёл шесть километров; 4) o'tib bo'lmaslik — мы не можем проехать, проход запрещён. Qaysi ma'no?",
    questions: [
      pro("Он не узнал меня и прошёл мимо.", 0),
      pro("Мы прошли через весь парк и вышли к реке.", 1),
      pro("За час он прошёл шесть километров.", 2),
      pro("Мы не можем проехать: шлагбаум не работает.", 3),
      pro("Автобус проехал мимо заправки.", 0),
      pro("Поезд долго проезжал сквозь тайгу.", 1),
      pro("Вместе мы проехали тысячу километров по Индии.", 2),
      pro("Проход запрещён.", 3),
      pro("Машина проехала три метра и остановилась.", 2),
      pro("Лодка проплыла под мостом.", 1),
    ],
  },
  {
    title: "Походил или проходил?",
    skill: "Prefikslar · 3-bosqich",
    kind: "choice",
    instructions:
      "ПО- + II guruh (походить, побегать, поплавать, полетать) — qisqa, biroz: Днём мы немного походили по городу. ПРО- + II guruh (проходить, пробегать, проплавать) — uzoq, butun vaqt davomida: Мы два часа проходили по городу. Ikkalasi ham SV! Mos shaklni tanlang.",
    questions: [
      pick("Днём мы два часа … по городу, а вечером пошли в театр.", ["проходили", "походили", "проходим", "походим"]),
      pick("Мы немного … по парку и вернулись домой.", ["походили", "проходили", "походим", "проходим"]),
      pick("Мы весь день … по магазинам и очень устали.", ["пробегали", "побегали", "пробегаем", "побегаем"]),
      pick("Дети немного … во дворе и пошли обедать.", ["побегали", "пробегали", "побегаем", "пробегаем"]),
      pick("Я бы с удовольствием … на этом самолёте.", ["полетал", "пролетал", "полечу", "пролетаю"]),
      pick("Они три часа … по Эрмитажу, но так и не увидели часы с павлином.", ["проходили", "походили", "пройдут", "походят"]),
      pick("Путешественник … на маленькой лодке три дня, прежде чем его нашли.", ["проплавал", "поплавал", "плавает", "поплывёт"]),
      pick("Утром мы немного … в бассейне.", ["поплавали", "проплавали", "поплывём", "проплываем"]),
      pick("Писатель немного … по улицам ночного города в поисках вдохновения.", ["походил", "проходил", "походит", "проходит"]),
      pick("Мы целый вечер … по выставке и очень устали.", ["проходили", "походили", "пойдём", "проходим"]),
    ],
  },
  {
    title: "ЗА- bilan to'ldiring",
    skill: "Prefikslar · 4-bosqich",
    kind: "fill",
    instructions:
      "ЗА- + в / на + В.п., к + Д.п. — yo'l-yo'lakay qisqa kirish (зайти в кафе, забежать к соседке); за + Т.п. — biror narsani olib ketish uchun (заехать за другом) yoki orqasiga (зайти за угол). Qavsdagi fe'lni to'g'ri shaklda yozing.",
    questions: [
      fill("По дороге на работу я ___ в кафе за кофе. (зайти)", "зашёл|зашел|зашла"),
      fill("Когда я ___ в свой офис, я включил свет. (зайти)", "зашёл|зашел"),
      fill("Перед отъездом я должен ___ эти документы на работу. (занести)", "занести"),
      fill("Скажите директору, что я к нему сейчас ___ . (зайти)", "зайду"),
      fill("Дети ___ ко мне попить воды, а потом убежали по своим делам. (забежать)", "забежали"),
      fill("Когда я ___ покупки домой, я сразу разложил их по местам. (занести)", "занёс|занес"),
      fill("Быстро ___ за угол, закрой глаза и начинай считать! (забежать)", "забеги"),
      fill("После уроков папа ___ за мной в школу на машине. (заехать)", "заехал"),
      fill("Корабль ___ за скалу и исчез из вида. (заплыть)", "заплыл"),
      fill("Мы ___ к вам только на минутку. (зайти)", "зашли|зайдём|зайдем"),
    ],
  },
  {
    title: "ОБ- bilan to'ldiring",
    skill: "Prefikslar · 5-bosqich",
    kind: "fill",
    instructions:
      "ОБ-/ОБО-: 1) aylanib o'tish — обойти вокруг памятника; 2) yo'ldagi to'siqni aylanib o'tish — объехать колонну, обойти лужу; 3) ko'p joyda bo'lib chiqish — обойти все киоски, объехать всю Россию. Qavsdagi fe'lni to'g'ri shaklda yozing (kitobdagi mashq asosida).",
    questions: [
      fill("Гагарин ___ вокруг Земли за 108 минут. (облететь)", "облетел"),
      fill("Мы ___ всю Москву пешком. (обойти)", "обошли"),
      fill("Озеро на машине пришлось бы ___ целый час, поэтому мы переплыли на лодке. (объезжать)", "объезжать|объехать"),
      fill("Я ___ стол и подошёл к окну. (обойти)", "обошёл|обошел"),
      fill("Эта ужасная новость ___ весь мир. (облететь)", "облетела"),
      fill("Каждое утро врачи ___ всех больных. (обходить)", "обходят"),
      fill("Спортсмен два раза ___ вокруг поля. (обежать)", "обежал|оббежал"),
      fill("___ этот рисунок по контуру и раскрась его. (обвести)", "обведи|Обведи"),
      fill("Известный путешественник ___ весь земной шар на мотоцикле. (объехать)", "объехал"),
      fill("Мы ___ колонну грузовиков и поехали дальше. (объехать)", "объехали"),
    ],
  },
  {
    title: "Predlogni tanlang",
    skill: "Prefikslar · 6-bosqich",
    kind: "choice",
    instructions:
      "Prefiks va predlog bir-biriga mos keladi: обойти вокруг, перейти через, пройти мимо / сквозь, дойти до, отплыть от, заехать за / на. Mos predlogni tanlang.",
    questions: [
      pick("обойти … Кремля", ["вокруг", "через", "мимо", "сквозь"]),
      pick("перейти … улицу", ["через", "вокруг", "мимо", "над"]),
      pick("зайти … другом (olib ketish uchun)", ["за", "к", "на", "в"]),
      pick("проехать … остановки", ["мимо", "через", "сквозь", "вокруг"]),
      pick("доехать … города на автобусе", ["до", "к", "в", "через"]),
      pick("переехать … реку по мосту", ["через", "мимо", "вокруг", "сквозь"]),
      pick("отплыть … берега на семь километров", ["от", "из", "с", "до"]),
      pick("улететь … Петербурга в Москву", ["из", "от", "с", "до"]),
      pick("пройти … толпу", ["сквозь", "мимо", "вокруг", "до"]),
      pick("заехать … заправку", ["на", "в", "за", "к"]),
    ],
  },
  {
    title: "Hamma prefikslar",
    skill: "Takrorlash",
    kind: "choice",
    instructions:
      "Modul yakuni: B2-03…B2-06 da o'tilgan hamma harakat fe'llarini takrorlaymiz. Gapga ma'nosi mos fe'lni tanlang.",
    questions: [
      pick("Вчера мы … пятнадцать километров и очень устали.", ["прошли", "перешли", "обошли", "зашли"]),
      pick("В центре города ко мне … туристы и спросили дорогу.", ["подошли", "отошли", "дошли", "перешли"]),
      pick("Я стал путешественником и … из Москвы в Калифорнию.", ["переехал", "проехал", "подъехал", "объехал"]),
      pick("Моя дочь … в отпуск в Анапу и позвонит, как только доедет.", ["уехала", "приехала", "заехала", "объехала"]),
      pick("Вы не скажете, как … на Красную площадь?", ["пройти", "перейти", "обойти", "зайти"]),
      pick("Автобус … к остановке, и мы сели.", ["подъехал", "отъехал", "доехал", "переехал"]),
      pick("Невозможно … весь Эрмитаж за один час.", ["обойти", "перейти", "отойти", "зайти"]),
      pick("Сергей … всю Россию: от Калининграда до Камчатки.", ["объездил", "переехал", "заехал", "подъехал"]),
      pick("Я сначала … детей в школу, а потом заеду за тобой.", ["отведу", "подведу", "переведу", "обведу"]),
      pick("Мой брат каждое утро … в бассейн.", ["ходит", "идёт", "пошёл", "дошёл"], "Takrorlanish — ходит (prefikssiz, II model)."),
    ],
  },
  {
    title: "Qaysi fe'l?",
    skill: "Lug'at",
    kind: "type",
    instructions: "Ta'rifni o'qing va unga mos prefiksli harakat fe'lini yozing (NSV yoki SV — ikkalasi ham to'g'ri).",
    questions: [
      ["идти мимо чего-то, не останавливаясь", "проходить|пройти"],
      ["ненадолго зайти к кому-то по дороге, очень быстро", "забегать|забежать"],
      ["идти вокруг чего-то", "обходить|обойти"],
      ["ехать вокруг препятствия на дороге", "объезжать|объехать"],
      ["лететь над чем-то, не останавливаясь", "пролетать|пролететь"],
      ["немного, недолго походить", "походить"],
      ["лететь вокруг Земли", "облетать|облететь"],
      ["по пути на машине взять кого-то с собой", "заезжать|заехать"],
      ["плыть мимо чего-то или под чем-то", "проплывать|проплыть"],
      ["ехать через реку на другой берег", "переезжать|переехать"],
    ].map(([prompt, answer]) => ({ prompt, answer })),
  },
  {
    title: "Gap tuzing",
    skill: "Prefikslar · 7-bosqich",
    kind: "order",
    instructions: "So'zlarni to'g'ri tartibda bosib, gap tuzing.",
    questions: [
      build("Мы прошли мимо старого театра."),
      build("По дороге домой я зашёл в аптеку."),
      build("Туристы обошли вокруг Кремля."),
      build("Самолёт пролетел над облаками."),
      build("Я заеду за тобой в семь часов."),
      build("Днём мы немного походили по городу."),
      build("Гагарин первым облетел вокруг Земли."),
      build("Ильф и Петров объехали двадцать пять штатов."),
      build("Нам нужно заехать на заправку."),
      build("Мы прошли через лес и вышли к реке."),
    ],
  },
  {
    title: "Iborani yig'ing",
    skill: "Kollokatsiyalar",
    kind: "match",
    instructions: "Iboraning birinchi qismini ikkinchisi bilan ulang. Ko'pi Absalomov lug'atidan.",
    questions: [
      ["провести|беседу", "завести|машину", "обойти|щекотливый вопрос", "облететь|весь мир"],
      ["пробежать|глазами", "провести|черту", "завести|собаку", "пройти|через лес"],
      ["весело провести|праздник", "завести|разговор", "проехать|площадь", "пойти|обратно"],
      ["провести идею|в жизнь", "завести|часы", "зайти|в тупик", "время|пролетело"],
      ["заехать|за другом", "пройти|мимо", "обойти|весь город", "проводить|гостей"],
      ["обойти|вокруг Кремля", "перейти|через улицу", "проехать|мимо остановки", "пройти|сквозь толпу"],
      ["путевые|заметки", "кругосветное|путешествие", "земной|шар", "фрегат|«Паллада»"],
      ["заехать|на заправку", "объехать|колонну", "обойти|лужу", "остановиться|на обочине"],
      ["Гоголь|«Мёртвые души»", "Гончаров|«Фрегат „Паллада“»", "Ильф и Петров|«Одноэтажная Америка»", "Бунин|Нобелевская премия"],
      ["зайти|в аптеку", "забежать|к соседке", "облететь|вокруг Земли", "походить|по парку"],
    ].map((options) => ({ prompt: "Juftlarni ulang", options })),
  },
  {
    title: "Urg'u qayerda?",
    skill: "Urg'u",
    kind: "stress",
    instructions: "So'zni eshiting va urg'uli bo'g'inni bosing.",
    questions: [
      stress("кор|рес|пон|дент", 3, "корреспонде́нт"),
      stress("экс|пе|ди|ци|я", 2, "экспеди́ция"),
      stress("ру|ко|пись", 0, "ру́копись"),
      stress("па|лом|ни|чест|во", 1, "пало́мничество"),
      stress("шлаг|ба|ум", 1, "шлагба́ум"),
      stress("о|бо|чи|на", 1, "обо́чина"),
      stress("фре|гат", 1, "фрега́т"),
      stress("днев|ник", 1, "дневни́к"),
      stress("по|хо|дить", 2, "походи́ть"),
      stress("о|черк", 0, "о́черк"),
    ],
  },
  {
    title: "Shaharda yo'l so'rash",
    skill: "Vaziyat",
    kind: "situation",
    instructions: "Vaziyatga mos ruscha gapni tanlang.",
    questions: [
      pick("Yo'lovchidan Qizil maydonga qanday borishni so'raysiz.", ["Скажите, как пройти на Красную площадь?", "Скажите, как перейти на Красную площадь?", "Скажите, как обойти на Красную площадь?", "Скажите, как пройти в Красную площадь?"]),
      pick("Do'stingizga ishdan keyin uni olib ketish uchun kirishingizni aytasiz.", ["Я заеду за тобой после работы.", "Я заеду за тебя после работы.", "Я заеду тебя после работы.", "Я объеду за тобой после работы."]),
      pick("Qo'shningizga bir daqiqaga yugurib kirib chiqishingizni aytasiz.", ["Я забегу к вам на минутку.", "Я забегу вам на минутку.", "Я обегу к вам на минутку.", "Я пробегу к вам на минутку."]),
      pick("Haydovchiga tirbandlikni aylanib o'tishni taklif qilasiz.", ["Давайте объедем пробку.", "Давайте проедем пробку мимо.", "Давайте заедем пробку.", "Давайте объедем по пробке."]),
      pick("Ta'mir tufayli bu yerdan o'tib bo'lmasligini aytasiz.", ["Здесь нельзя проехать: ремонт.", "Здесь нельзя заехать: ремонт.", "Здесь нельзя проехать: ремонта.", "Здесь нельзя объехать: ремонтом."]),
      pick("Mehmonlarni ichkariga, o'tishga taklif qilasiz.", ["Проходите, пожалуйста!", "Переходите, пожалуйста!", "Обходите, пожалуйста!", "Отходите, пожалуйста!"]),
      pick("Do'stingizga vaqt qanchalik tez o'tib ketganini aytasiz.", ["Как быстро пролетело время!", "Как быстро пролетел время!", "Как быстро облетело время!", "Как быстро пролетело времени!"]),
      pick("Haydovchiga maydondan o'tib, chapga burilishni aytasiz.", ["Проезжайте площадь и поверните налево.", "Проезжайте площадью и поверните налево.", "Заезжайте площадь и поверните налево.", "Проезжайте на площади и поверните налево."]),
      pick("Yoqilg'i quyish shoxobchasiga kirish kerakligini aytasiz.", ["Нам нужно заехать на заправку.", "Нам нужно заехать в заправку.", "Нам нужно заехать за заправкой.", "Нам нужно заехать заправку."]),
      pick("Kecha shahar bo'ylab biroz aylanganingizni aytasiz.", ["Вчера я немного походил по городу.", "Вчера я немного проходил по городу.", "Вчера я немного походил в город.", "Вчера я немного обошёл по городу."]),
    ],
  },
  {
    title: "«Одноэтажная Америка»",
    skill: "O'qish",
    kind: "truefalse",
    instructions: "Ilf va Petrovning Amerika bo'ylab safari haqidagi matnni o'qing va gap to'g'ri yoki noto'g'ri ekanini belgilang.",
    questions: [
      tf("Ильф и Петров поехали в Америку как корреспонденты газеты.", true),
      tf("Путешествие продолжалось почти год.", false, "Почти четыре месяца."),
      tf("Сначала писатели почти месяц провели в Нью-Йорке.", true),
      tf("По стране они ехали на поезде.", false, "На машине."),
      tf("С ними ехала американская пара.", true),
      tf("Они объехали двадцать пять штатов.", true),
      tf("Писатели заезжали в индейские резервации.", true),
      tf("Фотографии делал только Петров.", false, "Фотографии делал Ильф."),
      tf("Писателей удивило, что американцы никуда не спешат.", false, "Наоборот, все постоянно спешат."),
      tf("Их путевые заметки стали книгой.", true),
    ],
  },
  {
    title: "«Pallada» fregatida",
    skill: "Matn bilan ishlash",
    kind: "reading",
    instructions: "Ivan Goncharovning dunyo bo'ylab sayohati haqidagi matnni o'qing va savollarga javob bering.",
    questions: [
      read("Когда Гончаров отправился в путешествие?", ["В 1852 году.", "В 1835 году.", "В 1848 году.", "В 1920 году."]),
      read("Кем он был в экспедиции?", ["Секретарём.", "Капитаном.", "Врачом.", "Корреспондентом."]),
      read("Куда шла экспедиция?", ["В Японию.", "В Америку.", "В Индию.", "В Африку."]),
      read("Почему друзья удивлялись?", ["Гончаров был спокойным, домашним человеком.", "Гончаров не умел плавать.", "Он был очень старым.", "Он боялся моря с детства."]),
      read("Вокруг какого континента обошёл фрегат?", ["Вокруг Африки.", "Вокруг Австралии.", "Вокруг Америки.", "Вокруг Антарктиды."]),
      read("Как Гончаров назвал Британский музей?", ["Огромной сокровищницей.", "Скучным местом.", "Маленьким музеем.", "Лучшим театром."]),
      read("Что ему не понравилось в Англии?", ["Люди думали только о работе и торговле.", "Погода.", "Еда.", "Гостиницы."]),
      read("Как он вернулся домой?", ["По суше, через Сибирь.", "На том же фрегате.", "На поезде через Европу.", "На другом корабле."]),
      read("Сколько продолжалось путешествие?", ["Больше двух лет.", "Полгода.", "Ровно год.", "Десять лет."]),
      read("Как называется его книга о путешествии?", ["«Фрегат „Паллада“»", "«Обломов»", "«Одноэтажная Америка»", "«Мёртвые души»"]),
    ],
  },
  {
    title: "Gogol Rimda",
    skill: "Tinglab tushunish",
    kind: "audiotext",
    instructions:
      "Nikolay Gogolning sayohatlari haqidagi hikoyani tinglang (kerak bo'lsa, qayta yoki sekinroq) va savollarga javob bering. Matn ekranda ko'rsatilmaydi.",
    questions: [
      hear("Где родился Гоголь?", ["На Украине.", "В Петербурге.", "В Риме.", "В Москве."]),
      hear("Во сколько лет он переехал в Петербург?", ["В девятнадцать.", "В двадцать пять.", "В пятнадцать.", "В тридцать."]),
      hear("Какие страны он объездил?", ["Германию, Швейцарию, Францию.", "Англию и Испанию.", "Японию и Китай.", "Америку и Канаду."]),
      hear("Сколько лет он прожил за границей?", ["Больше десяти лет.", "Два года.", "Всю жизнь.", "Пять лет."]),
      hear("Какой город он полюбил больше всего?", ["Рим.", "Париж.", "Берлин.", "Женеву."]),
      hear("Где он поселился?", ["Недалеко от площади Испании.", "У моря.", "За городом.", "В гостинице у вокзала."]),
      hear("Что он написал в Риме?", ["Большую часть «Мёртвых душ».", "«Обломова».", "Свой дневник.", "Путеводитель по Риму."]),
      hear("Куда он заходил во время прогулок?", ["В мастерские художников, галереи и церкви.", "В рестораны.", "В магазины.", "В библиотеки."]),
      hear("Что он делал, когда друзья приезжали в Рим?", ["Сам водил их по городу.", "Уезжал из города.", "Отправлял их к гиду.", "Не встречался с ними."]),
      hear("Как он вернулся в Россию в 1848 году?", ["Через Константинополь и Одессу.", "Через Берлин и Варшаву.", "Через Петербург.", "Через Сибирь."]),
    ],
  },
  {
    title: "Ayting",
    skill: "Talaffuz",
    kind: "speak",
    instructions: "Gapni eshiting, keyin mikrofon tugmasini bosib o'zingiz ayting.",
    questions: [
      "Скажите, как пройти на Красную площадь?",
      "Заходите к нам в гости!",
      "Я заеду за тобой в семь.",
      "Мы прошли мимо музея.",
      "Давайте объедем пробку.",
      "Днём мы немного походили по городу.",
      "Как быстро пролетело время!",
      "Гагарин облетел вокруг Земли.",
      "Проходите, пожалуйста!",
      "Нам нужно заехать на заправку.",
    ].map((phrase) => ({ prompt: phrase, answer: phrase })),
  },
];
