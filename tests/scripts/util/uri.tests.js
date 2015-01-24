require(['util/uri'], function(underTest){

  describe("A URI", function() {

    it("should be resolved into a path", function() {
      expect(underTest.resolvePath('http://192.168.1.105:8090/account/register')).toBe('/account/register');
    });

  });

});