/**
 * Copyright (c) 2019-present Houfeng
 * @author Houfeng <admin@xhou.net>
 */

import { EventProxy, GestureEvent, gesture } from "mota-gesture";
import React, { Component } from "react";

import { ContextMenuList } from "./ContextMenuList";
import { ContextMenuModel } from "./ContextMenuModel";
import { ContextMenuOwner } from "./ContextMenuOwner";
import { IContextMenuProps } from "./IContextMenuProps";
import { createPortal } from "react-dom";
import { model } from "mota";

@model
@gesture
export class ContextMenu extends Component<IContextMenuProps> {
  model: ContextMenuModel;

  onDocumentPointerDown = (event: GestureEvent) => {
    const target = event.target as HTMLLIElement;
    if (target.getAttribute("data-prevent") === "true" || event.button !== 0) {
      return;
    }
    return setTimeout(() => this.model.hide(), 150);
  };

  onDocumentContextMenu = (event: React.MouseEvent<Document>) => {
    const target = event.target as HTMLLIElement;
    if (target.getAttribute("data-prevent") === "true") return;
    this.model.hide();
  };

  renderMenu() {
    const { position, items } = this.model;
    const { children } = this.props;
    return (
      <ContextMenuList model={this.model} position={position} items={items}>
        {children}
      </ContextMenuList>
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
    return (
      <React.Fragment>
        <EventProxy
          onGesturePointerDown={this.onDocumentPointerDown}
          onContextMenu={this.onDocumentContextMenu}
        />
        {createPortal(this.renderMenu(), this.owner.container)}
      </React.Fragment>
    );
  }
}
