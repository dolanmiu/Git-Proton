import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeStack } from 'app/common/git/tree/path-finding';
import { BottomRightComponent } from './bottom-right/bottom-right.component';
import { ElementComponent } from './element.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { TopLeftComponent } from './top-left/top-left.component';
import { TopRightComponent } from './top-right/top-right.component';
import { VerticalComponent } from './vertical/vertical.component';

describe('ElementComponent', () => {
    let component: ElementComponent;
    let fixture: ComponentFixture<ElementComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ElementComponent,
                BottomRightComponent,
                VerticalComponent,
                TopLeftComponent,
                TopRightComponent,
                HorizontalComponent,
            ],
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
