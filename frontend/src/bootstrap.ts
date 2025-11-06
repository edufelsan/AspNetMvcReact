/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our ASP.NET Core back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the shared Inertia data.
 */

import axios from 'axios';
import { router } from '@inertiajs/react';

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Set up CSRF token for axios from Inertia shared data
router.on('navigate', (event) => {
  const page = event.detail.page;
  if (page.props.csrf_token && typeof page.props.csrf_token === 'string') {
    axios.defaults.headers.common['X-XSRF-TOKEN'] = page.props.csrf_token;
  }
});