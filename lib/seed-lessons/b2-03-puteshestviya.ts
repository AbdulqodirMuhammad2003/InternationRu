/**
 * B2, 3-dars — «Путешествия: турист или путешественник?» (Liden & Denz,
 * «Я ❤ Русский Язык», B1.2, 1-urok 2-modul): sayohat, aviaparvoz, arzon
 * sayohat qilish sirlari, fe'ldan yasalgan otlar (взлетать → взлёт);
 * grammatika — prefikssiz harakat fe'llari chuqurroq: I model (идти —
 * bir yo'nalishda, jarayon) va II model (ходить — borib kelish, был =
 * ходил/ездил, takrorlanish, qobiliyat, har tomonga harakat); нести /
 * носить, везти / возить, вести / водить; на чём? / в чём? (на поезде —
 * qanday? в поезде — qayerda?). Asosiy juftliklar A2-08 da o'tilgan —
 * bu dars ularning ma'nolarini farqlashga qaratilgan.
 *
 * Zinapoya: ma'noni aniqlash → идти/ходить tanlash → juftlikdan shakl
 * yozish → был = ездил → нести/везти/вести → на/в → gap tuzish.
 * Kollokatsiyalar (4–5-bosqich) A. Absalomov lug'atidan, harakat
 * fe'llari bilan. Lug'at 5 bosqich (50 so'z). Matnlar o'zimizniki.
 * 19 ta mashq.
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

export const B2_03_ROUNDS: { title: string; words: VocabSeed[] }[] = [
  {
    title: "1-bosqich · Sayohatda",
    words: [
      w("✈️", "Перелёт", "pirilyót", "ot", "Uchib o'tish", "Путешествие на самолёте из одного места в другое.", "Перелёт из Ташкента в Москву занимает четыре часа.", "Toshkentdan Moskvaga uchib o'tish to'rt soat davom etadi."),
      w("🧳", "Турпакет", "turpakyét", "ot", "Tur paket", "Готовая поездка: перелёт, гостиница, питание и экскурсии.", "Турист предпочитает купить готовый турпакет.", "Sayyoh tayyor tur paketni sotib olishni afzal ko'radi."),
      w("🚐", "Трансфер", "transfér", "ot", "Transfer (kutib olib ketish)", "Поездка из аэропорта в гостиницу и обратно.", "Трансфер из аэропорта уже включён в цену.", "Aeroportdan transfer narxga allaqachon kiritilgan."),
      w("📕", "Путеводитель", "putivadítil'", "ot", "Yo'l ko'rsatkich kitob", "Книга для туристов о городе или стране.", "Путеводитель по Петербургу я купил в аэропорту.", "Peterburg bo'yicha yo'l ko'rsatkich kitobni aeroportda sotib oldim."),
      w("🧑‍🤝‍🧑", "Попутчик", "papútchik", "ot", "Hamroh (yo'lda)", "Человек, который едет с вами в одну сторону.", "Мой попутчик в поезде оказался учителем из Казани.", "Poyezddagi hamrohim Qozonlik o'qituvchi bo'lib chiqdi."),
      w("🛏️", "Хостел", "khóstel", "ot", "Xostel", "Недорогая гостиница, где в комнате живут несколько человек.", "В Европе мы обычно ночуем в хостеле.", "Yevropada odatda xostelda tunaymiz."),
      w("🛫", "Рейс", "ryeys", "ot", "Reys", "Полёт самолёта или поездка по расписанию.", "Рейс номер триста двадцать пять задерживается на час.", "325-reys bir soatga kechikmoqda."),
      w("👍", "Автостоп", "aftastóp", "ot", "Avtostop", "Путешествие на попутных машинах бесплатно.", "Сергей путешествует по Европе автостопом.", "Sergey Yevropa bo'ylab avtostop bilan sayohat qiladi."),
      w("🚢", "Каюта", "kayúta", "ot", "Kayuta (kema xonasi)", "Комната на корабле.", "Наша каюта была на верхней палубе.", "Kayutamiz yuqori palubada edi."),
      w("🌙", "Ночлег", "nachlyék", "ot", "Tunash joyi", "Место, где можно переночевать.", "Мы долго искали ночлег в маленькой деревне.", "Kichik qishloqda uzoq vaqt tunash joyi qidirdik."),
    ],
  },
  {
    title: "2-bosqich · Sayohat fe'llari",
    words: [
      w("📍", "Побывать", "pabyvát'", "fe'l", "Borib ko'rmoq", "Где? Посетить какое-то место. СВ.", "Я мечтаю побывать на Байкале.", "Baykalga borib ko'rishni orzu qilaman."),
      w("🗺️", "Объездить", "abyézdit'", "fe'l", "Kezib chiqmoq (ulovda)", "Что? Побывать во многих местах. СВ.", "За два года он успел объездить всю Азию.", "U ikki yilda butun Osiyoni kezib chiqishga ulgurdi."),
      w("⛺", "Ночевать", "nachivát'", "fe'l", "Tunamoq", "Где? Проводить ночь. СВ: переночевать.", "В горах нам пришлось ночевать в палатке.", "Tog'da chodirda tunashimizga to'g'ri keldi."),
      w("🧭", "Добираться", "dabirát'sa", "fe'l", "Yetib bormoq", "До чего? Как? Доехать или дойти до места. СВ: добраться.", "До вокзала удобнее добираться на метро.", "Vokzalgacha metroda yetib borish qulayroq."),
      w("🖊️", "Зарегистрироваться", "zarigistríravat'sa", "fe'l", "Ro'yxatdan o'tmoq", "На что? Где? Записать себя в список. НСВ: регистрироваться.", "В аэропорту нужно зарегистрироваться на рейс за час до вылета.", "Aeroportda reysga uchishdan bir soat oldin ro'yxatdan o'tish kerak."),
      w("🛩️", "Взлетать", "vzlitát'", "fe'l", "Havoga ko'tarilmoq", "Подниматься в воздух. СВ: взлететь.", "Самолёты здесь начинают взлетать каждые пять минут.", "Bu yerda samolyotlar har besh daqiqada havoga ko'tarila boshlaydi."),
      w("🛬", "Приземлиться", "prizimlít'sa", "fe'l", "Qo'nmoq (yerga)", "Опуститься на землю (о самолёте). НСВ: приземляться.", "Самолёт должен приземлиться в Ташкенте в шесть утра.", "Samolyot Toshkentga ertalab soat oltida qo'nishi kerak."),
      w("🔁", "Пересаживаться", "pirisázhivat'sa", "fe'l", "Boshqa transportga o'tmoq", "На что? Менять один транспорт на другой. СВ: пересесть.", "В Стамбуле нам нужно пересаживаться на другой самолёт.", "Istanbulda boshqa samolyotga o'tishimiz kerak."),
      w("🤢", "Укачивать", "ukáchivat'", "fe'l", "Ko'ngil aynitmoq (yo'lda)", "Кого? Безличный: человеку плохо в транспорте. Меня укачивает.", "В автобусе детей может укачивать.", "Avtobusda bolalarning ko'ngli aynishi mumkin."),
      w("🎒", "Странствовать", "stránstvavat'", "fe'l", "Kezib yurmoq", "Долго путешествовать, переезжать с места на место.", "Он любит странствовать по маленьким городам.", "U kichik shaharlarni kezib yurishni yaxshi ko'radi."),
    ],
  },
  {
    title: "3-bosqich · Fe'ldan ot",
    words: [
      w("🚀", "Взлёт", "vzlyot", "ot", "Havoga ko'tarilish", "Момент, когда самолёт поднимается в воздух (взлетать).", "Во время взлёта нужно пристегнуть ремни.", "Havoga ko'tarilish paytida kamarni taqish kerak."),
      w("❌", "Отмена", "atmyéna", "ot", "Bekor qilinish", "Решение, что чего-то не будет (отменять).", "Отмена рейса испортила нам отпуск.", "Reysning bekor qilinishi ta'tilimizni buzdi."),
      w("⏳", "Задержка", "zadyérzhka", "ot", "Kechikish", "Когда что-то происходит позже (задерживаться).", "Задержка рейса составила три часа.", "Reysning kechikishi uch soatni tashkil etdi."),
      w("💸", "Трата", "tráta", "ot", "Xarajat", "Деньги, которые потратили (тратить).", "Самая большая трата в поездке — это билеты.", "Safardagi eng katta xarajat — bu chiptalar."),
      w("📲", "Бронирование", "branirávaniye", "ot", "Bron qilish", "Заказ билета или номера заранее (бронировать).", "Бронирование гостиницы лучше делать заранее.", "Mehmonxonani bron qilishni oldindan qilgan ma'qul."),
      w("💡", "Вдохновение", "vdakhnavyéniye", "ot", "Ilhom", "Желание и силы что-то создавать (вдохновлять).", "Путешествия дают мне вдохновение.", "Sayohatlar menga ilhom beradi."),
      w("🎡", "Развлечение", "razvlichyéniye", "ot", "Ko'ngilochar narsa", "То, что делает отдых весёлым (развлекать).", "Главное развлечение в этом городе — море.", "Bu shahardagi asosiy ko'ngilochar narsa — dengiz."),
      w("🚚", "Перевозка", "pirivóska", "ot", "Tashish", "Когда людей или вещи везут с места на место (перевозить).", "Перевозка багажа стоит отдельных денег.", "Bagajni tashish alohida pul turadi."),
      w("🛬", "Прилёт", "prilyót", "ot", "Uchib kelish", "Когда самолёт прилетает (прилетать).", "Время прилёта — десять часов вечера.", "Uchib kelish vaqti — kechki soat o'n."),
      w("🛫", "Вылет", "výlit", "ot", "Uchib ketish", "Когда самолёт улетает (вылетать).", "Вылет задерживается из-за тумана.", "Uchib ketish tuman tufayli kechikmoqda."),
    ],
  },
  {
    title: "4-bosqich · Kollokatsiyalar",
    words: [
      w("🏃", "Бежать со всех ног", "bizhát' sa fsyékh nok", "ibora", "Oyog'ini qo'liga olib yugurmoq", "Бежать очень быстро.", "Увидев автобус, нам пришлось бежать со всех ног.", "Avtobusni ko'rib, oyog'imizni qo'limizga olib yugurishga to'g'ri keldi."),
      w("👧", "Водить за руку", "vadít' za rúku", "ibora", "Qo'lidan yetaklamoq", "Вести ребёнка, держа его руку (обычно, регулярно).", "Маленьких детей нужно водить за руку через дорогу.", "Kichkina bolalarni yo'ldan qo'lidan yetaklab o'tkazish kerak."),
      w("🚆", "Вести поезд", "vistí póist", "ibora", "Poyezd haydamoq", "Управлять поездом.", "Опытный машинист будет вести поезд всю ночь.", "Tajribali mashinist poyezdni tun bo'yi haydaydi."),
      w("🐎", "Ездить верхом", "yézdit' virkhóm", "ibora", "Ot minib yurmoq", "Ездить на лошади.", "В детстве я научился ездить верхом у дедушки.", "Bolaligimda bobomdan ot minib yurishni o'rgandim."),
      w("🛬", "Идти на посадку", "ití na pasátku", "ibora", "Qo'na boshlamoq", "О самолёте: начинать опускаться на землю.", "Самолёт начинает идти на посадку, пристегните ремни.", "Samolyot qo'na boshlayapti, kamarlarni taqing."),
      w("🏹", "Лететь стрелой", "litét' strilóy", "ibora", "O'qdek uchmoq", "Двигаться очень быстро.", "Скорый поезд может лететь стрелой через всю степь.", "Tezyurar poyezd butun cho'l bo'ylab o'qdek uchishi mumkin."),
      w("🛶", "Плыть по реке", "plyt' pa rikyé", "ibora", "Daryoda suzmoq", "Двигаться по воде вдоль реки (в одну сторону).", "Мы будем плыть по реке на лодке два дня.", "Daryoda qayiqda ikki kun suzamiz."),
      w("🧔", "Носить бороду", "nasít' bóradu", "ibora", "Soqol qo'ymoq", "Иметь бороду.", "Мой дед всю жизнь любил носить бороду.", "Bobom butun umr soqol qo'yishni yaxshi ko'rardi."),
      w("🍰", "Идти в гости", "ití v gósti", "ibora", "Mehmonga bormoq", "К кому? Идти к кому-то домой.", "В субботу мы собираемся идти в гости к бабушке.", "Shanba kuni buvimnikiga mehmonga bormoqchimiz."),
      w("🙂", "Вести себя", "vistí sibyá", "ibora", "O'zini tutmoq", "Как? Поступать каким-то образом.", "В музее нужно вести себя тихо.", "Muzeyda o'zini jim tutish kerak."),
    ],
  },
  {
    title: "5-bosqich · Kollokatsiyalar",
    words: [
      w("🛤️", "Дальняя дорога", "dál'nyaya daróga", "ibora", "Uzoq safar", "Долгий путь далеко.", "Дальняя дорога не пугает настоящего путешественника.", "Uzoq safar haqiqiy sayohatchini qo'rqitmaydi."),
      w("🌅", "Отправиться в путь", "atprávit'sa f put'", "ibora", "Yo'lga otlanmoq", "Начать путешествие.", "Рано утром мы решили отправиться в путь.", "Erta tongda yo'lga otlanishga qaror qildik."),
      w("↩️", "На обратном пути", "na abrátnam putí", "ibora", "Qaytishda", "Когда возвращаешься назад.", "На обратном пути мы заехали в Самарканд.", "Qaytishda Samarqandga kirib o'tdik."),
      w("👋", "Счастливого пути", "shislívava putí", "ibora", "Oq yo'l!", "Пожелание тому, кто уезжает.", "Счастливого пути и хорошей погоды!", "Oq yo'l va yaxshi ob-havo!"),
      w("🧺", "Сборы в дорогу", "zbóry v darógu", "ibora", "Safarga tayyorgarlik", "Когда собирают вещи перед поездкой.", "Сборы в дорогу заняли у нас целый вечер.", "Safarga tayyorgarlik butun kechamizni oldi."),
      w("🎫", "Платить за проезд", "platít' za prayést", "ibora", "Yo'l haqini to'lamoq", "Покупать билет в транспорте.", "В автобусе можно платить за проезд картой.", "Avtobusda yo'l haqini karta bilan to'lash mumkin."),
      w("🚏", "Проехать остановку", "prayékhat' astanófku", "ibora", "Bekatdan o'tib ketmoq", "Не выйти на нужной остановке.", "Не спи, а то можно проехать остановку!", "Uxlama, bo'lmasa bekatdan o'tib ketish mumkin!"),
      w("🏠", "Доехать благополучно", "dayékhat' blagapalúchna", "ibora", "Eson-omon yetib olmoq", "Приехать без проблем.", "Главное — доехать благополучно, остальное не важно.", "Asosiysi — eson-omon yetib olish, qolgani muhim emas."),
      w("🗣️", "Делиться впечатлениями", "dilít'sa fpichatlyéniyami", "ibora", "Taassurotlar bilan o'rtoqlashmoq", "Рассказывать, что видел и что понравилось.", "После поездки друзья любят делиться впечатлениями.", "Safardan keyin do'stlar taassurotlar bilan o'rtoqlashishni yaxshi ko'radi."),
      w("💰", "Не по карману", "ni pa karmánu", "ibora", "Cho'ntakka to'g'ri kelmaydi", "Кому? Слишком дорого для кого-то.", "Отели в Италии были мне не по карману.", "Italiyadagi mehmonxonalar cho'ntagimga to'g'ri kelmasdi."),
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
/** Fe'lning ma'nosi — bir xil tartib. */
const MEANINGS = [
  "Bir yo'nalishda (hozir yo'lda, jarayon)",
  "Borib keldi (= был)",
  "Muntazam, odat",
  "Qobiliyat (qila oladi)",
];
const meaning = (prompt: string, kind: number, explanation?: string): SeedQuestion => ({
  prompt,
  options: MEANINGS,
  correct: kind,
  explanation,
});

