import { APP_BASE_HREF } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [AppComponent],
                imports: [AppRoutingModule],
                providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
            }).compileComponents();
        }),
    );

    it(
        'should create the app',
        async(() => {
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        }),
    );
});
