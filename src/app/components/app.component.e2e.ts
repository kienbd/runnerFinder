describe('App', function() {

  beforeEach(function() {
      browser.get('');
  });

  it('should have a title', function() {
      expect(browser.getTitle()).toEqual('Runner Finder');
  });

  it('should have <nav>', function() {
      expect(element(by.css('sd-app sd-navbar nav')).isPresent()).toEqual(true);
  });

  it('should have correct Logo', function() {
      expect(element(by.css('sd-app sd-navbar nav a:first-child')).getText()).toEqual('<strong>Runner</strong>Finder');
  });

});
