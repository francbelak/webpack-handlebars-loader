[![Build Actions Status](https://github.com/francbelak/webpack-handlebars-loader/workflows/master/badge.svg)](https://github.com/francbelak/webpack-handlebars-loader/actions)

| Statements                  | Branches                | Functions                 | Lines                |
| --------------------------- | ----------------------- | ------------------------- | -------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg)    |

# webpack-handlebars-loader

used in webpack-handlebars-static-file-generator

### Configuration (Options)

|Option| Description|
|--|--|
|`partials`| Path to partials folder (Currently only string is supported **without trailing slash**) |
|`relativePathTo`| Generate output folder structure relative to this path |
|`outputpath`| Folder for generated files |
|`data`| Folder for data.json files. Currently files starting with _ will be ignored in path structure |
|`rootData`| Root file for data - will be generated without subfolder |
|`extract`| Return markup as Object instead of writing it to file |
