import style from "../../../styles/DateCapsule.module.scss";

const test = [
  { title: "hi-1fasdfasdfasdfasdfasdafsdfaasdfasdf", memberId: "test", date: "2025-09-11" },
  { title: "hi-2", memberId: "test", date: "2025-09-11" },
  { title: "hi-3", memberId: "test", date: "2025-09-11" },
  { title: "hi-4", memberId: "test", date: "2025-09-11" },
  { title: "hi-5", memberId: "test", date: "2025-09-11" },
  { title: "hi-6", memberId: "test", date: "2025-09-11" },
  { title: "hi-7", memberId: "test", date: "2025-09-11" },
  { title: "hi-8", memberId: "test", date: "2025-09-11" },
  { title: "hi-9", memberId: "test", date: "2025-09-11" },
  { title: "hi-10", memberId: "test", date: "2025-09-11" },
];

const DateCapsule = () => {
  return (
    <div className={style.wrapper}>
      <h2>DATE CAPSULE</h2>
      <div className={style.capsuleList}>
        {test.map((items) => (
          <div className={style.capsuleBox}>
            <h4>{items.title}</h4>
            <div className={style.capsuleContent}>
              <span>{items.date}</span>
              <span>{items.memberId}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateCapsule;
