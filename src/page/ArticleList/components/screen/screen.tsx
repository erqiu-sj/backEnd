import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetArticleMouthList,
  GetArticleYearsList,
  GetArticleClassificationBackendType,
  GetArticleClassificationFrontendType,
} from "../../../../action/classification/classification";
import { Select } from "antd";
import "./screen.scss";

type State = {
  GetArticleYearList: Map<string, string[]>;
  GetArticleMounthList: Map<string, string[]>;
  GetArticleFrontendTypeList: Map<string, string[]>;
  GetArticleBackendTypeList: Map<string, string[]>;
};

type Props = {};

const { Option } = Select;
const Screen: FC<Props> = () => {
  const yearDispath = useDispatch();
  const mounthDispatch = useDispatch();
  const frontendDispath = useDispatch();
  const backentDispatch = useDispatch();
  useEffect(() => {
    yearDispath(GetArticleYearsList());
    mounthDispatch(GetArticleMouthList());
  }, [yearDispath, mounthDispatch]);
  const frontEnd = useSelector((state: State) => {
    if (!state.GetArticleFrontendTypeList.get("list")?.length)
      frontendDispath(GetArticleClassificationFrontendType());
    return state.GetArticleFrontendTypeList.get("list");
  });
  const backEnd = useSelector((state: State) => {
    if (!state.GetArticleBackendTypeList.get("list")?.length)
      backentDispatch(GetArticleClassificationBackendType());
    return state.GetArticleBackendTypeList.get("list");
  });
  const year = useSelector((state: State) =>
    state.GetArticleYearList.get("list")
  );
  const mounth = useSelector((state: State) =>
    state.GetArticleMounthList.get("list")
  );
  return (
    <div className="screen">
      <Select placeholder="Year" style={{ width: 120 }} loading>
        {year?.map((item, index) => (
          <Option value={item} key={index}>
            {item}
          </Option>
        ))}
      </Select>
      &nbsp;&nbsp; - &nbsp;&nbsp;
      <Select placeholder="Mounth" style={{ width: 120 }} loading>
        {mounth?.map((item, index) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
      &nbsp; &nbsp;
      <Select placeholder="Type" style={{ width: 120 }} loading>
        {frontEnd &&
          backEnd &&
          [...frontEnd, ...backEnd]?.map((item, index) => (
            <Option value={item} key={index}>
              {item}
            </Option>
          ))}
      </Select>
    </div>
  );
};
export default Screen;
