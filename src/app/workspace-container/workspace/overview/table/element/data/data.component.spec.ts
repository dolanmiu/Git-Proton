import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitModel } from 'app/common/git/tree/commit-model';
import { DataNode } from 'app/common/git/tree/path-finding/nodes';
import { Path } from 'app/common/git/tree/path-finding/path';
import { DataComponent } from './data.component';

describe('DataComponent', () => {
    let component: DataComponent;
    let fixture: ComponentFixture<DataComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [DataComponent],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(DataComponent);
        component = fixture.componentInstance;

        const commit = new CommitModel({
            author: {
                name: 'string',
                email: 'string',
            },
            committer: {
                name: 'string',
                email: 'string',
            },
            sha: {
                current: 'string',
                parents: ['string'],
            },
            message: 'string',
            date: new Date(),
        });

        const path = new Path(
            [
                {
                    x: 0,
                    y: 0,
                },
                {
                    x: 0,
                    y: 1,
                },
            ],
            {
                x: 0,
                y: 0,
            },
            commit,
        );

        component.node = path.Nodes[path.Nodes.length - 1].node as DataNode<CommitModel>;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
