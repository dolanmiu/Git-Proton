import { AppPage } from './app.po';

describe('main App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display message saying app works', () => {
        page.navigateTo();
        // expect(page.getParagraphText()).toEqual('app works!');
    });
});
