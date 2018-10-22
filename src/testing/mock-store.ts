// tslint:disable:no-any
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export class MockStore {
    private selectStreams: Map<Function, BehaviorSubject<any>>;

    constructor() {
        this.selectStreams = new Map();
    }

    public dispatch(_: any): void {}

    public select(selector: Function): Observable<any> {
        const subject = this.selectStreams.get(selector);

        return subject.asObservable();
    }

    public getSubjectFromSelector<T>(selector: Function): BehaviorSubject<T> {
        if (!this.selectStreams.has(selector)) {
            this.selectStreams.set(selector, new BehaviorSubject(undefined));
        }

        return this.selectStreams.get(selector);
    }
}
