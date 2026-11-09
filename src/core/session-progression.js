/* Small adjustments between comparable sessions. Pure history decision shared by all sports.
   Technical selection, age/health guards and the concrete training dose belong to the caller.
   At most two 5% rest / one-rep steps per cycle; never count the same evidence twice. */
import { iso, parse, addDays } from "./dates.js";

const stepOf = (e) => Math.max(0, Math.min(2, Number.isInteger(e?.fast?.level) ? e.fast.level : 0));
const overloaded = (e) => e.difficulty === "hard" || e.rpe > e.tHi || (e.perf || []).some(p => p.effort === "hard");
const recorded = (e) => e.inputConfirmed === true && e.completed === true &&
  e.progression?.eligible === true && e.fast?.eligible === true && Number.isFinite(e.minutes) && e.minutes > 0 &&
  Number.isFinite(e.rpe) && e.rpe >= 1 && e.rpe <= 10 && Number.isFinite(e.tHi);

export function nextSessionStep({ entries, key, cycle, date, today, eligible, accepts = () => true }) {
  const zero = { level: 0, basis: [], increased: false };
  if (!eligible) return zero;
  const from = iso(addDays(parse(date), -21));
  // One vote per date. Unknown, incomplete or changed-context entries remain barriers, not filtered-out successes.
  const recent = [...new Map(entries.filter(e => e.date >= from && e.date < date && e.date <= today)
    .map(e => [e.date, e])).values()].sort((a,b) => a.date.localeCompare(b.date));
  const last = recent[recent.length - 1];
  const comparable = e => e?.fast?.v === 1 && e.fast.key === key;
  if (!comparable(last) || !recorded(last) || overloaded(last) || !accepts(last)) return zero;
  const level = stepOf(last), basis = Array.isArray(last.fast.basis) ? last.fast.basis.slice(-2) : [];
  const keep = { level, basis, increased: false };
  const raises = cycle ? new Set(entries.filter(e => e.date < date && e.date <= today &&
    e.fast?.cycle === cycle && e.fast.raised === true).map(e => e.date)).size : 0;
  if (level >= 2 || raises >= 2 || recent.length < 2) return keep;
  const pair = recent.slice(-2);
  if (pair.every(e => comparable(e) && recorded(e) && !overloaded(e) && accepts(e) &&
      e.difficulty === "easy" && stepOf(e) === level && typeof e.id === "string" && e.id && !basis.includes(e.id)) &&
      pair[0].id !== pair[1].id) {
    return { level: level + 1, basis: pair.map(e => e.id), increased: true };
  }
  return keep;
}