const TF = ["To'g'ri", "Noto'g'ri"];
const DILSHOD =
  "Дилшод — программист из Ташкента. За последние пять лет он побывал в тридцати странах, но потратил на это совсем немного денег. «Я не турист, я путешественник, — говорит Дилшод. — Турист покупает готовый турпакет и ездит по стандартному маршруту. А я сам придумываю себе приключения». Дилшод редко летает на самолётах: он предпочитает ездить на поездах и автобусах, а по Европе путешествует автостопом. Ночует он обычно в хостелах или у местных жителей, с которыми знакомится через интернет. «Так дешевле, и можно узнать, как люди живут на самом деле», — объясняет он. Но на еде Дилшод не экономит: он считает, что кухня — лучший способ понять культуру страны. Самым интересным путешествием он называет поездку по Грузии. Там он две недели ходил пешком по горам и ночевал в палатке. А самым дорогим было путешествие в Японию: отели там были ему не по карману, поэтому он спал в капсульных гостиницах. Сейчас Дилшод пишет книгу о своих путешествиях, а пока делится впечатлениями в своём блоге.";
const tf = (statement: string, isTrue: boolean, explanation?: string): SeedQuestion => ({
  prompt: `${DILSHOD}||${statement}`,
  options: TF,
  correct: isTrue ? 0 : 1,
  explanation,
});
const ADVICE =
  "Как путешествовать недорого: пять советов\n\n1. Ищите билеты заранее. Если вы летите в другую страну, бронирование за два-три месяца до вылета поможет сэкономить до половины цены.\n\n2. Летайте с пересадками. Прямой рейс удобнее, но дороже. А если пересадка долгая, можно выйти из аэропорта и посмотреть новый город.\n\n3. Ездите на общественном транспорте. Такси и трансфер стоят дорого, а автобус или метро довезут вас до центра за небольшие деньги. Ещё лучше — ходить пешком: так вы увидите город таким, какой он есть.\n\n4. Ночуйте в хостелах. Там можно познакомиться с другими путешественниками и узнать у них полезные советы.\n\n5. Скачайте путеводитель в телефон. Бумажный путеводитель тяжело носить с собой, а в приложении есть карты и аудиоэкскурсии.\n\nИ главное: не бойтесь задержек и отмен рейсов. Дальняя дорога всегда полна неожиданностей — именно они делают поездку незабываемой.";
