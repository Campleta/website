import { CampletaFrontendPage } from './app.po';

describe('campleta-frontend App', () => {
  let page: CampletaFrontendPage;

  beforeEach(() => {
    page = new CampletaFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
