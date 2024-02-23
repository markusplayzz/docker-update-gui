module.exports = {
    apps: [
    {
        name: 'server',
        script: './index.js',
            env: {
                PORT: 3000,
                NODE_ENV: 'production',
            },
        },
    ],
}