const read = (question: string, options: string[], explanation?: string): SeedQuestion => ({
  prompt: `${ADVICE}||${question}`,
  options,
  correct: 0,
  explanation,
});
const NODIRA =
  "Привет! Меня зовут Нодира, мне двадцать восемь лет. Три года назад я работала в банке в Ташкенте и каждый день ездила на работу на метро. Однажды я поняла, что хочу увидеть мир, и ушла с работы. Сейчас я работаю онлайн: перевожу тексты с английского на русский и узбекский. Мне нужны только ноутбук и интернет. За три года я побывала в двадцати двух странах. Больше всего я люблю ездить на поездах: в поезде можно работать, смотреть в окно и знакомиться с попутчиками. Самая длинная поездка была по Транссибирской магистрали — я ехала из Москвы во Владивосток семь дней. Летаю я редко, только когда нужно перелететь через море. Сейчас я живу в Грузии, в Тбилиси. Каждое утро я хожу в маленькое кафе рядом с домом и там работаю. А в выходные езжу в горы. В следующем месяце я лечу в Индонезию. Мама каждый раз волнуется и просит, чтобы я звонила, когда доеду благополучно.";
const hear = (question: string, options: string[]): SeedQuestion => ({
  prompt: question,
  audio: NODIRA,
  options,
  correct: 0,
});

