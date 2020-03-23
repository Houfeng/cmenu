/**
 * Copyright (c) 2019-present Houfeng
 * @author Houfeng <admin@xhou.net>
 */

import React, { Component } from "react";
import { createPortal } from "react-dom";
import { ContextMenuOwner } from "./ContextMenuOwner";
import { IContextMenuProps } from "./IContextMenuProps";
import { model } from "mota";
import { ContextMenuModel } from "./ContextMenuModel";
import { EventProxy, touch } from "mota-touch";
import { ContextMenuList } from "./ContextMenuList";

@model
@touch
export class ContextMenu extends Component<IContextMenuProps> {
  model: ContextMenuModel;

  onDocMouseDown = (event: React.MouseEvent<Document>) => {
    const target = event.target as HTMLLIElement;
    if (target.getAttribute("data-prevent") === "true" || event.button !== 0) {
      return;
    }
    return setTimeout(() => this.model.hide(), 150);
  };

  onDocContextMenu = (event: React.MouseEvent<Document>) => {
    const target = event.target as HTMLLIElement;
    if (target.getAttribute("data-prevent") === "true") return;
    this.model.hide();
  };

  renderMenu() {
    const { position, items } = this.model;
    const { children } = this.props;
    return (
      <React.Fragment>
        <ContextMenuList model={this.model} position={position} items={items}>
          {children}
        </ContextMenuList>
        <EventProxy
          onMouseDown={this.onDocMouseDown}
          onContextMenu={this.onDocContextMenu}
        />
      </React.Fragment>
    );
  }

  owner = new ContextMenuOwner();

  componentWillUnmount() {
    if (this.owner && this.owner.destroy) this.owner.destroy();
    if (this.model && this.model.destroy) this.model.destroy();
  }

  render() {
    const { visible } = this.model;
    if (!visible) return <React.Fragment />;
    return createPortal(this.renderMenu(), this.owner.container);
  }
}
