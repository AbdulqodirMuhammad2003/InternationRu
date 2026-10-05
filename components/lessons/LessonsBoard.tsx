"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Lock,
  LockKeyhole,
  BookOpen,
  ChevronDown,
  Medal,
  Clapperboard,
  Headphones,
  ListChecks,
  MessagesSquare,
  PenLine,
  Puzzle,
  Shapes,
  UserRound,
  Image as ImageIcon,
  Lightbulb,
  ArrowLeftRight,
  AudioLines,
  Hash,
  ListOrdered,
  TextCursorInput,
  Mic,
  Ear,
  BookOpenCheck,
  BookOpenText,
  Radio,
  GraduationCap,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import type {
  ClipKind,
  ExerciseKind,
  ExerciseQuestion,
  LevelRecord,
  UnitDetail,
  VocabRoundWithWords,
} from "@/lib/data";
import { loadExerciseQuestions, loadUnitWords, submitExerciseResult } from "@/app/actions";
import { UNIT_GRADIENTS } from "./unit-style";
import { VocabRoundFlow } from "./VocabRoundFlow";
import { ExerciseRun, RULE_PASS_PCT } from "./ExerciseRun";

type View = "main" | "exercise-run" | "clip";
type Section = "vocab" | "rule" | "exercises";

const EXERCISE_KIND_ICONS: Record<ExerciseKind, LucideIcon> = {
  listen: Headphones,
  choice: Shapes,
  dialog: MessagesSquare,
  ending: UserRound,
  anagram: Puzzle,
  type: PenLine,
  picture: ImageIcon,
  situation: Lightbulb,
  match: ArrowLeftRight,
  stress: AudioLines,
  number: Hash,
  order: ListOrdered,
  fill: TextCursorInput,
  speak: Mic,
  dictation: Ear,
  truefalse: BookOpenCheck,
  reading: BookOpenText,
  audiotext: Radio,
  rule: GraduationCap,
};

/** Darajalarning ruscha rasmiy nomlari (ТРКИ — rus tili bo'yicha davlat
 *  test tizimi shkalasi). */
const LEVEL_NAMES_RU: Record<string, string> = {
  A1: "Элементарный уровень",
  A2: "Базовый уровень",
  B1: "Первый уровень",
  B2: "Второй уровень",
};

const CLIP_KIND_LABELS: Record<ClipKind, string> = {
  film: "Film",
  multfilm: "Multfilm",
  hujjatli: "Hujjatli film",
  intervyu: "Intervyu",
};

/** Turli YouTube havola shakllarini (watch?v=, youtu.be/, shorts/) o'rnatib
 *  ko'rsatish uchun `/embed/VIDEO_ID` ko'rinishiga o'giradi, parchaning
 *  boshi/oxirini (soniyalarda) qo'shadi. Havola tushunarsiz bo'lsa `null`. */
function toYouTubeEmbedUrl(
  url: string,
  start: number | null,
  end: number | null
): string | null {
  try {
    const u = new URL(url);
    let id: string | null = null;
    if (u.hostname.includes("youtu.be")) {
      id = u.pathname.slice(1);
    } else if (u.hostname.includes("youtube.com")) {
      if (u.pathname === "/watch") id = u.searchParams.get("v");
      else if (u.pathname.startsWith("/shorts/")) id = u.pathname.split("/")[2];
      else if (u.pathname.startsWith("/embed/")) id = u.pathname.split("/")[2];
    }
    if (!id) return null;
    const params = new URLSearchParams({ rel: "0", hl: "ru", cc_lang_pref: "ru" });
    if (start) params.set("start", String(start));
    if (end) params.set("end", String(end));
    return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
  } catch {
    return null;
  }
}

/** Daraja imtihoni kartasi uchun holat (o'quvchining joriy darajasi). */
export interface BoardExam {
  level: string;
  /** Kartani bosib imtihon sahifasiga o'tish mumkinmi (daraja tugagan,
   *  imtihon davom etyapti yoki takrorlash rejasi bor). */
  open: boolean;
  passed: boolean;
  note: string;
}

/** Lug'at shu foizga yetgach dars keyingi bosqichi (qoida, mashqlar) ochiladi. */
const VOCAB_PASS_PCT = 86;

type CarouselItem = { kind: "unit"; unit: UnitDetail } | { kind: "exam"; level: string };

