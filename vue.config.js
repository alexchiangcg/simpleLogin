module.exports = {
    outputDir: "dist",
    lintOnSave: true,
    runtimeCompiler: false,
    productionSourceMap: false,
    devServer: {
        open: true,
        port: 9001,
        proxy: {
            '/api': {
                target: 'https://stgfirmapi.futuregame.com.tw',
                changeOrigin: true,
            }
        }
    },
};
