import { expect } from 'chai';  

import svg from '../dist/index.js';

describe('SVG Test', () => {
  
  describe('#colour()', () => {
    it('should return correct colour', () => {
      const found = svg.colour(1);
      expect(found).to.be.equal('#1b9e77');
    });
    
    const found = svg.colour();
    it('should return list', () => {
      expect(found.constructor).to.be.equal(Array);
    });
    
    it('correct first colour', () => {
      expect(found[0]).to.be.equal('#1b9e77');
    });

    it('default list length', () => {
      expect(found.length).to.be.equal(10);
    });
  });
  
  describe('#showDefaults()', () => {
    const found = svg.showDefaults();
    const keys = Object.keys(found)

    it('should return correct default types', () => {
      const index = keys.indexOf('svg') >= 0 ? 'found' : 'not found'
      expect(index).to.be.equal('found');
    });

    const svgDef = svg.showDefaults('svg');
    const svgKeys = Object.keys(svgDef)

    it('default svg canvasId', () => {
      const id = svgDef.canvasId
      expect(id).to.be.equal('d3Canvas');
    });
  });
});
