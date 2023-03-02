module.exports = ({ env }) => ({
  settings: {
    cors: {
      enabled: true,
      origin: env("FRONTEND_URL", "*"),
      expose: ["WWW-Authenticate", "Server-Authorization"],
      maxAge: 31536000,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
      headers: [
        "Content-Type",
        "Authorization",
        "X-Frame-Options",
        "access-control-allow-origin",
        "Access-Control-Allow-Methods",
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Credentials",
        "Access-Control-Max-Age",
      ],
    },
  },
});
