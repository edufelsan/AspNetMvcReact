import './bootstrap';
import './app.css';
import './i18n';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import axios from 'axios';


const appName = import.meta.env.VITE_APP_NAME || 'Asp.net core, React, Shadcn/ui, Tailwind & InertiaJs Starter Template';

// Manual page resolver without Laravel Vite Plugin
const resolvePageComponent = (name: string) => {
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });
    const page = pages[`./Pages/${name}.tsx`];
    if (!page) {
        throw new Error(`Page not found: ${name}`);
    }
    return page;
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(name),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Set CSRF token for axios from initial props
        if (props.initialPage.props.csrf_token && typeof props.initialPage.props.csrf_token === 'string') {
            axios.defaults.headers.common['X-XSRF-TOKEN'] = props.initialPage.props.csrf_token;
        }

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});