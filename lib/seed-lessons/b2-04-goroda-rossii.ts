/**
 * B2, 4-dars — «Приехали! Города России» (Liden & Denz, «Я ❤ Русский
 * Язык», B1.2, 1-urok 2-modul davomi): sayohat haqidagi teleko'rsatuvlar,
 * Rossiya shaharlari (Sochi, Murmansk, Yekaterinburg, Vladivostok),
 * taassurot sifatlari (увлекательный, потрясающий, незабываемый…);
 * grammatika — prefiksli harakat fe'llari, 1-qism: ПРИ- / У- (kelish —
 * ketish: в/на + В.п., к + Д.п. / из, с, от + Р.п.) va В(О)- / ВЫ-
 * (kirish — chiqish); принести / привезти / привести, унести / увезти /
 * увести; NSV va SV (приезжает — приехал); jarayon va natija (уходил —
 * ушёл, приходил = был). ПОД-/ОТ-, С-/РАЗ-, ДО-, ПЕРЕ-, ПРО-, ЗА- —
 * keyingi darslarda (katta mavzu bo'lingan).
 *
 * Zinapoya: prefiks ma'nosi → predlog (куда? откуда?) → NSV/SV →
 * jarayon/natija → нести/везти/вести + при-/у- → в-/вы- → antonim →
 * gap tuzish. Kollokatsiyalar (4–5-bosqich) A. Absalomov lug'atidan —
 * prefiksli fe'llarning ko'chma ma'nolari. Lug'at 5 bosqich (50 so'z).
 * Matnlar o'zimizniki. 19 ta mashq.
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

export const B2_04_ROUNDS: { title: string; words: VocabSeed[] }[] = [
  {
    title: "1-bosqich · Taassurotlar",
    words: [
      w("🎢", "Увлекательный", "uvlikátil'nyy", "sifat", "Maroqli", "Очень интересный, от которого трудно оторваться.", "Вчера мы посмотрели увлекательный фильм о путешествиях.", "Kecha sayohatlar haqida maroqli film ko'rdik."),
      w("😮", "Впечатляющий", "fpichatlyáyushchiy", "sifat", "Ta'sirli", "Такой, который производит сильное впечатление.", "С горы открывается впечатляющий вид на город.", "Tog'dan shaharning ta'sirli manzarasi ochiladi."),
      w("💎", "Роскошный", "raskóshnyy", "sifat", "Hashamatli", "Очень богатый и дорогой.", "В Дубае мы видели роскошный отель с золотыми дверями.", "Dubayda oltin eshikli hashamatli mehmonxonani ko'rdik."),
      w("👑", "Великолепный", "vilikalyépnyy", "sifat", "Muhtasham", "Очень красивый, прекрасный.", "Из окна был великолепный вид на море.", "Derazadan dengizning muhtasham manzarasi ko'rinardi."),
      w("🎲", "Непредсказуемый", "nipridskazúyemyy", "sifat", "Oldindan bilib bo'lmaydigan", "Такой, что нельзя знать заранее, что будет.", "В горах непредсказуемый климат: утром солнце, днём снег.", "Tog'da iqlimni oldindan bilib bo'lmaydi: ertalab quyosh, kunduzi qor."),
      w("🤯", "Невероятный", "niviráyatnyy", "sifat", "Aql bovar qilmaydigan", "Такой, во что трудно поверить.", "У этой поездки был невероятный финал.", "Bu safarning aql bovar qilmaydigan yakuni bo'ldi."),
      w("🌠", "Неповторимый", "nipavtarímyy", "sifat", "Takrorlanmas", "Единственный, такого больше нет.", "У каждого города свой неповторимый характер.", "Har bir shaharning o'z takrorlanmas qiyofasi bor."),
      w("🤩", "Потрясающий", "patrisáyushchiy", "sifat", "Hayratlanarli", "Очень сильный, удивительный.", "Северное сияние — потрясающий спектакль природы.", "Qutb shafag'i — tabiatning hayratlanarli tomoshasi."),
      w("✨", "Чудесный", "chudyésnyy", "sifat", "Ajoyib, mo'jizaviy", "Очень хороший, как в сказке.", "Мы провели чудесный день на берегу озера.", "Ko'l bo'yida ajoyib kun o'tkazdik."),
      w("📸", "Незабываемый", "nizabyváyemyy", "sifat", "Unutilmas", "Такой, который нельзя забыть.", "Поездка на Байкал — мой самый незабываемый отпуск.", "Baykalga safar — eng unutilmas ta'tilim."),
    ],
  },
  {
    title: "2-bosqich · Shahar va qirg'oq",
    words: [
      w("🎁", "Неожиданный", "niazhídannyy", "sifat", "Kutilmagan", "Такой, которого не ждали.", "Друзья приготовили мне неожиданный подарок.", "Do'stlar menga kutilmagan sovg'a tayyorlashdi."),
      w("🦄", "Необычный", "niabýchnyy", "sifat", "G'ayrioddiy", "Не такой, как все.", "В Екатеринбурге есть необычный памятник клавиатуре.", "Yekaterinburgda klaviaturaga g'ayrioddiy haykal bor."),
      w("⚠️", "Небезопасный", "nibizapásnyy", "sifat", "Xatarli", "Такой, где может быть опасно.", "Автостоп — небезопасный способ путешествовать.", "Avtostop — sayohat qilishning xatarli usuli."),
      w("🏅", "Ценный", "tsénnyy", "sifat", "Qimmatli", "Очень нужный, полезный или дорогой.", "Гид дал нам ценный совет: брать билеты заранее.", "Gid bizga qimmatli maslahat berdi: chiptani oldindan olish."),
      w("🛋️", "Комфортный", "kamfórtnyy", "sifat", "Shinam, qulay", "Удобный, приятный.", "Новый поезд «Сапсан» — быстрый и комфортный.", "Yangi «Sapsan» poyezdi — tez va shinam."),
      w("🏖️", "Побережье", "pabiryézhye", "ot", "Qirg'oq bo'yi", "Земля вдоль моря.", "Всё побережье Чёрного моря летом полно туристов.", "Qora dengizning butun qirg'oq bo'yi yozda sayyohlarga to'la."),
      w("⚓", "Порт", "port", "ot", "Port", "Место, где стоят корабли.", "Порт Мурманска не замерзает даже зимой.", "Murmansk porti hatto qishda ham muzlamaydi."),
      w("🗼", "Маяк", "mayák", "ot", "Mayoq", "Башня с огнём, которая помогает кораблям ночью.", "Старый маяк стоит на краю скалы.", "Eski mayoq qoya chetida turibdi."),
      w("🌊", "Залив", "zalíf", "ot", "Qo'ltiq (dengiz)", "Часть моря, которая входит в сушу.", "Финский залив хорошо виден из Петербурга.", "Fin qo'ltig'i Peterburgdan yaxshi ko'rinadi."),
      w("🏝️", "Полуостров", "paluóstraf", "ot", "Yarim orol", "Земля, которую с трёх сторон окружает вода.", "Камчатка — большой полуостров на Дальнем Востоке.", "Kamchatka — Uzoq Sharqdagi katta yarim orol."),
    ],
  },
  {
    title: "3-bosqich · Prefiksli fe'llar",
    words: [
      w("🚚", "Привозить", "privazít'", "fe'l", "Olib kelmoq (ulovda)", "Что? Кого? Откуда? Доставлять на транспорте. СВ: привезти.", "Бабушка любит привозить нам яблоки из деревни.", "Buvim bizga qishloqdan olma olib kelishni yaxshi ko'radi."),
      w("👨‍👦", "Приводить", "privadít'", "fe'l", "Yetaklab kelmoq", "Кого? Куда? Приходить с кем-то. СВ: привести.", "Можно приводить детей на выставку бесплатно.", "Ko'rgazmaga bolalarni bepul yetaklab kelish mumkin."),
      w("🎒", "Уносить", "unasít'", "fe'l", "Ko'tarib ketmoq", "Что? Брать с собой и уходить. СВ: унести.", "Из музея нельзя уносить экспонаты.", "Muzeydan eksponatlarni olib ketish mumkin emas."),
      w("🚛", "Увозить", "uvazít'", "fe'l", "Olib ketmoq (ulovda)", "Что? Кого? Куда? Везти отсюда. СВ: увезти.", "Туристы любят увозить домой магнитики.", "Sayyohlar uyga magnitchalar olib ketishni yaxshi ko'radi."),
      w("🚸", "Уводить", "uvadít'", "fe'l", "Yetaklab ketmoq", "Кого? Откуда? Вести отсюда. СВ: увести.", "Воспитатель должен уводить детей с площадки в шесть часов.", "Tarbiyachi bolalarni maydonchadan soat oltida olib ketishi kerak."),
      w("📦", "Вносить", "vnasít'", "fe'l", "Olib kirmoq", "Что? Куда? Нести внутрь. СВ: внести.", "Грузчики начали вносить мебель в квартиру.", "Yukchilar mebelni kvartiraga olib kira boshlashdi."),
      w("🗑️", "Вывозить", "vyvazít'", "fe'l", "Olib chiqib ketmoq (ulovda)", "Что? Откуда? Везти наружу, из места. СВ: вывезти.", "Из заповедника запрещено вывозить растения.", "Qo'riqxonadan o'simliklarni olib chiqib ketish taqiqlangan."),
      w("🏃‍♀️", "Вбегать", "vbigát'", "fe'l", "Yugurib kirmoq", "Куда? Быстро входить. СВ: вбежать.", "Дети любят вбегать в класс со звонком.", "Bolalar sinfga qo'ng'iroq bilan yugurib kirishni yaxshi ko'radi."),
      w("🏃", "Выбегать", "vybigát'", "fe'l", "Yugurib chiqmoq", "Откуда? Быстро выходить. СВ: выбежать.", "Не надо выбегать на дорогу за мячом!", "To'p ortidan yo'lga yugurib chiqish kerak emas!"),
      w("🛬", "Прилетать", "prilitát'", "fe'l", "Uchib kelmoq", "Куда? Откуда? Приезжать на самолёте. СВ: прилететь.", "Весной в эти места начинают прилетать птицы.", "Bahorda bu yerlarga qushlar uchib kela boshlaydi."),
    ],
  },
  {
    title: "4-bosqich · Kollokatsiyalar",
    words: [
      w("🔄", "Войти в привычку", "vaytí f privýchku", "ibora", "Odat bo'lib qolmoq", "Стать обычным делом.", "Утренний бег может быстро войти в привычку.", "Ertalabki yugurish tezda odat bo'lib qolishi mumkin."),
      w("👗", "Войти в моду", "vaytí v módu", "ibora", "Modaga kirmoq", "Стать модным.", "Путешествия автостопом снова могут войти в моду.", "Avtostop bilan sayohat yana modaga kirishi mumkin."),
      w("😋", "Входить во вкус", "fkhadít' va fkus", "ibora", "Ta'mini bilib qolmoq", "Начинать любить какое-то дело.", "Сначала поход был трудным, но потом мы стали входить во вкус.", "Avvaliga yurish qiyin edi, keyin uning ta'mini bilib qola boshladik."),
      w("🙋", "Внести предложение", "vnistí pridlazhéniye", "ibora", "Taklif kiritmoq", "Предложить идею на собрании.", "Студент решил внести предложение: поехать в Казань.", "Talaba taklif kiritishga qaror qildi: Qozonga borish."),
      w("📝", "Внести в список", "vnistí f spísak", "ibora", "Ro'yxatga kiritmoq", "Записать в список.", "Город решили внести в список Всемирного наследия.", "Shaharni Jahon merosi ro'yxatiga kiritishga qaror qilishdi."),
      w("😤", "Выйти из себя", "výyti is sibyá", "ibora", "Jahli chiqmoq", "Очень рассердиться.", "Из-за задержки рейса пассажир мог выйти из себя.", "Reys kechikkani uchun yo'lovchining jahli chiqishi mumkin edi."),
      w("😠", "Вывести из себя", "vývisti is sibyá", "ibora", "Jahlini chiqarmoq", "Кого? Сильно рассердить.", "Шум соседей может вывести из себя любого.", "Qo'shnilarning shovqini har kimning jahlini chiqarishi mumkin."),
      w("⚖️", "Вынести решение", "výnisti rishéniye", "ibora", "Qaror chiqarmoq", "Официально решить.", "Суд должен вынести решение до конца месяца.", "Sud oy oxirigacha qaror chiqarishi kerak."),
      w("🏊", "Уйти с головой", "uytí z galavóy", "ibora", "Butunlay berilib ketmoq", "Во что? Полностью заняться чем-то.", "Он может уйти с головой в работу и забыть про обед.", "U ishga butunlay berilib ketib, tushlikni unutishi mumkin."),
      w("🌫️", "Ввести в заблуждение", "vvistí v zabluzhdyéniye", "ibora", "Chalg'itmoq", "Кого? Заставить поверить в неправду.", "Старая карта может ввести в заблуждение туриста.", "Eski xarita sayyohni chalg'itishi mumkin."),
    ],
  },
  {
    title: "5-bosqich · Kollokatsiyalar",
    words: [
      w("☝️", "Привести пример", "privistí primyér", "ibora", "Misol keltirmoq", "Рассказать случай, чтобы объяснить мысль.", "Учитель попросил привести пример из жизни.", "O'qituvchi hayotdan misol keltirishni so'radi."),
      w("✅", "Прийти к решению", "priytí k rishéniyu", "ibora", "Qarorga kelmoq", "Решить после долгих мыслей.", "После долгого спора мы смогли прийти к решению.", "Uzoq bahsdan keyin qarorga kela oldik."),
      w("🥳", "Прийти в восторг", "priytí v vastórk", "ibora", "Zavqlanmoq", "От чего? Очень обрадоваться.", "Дети могут прийти в восторг от зоопарка.", "Bolalar hayvonot bog'idan zavqlanib ketishi mumkin."),
      w("👍", "Принести пользу", "prinistí pól'zu", "ibora", "Foyda keltirmoq", "Кому? Чему? Быть полезным.", "Эта поездка должна принести пользу всей семье.", "Bu safar butun oilaga foyda keltirishi kerak."),
      w("⏰", "Приехать к сроку", "priyékhat' k sróku", "ibora", "O'z vaqtida yetib kelmoq", "Приехать вовремя, как договорились.", "Важно приехать к сроку, иначе билеты пропадут.", "O'z vaqtida yetib kelish muhim, aks holda chiptalar kuyadi."),
      w("🤫", "Уйти незаметно", "uytí nizamyétna", "ibora", "Sezdirmay ketib qolmoq", "Уйти так, что никто не видел.", "С праздника он решил уйти незаметно.", "U bayramdan sezdirmay ketib qolishga qaror qildi."),
      w("📤", "Уйти с работы", "uytí s rabóty", "ibora", "Ishdan ketmoq", "Перестать работать в каком-то месте.", "Чтобы путешествовать, Нодира решила уйти с работы.", "Sayohat qilish uchun Nodira ishdan ketishga qaror qildi."),
      w("🔧", "Выйти из строя", "výyti is stróya", "ibora", "Buzilib qolmoq", "Сломаться, перестать работать.", "Посреди дороги наш автобус мог выйти из строя.", "Yo'lning o'rtasida avtobusimiz buzilib qolishi mumkin edi."),
      w("✏️", "Внести поправку", "vnistí papráfku", "ibora", "Tuzatish kiritmoq", "Во что? Исправить что-то в тексте или плане.", "Мне нужно внести поправку в маршрут.", "Yo'nalishga tuzatish kiritishim kerak."),
      w("📊", "Приводить факты", "privadít' fákty", "ibora", "Dalil keltirmoq", "Говорить точные сведения, чтобы доказать.", "В споре лучше приводить факты, а не эмоции.", "Bahsda his-tuyg'u emas, dalil keltirgan ma'qul."),
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
const num = (audio: string, answer: string): SeedQuestion => ({
  prompt: "Vaqtni raqamlar bilan yozing (masalan: 1925)",
  audio,
  answer,
});
/** Urg'u: bo'g'inlar "|" bilan, `correct` — urg'uli bo'g'in raqami (0 dan). */
const stress = (syllables: string, correct: number, explanation?: string): SeedQuestion => ({
  prompt: "Urg'uli bo'g'inni toping",
  audio: syllables.replace(/\|/g, ""),
  options: syllables.split("|"),
  correct,
  explanation,
});
/** Prefiks ma'nosi — bir xil tartib. */
const PREFIXES = ["ПРИ- — kelish", "У- — ketish", "В- — kirish", "ВЫ- — chiqish"];
const prefix = (prompt: string, kind: number): SeedQuestion => ({
  prompt,
  options: PREFIXES,
  correct: kind,
});

