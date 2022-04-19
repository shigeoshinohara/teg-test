import styles from "../../styles/Home.module.css";
import Information from "../../components/information";
import Box from "../../components/box";
import DOMParserReact from "dom-parser-react";
import Link from "next/link";

import {
  fetchPageDetail,
  fetchAllPage,
  fetchPage,
  fetchInformation,
} from "../../lib/strapi";

import React from "react";

export const MyData = React.createContext();

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

const components = {
  h1: Title,
  h2: SubTitle,
  p: Paragraph,
  information: Information,
  box: Box,
};

export default function Home({ html, dataObj }) {
  return (
    <div className={styles.container}>
      <MyData.Provider value={dataObj}>
        {<DOMParserReact source={html} components={components} />}
      </MyData.Provider>
    </div>
  );
}

export const getStaticProps = async (staticProps) => {
  // パスから対象を取得
  const page = staticProps.params.page;
  const service = staticProps.params.service;

  // 表示するページ情報を取得する
  const pageData = await fetchPageDetail(service, page);
  const boxData = await fetchPage(service);
  const infoData = await fetchInformation(service);
  const dataObj = { boxData: boxData, infoData: infoData };
  const html = pageData[0].html;

  return {
    props: {
      html,
      dataObj,
    },
  };
};

export async function getStaticPaths() {
  const response = await fetchAllPage();

  return {
    paths: response,
    fallback: true, // false or 'blocking'
  };
}
