import React, { FC, useState } from "react";
import "./title.scss";

type Props = {
  onProxyChange: (val: string) => void;
};

const TitleComponents: FC<Props> = ({ onProxyChange }) => {
  const [inpValue, setInpValue] = useState<string>("");
  return (
    <div className="title">
      <input
        onChange={(e) => {
          setInpValue(e.target.value);
          onProxyChange(e.target.value);
        }}
        type="text"
        maxLength={50}
        className="inp"
        placeholder="Title"
      />
      <span>{inpValue.length}/50</span>
    </div>
  );
};
export default TitleComponents;
