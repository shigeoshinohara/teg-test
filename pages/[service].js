import styles from "../styles/Home.module.css";
import Information from "../components/information";
import Box from "../components/box";
// import parse, { domToReact } from 'html-react-parser'
import DOMParserReact from "dom-parser-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchPageDetail, fetchService } from "../lib/strapi";

const Title = (props) => (
  <div className="title">
    <h1 {...props} />
  </div>
);

const SubTitle = (props) => (
  <div className="subtitle">
    <h2 {...props} />
  </div>
);

const Paragraph = (props) => (
  <div className="p">
    <p {...props} />
  </div>
);

const Href = ({ href, ...props }) => (
  <Link href={href}>
    <a {...props} />
  </Link>
);

/*
const Box = (props) =>
    <div>
        <h1>Box</h1>
        <article>
            <ul>
                <li>ページ1</li>
                <li>ページ2</li>
            </ul>
        </article>
    </div>

const Information = (props) =>
    <div>
        <h1>Information</h1>
        <article>
            <ul>
                <li>お知らせ1</li>
                <li>お知らせ2</li>
            </ul>
        </article>
    </div>
*/

const components = {
  h1: Title,
  h2: SubTitle,
  p: Paragraph,
  information: Information,
  box: Box,
};

const htmlText = `
  <h1>HTML Text</h1>
  <h2>HTML SubText</h2>
  <a href="https://google.co.jp">Googleへ</a>
  <p>Test</p>
`;
export default function Home({ html }) {
  const router = useRouter();
  console.log(router);
  //const components = {
  //  a: Href,
  //  h1: Title,
  // information: Information,
  // box: Box,
  // }
  // const replaceHtml = parse(html, { replace })
  // // 置換対象のコンポーネント
  // const components = {
  //   Information: {no: 0, name:'Information'},
  //   Box: {no: 0, name: 'Box'}
  // }
  // // 表示位置を取得
  // components.Information.no = html.indexOf('<Information/>')
  // components.Box.no = html.indexOf('<Box/>')
  //
  // // 表示順にオブジェクトを並び替え
  // const sortedComponents = Object.keys(components).map(function (key){
  //   return components[key];
  // }).sort((a, b) => {
  //   return (a.no < b.no) ? -1 :1;
  // })
  //
  // let componentNameArray = [];
  // let testArray = [];
  // // htmlを配列に登録
  // testArray.push(html);
  //
  // // ソートしたコンポーネント順に名前だけ取り出しておく
  // sortedComponents.map((sortedComponent) => (componentNameArray.push(sortedComponent.name)));
  //
  // // コンポーネント順に文字列を分割して配列化しておく
  // componentNameArray.forEach((componentName, index) => {
  //   const target = testArray.pop();
  //   const splitArray = target.split('<'+ componentName+'/>');
  //   testArray = [...testArray, ...splitArray];
  // });

  // 分割した文字列毎にコンポーネントを描画する
  return (
    <div className={styles.container}>
      {/*{*/}
      {/*  testArray.map((str, index) => (*/}

      {/*        <span key={index}>*/}
      {/*          <span dangerouslySetInnerHTML={{__html: str}}></span>*/}
      {/*          {getComponent(componentNameArray[index])}*/}
      {/*      </span>*/}
      {/*      )*/}
      {/*  )*/}
      {/*}*/}
      {/*<DOMParserReact source={html} components={components}/>*/}
    </div>
  );
}

// タグからReactコンポーネントを返却する
function getComponent(tagName) {
  switch (tagName) {
    case "Information":
      return <Information />;
    case "Box":
      return <Box />;
  }
}

//
// const replace = (node) => {
//   if (node.name === 'a') {
//     return (
//         <a {...node.attribs} rel="noreferrer" >
//           { domToReact(node.children) }
//         </a>
//     )
//   }
// }

export const getStaticProps = async (staticProps) => {
  const params = staticProps.params;
  console.log("staticProps=" + JSON.stringify(staticProps));
  /*
    const coffeeStores = await fetchPage();

    return {
        props: {
            coffeeStore: coffeeStores.find((coffeeStore) => {
                // return coffeeStore.id === 0; // dynamic id
                // return coffeeStore.id === params.id; // dynamic id
                return coffeeStore.id.toString() === params.id; // dynamic id
            }),
        },
    };
     */

  //
  // console.log(context)

  const html = `
    <title>ヘッダー部</title>
    <box>box</box>
    xyz
    <nav>メニュー部</nav>
    gggg
    <a href="https://google.co.jp" style="cursor: pointer;" class="red">Googleへ</a>
    <information />
    <p>aaaa</p>
    <footer>フッター部</footer>`;
  // const html = '<head>ヘッダー部</head><nav>メニュー部</nav>xyz<footer>フッター部</footer>'
  // const replaceHtml = JSON.stringify(parse(html, { replace }))
  return {
    props: {
      html,
    },
  };
};

/*
export const getStaticPaths = ({context}) => {

    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };

   //  console.log(context);
   // // const data = fetchService();
   //  return {
   //
   //  }
   //  return {
   //      paths: [{ params: { id: "0" } }, { params: { id: "1" } },{ params: { id: "google1" } }],
   //      fallback: true
   //  };
}
*/

export async function getStaticPaths() {
  const response = await fetchService();
  console.log(response);

  return {
    paths: response,
    fallback: true, // false or 'blocking'
  };

  /*
     return {
         paths: [
             { params: { id: "google" }} ,{ params: { id: "yahoo" } }
         ],
         fallback: true // false or 'blocking'
     };
    */
}