const TF = ["To'g'ri", "Noto'g'ri"];
const CITIES =
  "Четыре города — четыре впечатления\n\nСочи. Сюда каждый год приезжают отдыхать миллионы туристов. Сочи — главный курорт России на побережье Чёрного моря. Здесь растут пальмы, а летом гостей ждут тёплое море, пляжи и увлекательные экскурсии в горы. После Олимпиады две тысячи четырнадцатого года в город стали приезжать ещё больше людей.\n\nМурманск. Это крупнейший город за Полярным кругом. Зимой здесь больше месяца не бывает солнца, зато можно увидеть потрясающее северное сияние. В порт Мурманска приходят корабли из многих стран, потому что море здесь не замерзает даже зимой.\n\nЕкатеринбург. Город находится на Урале, на границе Европы и Азии. Многие туристы приезжают сюда, чтобы сфотографироваться у обелиска «Европа — Азия». В городе есть необычный памятник — огромная клавиатура компьютера из бетона.\n\nВладивосток. Этот город стоит на берегу Тихого океана, в девяти тысячах километров от Москвы. Поезд из столицы приходит сюда почти через неделю. Над бухтой Золотой Рог проходит красивый Золотой мост. Отсюда легко улететь в Японию, Корею или Китай: самолёт долетает туда за два-три часа.";
