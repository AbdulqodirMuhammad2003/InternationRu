/**
 * B1, 3-dars — «Брак и развод» (Liden & Denz, «Я ❤ Русский Язык», B1.1,
 * 1-urok 2-modul, birinchi yarmi): zamonaviy nikoh, ajrashish sabablari,
 * oiladagi rollar, fuqarolik nikohi; qisqa sifatlar: yasalishi (qochar
 * unli: умён, печален), ayol jinsida urg'u ko'chishi (занята́), to'liq va
 * qisqa shaklning farqi, «рад / готов / обязан / согласен + infinitiv»,
 * «такой + to'liq / так + qisqa», qisqa sifatli maqollar.
 *
 * Mashqlar turfa: rasmga qarab holat, yozib shakl yasash, urg'u, sonlarni
 * eshitib yozish, talaffuz, maqollar; kollokatsiyalar juftligida B1-01 va
 * B1-02 iboralari ham takrorlanadi. Lug'at 5 bosqich (50 so'z), 3-bosqich —
 * qisqa sifatlar, 4–5-bosqich — kollokatsiyalar. 16 ta mashq.
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

export const B1_03_ROUNDS: { title: string; words: VocabSeed[] }[] = [
  {
    title: "1-bosqich",
    words: [
      w("📉", "Кризис", "krízis", "ot", "Inqiroz", "Трудный, опасный период.", "Кризис отношений бывает почти в каждой семье.", "Munosabatlar inqirozi deyarli har bir oilada bo'ladi."),
      w("🐍", "Измена", "izmyéna", "ot", "Xiyonat", "Когда муж или жена любит другого человека.", "Измена — одна из главных причин развода.", "Xiyonat — ajrashishning asosiy sabablaridan biri."),
      w("💞", "Верность", "vyérnast'", "ot", "Sadoqat", "Когда человек не изменяет любимому.", "Верность — основа крепкого брака.", "Sadoqat — mustahkam nikohning asosi."),
      w("🟰", "Равенство", "ravyénstva", "ot", "Tenglik", "Когда у всех одинаковые права.", "Равенство мужчины и женщины — важная тема сегодня.", "Erkak va ayol tengligi — bugungi muhim mavzu."),
      w("😒", "Ревность", "ryévnast'", "ot", "Rashk", "Страх, что любимый человек выберет другого.", "Ревность может разрушить даже крепкий брак.", "Rashk hatto mustahkam nikohni ham buzishi mumkin."),
      w("🗯️", "Ссора", "ssóra", "ot", "Janjal", "Громкий спор, конфликт.", "Каждая ссора — это урок для супругов.", "Har bir janjal — er-xotin uchun saboq."),
      w("🌑", "Одиночество", "adinóchistva", "ot", "Yolg'izlik", "Когда человек один, без близких людей.", "Одиночество в большом городе — частая проблема.", "Katta shahardagi yolg'izlik — ko'p uchraydigan muammo."),
      w("🗽", "Независимость", "nizavísimast'", "ot", "Mustaqillik", "Когда ни от кого не зависишь.", "Финансовая независимость важна для многих женщин.", "Moliyaviy mustaqillik ko'p ayollar uchun muhim."),
      w("🪙", "Бедность", "byédnast'", "ot", "Qashshoqlik", "Когда у человека очень мало денег.", "Бедность часто становится причиной ссор.", "Qashshoqlik ko'pincha janjallarga sabab bo'ladi."),
      w("💵", "Заработок", "zárabatak", "ot", "Ish haqi, daromad", "Деньги, которые человек получает за работу.", "Его заработок пока не очень высокий.", "Uning ish haqi hozircha unchalik yuqori emas."),
    ],
  },
  {
    title: "2-bosqich",
    words: [
      w("💔", "Изменять", "izminyát'", "fe'l", "Xiyonat qilmoq", "Кому? Быть неверным мужу или жене. СВ: изменить.", "Изменять любимому человеку — подло.", "Sevgan odamga xiyonat qilish — pastkashlik."),
      w("🙈", "Скрывать", "skryvát'", "fe'l", "Yashirmoq", "Что? От кого? Не показывать, не рассказывать. СВ: скрыть.", "Не нужно скрывать проблемы от близких.", "Muammolarni yaqinlardan yashirish kerak emas."),
      w("👉", "Осуждать", "asuzhdát'", "fe'l", "Qoralamoq", "Кого? За что? Говорить, что человек поступил плохо. СВ: осудить.", "Нельзя осуждать людей, если не знаешь их жизни.", "Hayotini bilmagan odamlarni qoralash mumkin emas."),
      w("😾", "Ревновать", "rivnavát'", "fe'l", "Rashk qilmoq", "Кого? К кому? Чувствовать ревность.", "Он начал ревновать жену к её коллегам.", "U xotinini hamkasblaridan rashk qila boshladi."),
      w("🏦", "Обеспечивать", "abispyéchivat'", "fe'l", "Ta'minlamoq", "Кого? Чем? Давать всё нужное для жизни. СВ: обеспечить.", "Раньше только муж должен был обеспечивать семью.", "Ilgari oilani faqat er ta'minlashi kerak edi."),
      w("🚀", "Стремиться", "strimít'sa", "fe'l", "Intilmoq", "К чему? Очень хотеть чего-то и много делать для этого.", "Важно стремиться к своей цели.", "O'z maqsadingga intilish muhim."),
      w("🤔", "Относиться", "atnasít'sa", "fe'l", "Munosabatda bo'lmoq", "К кому? К чему? Как? Иметь мнение, чувство. СВ: отнестись.", "Нужно относиться к людям с уважением.", "Odamlarga hurmat bilan munosabatda bo'lish kerak."),
      w("🧩", "Распадаться", "raspadát'sa", "fe'l", "Buzilmoq (oila)", "О браке, семье: перестать существовать. СВ: распасться.", "Семьи не должны распадаться из-за денег.", "Oilalar pul tufayli buzilmasligi kerak."),
      w("📐", "Доказывать", "dakázyvat'", "fe'l", "Isbotlamoq", "Что? Кому? Показывать, что это правда. СВ: доказать.", "Не нужно никому ничего доказывать.", "Hech kimga hech narsani isbotlash shart emas."),
      w("🕊️", "Прощать", "prashchát'", "fe'l", "Kechirmoq", "Кого? За что? Больше не сердиться. СВ: простить.", "Умение прощать — секрет долгого брака.", "Kechira bilish — uzoq nikohning siri."),
    ],
  },
  {
    title: "3-bosqich · Qisqa sifatlar",
    words: [
      w("😊", "Рад", "rat", "qisqa sifat", "Xursand", "Чему? + инфинитив. Только краткая форма: рад, рада, рады.", "Я очень рад тебя видеть!", "Seni ko'rganimdan juda xursandman!"),
      w("✅", "Готов", "gatóf", "qisqa sifat", "Tayyor", "К чему? + инфинитив: готов, готова, готовы.", "Я готов помочь тебе в любой момент.", "Men senga istalgan paytda yordam berishga tayyorman."),
      w("📌", "Обязан", "abyázan", "qisqa sifat", "Burchli, qarzdor", "Кому? + инфинитив. Должен по закону или по совести.", "Ты ничем мне не обязан.", "Sen menga hech narsada qarzdor emassan."),
      w("🥰", "Счастлив", "shchásliv", "qisqa sifat", "Baxtli (hozir)", "Краткая форма от «счастливый»: счастлив, счастлива, счастливы.", "Он счастлив, потому что рядом любимая жена.", "U baxtli, chunki yonida sevimli xotini bor."),
      w("👌", "Доволен", "davólin", "qisqa sifat", "Mamnun", "Кем? Чем? (Т.п.) Ж.р.: довольна.", "Директор доволен нашей работой.", "Direktor ishimizdan mamnun."),
      w("😠", "Сердит", "sirdít", "qisqa sifat", "Jahli chiqqan", "На кого? За что? Ж.р.: сердита.", "Отец сердит на сына за плохую оценку.", "Otaning yomon baho uchun o'g'lidan jahli chiqqan."),
      w("🙏", "Благодарен", "blagadárin", "qisqa sifat", "Minnatdor", "Кому? За что? Ж.р.: благодарна.", "Я благодарен родителям за всё.", "Men ota-onamdan hamma narsa uchun minnatdorman."),
      w("🫵", "Виноват", "vinavát", "qisqa sifat", "Aybdor", "В чём? Перед кем? Ж.р.: виновата.", "Извини, я виноват перед тобой.", "Kechir, men sening oldingda aybdorman."),
      w("👍", "Прав", "praf", "qisqa sifat", "Haq", "Думает или говорит правильно. Ж.р.: права́, мн.ч.: правы.", "Ты прав, нам нужно поговорить.", "Sen haqsan, gaplashib olishimiz kerak."),
      w("🦢", "Верен", "vyérin", "qisqa sifat", "Sodiq", "Кому? Чему? Краткая форма от «верный»: верен, верна.", "Он всю жизнь был верен жене.", "U butun umr xotiniga sodiq bo'ldi."),
    ],
  },
  {
    title: "4-bosqich · Kollokatsiyalar",
    words: [
      w("🤝", "Идти на компромиссы", "itti na kampramíssy", "ibora", "Murosaga kelmoq", "Уступать друг другу, искать общее решение.", "В браке нужно уметь идти на компромиссы.", "Nikohda murosaga kela bilish kerak."),
      w("🦵", "Встать на ноги", "fstat' na nógi", "ibora", "Oyoqqa turib olmoq", "Стать самостоятельным, начать хорошо зарабатывать.", "Сначала хочу встать на ноги, а потом жениться.", "Avval oyoqqa turib olmoqchiman, keyin uylanaman."),
      w("🗺️", "Реализовать планы", "rializavát' plány", "ibora", "Rejalarni amalga oshirmoq", "Сделать то, что задумал.", "Молодые люди хотят сначала реализовать планы, а потом создавать семью.", "Yoshlar avval rejalarini amalga oshirib, keyin oila qurmoqchi."),
      w("🛂", "Штамп в паспорте", "shtamp f paspórte", "ibora", "Pasportdagi muhr", "Знак официальной регистрации брака.", "Для них штамп в паспорте ничего не значит.", "Ular uchun pasportdagi muhr hech narsani anglatmaydi."),
      w("🧹", "Делить обязанности", "dilít' abyázannasti", "ibora", "Vazifalarni bo'lishmoq", "Решать вместе, кто что делает дома.", "Важно делить обязанности по дому поровну.", "Uy vazifalarini teng bo'lishish muhim."),
      w("📃", "Брачный договор", "bráchniy dagavór", "ibora", "Nikoh shartnomasi", "Документ о деньгах и имуществе супругов.", "Перед свадьбой они подписали брачный договор.", "To'ydan oldin ular nikoh shartnomasini imzolashdi."),
      w("🛟", "Сохранить брак", "sakhranít' brak", "ibora", "Nikohni saqlab qolmoq", "Не развестись, остаться вместе.", "Они решили сохранить брак ради детей.", "Ular bolalar uchun nikohni saqlab qolishga qaror qilishdi."),
      w("🏛️", "Подать на развод", "padát' na razvót", "ibora", "Ajrashishga ariza bermoq", "Официально попросить развод в ЗАГСе или в суде.", "Через год жена решила подать на развод.", "Bir yildan keyin xotini ajrashishga ariza berishga qaror qildi."),
      w("🚶", "Жить поодиночке", "zhit' paadinóchke", "ibora", "Yolg'iz yashamoq", "Жить одному, без семьи.", "Многие в больших городах предпочитают жить поодиночке.", "Katta shaharlarda ko'pchilik yolg'iz yashashni afzal ko'radi."),
      w("🚪", "Уйти из семьи", "uytí is sim'í", "ibora", "Oilani tashlab ketmoq", "Оставить жену или мужа и детей.", "Он не смог уйти из семьи, потому что любил детей.", "U oilani tashlab keta olmadi, chunki bolalarini yaxshi ko'rardi."),
    ],
  },
  {
    title: "5-bosqich · Kollokatsiyalar",
    words: [
      w("❓", "Причина развода", "prichína razvóda", "ibora", "Ajrashish sababi", "То, из-за чего люди разводятся.", "Главная причина развода — неумение говорить друг с другом.", "Ajrashishning asosiy sababi — bir-biri bilan gaplasha olmaslik."),
      w("🏡", "Совместная жизнь", "savmyésnaya zhizn'", "ibora", "Birga yashash", "Когда пара живёт вместе.", "Совместная жизнь — это не только любовь, но и быт.", "Birga yashash — faqat sevgi emas, balki turmush tashvishlari hamdir."),
      w("🧑‍🦳", "Зрелый возраст", "zryéliy vózrast", "ibora", "Yetuk yosh", "Возраст, когда у человека уже есть опыт.", "Зрелый возраст — лучшее время для серьёзных решений.", "Yetuk yosh — jiddiy qarorlar uchun eng yaxshi vaqt."),
      w("📈", "Финансовая стабильность", "finansóvaya stabíl'nast'", "ibora", "Moliyaviy barqarorlik", "Когда есть постоянный и надёжный доход.", "Финансовая стабильность важна для молодой семьи.", "Yosh oila uchun moliyaviy barqarorlik muhim."),
      w("🩹", "Психологическая травма", "psikhalagíchiskaya trávma", "ibora", "Ruhiy jarohat", "Сильная душевная боль после тяжёлого события.", "Развод родителей — психологическая травма для ребёнка.", "Ota-onaning ajrashishi — bola uchun ruhiy jarohat."),
      w("🧺", "Работа по дому", "rabóta pa dómu", "ibora", "Uy ishlari", "Уборка, готовка, стирка.", "Работа по дому — не только женская обязанность.", "Uy ishlari — faqat ayolning vazifasi emas."),
      w("⚖️", "Равные права", "rávniye pravá", "ibora", "Teng huquqlar", "Одинаковые права для всех.", "У мужа и жены равные права.", "Er va xotinning huquqlari teng."),
      w("🎯", "Общие цели", "óbshchiye tséli", "ibora", "Umumiy maqsadlar", "Цели, которые есть у обоих.", "Когда дети вырастают, у супругов должны быть общие цели.", "Bolalar ulg'aygach, er-xotinning umumiy maqsadlari bo'lishi kerak."),
      w("📊", "Уровень жизни", "úravin' zhízni", "ibora", "Turmush darajasi", "Насколько хорошо живут люди.", "Уровень жизни в стране постепенно растёт.", "Mamlakatda turmush darajasi asta-sekin o'smoqda."),
      w("👛", "Семейный бюджет", "simyéyniy byudzhét", "ibora", "Oila byudjeti", "Деньги семьи на месяц или на год.", "Семейный бюджет лучше планировать вместе.", "Oila byudjetini birga rejalashtirgan yaxshi."),
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
/** Urg'u: bo'g'inlar "|" bilan, `correct` — urg'uli bo'g'in raqami (0 dan). */
const stress = (syllables: string, correct: number, explanation?: string): SeedQuestion => ({
  prompt: "Urg'uli bo'g'inni toping",
  audio: syllables.replace(/\|/g, ""),
  options: syllables.split("|"),
  correct,
  explanation,
});
const num = (audio: string, answer: string, explanation?: string): SeedQuestion => ({
  prompt: "Sonni raqamlar bilan yozing",
  audio,
  answer,
  explanation,
});

