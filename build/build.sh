#!/bin/bash

rm -rf dist
mkdir dist
stylus lib/*.styl --out dist/
babel --out-dir dist lib/*.js
mv dist/lib/* dist/
rm -r dist/lib