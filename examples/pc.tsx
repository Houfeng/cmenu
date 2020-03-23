import React, { useMemo } from 'react';
import styled from 'styled-components';
import { ContextMenu, ContextMenuModel } from '../src';
import { render } from 'react-dom';

export const Paper = styled.div`
  width: 800px;
  min-height: 400px;
  padding: 72px;
  background: #fff;
  margin: auto auto;
  border-radius: 2px;
  box-shadow: 0 0 8px 0 #ddd;
  -webkit-user-drag: none;
`;

export function App() {
  const model = useMemo(() => new ContextMenuModel([
    { label: "测试" }
  ]), []);
  return <Paper onContextMenu={model.show} >
    <ContextMenu model={model} />
  </Paper>;
}

render(<App />, document.getElementById("root"));