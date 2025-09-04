export const toLocalDateTimeString = (d: Date = new Date()) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  const y = d.getFullYear();
  const m = pad(d.getMonth() + 1);
  const da = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  const ss = pad(d.getSeconds());
  return `${y}-${m}-${da}T${hh}:${mm}:${ss}`;
};

// M/D 표시
export const formatMD = (d: Date | null) =>
  d ? `${d.getMonth() + 1}/${d.getDate()}` : "";
