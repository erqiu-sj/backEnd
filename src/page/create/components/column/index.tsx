import {FC, Fragment} from 'react'
import {Select} from 'antd';

const {Option} = Select;
type Prop = {
    group: {
        Title: string
    }[]
    onProxyTitle: (val: string[]) => void
    showColumn: boolean // 是否显示该组件
}


const Column: FC<Prop> = ({showColumn, onProxyTitle, group}) => {

    function handleChange(value: string[]) {
        onProxyTitle(value)
    }

    return <Fragment>
        {showColumn &&
        <div>
            <Select mode="tags" style={{width: '100%'}} placeholder="select special column" onChange={handleChange}>
                {group.map((item, index) => <Option key={index}
                                                    value={item.Title}>{item.Title}</Option>)}
            </Select>
        </div>}
    </Fragment>
}
export default Column
