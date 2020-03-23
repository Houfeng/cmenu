/**
 * Copyright (c) 2019-present Houfeng
 * @author Houfeng <admin@xhou.net>
 */

import { ContextMenuItem } from "./ContextMenuItem";
import { ContextMenuItems } from "./IContextMenuItem";
import { IMouseInfo } from "../common/IMouseInfo";
import { ContextMenuModel } from "./ContextMenuModel";

export interface IContextMenuListProps {
  children?: ContextMenuItem | ContextMenuItem[];
  items?: ContextMenuItems;
  position?: IMouseInfo;
  model?: ContextMenuModel;
}
