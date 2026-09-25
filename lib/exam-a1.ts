/**
 * Elementar daraja (A1) yakuniy imtihonining grammatika savollari banki.
 * Imtihon qanday tuzilishi va baholanishi — lib/exam.ts da.
 *
 * Har bir savolda to'g'ri javob birinchi yozilgan — variantlar imtihon
 * tuzilayotganda aralashtiriladi.
 */

export interface ExamGrammarItem {
  prompt: string;
  /** options[0] — to'g'ri javob. */
  options: string[];
  explanation: string;
}

/** Dars kodi → shu dars grammatikasi bo'yicha savollar (har birida 5 ta). */
export const A1_GRAMMAR_BANK: Record<string, ExamGrammarItem[]> = {
  R00: [
    { prompt: "Qaysi so'zda «ы» harfi bor?", options: ["сыр", "сок", "суп", "сад"], explanation: "сыр — «ы» harfi bilan." },
    { prompt: "Qaysi so'zda «ж» harfi bor?", options: ["жираф", "шар", "чай", "цирк"], explanation: "жираф — «ж» bilan boshlanadi." },
    { prompt: "Qaysi so'zda ayiruv belgisi «ъ» bor?", options: ["подъезд", "день", "семья", "мать"], explanation: "подъезд — «ъ» bilan yoziladi." },
    { prompt: "Qaysi so'zda «щ» harfi bor?", options: ["борщ", "шкаф", "чай", "жук"], explanation: "борщ — oxirida «щ»." },
    { prompt: "Qaysi so'z «ё» bilan yoziladi?", options: ["ёж", "еда", "юг", "яблоко"], explanation: "ёж — «ё» bilan." },
  ],
  R01: [
    { prompt: "Кто это? — … мама.", options: ["Это", "Этот", "Эта", "Эти"], explanation: "«Bu — …» degan ma'noda doim «Это»." },
    { prompt: "… это? — Это книга.", options: ["Что", "Кто", "Где", "Как"], explanation: "Jonsiz narsa haqida — «Что это?»." },
    { prompt: "… это? — Это Антон.", options: ["Кто", "Что", "Какой", "Где"], explanation: "Odam haqida — «Кто это?»." },
    { prompt: "Direktorga qanday salom berasiz?", options: ["Здравствуйте!", "Привет!", "Пока!", "Спасибо!"], explanation: "Rasmiy salom — «Здравствуйте!»." },
    { prompt: "— Как дела? — …", options: ["Хорошо, спасибо!", "Меня зовут Анна.", "Очень приятно.", "До свидания!"], explanation: "«Как дела?» savoliga — «Хорошо, спасибо!»." },
  ],
  R02: [
    { prompt: "Я … по-русски.", options: ["говорю", "говорит", "говоришь", "говорят"], explanation: "я говорю." },
    { prompt: "Вы … по-английски?", options: ["говорите", "говорит", "говорю", "говорят"], explanation: "вы говорите." },
    { prompt: "Он актёр, а она …", options: ["актриса", "актёрша", "актёра", "актёрка"], explanation: "актёр (erkak) — актриса (ayol)." },
    { prompt: "Кто он по профессии? — Он …", options: ["инженер", "по-русски", "в Америке", "хорошо"], explanation: "Kasb haqidagi savolga — kasb nomi." },
    { prompt: "Мой друг хорошо говорит … (rus tilida)", options: ["по-русски", "русский", "в русском", "русском"], explanation: "говорить по-русски." },
  ],
  R03: [
    { prompt: "Это … брат.", options: ["мой", "моя", "моё", "мои"], explanation: "брат — erkak jinsi: мой." },
    { prompt: "Это … сестра.", options: ["моя", "мой", "моё", "мои"], explanation: "сестра — ayol jinsi: моя." },
    { prompt: "У меня … брат и сестра.", options: ["есть", "быть", "был", "будет"], explanation: "«Menda bor» — у меня есть." },
    { prompt: "Мы … в футбол.", options: ["играем", "играю", "играет", "играют"], explanation: "мы играем." },
    { prompt: "Они … музыку.", options: ["слушают", "слушаем", "слушает", "слушаешь"], explanation: "они слушают." },
  ],
  R04: [
    { prompt: "Я живу в … (Ташкент)", options: ["Ташкенте", "Ташкент", "Ташкента", "Ташкенту"], explanation: "Где? — в Ташкенте (-е)." },
    { prompt: "Она учится в … (университет)", options: ["университете", "университет", "университета", "университету"], explanation: "Где? — в университете." },
    { prompt: "Мы … в Самарканде.", options: ["живём", "живу", "живёт", "живут"], explanation: "мы живём." },
    { prompt: "Мама работает на … (почта)", options: ["почте", "почта", "почту", "почты"], explanation: "на почте (-а → -е)." },
    { prompt: "Я … в институте.", options: ["учусь", "учится", "учишься", "учатся"], explanation: "я учусь." },
  ],
  R05: [
    { prompt: "Ташкент — … город.", options: ["большой", "большая", "большое", "большие"], explanation: "город — erkak jinsi: большой." },
    { prompt: "Москва — … столица.", options: ["красивая", "красивый", "красивое", "красивые"], explanation: "столица — ayol jinsi: красивая." },
    { prompt: "Это … озеро.", options: ["тихое", "тихий", "тихая", "тихие"], explanation: "озеро — o'rta jins: тихое." },
    { prompt: "… это город? — Это Бухара.", options: ["Какой", "Какая", "Какое", "Какие"], explanation: "город — какой?" },
    { prompt: "Музей на … (площадь)", options: ["площади", "площадь", "площаде", "площадью"], explanation: "-ь (ayol jinsi) → -и: на площади." },
  ],
  R06: [
    { prompt: "Вчера Анна … в театре.", options: ["была", "был", "было", "были"], explanation: "Анна (ayol) — была." },
    { prompt: "Вчера мы … фильм.", options: ["смотрели", "смотрел", "смотрела", "смотрим"], explanation: "мы (o'tgan zamon) — смотрели." },
    { prompt: "Когда? — … (среда)", options: ["в среду", "в среда", "в среде", "на среду"], explanation: "Kun nomi: в + -у (в среду)." },
    { prompt: "Где он был? — Он был на …", options: ["концерте", "концерт", "концерта", "концертом"], explanation: "на концерте (-е)." },
    { prompt: "Дети гуляли в … (лес)", options: ["лесу", "лесе", "лес", "леса"], explanation: "Istisno: в лесу." },
  ],
  R07: [
    { prompt: "Я … кашу на завтрак.", options: ["ем", "ест", "едим", "ешь"], explanation: "есть: я ем." },
    { prompt: "Он … чай с лимоном.", options: ["пьёт", "пью", "пьют", "пьёшь"], explanation: "пить: он пьёт." },
    { prompt: "Я люблю … (рыба)", options: ["рыбу", "рыба", "рыбы", "рыбе"], explanation: "Что? -а → -у: рыбу." },
    { prompt: "Будьте добры, … пиццу.", options: ["одну", "один", "одно", "одни"], explanation: "пиццу (ayol jinsi) — одну." },
    { prompt: "Это стоит 5 …", options: ["рублей", "рубль", "рубля", "рублю"], explanation: "5–20 — рублей." },
  ],
  R08: [
    { prompt: "Сейчас я … в магазин пешком.", options: ["иду", "еду", "хожу", "езжу"], explanation: "Hozir, piyoda — иду." },
    { prompt: "Каждый день он … на работу на метро.", options: ["ездит", "едет", "ходит", "идёт"], explanation: "Muntazam, ulovda — ездит." },
    { prompt: "Я еду на работу на … (автобус)", options: ["автобусе", "автобус", "автобуса", "автобусом"], explanation: "На чём? — на автобусе." },
    { prompt: "Куда ты идёшь? — …", options: ["Домой.", "Дома.", "В доме.", "Из дома."], explanation: "Куда? — домой." },
    { prompt: "… утро я пью кофе.", options: ["Каждое", "Каждый", "Каждая", "Каждые"], explanation: "утро — o'rta jins: каждое." },
  ],
  R09: [
    { prompt: "Мне … комедии.", options: ["нравятся", "нравится", "нравлюсь", "нравимся"], explanation: "комедии (ko'plik) — нравятся." },
    { prompt: "Я жду … (Сергей)", options: ["Сергея", "Сергей", "Сергею", "Сергеем"], explanation: "Кого? -й → -я." },
    { prompt: "Завтра я … смотреть фильм.", options: ["буду", "будешь", "будет", "был"], explanation: "Kelasi zamon: я буду + infinitiv." },
    { prompt: "Фильм начинается … час.", options: ["через", "назад", "после", "до"], explanation: "Kelajak: через час." },
    { prompt: "Это книга о … (любовь)", options: ["любви", "любовь", "любовью", "любове"], explanation: "О чём? — о любви." },
  ],
  R10: [
    { prompt: "В доме нет … (лифт)", options: ["лифта", "лифт", "лифте", "лифту"], explanation: "Нет чего? — лифта." },
    { prompt: "У … есть машина. (Максим)", options: ["Максима", "Максим", "Максиму", "Максиме"], explanation: "У кого? — у Максима." },
    { prompt: "Картина … на стене.", options: ["висит", "стоит", "лежит", "сидит"], explanation: "Картина osilib turadi — висит." },
    { prompt: "Я живу на … этаже. (5)", options: ["пятом", "пятый", "пятого", "пять"], explanation: "На каком этаже? — на пятом." },
    { prompt: "Раньше у меня … собака.", options: ["была", "был", "было", "были"], explanation: "собака (ayol jinsi) — была." },
  ],
  R11: [
    { prompt: "Вчера я долго … задачу.", options: ["решал", "решил", "решу", "решаю"], explanation: "Jarayon (долго) — НСВ: решал." },
    { prompt: "Наконец я … задачу!", options: ["решил", "решал", "решаю", "решать"], explanation: "Natija (наконец) — СВ: решил." },
    { prompt: "Ты … мне помочь?", options: ["можешь", "умеешь", "можете", "может"], explanation: "Imkoniyat — мочь: ты можешь." },
    { prompt: "Анна … сдать экзамен.", options: ["должна", "должен", "должны", "должно"], explanation: "Анна (ayol) — должна." },
    { prompt: "Она начала … книгу.", options: ["читать", "прочитать", "читала", "прочитала"], explanation: "начать + НСВ infinitiv." },
  ],
  R12: [
    { prompt: "Я подарил цветы … (мама)", options: ["маме", "маму", "мамы", "мамой"], explanation: "Кому? — маме." },
    { prompt: "… 25 лет. (он)", options: ["Ему", "Его", "Он", "Им"], explanation: "Yosh: Кому? — ему." },
    { prompt: "В музее … трогать картины!", options: ["нельзя", "нужно", "можно", "надо"], explanation: "Taqiq — нельзя." },
    { prompt: "Навруз празднуют … (март)", options: ["в марте", "в март", "марта", "мартом"], explanation: "Когда? — в марте." },
    { prompt: "Я … тебе книгу завтра. (дать)", options: ["дам", "даю", "дашь", "дадим"], explanation: "дать: я дам." },
  ],
  R13: [
    { prompt: "Мы … в Самарканд на поезде.", options: ["приехали", "пришли", "пришёл", "приехал"], explanation: "Ulovda, мы — приехали." },
    { prompt: "Откуда ты идёшь? — … (подруга)", options: ["от подруги", "к подруге", "у подруги", "с подругой"], explanation: "Откуда? (odamdan) — от подруги." },
    { prompt: "Я учу русский, … работать в Москве.", options: ["чтобы", "потому что", "поэтому", "что"], explanation: "Maqsad — чтобы + infinitiv." },
    { prompt: "Аптека напротив … (банк)", options: ["банка", "банк", "банке", "банком"], explanation: "напротив + Р.п.: банка." },
    { prompt: "Я … к вам через полчаса.", options: ["приду", "прихожу", "пришёл", "приходил"], explanation: "Bir marta, kelajakda — приду." },
  ],
  R14: [
    { prompt: "Я пью чай с … (молоко)", options: ["молоком", "молоко", "молока", "молоку"], explanation: "С чем? — с молоком." },
    { prompt: "Мы познакомились с … в Японии. (он)", options: ["ним", "его", "ему", "он"], explanation: "С кем? — с ним." },
    { prompt: "Он работает … (врач)", options: ["врачом", "врач", "врача", "врачу"], explanation: "Работать кем? — врачом." },
    { prompt: "(вы) … , пожалуйста, ключ. (дать)", options: ["Дайте", "Дай", "Дадите", "Даёте"], explanation: "Buyruq (вы): дайте." },
    { prompt: "Я … собак. (бояться)", options: ["боюсь", "боится", "боятся", "бояться"], explanation: "бояться: я боюсь." },
  ],
};
