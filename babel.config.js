module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        ['module-resolver', {
            alias: {
                '@controllers': './src/controllers',
                '@routes': './src/routes',
                '@models': './src/models',
                '@config': './src/config'
            }
        }]
    ],
    ignore: [
        '**/*.spec.ts'
    ]
}
