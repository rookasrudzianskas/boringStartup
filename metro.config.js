const { makeMetroConfig } = require("@rnx-kit/metro-config");
const {
    DuplicateDependencies,
} = require("@rnx-kit/metro-plugin-duplicates-checker");
const { MetroSerializer } = require("@rnx-kit/metro-serializer");

module.exports = makeMetroConfig({
    resolver: {
        blacklistRE: /#current-cloud-backend\/.*/
    },
    projectRoot: __dirname,
    serializer: {
        customSerializer: MetroSerializer([DuplicateDependencies()]),
    }
});

