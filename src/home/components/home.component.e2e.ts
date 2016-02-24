describe('Home', function() {

  beforeEach(function() {
    browser.get('');
  });

  it('should have an input', function() {
    expect(element(by.css('sd-app sd-home input')).isPresent()).toEqual(true);
  });

  it('should have an select', function() {
    expect(element(by.css('sd-app sd-home select')).isPresent()).toEqual(true);
  });

});
