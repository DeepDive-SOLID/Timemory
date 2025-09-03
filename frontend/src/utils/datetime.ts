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

// eventData.date
export const parseAnniversary = (raw: string): Date => {
  const match = raw.match(/(\d+)월\s*(\d+)일/);
  if (!match) return new Date();
  const month = parseInt(match[1], 10);
  const day = parseInt(match[2], 10);
  const year = new Date().getFullYear();
  return new Date(year, month - 1, day, 0, 0, 0);
};
