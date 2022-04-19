import { useContext } from "react";
import { MyData } from "../pages/[service]/[page]";
import Link from "next/link";

const Box = (props) => {
  // 表示対象を取得する
  const myData = useContext(MyData);
  const pageData = myData.boxData;

  return (
    <div>
      <h1 className="flex justify-center font-bold text-xl mb-2">
        サービスなど
      </h1>
      <div className="grid grid-cols-3 gap-4 justify-items-auto h-48">
        {pageData.map((page) => {
          return (
            <Link
              key={page.id}
              href={`/${page.service.Name}${page.slug}`}
              className="cursor-pointer"
            >
              <div className="cursor-pointer text-gray-700 bg-gray-400 flex justify-center items-center px-4 py-2">
                {page.pageName}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Box;
