import { browser, by, element } from 'protractor';
import { promise as wdpromise } from 'selenium-webdriver';

export class AithexPage {
    public navigateTo(): wdpromise.Promise<Object> {
        return browser.get('/');
    }

    public getParagraphText(): wdpromise.Promise<string> {
        return element(by.css('#one-click-demo')).getText();
    }
}