const tf = (statement: string, isTrue: boolean, explanation?: string): SeedQuestion => ({
  prompt: `${CITIES}||${statement}`,
  options: TF,
  correct: isTrue ? 0 : 1,
  explanation,
});
const SHOW =
  "Добрый вечер, дорогие зрители! С вами программа «Чемодан и паспорт» и я, её ведущий Тимур. Сегодня я прилетел в Самарканд. Мой самолёт приземлился рано утром, и уже через час я вышел из гостиницы, чтобы увидеть город. Первым делом я пришёл на Регистан. Честно скажу, такого великолепного вида я не ожидал! Потом гид привёл меня на Сиабский базар. Там я попробовал самый вкусный хлеб в своей жизни и купил сухофрукты — привезу их домой маме. Вечером к нам в гости пришли соседи гида: хозяйка принесла плов, а её сын привёз из деревни свежие дыни. После ужина мы вошли в мавзолей Гур-Эмир — внутри всё сверкает золотом. Мне так не хочется уезжать! Но завтра утром я улетаю в Бухару. До встречи в следующей программе!";
const hear = (question: string, options: string[]): SeedQuestion => ({
  prompt: question,
  audio: SHOW,
  options,
  correct: 0,
});

export const B2_04_EXERCISES: SeedExercise[] = [
  {
    title: "Tinglang va toping",
    skill: "Tinglash",
    kind: "listen",
    instructions: "Gap ovoz chiqarib o'qiladi. Eshitgan gapingizni toping: fe'lning prefiksiga e'tibor bering.",
    questions: [
      listen("Поезд приходит в семь утра.", ["Поезд приходит в семь утра.", "Поезд уходит в семь утра.", "Поезд приходил в семь утра.", "Поезд приходит в семь вечера."]),
      listen("Он вышел из дома в восемь.", ["Он вышел из дома в восемь.", "Он вошёл в дом в восемь.", "Он ушёл из дома в восемь.", "Он выходил из дома в восемь."]),
      listen("Брат привёз мне подарок из Казани.", ["Брат привёз мне подарок из Казани.", "Брат принёс мне подарок из Казани.", "Брат увёз мой подарок в Казань.", "Брат привезёт мне подарок из Казани."]),
      listen("Мама привела сына в детский сад.", ["Мама привела сына в детский сад.", "Мама увела сына из детского сада.", "Мама привезла сына в детский сад.", "Мама приводит сына в детский сад."]),
      listen("Самолёт улетает через час.", ["Самолёт улетает через час.", "Самолёт прилетает через час.", "Самолёт улетел час назад.", "Самолёт вылетает через час."]),
      listen("Можно войти?", ["Можно войти?", "Можно выйти?", "Можно уйти?", "Можно прийти?"]),
      listen("Гости уже ушли.", ["Гости уже ушли.", "Гости уже пришли.", "Гости уже уходили.", "Гости уже уехали."]),
      listen("Кто унёс мою ручку?", ["Кто унёс мою ручку?", "Кто принёс мою ручку?", "Кто унесёт мою ручку?", "Кто внёс мою ручку?"]),
      listen("Дети выбежали во двор.", ["Дети выбежали во двор.", "Дети вбежали во двор.", "Дети убежали во двор.", "Дети выбегали во двор."]),
      listen("Я приеду к вам в субботу.", ["Я приеду к вам в субботу.", "Я уеду от вас в субботу.", "Я приезжал к вам в субботу.", "Я приду к вам в субботу."]),
    ],
  },
  {
    title: "Diktant",
    skill: "Eshitib yozish",
    kind: "dictation",
    instructions:
      "Gap ovoz chiqarib o'qiladi. Uni eshitib, ruscha yozing (kerak bo'lsa, qayta yoki sekinroq tinglang). Tinish belgilari hisobga olinmaydi.",
    questions: [
      "Поезд приходит в семь утра.",
      "Мой друг приехал из Москвы.",
      "Можно войти?",
      "Он вышел из дома рано утром.",
      "Брат привёз мне подарок.",
      "Гости уже ушли домой.",
      "Самолёт прилетает в Ташкент вечером.",
      "Пожалуйста, выйдите из машины.",
      "Это был незабываемый отпуск.",
      "Чтение вошло у него в привычку.",
    ].map((sentence) => ({ prompt: "Eshitganingizni yozing", audio: sentence, answer: sentence })),
  },
  {
    title: "Juftini toping",
    skill: "Juftlik",
    kind: "match",
    instructions: "Ruscha so'z yoki iborani o'zbekcha tarjimasi bilan ulang.",
    questions: [
      ["увлекательный|maroqli", "впечатляющий|ta'sirli", "роскошный|hashamatli", "великолепный|muhtasham"],
      ["непредсказуемый|oldindan bilib bo'lmaydigan", "невероятный|aql bovar qilmaydigan", "неповторимый|takrorlanmas", "потрясающий|hayratlanarli"],
      ["чудесный|ajoyib", "незабываемый|unutilmas", "неожиданный|kutilmagan", "необычный|g'ayrioddiy"],
      ["небезопасный|xatarli", "ценный|qimmatli", "комфортный|shinam", "побережье|qirg'oq bo'yi"],
      ["порт|port", "маяк|mayoq", "залив|qo'ltiq", "полуостров|yarim orol"],
      ["привозить|olib kelmoq (ulovda)", "приводить|yetaklab kelmoq", "уносить|ko'tarib ketmoq", "увозить|olib ketmoq (ulovda)"],
      ["уводить|yetaklab ketmoq", "вносить|olib kirmoq", "вывозить|olib chiqib ketmoq", "прилетать|uchib kelmoq"],
      ["вбегать|yugurib kirmoq", "выбегать|yugurib chiqmoq", "войти в привычку|odat bo'lib qolmoq", "войти в моду|modaga kirmoq"],
      ["входить во вкус|ta'mini bilib qolmoq", "внести предложение|taklif kiritmoq", "выйти из себя|jahli chiqmoq", "вынести решение|qaror chiqarmoq"],
      ["привести пример|misol keltirmoq", "прийти к решению|qarorga kelmoq", "принести пользу|foyda keltirmoq", "уйти с работы|ishdan ketmoq"],
    ].map((options) => ({ prompt: "Juftlarni ulang", options })),
  },
  {
    title: "Prefiks nimani bildiradi?",
    skill: "Prefikslar · 1-bosqich",
    kind: "choice",
    instructions:
      "ПРИ- — kelish (приехал = u shu yerda), У- — ketish (уехал = u bu yerda yo'q), В(О)- — ichkariga kirish, ВЫ- — tashqariga chiqish (вы- doim urg'uli: вы́шел). Prefiksli fe'llar juft bo'ladi: приходить (NSV) — прийти (SV). Gapdagi fe'l prefiksi nimani bildiradi?",
    questions: [
      prefix("Преподаватель вошёл в класс.", 2),
      prefix("Мой друг приехал из Самарканда.", 0),
      prefix("Поезд ушёл пять минут назад.", 1),
      prefix("Она вышла из номера и пошла к лифту.", 3),
      prefix("Курьер принёс посылку.", 0),
      prefix("Папа увёз старую мебель на дачу.", 1),
      prefix("Грузчики внесли диван в квартиру.", 2),
      prefix("Дети выбежали на улицу.", 3),
      prefix("Самолёт прилетел без задержки.", 0),
      prefix("Кто-то унёс мой зонт.", 1),
    ],
  },
  {
    title: "Куда? Откуда?",
    skill: "Prefikslar · 2-bosqich",
    kind: "choice",
    instructions:
      "ПРИ-, В- + куда?: в / на + В.п., к + Д.п. (к врачу, к бабушке). У-, ВЫ- + откуда?: из / с + Р.п., от + Р.п. (от подруги). Mos predlogni tanlang.",
    questions: [
      pick("Он пришёл … врачу.", ["к", "в", "от", "у"]),
      pick("Вчера я ушёл … работы в шесть.", ["с", "на", "к", "в"]),
      pick("Студенты вышли … аудитории.", ["из", "в", "к", "на"]),
      pick("Мы приехали … Ташкент ночью.", ["в", "из", "к", "на"]),
      pick("Она ушла … подруги поздно вечером.", ["от", "из", "с", "к"]),
      pick("Друг приехал … Казани.", ["из", "от", "с", "к"]),
      pick("Гости пришли … праздник.", ["на", "в", "к", "с"]),
      pick("Брат приехал … бабушке на каникулы.", ["к", "в", "на", "у"]),
      pick("Самолёт вылетел … Москвы с опозданием.", ["из", "от", "с", "на"]),
      pick("Она вошла … комнату и села на диван.", ["в", "на", "к", "из"]),
    ],
  },
  {
    title: "NSV yoki SV?",
    skill: "Prefikslar · 3-bosqich",
    kind: "fill",
    instructions:
      "NSV (приезжать, приходить) — takrorlanish, odat: Каждое лето к нам приезжает бабушка. SV (приехать, прийти) — bir martalik natija: Вчера приехала бабушка. Qavsdagi juftlikdan mosini to'g'ri shaklda yozing.",
    questions: [
      fill("Каждое лето к нам ___ бабушка. (приезжать — приехать)", "приезжает"),
      fill("Вчера к нам ___ бабушка. (приезжать — приехать)", "приехала"),
      fill("Экскурсовод всегда ___ в музей к десяти часам. (приходить — прийти)", "приходит"),
      fill("Самолёт ___ вовремя, без задержки. (прилетать — прилететь)", "прилетел"),
      fill("Наш сын ___ к нам в комнату каждое утро. (прибегать — прибежать)", "прибегает"),
      fill("Недавно он ___ мне подарок из командировки. (привозить — привезти)", "привёз|привез"),
      fill("Мой друг ___ к нам в следующее воскресенье. (приезжать — приехать)", "приедет", "Bir martalik, kelasi zamon — SV: приедет."),
      fill("Сегодня наш пловец ___ к финишу первым. (приплывать — приплыть)", "приплыл"),
      fill("Когда Маша болела, он каждый день ___ ей фрукты. (приносить — принести)", "приносил"),
      fill("Бабушка ___ меня сюда каждое воскресенье. (приводить — привести)", "приводит|приводила"),
    ],
  },
  {
    title: "Jarayon yoki natija?",
    skill: "Prefikslar · 4-bosqich",
    kind: "choice",
    instructions:
      "SV (ушёл, принёс, уехал) — natija hozir ham bor: Андрей ушёл (u uyda yo'q). NSV o'tgan zamonda — borib qaytdi, natija yo'q: Андрей уходил (u allaqachon qaytdi); Ко мне приходил брат = У меня был брат. NSV jarayonni ham bildiradi: Когда я выходил из дома… Mos shaklni tanlang.",
    questions: [
      pick("Андрей … в магазин. (Его сейчас нет дома.)", ["ушёл", "уходил", "уходит", "уйти"]),
      pick("Андрей … в магазин. (Он уже вернулся.)", ["уходил", "ушёл", "уйдёт", "уйти"]),
      pick("Он … мне тетрадь. (Тетрадь сейчас у меня.)", ["принёс", "приносил", "принести", "несёт"]),
      pick("Он … мне тетрадь, но потом забрал её.", ["приносил", "принёс", "принесёт", "нёс"]),
      pick("На каникулах брат … в Москву. (Он уже дома.)", ["уезжал", "уехал", "уедет", "уезжает"]),
      pick("На каникулах брат … в Москву. (Его нет в городе.)", ["уехал", "уезжал", "уедет", "уезжает"]),
      pick("Когда я … из дома, зазвонил телефон.", ["выходил", "вышел", "выйду", "выходить"], "Jarayon — NSV."),
      pick("Ко мне … брат. = У меня был брат.", ["приходил", "пришёл", "придёт", "приходить"]),
      pick("Ты не видела Веру? — Она … полчаса назад.", ["ушла", "уходила", "уйдёт", "уходит"]),
      pick("Вчера к нам … гости. = Вчера у нас были гости.", ["приходили", "пришли", "придут", "приходят"]),
    ],
  },
  {
    title: "Принёс, привёз или привёл?",
    skill: "Prefikslar · 5-bosqich",
    kind: "fill",
    instructions:
      "ПРИНЕСТИ / УНЕСТИ — qo'lda, piyoda; ПРИВЕЗТИ / УВЕЗТИ — transportda; ПРИВЕСТИ / УВЕСТИ — kimnidir yetaklab. Bo'sh joyga mos fe'lni to'g'ri shaklda yozing (kitobdagi mashq asosida).",
    questions: [
      fill("Сегодня вечером я приеду к тебе и ___ твою флешку.", "привезу"),
      fill("Я приду к вам завтра и ___ свою сестру.", "приведу"),
      fill("Ко мне пришла ученица и ___ букет цветов.", "принесла"),
      fill("Таня пришла к Оле и ___ своего друга.", "привела"),
      fill("Дима ушёл и ___ мой учебник.", "унёс|унес"),
      fill("Утром пришёл Никита и ___ свою статью.", "принёс|принес"),
      fill("Родителей нет в городе: они уехали на дачу и ___ детей.", "увезли"),
      fill("Женя уже ушёл и ___ свою девушку.", "увёл|увел"),
      fill("Брат приехал из Хорезма и ___ нам дыни.", "привёз|привез"),
      fill("Кто ___ мою ручку? Её нет на столе.", "унёс|унес"),
    ],
  },
  {
    title: "Входите или выходите?",
    skill: "Prefikslar · 6-bosqich",
    kind: "fill",
    instructions:
      "В(О)- + в / на + В.п. — ichkariga (войти в комнату, ввести пароль); ВЫ- + из + Р.п. — tashqariga (выйти из машины, вынести шкаф). Bo'sh joyga в- yoki вы- prefiksli fe'lni to'g'ri shaklda yozing.",
    questions: [
      fill("Я постучал, и доктор сказал: «Да-да, ___!»", "входите"),
      fill("Кино закончилось, и зрители ___ из кинотеатра.", "вышли"),
      fill("Можно ___ ? — спросил опоздавший студент у двери класса.", "войти"),
      fill("Когда наш шеф ___ в кабинет, он сначала открывает окно.", "входит"),
      fill("Дверь открылась, и в комнату ___ незнакомый парень.", "вошёл|вошел"),
      fill("Чтобы закончить, сохраните файл и ___ из программы.", "выйдите"),
      fill("Прозвенел звонок, и школьники ___ из класса.", "выбежали|вышли"),
      fill("Полицейский попросил: «___ из машины, пожалуйста»", "выйдите|Выйдите"),
      fill("Он ___ пароль и разблокировал телефон.", "ввёл|ввел"),
      fill("Завтра грузчики будут ___ из квартиры старый шкаф.", "выносить|вывозить"),
    ],
  },
  {
    title: "Vokzalda e'lon",
    skill: "Raqamlar",
    kind: "number",
    instructions:
      "Vokzal va aeroportdagi e'lon o'qiladi. Unda aytilgan vaqtni to'rt raqam bilan yozing: 19:40 → 1940, 6:15 → 0615. Fe'llarga ham quloq soling: прибывает, прилетает — keladi; уходит, отправляется, вылетает — ketadi.",
    questions: [
      num("Поезд Москва — Санкт-Петербург прибывает в девятнадцать сорок.", "1940"),
      num("Самолёт из Стамбула прилетает в шесть пятнадцать утра.", "0615"),
      num("Автобус на Бухару уходит в двадцать три тридцать.", "2330"),
      num("Вылет рейса задерживается до четырнадцати двадцати.", "1420"),
      num("Поезд на Самарканд отправляется в восемь ноль пять.", "0805"),
      num("Регистрация на рейс заканчивается в десять пятьдесят.", "1050"),
      num("Электричка приходит в семнадцать сорок пять.", "1745"),
      num("Последний поезд метро уходит в ноль часов тридцать минут.", "0030"),
      num("Самолёт из Владивостока прилетел в двадцать один десять.", "2110"),
      num("Гости придут в половине восьмого вечера.", "1930"),
    ],
  },
  {
    title: "Antonimni yozing",
    skill: "So'z yasash",
    kind: "type",
    instructions: "ПРИ- ↔ У-, В- ↔ ВЫ-. Fe'lning ma'nosi qarama-qarshi bo'lgan juftini yozing: приехать → уехать.",
    questions: [
      ["приехать", "уехать"],
      ["войти", "выйти"],
      ["принести", "унести"],
      ["привезти", "увезти"],
      ["привести", "увести"],
      ["внести", "вынести"],
      ["прилететь", "улететь"],
      ["вбежать", "выбежать"],
      ["приплыть", "уплыть"],
      ["ввезти", "вывезти"],
    ].map(([prompt, answer]) => ({ prompt, answer })),
  },
  {
    title: "Gap tuzing",
    skill: "Prefikslar · 7-bosqich",
    kind: "order",
    instructions: "So'zlarni to'g'ri tartibda bosib, gap tuzing.",
    questions: [
      build("Мой друг вчера приехал из Самарканда."),
      build("Поезд уходит в семь утра."),
      build("Преподаватель вошёл в класс."),
      build("Она вышла из дома рано утром."),
      build("Брат привёз мне подарок из Казани."),
      build("Мама приводит сына в детский сад."),
      build("Гости уже ушли домой."),
      build("Курьер принёс посылку в офис."),
      build("Самолёт прилетает в Ташкент вечером."),
      build("У него спорт вошёл в привычку."),
    ],
  },
  {
    title: "Iborani yig'ing",
    skill: "Kollokatsiyalar",
    kind: "match",
    instructions: "Iboraning birinchi qismini ikkinchisi bilan ulang. Bir qismi Absalomov lug'atidan, bir qismi kitobdan.",
    questions: [
      ["войти|в привычку", "уйти|незаметно", "входить|во вкус", "внести|предложение"],
      ["внести|в список", "выйти|из себя", "вынести|решение", "уйти|с головой"],
      ["ввести|в заблуждение", "вывести|из себя", "привести|пример", "прийти|к решению"],
      ["прийти|в восторг", "принести|пользу", "приехать|к сроку", "войти|в моду"],
      ["уйти|с работы", "выйти|из строя", "внести|поправку", "приводить|факты"],
      ["увлекательная|экскурсия", "роскошный|отель", "потрясающий|вид", "незабываемый|отпуск"],
      ["непредсказуемая|погода", "неповторимый|вкус", "ценный|совет", "невероятная|история"],
      ["прийти|к врачу", "уйти|от подруги", "выйти|из аудитории", "приехать|на праздник"],
      ["привезти|подарок", "привести|сына", "принести|посылку", "увезти|мебель"],
      ["вылететь|из Москвы", "войти|в комнату", "уехать|в отпуск", "прилететь|в Ташкент"],
    ].map((options) => ({ prompt: "Juftlarni ulang", options })),
  },
  {
    title: "Urg'u qayerda?",
    skill: "Urg'u",
    kind: "stress",
    instructions: "So'zni eshiting va urg'uli bo'g'inni bosing.",
    questions: [
      stress("ве|ли|ко|леп|ный", 3, "великоле́пный"),
      stress("рос|кош|ный", 1, "роско́шный"),
      stress("у|вле|ка|тель|ный", 2, "увлека́тельный"),
      stress("по|тря|са|ю|щий", 2, "потряса́ющий"),
      stress("не|ве|ро|ят|ный", 3, "невероя́тный"),
      stress("ма|як", 1, "мая́к"),
      stress("за|лив", 1, "зали́в"),
      stress("по|бе|ре|жье", 2, "побере́жье"),
      stress("чу|дес|ный", 1, "чуде́сный"),
      stress("при|вез|ти", 2, "привезти́"),
    ],
  },
  {
    title: "Mehmonxonada va yo'lda",
    skill: "Vaziyat",
    kind: "situation",
    instructions: "Vaziyatga mos ruscha gapni tanlang.",
    questions: [
      pick("Mehmonxona administratoriga ertaga ertalab ketishingizni aytasiz.", ["Я уезжаю завтра утром.", "Я приезжаю завтра утром.", "Я уехал завтра утром.", "Я въезжаю завтра утром."]),
      pick("Eshikni taqillatib, kirsa bo'ladimi deb so'raysiz.", ["Можно войти?", "Можно выйти?", "Можно прийти?", "Можно уйти?"]),
      pick("Do'stingizga kitobini ertaga olib kelishingizni aytasiz (piyoda).", ["Я принесу тебе книгу завтра.", "Я приведу тебе книгу завтра.", "Я унесу тебе книгу завтра.", "Я внесу тебе книгу завтра."]),
      pick("Direktor hozir xonada yo'qligini, chiqib ketganini aytasiz.", ["Директор вышел.", "Директор выходил.", "Директор вошёл.", "Директор пришёл."]),
      pick("Boshqa shahardagi do'stingizdan qachon kelishini so'raysiz.", ["Когда ты приедешь?", "Когда ты придёшь?", "Когда ты уедешь?", "Когда ты приезжал?"]),
      pick("Mehmonlarni ichkariga taklif qilasiz.", ["Входите, пожалуйста!", "Выходите, пожалуйста!", "Уходите, пожалуйста!", "Вводите, пожалуйста!"]),
      pick("Samolyot Toshkentga qachon uchib kelishini so'raysiz.", ["Когда самолёт прилетает в Ташкент?", "Когда самолёт улетает в Ташкент?", "Когда самолёт прилетает на Ташкент?", "Когда самолёт прилетел в Ташкент завтра?"]),
      pick("Sovg'ani Samarqanddan olib kelganingizni aytasiz.", ["Я привёз этот подарок из Самарканда.", "Я привёз этот подарок в Самарканда.", "Я принёс этот подарок из Самарканд.", "Я увёз этот подарок из Самарканда."]),
      pick("Hamkasbingiz uyga ketib qolganini aytasiz.", ["Он уже ушёл домой.", "Он уже ушёл дома.", "Он уже пришёл домой.", "Он уже вышел домой."]),
      pick("Kompyuter buzilib qolganini aytasiz.", ["Компьютер вышел из строя.", "Компьютер вошёл из строя.", "Компьютер ушёл из строя.", "Компьютер вышел в строй."]),
    ],
  },
  {
    title: "Telefon qo'ng'irog'i",
    skill: "Dialog",
    kind: "dialog",
    instructions: "Do'stingiz Qozondan qaytgan sizga qo'ng'iroq qildi. Uning gapiga mos javobni tanlang.",
    questions: [
      pick("Алло! Ты уже приехал?", ["Да, мой поезд пришёл десять минут назад.", "Да, мой поезд приходил десять минут назад.", "Да, мой поезд ушёл десять минут назад.", "Да, приехал поезд меня."]),
      pick("Где ты сейчас?", ["Я только что вышел из здания вокзала.", "Я только что вышел из зданием вокзала.", "Я только что вошёл из здания вокзала.", "Я здание вокзала вышел."]),
      pick("Ты привёз мне сувенир?", ["Конечно! Я привёз тебе чак-чак из Казани.", "Конечно! Я привёл тебе чак-чак из Казани.", "Конечно! Я увёз тебе чак-чак из Казани.", "Конечно! Я привёз тебе чак-чак в Казани."]),
      pick("Когда ты к нам придёшь?", ["Приду вечером, часов в семь.", "Пришёл вечером, часов в семь.", "Приходил вечером, часов в семь.", "Уйду вечером, часов в семь."]),
      pick("А Лена приедет с тобой?", ["Нет, она уехала к родителям в Самару.", "Нет, она уезжала к родителям в Самару.", "Нет, она уехала у родителей в Самару.", "Нет, она приехала к родителям в Самару."]),
      pick("Как прошла поездка?", ["Незабываемо! Казань — потрясающий город.", "Незабываемый! Казань — потрясающая город.", "Поездка прошла незабываемая.", "Казань потрясающе город."]),
      pick("Ты долго там был?", ["Всего неделю.", "Всего неделя.", "Всего недели.", "Всего неделе."]),
      pick("Дома всё в порядке? Кто-нибудь приходил?", ["Да, приходила соседка и принесла почту.", "Да, пришла соседка и приносила почту.", "Да, приходила соседка и принесла почты.", "Да, приходил соседка и принёс почту."]),
      pick("Возьми с собой фотографии!", ["Хорошо, обязательно принесу.", "Хорошо, обязательно приведу.", "Хорошо, обязательно унесу.", "Хорошо, обязательно приносил."]),
      pick("Ну всё, жду тебя!", ["До вечера! Скоро приду.", "До вечера! Скоро пришёл.", "До вечера! Скоро уйду.", "До вечера! Скоро приходил."]),
    ],
  },
  {
    title: "To'rt shahar",
    skill: "O'qish",
    kind: "truefalse",
    instructions: "Rossiyaning to'rt shahri haqidagi matnni o'qing va gap to'g'ri yoki noto'g'ri ekanini belgilang.",
    questions: [
      tf("Сочи находится на побережье Чёрного моря.", true),
      tf("В Сочи растут пальмы.", true),
      tf("Олимпиада в Сочи была в две тысячи восьмом году.", false, "В две тысячи четырнадцатом."),
      tf("Мурманск находится за Полярным кругом.", true),
      tf("Море у Мурманска зимой замерзает.", false, "Не замерзает даже зимой."),
      tf("Зимой в Мурманске можно увидеть северное сияние.", true),
      tf("Екатеринбург находится на границе Европы и Азии.", true),
      tf("Памятник клавиатуре сделан из дерева.", false, "Из бетона."),
      tf("Поезд из Москвы во Владивосток идёт два дня.", false, "Почти неделю."),
      tf("Из Владивостока можно быстро улететь в Японию.", true),
    ],
  },
  {
    title: "«Чемодан и паспорт»",
    skill: "Tinglab tushunish",
    kind: "audiotext",
    instructions:
      "Sayohat haqidagi teleko'rsatuv boshlovchisi Temurning Samarqanddan reportajini tinglang (kerak bo'lsa, qayta yoki sekinroq) va savollarga javob bering. Matn ekranda ko'rsatilmaydi.",
    questions: [
      hear("Как называется программа?", ["«Чемодан и паспорт»", "«Орёл и решка»", "«Вокруг света»", "«Непутёвые заметки»"]),
      hear("Когда приземлился самолёт?", ["Рано утром.", "Поздно вечером.", "В обед.", "Ночью."]),
      hear("Куда Тимур пришёл первым делом?", ["На Регистан.", "На базар.", "В гостиницу.", "В мавзолей."]),
      hear("Кто привёл его на базар?", ["Гид.", "Мама.", "Соседи.", "Оператор."]),
      hear("Что он купил на базаре?", ["Сухофрукты.", "Ковёр.", "Дыню.", "Тюбетейку."]),
      hear("Кому он привезёт сухофрукты?", ["Маме.", "Гиду.", "Соседям.", "Зрителям."]),
      hear("Что принесла хозяйка?", ["Плов.", "Дыни.", "Хлеб.", "Чай."]),
      hear("Откуда сын хозяйки привёз дыни?", ["Из деревни.", "С базара.", "Из Бухары.", "Из Ташкента."]),
      hear("Куда они вошли после ужина?", ["В мавзолей Гур-Эмир.", "В медресе Улугбека.", "В музей.", "В ресторан."]),
      hear("Куда Тимур улетает завтра?", ["В Бухару.", "В Москву.", "В Ташкент.", "Домой."]),
    ],
  },
  {
    title: "Ayting",
    skill: "Talaffuz",
    kind: "speak",
    instructions: "Gapni eshiting, keyin mikrofon tugmasini bosib o'zingiz ayting.",
    questions: [
      "Можно войти?",
      "Мой друг приехал из Москвы.",
      "Поезд уходит в семь утра.",
      "Я привёз тебе подарок.",
      "Директор вышел, он скоро придёт.",
      "Самолёт прилетает вечером.",
      "Это был незабываемый отпуск.",
      "Вид отсюда просто потрясающий!",
      "Спорт вошёл у меня в привычку.",
      "Приезжайте к нам в гости!",
    ].map((phrase) => ({ prompt: phrase, answer: phrase })),
  },
];
