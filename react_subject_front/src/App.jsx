import { useEffect, useState } from "react";
import styles from "./App.module.css";
import axios from "axios";

function App() {
  const [subject, setSubject] = useState({
    subjectNo: 0,
    subjectTitle: "",
    subjectInstructor: "",
    subjectCategory: 0,
    subjectLevel: 0,
    subjectCount: 0,
  });
  const [subjectList, setSubjectList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [category, setCategory] = useState(0);
  const [level, setLevel] = useState(0);
  const [order, setOrder] = useState(0);
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKSERVER}/subjects?&category=${category}&level=${level}&order=${order}`,
      )
      .then((res) => {
        console.log(res);
        setSubjectList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKSERVER}/subjects?&level=${level}`)
      .then((res) => {
        console.log(res);
        setSubjectList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [level]);
  useEffect(() => {}, [keyword]);
  return (
    <div className={styles.subject_wrap}>
      <header className={styles.header}>
        <h1>강의 목록</h1>
      </header>
      <div className={styles.main_wrap}>
        <form
          className={styles.search_wrap}
          onSubmit={(e) => {
            e.preventDefault();
            setSearchKeyword(keyword);
          }}
        >
          <label htmlFor="searchTitle"></label>
          <input
            placeholder="강의명을 입력하세요"
            type="search"
            value={keyword}
            name="searchTitle"
            id="searchTitle"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <button type="submit">검색</button>
        </form>
        <div className={styles.content_wrap} value={category}>
          <form
            className={styles.category_wrap}
            value={category}
            onSubmit={(e) => {
              e.preventDefault();
            }}
            onChange={(e) => {
              setCategory(e.target.value);
              console.log(category);
            }}
          >
            <label htmlFor="frontEnd">프론트엔드</label>
            <input
              type="radio"
              name="category"
              id="frontEnd"
              value={2}
              style={{ display: "none" }}
            />

            <label htmlFor="backEnd">백엔드</label>
            <input
              type="radio"
              name="category"
              id="backEnd"
              value={1}
              style={{ display: "none" }}
            />

            <label htmlFor="dataBase">DB</label>
            <input
              type="radio"
              name="category"
              id="dataBase"
              value={3}
              style={{ display: "none" }}
            />
          </form>
          <div className={styles.container}>
            <div className={styles.filter_wrap}>
              <div className={styles.level_wrap}>
                <form
                  className={styles.level_item}
                  value={level}
                  onChange={(e) => {
                    e.preventDefault();
                    setLevel(e.target.value);
                    console.log(level);
                  }}
                >
                  <input
                    type="radio"
                    name="level"
                    id="easy"
                    value={1}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="easy">초급</label>
                  <input
                    type="radio"
                    name="level"
                    id="middle"
                    value={2}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="middle">중급</label>
                  <input
                    type="radio"
                    name="level"
                    id="high"
                    value={3}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="high">고급</label>
                </form>
              </div>
              <select>
                <option value={0}>작성순</option>
                <option value={1}>난이도 오름차순</option>
                <option value={2}>난이도 내림차순</option>
                <option value={3}>수강인원 오름차순</option>
                <option value={4}>수강인원 내림차순</option>
              </select>
            </div>
            <div className={styles.content_list}>
              <ul className={styles.listname}>
                <li className={styles.noLi}>번호</li>
                <li className={styles.classLi}>과목명</li>
                <li className={styles.teacherLi}>강사</li>
                <li className={styles.categoryLi}>분류</li>
                <li className={styles.levelLi}>난이도</li>
                <li className={styles.countLi}>수강정원</li>
              </ul>
              {subjectList.map((subject) => {
                return (
                  <ul
                    className={styles.content_item}
                    key={"subject-" + subject.subjectNo}
                  >
                    <li className={styles.noLi}>{subject.subjectNo}</li>
                    <li className={styles.classList}>{subject.subjectTitle}</li>
                    <li className={styles.teacherLi}>
                      {subject.subjectInstructor}
                    </li>
                    <li className={styles.categoryLi}>
                      {subject.subjectCategory === 1
                        ? "백엔드"
                        : subject.subjectCategory === 2
                          ? "프론트엔드"
                          : "DB"}
                    </li>
                    <li className={styles.levelLi}>
                      {subject.subjectLevel === 1
                        ? "초급"
                        : subject.subjectLevel === 2
                          ? "중급"
                          : "고급"}
                    </li>
                    <li className={styles.countLi}>{subject.subjectCount}</li>
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
