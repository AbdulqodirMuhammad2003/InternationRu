/**
 * B2, 8-dars — «Выставки и отзывы» (Liden & Denz, «Я ❤ Русский Язык»,
 * B1.2, 2-urok 1-modul, 2-qism va modul testi): xalq hunarmandchiligi
 * muzeylari (Vologda to'ri, «Tal'tsy», B-413 suv osti kemasi, Zadorojniy
 * texnika muzeyi), ko'rgazmalar, tashrifchilar sharhlari (TripAdvisor:
 * «Это было великолепно!», «Я ожидал большего»); grammatika — inkor
 * olmoshlari va ravishlari: НИКТО, НИЧЕГО, НИГДЕ, НИКОГДА… + НЕ + fe'l
 * (ega bor: Никто не звонил) va НЕКОГО, НЕЧЕГО, НЕГДЕ, НЕКУДА, НЕКОГДА,
 * НЕЗАЧЕМ + infinitiv (ega Д.п.da: Мне некого пригласить; urg'u НЕ ga);
 * predlog o'rtada: ни с кем / не с кем; zamon: было / будет.
 *
 * Zinapoya: ни- yoki не- → bo'sh joy → ma'nosi bir xil gap → bitta
 * so'z bilan javob → gap tuzish. Kollokatsiyalar (4–5-bosqich) asosan
 * A. Absalomov lug'atidan — inkorli iboralar. Lug'at 5 bosqich (50
 * so'z). Matnlar o'zimizniki. 18 ta mashq.
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

export const B2_08_ROUNDS: { title: string; words: VocabSeed[] }[] = [
  {
    title: "1-bosqich · Xalq san'ati",
    words: [
      w("🕸️", "Кружево", "krúzhiva", "ot", "To'r (to'qilgan bezak)", "Тонкая ткань с узорами из ниток.", "Вологодское кружево известно во всём мире.", "Vologda to'ri butun dunyoga mashhur."),
      w("🖼️", "Икона", "ikóna", "ot", "Ikona", "Священное изображение в православной церкви.", "В зале висит икона пятнадцатого века.", "Zalda XV asrga oid ikona osilgan."),
      w("💎", "Драгоценный камень", "dragatsénnyy kámin'", "ibora", "Qimmatbaho tosh", "Алмаз, рубин, изумруд и т. д.", "Корону украшает огромный драгоценный камень.", "Tojni ulkan qimmatbaho tosh bezab turibdi."),
      w("🍵", "Предметы быта", "pridmyéty býta", "ibora", "Ro'zg'or buyumlari", "Вещи, которыми пользуются дома каждый день.", "В музее показывают предметы быта крестьян.", "Muzeyda dehqonlarning ro'zg'or buyumlari ko'rsatiladi."),
      w("🧶", "Промысел", "prómysil", "ot", "Xalq hunarmandchiligi", "Традиционное ремесло.", "Гжель — известный народный промысел.", "Gjel — mashhur xalq hunarmandchiligi."),
      w("🎨", "Мастерская", "mastirskáya", "ot", "Ustaxona", "Помещение, где работает художник или мастер.", "Мастерская художника находится под самой крышей.", "Rassomning ustaxonasi tom ostida joylashgan."),
      w("🏛️", "Зодчество", "zódchistva", "ot", "Me'morchilik (qadimiy)", "Искусство строить здания, архитектура.", "Русское деревянное зодчество поражает красотой.", "Rus yog'och me'morchiligi go'zalligi bilan hayratga soladi."),
      w("🧑‍🤝‍🧑", "Этнография", "etnagráfiya", "ot", "Etnografiya", "Наука о народах, их культуре и быте.", "Этнография изучает традиции разных народов.", "Etnografiya turli xalqlarning an'analarini o'rganadi."),
      w("💰", "Купец", "kupyéts", "ot", "Savdogar (eski)", "Человек, который в старину занимался торговлей.", "Богатый купец подарил городу свою коллекцию.", "Boy savdogar shaharga o'z kolleksiyasini sovg'a qildi."),
      w("🏡", "Коренной житель", "karinnóy zhýtil'", "ibora", "Tub aholi vakili", "Человек, который родился и живёт на своей земле.", "Наш гид — коренной житель Петербурга.", "Gidimiz — tug'ma peterburglik."),
    ],
  },
  {
    title: "2-bosqich · Ko'rgazma va sharh",
    words: [
      w("📍", "Место проведения", "myésta pravidyéniya", "ibora", "O'tkaziladigan joy", "Где проходит выставка или событие.", "Место проведения выставки — Манеж.", "Ko'rgazma o'tkaziladigan joy — Manej."),
      w("🥂", "Вернисаж", "virnisásh", "ot", "Vernisaj (ko'rgazma ochilishi)", "Открытие художественной выставки.", "На вернисаж пришёл сам художник.", "Vernisajga rassomning o'zi keldi."),
      w("✍️", "Отзыв", "atzýf", "ot", "Sharh, fikr-mulohaza", "Мнение о чём-то, которое пишут или говорят.", "Я оставил отзыв о музее на сайте.", "Saytda muzey haqida sharh qoldirdim."),
      w("📊", "Рейтинг", "réyting", "ot", "Reyting", "Список лучших по оценкам.", "Этот музей вошёл в рейтинг лучших в мире.", "Bu muzey dunyoning eng yaxshilari reytingiga kirdi."),
      w("😮", "Впечатлять", "fpichatlyát'", "fe'l", "Hayratga solmoq", "Кого? Производить сильное впечатление. СВ: впечатлить.", "Размеры зала не могут не впечатлять.", "Zalning kattaligi hayratga solmay qo'ymaydi."),
      w("🤩", "Восхитительно", "vaskhitítil'na", "ravish", "Zavqli darajada go'zal", "Очень красиво, прекрасно.", "Восхитительно! Я никогда не видел ничего подобного.", "Ajoyib! Hech qachon bunday narsani ko'rmaganman."),
      w("😞", "Разочарован", "razacharóvan", "sifat (qisqa)", "Hafsalasi pir bo'lgan", "Недоволен, потому что ожидал лучшего.", "Я разочарован: выставка оказалась маленькой.", "Hafsalam pir bo'ldi: ko'rgazma kichkina ekan."),
      w("📈", "Значительный", "znachítil'nyy", "sifat", "Salmoqli, katta", "Большой, важный.", "Значительный вклад в коллекцию сделал купец.", "Kolleksiyaga salmoqli hissani savdogar qo'shgan."),
      w("🌀", "Инсталляция", "instalyátsiya", "ot", "Installyatsiya", "Произведение современного искусства из разных предметов.", "Посреди зала стоит огромная инсталляция из стекла.", "Zal o'rtasida shishadan ulkan installyatsiya turibdi."),
      w("📷", "Фотовыставка", "fotavýstafka", "ot", "Fotoko'rgazma", "Выставка фотографий.", "Фотовыставка «Лучшие фотографии России» открылась в марте.", "«Rossiyaning eng yaxshi suratlari» fotoko'rgazmasi martda ochildi."),
    ],
  },
  {
    title: "3-bosqich · Inkor so'zlari",
    words: [
      w("🙅", "Некого", "nyékava", "olmosh", "… qiladigan hech kim yo'q", "Кому? + инфинитив. Нет человека, которого можно…", "Мне некого пригласить в театр.", "Teatrga taklif qiladigan hech kimim yo'q."),
      w("🫙", "Нечего", "nyéchiva", "olmosh", "… qiladigan narsa yo'q", "Кому? + инфинитив. Нет ничего, что можно…", "В холодильнике нечего есть.", "Muzlatkichda yeydigan narsa yo'q."),
      w("🅿️", "Негде", "nyégdi", "ravish", "… qiladigan joy yo'q", "Кому? + инфинитив. Нет места, где можно…", "В центре негде припарковаться.", "Markazda mashina qo'yadigan joy yo'q."),
      w("🚫", "Некуда", "nyékuda", "ravish", "Boradigan joy yo'q", "Кому? + инфинитив. Нет места, куда можно…", "Вечером в деревне некуда пойти.", "Kechqurun qishloqda boradigan joy yo'q."),
      w("⏱️", "Некогда", "nyékagda", "ravish", "Vaqt yo'q (… qilishga)", "Кому? + инфинитив. Нет времени.", "Извини, мне сейчас некогда.", "Kechirasan, hozir vaqtim yo'q."),
      w("🤷", "Незачем", "nyézachim", "ravish", "Hojati yo'q", "Кому? + инфинитив. Нет причины, не нужно.", "Тебе незачем волноваться.", "Xavotirlanishingga hojat yo'q."),
      w("🆘", "Неоткуда", "nyéatkuda", "ravish", "Oladigan joy yo'q", "Кому? + инфинитив. Нет места, откуда…", "Ждать помощи было неоткуда.", "Yordam kutadigan joy yo'q edi."),
      w("0️⃣", "Ни разу", "ni rázu", "ibora", "Bir marta ham", "Ни одного раза.", "Я ни разу не был в Вологде.", "Vologdada bir marta ham bo'lmaganman."),
      w("🤐", "Ни с кем", "ni s kyem", "ibora", "Hech kim bilan", "Ни с одним человеком.", "Он ни с кем не поздоровался.", "U hech kim bilan salomlashmadi."),
      w("🙂", "Нисколько", "niskól'ka", "ravish", "Zarracha ham", "Совсем не.", "Я нисколько не устал.", "Zarracha ham charchamadim."),
    ],
  },
  {
    title: "4-bosqich · Kollokatsiyalar",
    words: [
      w("🤝", "Нечего говорить", "nyéchiva gavarít'", "ibora", "Gapirishning hojati yo'q", "Всё и так ясно.", "Нечего говорить, он настоящий мастер.", "Gapirishning hojati yo'q, u haqiqiy usta."),
      w("🤷‍♂️", "Нечего делать", "nyéchiva dyélat'", "ibora", "Iloj yo'q, nima ham qilardik", "Так получилось, ничего не изменишь.", "Музей закрыт — нечего делать, пойдём гулять.", "Muzey yopiq — iloj yo'q, sayr qilgani boramiz."),
      w("🚷", "И думать нечего", "i dúmat' nyéchiva", "ibora", "O'ylab o'tirishning keragi yo'q", "Это невозможно.", "Без билета туда попасть — и думать нечего.", "Chiptasiz u yerga kirish haqida o'ylab o'tirishning keragi yo'q."),
      w("👻", "Ни одной живой души", "ni adnóy zhyvóy dushý", "ibora", "Tirik jon yo'q", "Совсем никого.", "В зале не было ни одной живой души.", "Zalda bitta ham tirik jon yo'q edi."),
      w("✋", "Ни за что", "ni za shto", "ibora", "Aslo, hech qachon", "Никогда, ни в коем случае.", "Ни за что не пойду на эту выставку снова!", "Bu ko'rgazmaga aslo boshqa bormayman!"),
      w("🤏", "Это ничего не значит", "éta nichivó ni znáchit", "ibora", "Buning ahamiyati yo'q", "Это не важно.", "Одна плохая оценка — это ничего не значит.", "Bitta yomon baho — buning ahamiyati yo'q."),
      w("⚖️", "Ни в какое сравнение не идёт", "ni f kakóye sravnyéniye ni idyót", "ibora", "Taqqoslab bo'lmaydi", "С чем? Намного хуже или лучше.", "Копия ни в какое сравнение не идёт с оригиналом.", "Nusxani asl nusxa bilan taqqoslab bo'lmaydi."),
      w("💧", "Ни капли", "ni kápli", "ibora", "Sira, zarracha ham", "Совсем не.", "Я ни капли не жалею о поездке.", "Safardan sira afsuslanmayman."),
      w("⛔", "Никак нельзя", "nikák nil'zyá", "ibora", "Sira mumkin emas", "Совсем невозможно.", "Опаздывать на поезд никак нельзя.", "Poyezdga kechikish sira mumkin emas."),
      w("🙃", "Ничего подобного", "nichivó padóbnava", "ibora", "Hech ham unday emas", "Это совсем не так.", "Скучно? Ничего подобного, было очень интересно!", "Zerikarlimi? Hech ham unday emas, juda qiziq bo'ldi!"),
    ],
  },
  {
    title: "5-bosqich · Kollokatsiyalar",
    words: [
      w("🏃", "Нельзя терять ни минуты", "nil'zyá tiryát' ni minúty", "ibora", "Bir daqiqani ham boy bermaslik kerak", "Нужно очень спешить.", "Поезд скоро уходит — нельзя терять ни минуты!", "Poyezd tez orada jo'naydi — bir daqiqani ham boy bermaslik kerak!"),
      w("❓", "Пока ничего не известно", "paká nichivó ni izvyésna", "ibora", "Hozircha hech narsa ma'lum emas", "Ещё нет информации.", "Когда откроется музей, пока ничего не известно.", "Muzey qachon ochilishi hozircha ma'lum emas."),
      w("💨", "Из этого ничего не вышло", "iz étava nichivó ni výshla", "ibora", "Bundan hech narsa chiqmadi", "Не получилось.", "Мы хотели попасть на вернисаж, но из этого ничего не вышло.", "Vernisajga kirmoqchi edik, lekin bundan hech narsa chiqmadi."),
      w("🙅‍♀️", "Ни тот, ни другой", "ni tot, ni drugóy", "ibora", "Unisi ham, bunisi ham emas", "Ни один из двух.", "Мне не понравился ни тот, ни другой музей.", "Menga unisi ham, bunisi ham muzey yoqmadi."),
      w("👍", "Здесь нет ничего плохого", "zdyes' nyet nichivó plókhava", "ibora", "Buning hech qanday yomon joyi yo'q", "Это нормально.", "Ходить в музей одному — здесь нет ничего плохого.", "Muzeyga yolg'iz borish — buning hech qanday yomon joyi yo'q."),
      w("😐", "Ничего особенного", "nichivó asóbinnava", "ibora", "Hech qanday alohida narsa yo'q", "Обычно, не интересно.", "Выставка? Ничего особенного.", "Ko'rgazmami? Hech qanday alohida narsa yo'q."),
      w("📉", "Я ожидал большего", "ya azhydál ból'shiva", "ibora", "Ko'proq kutgandim", "Было хуже, чем я думал.", "Музей неплохой, но я ожидал большего.", "Muzey yomon emas, lekin ko'proq kutgandim."),
      w("✅", "Стоит посетить", "stóit pasitít'", "ibora", "Borib ko'rishga arziydi", "Хорошо бы сходить туда.", "Этот музей обязательно стоит посетить.", "Bu muzeyni albatta borib ko'rishga arziydi."),
      w("😊", "Получить удовольствие", "paluchít' udavól'stviye", "ibora", "Zavq olmoq", "От чего? Испытать радость.", "Мы смогли получить удовольствие от каждой минуты.", "Har bir daqiqadan zavq ola oldik."),
      w("🤫", "Ни слова", "ni slóva", "ibora", "Bir og'iz ham (so'z)", "Совсем ничего не сказать.", "Он не сказал ни слова.", "U bir og'iz ham so'z aytmadi."),
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
  prompt: "Sonni raqamlar bilan yozing (masalan: 1969)",
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

const TF = ["To'g'ri", "Noto'g'ri"];
const BADDAY =
  "Неудачный выходной\n\nВ субботу я решила сходить на новую выставку. Позвонила подругам, но никто не смог пойти со мной: у одной были гости, а другой было некогда. Ну что ж, пошла одна. У входа в музей была огромная очередь, а спросить, сколько ждать, было не у кого. Через час я наконец вошла в зал, но там негде было даже встать: везде стояли туристы. Аудиогидов уже не было, а на этикетках почти ничего не было написано. Я никогда не видела такой скучной экспозиции! Обсудить увиденное мне было не с кем, поэтому я ни с кем и не разговаривала. После выставки я хотела пообедать, но в музее не было кафе, и поесть было негде. Дома я поняла: нечего было ходить на выставку в субботу. В следующий раз пойду в будний день — и никого не буду ждать!";
const tf = (statement: string, isTrue: boolean, explanation?: string): SeedQuestion => ({
  prompt: `${BADDAY}||${statement}`,
  options: TF,
  correct: isTrue ? 0 : 1,
  explanation,
});
const CRAFTS =
  "Музеи, о которых знают не все\n\nВ Вологде есть Музей кружева. Вологодское кружево известно уже несколько веков: его плели местные мастерицы, а купцы продавали его в разных странах Европы. В музее можно увидеть старинные и современные работы, а в мастерской — попробовать сплести кружево самому.\n\nНедалеко от Иркутска, на берегу Ангары, находится музей под открытым небом «Тальцы». Сюда перевезли деревянные дома, церкви и башни из сибирских деревень. Здесь можно узнать, как жили коренные жители Сибири и русские крестьяне: какие у них были предметы быта, чем они занимались, какие праздники отмечали.\n\nВ Калининграде туристы могут спуститься в настоящую подводную лодку. Она служила на флоте больше двадцати лет, а теперь стала частью Музея Мирового океана. Посетители проходят по узким отсекам и представляют, как жили моряки, которым неделями некуда было выйти из лодки.\n\nА под Москвой работает частный музей техники Вадима Задорожного. Здесь собраны старинные автомобили, мотоциклы и самолёты. Почти всю коллекцию владелец собрал сам — по всему миру.";
const read = (question: string, options: string[]): SeedQuestion => ({
  prompt: `${CRAFTS}||${question}`,
  options,
  correct: 0,
});
const REVIEWS =
  "Отзыв первый. Меня зовут Пётр, я из Сургута. Вчера я был в Эрмитаже. Это было великолепно! Экспозиция очень впечатляет, я получил огромное удовольствие. Жаль только, что я никак не мог найти зал с картинами Рембрандта: спросить было не у кого, все смотрители были заняты.\n\nОтзыв второй. Я Мария, приехала из Милана. От одного небольшого музея в центре я ожидала большего. Ничего особенного: всего три зала, экспонатов мало, а на этикетках нет перевода. Иностранцу здесь нечего делать. Больше я туда не пойду.\n\nОтзыв третий. Меня зовут Джон, я из США. Музей деревянного зодчества — это что-то невероятное! Я нигде не видел таких красивых деревянных церквей. Время пролетело незаметно: мы гуляли там весь день и ни разу не заскучали. Этот музей стоит посетить!";
const hear = (question: string, options: string[]): SeedQuestion => ({
  prompt: question,
  audio: REVIEWS,
  options,
  correct: 0,
});

export const B2_08_EXERCISES: SeedExercise[] = [
  {
    title: "Tinglang va toping",
    skill: "Tinglash",
    kind: "listen",
    instructions: "Gap ovoz chiqarib o'qiladi. Eshitgan gapingizni toping: «ни-» va «не-» ni farqlang.",
    questions: [
      listen("Никто не пришёл на выставку.", ["Никто не пришёл на выставку.", "Некому прийти на выставку.", "Никто не придёт на выставку.", "Все пришли на выставку."]),
      listen("Мне некого пригласить.", ["Мне некого пригласить.", "Я никого не пригласил.", "Мне некого пригласить в кино.", "Ему некого пригласить."]),
      listen("Нам негде было ночевать.", ["Нам негде было ночевать.", "Мы нигде не ночевали.", "Нам негде будет ночевать.", "Им негде было ночевать."]),
      listen("Он ни с кем не разговаривал.", ["Он ни с кем не разговаривал.", "Ему не с кем было разговаривать.", "Он ни с кем не разговаривает.", "Она ни с кем не разговаривала."]),
      listen("Мне некогда, я спешу.", ["Мне некогда, я спешу.", "Мне некогда, я сплю.", "Ему некогда, он спешит.", "Нам некогда, мы спешим."]),
      listen("Здесь нечего смотреть.", ["Здесь нечего смотреть.", "Здесь ничего не видно.", "Здесь нечего делать.", "Тут нечего смотреть."]),
      listen("Я никогда не был в Кижах.", ["Я никогда не был в Кижах.", "Мне некогда было в Кижах.", "Я никогда не буду в Кижах.", "Я ни разу не был в Кижах."]),
      listen("Вечером некуда пойти.", ["Вечером некуда пойти.", "Вечером никуда не пойду.", "Вечером некуда поехать.", "Утром некуда пойти."]),
      listen("Это было великолепно!", ["Это было великолепно!", "Это было ужасно!", "Это будет великолепно!", "Это было восхитительно!"]),
      listen("Я ожидал большего.", ["Я ожидал большего.", "Я ожидал меньшего.", "Я ожидала большего.", "Мы ожидали большего."]),
    ],
  },
  {
    title: "Diktant",
    skill: "Eshitib yozish",
    kind: "dictation",
    instructions:
      "Gap ovoz chiqarib o'qiladi. Uni eshitib, ruscha yozing (kerak bo'lsa, qayta yoki sekinroq tinglang). Tinish belgilari hisobga olinmaydi.",
    questions: [
      "Никто не пришёл на выставку.",
      "Мне некого пригласить в театр.",
      "Нам негде было ночевать.",
      "Он ни с кем не разговаривал.",
      "Мне некогда, я спешу.",
      "Здесь нечего смотреть.",
      "Я никогда не был в Кижах.",
      "Этот музей стоит посетить.",
      "Ничего особенного.",
      "Нельзя терять ни минуты.",
    ].map((sentence) => ({ prompt: "Eshitganingizni yozing", audio: sentence, answer: sentence })),
  },
  {
    title: "Juftini toping",
    skill: "Juftlik",
    kind: "match",
    instructions: "Ruscha so'z yoki iborani o'zbekcha tarjimasi bilan ulang.",
    questions: [
      ["кружево|to'r (bezak)", "икона|ikona", "драгоценный камень|qimmatbaho tosh", "предметы быта|ro'zg'or buyumlari"],
      ["промысел|xalq hunarmandchiligi", "мастерская|ustaxona", "зодчество|me'morchilik", "этнография|etnografiya"],
      ["купец|savdogar", "коренной житель|tub aholi vakili", "место проведения|o'tkaziladigan joy", "вернисаж|vernisaj"],
      ["отзыв|sharh", "рейтинг|reyting", "впечатлять|hayratga solmoq", "восхитительно|zavqli go'zal"],
      ["разочарован|hafsalasi pir bo'lgan", "значительный|salmoqli", "инсталляция|installyatsiya", "фотовыставка|fotoko'rgazma"],
      ["некого|… qiladigan hech kim yo'q", "нечего|… qiladigan narsa yo'q", "негде|… qiladigan joy yo'q", "некуда|boradigan joy yo'q"],
      ["некогда|vaqt yo'q", "незачем|hojati yo'q", "ни разу|bir marta ham", "нисколько|zarracha ham"],
      ["ни одной живой души|tirik jon yo'q", "ни за что|aslo", "ни капли|sira", "ничего подобного|hech ham unday emas"],
      ["ничего особенного|hech qanday alohida narsa yo'q", "я ожидал большего|ko'proq kutgandim", "стоит посетить|borib ko'rishga arziydi", "получить удовольствие|zavq olmoq"],
      ["нельзя терять ни минуты|bir daqiqani ham boy bermaslik kerak", "пока ничего не известно|hozircha hech narsa ma'lum emas", "из этого ничего не вышло|bundan hech narsa chiqmadi", "ни тот, ни другой|unisi ham, bunisi ham emas"],
    ].map((options) => ({ prompt: "Juftlarni ulang", options })),
  },
  {
    title: "НИ- yoki НЕ-?",
    skill: "Inkor · 1-bosqich",
    kind: "choice",
    instructions:
      "НИКТО, НИЧЕГО, НИГДЕ, НИКОГДА… — gapda ega bor, fe'l oldida NE turadi: Он никогда не был в Кижах. НЕКОГО, НЕЧЕГО, НЕГДЕ, НЕКОГДА… + infinitiv — «qiladigan hech kim / narsa / joy / vaqt yo'q», ega Д.п.da: Ей некогда читать (urg'u НЕ ga). Predlog o'rtada turadi: ни с кем / не с кем. Mosini tanlang.",
    questions: [
      pick("Она осталась совсем одна, и ей было … посоветоваться.", ["не с кем", "ни с кем"]),
      pick("На этой улице нет кафе, здесь … пообедать.", ["негде", "нигде"]),
      pick("Наши гости … не пробовали пельмени.", ["никогда", "некогда"]),
      pick("Я очень тебя прошу, не рассказывай … об этом.", ["никому", "некому"]),
      pick("Все специалисты заняты, и Васе … получить информацию.", ["не у кого", "ни у кого"]),
      pick("Ты не знаешь, где моя кофта? Я … не могу её найти.", ["нигде", "негде"]),
      pick("У Олега плохое настроение, и он не хочет … разговаривать.", ["ни с кем", "не с кем"]),
      pick("Сегодня суббота, и в офисе … нет.", ["никого", "некого"]),
      pick("Не отвлекай меня, мне … сейчас с тобой говорить.", ["некогда", "никогда"]),
      pick("Когда я отдыхаю, я … не думаю.", ["ни о чём", "не о чем"]),
    ],
  },
  {
    title: "Inkor so'zini yozing",
    skill: "Inkor · 2-bosqich",
    kind: "fill",
    instructions:
      "Bo'sh joyga mos inkor olmoshi yoki ravishini yozing: никто, ничего, нигде, никуда, никогда, ни с кем… (fe'l oldida НЕ bor) yoki некого, нечего, негде, некуда, не с кем… (+ infinitiv). Kitobdagi mashq asosida.",
    questions: [
      fill("Мы ___ не можем найти оригинальные сувениры.", "нигде"),
      fill("Завтра она идёт на премьеру, но ей ___ надеть.", "нечего"),
      fill("В зале ___ не было, только смотритель.", "никого"),
      fill("Олег вошёл в комнату и ___ не поздоровался.", "ни с кем"),
      fill("У Аллы всё есть, ей ___ мечтать.", "не о чем", "Orzu qiladigan narsa yo'q — не о чем мечтать."),
      fill("Миша очень скромный: он ни разу ___ не ходил на свидание.", "ни с кем"),
      fill("Они живут в деревне, им ___ ходить по вечерам.", "некуда"),
      fill("Студенты ___ не были в Оружейной палате.", "никогда"),
      fill("Катя расстраивается, когда ей ___ обсудить увиденное.", "не с кем"),
      fill("Они уже всё знают, экскурсоводу ___ рассказать.", "нечего"),
    ],
  },
  {
    title: "Ma'nosi bir xil gap",
    skill: "Inkor · 3-bosqich",
    kind: "choice",
    instructions:
      "Некого, нечего, негде… bilan gapda ega Д.п.da turadi (мне, ей, нам), fe'l — infinitiv, NE qo'shilmaydi. O'tgan zamon — было, kelasi zamon — будет: Мне некого было спросить. Ma'nosi berilgan gapga mos variantni tanlang.",
    questions: [
      pick("У меня нет друга, с которым можно поговорить.", ["Мне не с кем поговорить.", "Я не с кем поговорить.", "Мне ни с кем поговорить.", "Меня не с кем поговорить."]),
      pick("Нет места, где можно припарковаться.", ["Негде припарковаться.", "Нигде припарковаться.", "Негде не припарковаться.", "Негде припарковался."]),
      pick("У неё нет времени читать.", ["Ей некогда читать.", "Она некогда читать.", "Ей никогда читать.", "Её некогда читать."]),
      pick("Вчера у нас не было темы для разговора.", ["Вчера нам не о чем было говорить.", "Вчера нам ни о чём было говорить.", "Вчера мы не о чем были говорить.", "Вчера нам не о чем был говорить."]),
      pick("Завтра студенту не у кого будет спросить.", ["Завтра студенту некого будет спросить.", "Завтра студенту некого будут спросить.", "Завтра студент некого будет спросить.", "Завтра студенту никого будет спросить."]),
      pick("В городе нет мест, куда можно пойти вечером.", ["Вечером в городе некуда пойти.", "Вечером в городе никуда пойти.", "Вечером в городе некуда не пойти.", "Вечером в городе некуда пойдёт."]),
      pick("Ему не нужно спешить.", ["Ему незачем спешить.", "Он незачем спешить.", "Ему низачем спешить.", "Ему незачем не спешить."]),
      pick("Мне не у кого взять словарь.", ["Lug'at oladigan hech kimim yo'q.", "Hech kimdan lug'at olmadim.", "Lug'at kerak emas.", "Lug'atni hech kimga bermayman."]),
      pick("Я ни у кого не брал словарь.", ["Hech kimdan lug'at olmadim.", "Lug'at oladigan hech kimim yo'q.", "Lug'at kerak emas.", "Lug'at hammada bor."]),
      pick("Никто не пришёл на встречу.", ["Uchrashuvga hech kim kelmadi.", "Uchrashuvga keladigan odam yo'q edi.", "Uchrashuvga hamma keldi.", "Uchrashuv bo'lmadi."]),
    ],
  },
  {
    title: "Inkor bilan javob bering",
    skill: "Inkor · 4-bosqich",
    kind: "type",
    instructions:
      "Savolga bitta inkor so'z bilan javob bering (kerak bo'lsa, predlog bilan): Кто звонил? — Никто. С кем ты говоришь? — Ни с кем.",
    questions: [
      ["Кто тебе звонил?", "никто"],
      ["Что ты купил?", "ничего"],
      ["Где ты был вчера?", "нигде"],
      ["Куда вы пойдёте в выходные?", "никуда"],
      ["Когда ты был в Кижах?", "никогда"],
      ["С кем ты говоришь?", "ни с кем"],
      ["О чём вы думаете?", "ни о чём"],
      ["Кому ты рассказал?", "никому"],
      ["У кого можно узнать?", "ни у кого"],
      ["Кого ты встретил на вечеринке?", "никого"],
    ].map(([prompt, answer]) => ({ prompt, answer })),
  },
  {
    title: "Urg'u: НЕ yoki НИ?",
    skill: "Urg'u",
    kind: "stress",
    instructions:
      "Muhim qoida: НЕКОГО, НЕЧЕГО, НЕГДЕ, НЕКУДА, НЕКОГДА — urg'u doim НЕ ga tushadi (не́кого). НИКОГО, НИЧЕГО, НИГДЕ — urg'u oxirida (никого́). So'zni eshiting va urg'uli bo'g'inni bosing.",
    questions: [
      stress("не|ко|го", 0, "не́кого"),
      stress("ни|ко|го", 2, "никого́"),
      stress("не|че|го", 0, "не́чего"),
      stress("ни|че|го", 2, "ничего́"),
      stress("не|ку|да", 0, "не́куда"),
      stress("не|где", 0, "не́где"),
      stress("ни|где", 1, "нигде́"),
      stress("не|ког|да", 0, "не́когда"),
      stress("мас|тер|ска|я", 2, "мастерска́я"),
      stress("эт|но|гра|фи|я", 2, "этногра́фия"),
    ],
  },
  {
    title: "Muzey raqamlarda",
    skill: "Raqamlar",
    kind: "number",
    instructions: "Gap ovoz chiqarib o'qiladi. Undagi sonni raqamlar bilan yozing.",
    questions: [
      num("Билет на выставку стоит пятьсот рублей.", "500"),
      num("Для студентов скидка пятьдесят процентов.", "50"),
      num("В коллекции музея тысяча двести экспонатов.", "1200"),
      num("Выставка работает до двадцать первого декабря.", "21"),
      num("Наш музей открылся в тысяча девятьсот девяносто восьмом году.", "1998"),
      num("Подводная лодка служила на флоте с тысяча девятьсот шестьдесят девятого года.", "1969"),
      num("Экскурсия продолжается сорок пять минут.", "45"),
      num("В музее под открытым небом больше сорока памятников архитектуры.", "40"),
      num("Посетителям старше шестидесяти пяти лет вход бесплатный.", "65"),
      num("За год музей получил три тысячи отзывов.", "3000"),
    ],
  },
  {
    title: "Xalq san'ati",
    skill: "Rasm",
    kind: "picture",
    instructions: "Rasmga qarab, mos so'zni tanlang.",
    questions: [
      pick("🕸️🧵", ["кружево", "икона", "оружие", "мозаика"]),
      pick("💎", ["драгоценный камень", "кружево", "икона", "предметы быта"]),
      pick("⚔️🛡️", ["оружие", "кружево", "посуда", "икона"]),
      pick("🪵🏠", ["деревянное зодчество", "каменный собор", "кружево", "оружие"]),
      pick("🍵🥄", ["предметы быта", "оружие", "драгоценный камень", "икона"]),
      pick("🪆", ["матрёшка", "икона", "кружево", "оружие"]),
      pick("🏺", ["керамика", "кружево", "оружие", "икона"]),
      pick("🧑‍🎨🖌️", ["мастерская художника", "оружейная палата", "подводная лодка", "планетарий"]),
      pick("🎨", ["живопись", "скульптура", "архитектура", "музыка"]),
      pick("🗿", ["скульптура", "живопись", "кружево", "икона"]),
    ],
  },
  {
    title: "Gap tuzing",
    skill: "Inkor · 5-bosqich",
    kind: "order",
    instructions: "So'zlarni to'g'ri tartibda bosib, gap tuzing.",
    questions: [
      build("Никто не пришёл на выставку."),
      build("Мне некого пригласить в театр."),
      build("В центре негде припарковаться."),
      build("Он ни с кем не разговаривал."),
      build("Я никогда не был в Вологде."),
      build("Извините, мне сейчас некогда."),
      build("В зале не было ни одной живой души."),
      build("Копия ни в какое сравнение не идёт с оригиналом."),
      build("Этот музей обязательно стоит посетить."),
      build("Я ни капли не жалею о поездке."),
    ],
  },
  {
    title: "Iborani yig'ing",
    skill: "Kollokatsiyalar",
    kind: "match",
    instructions: "Iboraning birinchi qismini ikkinchisi bilan ulang. Ko'pi Absalomov lug'atidan.",
    questions: [
      ["нечего|говорить", "и думать|нечего", "ни одной|живой души", "ни за|что"],
      ["это ничего|не значит", "ни в какое сравнение|не идёт", "ни|капли", "никак|нельзя"],
      ["ничего|подобного", "нечего|делать", "нельзя терять|ни минуты", "пока ничего|не известно"],
      ["из этого|ничего не вышло", "ни тот,|ни другой", "здесь нет|ничего плохого", "ничего|особенного"],
      ["я ожидал|большего", "стоит|посетить", "получить|удовольствие", "не сказать|ни слова"],
      ["народный|промысел", "драгоценный|камень", "предметы|быта", "деревянное|зодчество"],
      ["коренной|житель", "место|проведения", "оставить|отзыв", "вологодское|кружево"],
      ["мне некого|пригласить", "нам негде|ночевать", "ей некогда|читать", "им некуда|пойти"],
      ["ни с кем|не разговаривал", "никогда|не был", "нигде|не видел", "никому|не говори"],
      ["не с кем|посоветоваться", "не у кого|спросить", "не о чем|говорить", "не к кому|обратиться"],
    ].map((options) => ({ prompt: "Juftlarni ulang", options })),
  },
  {
    title: "Sharh va taassurot",
    skill: "Vaziyat",
    kind: "situation",
    instructions: "Vaziyatga mos ruscha gapni tanlang.",
    questions: [
      pick("Do'stingizga taklif qiladigan hech kimingiz yo'qligini aytasiz.", ["Мне некого пригласить.", "Мне никого пригласить.", "Я некого пригласить.", "Мне некого не пригласить."]),
      pick("Bu ko'rgazmada ko'radigan narsa yo'qligini aytasiz.", ["Здесь нечего смотреть.", "Здесь ничего смотреть.", "Здесь нечего не смотреть.", "Здесь нечем смотреть."]),
      pick("Hech qachon Kijida bo'lmaganingizni aytasiz.", ["Я никогда не был в Кижах.", "Я некогда не был в Кижах.", "Я никогда был в Кижах.", "Мне никогда не был в Кижах."]),
      pick("Hozir vaqtingiz yo'qligini aytasiz.", ["Извините, мне сейчас некогда.", "Извините, мне сейчас никогда.", "Извините, я сейчас некогда.", "Извините, меня сейчас некогда."]),
      pick("Ko'rgazmada hech kim bilan gaplashmaganingizni aytasiz.", ["Я ни с кем не разговаривал.", "Я не с кем не разговаривал.", "Я ни с кем разговаривал.", "Мне ни с кем не разговаривал."]),
      pick("Sharhda: ko'proq kutgan edingiz.", ["Я ожидал большего.", "Я ожидал больше.", "Я ожидал большим.", "Я ожидал большой."]),
      pick("Muzeyni do'stlaringizga tavsiya qilasiz.", ["Этот музей стоит посетить!", "Этот музей стоит посетил!", "Этот музей стоит посещать вчера!", "Этот музей стоят посетить!"]),
      pick("Sharhda: hech qanday alohida narsa yo'qligini yozasiz.", ["Ничего особенного.", "Ничто особенного.", "Ничего особенное.", "Нечего особенного."]),
      pick("Shahar markazida mashina qo'yadigan joy yo'qligini aytasiz.", ["В центре негде припарковаться.", "В центре нигде припарковаться.", "В центре негде не припарковаться.", "В центре негде припарковался."]),
      pick("Do'stingizga xavotirlanishga hojat yo'qligini aytasiz.", ["Тебе незачем волноваться.", "Ты незачем волноваться.", "Тебе низачем волноваться.", "Тебе незачем не волноваться."]),
    ],
  },
  {
    title: "Dam olish kunlari",
    skill: "Dialog",
    kind: "dialog",
    instructions: "Do'stingiz dam olish kunlari haqida so'rayapti. Uning gapiga mos javobni tanlang.",
    questions: [
      pick("Привет! Что делал в выходные?", ["Ничего особенного. Никуда не ходил.", "Ничего особенного. Некуда не ходил.", "Ничто особенного. Никуда не ходил.", "Ничего особенного. Никуда ходил."]),
      pick("Почему? Ты же хотел сходить на вернисаж.", ["Хотел, но мне не с кем было пойти.", "Хотел, но мне ни с кем было пойти.", "Хотел, но я не с кем было пойти.", "Хотел, но мне не с кем был пойти."]),
      pick("А Аня?", ["Ей было некогда: у неё экзамены.", "Ей было никогда: у неё экзамены.", "Она было некогда: у неё экзамены.", "Ей был некогда: у неё экзамены."]),
      pick("Понятно. А в субботу ты где был?", ["Нигде. Весь день сидел дома.", "Негде. Весь день сидел дома.", "Нигде не. Весь день сидел дома.", "Никуда. Весь день сидел дома."]),
      pick("Тебе не было скучно?", ["Ни капли! Я читал книгу о Кижах.", "Ни капля! Я читал книгу о Кижах.", "Не капли! Я читал книгу о Кижах.", "Ни каплю! Я читал книгу о Кижах."]),
      pick("А ты был в Кижах?", ["Нет, ни разу не был, но очень хочу.", "Нет, не разу не был, но очень хочу.", "Нет, ни разу был, но очень хочу.", "Нет, ни раз не был, но очень хочу."]),
      pick("Давай съездим туда летом вместе!", ["Отличная идея! Нельзя терять ни минуты — давай купим билеты.", "Отличная идея! Нельзя терять ни минута — давай купим билеты.", "Отличная идея! Нельзя терять не минуты — давай купим билеты.", "Отличная идея! Нельзя терять ни минуту — давай купим билеты."]),
      pick("А где мы будем ночевать?", ["Не волнуйся, там есть гостиница — нам будет где ночевать.", "Не волнуйся, там есть гостиница — нам будет негде ночевать.", "Не волнуйся, там есть гостиница — мы будем негде ночевать.", "Не волнуйся, там есть гостиница — нам будет нигде ночевать."]),
      pick("Кому ещё скажем?", ["Никому пока не говори — пусть будет сюрприз.", "Некому пока не говори — пусть будет сюрприз.", "Никому пока говори — пусть будет сюрприз.", "Никого пока не говори — пусть будет сюрприз."]),
      pick("Договорились!", ["Отлично, до встречи!", "Отлично, до встречу!", "Отлично, до встречей!", "Отлично, до встрече!"]),
    ],
  },
  {
    title: "Omadsiz dam olish kuni",
    skill: "O'qish",
    kind: "truefalse",
    instructions: "Ko'rgazmaga borgan qiz haqidagi matnni o'qing va gap to'g'ri yoki noto'g'ri ekanini belgilang. Inkor so'zlariga e'tibor bering!",
    questions: [
      tf("Подруги не смогли пойти с ней.", true),
      tf("У входа в музей не было очереди.", false, "Была огромная очередь."),
      tf("Ей было у кого спросить, сколько ждать.", false, "Спросить было не у кого."),
      tf("В зале было много туристов.", true),
      tf("Она взяла аудиогид.", false, "Аудиогидов уже не было."),
      tf("На этикетках была подробная информация.", false, "Почти ничего не было написано."),
      tf("Она ни с кем не разговаривала на выставке.", true),
      tf("В музее было кафе.", false, "Поесть было негде."),
      tf("Она решила, что ходить на выставку в субботу не стоило.", true),
      tf("В следующий раз она пойдёт в будний день.", true),
    ],
  },
  {
    title: "Kam ma'lum muzeylar",
    skill: "Matn bilan ishlash",
    kind: "reading",
    instructions: "Rossiyaning kam ma'lum muzeylari haqidagi matnni o'qing va savollarga javob bering.",
    questions: [
      read("Где находится Музей кружева?", ["В Вологде.", "В Иркутске.", "В Калининграде.", "В Москве."]),
      read("Кто плёл вологодское кружево?", ["Местные мастерицы.", "Купцы.", "Моряки.", "Монахи."]),
      read("Кто продавал кружево в Европе?", ["Купцы.", "Мастерицы.", "Туристы.", "Художники."]),
      read("Что можно сделать в мастерской музея?", ["Попробовать сплести кружево.", "Купить машину.", "Спуститься в лодку.", "Посмотреть фильм."]),
      read("Где находится музей «Тальцы»?", ["На берегу Ангары, недалеко от Иркутска.", "В центре Москвы.", "В Калининграде.", "В Вологде."]),
      read("Что перевезли в «Тальцы»?", ["Деревянные дома, церкви и башни.", "Подводную лодку.", "Старинные автомобили.", "Картины."]),
      read("О чём можно узнать в «Тальцах»?", ["Как жили коренные жители и крестьяне Сибири.", "Как строят корабли.", "Как летают самолёты.", "Как плетут кружево."]),
      read("Сколько лет подводная лодка служила на флоте?", ["Больше двадцати лет.", "Пять лет.", "Сто лет.", "Два года."]),
      read("Что представляют посетители в лодке?", ["Как жили моряки.", "Как ловят рыбу.", "Как строили лодку.", "Как плавают киты."]),
      read("Что собрано в музее Задорожного?", ["Старинные автомобили, мотоциклы и самолёты.", "Кружево.", "Иконы.", "Деревянные дома."]),
    ],
  },
  {
    title: "Tashrifchilar sharhlari",
    skill: "Tinglab tushunish",
    kind: "audiotext",
    instructions:
      "Uchta tashrifchining muzeylar haqidagi sharhini tinglang (kerak bo'lsa, qayta yoki sekinroq) va savollarga javob bering. Matn ekranda ko'rsatilmaydi.",
    questions: [
      hear("Где был Пётр?", ["В Эрмитаже.", "В Третьяковской галерее.", "В «Тальцах».", "В Кижах."]),
      hear("Какое впечатление у Петра?", ["Ему очень понравилось.", "Он разочарован.", "Ничего особенного.", "Он не помнит."]),
      hear("Что Пётр никак не мог найти?", ["Зал с картинами Рембрандта.", "Выход.", "Кафе.", "Гардероб."]),
      hear("Почему ему было не у кого спросить?", ["Все смотрители были заняты.", "Он не говорит по-русски.", "Музей закрывался.", "Он был один в зале."]),
      hear("Откуда Мария?", ["Из Милана.", "Из Сургута.", "Из США.", "Из Парижа."]),
      hear("Сколько залов в музее, где была Мария?", ["Три.", "Десять.", "Один.", "Двадцать."]),
      hear("Чего нет на этикетках?", ["Перевода.", "Названий.", "Цен.", "Фотографий."]),
      hear("Что Мария думает об этом музее?", ["Иностранцу там нечего делать.", "Это лучший музей.", "Туда стоит пойти с детьми.", "Там слишком много залов."]),
      hear("Где был Джон?", ["В музее деревянного зодчества.", "В Эрмитаже.", "В музее техники.", "В подводной лодке."]),
      hear("Что Джон говорит о времени?", ["Время пролетело незаметно.", "Ему было скучно.", "Он ушёл через час.", "Он опоздал."]),
    ],
  },
  {
    title: "Ayting",
    skill: "Talaffuz",
    kind: "speak",
    instructions: "Gapni eshiting, keyin mikrofon tugmasini bosib o'zingiz ayting. Не́кого, не́чего — urg'u НЕ ga!",
    questions: [
      "Никто не пришёл.",
      "Мне некого пригласить.",
      "Извините, мне сейчас некогда.",
      "Я никогда не был в Кижах.",
      "Здесь нечего смотреть.",
      "Я ожидал большего.",
      "Это было великолепно!",
      "Этот музей стоит посетить.",
      "Ничего подобного!",
      "Нельзя терять ни минуты!",
    ].map((phrase) => ({ prompt: phrase, answer: phrase })),
  },
];
