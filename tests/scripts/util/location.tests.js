require(['util/location'], function(underTest){

  describe("An Inverse coordinate", function() {

    it("should be resolved as (-1,-1) for center (0,0) and location (1,1)", function() {
      var center = { latitude: 0, longitude: 0 };
      var location = { latitude: 1, longitude: 1 };
      var inverseCoordinate = underTest.getInverseCoordinate(center, location);
      expect(inverseCoordinate.latitude).toBe(-1);
      expect(inverseCoordinate.longitude).toBe(-1);
    });

    it("should be resolved as (-2,-1) for center (0,0) and location (2,1)", function() {
      var center = { latitude: 0, longitude: 0 };
      var location = { latitude: 2, longitude: 1 };
      var inverseCoordinate = underTest.getInverseCoordinate(center, location);
      expect(inverseCoordinate.latitude).toBe(-2);
      expect(inverseCoordinate.longitude).toBe(-1);
    });

    it("should be resolved as (-2,0) for center (0,0) and location (2,0)", function() {
      var center = { latitude: 0, longitude: 0 };
      var location = { latitude: 2, longitude: 0 };
      var inverseCoordinate = underTest.getInverseCoordinate(center, location);
      expect(inverseCoordinate.latitude).toBe(-2);
      expect(inverseCoordinate.longitude).toBe(0);
    });

    it("should be resolved as (2,0) for center (0,0) and location (-2,0)", function() {
      var center = { latitude: 0, longitude: 0 };
      var location = { latitude: -2, longitude: 0 };
      var inverseCoordinate = underTest.getInverseCoordinate(center, location);
      expect(inverseCoordinate.latitude).toBe(2);
      expect(inverseCoordinate.longitude).toBe(0);
    });

    it("should be resolved as (-3,0) for center (-1,0) and location (1,0)", function() {
      var center = { latitude: -1, longitude: 0 };
      var location = { latitude: 1, longitude: 0 };
      var inverseCoordinate = underTest.getInverseCoordinate(center, location);
      expect(inverseCoordinate.latitude).toBe(-3);
      expect(inverseCoordinate.longitude).toBe(0);
    });

    it("should be resolved as (-4,0) for center (-3,0) and location (-2,0)", function() {
      var center = { latitude: -3, longitude: 0 };
      var location = { latitude: -2, longitude: 0 };
      var inverseCoordinate = underTest.getInverseCoordinate(center, location);
      expect(inverseCoordinate.latitude).toBe(-4);
      expect(inverseCoordinate.longitude).toBe(0);
    });

  });

});