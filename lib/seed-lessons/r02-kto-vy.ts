/**
 * 3-dars — «Кто вы?» (Liden & Denz, «Я ❤ Русский Язык», 2-urok asosida):
 * kasblar, millat va mamlakatlar, tillar, yosh. Kitob dastur sifatida;
 * gap, matn va mashqlar o'zimizniki. Oldingi darslardagi so'zlar
 * lug'atga qayta qo'shilmaydi.
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

export const R02_ROUNDS: { title: string; words: VocabSeed[] }[] = [
  {
    title: "1-bosqich",
    words: [
      w("👩‍⚕️", "Врач", "vrach", "ot", "Shifokor", "Человек, который лечит людей.", "Врач сказал: больше спать, меньше работать!", "Shifokor dedi: ko'proq uxla, kamroq ishla!"),
      w("⚖️", "Юрист", "yuríst", "ot", "Yurist", "Человек, который знает законы и помогает людям.", "Юрист знает все законы.", "Yurist barcha qonunlarni biladi."),
      w("🧑‍🔧", "Инженер", "inzhinyér", "ot", "Muhandis", "Человек, который создаёт машины, дома и технику.", "Инженер построил этот мост.", "Muhandis bu ko'prikni qurdi."),
      w("👨‍💻", "Программист", "pragramíst", "ot", "Dasturchi", "Человек, который пишет программы для компьютера.", "Программист пьёт кофе и пишет код.", "Dasturchi qahva ichib, kod yozadi."),
      w("📰", "Журналист", "zhurnalíst", "ot", "Jurnalist", "Человек, который пишет статьи в газету или журнал.", "Журналист задаёт много вопросов.", "Jurnalist ko'p savol beradi."),
      w("🎹", "Музыкант", "muzikánt", "ot", "Musiqachi", "Человек, который играет музыку.", "Музыкант играет на гитаре.", "Musiqachi gitara chaladi."),
      w("🎨", "Художник", "khudózhnik", "ot", "Rassom", "Человек, который рисует картины.", "Художник рисует море.", "Rassom dengizni chizyapti."),
      w("✍️", "Писатель", "pisátil'", "ot", "Yozuvchi", "Человек, который пишет книги.", "Толстой — великий русский писатель.", "Tolstoy — buyuk rus yozuvchisi."),
      w("🤵", "Официант", "afitsiánt", "ot", "Ofitsiant", "Человек, который работает в кафе или ресторане и приносит еду.", "Официант, счёт, пожалуйста!", "Ofitsiant, hisob, iltimos!"),
      w("🧹", "Домохозяйка", "damakhazyáyka", "ot", "Uy bekasi", "Женщина, которая не работает, а ведёт дом.", "Домохозяйка работает без выходных.", "Uy bekasi dam olish kunlarisiz ishlaydi."),
    ],
  },
  {
    title: "2-bosqich",
    words: [
      w("🎭", "Актёр", "aktyór", "ot", "Aktyor", "Мужчина, который играет в кино или в театре.", "Этот актёр играл в «Гарри Поттере».", "Bu aktyor «Garri Potter»da o'ynagan."),
      w("🎬", "Актриса", "aktrísa", "ot", "Aktrisa", "Женщина, которая играет в кино или в театре.", "Актриса получила «Оскар»!", "Aktrisa «Oskar» oldi!"),
      w("🎤", "Певец", "pivyéts", "ot", "Qo'shiqchi (erkak)", "Мужчина, который поёт.", "Певец поёт на русском и узбекском.", "Qo'shiqchi rus va o'zbek tilida kuylaydi."),
      w("👩‍🎤", "Певица", "pivítsa", "ot", "Qo'shiqchi (ayol)", "Женщина, которая поёт.", "Певица поёт очень красиво.", "Qo'shiqchi juda chiroyli kuylaydi."),
      w("⚽", "Спортсмен", "spartsmén", "ot", "Sportchi (erkak)", "Мужчина, который занимается спортом.", "Спортсмен бегает каждое утро.", "Sportchi har tong yuguradi."),
      w("🏃‍♀️", "Спортсменка", "spartsménka", "ot", "Sportchi (ayol)", "Женщина, которая занимается спортом.", "Спортсменка выиграла золото!", "Sportchi qiz oltin yutdi!"),
      w("🧔", "Мужчина", "muzhchína", "ot", "Erkak", "Взрослый человек мужского пола. Слово мужского рода: этот мужчина.", "Настоящий мужчина умеет готовить.", "Haqiqiy erkak ovqat pishirishni biladi."),
      w("👩‍🦱", "Женщина", "zhénshchina", "ot", "Ayol", "Взрослый человек женского пола.", "Эта женщина говорит на пяти языках.", "Bu ayol besh tilda gapiradi."),
      w("👦", "Мальчик", "mál'chik", "ot", "O'g'il bola", "Ребёнок мужского пола.", "Мальчик мечтает стать космонавтом.", "Bola kosmonavt bo'lishni orzu qiladi."),
      w("👧", "Девочка", "dyévachka", "ot", "Qiz bola", "Ребёнок женского пола.", "Девочка читает книгу о драконах.", "Qizcha ajdarlar haqidagi kitobni o'qiyapti."),
    ],
  },
  {
    title: "3-bosqich",
    words: [
      w("🇷🇺", "Россия", "rassíya", "ot", "Rossiya", "Самая большая страна в мире.", "Россия — самая большая страна в мире.", "Rossiya — dunyodagi eng katta davlat."),
      w("🇬🇧", "Англия", "ángliya", "ot", "Angliya", "Страна, где говорят по-английски.", "Англия — родина футбола.", "Angliya — futbol vatani."),
      w("🇺🇸", "Америка", "amyérika", "ot", "Amerika", "США — Соединённые Штаты Америки.", "Америка очень далеко от Узбекистана.", "Amerika O'zbekistondan juda uzoqda."),
      w("🇩🇪", "Германия", "girmániya", "ot", "Germaniya", "Страна в Европе; там говорят по-немецки.", "Германия делает хорошие машины.", "Germaniya yaxshi mashinalar ishlab chiqaradi."),
      w("🇫🇷", "Франция", "frántsiya", "ot", "Fransiya", "Страна в Европе; там говорят по-французски.", "Франция — страна вина и сыра.", "Fransiya — vino va pishloq mamlakati."),
      w("🇮🇹", "Италия", "itáliya", "ot", "Italiya", "Страна в Европе; там говорят по-итальянски.", "Италия — родина пиццы.", "Italiya — pitsa vatani."),
      w("🇪🇸", "Испания", "ispániya", "ot", "Ispaniya", "Страна в Европе; там говорят по-испански.", "Испания — это солнце и море.", "Ispaniya — bu quyosh va dengiz."),
      w("🇯🇵", "Япония", "ipóniya", "ot", "Yaponiya", "Страна в Азии; там говорят по-японски.", "Япония — страна суши и роботов.", "Yaponiya — sushi va robotlar mamlakati."),
      w("🇨🇳", "Китай", "kitáy", "ot", "Xitoy", "Большая страна в Азии.", "Китай — очень древняя страна.", "Xitoy — juda qadimiy mamlakat."),
      w("🇧🇷", "Бразилия", "brazíliya", "ot", "Braziliya", "Большая страна в Южной Америке.", "Бразилия — страна футбола и карнавала.", "Braziliya — futbol va karnaval mamlakati."),
    ],
  },
  {
    title: "4-bosqich",
    words: [
      w("🗣️", "По-русски", "pa-rússki", "ravish", "Ruscha (gapirmoq)", "На русском языке.", "Я уже немного говорю по-русски!", "Men allaqachon ozgina ruscha gapiraman!"),
      w("💬", "По-английски", "pa-anglíyski", "ravish", "Inglizcha", "На английском языке.", "В аэропорту все говорят по-английски.", "Aeroportda hamma inglizcha gapiradi."),
      w("🥨", "По-немецки", "pa-nyémitski", "ravish", "Nemischa", "На немецком языке.", "Мой друг говорит по-немецки.", "Do'stim nemischa gapiradi."),
      w("🥐", "По-французски", "pa-frantsúski", "ravish", "Fransuzcha", "На французском языке.", "«Мерси» по-французски — «спасибо».", "Fransuzchada «mersi» — «rahmat»."),
      w("👄", "Говорить", "gavarít'", "fe'l", "Gapirmoq", "Произносить слова, разговаривать. Я говорю, ты говоришь, они говорят.", "Говорить легко, делать трудно.", "Gapirish oson, qilish qiyin."),
      w("🧠", "Знать", "znat'", "fe'l", "Bilmoq", "Иметь информацию. Я знаю, ты знаешь, они знают.", "Всё знать невозможно.", "Hamma narsani bilish mumkin emas."),
      w("🤔", "Думать", "dúmat'", "fe'l", "O'ylamoq", "Иметь мнение. Я думаю, ты думаешь, они думают.", "Думать полезно!", "O'ylash foydali!"),
      w("📍", "Откуда", "atkúda", "so'roq", "Qayerdan?", "Вопрос о месте, из которого человек или вещь.", "Откуда ты так хорошо знаешь русский?", "Ruschani qayerdan bunchalik yaxshi bilasan?"),
      w("🧮", "Сколько", "skól'ka", "so'roq", "Qancha? Necha?", "Вопрос о количестве.", "Сколько стоит мороженое?", "Muzqaymoq qancha turadi?"),
      w("🤏", "Чуть-чуть", "chut'-chút'", "ravish", "Ozgina", "Очень мало, немного.", "Можно чуть-чуть сахара?", "Ozgina shakar mumkinmi?"),
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

const GOD = ["год", "года", "лет"];
const DAT = ["мне", "тебе", "ему", "ей", "нам", "вам", "им"];
const ETOT = ["этот", "эта", "эти"];
const TF = ["To'g'ri", "Noto'g'ri"];
const TEXT_A =
  "Меня зовут Лаура. Я из Италии. Мне 28 лет. Я врач. Я хорошо говорю по-английски и немного говорю по-русски.";
const TEXT_B =
  "Это Хуан и Карлос. Они из Бразилии. Хуану 35 лет, а Карлосу 22 года. Хуан — музыкант, а Карлос — студент. Они говорят по-португальски и чуть-чуть по-русски.";
/** "To'g'ri yoki noto'g'ri" savoli: `prompt` = "matn||gap". */
const tf = (text: string, statement: string, isTrue: boolean, explanation?: string): SeedQuestion => ({
  prompt: `${text}||${statement}`,
  options: TF,
  correct: isTrue ? 0 : 1,
  explanation,
});

