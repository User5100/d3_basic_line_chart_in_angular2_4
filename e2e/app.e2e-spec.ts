import { D3AngularPage } from './app.po';

describe('d3-angular App', function() {
  let page: D3AngularPage;

  beforeEach(() => {
    page = new D3AngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
