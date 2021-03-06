const express = require("express");
const path = require("path");
const shrinkRay = require("shrink-ray");
const expressStaticGzip = require("express-static-gzip");
const { graphiqlExpress } = require("graphql-server-express");

const router = express.Router();

// =============================================================================
// STATICS
// =============================================================================

if (process.env.NODE_ENV === "production") {
  router.use(
    expressStaticGzip(path.resolve(path.join(__dirname, "../build")), {
      indexFromEmptyFile: false,
      enableBrotli: true,
      customCompressions: [
        {
          encodingName: "deflate",
          fileExtension: "zz"
        }
      ]
    })
  );
} else {
  router.use(express.static(path.resolve(path.join(__dirname, "../build"))));
}

// =============================================================================
// API Middleware
// =============================================================================

router.use(shrinkRay());

// =============================================================================
// GRAPHQL ROUTER
// =============================================================================

router.use("/graph", require("./graph"));
router.use("/iql", graphiqlExpress({ endpointURL: "/graph" }));

// =============================================================================
// ROUTES
// =============================================================================

router.use("/api", require("./api"));

module.exports = router;
