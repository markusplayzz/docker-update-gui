module.exports = {
    apps: [
    {
        name: 'server',
        script: './dist/index.js',
            env: {
                PORT: 3000,
                NODE_ENV: 'production',
            },
        },
    ],
}