export const B2_03_EXERCISES: SeedExercise[] = [
  {
    title: "Tinglang va toping",
    skill: "Tinglash",
    kind: "listen",
    instructions: "Gap ovoz chiqarib o'qiladi. Eshitgan gapingizni toping: harakat fe'liga e'tibor bering.",
    questions: [
      listen("Сейчас я иду в библиотеку.", ["Сейчас я иду в библиотеку.", "Сейчас я хожу в библиотеку.", "Сейчас я еду в библиотеку.", "Вчера я ходил в библиотеку."]),
      listen("Мы часто ездим на дачу.", ["Мы часто ездим на дачу.", "Мы часто едем на дачу.", "Мы часто ходим на дачу.", "Мы часто ездили на дачу."]),
      listen("Самолёт летит в Москву.", ["Самолёт летит в Москву.", "Самолёт летает в Москву.", "Самолёт летел в Москву.", "Самолёт летит из Москвы."]),
      listen("Брат хорошо плавает.", ["Брат хорошо плавает.", "Брат хорошо плывёт.", "Брат хорошо плавал.", "Сестра хорошо плавает."]),
      listen("Она несёт тяжёлый чемодан.", ["Она несёт тяжёлый чемодан.", "Она носит тяжёлый чемодан.", "Она везёт тяжёлый чемодан.", "Она несла тяжёлый чемодан."]),
      listen("Папа водит машину с восемнадцати лет.", ["Папа водит машину с восемнадцати лет.", "Папа ведёт машину с восемнадцати лет.", "Папа водил машину с восемнадцати лет.", "Папа возит машину с восемнадцати лет."]),
      listen("Мы ехали на поезде всю ночь.", ["Мы ехали на поезде всю ночь.", "Мы ездили на поезде всю ночь.", "Мы ехали в поезде всю ночь.", "Мы едем на поезде всю ночь."]),
      listen("Дети бегают во дворе.", ["Дети бегают во дворе.", "Дети бегут во дворе.", "Дети бегали во дворе.", "Дети играют во дворе."]),
      listen("Курьер везёт цветы в эту квартиру.", ["Курьер везёт цветы в эту квартиру.", "Курьер несёт цветы в эту квартиру.", "Курьер возит цветы в эту квартиру.", "Курьер вёз цветы в эту квартиру."]),
      listen("Летом мы ездили в Петербург.", ["Летом мы ездили в Петербург.", "Летом мы ехали в Петербург.", "Летом мы были в Петербурге.", "Летом мы едем в Петербург."]),
    ],
  },
  {
    title: "Diktant",
    skill: "Eshitib yozish",
    kind: "dictation",
    instructions:
      "Gap ovoz chiqarib o'qiladi. Uni eshitib, ruscha yozing (kerak bo'lsa, qayta yoki sekinroq tinglang). Tinish belgilari hisobga olinmaydi.",
    questions: [
      "Я иду на работу пешком.",
      "Мы часто ездим в горы.",
      "Самолёт летит в Ташкент.",
      "Вчера я ходил в театр.",
      "Мой брат хорошо водит машину.",
      "Она несёт сумку с продуктами.",
      "Каждое лето мы летаем на море.",
      "Я еду на работу на автобусе.",
      "Рейс задерживается на два часа.",
      "Счастливого пути!",
    ].map((sentence) => ({ prompt: "Eshitganingizni yozing", audio: sentence, answer: sentence })),
  },
  {
    title: "Juftini toping",
    skill: "Juftlik",
    kind: "match",
    instructions: "Ruscha so'z yoki iborani o'zbekcha tarjimasi bilan ulang.",
    questions: [
      ["перелёт|uchib o'tish", "турпакет|tur paket", "трансфер|transfer", "путеводитель|yo'l ko'rsatkich kitob"],
      ["попутчик|hamroh", "хостел|xostel", "рейс|reys", "ночлег|tunash joyi"],
      ["автостоп|avtostop", "каюта|kayuta", "побывать|borib ko'rmoq", "объездить|kezib chiqmoq"],
      ["ночевать|tunamoq", "добираться|yetib bormoq", "зарегистрироваться|ro'yxatdan o'tmoq", "странствовать|kezib yurmoq"],
      ["взлетать|havoga ko'tarilmoq", "приземлиться|qo'nmoq", "пересаживаться|boshqa transportga o'tmoq", "укачивать|ko'ngil aynitmoq"],
      ["взлёт|havoga ko'tarilish", "отмена|bekor qilinish", "задержка|kechikish", "трата|xarajat"],
      ["бронирование|bron qilish", "вдохновение|ilhom", "развлечение|ko'ngilochar narsa", "перевозка|tashish"],
      ["прилёт|uchib kelish", "вылет|uchib ketish", "дальняя дорога|uzoq safar", "на обратном пути|qaytishda"],
      ["счастливого пути|oq yo'l", "сборы в дорогу|safarga tayyorgarlik", "платить за проезд|yo'l haqini to'lamoq", "проехать остановку|bekatdan o'tib ketmoq"],
      ["доехать благополучно|eson-omon yetib olmoq", "делиться впечатлениями|taassurot bilan o'rtoqlashmoq", "не по карману|cho'ntakka to'g'ri kelmaydi", "отправиться в путь|yo'lga otlanmoq"],
    ].map((options) => ({ prompt: "Juftlarni ulang", options })),
  },
  {
    title: "Fe'l nimani bildiradi?",
    skill: "Harakat · 1-bosqich",
    kind: "choice",
    instructions:
      "I MODEL (идти, ехать, лететь, плыть, бежать, нести, везти, вести): bir yo'nalishda, hozir yo'lda yoki jarayon — Смотри, идёт автобус! Мы летели четыре часа. II MODEL (ходить, ездить, летать, плавать, бегать, носить, возить, водить): borib kelish (ходил = был), takrorlanish, qobiliyat va har tomonga harakat (Дети бегают во дворе). Gapdagi fe'l nimani bildiradi?",
    questions: [
      meaning("Смотри, вон идёт наш автобус!", 0),
      meaning("Вчера мы ходили в музей.", 1, "Ходили в музей = были в музее."),
      meaning("Я хожу в бассейн по средам.", 2),
      meaning("Моя маленькая сестра уже ходит.", 3, "Yura oladi."),
      meaning("Мы летели в Лондон почти четыре часа.", 0, "Jarayon: yo'lda to'rt soat."),
      meaning("В прошлом году она ездила в Японию.", 1, "Ездила в Японию = была в Японии."),
      meaning("Брат отлично ездит на велосипеде.", 3),
      meaning("Каждое утро папа возит нас в школу.", 2),
      meaning("Куда ты сейчас едешь?", 0),
      meaning("Ты летал когда-нибудь в Париж?", 1, "Летал = был в Париже."),
    ],
  },
  {
    title: "Идти или ходить?",
    skill: "Harakat · 2-bosqich",
    kind: "choice",
    instructions: "Gapga mos fe'l shaklini tanlang: bir yo'nalishmi (идти, ехать) yoki borib kelish, odat (ходить, ездить)?",
    questions: [
      pick("Куда ты … ? — В магазин, за хлебом.", ["идёшь", "ходишь", "ходил", "шёл"], "Hozir yo'lda — идёшь."),
      pick("Я … в спортзал три раза в неделю.", ["хожу", "иду", "идут", "ходят"], "Takrorlanish — хожу."),
      pick("Сегодня утром, когда я … на работу, я встретил друга.", ["шёл", "хожу", "иду", "ходят"], "Jarayon (yo'lda) — шёл."),
      pick("Вчера мы … в кино. Фильм был интересный.", ["ходили", "шли", "идём", "ходим"], "Borib keldik — ходили."),
      pick("Посмотри, какие тучи! Скоро … дождь.", ["пойдёт", "ходит", "ходил", "ходят"], "Дождь идёт / пойдёт — faqat I model."),
      pick("Мой дедушка любит … пешком по парку.", ["ходить", "идти", "шёл", "иду"], "Har tomonga, odat — ходить."),
      pick("Мы … на машине уже пять часов, а до моря ещё далеко.", ["едем", "ездим", "ездили", "ездят"], "Hozir yo'ldamiz — едем."),
      pick("Ты … когда-нибудь на Кавказ?", ["ездил", "ехал", "едешь", "ездишь"], "Ездил = был."),
      pick("Завтра я … в Самарканд на поезде.", ["еду", "езжу", "ездил", "ездят"], "Rejalashtirilgan safar — еду."),
      pick("Летом мы всегда … на море.", ["ездим", "едем", "ехали", "едут"], "Har yili — ездим."),
    ],
  },
  {
    title: "Juftlikdan tanlang",
    skill: "Harakat · 3-bosqich",
    kind: "fill",
    instructions: "Qavsdagi juftlikdan mos fe'lni tanlab, to'g'ri shaklda yozing (kitobdagi mashq asosida).",
    questions: [
      fill("Как много птиц ___ по небу! (лететь — летать)", "летает", "Har tomonga — летает."),
      fill("Ты сам сможешь научиться ___ на велосипеде. (ехать — ездить)", "ездить", "Qobiliyat — ездить."),
      fill("Раньше в Саудовской Аравии женщины не ___ автомобили. (вести — водить)", "водили", "Машину водить — haydashni bilish."),
      fill("Паром будет ___ без остановок до самого Хоккайдо. (плыть — плавать)", "плыть", "Bir yo'nalishda — плыть."),
      fill("Мой дедушка ___ гулять каждый день. (идти — ходить)", "ходит"),
      fill("Пока я ___ из Москвы во Владивосток, я прочитал всю книгу. (ехать — ездить)", "ехал", "Jarayon — ехал."),
      fill("В детстве он ___ в хорошую школу. (идти — ходить)", "ходил"),
      fill("Самолёт ___ со скоростью восемьсот километров в час. (лететь — летать)", "летит|летел"),
      fill("Папа устал, поэтому дальше машину ___ мама. (вести — водить)", "вела|ведёт|ведет", "Shu safar, bir yo'nalishda — вела."),
      fill("Моя сестра ___ в бассейн каждую неделю. (идти — ходить)", "ходит"),
    ],
  },
  {
    title: "Был = ездил",
    skill: "Harakat · 4-bosqich",
    kind: "choice",
    instructions:
      "O'tgan zamonda II model fe'li «borib keldi» degani: Я ходил в театр = Я был в театре (В.п. → П.п.!). Ездил — transportda, летал — samolyotda. Gapni ma'nosi bir xil gapga aylantiring.",
    questions: [
      pick("Вчера я был в театре. = Вчера я … в театр.", ["ходил", "шёл", "иду", "хожу"]),
      pick("Летом мы были в Париже (летали). = Летом мы … в Париж.", ["летали", "летели", "летим", "летаем"]),
      pick("Где ты был утром? = Куда ты … утром?", ["ходил", "шёл", "идёшь", "ходишь"]),
      pick("Зимой она была в Казани (на поезде). = Зимой она … в Казань.", ["ездила", "ехала", "едет", "ездит"]),
      pick("Мы были у бабушки в субботу (пешком). = Мы … к бабушке в субботу.", ["ходили", "шли", "идём", "ходим"]),
      pick("Я ходил в музей. = Я … в музее.", ["был", "шёл", "ходил", "буду"]),
      pick("Она летала в Сеул. = Она … в Сеуле.", ["была", "летела", "будет", "есть"]),
      pick("Отец ездил в командировку. = Отец … в командировке.", ["был", "ехал", "едет", "ездит"]),
      pick("Дети ходили в зоопарк. = Дети … в зоопарке.", ["были", "шли", "идут", "ходят"]),
      pick("Ты был на море? (на машине) = Ты … на море?", ["ездил", "ехал", "едешь", "ездишь"]),
    ],
  },
  {
    title: "Нести, везти или вести?",
    skill: "Harakat · 5-bosqich",
    kind: "choice",
    instructions:
      "НЕСТИ / НОСИТЬ — qo'lda ko'tarib, piyoda (носить — kiyib yurish ham: носить очки). ВЕЗТИ / ВОЗИТЬ — transportda olib borish. ВЕСТИ / ВОДИТЬ — yetaklab borish (водить машину — mashina haydash). Mos fe'lni tanlang.",
    questions: [
      pick("Мама … ребёнка в детский сад за руку.", ["ведёт", "несёт", "везёт", "едет"]),
      pick("Почтальон … письма в сумке.", ["несёт", "ведёт", "везёт", "идёт"]),
      pick("Грузовик … фрукты на рынок.", ["везёт", "несёт", "ведёт", "едет"]),
      pick("Гид … туристов по старому городу.", ["ведёт", "везёт", "несёт", "носит"]),
      pick("Я каждый день … с собой зонтик.", ["ношу", "несу", "вожу", "веду"], "Har kuni — II model."),
      pick("Автобус … детей в лагерь.", ["везёт", "ведёт", "несёт", "идёт"]),
      pick("Папа каждое утро … нас в школу на машине.", ["возит", "водит", "носит", "везёт"]),
      pick("Учитель … детей в музей каждую пятницу (пешком).", ["водит", "возит", "носит", "ведёт"]),
      pick("Официант … нам кофе.", ["несёт", "везёт", "ведёт", "водит"]),
      pick("Он … очки с детства.", ["носит", "водит", "возит", "несёт"], "Носить очки — ko'zoynak taqib yurmoq."),
    ],
  },
  {
    title: "На чём? В чём?",
    skill: "Predloglar",
    kind: "fill",
    instructions:
      "НА + П.п. — qanday transportda? (на поезде, на автобусе, на метро, на лошади). В + П.п. — transportning ichida, qayerda? (в поезде было жарко, уснул в трамвае). Bo'sh joyga «на» yoki «в» yozing.",
    questions: [
      fill("Мой отец ездит на работу ___ велосипеде.", "на"),
      fill("Однажды он уснул ___ трамвае и проехал свою остановку.", "в", "Qayerda uxladi? — в трамвае."),
      fill("Я никогда не летал ___ самолёте.", "на"),
      fill("Майк ездит в школу ___ автобусе.", "на"),
      fill("Мы посадим тебя ___ такси и отвезём домой.", "в", "Посадить в такси (ichiga)."),
      fill("Моя мама не разрешает мне ездить ___ метро.", "на"),
      fill("Я познакомился с попутчиком ___ поезде.", "в", "Qayerda tanishdi? — в поезде."),
      fill("Туристы долго ехали ___ лошадях по горам.", "на"),
      fill("Нам было тепло и уютно ___ автобусе.", "в"),
      fill("Сергей переезжал из города в город ___ попутных машинах.", "на"),
    ],
  },
  {
    title: "Nimada boramiz?",
    skill: "Rasm",
    kind: "picture",
    instructions: "Rasmga qarab ayting: nimada boramiz? (на + П.п.)",
    questions: [
      pick("🚲", ["на велосипеде", "на лошади", "на метро", "на лодке"]),
      pick("🐎", ["на лошади", "на велосипеде", "на поезде", "на такси"]),
      pick("🚇", ["на метро", "на трамвае", "на самолёте", "на корабле"]),
      pick("🚋", ["на трамвае", "на метро", "на автобусе", "на лодке"]),
      pick("⛴️", ["на пароме", "на самолёте", "на поезде", "на лошади"]),
      pick("🚁", ["на вертолёте", "на самолёте", "на корабле", "на велосипеде"]),
      pick("🛶", ["на лодке", "на пароме", "на машине", "на метро"]),
      pick("🚕", ["на такси", "на автобусе", "на поезде", "на лошади"]),
      pick("🚂", ["на поезде", "на трамвае", "на такси", "на вертолёте"]),
      pick("🏍️", ["на мотоцикле", "на велосипеде", "на машине", "на пароме"]),
    ],
  },
  {
    title: "Fe'ldan ot yasang",
    skill: "So'z yasash",
    kind: "type",
    instructions:
      "Fe'ldan ot yasaladi: qo'shimchasiz (взлетать → взлёт, отменять → отмена), -к- (задерживаться → задержка), -ени(е) / -ани(е) (бронировать → бронирование, вдохновлять → вдохновение). Fe'ldan yasalgan otni yozing.",
    questions: [
      ["взлетать", "взлёт|взлет"],
      ["отменять", "отмена"],
      ["задерживаться", "задержка"],
      ["тратить", "трата"],
      ["бронировать", "бронирование"],
      ["вдохновлять", "вдохновение"],
      ["развлекать", "развлечение"],
      ["перевозить", "перевозка"],
      ["вылетать", "вылет"],
      ["прилетать", "прилёт|прилет"],
    ].map(([prompt, answer]) => ({ prompt, answer })),
  },
  {
    title: "Gap tuzing",
    skill: "Harakat · 6-bosqich",
    kind: "order",
    instructions: "So'zlarni to'g'ri tartibda bosib, gap tuzing.",
    questions: [
      build("Вчера мы ходили в новый музей."),
      build("Каждое лето я летаю к бабушке."),
      build("Сейчас мы едем на дачу на машине."),
      build("Мой брат хорошо водит машину."),
      build("Гид ведёт туристов по старому городу."),
      build("Я всегда ношу с собой путеводитель."),
      build("Самолёт летит над облаками."),
      build("В детстве я ходил в музыкальную школу."),
      build("На обратном пути мы заехали в Самарканд."),
      build("Сергей путешествует по Европе автостопом."),
    ],
  },
  {
    title: "Iborani yig'ing",
    skill: "Kollokatsiyalar",
    kind: "match",
    instructions: "Iboraning birinchi qismini ikkinchisi bilan ulang. Bir qismi Absalomov lug'atidan, bir qismi kitobdan.",
    questions: [
      ["бежать|со всех ног", "водить|за руку", "вести|поезд", "ездить|верхом"],
      ["идти|на посадку", "лететь|стрелой", "плыть|по реке", "носить|бороду"],
      ["идти|в гости", "вести|себя", "дальняя|дорога", "отправиться|в путь"],
      ["на обратном|пути", "сборы|в дорогу", "платить|за проезд", "проехать|остановку"],
      ["доехать|благополучно", "делиться|впечатлениями", "не по|карману", "счастливого|пути"],
      ["отменить|поездку", "гулять|по городу", "бронировать|гостиницу", "задерживаться|на работе"],
      ["скучать|по дому", "отправиться|в путешествие", "опоздать|на самолёт", "остановиться|в отеле"],
      ["сдать|багаж", "задержать|рейс", "собирать|чемодан", "пристегнуть|ремни"],
      ["древний|город", "комфортный|поезд", "живописный|вид", "незабываемая|поездка"],
      ["местные|жители", "ценный|совет", "небезопасный|способ", "великолепный|отдых"],
    ].map((options) => ({ prompt: "Juftlarni ulang", options })),
  },
  {
    title: "Urg'u qayerda?",
    skill: "Urg'u",
    kind: "stress",
    instructions: "So'zni eshiting va urg'uli bo'g'inni bosing.",
    questions: [
      stress("пу|те|во|ди|тель", 3, "путеводи́тель"),
      stress("по|пут|чик", 1, "попу́тчик"),
      stress("ка|ю|та", 1, "каю́та"),
      stress("пе|ре|лёт", 2, "перелёт"),
      stress("ноч|лег", 1, "ночле́г"),
      stress("хос|тел", 0, "хо́стел"),
      stress("ав|то|стоп", 2, "автосто́п"),
      stress("от|ме|на", 1, "отме́на"),
      stress("вы|лет", 0, "вы́лет"),
      stress("за|держ|ка", 1, "заде́ржка"),
    ],
  },
  {
    title: "Yo'lda",
    skill: "Vaziyat",
    kind: "situation",
    instructions: "Vaziyatga mos ruscha gapni tanlang.",
    questions: [
      pick("Do'stingizdan kecha qayerga borganini so'raysiz.", ["Куда ты ходил вчера?", "Куда ты шёл вчера?", "Куда ты идёшь вчера?", "Где ты ходил вчера?"]),
      pick("Har kuni ishga metroda borishingizni aytasiz.", ["Я езжу на работу на метро.", "Я еду на работу на метро каждый день.", "Я хожу на работу на метро.", "Я езжу на работу метро."]),
      pick("Hozir taksida ketayotganingizni, 10 daqiqada yetib borishingizni aytasiz.", ["Я еду на такси, буду через десять минут.", "Я езжу на такси, буду через десять минут.", "Я иду на такси, буду через десять минут.", "Я ехал на такси, буду через десять минут."]),
      pick("Umuman uchishni yoqtirmasligingizni aytasiz.", ["Я не люблю летать.", "Я не люблю лететь.", "Я не люблю летаю.", "Я не люблю полёт летать."]),
      pick("Hamrohingizga oq yo'l tilaysiz.", ["Счастливого пути!", "Счастливый путь!", "Счастливого дорога!", "Хорошего путя!"]),
      pick("Taksi haydovchisidan sizni aeroportga olib borishini so'raysiz.", ["Отвезите меня, пожалуйста, в аэропорт.", "Отведите меня, пожалуйста, в аэропорт.", "Отнесите меня, пожалуйста, в аэропорт.", "Отвезите меня, пожалуйста, на аэропорт."]),
      pick("Mehmonxona cho'ntagingizga to'g'ri kelmasligini aytasiz.", ["Эта гостиница мне не по карману.", "Эта гостиница мне не в карман.", "Эта гостиница меня не по карману.", "Эта гостиница мне не по карманам."]),
      pick("O'g'lingiz velosiped haydashni bilishini aytasiz.", ["Мой сын уже умеет ездить на велосипеде.", "Мой сын уже умеет ехать на велосипеде.", "Мой сын уже умеет водить на велосипеде.", "Мой сын уже умеет ездить в велосипеде."]),
      pick("Reys kechikayotganini aytasiz.", ["Рейс задерживается.", "Рейс задерживает.", "Рейс опаздываться.", "Рейс задержка."]),
      pick("Do'stingizga avtobusda bekatdan o'tib ketganingizni aytasiz.", ["Я проехал свою остановку.", "Я проехал своей остановки.", "Я переехал свою остановку.", "Я уехал свою остановку."]),
    ],
  },
  {
    title: "Turist emas, sayohatchi",
    skill: "O'qish",
    kind: "truefalse",
    instructions: "Sayohatchi Dilshod haqidagi matnni o'qing va gap to'g'ri yoki noto'g'ri ekanini belgilang.",
    questions: [
      tf("Дилшод побывал в тридцати странах.", true),
      tf("Он покупает готовые турпакеты.", false, "Он сам придумывает себе приключения."),
      tf("Дилшод часто летает на самолётах.", false, "Он редко летает."),
      tf("По Европе он путешествует автостопом.", true),
      tf("Он ночует в дорогих отелях.", false, "В хостелах или у местных жителей."),
      tf("Дилшод не экономит на еде.", true),
      tf("По Грузии он ездил на машине.", false, "Он ходил пешком по горам."),
      tf("В Грузии он ночевал в палатке.", true),
      tf("Отели в Японии были ему не по карману.", true),
      tf("Дилшод уже написал книгу.", false, "Он её сейчас пишет."),
    ],
  },
  {
    title: "Arzon sayohat sirlari",
    skill: "Matn bilan ishlash",
    kind: "reading",
    instructions: "Arzon sayohat qilish bo'yicha maslahatlarni o'qing va savollarga javob bering.",
    questions: [
      read("Когда лучше бронировать билеты?", ["За два-три месяца до вылета.", "За день до вылета.", "В аэропорту.", "Об этом не сказано."]),
      read("Сколько можно сэкономить на раннем бронировании?", ["До половины цены.", "Десять процентов.", "Ничего.", "Всю цену."]),
      read("Почему стоит летать с пересадками?", ["Это дешевле, и можно посмотреть новый город.", "Это быстрее.", "Это удобнее.", "Так требует авиакомпания."]),
      read("Что можно сделать во время долгой пересадки?", ["Выйти из аэропорта и посмотреть город.", "Поспать в самолёте.", "Купить новый билет.", "Ничего нельзя сделать."]),
      read("Какой транспорт советует автор?", ["Общественный транспорт.", "Такси.", "Трансфер.", "Машину напрокат."]),
      read("Почему лучше ходить пешком?", ["Так вы увидите город таким, какой он есть.", "Это полезно для здоровья.", "Так быстрее.", "Метро не работает."]),
      read("Что хорошего в хостелах, кроме цены?", ["Там можно познакомиться с путешественниками.", "Там бесплатный завтрак.", "Там тихо.", "Там большие номера."]),
      read("Почему лучше скачать путеводитель в телефон?", ["Бумажный тяжело носить, а в приложении есть карты.", "Бумажные путеводители дорогие.", "В бумажных много ошибок.", "Об этом не сказано."]),
      read("Чего, по мнению автора, не нужно бояться?", ["Задержек и отмен рейсов.", "Хостелов.", "Пеших прогулок.", "Пересадок в метро."]),
      read("Что делает поездку незабываемой?", ["Неожиданности в дороге.", "Дорогие отели.", "Готовый турпакет.", "Прямые рейсы."]),
    ],
  },
  {
    title: "Ishlab sayohat qilish",
    skill: "Tinglab tushunish",
    kind: "audiotext",
    instructions:
      "Nodiraning sayohat va ish haqidagi hikoyasini tinglang (kerak bo'lsa, qayta yoki sekinroq) va savollarga javob bering. Matn ekranda ko'rsatilmaydi.",
    questions: [
      hear("Где Нодира работала раньше?", ["В банке в Ташкенте.", "В школе.", "В турагентстве.", "В аэропорту."]),
      hear("Как она ездила на работу?", ["На метро.", "На автобусе.", "На машине.", "Ходила пешком."]),
      hear("Чем она занимается сейчас?", ["Переводит тексты онлайн.", "Работает гидом.", "Пишет книгу.", "Работает в кафе."]),
      hear("В скольких странах она побывала?", ["В двадцати двух.", "В двенадцати.", "В тридцати.", "В двух."]),
      hear("На каком транспорте она любит ездить больше всего?", ["На поезде.", "На самолёте.", "На автобусе.", "На машине."]),
      hear("Сколько дней она ехала во Владивосток?", ["Семь.", "Три.", "Десять.", "Два."]),
      hear("Когда она летает на самолёте?", ["Когда нужно перелететь через море.", "Каждый месяц.", "Никогда.", "Только по работе."]),
      hear("Где она живёт сейчас?", ["В Тбилиси.", "В Ташкенте.", "Во Владивостоке.", "В Индонезии."]),
      hear("Куда она ходит каждое утро?", ["В маленькое кафе рядом с домом.", "В горы.", "В банк.", "В бассейн."]),
      hear("О чём её просит мама?", ["Звонить, когда доедет благополучно.", "Вернуться домой.", "Не летать на самолётах.", "Найти работу в банке."]),
    ],
  },
  {
    title: "Ayting",
    skill: "Talaffuz",
    kind: "speak",
    instructions: "Gapni eshiting, keyin mikrofon tugmasini bosib o'zingiz ayting.",
    questions: [
      "Сейчас я иду в магазин.",
      "Вчера мы ходили в театр.",
      "Я езжу на работу на метро.",
      "Каждое лето мы летаем на море.",
      "Мой брат хорошо водит машину.",
      "Гид ведёт туристов по городу.",
      "Рейс задерживается на час.",
      "Мне нужно зарегистрироваться на рейс.",
      "Эта гостиница мне не по карману.",
      "Счастливого пути!",
    ].map((phrase) => ({ prompt: phrase, answer: phrase })),
  },
];
