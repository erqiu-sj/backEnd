/*
 * @Author: 邱狮杰
 * @Date: 2020-12-04 15:04:01
 * @LastEditTime: 2020-12-04 15:08:42
 * @FilePath: /backend/src/store/store.ts
 * @Description: store
 */
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
