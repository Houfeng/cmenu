/**
 * Copyright (c) 2019-present Houfeng
 * @author Houfeng <admin@xhou.net>
 */

import { ContextMenuItem } from "./ContextMenuItem";
import { ContextMenuModel } from "./ContextMenuModel";

export interface IContextMenuProps {
  children?: ContextMenuItem | ContextMenuItem[];
  model?: ContextMenuModel;
}
