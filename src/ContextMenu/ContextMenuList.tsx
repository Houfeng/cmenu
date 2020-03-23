/**
 * Copyright (c) 2019-present Houfeng
 * @author Houfeng <admin@xhou.net>
 */

import React, { Component } from "react";
import { cname } from "../common/cname";
import { ContextMenuItem } from "./ContextMenuItem";
import { isArray } from "util";
import { IContextMenuListProps } from "./IContextMenuListProps";

const contextMenu = cname("menu");

export class ContextMenuList extends Component<IContextMenuListProps> {
  renderItems() {
    const { children, items = [], model } = this.props;
    if (children || !items) return children;
    return (isArray(items) ? items : items()).map((props, index) => {
      const { value, children, ...others } = props;
      return (
        <ContextMenuItem
          key={value || index}
          model={model}
          value={value}
          {...others}
        >
          {children && <ContextMenuList items={children} />}
        </ContextMenuItem>
      );
    });
  }

  render() {
    const { position } = this.props;
    const style = position
      ? { left: position.clientX, top: position.clientY }
      : null;
    return (
      <ul className={contextMenu} data-prevent={true} style={style}>
        {this.renderItems()}
      </ul>
    );
  }
}

export const ContextSubMenu = ContextMenuList;
