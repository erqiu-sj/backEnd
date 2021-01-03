import React, {FC, useState, useEffect} from "react";
import {Button, message, Input, Switch} from "antd";
import {useSelector, useDispatch} from "react-redux";
import {GetAdminToken} from "../../action/admin/adminAction";
import * as ErrorMessage from "../../message/error";
import {VerifySuperAdministrator} from "../../utils/VerifySuperAdministrator";
import {Empty, ErrorHandling} from "../../utils/fn";
import {Create} from "../../http/create/create";
import Title from "./components/title/Title";
import Editor from "../../components/Editor/Editor";
import GroupSelect from "./components/groupSelect/groupSelect";
import Column from "./components/column";
import {SendArticle} from "../../types/article";
import {AdminColumn, UsrColumn} from "../../http/column";
// import {AxiosPromise} from "axios";
import {HttpUtilsRouter} from "../../http/utils";

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
    // 文章模式or专栏模式, 默认为文章模式
    const [articleOrSpecialColumn, setArticleOrSpecialColumn] = useState(true)
    // 获取提交的文章id
    const [sendArticleId, setSendArticleId] = useState<number>(0)
    // 所选的所有专栏名
    const [specialColumnList, setSpecialColumnList] = useState<string[]>([])
    // 初始化所有的专栏名
    const [specialColumnListName, setSpecialColumnListName] = useState<{ Title: string }[]>([])
    const tokenDispatch = useDispatch();
    const token = useSelector((state: { AdminToken: Map<string, string> }) =>
        state.AdminToken.get("token")
    );
    useEffect(() => {
        getAllColumn().then((res: { Title: string }[]) => setSpecialColumnListName(res))
        getCurArticleId().then(res => setSendArticleId(res + 1))
    }, [])

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
                headers: {"Authorization": token},
            });
            result
                .then((res) => message.success(res.data.Result))
                .catch(() => message.error(ErrorMessage.ARTICLE_UPLOADFAILED));
            if (!articleOrSpecialColumn) {
                //  改文章加入专栏
                for (const item of ColumnsThatDontExist(specialColumnListName, specialColumnList)) {
                    await AddColumn(item, sendArticleId)
                }
            }
        } catch (e) {
            // 保存token to redux
            VerifySuperAdministrator((ServerToken) => {
                tokenDispatch(GetAdminToken(ServerToken));
            });
        }
    }

    /**
     *
     * @example getCurArticleId()
     * @description 初始化改文章id，用于专栏 新增的文章id
     * @return { Promise<number> }
     *
     * */
    async function getCurArticleId(): Promise<number> {
        const result = await HttpUtilsRouter({url: "lastId"})
        return result.data.Result
    }

    /**
     *
     * @example getAllColumn()
     * @description 获取所有专栏名称
     * @return { Promise<any[]> }
     *
     * */
    async function getAllColumn(): Promise<any[]> {
        const result = await UsrColumn({url: "/allName"})
        return result.data.Result
    }

    /**
     *
     * @example AddColumn(title)
     * @description 新增专栏
     * @param { string } title
     * @return { void }
     *
     * */
    async function AddColumn(title: string, id: number) {
        let result: any
        try {
            result = await AdminColumn({
                url: '/addSpecialColumn',
                method: "POST",
                data: {title, ArticleId: id}
            })
            message.success(result.data.Result)
        } catch (e) {
            message.warning(`${ErrorMessage.COLUMNEXISTS}:${title}`)
        }
    }

    /**
     * @example SwitchingMode()
     * @description 切换专栏和文章模式
     */
    async function SwitchingMode() {
        setArticleOrSpecialColumn(preState => preState = !preState)
        console.log(specialColumnList)
    }

    /**
     *
     * @example ColumnsThatDontExist(httpList,usrList)
     * @description 专栏数组对比提交时的专栏数组，找出新的专栏数组
     * @param { {title:string}[] } httpList
     * @param { string[] } usrList
     * @return { string[] }
     *
     * */
    function ColumnsThatDontExist(httpList: { Title: string }[], usrList: string[]): string[] {
        const newAr: string[] = [];
        if (!httpList.length) return usrList
        for (let i = 0, len = httpList.length; i < len; i++) {
            // 如果用户选项中存在新专栏，则找出
            if (!usrList.includes(httpList[i].Title)) {
                for (let j = 0, usrLen = usrList.length; j < usrLen; j++) {
                    if (httpList[i].Title !== usrList[j]) newAr.push(usrList[j]);
                }
            }
        }
        return Array.from(new Set(newAr))
    }

    return (
        <div className="create">
            <Title onProxyChange={(val) => setVal(val)}/>
            <br/>
            <Switch onClick={SwitchingMode.bind(null)} defaultChecked checkedChildren='article'
                    unCheckedChildren='specialColumn'/>
            <br/>
            <br/>
            <Input
                style={{borderRadius: "5px", outline: "none"}}
                placeholder="简介"
                onChange={(e) => setBriefIntroduction(e.target.value)}
            />
            <br/>
            <br/>
            <div style={{background: "#fff", borderRadius: "5px"}}>
                <Editor onProxyChange={(val) => setContent(val)}/>
            </div>
            <br/>
            <Column group={specialColumnListName} showColumn={!articleOrSpecialColumn}
                    onProxyTitle={res => setSpecialColumnList(res)}/>
            <br/>
            <GroupSelect onProxyChange={(val: string[]) => setArticleType(val.join(","))}/>
            <br/>
            <br/>
            <Button onClick={Send} className="button">
                Send
            </Button>
        </div>
    );
};
export default CreatePage;
