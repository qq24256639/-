#!/usr/bin/env bash
unzip download*.zip
cp -f font*/iconfont.js src/icons/icon-font/iconfont.js
rm -rf font*
rm download*.zip
