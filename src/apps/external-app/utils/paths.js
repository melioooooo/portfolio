/**
 * Helper to get the correct asset path.
 * When running in WordPress, it uses a global variable injected by the plugin.
 * When running locally in Vite, it defaults to the relative path.
 */
export const getAssetPath = (path) => {
    // In our portfolio integration, assets are in public/assets.
    // So we just need to ensure the path starts with /assets/

    // If the path already includes 'assets/' but assumes relative, we fix it.
    // If we pass 'assets/images/logo.png', we want '/assets/images/logo.png'

    // Normalize path to remove leading slash
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;

    // If it's starting with assets, prepend / to make it absolute from domain root
    if (cleanPath.startsWith('assets/')) {
        return `/${cleanPath}`;
    }

    // Fallback
    return `/${cleanPath}`;
};
