/*
 * @Author: 邱狮杰
 * @Date: 2020-12-04 15:40:05
 * @LastEditTime: 2020-12-04 16:54:54
 * @FilePath: /backend/src/components/Editor/Editor.tsx
 * @Description: 编辑器
 */
import React, { FC, useState } from "react";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
type Props = {
  onProxyChange: (val: string) => void;
};

const Editor: FC<Props> = ({ onProxyChange }) => {
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(null)
  );
  return (
    <BraftEditor
      value={editorState}
      onChange={(Content) => {
        setEditorState(Content.toHTML());
        onProxyChange(Content.toHTML());
      }}
    />
  );
};
export default Editor;
