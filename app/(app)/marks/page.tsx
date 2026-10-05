import { getSession } from "@/lib/auth";
import { getLevelBoard } from "@/lib/data";
import { Avatar } from "@/components/Avatar";

/** Dars natijasi doirasining rangi: 80%+ — yashil, 50–79% — sariq, undan past — qizil. */
function cellColor(pct: number) {
  if (pct >= 80) return "bg-mint-500 text-white";
  if (pct >= 50) return "bg-gold-400 text-ink-950";
  return "bg-rose-500 text-white";
}

/** Telefondagi katak yorlig'i: «12-dars» → «12», «Takrorlash» → «T». */
function shortLabel(title: string) {
  return title.match(/^\d+/)?.[0] ?? title.slice(0, 1).toUpperCase();
}

type Board = Awaited<ReturnType<typeof getLevelBoard>>;
type Student = Board["students"][number];

/** Daraja imtihoni natijasi: o'quvchining o'zida foiz, boshqalarda faqat
 *  o'tdi (✓) / o'tmadi (✗); topshirilmagan bo'lsa — «—». */
function ExamBadge({ exam }: { exam: Student["exam"] }) {
  if (!exam.attempted) return <span className="text-ink-300 dark:text-ink-600">—</span>;
  if (exam.pct !== null) {
    return (
      <span
        title={exam.passed ? "Imtihondan o'tgan" : "Imtihondan o'tmagan"}
        className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full px-1.5 text-xs font-bold ${cellColor(exam.pct)}`}
      >
        {exam.pct}
      </span>
    );
  }
  return (
    <span
      title={exam.passed ? "Imtihondan o'tgan" : "Imtihondan o'tmagan"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-base font-bold ${
        exam.passed ? "bg-mint-500 text-white" : "bg-rose-500 text-white"
      }`}
    >
      {exam.passed ? "✓" : "✗"}
    </span>
  );
}

/** Telefon uchun o'quvchi kartasi: darslar raqamlangan kataklar to'rida —
 *  gorizontal aylantirishsiz hammasi bir qarashda ko'rinadi. */
