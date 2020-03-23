/**
 * Copyright (c) 2019-present Houfeng
 * @author Houfeng <admin@xhou.net>
 */

import { ContextMenuItems, IContextMenuItem } from "./IContextMenuItem";
import { IMouseInfo } from "../common/IMouseInfo";
import { isArray } from "util";

export class ContextMenuModel {
  protected static __instances: ContextMenuModel[] = [];
  public static get instances() {
    return this.__instances;
  }

  public position: IMouseInfo = { clientX: 0, clientY: 0 };
  public visible = false;
  public items: IContextMenuItem[] = [];
  protected factory: ContextMenuItems;

  constructor(factory: ContextMenuItems) {
    this.factory = factory;
    ContextMenuModel.instances.push(this);
  }

  public destroy = () => {
    ContextMenuModel.__instances = ContextMenuModel.instances.filter(
      item => item !== this
    );
  };

  protected calcItems() {
    if (!this.items) {
      this.items = [];
    } else {
      this.items = isArray(this.factory) ? this.factory : this.factory();
    }
  }

  public show = (info?: IMouseInfo) => {
    const event = info as React.MouseEvent;
    if (event) {
      if (event.stopPropagation) event.stopPropagation();
      if (event.preventDefault) event.preventDefault();
      if (event.nativeEvent) event.nativeEvent.stopImmediatePropagation();
      const { clientX, clientY, button, type } = event;
      if (type !== "contextmenu" && button && button !== 2) return;
      this.position = { clientX, clientY };
    }
    ContextMenuModel.instances.forEach(item => item.hide());
    this.calcItems();
    this.visible = this.items && this.items.length > 0;
  };

  public hide = () => {
    this.visible = false;
  };

  public toggle = (info?: IMouseInfo) => {
    return this.visible ? this.hide() : this.show(info);
  };
}
