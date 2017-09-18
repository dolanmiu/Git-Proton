import { Component, Input, OnInit } from '@angular/core';

import { NodeStack } from 'app/common/git/tree/path-finding';

@Component({
    selector: 'app-element',
    templateUrl: './element.component.html',
    styleUrls: ['./element.component.scss'],
})
export class ElementComponent implements OnInit {
    @Input() public nodeStack: NodeStack;

    constructor() { }

    public ngOnInit(): void {
    }

}
