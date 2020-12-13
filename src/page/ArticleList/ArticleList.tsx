import React, { FC } from "react";
import Screen from "./components/screen/screen";
import List from "./components/list/list";

type Props = {};

const ArticleList: FC<Props> = () => {
  return (
    <div>
      <Screen />
      <br />
      <List />
    </div>
  );
};

export default ArticleList;
