export const paths = {
  // Landing page route
  landing: {
    home: {
      path: "/",
      getHref: () => "/",
    },
    blog: {
      path: "demo",
      getHref: () => "/demo",
    },
    pricing: {
      path: "pricing",
      getHref: () => "/pricing",
    },
    features: {
      path: "features",
      getHref: () => "/features",
    },
  },

  // Auth routes
  auth: {
    login: {
      path: "login",
      getHref: () => "/login",
    },
    signup: {
      path: "signup",
      getHref: () => "/signup",
    },
    verify: {
      path: "verify",
      getHref: () => "/verify",
    },
    reset: {
      path: "reset",
      getHref: () => "/reset",
    },
    resetPassword: {
      path: "reset-password",
      getHref: () => "/reset-password",
    },
  },

  // App (protected) routes
  app: {
    home: {
      path: "home",
      getHref: () => "/home",
    },
  },
} as const;
