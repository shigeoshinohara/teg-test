import { useContext } from "react";
import { MyData } from "../pages/[service]/[page]";

const Information = (props) => {
  // 表示対象を取得する
  const myData = useContext(MyData);
  const infoData = myData.infoData;
  return (
    <div>
      <h1 className="flex justify-center font-bold text-xl mb-2">
        お知らせ情報
      </h1>
      <article className="max-w-3xl">
        {infoData.map((info) => {
          return (
            <div key={info.id}>
              <span style={{ color: info.info_type.color }}>
                {info.info_type.label}
              </span>
              <span> {info.publish_dt}</span>
              <span> {info.title}</span>
            </div>
          );
        })}
      </article>
    </div>
  );
};

export default Information;
