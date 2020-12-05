import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";

import {
  GetArticleClassificationFrontendType,
  GetArticleClassificationBackendType,
} from "../../../../action/classification/classification";

interface GroupDefine {
  name: string;
  list: string[] | undefined;
}

type Props = {
  onProxyChange: (val: string) => void;
};
const { Option, OptGroup } = Select;

const GroupSelect: FC<Props> = ({ onProxyChange }) => {
  const frontendList = useDispatch();
  const backendList = useDispatch();
  frontendList(GetArticleClassificationFrontendType());
  backendList(GetArticleClassificationBackendType());
  const frontEndData = useSelector(
    (state: { GetArticleFrontendTypeList: Map<string, string[]> }) =>
      state.GetArticleFrontendTypeList.get("list")
  );
  const backendData = useSelector(
    (state: { GetArticleBackendTypeList: Map<string, string[]> }) =>
      state.GetArticleBackendTypeList.get("list")
  );
  const [listData] = useState<GroupDefine[]>([
    { name: "前端", list: frontEndData },
    { name: "后端", list: backendData },
  ]);
  return (
    <Select
      mode="multiple"
      onChange={(val) => onProxyChange(val)}
      defaultValue="JavaScript"
      style={{ width: "100%" }}
    >
      {listData?.map((item: GroupDefine, index) => (
        <OptGroup key={`father${index}`} label={item.name}>
          {item.list?.map((item, indexs) => (
            <Option key={`${item}${indexs}`} value={item}>
              {item}
            </Option>
          ))}
        </OptGroup>
      ))}
    </Select>
  );
};

export default GroupSelect;
