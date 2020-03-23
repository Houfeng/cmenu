/**
 * Copyright (c) 2019-present Houfeng
 * @author Houfeng <admin@xhou.net>
 */

import React, { Component } from "react";
import { IContextMenuItemProps } from "./IContextMenuItemProps";
import { cname } from "../common/cname";
import { IContextMenuItem } from "./IContextMenuItem";

export class ContextMenuItem extends Component<IContextMenuItemProps> {
  onClick = (event: React.MouseEvent) => {
    const { onClick, disabled, divider, model } = this.props;
    if (disabled || divider) return;
    if (onClick) onClick(this.props as IContextMenuItem, event);
    if (model) model.emit("click", this.props, event);
  };

  renderShortcut() {
    const { shortcut } = this.props;
    if (!shortcut) return;
    return (
      <span data-prevent={true} className={cname("shortcut")}>
        {shortcut}
      </span>
    );
  }

  renderDivider() {
    const { divider } = this.props;
    if (!divider) return;
    return <li data-prevent={true} className={cname("divider")} />;
  }

  renderItem() {
    const { children, label, disabled } = this.props;
    return (
      <li
        className={cname({ disabled, children: !!children })}
        data-prevent={disabled || !!children}
        onClick={this.onClick}
      >
        {label} {this.renderShortcut()} {children}
      </li>
    );
  }

  render() {
    const { divider } = this.props;
    return divider ? this.renderDivider() : this.renderItem();
  }
}
