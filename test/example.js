var chai = require('chai');  
var expect = chai.expect;

const simpleMath = require('../dist/');

describe('Simple Math', () => {
  describe('#addTwoNum()', () => {
    it('should return correct answer for 3 + 5', () => {
      const total = simpleMath.addTwoNum(3, 5);
      expect(total).to.be.equal(8);
    });
    
    it('should return correct answer for 13 + 9', () => {
      const total = simpleMath.addTwoNum(13, 9);
      expect(total).to.be.equal(22);
    });
  });
  
  describe('#addThreeNum()', () => {
    it('should return correct answer for 5 + 7 + 13', () => {
      const total = simpleMath.addThreeNum(5, 7, 13);
      expect(total).to.be.equal(25);
    });
    
    it('should return correct answer for 10 + 44 + 13', () => {
      const total = simpleMath.addThreeNum(10, 44, 13);
      expect(total).to.be.equal(67);
    });
  });
});
