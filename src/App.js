import { useState, useRef, useEffect, useMemo } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { FuncProvider } from "./contexts/a";

//https://jsonplaceholder.typicode.com/comments
function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    console.log(res);

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    const newData = data.filter((item) => item.id !== targetId);
    setData(newData);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        targetId === it.id ? { ...it, content: newContent } : it
      )
    );
  };

  //콜백 함수가 리턴하는 값을 그대로 리턴한다
  const getDiaryAnalysis = useMemo(() => {
    console.log("일기 분석 시작");
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <FuncProvider onEdit={onEdit} onRemove={onRemove}>
      <div className="App">
        <DiaryEditor onCreate={onCreate} />
        <div>전체 일기 : {data.length}</div>
        <div>기분 좋은 일기 개수 : {goodCount}</div>
        <div>기분 나쁜 일기 개수 : {badCount}</div>
        <div>기분 좋은 일기 비율 : {goodRatio}</div>
        <DiaryList diaryList={data} />
      </div>
    </FuncProvider>
  );
}

export default App;
