import { routes } from './app.routes';

describe('routes', () => {
  const paths = routes.map(r => r.path);

  it('should have unique paths', () => {
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('should give every page a document title', () => {
    for (const route of routes.filter(r => r.redirectTo === undefined)) {
      expect(route.title).withContext(String(route.path)).toBeTruthy();
    }
  });

  it('should keep the old Hilvar link and send unknown URLs home', () => {
    expect(paths).toContain('classes/warriors/hilvar');
    expect(routes.find(r => r.path === '**')?.redirectTo).toBe('');
  });

  it('should not expose the shell components as pages', () => {
    expect(paths).not.toContain('navbar');
    expect(paths).not.toContain('jukebox');
  });
});
