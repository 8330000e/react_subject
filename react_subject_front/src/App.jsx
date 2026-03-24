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
        `${import.meta.env.VITE_BACKSERVER}/subjects?&category=${category}&level=${level}&order=${order}&keyword=${keyword}`,
      )
      .then((res) => {
        console.log(res);
        setSubjectList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category, level, order, keyword]);
  return (
    <div className={styles.subject_wrap}>
      <header className={styles.header}>
        <h1>강의 목록</h1>
      </header>
      <div className={styles.main_wrap}>
        <form
          className={styles.contents_wrap}
          onSubmit={(e) => {
            e.preventDefault();
            setKeyword(keyword);
          }}
          onReset={(e) => {
            setCategory(0);
            setLevel(0);
            setOrder(0);
            setKeyword("");
          }}
        >
          <div className={styles.search_wrap}>
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
          </div>
          <div className={styles.content_wrap}>
            <div className={styles.category_wrap}>
              <label
                htmlFor="frontEnd"
                className={category == 2 ? styles.active_c : ""}
              >
                프론트엔드
              </label>
              <input
                type="radio"
                name="category"
                id="frontEnd"
                value={2}
                style={{ display: "none" }}
                onChange={(e) => {
                  setCategory(e.target.value);
                  console.log(category);
                }}
              />
              <label
                htmlFor="backEnd"
                className={category == 1 ? styles.active_c : ""}
              >
                백엔드
              </label>
              <input
                type="radio"
                name="category"
                id="backEnd"
                value={1}
                style={{ display: "none" }}
                onChange={(e) => {
                  setCategory(e.target.value);
                  console.log(category);
                }}
              />
              <label
                htmlFor="dataBase"
                className={category == 3 ? styles.active_c : ""}
              >
                DB
              </label>
              <input
                type="radio"
                name="category"
                id="dataBase"
                value={3}
                style={{ display: "none" }}
                onChange={(e) => {
                  setCategory(e.target.value);
                  console.log(category);
                }}
              />
            </div>
            <div className={styles.container}>
              <div className={styles.filter_wrap}>
                <div className={styles.level_wrap}>
                  <div className={styles.reset}>
                    <button type="reset">전체보기</button>
                  </div>
                  <input
                    type="radio"
                    name="level"
                    id="easy"
                    value={1}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setLevel(e.target.value);
                      console.log(level);
                    }}
                  />
                  <label
                    htmlFor="easy"
                    className={level == 1 ? styles.active : ""}
                  >
                    초급
                  </label>
                  <input
                    type="radio"
                    name="level"
                    id="middle"
                    value={2}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setLevel(e.target.value);
                      console.log(level);
                    }}
                  />
                  <label
                    htmlFor="middle"
                    className={level == 2 ? styles.active : ""}
                  >
                    중급
                  </label>
                  <input
                    type="radio"
                    name="level"
                    id="high"
                    value={3}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setLevel(e.target.value);
                      console.log(level);
                    }}
                  />
                  <label
                    htmlFor="high"
                    className={level == 3 ? styles.active : ""}
                  >
                    고급
                  </label>
                </div>
                <select
                  onChange={(e) => {
                    setOrder(e.target.value);
                    console.log(order);
                  }}
                >
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
                      <li className={styles.classList}>
                        {subject.subjectTitle}
                      </li>
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
        </form>
      </div>
    </div>
  );
}

export default App;
