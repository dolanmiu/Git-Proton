import { Path } from '../path';
import { Node } from './node';

export class EdgeNode extends Node {

    constructor(path: Path) {
        super(path, 1);
    }

    public toString(): string {
        return '.';
    }
}
