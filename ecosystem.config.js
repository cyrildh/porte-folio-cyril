module.exports = {
    apps: [
      {
        name: 'server',
        script: 'server.js',
        instances: 1,
        autorestart: true,
        watch: false,
        env: {
          NODE_ENV: 'production',
          PORT: 3002,
          EMAIL_USER: 'cyril.dohin@gmail.com',
          EMAIL_PASS: 'zuey keba ggmp jzvj',
          AWS_REGION: 'eu-west-3',
        },
      },
    ],
  };
  