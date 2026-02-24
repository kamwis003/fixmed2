export const ROUTES = {
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  UPDATE_PASSWORD: '/update-password',

  // Dashboard routes
  DASHBOARD: '/',

  // Account routes
  ACCOUNT: '/account',
  BILLING: '/billing',

  // Payment routes
  PAYMENT: {
    SUCCESS: '/payment-success',
    CANCELLED: '/payment-cancelled',
  },

  // Legal routes
  TERMS_OF_SERVICE: '/terms-of-service',
  PRIVACY_POLICY: '/privacy-policy',

  // Home route
  HOME: '/',

  // Fertility routes
  FERTILITY: '/fertility',
  FERTILITY_TRACKING: '/fertility/tracking',
  FERTILITY_CALENDAR: '/fertility/calendar',
  FERTILITY_EDUCATION: '/fertility/education',
  FERTILITY_CONSULTATION: '/fertility/consultation',
} as const