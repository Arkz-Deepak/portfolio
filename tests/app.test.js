/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('Portfolio Application', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  it('should render the hero section with profile picture', () => {
    const heroTitle = document.querySelector('.hero-title');
    expect(heroTitle).not.toBeNull();
    const profilePic = document.querySelector('.hero-profile img');
    expect(profilePic).not.toBeNull();
    expect(profilePic.getAttribute('src')).toBe('profile.jpg');
  });

  it('should have all physics canvases in the DOM', () => {
    const slamCanvas = document.getElementById('slam-canvas');
    const visionCanvas = document.getElementById('vision-canvas');
    const pidCanvas = document.getElementById('pid-canvas');
    const armCanvas = document.getElementById('hero-arm-canvas');

    expect(slamCanvas).not.toBeNull();
    expect(visionCanvas).not.toBeNull();
    expect(pidCanvas).not.toBeNull();
    expect(armCanvas).not.toBeNull();
  });
});