export function LessonsBoard({
  units,
  levels,
  exam,
}: {
  units: UnitDetail[];
  levels: LevelRecord[];
  exam: BoardExam;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [, startTransition] = useTransition();

  // "Joriy dars" kartasidan ?unit=ID bilan kelingan bo'lsa, mos darsni
  // birinchi render'dayoq avtomatik ochish (effektsiz, to'g'ridan-to'g'ri
  // boshlang'ich holat sifatida hisoblanadi).
  const unitParam = searchParams.get("unit");
  const linkedUnit = unitParam
    ? units.find((u) => u.id === Number(unitParam) && !u.locked) || null
    : null;

  // Faqat ochilgan darajalarning darslari ko'rsatiladi; sarlavhada esa
  // o'quvchining joriy (oxirgi ochilgan) darajasi turadi.
  const openLevels = levels.filter((l) => !l.locked);
  const currentLevel = openLevels[openLevels.length - 1] ?? levels[0];

  const [openUnitId, setOpenUnitId] = useState<number | null>(linkedUnit?.id ?? null);
  const [view, setView] = useState<View>("main");
  const [flowRoundId, setFlowRoundId] = useState<number | null>(null);
  const [activeExerciseId, setActiveExerciseId] = useState<number | null>(null);
  // Har bir boshlashda oshadi — shu bilan bir xil mashqni qayta boshlaganda
  // ExerciseRun o'z holatini noldan boshlaydi.
  const [runKey, setRunKey] = useState(0);
  const [clipNotice, setClipNotice] = useState(false);
  // Dars panelida qaysi yig'ma bo'lim ochiq (lug'at yoki mashqlar).
  const [openSection, setOpenSection] = useState<Section | null>("vocab");

  const visibleUnits = units.filter((u) => openLevels.some((l) => l.code === u.level_code));
  // Har bir darajaning oxirgi darsidan keyin — o'sha darajaning imtihon kartasi.
  const items: CarouselItem[] = visibleUnits.flatMap((unit, i): CarouselItem[] => {
    const next = visibleUnits[i + 1];
    return !next || next.level_code !== unit.level_code
      ? [{ kind: "unit", unit }, { kind: "exam", level: unit.level_code }]
      : [{ kind: "unit", unit }];
  });

  const openUnit = units.find((u) => u.id === openUnitId) || null;
  // So'zlar ham sahifa bilan kelmaydi — dars paneli ochilganda shu darsniki
  // fonda yuklanadi; bosqich so'zlar kelgach ochiladi.
  const [unitWords, setUnitWords] = useState<{ unitId: number; rounds: VocabRoundWithWords[] } | null>(null);
  const wordsRequest = useRef<{ unitId: number; promise: Promise<VocabRoundWithWords[]> } | null>(null);
  const [loadingRoundId, setLoadingRoundId] = useState<number | null>(null);
  const openUnitRounds = unitWords && unitWords.unitId === openUnitId ? unitWords.rounds : [];
  const flowRound = openUnitRounds.find((r) => r.id === flowRoundId) || null;
  const flowAllWords = openUnitRounds.flatMap((r) => r.words);
  // Savollar sahifa bilan kelmaydi (hajm chegarasi) — mashq boshlanganda yuklanadi.
  const [loadedQuestions, setLoadedQuestions] = useState<ExerciseQuestion[] | null>(null);
  const [loadingExerciseId, setLoadingExerciseId] = useState<number | null>(null);
  const activeExerciseBase = openUnit?.exercises.find((e) => e.id === activeExerciseId) || null;
  const activeExercise =
    activeExerciseBase && loadedQuestions ? { ...activeExerciseBase, questions: loadedQuestions } : null;

  function closePanel() {
    setOpenUnitId(null);
    setView("main");
    setFlowRoundId(null);
    setActiveExerciseId(null);
    setClipNotice(false);
  }

  function openUnitPanel(unit: UnitDetail) {
    if (unit.locked) return;
    setOpenUnitId(unit.id);
    setView("main");
    // Lug'at tugallangan bo'lsa — qoida (hali ishlanmagan bo'lsa), keyin mashqlar.
    const ruleLeft = !unitRuleDone(unit);
    setOpenSection(
      !unitVocabDone(unit) || unit.exercises.length === 0 ? "vocab" : ruleLeft ? "rule" : "exercises"
    );
    setClipNotice(false);
    if (unit.totalWords > 0) fetchUnitWords(unit.id);
  }

  /** Darsning so'zlarini yuklaydi (bir dars uchun bitta so'rov qayta
   *  ishlatiladi; `fresh` — progress o'zgargach qaytadan olish). */
  function fetchUnitWords(unitId: number, fresh = false) {
    if (!fresh && wordsRequest.current?.unitId === unitId) return wordsRequest.current.promise;
    const promise = loadUnitWords(unitId);
    const request = { unitId, promise };
    wordsRequest.current = request;
    promise.then(
      (rounds) => {
        if (wordsRequest.current === request) setUnitWords({ unitId, rounds });
      },
      () => {
        // Xato bo'lsa keyingi urinishda qaytadan so'raladi.
        if (wordsRequest.current === request) wordsRequest.current = null;
      }
    );
    return promise;
  }

  async function openRound(roundId: number) {
    if (!openUnit || loadingRoundId !== null) return;
    setLoadingRoundId(roundId);
    try {
      await fetchUnitWords(openUnit.id);
      setFlowRoundId(roundId);
    } catch {
      // Tarmoq xatosi — karta qayta bosilganda yana urinib ko'riladi.
    } finally {
      setLoadingRoundId(null);
    }
  }

  function roundPercent(round: UnitDetail["rounds"][number]) {
    if (round.word_count === 0) return 0;
    return Math.round((round.learned_count / round.word_count) * 100);
  }

  function unitVocabPercent(unit: UnitDetail) {
    if (unit.totalWords === 0) return 0;
    return Math.round((unit.learnedWords / unit.totalWords) * 100);
  }

  /** «Mashqlar» bo'limining foizi — qoida testi o'z bo'limida hisoblanadi. */
  function unitExercisePercent(unit: UnitDetail) {
    const exercises = unit.exercises.filter((e) => e.kind !== "rule");
    if (exercises.length === 0) return 0;
    return Math.round(exercises.reduce((s, e) => s + e.score_pct, 0) / exercises.length);
  }

  /** "Ruscha tomosha" faqat shu darsdagi barcha mashqlar kamida bir marta
   *  yakunlangach (ball qanday bo'lishidan qat'iy nazar) ochiladi. */
  function unitClipUnlocked(unit: UnitDetail) {
    return unit.exercises.length > 0 && unit.exercises.every((e) => e.attempted);
  }

  /** Dars bosqichlari ketma-ket ochiladi: lug'at VOCAB_PASS_PCT ga yetmaguncha qoida, qoida
   *  testidan kamida RULE_PASS_PCT natija olinmaguncha mashqlar yopiq. */
  function unitVocabDone(unit: UnitDetail) {
    return unit.totalWords === 0 || unitVocabPercent(unit) >= VOCAB_PASS_PCT;
  }

  function unitRuleDone(unit: UnitDetail) {
    return unit.exercises.every((e) => e.kind !== "rule" || e.score_pct >= RULE_PASS_PCT);
  }

  function finishExercise(exerciseId: number, answers: { questionId: number; correct: boolean }[]) {
    // revalidatePath ichidagi javob yangilangan sahifani ham olib keladi —
    // alohida router.refresh() serverda sahifani ikkinchi marta hisoblatardi.
    startTransition(async () => {
      await submitExerciseResult(exerciseId, answers);
    });
  }

  async function startExercise(exerciseId: number) {
    if (loadingExerciseId !== null) return;
    setLoadingExerciseId(exerciseId);
    try {
      const questions = await loadExerciseQuestions(exerciseId);
      setLoadedQuestions(questions);
      setActiveExerciseId(exerciseId);
      setRunKey((k) => k + 1);
      setView("exercise-run");
    } finally {
      setLoadingExerciseId(null);
    }
  }

  // Karusel markazidagi (faol) karta — u kattaroq ko'rsatiladi va faqat
  // shu karta bosilganda dars ochiladi; qolganlari bosilsa markazga keladi.
  const [activeCard, setActiveCard] = useState(0);

  function cardElements() {
    return Array.from(
      scrollerRef.current?.querySelectorAll<HTMLElement>("[data-card]") ?? []
    );
  }

  function scrollToCard(index: number, behavior: ScrollBehavior = "smooth") {
    const scroller = scrollerRef.current;
    const card = cardElements()[index];
    if (!scroller || !card) return;
    scroller.scrollTo({
      left: card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2,
      behavior,
    });
  }

  function syncActiveCard() {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cardElements().forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActiveCard(best);
  }

  // Sahifa ochilganda o'quvchining joriy darsini — oxirgi ochiq darsni —
  // markazga olib kelamiz.
  useEffect(() => {
    let current = 0;
    items.forEach((item, i) => {
      if (item.kind === "unit" ? !item.unit.locked : item.level === exam.level && exam.open) current = i;
    });
    setActiveCard(current);
    scrollToCard(current, "instant");
    if (linkedUnit && linkedUnit.totalWords > 0) fetchUnitWords(linkedUnit.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      {/* Joriy daraja — ruscha rasmiy nomi bilan (ТРКИ shkalasi) */}
      {currentLevel && (
        <div className="mb-4 flex items-center gap-3">
          <span className="font-display rounded-2xl bg-gradient-to-br from-azure-600 to-azure-900 px-3.5 py-2 text-lg font-bold text-white shadow-sm shadow-azure-900/30">
            {currentLevel.code}
          </span>
          <div className="min-w-0">
            <p lang="ru" className="font-display text-lg font-bold leading-tight text-ink-950 dark:text-ink-50">
              {LEVEL_NAMES_RU[currentLevel.code] ?? currentLevel.title}
            </p>
            <p className="text-sm text-ink-500 dark:text-ink-400">{currentLevel.description}</p>
          </div>
        </div>
      )}

      {visibleUnits.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-3xl bg-white p-12 text-center shadow-sm dark:bg-[#161b26] dark:shadow-none">
          <Lock size={28} className="text-ink-200 dark:text-ink-700" />
          <p className="font-semibold text-ink-700 dark:text-ink-200">Hozircha ochiq darslar yo'q</p>
        </div>
      ) : (
        <div>
          <div className="relative">
            <div
              ref={scrollerRef}
              onScroll={syncActiveCard}
              className="no-scrollbar flex min-w-0 snap-x snap-mandatory items-center gap-5 overflow-x-auto scroll-smooth px-[calc(50%-7.5rem)] py-8"
            >
              {items.map((item, i) => {
                if (item.kind === "exam") {
                  return (
                    <ExamCarouselCard
                      key={`exam-${item.level}`}
                      level={item.level}
                      exam={exam}
                      active={i === activeCard}
                      delay={i * 70}
                      onClick={() => {
                        const open = item.level === exam.level && exam.open;
                        if (i !== activeCard) scrollToCard(i);
                        else if (open) router.push("/exam");
                      }}
                    />
                  );
                }
                const unit = item.unit;
                const gradient = UNIT_GRADIENTS[unit.color] || UNIT_GRADIENTS.green;
                const active = i === activeCard;
                return (
                  <button
                    key={unit.id}
                    data-card
                    onClick={() => (active ? openUnitPanel(unit) : scrollToCard(i))}
                    aria-disabled={!!unit.locked}
                    style={{ animationDelay: `${i * 70}ms` }}
                    className={`group relative flex h-72 w-60 shrink-0 snap-center animate-fade-up flex-col items-center overflow-hidden rounded-[2rem] bg-gradient-to-br px-5 pb-6 pt-7 text-center text-white ring-1 ring-inset ring-white/10 transition-all duration-500 ease-out ${gradient} ${
                      active
                        ? "z-10 scale-110 shadow-2xl shadow-black/30"
                        : "scale-95 opacity-60 shadow-md hover:opacity-90"
                    } ${active && unit.locked ? "cursor-not-allowed" : ""}`}
                  >
                    {/* Dekorativ pufakchalar va yorug'lik — kartaga chuqurlik beradi */}
                    <span className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
                    <span className="pointer-events-none absolute -bottom-6 -right-4 h-24 w-24 rounded-full bg-black/10" />
                    <span className="pointer-events-none absolute bottom-16 right-10 h-8 w-8 rounded-full bg-black/10" />
                    <span className="pointer-events-none absolute -left-6 top-24 h-16 w-16 rounded-full bg-white/5" />

                    <span className="relative rounded-full bg-white/15 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                      {unit.level_code}
                    </span>
                    <p className="font-display relative mt-3 text-3xl font-bold tracking-tight">
                      {unit.title}
                    </p>
                    <p className="relative mt-2 text-sm leading-snug text-white/80 line-clamp-3">
                      {unit.subtitle}
                    </p>

                    <div className="relative mt-auto flex w-full flex-col items-center gap-2">
                      {unit.locked ? (
                        <span className="flex h-12 items-center gap-2 rounded-full bg-rose-500 px-6 text-base font-bold shadow-lg shadow-rose-900/40">
                          <LockKeyhole size={20} strokeWidth={2.4} />{" "}
                          {unit.lock_reason === "Tez orada" ? "Tez orada" : "Yopiq"}
                        </span>
                      ) : (
                        <div className="relative h-12 w-full overflow-hidden rounded-full bg-white/90 shadow-lg shadow-black/20">
                          <div
                            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 transition-[width] duration-700"
                            style={{ width: `${unit.percent}%` }}
                          />
                          <span className="relative flex h-full items-center justify-center text-lg font-extrabold text-ink-950">
                            {unit.percent}%
                          </span>
                        </div>
                      )}
                      <span className="min-h-5 text-center text-xs font-semibold leading-tight text-white/85">
                        {unit.locked
                          ? unit.lock_reason === "Tez orada"
                            ? ""
                            : unit.lock_reason
                          : unit.date_label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => scrollToCard(activeCard - 1)}
              disabled={activeCard === 0}
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-800 shadow-lg backdrop-blur transition-all hover:scale-105 disabled:opacity-0 dark:bg-[#161b26]/90 dark:text-ink-100"
              aria-label="Chapga aylantirish"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollToCard(activeCard + 1)}
              disabled={activeCard === items.length - 1}
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-800 shadow-lg backdrop-blur transition-all hover:scale-105 disabled:opacity-0 dark:bg-[#161b26]/90 dark:text-ink-100"
              aria-label="O’ngga aylantirish"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Sahifa nuqtalari */}
          <div className="mt-2 flex items-center justify-center gap-1.5">
            {items.map((item, i) => (
              <button
                key={item.kind === "unit" ? item.unit.id : `exam-${item.level}`}
                onClick={() => scrollToCard(i)}
                aria-label={item.kind === "unit" ? item.unit.title : `${item.level} imtihoni`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeCard
                    ? "w-6 bg-gold-400"
                    : "w-2 bg-ink-200 hover:bg-ink-300 dark:bg-white/15"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Fon qorong’ulashuvi */}
      {openUnit && <div className="fixed inset-0 z-40 bg-black/30" onClick={closePanel} />}

      {/* Dars yon paneli (mashq bajarilayotganda butun ekranga kengayadi) */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full flex-col bg-white shadow-2xl transition-all duration-300 dark:bg-[#121620] ${
          openUnit ? "translate-x-0" : "translate-x-full"
        } ${view === "exercise-run" ? "w-full" : "w-full max-w-md"}`}
      >
        {openUnit && (
          <>
            <div className="flex items-center justify-between border-b border-ink-100 px-6 py-4 dark:border-white/10">
              <h2 className="font-display text-lg font-bold text-ink-950 dark:text-ink-50">
                {view !== "main" ? (
                  <button
                    onClick={() => setView("main")}
                    className="mr-2 inline-flex items-center text-ink-400 hover:text-ink-700 dark:text-ink-500 dark:hover:text-ink-200"
                  >
                    <ChevronLeft size={18} />
                  </button>
                ) : null}
                {openUnit.title}
              </h2>
              <button onClick={closePanel} className="rounded-full p-1.5 text-ink-500 transition-colors hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-white/10">
                <X size={20} />
              </button>
            </div>

            <div
              className={`flex-1 overflow-y-auto px-6 py-5 ${
                view === "exercise-run" ? "flex items-center justify-center" : ""
              }`}
            >
              {view === "main" && (
                <div className="flex flex-col gap-4">
                  <LessonSection
                    title="Lug'at"
                    subtitle={`${openUnit.totalWords} ta so'z`}
                    percent={unitVocabPercent(openUnit)}
                    icon={<BookOpen size={22} />}
                    gradient="from-azure-500 to-azure-900"
                    open={openSection === "vocab"}
                    disabled={openUnit.totalWords === 0}
                    onToggle={() => setOpenSection(openSection === "vocab" ? null : "vocab")}
                  >
                    {openUnit.rounds.map((round, i) => {
                      const pct = roundPercent(round);
                      return (
                        <button
                          key={round.id}
                          onClick={() => openRound(round.id)}
                          aria-busy={loadingRoundId === round.id}
                          style={{ animationDelay: `${i * 50}ms` }}
                          className={`relative flex w-40 shrink-0 animate-fade-up snap-start flex-col rounded-2xl bg-white px-3.5 pb-3.5 pt-9 text-left shadow-sm ring-1 ring-ink-950/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-white/5 dark:shadow-none dark:ring-white/10 ${
                            loadingRoundId === round.id ? "animate-pulse opacity-70" : ""
                          }`}
                        >
                          <span
                            className={`absolute left-0 top-0 rounded-br-xl rounded-tl-2xl px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${
                              pct === 100 ? "bg-gold-500" : "bg-mint-500"
                            }`}
                          >
                            {pct === 100 ? "Tugallandi" : "Faol"}
                          </span>
                          {pct === 100 && (
                            <Medal size={26} className="absolute right-2.5 top-2 text-gold-500" />
                          )}
                          <p className="font-semibold text-ink-950 dark:text-ink-50">{round.title}</p>
                          <p className="mb-3 mt-0.5 text-xs text-ink-500 dark:text-ink-400">
                            {round.word_count} ta so'z
                          </p>
                          <div className="mt-auto flex items-center gap-2">
                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
                              <div
                                className="h-full rounded-full bg-mint-500 transition-[width] duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-ink-600 dark:text-ink-300">{pct}%</span>
                          </div>
                        </button>
                      );
                    })}
                  </LessonSection>

                  {openUnit.exercises.some((ex) => ex.kind === "rule") && (
                    <LessonSection
                      title="Qoida"
                      subtitle="Grammatika sodda tilda + 10 ta test"
                      percent={Math.round(
                        openUnit.exercises.filter((ex) => ex.kind === "rule").reduce((s, ex) => s + ex.score_pct, 0) /
                          openUnit.exercises.filter((ex) => ex.kind === "rule").length
                      )}
                      icon={<GraduationCap size={22} />}
                      gradient="from-gold-400 to-gold-700"
                      open={openSection === "rule"}
                      disabled={false}
                      lockNote={
                        unitVocabDone(openUnit)
                          ? null
                          : `Qoida lug'at ${VOCAB_PASS_PCT}% ga yetgach ochiladi.`
                      }
                      onToggle={() => setOpenSection(openSection === "rule" ? null : "rule")}
                      delay={60}
                    >
                      {openUnit.exercises
                        .filter((ex) => ex.kind === "rule")
                        .map((ex) => (
                          <button
                            key={ex.id}
                            onClick={() => startExercise(ex.id)}
                            aria-busy={loadingExerciseId === ex.id}
                            className={`relative flex w-56 shrink-0 animate-fade-up snap-start flex-col rounded-2xl bg-white px-3.5 pb-3.5 pt-9 text-left shadow-sm ring-1 ring-ink-950/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-white/5 dark:shadow-none dark:ring-white/10 ${
                              loadingExerciseId === ex.id ? "animate-pulse opacity-70" : ""
                            }`}
                          >
                            <span className="absolute left-0 top-0 rounded-br-xl rounded-tl-2xl bg-gold-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                              Qoida
                            </span>
                            {ex.score_pct === 100 ? (
                              <Medal size={26} className="absolute right-2.5 top-2 text-gold-500" />
                            ) : (
                              <GraduationCap size={22} className="absolute right-3 top-2.5 text-ink-400 dark:text-ink-500" />
                            )}
                            <p className="font-semibold leading-snug text-ink-950 dark:text-ink-50">
                              {ex.title.replace(/^Qoida:\s*/, "")}
                            </p>
                            <p className="mb-3 mt-0.5 text-xs text-ink-500 dark:text-ink-400">
                              Tushuntirish va {ex.question_count} ta test
                            </p>
                            <div className="mt-auto flex items-center gap-2">
                              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
                                <div
                                  className="h-full rounded-full bg-gold-500 transition-[width] duration-500"
                                  style={{ width: `${ex.score_pct}%` }}
                                />
                              </div>
                              <span className="text-xs font-semibold text-ink-600 dark:text-ink-300">{ex.score_pct}%</span>
                            </div>
                          </button>
                        ))}
                    </LessonSection>
                  )}

                  {openUnit.clip_url && (
                    <>
                      <button
                        onClick={() =>
                          unitClipUnlocked(openUnit) ? setView("clip") : setClipNotice(true)
                        }
                        style={{ animationDelay: "60ms" }}
                        className={`flex animate-fade-up items-center gap-4 rounded-2xl p-4 text-left transition-all duration-200 ${
                          unitClipUnlocked(openUnit)
                            ? "bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-md shadow-gold-700/20 hover:-translate-y-0.5"
                            : "bg-ink-50 hover:bg-ink-100/70 dark:bg-white/5 dark:hover:bg-white/10"
                        }`}
                      >
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                            unitClipUnlocked(openUnit)
                              ? "bg-white/20"
                              : "bg-ink-200 text-ink-600 dark:bg-white/10 dark:text-ink-300"
                          }`}
                        >
                          {unitClipUnlocked(openUnit) ? <Clapperboard size={22} /> : <Lock size={20} />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-xs ${
                              unitClipUnlocked(openUnit) ? "text-white/75" : "text-ink-500 dark:text-ink-400"
                            }`}
                          >
                            Ruscha tomosha
                            {openUnit.clip_kind ? ` · ${CLIP_KIND_LABELS[openUnit.clip_kind]}` : ""}
                          </p>
                          <p
                            className={`truncate font-semibold ${
                              unitClipUnlocked(openUnit) ? "" : "text-ink-800 dark:text-ink-100"
                            }`}
                          >
                            {openUnit.clip_title || "Ruscha parcha"}
                          </p>
                        </div>
                        {!unitClipUnlocked(openUnit) && (
                          <span className="rounded-full bg-ink-200/70 px-2.5 py-1 text-xs font-semibold text-ink-600 dark:bg-white/10 dark:text-ink-300">
                            Yopiq
                          </span>
                        )}
                      </button>
                      {clipNotice && !unitClipUnlocked(openUnit) && (
                        <p className="-mt-2 animate-fade-up rounded-xl bg-gold-50 px-3 py-2 text-xs text-gold-700 dark:bg-gold-950/40 dark:text-gold-300">
                          Mashqlarni bajarib bo'lgach, darsni ruscha film yoki multfilmdan parcha
                          bilan yakunlaysiz.
                        </p>
                      )}
                    </>
                  )}

                  <LessonSection
                    title="Mashqlar"
                    subtitle={`${openUnit.exercises.filter((ex) => ex.kind !== "rule").length} ta mashq`}
                    percent={unitExercisePercent(openUnit)}
                    icon={<ListChecks size={22} />}
                    gradient="from-mint-500 to-mint-900"
                    open={openSection === "exercises"}
                    disabled={openUnit.exercises.length === 0}
                    lockNote={
                      !unitVocabDone(openUnit)
                        ? `Mashqlar lug'at ${VOCAB_PASS_PCT}% ga yetgach ochiladi.`
                        : !unitRuleDone(openUnit)
                          ? `Mashqlar qoida testidan kamida ${RULE_PASS_PCT}% olgach ochiladi.`
                          : null
                    }
                    onToggle={() => setOpenSection(openSection === "exercises" ? null : "exercises")}
                    delay={120}
                  >
                    {openUnit.exercises.filter((ex) => ex.kind !== "rule").map((ex, i) => {
                      const KindIcon = EXERCISE_KIND_ICONS[ex.kind] ?? ListChecks;
                      return (
                        <button
                          key={ex.id}
                          onClick={() => startExercise(ex.id)}
                          aria-busy={loadingExerciseId === ex.id}
                          style={{ animationDelay: `${i * 50}ms` }}
                          className={`relative flex w-40 shrink-0 animate-fade-up snap-start flex-col rounded-2xl bg-white px-3.5 pb-3.5 pt-9 text-left shadow-sm ring-1 ring-ink-950/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-white/5 dark:shadow-none dark:ring-white/10 ${
                            loadingExerciseId === ex.id ? "animate-pulse opacity-70" : ""
                          }`}
                        >
                          <span className="absolute left-0 top-0 rounded-br-xl rounded-tl-2xl bg-mint-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                            {ex.skill_label}
                          </span>
                          {ex.score_pct === 100 ? (
                            <Medal size={26} className="absolute right-2.5 top-2 text-gold-500" />
                          ) : (
                            <KindIcon size={22} className="absolute right-3 top-2.5 text-ink-400 dark:text-ink-500" />
                          )}
                          <p className="font-semibold leading-snug text-ink-950 dark:text-ink-50">
                            {i + 1}. {ex.title}
                          </p>
                          <p className="mb-3 mt-0.5 text-xs text-ink-500 dark:text-ink-400">
                            {ex.question_count} ta savol
                          </p>
                          <div className="mt-auto flex items-center gap-2">
                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
                              <div
                                className="h-full rounded-full bg-mint-500 transition-[width] duration-500"
                                style={{ width: `${ex.score_pct}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-ink-600 dark:text-ink-300">
                              {ex.score_pct}%
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </LessonSection>
                </div>
              )}

              {view === "exercise-run" && activeExercise && (
                <div className="mx-auto w-full max-w-xl py-4">
                  <ExerciseRun
                    key={runKey}
                    exercise={activeExercise}
                    onFinish={(answers) => finishExercise(activeExercise.id, answers)}
                    onRetry={() => startExercise(activeExercise.id)}
                    onDone={(resultPct) => {
                      setView("main");
                      // Qoida testidan o'tilgach navbat — mashqlar.
                      if (activeExercise.kind === "rule" && resultPct >= RULE_PASS_PCT) setOpenSection("exercises");
                    }}
                  />
                </div>
              )}

              {view === "clip" && openUnit.clip_url && (
                <div className="flex flex-col gap-3">
                  <div>
                    {openUnit.clip_kind && (
                      <span className="mb-1 inline-block rounded-full bg-gold-100 px-2 py-0.5 text-[10px] font-bold uppercase text-gold-700 dark:bg-gold-950/40 dark:text-gold-300">
                        {CLIP_KIND_LABELS[openUnit.clip_kind]}
                      </span>
                    )}
                    <p className="font-display text-lg font-bold text-ink-950 dark:text-ink-50">
                      {openUnit.clip_title}
                    </p>
                  </div>
                  {(() => {
                    const embedUrl = toYouTubeEmbedUrl(
                      openUnit.clip_url!,
                      openUnit.clip_start,
                      openUnit.clip_end
                    );
                    if (!embedUrl) {
                      return (
                        <p className="text-sm text-ink-600/70 dark:text-ink-300/60">
                          Video havolasi noto'g'ri formatda.
                        </p>
                      );
                    }
                    return (
                      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-md">
                        <iframe
                          src={embedUrl}
                          title={openUnit.clip_title || `${openUnit.title} — ruscha parcha`}
                          className="h-full w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    );
                  })()}
                  <p className="rounded-xl bg-ink-50 px-3 py-2 text-xs text-ink-600 dark:bg-white/5 dark:text-ink-300">
                    Hamma so'zni tushunish shart emas. Bu darsda o'rgangan so'zlaringizni jonli
                    ruscha nutqda eshitishga harakat qiling.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {flowRound && (
        <VocabRoundFlow
          round={flowRound}
          allWords={flowAllWords}
          showPictures={(openUnit?.order_index ?? 0) <= 10}
          onClose={() => {
            setFlowRoundId(null);
            router.refresh();
            if (openUnitId !== null) fetchUnitWords(openUnitId, true);
          }}
        />
      )}
    </div>
  );
}

/** Daraja oxiridagi imtihon kartasi. Oldingi (o'tilgan) darajalarda —
 *  «Topshirilgan»; joriy darajada daraja tugaguncha yopiq, keyin bosilsa
 *  imtihon sahifasi ochiladi (o'tish bali 80 % — keyingi daraja ochiladi). */
function ExamCarouselCard({
  level,
  exam,
  active,
  delay,
  onClick,
}: {
  level: string;
  exam: BoardExam;
  active: boolean;
  delay: number;
  onClick: () => void;
}) {
  const current = level === exam.level;
  const passed = !current || exam.passed;
  const open = current && exam.open && !exam.passed;
  return (
    <button
      data-card
      onClick={onClick}
      aria-disabled={!open}
      style={{ animationDelay: `${delay}ms` }}
      className={`group relative flex h-72 w-60 shrink-0 snap-center animate-fade-up flex-col items-center overflow-hidden rounded-[2rem] bg-gradient-to-br px-5 pb-6 pt-7 text-center text-white ring-1 ring-inset ring-white/10 transition-all duration-500 ease-out ${
        passed ? "from-gold-400 to-gold-700" : "from-azure-600 to-azure-900"
      } ${active ? "z-10 scale-110 shadow-2xl shadow-black/30" : "scale-95 opacity-60 shadow-md hover:opacity-90"} ${
        active && !open ? "cursor-default" : ""
      }`}
    >
      <span className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
      <span className="pointer-events-none absolute -bottom-6 -right-4 h-24 w-24 rounded-full bg-black/10" />

      <span className="relative rounded-full bg-white/15 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
        {level}
      </span>
      <span className="relative mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
        {passed ? <Trophy size={28} /> : <GraduationCap size={28} />}
      </span>
      <p className="font-display relative mt-3 text-2xl font-bold tracking-tight">Daraja imtihoni</p>
      <p className="relative mt-1 text-sm leading-snug text-white/80">40 savol · 40 daqiqa · o'tish bali 80%</p>

      <div className="relative mt-auto flex w-full flex-col items-center gap-2">
        {passed ? (
          <span className="flex h-12 items-center gap-2 rounded-full bg-white/90 px-6 text-base font-bold text-gold-700 shadow-lg shadow-black/20">
            <Trophy size={20} /> Topshirilgan
          </span>
        ) : open ? (
          <span className="flex h-12 items-center rounded-full bg-white/90 px-6 text-base font-bold text-azure-800 shadow-lg shadow-black/20">
            Imtihonga o'tish
          </span>
        ) : (
          <span className="flex h-12 items-center gap-2 rounded-full bg-rose-500 px-6 text-base font-bold shadow-lg shadow-rose-900/40">
            <LockKeyhole size={20} strokeWidth={2.4} /> Yopiq
          </span>
        )}
        <span className="min-h-5 text-center text-xs font-semibold leading-tight text-white/85">
          {passed ? "Keyingi daraja ochilgan" : open ? exam.note : "Barcha darslarni 80% ga yetkazing"}
        </span>
      </div>
    </button>
  );
}

/** Dars panelidagi yig'ma bo'lim: sarlavha kartasi bosilganda ostida
 *  kartalar qatori (lug'at bosqichlari yoki mashqlar) ochiladi. */
function LessonSection({
  title,
  subtitle,
  percent,
  icon,
  gradient,
  open,
  disabled,
  lockNote = null,
  onToggle,
  delay = 0,
  children,
}: {
  title: string;
  subtitle: string;
  percent: number;
  icon: React.ReactNode;
  gradient: string;
  open: boolean;
  disabled: boolean;
  /** Bo'lim yopiq bo'lsa — sababi (kartalar o'rniga ko'rsatiladi). */
  lockNote?: string | null;
  onToggle: () => void;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={`animate-fade-up rounded-3xl transition-colors duration-300 ${
        open ? "bg-ink-50 dark:bg-white/5" : ""
      }`}
    >
      <button
        onClick={onToggle}
        disabled={disabled}
        aria-expanded={open}
        className={`relative flex w-full items-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br p-5 text-left text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50 ${gradient}`}
      >
        <span className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <span className="pointer-events-none absolute -bottom-8 right-16 h-20 w-20 rounded-full bg-black/10" />
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-gold-500 shadow-sm">
          {icon}
        </span>
        <span className="relative min-w-0 flex-1">
          <span className="font-display block text-xl font-bold">{title}</span>
          <span className="block text-sm text-white/80">{subtitle}</span>
          <span className="mt-2 flex items-center gap-2">
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/25">
              <span
                className="block h-full rounded-full bg-white transition-[width] duration-500"
                style={{ width: `${percent}%` }}
              />
            </span>
            <span className="text-xs font-bold">{percent}%</span>
          </span>
        </span>
        {lockNote ? (
          <Lock size={20} className="relative shrink-0" />
        ) : (
          <ChevronDown
            size={22}
            className={`relative shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        )}
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          {lockNote ? (
            <p className="mx-4 my-4 flex items-center gap-2 rounded-xl bg-gold-50 px-3 py-2 text-sm text-gold-700 dark:bg-gold-950/40 dark:text-gold-300">
              <Lock size={16} className="shrink-0" />
              {lockNote}
            </p>
          ) : (
            <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-4 pb-4 pt-4">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
}
