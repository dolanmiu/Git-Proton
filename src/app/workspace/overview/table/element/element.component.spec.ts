import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeStack } from 'app/common/git/tree/path-finding';
import { ElementComponent } from './element.component';

describe('ElementComponent', () => {
    let component: ElementComponent;
    let fixture: ComponentFixture<ElementComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ElementComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ElementComponent);
        component = fixture.componentInstance;

        component.nodeStack = new NodeStack();

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