const TF = ["To'g'ri", "Noto'g'ri"];
const MARRIAGE =
  "Сегодня молодые люди в России и в Узбекистане вступают в брак позже, чем их родители. Многие сначала хотят получить образование, встать на ноги и реализовать свои планы, а потом уже создавать семью. Социологи говорят, что брак в зрелом возрасте часто бывает крепче, но статистика не так оптимистична: в России распадается почти каждый второй брак. Главными причинами развода люди называют измену, бедность и неумение идти на компромиссы. Изменились и роли в семье. Раньше муж обеспечивал семью, а жена занималась детьми и работой по дому. Теперь супруги часто равны: жена тоже работает и участвует в решении финансовых вопросов, а муж готов помогать по дому. Растёт и число пар, которые живут в гражданском браке: они уверены, что штамп в паспорте не делает отношения крепче. Психологи напоминают: развод — это всегда психологическая травма, особенно для детей, поэтому, прежде чем подать на развод, стоит попробовать сохранить брак.";
const tf = (statement: string, isTrue: boolean, explanation?: string): SeedQuestion => ({
  prompt: `${MARRIAGE}||${statement}`,
  options: TF,
  correct: isTrue ? 0 : 1,
  explanation,
});
const OPINIONS =
  "Что вы думаете о гражданском браке?\n\nБахтиёр, 41 год, инженер: «Я считаю, что штамп в паспорте не делает семью крепче. Мы с Мариной вместе пятнадцать лет, у нас двое детей, и мы счастливы без всякой регистрации».\n\nАлина, 21 год, студентка: «По-моему, гражданский брак выбирают те, кто не готов брать на себя ответственность. Если человек тебя любит, он сделает предложение».\n\nДильшод, 30 лет, программист: «Мы с женой год жили вместе до свадьбы. За этот год мы поняли, что подходим друг другу. Я уверен, что это было правильное решение».\n\nСергей, 35 лет, юрист: «Как юрист скажу: регистрация брака нужна. Если у пары есть общая квартира, а брак не оформлен, при расставании начинаются серьёзные проблемы».\n\nНаргиза, 45 лет, учительница: «В нашей семье всегда было так: сначала свадьба, потом совместная жизнь. Я хочу, чтобы мои дети тоже так жили».";
