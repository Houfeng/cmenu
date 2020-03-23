/**
 * Copyright (c) 2019-present Houfeng
 * @author Houfeng <admin@xhou.net>
 */

export class ContextMenuOwner {
  private __container: HTMLDivElement;

  public get container() {
    if (!this.__container) {
      this.__container = document.createElement("div");
      document.body.appendChild(this.__container);
    }
    return this.__container;
  }

  destroy = () => {
    if (!this.container || !this.container.parentNode) return;
    this.container?.parentNode?.removeChild(this.container);
  };
}
