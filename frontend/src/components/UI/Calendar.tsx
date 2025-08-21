import { useMemo, useState } from "react";
import styles from "../../styles/Calendar.module.scss";

type CalendarProps = {
  value?: Date | null;
  onChange?: (date: Date) => void;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

const Calendar = ({ value, onChange }: CalendarProps) => {
  const [viewDate, setViewDate] = useState<Date>(value ?? new Date());

  const { days, monthLabel } = useMemo(() => {
    const start = startOfMonth(viewDate);
    const end = endOfMonth(viewDate);
    const startWeekday = start.getDay(); // 0~6 (Sun~Sat)
    const totalDays = end.getDate();

    // 캘린더 셀(앞쪽 공백 포함)
    const cells: (Date | null)[] = Array.from(
      { length: startWeekday },
      () => null
    );
    for (let i = 1; i <= totalDays; i++) {
      cells.push(new Date(viewDate.getFullYear(), viewDate.getMonth(), i));
    }
    // 6행(최대 42칸) 맞추기
    while (cells.length % 7 !== 0) cells.push(null);

    return {
      days: cells,
      monthLabel: `${MONTHS[viewDate.getMonth()]} ${viewDate.getFullYear()}`,
    };
  }, [viewDate]);

  const isSelected = (d: Date) =>
    value &&
    d.getFullYear() === value.getFullYear() &&
    d.getMonth() === value.getMonth() &&
    d.getDate() === value.getDate();

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button
          className={styles.nav}
          onClick={() =>
            setViewDate(
              new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)
            )
          }
          aria-label="prev month"
        >
          &lt;
        </button>
        <div className={styles.month}>{monthLabel}</div>
        <button
          className={styles.nav}
          onClick={() =>
            setViewDate(
              new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)
            )
          }
          aria-label="next month"
        >
          &gt;
        </button>
      </div>

      <div className={styles.weekdays}>
        {WEEKDAYS.map((w) => (
          <div key={w} className={styles.weekday}>
            {w}
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {days.map((d, i) => {
          if (!d) return <div key={i} className={styles.cell} />;
          const selected = isSelected(d);
          const today = new Date().toDateString() === d.toDateString();

          return (
            <button
              key={d.toISOString()}
              className={[
                styles.cell,
                styles.day,
                selected ? styles.selected : "",
                today ? styles.today : "",
              ].join(" ")}
              onClick={() => onChange?.(d)}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default Calendar;
