var path = require('path');

module.exports = function (callerPath) {
    var absJXcorePath = path.resolve(__dirname),
        absPublicPath = path.resolve(absJXcorePath, './public'),
        absBuildPath = path.resolve(absJXcorePath, './build');

    return {
        absJXcorePath: absJXcorePath,
        publicPath: path.relative(callerPath, absPublicPath),
        buildPath: path.relative(callerPath, absBuildPath)
    };
};