const read = (question: string, options: string[], explanation?: string): SeedQuestion => ({
  prompt: `${OPINIONS}||${question}`,
  options,
  correct: 0,
  explanation,
});
const GOLDEN =
  "Меня зовут Зухра Каримовна. Мы с мужем Анваром прожили вместе пятьдесят лет — в прошлом году отметили золотую свадьбу. Познакомились мы в институте: он был весёлый и очень умный, и я сразу поняла, что он мне не безразличен. Поженились мы через два года, когда оба окончили учёбу. Сначала жили у его родителей, потому что своей квартиры не было. Было трудно: мы были молоды, денег было мало, а потом родились трое детей. Я работала учительницей, а муж — инженером, и он всегда мне помогал: если я поздно приходила с работы, ужин был уже готов. Конечно, мы иногда ссорились, но никогда не ложились спать сердитыми. У нас есть правило трёх «Т»: терпение, теплота и труд. Сейчас мы на пенсии, дети взрослые, у нас семь внуков. А муж до сих пор очень романтичен: на каждую годовщину он дарит мне тюльпаны — мои любимые цветы.";
const hear = (question: string, options: string[]): SeedQuestion => ({
  prompt: question,
  audio: GOLDEN,
  options,
  correct: 0,
});

export const B1_03_EXERCISES: SeedExercise[] = [
  {
    title: "Tinglang va toping",
    skill: "Tinglash",
    kind: "listen",
    instructions: "Gap ovoz chiqarib o'qiladi. Eshitgan gapingizni toping: qisqa sifatning jinsi va soniga e'tibor bering.",
    questions: [
      listen("Она замужем и очень счастлива.", ["Она замужем и очень счастлива.", "Она замужем и очень счастливая.", "Она не замужем, но счастлива.", "Он женат и очень счастлив."]),
      listen("Мы рады вас видеть.", ["Мы рады вас видеть.", "Мы рады тебя видеть.", "Я рад вас видеть.", "Мы были рады вас видеть."]),
      listen("Ты совершенно прав.", ["Ты совершенно прав.", "Ты совершенно не прав.", "Вы совершенно правы.", "Ты совсем прав."]),
      listen("Я готов идти на компромиссы.", ["Я готов идти на компромиссы.", "Я не готов идти на компромиссы.", "Мы готовы идти на компромиссы.", "Я готова идти на компромиссы."]),
      listen("Он всегда был верен жене.", ["Он всегда был верен жене.", "Он всегда был верен семье.", "Она всегда была верна мужу.", "Он никогда не был верен жене."]),
      listen("Кто виноват в разводе?", ["Кто виноват в разводе?", "Кто виноват в ссоре?", "Кто виновата в разводе?", "Что виновато в разводе?"]),
      listen("Родители довольны выбором сына.", ["Родители довольны выбором сына.", "Родители недовольны выбором сына.", "Родители довольны выбором дочери.", "Мать довольна выбором сына."]),
      listen("Каждый второй брак распадается.", ["Каждый второй брак распадается.", "Каждый третий брак распадается.", "Каждый второй брак распался.", "Каждая вторая семья распадается."]),
      listen("Мы благодарны вам за помощь.", ["Мы благодарны вам за помощь.", "Мы благодарим вас за помощь.", "Я благодарна вам за помощь.", "Мы благодарны тебе за помощь."]),
      listen("Не надо скрывать правду.", ["Не надо скрывать правду.", "Не надо скрывать проблемы.", "Не надо говорить правду.", "Не нужно скрывать правду."]),
    ],
  },
  {
    title: "Qanday holatda?",
    skill: "Holat",
    kind: "picture",
    instructions:
      "Rasmga qarab odamning hozirgi holatini tanlang. Hozirgi, vaqtinchalik holat qisqa sifat bilan aytiladi: Он болен (hozir kasal), Я занят (hozir bandman). Sifat egaga jins va sonda moslashadi: он рад — она рада — они рады.",
    questions: [
      pick("🤒", ["Он болен.", "Он больна.", "Он больно.", "Он больны."]),
      pick("😄", ["Она рада.", "Она рад.", "Она радый.", "Она рады."]),
      pick("😠", ["Отец сердит.", "Отец сердита.", "Отец сердиты.", "Отец сердито."]),
      pick("⏰💼", ["Я занят, позвоню позже.", "Я занято, позвоню позже.", "Я заняты, позвоню позже.", "Я занятость, позвоню позже."]),
      pick("🍽️😋", ["Ребёнок голоден.", "Ребёнок голодна.", "Ребёнок голодно.", "Ребёнок голодны."]),
      pick("🙏", ["Я вам очень благодарен.", "Я вас очень благодарен.", "Я вами очень благодарен.", "Я к вам очень благодарен."]),
      pick("💍👫", ["Они женаты.", "Они женат.", "Они жената.", "Они женато."]),
      pick("🏃‍♂️🏁", ["Мы готовы!", "Мы готов!", "Мы готова!", "Мы готово!"]),
      pick("🤷‍♀️", ["Она не уверена.", "Она не уверен.", "Она не уверено.", "Она не уверены."]),
      pick("👍😊", ["Директор доволен.", "Директор довольна.", "Директор довольно.", "Директор довольны."]),
    ],
  },
  {
    title: "Juftini toping",
    skill: "Juftlik",
    kind: "match",
    instructions: "Ruscha so'z yoki iborani o'zbekcha tarjimasi bilan ulang.",
    questions: [
      ["кризис|inqiroz", "измена|xiyonat", "верность|sadoqat", "равенство|tenglik"],
      ["ревность|rashk", "ссора|janjal", "одиночество|yolg'izlik", "бедность|qashshoqlik"],
      ["скрывать|yashirmoq", "осуждать|qoralamoq", "стремиться|intilmoq", "прощать|kechirmoq"],
      ["ревновать|rashk qilmoq", "распадаться|buzilmoq", "доказывать|isbotlamoq", "обеспечивать|ta'minlamoq"],
      ["рад|xursand", "готов|tayyor", "доволен|mamnun", "сердит|jahli chiqqan"],
      ["благодарен|minnatdor", "виноват|aybdor", "прав|haq", "верен|sodiq"],
      ["брачный договор|nikoh shartnomasi", "сохранить брак|nikohni saqlab qolmoq", "подать на развод|ajrashishga ariza bermoq", "уйти из семьи|oilani tashlab ketmoq"],
      ["жить поодиночке|yolg'iz yashamoq", "штамп в паспорте|pasportdagi muhr", "делить обязанности|vazifalarni bo'lishmoq", "встать на ноги|oyoqqa turib olmoq"],
      ["причина развода|ajrashish sababi", "совместная жизнь|birga yashash", "зрелый возраст|yetuk yosh", "работа по дому|uy ishlari"],
      ["равные права|teng huquqlar", "общие цели|umumiy maqsadlar", "уровень жизни|turmush darajasi", "семейный бюджет|oila byudjeti"],
    ].map((options) => ({ prompt: "Juftlarni ulang", options })),
  },
  {
    title: "Iborani yig'ing",
    skill: "Kollokatsiyalar",
    kind: "match",
    instructions:
      "Iboraning birinchi qismini ikkinchisi bilan ulang. Ichida oldingi darslardagi iboralar ham bor: ularni takrorlash so'zni uzoq xotiraga o'tkazadi.",
    questions: [
      ["идти|на компромиссы", "встать|на ноги", "реализовать|планы", "подать|на развод"],
      ["сохранить|брак", "делить|обязанности", "уйти|из семьи", "жить|поодиночке"],
      ["вступить|в брак", "сделать|предложение", "оформить|отношения", "создать|семью"],
      ["брачный|договор", "штамп|в паспорте", "семейный|бюджет", "работа|по дому"],
      ["равные|права", "общие|цели", "уровень|жизни", "причина|развода"],
      ["совместная|жизнь", "зрелый|возраст", "финансовая|стабильность", "психологическая|травма"],
      ["зависеть|от родителей", "скрывать|правду", "стремиться|к успеху", "участвовать|в решении"],
      ["уделять|внимание", "держать|слово", "найти|общий язык", "хранить|память"],
      ["пойти|по стопам", "связать|жизнь", "добиться|успеха", "рисковать|жизнью"],
      ["изменять|мужу", "ревновать|жену", "прощать|ошибки", "доказывать|любовь"],
    ].map((options) => ({ prompt: "Juftlarni ulang", options })),
  },
  {
    title: "Qisqa shaklni yozing",
    skill: "Qisqa sifat yasash",
    kind: "type",
    instructions:
      "Qisqa sifat to'liq sifatdan yasaladi: счастлив-ЫЙ → он счастлив, она счастлив-А, оно счастлив-О, они счастлив-Ы. Erkak jinsida ikki undosh orasiga ko'pincha qochar unli -е-/-ё- qo'shiladi: печальный → печален, умный → умён, сильный → силён. Qavsdagi olmoshga mos qisqa shaklni yozing.",
    questions: [
      ["счастливый (она)", "счастлива", "Ж.р.: -а."],
      ["довольный (они)", "довольны"],
      ["красивый (оно)", "красиво"],
      ["умный (он)", "умён|умен", "Qochar unli: умный → умён."],
      ["печальный (он)", "печален", "Qochar unli: печальный → печален."],
      ["сильный (он)", "силён|силен"],
      ["свободный (она)", "свободна"],
      ["молодой (вы)", "молоды"],
      ["честный (он)", "честен", "Qochar unli: честный → честен."],
      ["хороший (она)", "хороша", "Urg'u: хороша́."],
    ].map(([prompt, answer, explanation]) => ({ prompt, answer, explanation })),
  },
  {
    title: "Urg'u qayerda?",
    skill: "Urg'u",
    kind: "stress",
    instructions:
      "Ko'p qisqa sifatlarda ayol jinsida urg'u oxirgi bo'g'inga ko'chadi: за́нят — занята́, мо́лод — молода́, прав — права́. Lekin hammasida emas: краси́в — краси́ва, дово́лен — дово́льна. So'zni eshiting va urg'uli bo'g'inni bosing.",
    questions: [
      stress("за|ня|та", 2, "за́нят → занята́"),
      stress("мо|ло|да", 2, "мо́лод → молода́"),
      stress("ум|на", 1, "умён → умна́"),
      stress("хо|ро|ша", 2, "хоро́ш → хороша́"),
      stress("у|ве|ре|на", 1, "Urg'u ko'chmaydi: уве́рен → уве́рена."),
      stress("ра|да", 0, "Urg'u ko'chmaydi: рад → ра́да."),
      stress("за|нят", 0, "Erkak jinsida: за́нят."),
      stress("кра|си|ва", 1, "Urg'u ko'chmaydi: краси́в → краси́ва."),
      stress("до|воль|на", 1, "Urg'u ko'chmaydi: дово́лен → дово́льна."),
      stress("ин|те|рес|на", 2, "Urg'u ko'chmaydi: интере́сен → интере́сна."),
    ],
  },
  {
    title: "Уверена или уверенная?",
    skill: "To'liq yoki qisqa",
    kind: "choice",
    instructions:
      "Qisqa sifat faqat kesim bo'ladi va ko'pincha quyidagi hollarda ishlatiladi: 1) to'ldiruvchi bilan: уверен В СЕБЕ, независим ОТ мужа, верен ЖЕНЕ, виноват ПЕРЕД тобой; 2) vaqtinchalik holat: сегодня я болен, занят; 3) o'lcham haqida: брюки мне малы. To'liq sifat — aniqlovchi (уверенные люди) yoki doimiy belgi (занятой человек — doim band odam).",
    questions: [
      pick("Она очень … в себе.", ["уверена", "уверенная"], "To'ldiruvchi bor (в себе) — qisqa shakl."),
      pick("… люди добиваются больших успехов.", ["Уверенные", "Уверены"], "Otning oldida aniqlovchi — to'liq shakl."),
      pick("Сегодня я …, позвони завтра.", ["занят", "занятой"], "Vaqtinchalik holat — qisqa shakl."),
      pick("Мой отец — очень … человек: у него никогда нет свободного времени.", ["занятой", "занят"], "Doimiy belgi, otga aniqlovchi — to'liq shakl."),
      pick("Женщины стали … от мужей.", ["независимы", "независимые"], "To'ldiruvchi bor (от мужей) — qisqa shakl."),
      pick("Вчера брат был …, поэтому не ходил на работу.", ["болен", "больной"]),
      pick("Эти брюки мне … .", ["малы", "маленькие"], "O'lcham kimgadir mos kelmasa — qisqa shakl."),
      pick("Это я … перед тобой, прости!", ["виноват", "виноватый"]),
      pick("Он … своей жене всю жизнь.", ["верен", "верный"]),
      pick("Муж и жена … в правах.", ["равны", "равные"]),
    ],
  },
  {
    title: "Такой или так?",
    skill: "Такой / так",
    kind: "fill",
    instructions:
      "ТАКОЙ / КАКОЙ + to'liq sifat (такая хорошая погода!), ТАК / КАК + qisqa sifat (она так хороша!). Qavsdagi sifatni kerakli shaklda yozing.",
    questions: [
      fill("Сегодня такая ___ погода! (хороший)", "хорошая"),
      fill("Невеста была так ___! (хороший)", "хороша"),
      fill("У него такие ___ глаза! (грустный)", "грустные"),
      fill("Почему он так ___ сегодня? (грустный)", "грустен"),
      fill("Какая ___ пара! (счастливый)", "счастливая"),
      fill("Как они ___ вместе! (счастливый)", "счастливы"),
      fill("Русский язык такой ___! (трудный)", "трудный"),
      fill("Эта задача так ___! (трудный)", "трудна"),
      fill("Какой ___ город! (красивый)", "красивый"),
      fill("Как ___ Самарканд весной! (красивый)", "красив"),
    ],
  },
  {
    title: "Рад помочь, готов прийти",
    skill: "Qisqa sifat + infinitiv",
    kind: "fill",
    instructions:
      "РАД, ГОТОВ, ОБЯЗАН, СОГЛАСЕН, ДОЛЖЕН faqat qisqa shaklda kesim bo'ladi va ko'pincha infinitiv bilan keladi: Я рад помочь. Она готова прийти. Qavsdagi so'zni egaga moslab yozing.",
    questions: [
      fill("Друзья были ___ встретиться. (рад)", "рады"),
      fill("Она всегда ___ помочь подруге. (готов)", "готова"),
      fill("В суде вы ___ говорить правду. (обязан)", "обязаны"),
      fill("Она ___ выйти за него замуж. (согласен)", "согласна"),
      fill("Олег ___ закончить статью сегодня. (должен)", "должен"),
      fill("Мы ___ вам за помощь. (благодарен)", "благодарны"),
      fill("Дети ___ своими подарками. (доволен)", "довольны"),
      fill("Кто ___ в этой ссоре? (виноват)", "виноват"),
      fill("Мама всегда ___, её надо слушать. (прав)", "права"),
      fill("Наша компания ___ предложить вам скидку. (готов)", "готова"),
    ],
  },
  {
    title: "Maqollar",
    skill: "Maqollar",
    kind: "choice",
    instructions:
      "Rus maqol va iboralarida qisqa sifat juda ko'p uchraydi. Maqolni to'ldiring. Javobdan keyin uning ma'nosini o'qing: bu iboralarni ruslar kundalik nutqda ko'p ishlatadi.",
    questions: [
      pick("Насильно … не будешь.", ["мил", "милый", "мила", "милым"], "Majburlab o'zingni yaxshi ko'rdirolmaysan."),
      pick("У страха глаза … .", ["велики", "великие", "большие", "велик"], "Qo'rqqanga qo'sh ko'rinar."),
      pick("… ложка к обеду.", ["Дорога", "Дорогая", "Дорого", "Дорог"], "Har narsa o'z vaqtida qadrli."),
      pick("Мал золотник, да … .", ["дорог", "дорогой", "дорога", "дорого"], "Kichkina, lekin qimmatli."),
      pick("Чем богаты, тем и … .", ["рады", "радые", "рад", "радостные"], "Bor-yo'g'imiz shu, marhamat (mehmonga aytiladi)."),
      pick("Не так … чёрт, как его малюют.", ["страшен", "страшный", "страшно", "страшна"], "Ish aytilganchalik qo'rqinchli emas."),
      pick("Долг платежом … .", ["красен", "красный", "красна", "красно"], "Yaxshilikka yaxshilik qaytariladi."),
      pick("Мир …!", ["тесен", "тесный", "тесна", "тесно"], "Dunyo kichik ekan! (kutilmagan uchrashuvda aytiladi)."),
      pick("Будь …! (aksirgan erkakka)", ["здоров", "здоровый", "здорово", "здоровье"], "Sog' bo'ling! Ayolga: Будь здорова!"),
      pick("Всё …, что хорошо кончается.", ["хорошо", "хороший", "хороша", "хорош"], "Oxiri baxayr bo'lsa, hammasi yaxshi."),
    ],
  },
  {
    title: "Statistika",
    skill: "Sonlarni eshitish",
    kind: "number",
    instructions:
      "Gap ovoz chiqarib o'qiladi. Undagi sonni raqamlar bilan yozing (masalan: 28). Diqqat: sonlar kelishikda o'zgaradi — «в ста тридцати городах», «в две тысячи девятнадцатом году».",
    questions: [
      num("Средний возраст невесты — двадцать восемь лет.", "28"),
      num("Каждый второй брак распадается: это пятьдесят процентов.", "50"),
      num("Они прожили вместе пятьдесят пять лет.", "55"),
      num("Опрос провели в ста тридцати городах.", "130", "«ста тридцати» — «сто тридцать» ning П.п. shakli."),
      num("Свадьбу сыграли в две тысячи девятнадцатом году.", "2019"),
      num("Двадцать четыре процента опрошенных назвали причиной развода измену.", "24"),
      num("В девяностые годы люди женились в двадцать два года.", "22"),
      num("На свадьбу пригласили триста гостей.", "300"),
      num("Бабушка вышла замуж в тысяча девятьсот шестьдесят пятом году.", "1965"),
      num("Сорок два процента браков в этом городе заканчиваются разводом.", "42"),
    ],
  },
  {
    title: "Ayting",
    skill: "Talaffuz",
    kind: "speak",
    instructions: "Gapni eshiting, keyin mikrofon tugmasini bosib o'zingiz ayting. Qisqa sifatdagi urg'uga e'tibor bering.",
    questions: [
      "Я согласен с тобой.",
      "Ты совершенно прав.",
      "Мы очень рады за вас!",
      "Она замужем и счастлива.",
      "Я готов идти на компромиссы.",
      "Спасибо, я вам очень благодарен.",
      "Кто виноват в этой ссоре?",
      "Брак — это не только любовь, но и уважение.",
      "Они женаты уже десять лет.",
      "Мир тесен!",
    ].map((phrase) => ({ prompt: phrase, answer: phrase })),
  },
  {
    title: "Suhbatni davom ettiring",
    skill: "Dialog",
    kind: "dialog",
    instructions: "Suhbatdoshingiz savol berdi. Mos javobni tanlang.",
    questions: [
      pick("Ты согласен со мной?", ["Не совсем: мне кажется, ты не прав.", "Не совсем: я не согласный.", "Я согласна тобой прав.", "Согласие."]),
      pick("Как дела у Нигоры после свадьбы?", ["Она очень счастлива!", "Она очень счастлив!", "Она очень счастливы!", "Она очень счастью!"]),
      pick("Можешь помочь мне завтра?", ["Извини, завтра я занят.", "Извини, завтра я занятой.", "Извини, завтра я заняты.", "Извини, занято я."]),
      pick("Почему они развелись?", ["Говорят, он изменял жене.", "Говорят, он изменял жену.", "Развод был.", "Они развестись."]),
      pick("Ты готов к экзамену?", ["Да, готов: я много занимался.", "Да, готовый.", "Да, готова я много занимался.", "Готовность."]),
      pick("Как вы относитесь к гражданскому браку?", ["Спокойно: это личное дело каждой пары.", "Спокойный.", "Я отношусь гражданский брак.", "Относимся."]),
      pick("Что важно для крепкого брака?", ["Умение идти на компромиссы и доверие.", "Идти компромиссы.", "Крепкий важно.", "Брак крепко."]),
      pick("Кто виноват в вашей ссоре?", ["Мы оба виноваты.", "Мы оба виновата.", "Мы оба вина.", "Виноватые мы оба быть."]),
      pick("Вы довольны новой квартирой?", ["Да, очень довольны: она светлая и большая.", "Да, очень довольные квартиру.", "Да, довольно.", "Квартира довольна."]),
      pick("Спасибо, что помог!", ["Не за что, я всегда рад помочь.", "Не за что, я всегда радый помочь.", "Не за что, рад помощь.", "Спасибо тоже."]),
    ],
  },
  {
    title: "XXI asrda nikoh",
    skill: "O'qish",
    kind: "truefalse",
    instructions: "Zamonaviy nikoh haqidagi matnni o'qing va gap to'g'ri yoki noto'g'ri ekanini belgilang.",
    questions: [
      tf("Сегодня люди вступают в брак раньше, чем их родители.", false, "Позже, чем их родители."),
      tf("Многие хотят сначала встать на ноги, а потом создавать семью.", true),
      tf("В России распадается почти каждый второй брак.", true),
      tf("Измена — одна из главных причин развода.", true),
      tf("Раньше жена обеспечивала семью.", false, "Раньше семью обеспечивал муж."),
      tf("Сегодня супруги часто равны.", true),
      tf("Сегодня жена не участвует в решении финансовых вопросов.", false, "Участвует: она тоже работает."),
      tf("Пары в гражданском браке считают штамп в паспорте очень важным.", false, "Они уверены, что штамп не делает отношения крепче."),
      tf("Развод особенно тяжёл для детей.", true),
      tf("Психологи советуют сразу подать на развод.", false, "Они советуют сначала попробовать сохранить брак."),
    ],
  },
  {
    title: "Fuqarolik nikohi haqida fikrlar",
    skill: "Matn bilan ishlash",
    kind: "reading",
    instructions: "Besh kishining fikrini o'qing va savollarga javob bering.",
    questions: [
      read("Сколько лет Бахтиёр живёт с Мариной?", ["Пятнадцать лет.", "Сорок один год.", "Два года.", "Один год."]),
      read("Что думает Бахтиёр о штампе в паспорте?", ["Он не делает семью крепче.", "Он очень важен.", "Без него нельзя иметь детей.", "Он нужен для квартиры."]),
      read("Кто, по мнению Алины, выбирает гражданский брак?", ["Те, кто не готов брать на себя ответственность.", "Самые счастливые пары.", "Люди в зрелом возрасте.", "Юристы."]),
      read("Что, по словам Алины, сделает мужчина, если любит?", ["Сделает предложение.", "Купит квартиру.", "Подаст на развод.", "Уедет за границу."]),
      read("Сколько Дильшод с женой жили вместе до свадьбы?", ["Год.", "Пятнадцать лет.", "Месяц.", "Тридцать лет."]),
      read("В чём уверен Дильшод?", ["Что это было правильное решение.", "Что гражданский брак — ошибка.", "Что лучше жить поодиночке.", "Что штамп важнее любви."]),
      read("Почему Сергей считает, что регистрация нужна?", ["Без неё при расставании бывают проблемы с общей квартирой.", "Так хотят родители.", "Это красиво.", "Без неё нельзя путешествовать."]),
      read("Кем работает Сергей?", ["Юристом.", "Инженером.", "Программистом.", "Учителем."]),
      read("Какая традиция в семье Наргизы?", ["Сначала свадьба, потом совместная жизнь.", "Сначала совместная жизнь, потом свадьба.", "Жить поодиночке.", "Не регистрировать брак."]),
      read("Кто из участников сам жил в гражданском браке?", ["Бахтиёр и Дильшод.", "Алина и Наргиза.", "Только Сергей.", "Никто."]),
    ],
  },
  {
    title: "Oltin to'y",
    skill: "Tinglab tushunish",
    kind: "audiotext",
    instructions:
      "Ellik yil birga yashagan Zuhra Karimovnaning hikoyasini tinglang (kerak bo'lsa, qayta yoki sekinroq) va savollarga javob bering. Matn ekranda ko'rsatilmaydi.",
    questions: [
      hear("Сколько лет супруги прожили вместе?", ["Пятьдесят лет.", "Пятнадцать лет.", "Двадцать лет.", "Семь лет."]),
      hear("Где они познакомились?", ["В институте.", "На работе.", "На свадьбе.", "У родителей."]),
      hear("Когда они поженились?", ["Через два года, когда окончили учёбу.", "Сразу после знакомства.", "Через десять лет.", "Ещё в школе."]),
      hear("Где они жили сначала?", ["У родителей мужа.", "В своей квартире.", "В общежитии.", "У родителей жены."]),
      hear("Почему было трудно?", ["Они были молоды, и денег было мало.", "Они часто болели.", "Родители были против.", "Муж не работал."]),
      hear("Кем работала Зухра Каримовна?", ["Учительницей.", "Инженером.", "Врачом.", "Бухгалтером."]),
      hear("Как муж помогал жене?", ["Готовил ужин, если она поздно приходила.", "Отводил детей в школу.", "Ничем не помогал.", "Ходил за покупками по выходным."]),
      hear("Какое у них правило?", ["Никогда не ложиться спать сердитыми.", "Никогда не ссориться.", "Не говорить о деньгах.", "Отдыхать отдельно."]),
      hear("Что значат три «Т»?", ["Терпение, теплота и труд.", "Тюльпаны, торт и танцы.", "Традиции, туризм и театр.", "Тишина, телевизор и такси."]),
      hear("Что муж дарит на каждую годовщину?", ["Тюльпаны.", "Розы.", "Книги.", "Духи."]),
    ],
  },
];
