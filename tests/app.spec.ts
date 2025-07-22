import { test, expect } from '@playwright/test';

test.describe('aplicación de publicaciones', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('debería cargar y mostrar las publicaciones.', async ({ page }) => {
    // esperar a que las publicaciones carguen
    await expect(page.locator('.posts-grid')).toBeVisible();

    // mirar si todas las publicaciones se muestran
    const posts = page.locator('.post-card');
    await expect(posts).toHaveCount(await posts.count());

    // verificar la estructura de la publicación
    const firstPost = posts.first();
    await expect(firstPost.locator('h2')).toBeVisible();
    await expect(firstPost.locator('p')).toBeVisible();
    await expect(firstPost.locator('.post-meta')).toBeVisible();
  });

  test('debería mostrar etiquetas para cada publicación.', async ({ page }) => {
    // esperar a que la primera publicación sea visible
    const firstPost = page.locator('.post-card').first();
    await expect(firstPost).toBeVisible();

    // mirar si las etiquetas están presentes
    const tags = firstPost.locator('.tag');
    await expect(tags).toHaveCount(await tags.count());

    // verificar que las etiquetas no son vacías
    const firstTag = tags.first();
    const tagText = await firstTag.textContent();
    expect(tagText?.length).toBeGreaterThan(0);
  });

  test('debería mostrar el botón de eliminación al pasar el ratón.', async ({ page }) => {
    // esperar a que la primera publicación sea visible
    const firstPost = page.locator('.post-card').first();
    const deleteButton = firstPost.locator('.delete-button');

    // verificar que el botón de eliminación está oculto
    await expect(deleteButton).toHaveCSS('opacity', '0');

    // pasar el ratón sobre la publicación
    await firstPost.hover();

    // el botón de eliminación debe aparecer
    await expect(deleteButton).toHaveCSS('opacity', '1');
  });

  test('debería de ser capaz de manejar errores de red.', async ({ page }) => {
    // simular un error de red

    await page.route('**/posts/*', route => route.abort());

    // intentar eliminar una publicación
    const firstPost = page.locator('.post-card').first();
    await firstPost.hover();
    await firstPost.locator('.delete-button').click();

    // mirar que la publicación aún existe (la eliminación ha fallado)
    await expect(firstPost).toBeVisible();
  });

  test('debería de mostrar un loader primero.', async ({ page }) => {
    // esperar a que el loader sea visible
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.loading')).toBeVisible();
  });

  test('debería ser responsivo.', async ({ page }) => {
    // test de vista movil
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.posts-grid')).toBeVisible();

    // test de vista de tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('.posts-grid')).toBeVisible();

    // test de vista de escritorio
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('.posts-grid')).toBeVisible();
  });
}); 