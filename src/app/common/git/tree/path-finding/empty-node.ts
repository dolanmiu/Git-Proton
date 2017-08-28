import { TreeElement, TreeElementType } from './tree-element';

export class EmptyNode extends TreeElement {

    constructor() {
        super(TreeElementType.NONE);
    }
}
