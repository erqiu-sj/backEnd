import React, { FC, Fragment } from "react";
import { Table, Tag, Space } from "antd";
import "./list.scss";
const { Column } = Table;

const data = [
  {
    key: "1",
    title: "John",
    time: 32,
    tags: ["nice", "developer"],
  },
];

type Props = {};

const List: FC<Props> = () => {
  return (
    <Fragment>
      <Table dataSource={data}>
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="Time" dataIndex="time" key="time" />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags) => (
            <>
              {tags.map((tag: any) => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={() => (
            <Space size="middle">
              <span className="aToSpan">Look </span>
              <span className="aToSpan">Delete</span>
              <span className="aToSpan">Top</span>
            </Space>
          )}
        />
      </Table>
    </Fragment>
  );
};
export default List;
