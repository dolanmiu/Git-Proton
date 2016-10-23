import { GitProtonPage } from './app.po';

describe('git-proton App', function() {
  let page: GitProtonPage;

  beforeEach(() => {
    page = new GitProtonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
