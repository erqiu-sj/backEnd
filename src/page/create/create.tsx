import React, { FC, useState } from "react";
import { Button, message, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { GetAdminToken } from "../../action/admin/adminAction";
import * as ErrorMessage from "../../message/error";
import { VerifySuperAdministrator } from "../../utils/VerifySuperAdministrator";
import { Empty, ErrorHandling } from "../../utils/fn";
import { Create, SendArticle } from "../../http/create/create";
import Title from "./components/title/Title";
import Editor from "../../components/Editor/Editor";
import GroupSelect from "./components/groupSelect/groupSelect";
type Props = {};
const CreatePage: FC<Props> = () => {
  // title内容
  const [val, setVal] = useState<string>("");
  // 文章简介
  const [briefIntroduction, setBriefIntroduction] = useState<string>("");
  // 文章内容
  const [content, setContent] = useState<string>("");
  // 文章类型
  const [articleType, setArticleType] = useState<string>("JavaScript");
  const tokenDispatch = useDispatch();
  const token = useSelector((state: { AdminToken: Map<string, string> }) =>
    state.AdminToken.get("token")
  );

  // 提交文章时
  function Send() {
    ErrorHandling(
      () => {
        if (
          Empty(val, ErrorMessage.ARTICLETITLE_EMPTY) &&
          Empty(briefIntroduction, ErrorMessage.INTRODUCATIONTOTHEARTICLE) &&
          Empty(content, ErrorMessage.ARTICLECONTENT_EMPTY) &&
          Empty(articleType, ErrorMessage.ARTICLETYPE_EMPTY)
        )
          Login(val, content, articleType, briefIntroduction);
      },
      (e) => message.warning(e.message)
    );
  }
  // admin 登录
  async function Login(
    val: string,
    content: string,
    articleType: string,
    briefIntroduction: string
  ) {
    try {
      // 验证token值是否为空 token为空跳到catch分支
      if (!token) throw new Error(ErrorMessage.TOKEN_EMPTRY);
      // 上传文章
      const SendData: SendArticle = {
        Title: val,
        Content: content,
        ArticleType: articleType,
        BriefIntroduction: briefIntroduction,
      };
      const result = Create({
        url: "/write",
        data: SendData,
        headers: { "Authorization": token },
      });
      result
        .then((res) => message.success(res.data.Result))
        .catch(() => message.error(ErrorMessage.ARTICLE_UPLOADFAILED));
    } catch (e) {
      // 保存token to redux
      VerifySuperAdministrator((ServerToken) => {
        tokenDispatch(GetAdminToken(ServerToken));
      });
    }
  }
  return (
    <div className="create">
      <Title onProxyChange={(val) => setVal(val)} />
      <br />
      <Input
        style={{ borderRadius: "5px", outline: "none" }}
        placeholder="简介"
        onChange={(e) => setBriefIntroduction(e.target.value)}
      />
      <br />
      <br />
      <div style={{ background: "#fff", borderRadius: "5px" }}>
        <Editor onProxyChange={(val) => setContent(val)} />
      </div>
      <br />
      <br />
      <GroupSelect onProxyChange={(val) => setArticleType(val)} />
      <br />
      <br />
      <Button onClick={Send} className="button">
        Send
      </Button>
    </div>
  );
};
export default CreatePage;
