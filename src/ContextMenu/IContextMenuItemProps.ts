/**
 * Copyright (c) 2019-present Houfeng
 * @author Houfeng <admin@xhou.net>
 */

import { ContextMenuList } from "./ContextMenuList";
import { IContextMenuItem } from "./IContextMenuItem";
import { ContextMenuModel } from "./ContextMenuModel";

export interface IContextMenuItemProps {
  disabled?: boolean;
  onClick?: (item?: IContextMenuItem, event?: React.MouseEvent) => void;
  divider?: boolean;
  label?: string;
  value?: string | number;
  shortcut?: string;
  children?: React.ReactNode | ContextMenuList;
  model?: ContextMenuModel;
}
