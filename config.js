// Frontend Configuration - DO NOT COMMIT TO GIT
// This file contains sensitive configuration that should not be exposed in public repositories

const CONFIG = {
    // API Configuration
    API_BASE_URL: 'https://unobtrix-project-backend.onrender.com',
    
    // Analytics Configuration (disabled for security - enable only if needed)
    CLARITY_PROJECT_ID: null, // Set to 'tu6s87m19d' to enable analytics
    
    // Supabase Configuration (placeholders - update with actual values if needed)
    SUPABASE_URL: 'https://your-project.supabase.co',
    SUPABASE_ANON_KEY: 'your-anon-key'
};

// Make config available globally
window.CONFIG = CONFIG;

// Dynamic config loader and Supabase client bootstrap
(function() {
    const isPlaceholder = () => (
        !CONFIG.SUPABASE_URL || CONFIG.SUPABASE_URL.includes('your-project') ||
        !CONFIG.SUPABASE_ANON_KEY || CONFIG.SUPABASE_ANON_KEY.includes('your-anon-key')
    );

    async function tryFetch(path) {
        try {
            const res = await fetch(`${CONFIG.API_BASE_URL}${path}`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' },
                mode: 'cors'
            });
            if (!res.ok) return null;
            const json = await res.json();
            return json;
        } catch (e) {
            return null;
        }
    }

    async function loadFromBackend() {
        const candidates = [
            '/api/frontend-config',
            '/api/config/supabase',
            '/api/config',
            '/config',
            '/api/env',
            '/env'
        ];
        for (const path of candidates) {
            const data = await tryFetch(path);
            if (data && (data.SUPABASE_URL || data.supabaseUrl)) {
                CONFIG.SUPABASE_URL = data.SUPABASE_URL || data.supabaseUrl;
                CONFIG.SUPABASE_ANON_KEY = data.SUPABASE_ANON_KEY || data.supabaseAnonKey || CONFIG.SUPABASE_ANON_KEY;
                window.CONFIG = CONFIG; // re-expose
                return true;
            }
        }
        return false;
    }

    // Public: ensure CONFIG is loaded from backend if placeholders
    window.loadConfigFromBackend = async function() {
        if (!isPlaceholder()) return CONFIG;
        await loadFromBackend();
        return CONFIG;
    };

    // Public: get Supabase client (awaits config and caches client)
    window.getSupabaseClient = async function() {
        if (window.SUPABASE_CLIENT) return window.SUPABASE_CLIENT;
        await window.loadConfigFromBackend();
        if (!window.supabase || !CONFIG.SUPABASE_URL || !CONFIG.SUPABASE_ANON_KEY) {
            throw new Error('Supabase SDK or config not available');
        }
        window.SUPABASE_CLIENT = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
        return window.SUPABASE_CLIENT;
    };
})();