export const R02_EXERCISES: SeedExercise[] = [
  {
    title: "Tinglang va toping",
    skill: "Tinglash",
    kind: "listen",
    instructions: "Gap ovoz chiqarib o'qiladi. Eshitgan gapingizni toping.",
    questions: [
      listen("Я из Франции.", ["Я из Франции.", "Я из Германии.", "Я из Италии.", "Я из Испании."]),
      listen("Он врач.", ["Он юрист.", "Он врач.", "Он актёр.", "Он певец."]),
      listen("Мне двадцать лет.", ["Мне двенадцать лет.", "Мне двадцать лет.", "Мне тридцать лет.", "Мне сорок лет."], "двадцать — 20, двенадцать — 12."),
      listen("Она певица.", ["Она актриса.", "Она певица.", "Она писатель.", "Она врач."]),
      listen("Я говорю по-немецки.", ["Я говорю по-немецки.", "Я говорю по-английски.", "Я говорю по-русски.", "Я говорю по-японски."]),
      listen("Откуда Вы?", ["Кто Вы?", "Откуда Вы?", "Как Вас зовут?", "Сколько Вам лет?"]),
      listen("Ему пятьдесят лет.", ["Ему пятнадцать лет.", "Ему пятьдесят лет.", "Ей пятьдесят лет.", "Ему шестьдесят лет."]),
      listen("Я не знаю.", ["Я не знаю.", "Я не думаю.", "Я знаю.", "Я думаю."]),
      listen("Они из Японии.", ["Они из Японии.", "Они из Испании.", "Он из Японии.", "Она из Японии."]),
      listen("Я художник.", ["Я музыкант.", "Я журналист.", "Я художник.", "Я инженер."]),
    ],
  },
  {
    title: "Kim bu?",
    skill: "Rasm",
    kind: "picture",
    instructions: "Rasmga qarang. Bu kim? Kasbni toping.",
    questions: [
      pick("👩‍⚕️", ["врач", "юрист", "певица", "инженер"], 0),
      pick("👨‍💻", ["писатель", "программист", "официант", "художник"], 1),
      pick("🎹", ["актёр", "спортсмен", "музыкант", "журналист"], 2),
      pick("🎨", ["художник", "врач", "писатель", "юрист"], 0),
      pick("✍️", ["официант", "писатель", "певец", "инженер"], 1),
      pick("🎭", ["актёр", "врач", "программист", "юрист"], 0),
      pick("🎤", ["музыкант", "певица", "домохозяйка", "журналистка"], 1),
      pick("⚽", ["писатель", "художник", "спортсмен", "врач"], 2),
      pick("⚖️", ["юрист", "инженер", "актёр", "официант"], 0),
      pick("🧹", ["актриса", "певица", "домохозяйка", "спортсменка"], 2),
    ],
  },
  {
    title: "U erkak — u ayol",
    skill: "Ayol shakli",
    kind: "type",
    instructions: "Kasb yoki millatning ayol shaklini yozing. Masalan: студент → студентка, актёр → актриса.",
    questions: [
      ["официант", "официантка"],
      ["журналист", "журналистка"],
      ["спортсмен", "спортсменка"],
      ["актёр", "актриса", "Istisno: актёр → актриса."],
      ["певец", "певица", "певец → певица (-ец → -ица)."],
      ["студент", "студентка"],
      ["американец", "американка", "-ец → -ка: американец → американка."],
      ["итальянец", "итальянка"],
      ["француз", "француженка", "Istisno: француз → француженка."],
      ["русский", "русская", "Sifat kabi o'zgaradi: русский → русская."],
    ].map(([prompt, answer, explanation]) => ({ prompt, answer, explanation })),
  },
  {
    title: "Откуда Вы?",
    skill: "Grammatika",
    kind: "choice",
    instructions:
      "«из» dan keyin mamlakat nomi o'zgaradi: Россия → из России, Америка → из Америки, Китай → из Китая. To'g'ri shaklni tanlang.",
    questions: [
      pick("Это Россия. Я из …", ["Россия", "России", "Россию", "Россией"], 1),
      pick("Это Америка. Я из …", ["Америка", "Америку", "Америки", "Америке"], 2),
      pick("Это Германия. Он из …", ["Германии", "Германия", "Германию", "Германией"], 0),
      pick("Это Франция. Она из …", ["Франция", "Францию", "Франции", "Францией"], 2),
      pick("Это Италия. Мы из …", ["Италии", "Италия", "Италию", "Италией"], 0),
      pick("Это Испания. Вы из …?", ["Испания", "Испании", "Испанию", "Испанией"], 1),
      pick("Это Япония. Они из …", ["Японию", "Япония", "Японией", "Японии"], 3),
      pick("Это Англия. Я из …", ["Англия", "Англии", "Англию", "Англией"], 1),
      pick("Это Китай. Он из …", ["Китай", "Китаи", "Китая", "Китаю"], 2, "-й → -я: Китай → из Китая."),
      pick("Это Бразилия. Она из …", ["Бразилии", "Бразилия", "Бразилию", "Бразилией"], 0),
    ],
  },
  {
    title: "Mamlakat, til, millat",
    skill: "Juftlik",
    kind: "match",
    instructions: "Mamlakatni tili yoki millati bilan ulang.",
    questions: [
      ["Россия|по-русски", "Англия|по-английски", "Германия|по-немецки", "Франция|по-французски"],
      ["Италия|по-итальянски", "Испания|по-испански", "Япония|по-японски", "Китай|по-китайски"],
      ["Россия|русский", "Англия|англичанин", "Америка|американец", "Германия|немец"],
      ["Франция|француз", "Италия|итальянец", "Испания|испанец", "Япония|японец"],
      ["Китай|китаец", "Бразилия|бразилец", "Россия|русский", "Италия|итальянец"],
      ["США|Америка", "Великобритания|Англия", "Москва|Россия", "Токио|Япония"],
      ["Париж|Франция", "Берлин|Германия", "Рим|Италия", "Мадрид|Испания"],
      ["русский|русская", "немец|немка", "француз|француженка", "японец|японка"],
      ["англичанин|англичанка", "испанец|испанка", "китаец|китаянка", "американец|американка"],
      ["по-русски|ruscha", "по-английски|inglizcha", "по-немецки|nemischa", "по-французски|fransuzcha"],
    ].map((options) => ({ prompt: "Juftlarni ulang", options })),
  },
  {
    title: "Fe'lni to'ldiring",
    skill: "Fe'llar",
    kind: "fill",
    instructions:
      "говорить: я говорю, ты говоришь, он говорит, мы говорим, вы говорите, они говорят. знать/думать: я знаю/думаю, вы знаете/думаете. Fe'lni to'g'ri shaklda yozing.",
    questions: [
      ["Я ___ по-русски. (говорить)", "говорю"],
      ["Ты ___ по-английски? (говорить)", "говоришь"],
      ["Он ___ по-немецки. (говорить)", "говорит"],
      ["Мы ___ по-французски. (говорить)", "говорим"],
      ["Вы ___ по-русски? (говорить)", "говорите"],
      ["Они ___ по-японски. (говорить)", "говорят"],
      ["Я не ___, кто это. (знать)", "знаю"],
      ["Вы ___, кто это? (знать)", "знаете"],
      ["Я ___, это Анна. (думать)", "думаю"],
      ["Как Вы ___, кто это? (думать)", "думаете"],
    ].map(([prompt, answer]) => ({ prompt, answer })),
  },
  {
    title: "год, года или лет?",
    skill: "Yosh",
    kind: "choice",
    instructions: "1, 21, 31… → год; 2–4, 22–24… → года; 5–20, 25–30… → лет.",
    questions: [
      pick("Мне 21 …", GOD, 0),
      pick("Ему 22 …", GOD, 1),
      pick("Ей 25 …", GOD, 2),
      pick("Мне 31 …", GOD, 0),
      pick("Ему 43 …", GOD, 1),
      pick("Ей 30 …", GOD, 2),
      pick("Нам 19 …", GOD, 2),
      pick("Вам 34 …", GOD, 1),
      pick("Им 11 …", GOD, 2, "11–14 — doim «лет»: 11 лет, 12 лет."),
      pick("Ему 52 …", GOD, 1),
    ],
  },
  {
    title: "Kimga necha yosh?",
    skill: "Olmoshlar",
    kind: "choice",
    instructions: "Yosh aytilganda: я → мне, ты → тебе, он → ему, она → ей, мы → нам, вы → вам, они → им.",
    questions: [
      pick("Я студент. … 20 лет.", DAT, 0),
      pick("Ты тоже студент? Сколько … лет?", DAT, 1),
      pick("Он врач. … 45 лет.", DAT, 2),
      pick("Она певица. … 30 лет.", DAT, 3),
      pick("Мы студенты. … 19 лет.", DAT, 4),
      pick("Анна Петровна, сколько … лет?", DAT, 5, "Rasmiy murojaat — Вы → Вам."),
      pick("Они спортсмены. … 25 лет.", DAT, 6),
      pick("Это Иван. … 18 лет.", DAT, 2),
      pick("Это Мария. … 21 год.", DAT, 3),
      pick("Это Анна и Олег. … 22 года.", DAT, 6),
    ],
  },
  {
    title: "Raqamni yozing",
    skill: "Raqamlar",
    kind: "number",
    instructions: "Raqam ruscha o'qiladi. Uni sonlar bilan yozing (masalan: 45).",
    questions: [
      ["двадцать один", "21"],
      ["тридцать", "30"],
      ["сорок", "40", "сорок — istisno, «-десят» yo'q."],
      ["пятьдесят", "50"],
      ["шестьдесят пять", "65"],
      ["семьдесят", "70"],
      ["восемьдесят", "80"],
      ["девяносто", "90", "девяносто — istisno."],
      ["сто", "100"],
      ["сорок восемь", "48"],
    ].map(([audio, answer, explanation]) => ({ prompt: "Raqamni yozing", audio, answer, explanation })),
  },
  {
    title: "Этот, эта или эти?",
    skill: "Grammatika",
    kind: "choice",
    instructions: "он → этот, она → эта, они → эти. Diqqat: мужчина -а bilan tugasa ham erkak — этот мужчина.",
    questions: [
      pick("… мужчина", ETOT, 0, "Мужчина — erkak, shuning uchun этот."),
      pick("… женщина", ETOT, 1),
      pick("… люди", ETOT, 2),
      pick("… мальчик", ETOT, 0),
      pick("… девочка", ETOT, 1),
      pick("… актёр", ETOT, 0),
      pick("… актриса", ETOT, 1),
      pick("… студенты", ETOT, 2),
      pick("… молодой человек", ETOT, 0),
      pick("… девушка", ETOT, 1),
    ],
  },
  {
    title: "Suhbatni davom ettiring",
    skill: "Dialog",
    kind: "dialog",
    instructions: "Suhbatdoshingiz savol berdi. Mos javobni tanlang.",
    questions: [
      pick("Кто Вы по профессии?", ["Я из России.", "Я инженер.", "Мне 25 лет.", "Да, говорю."], 1),
      pick("Откуда Вы?", ["Я из Германии.", "Я врач.", "Меня зовут Ганс.", "По-немецки."], 0),
      pick("Сколько Вам лет?", ["Мне 25 лет.", "Я 25 лет.", "Меня 25 лет.", "Мой 25 лет."], 0),
      pick("Вы говорите по-русски?", ["Да, немного.", "Да, из России.", "Нет, я юрист.", "Мне 30 лет."], 0),
      pick("Ты знаешь, кто это?", ["Да, знаю. Это Анна.", "Да, я Анна.", "Да, из Англии.", "Да, 20 лет."], 0),
      pick("Кто этот мужчина?", ["Он врач.", "Она врач.", "Эти врачи.", "Эта врач."], 0),
      pick("Откуда она?", ["Она из Франции.", "Он из Франции.", "Она француз.", "Она Франция."], 0),
      pick("Сколько ему лет?", ["Ему 30 лет.", "Ей 30 лет.", "Он 30 лет.", "Его 30 лет."], 0),
      pick("Вы говорите по-английски?", ["Нет, совсем не говорю.", "Нет, я не знаю.", "Да, из Англии.", "Нет, мне 20 лет."], 0),
      pick("Как Вы думаете, кто это?", ["Я думаю, это актёр.", "Я думаю из России.", "Мне думаю актёр.", "Я знаю 20 лет."], 0),
    ],
  },
  {
    title: "Gap tuzing",
    skill: "Gap tuzish",
    kind: "order",
    instructions: "So'zlarni to'g'ri tartibda bosib, gap tuzing.",
    questions: [
      "Я говорю по-русски.",
      "Откуда Вы?",
      "Я из Италии.",
      "Кто Вы по профессии?",
      "Мне 20 лет.",
      "Она из Японии.",
      "Эта женщина певица.",
      "Этот мужчина актёр.",
      "Сколько Вам лет?",
      "Мы немного говорим по-английски.",
    ].map((answer) => ({ prompt: "Gap tuzing", answer })),
  },
  {
    title: "To'g'ri yoki noto'g'ri?",
    skill: "O'qish",
    kind: "truefalse",
    instructions: "Matnni o'qing va gap to'g'ri yoki noto'g'ri ekanini belgilang.",
    questions: [
      tf(TEXT_A, "Лаура из Испании.", false, "Лаура из Италии."),
      tf(TEXT_A, "Лауре 28 лет.", true),
      tf(TEXT_A, "Лаура — журналистка.", false, "Лаура — врач."),
      tf(TEXT_A, "Лаура говорит по-английски.", true),
      tf(TEXT_A, "Лаура совсем не говорит по-русски.", false, "Она немного говорит по-русски."),
      tf(TEXT_B, "Хуан и Карлос из Бразилии.", true),
      tf(TEXT_B, "Карлосу 35 лет.", false, "Карлосу 22 года, а Хуану 35 лет."),
      tf(TEXT_B, "Хуан — музыкант.", true),
      tf(TEXT_B, "Карлос — программист.", false, "Карлос — студент."),
      tf(TEXT_B, "Они немного говорят по-русски.", true, "Чуть-чуть = немного."),
    ],
  },
  {
    title: "Urg'u qayerda?",
    skill: "Fonetika",
    kind: "stress",
    instructions: "So'zni eshiting va urg'uli bo'g'inni bosing.",
    questions: (
      [
        ["две|над|цать", 1],
        ["пят|над|цать", 1],
        ["шест|над|цать", 1],
        ["ю|рист", 1],
        ["пи|са|тель", 1],
        ["ин|же|нер", 2],
        ["му|зы|кант", 2],
        ["ху|дож|ник", 1],
        ["о|фи|ци|ант", 3],
        ["Ис|па|ни|я", 1],
      ] as [string, number][]
    ).map(([syllables, correct]) => ({
      prompt: "Urg'uli bo'g'inni toping",
      audio: syllables.replace(/\|/g, ""),
      options: syllables.split("|"),
      correct,
    })),
  },
  {
    title: "Ayting",
    skill: "Talaffuz",
    kind: "speak",
    instructions: "Gapni eshiting, keyin mikrofon tugmasini bosib o'zingiz ayting.",
    questions: [
      "Я из России.",
      "Я говорю по-русски.",
      "Кто Вы по профессии?",
      "Мне двадцать лет.",
      "Откуда Вы?",
      "Я немного говорю по-английски.",
      "Этот мужчина — врач.",
      "Сколько Вам лет?",
      "Я думаю, это Анна.",
      "Я не знаю.",
    ].map((phrase) => ({ prompt: phrase, answer: phrase })),
  },
];
