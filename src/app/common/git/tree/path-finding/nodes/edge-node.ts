import { Path } from '../path';
import { Node } from './node';

export class EdgeNode extends Node {

    // tslint:disable-next-line:no-any
    constructor(path: Path<any>) {
        super(path, 1);
    }

    public toString(): string {
        return '.';
    }
}
