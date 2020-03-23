/**
 * Copyright (c) 2019-present Houfeng
 * @author Houfeng <admin@xhou.net>
 */

import { ContextMenuModel } from "./ContextMenuModel";

export interface IContextMenuItem {
  disabled?: boolean;
  onClick?: (item?: IContextMenuItem, event?: React.MouseEvent) => void;
  divider?: boolean;
  label?: string;
  value?: string | number;
  shortcut?: string;
  children?: IContextMenuItem[];
}

export type ContextMenuItemFactory = (
  model?: ContextMenuModel
) => IContextMenuItem[];
export type ContextMenuItems = IContextMenuItem[] | ContextMenuItemFactory;
