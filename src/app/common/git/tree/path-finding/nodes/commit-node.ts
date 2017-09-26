import { Path } from '../path';
import { Node } from './node';

export class DataNode<T> extends Node {

    constructor(path: Path, public readonly commit: T) {
        super(path, 1);
    }

    public toString(): string {
        return 'o';
    }
}
