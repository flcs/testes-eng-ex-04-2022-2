#### npm i -D typescript @types/node jest @types/jest ts-jest ts-node-dev
#### npm i express
#### npm i -D @types/express

#### npx tsc --init
#### npx jest --init

#### no tsconfig.json
```bash
{
  "compilerOptions": {
    "target": "ES6",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "experimentalDecorators": true,                   /* Enable experimental support for TC39 stage 2 draft decorators. */
    "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    "module": "commonjs",                                /* Specify what module code is generated. */
    "rootDir": "./src",                                  /* Specify the root folder within your source files. */
    // "moduleResolution": "node",                       /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    "outDir": "./dist",                                   /* Specify an output folder for all emitted files. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */
    "strict": true,                                      /* Enable all strict type-checking options. */
    "strictPropertyInitialization": false,             /* Check for class properties that are declared but not set in the constructor. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}
```

#### no jest.config.js
```bash
$ cat jest.config.js | grep -v "^  //.*$" | grep -v "^$"
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
};
```


### no package.json
```bash
  "main": "src/index.ts",
  "repository": {
    "type": "git",
    "url": "http://gitlab.com/flcs/decode-010.git"
  },
  "scripts": {
    "dev": "tsnd src",
    "test": "jest"
  },
```
