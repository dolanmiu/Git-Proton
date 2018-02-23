import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from 'app/material.module';
import { ToolBarComponent } from './tool-bar.component';

describe('ToolBarComponent', () => {
    let component: ToolBarComponent;
    let fixture: ComponentFixture<ToolBarComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [ToolBarComponent],
                imports: [MaterialModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
