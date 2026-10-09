import { APPLICATIONS, APPLICATION_CATEGORIES } from './application-directory';
import { isSafeDestination } from './platform-navigation';

describe('Suraksha Hub application directory', () => {
  it('registers the eight supplied destinations in display order', () => {
    expect(APPLICATIONS.length).toBe(8);
    expect(APPLICATIONS.map((application) => application.displayOrder)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8
    ]);
    expect(APPLICATIONS.map((application) => application.url)).toEqual([
      'https://tools-xi-murex.vercel.app/',
      'https://worklog-liard.vercel.app/',
      'https://www.softstepscarpets.com/',
      'https://www.surakshawalls.space/',
      'https://library-six-ashy.vercel.app/',
      'https://farf.vercel.app/',
      'https://madad-qr.vercel.app/',
      'https://dandata-neon.vercel.app/home'
    ]);
  });

  it('assigns every application to a supported category and opening mode', () => {
    for (const application of APPLICATIONS) {
      expect(APPLICATION_CATEGORIES).toContain(application.category);
      expect(application.openingMode).toBe('same-tab');
      expect(application.status).toBe('live');
    }
  });

  it('accepts HTTPS destinations and rejects unsafe or malformed URLs', () => {
    expect(isSafeDestination('https://example.com/')).toBeTrue();
    expect(isSafeDestination('http://example.com/')).toBeFalse();
    expect(isSafeDestination('javascript:alert(1)')).toBeFalse();
    expect(isSafeDestination('not a url')).toBeFalse();
  });
});
