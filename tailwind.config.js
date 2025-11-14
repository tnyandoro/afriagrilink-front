export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-bg": "url('/src/assets/images/bg-login.jpg')",
        "register-bg": "url('/src/assets/images/bg-register.jpg')",
        "bg-landing": "url('/src/assets/images/bg-landing.jpg')",
      },
    },
  },
  plugins: [],
};