function StudentCard({ student, units, rank }: { student: Student; units: Board["units"]; rank: number }) {
  const started = student.percents.filter((p) => p !== null).length;
  const done = student.percents.filter((p) => p !== null && p >= 80).length;
  return (
    <li
      className={`rounded-2xl p-4 shadow-sm ring-1 ${
        student.is_current_user
          ? "bg-gold-50 ring-gold-300/60 dark:bg-[#2a2517] dark:ring-gold-700/40"
          : "bg-white ring-ink-950/5 dark:bg-[#161b26] dark:ring-white/10"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="w-5 shrink-0 text-center text-xs font-semibold text-ink-400">{rank}</span>
        <Avatar name={student.name} photoUrl={student.avatar_url} size={40} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-ink-950 dark:text-ink-50">
            {student.name}
            {student.is_current_user && (
              <span className="ml-1.5 rounded-full bg-gold-400 px-2 py-0.5 align-middle text-[10px] font-bold text-ink-950">
                siz
              </span>
            )}
          </p>
          <p className="text-xs text-ink-500 dark:text-ink-400">
            {started === 0 ? "Hali boshlanmagan" : `${started} ta dars boshlangan · ${done} tasi 80%+`}
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-6 gap-1.5">
        {units.map((unit, j) => {
          const pct = student.percents[j];
          return (
            <div
              key={unit.id}
              title={`${unit.title}: ${unit.subtitle}`}
              className={`flex aspect-square flex-col items-center justify-center rounded-xl ${
                pct === null ? "bg-ink-100/70 text-ink-400 dark:bg-white/5 dark:text-ink-500" : cellColor(pct)
              }`}
            >
              <span className="text-[10px] font-semibold leading-none opacity-75">{shortLabel(unit.title)}</span>
              <span className="mt-0.5 text-sm font-bold leading-none">{pct === null ? "—" : pct}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl bg-ink-50/70 px-3 py-2 dark:bg-white/5">
        <span className="text-xs font-semibold text-ink-600 dark:text-ink-300">Daraja imtihoni</span>
        <ExamBadge exam={student.exam} />
      </div>
    </li>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-500 dark:text-ink-400">
      <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-mint-500" /> 80%+</span>
      <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-gold-400" /> 50–79%</span>
      <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> 50% dan past</span>
      <span className="flex items-center gap-1.5"><span className="text-ink-300 dark:text-ink-600">—</span> boshlanmagan</span>
      <span className="flex items-center gap-1.5"><span className="font-bold text-mint-600">✓</span>/<span className="font-bold text-rose-500">✗</span> imtihondan o'tgan / o'tmagan</span>
    </div>
  );
}

export default async function MarksPage() {
  const session = await getSession();
  const board = await getLevelBoard(session!.userId);
  // Telefonda o'z kartangiz doim birinchi.
  const mobileStudents = [
    ...board.students.filter((s) => s.is_current_user),
    ...board.students.filter((s) => !s.is_current_user),
  ];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div className="animate-fade-up">
        <h1 className="font-display text-2xl font-bold text-ink-950 dark:text-ink-50">Baholar</h1>
        <p className="text-sm text-ink-700/60 dark:text-ink-300/60">
          {board.level} darajasidagi o'quvchilarning har bir dars bo'yicha natijasi (lug'at va mashqlar) va
          daraja imtihoni.
        </p>
      </div>

      {/* Telefon: o'quvchi kartalari */}
      <div className="flex animate-fade-up flex-col gap-3 md:hidden">
        <Legend />
        {mobileStudents.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {mobileStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                units={board.units}
                rank={board.students.indexOf(student) + 1}
              />
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl bg-white px-4 py-8 text-center text-sm text-ink-400 dark:bg-[#161b26] dark:text-ink-600">
            Hozircha natijalar yo'q.
          </p>
        )}
      </div>

      {/* Kompyuter: jadval */}
      <div className="hidden animate-fade-up overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink-950/5 md:block dark:bg-[#161b26] dark:shadow-none dark:ring-white/10">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="text-xs text-ink-500 dark:text-ink-400">
                <th className="sticky left-0 z-10 min-w-44 border-b border-ink-100 bg-white px-4 py-3 text-left font-semibold dark:border-white/10 dark:bg-[#161b26]">
                  O'quvchilar
                </th>
                {board.units.map((unit) => (
                  <th
                    key={unit.id}
                    title={unit.subtitle}
                    className="whitespace-nowrap border-b border-ink-100 px-1.5 py-3 text-center font-semibold dark:border-white/10"
                  >
                    {unit.title}
                  </th>
                ))}
                <th className="whitespace-nowrap border-b border-ink-100 px-3 py-3 text-center font-semibold dark:border-white/10">
                  Imtihon
                </th>
              </tr>
            </thead>
            <tbody>
              {board.students.map((student, i) => (
                <tr key={student.id} style={{ animationDelay: `${i * 30}ms` }} className="animate-fade-up">
                  <td
                    className={`sticky left-0 z-10 border-b border-ink-50 px-4 py-2.5 dark:border-white/5 ${
                      student.is_current_user ? "bg-gold-50 dark:bg-[#2a2517]" : "bg-white dark:bg-[#161b26]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 text-xs text-ink-400">{i + 1}</span>
                      <Avatar name={student.name} photoUrl={student.avatar_url} size={32} />
                      <span
                        className={`whitespace-nowrap ${
                          student.is_current_user ? "font-bold text-ink-950 dark:text-ink-50" : "font-medium text-ink-800 dark:text-ink-200"
                        }`}
                      >
                        {student.name}
                        {student.is_current_user && " (siz)"}
                      </span>
                    </div>
                  </td>
                  {student.percents.map((pct, j) => (
                    <td
                      key={board.units[j].id}
                      className={`border-b border-ink-50 px-1.5 py-2.5 text-center dark:border-white/5 ${
                        student.is_current_user ? "bg-gold-50/60 dark:bg-gold-950/20" : ""
                      }`}
                    >
                      {pct === null ? (
                        <span className="text-ink-300 dark:text-ink-600">—</span>
                      ) : (
                        <span
                          title={`${board.units[j].title}: ${board.units[j].subtitle}`}
                          className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${cellColor(pct)}`}
                        >
                          {pct}
                        </span>
                      )}
                    </td>
                  ))}
                  <td
                    className={`border-b border-ink-50 px-3 py-2.5 text-center dark:border-white/5 ${
                      student.is_current_user ? "bg-gold-50/60 dark:bg-gold-950/20" : ""
                    }`}
                  >
                    <ExamBadge exam={student.exam} />
                  </td>
                </tr>
              ))}
              {board.students.length === 0 && (
                <tr>
                  <td colSpan={board.units.length + 2} className="px-4 py-8 text-center text-ink-400 dark:text-ink-600">
                    Hozircha natijalar yo'q.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-ink-100 px-4 py-3 dark:border-white/10">
          <Legend />
        </div>
      </div>
    </div>
  );
}
