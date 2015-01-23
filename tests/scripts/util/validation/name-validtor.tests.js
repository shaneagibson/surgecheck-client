require(['util/validation/name-validator'], function(underTest){

  describe("A Name Validator", function() {

    it("should return no error for a valid name", function() {
      expect(underTest.validate('Shane')).toBeFalsy();
    });

    it("should return an error for a name that is too short", function() {
      expect(underTest.validate('S')).toBe('too_short');
    });

  });

});