#!/bin/bash

################################################################
# Convert calls of lct-web-stage to lct-web in production build.
################################################################
dev_url="lct-web-stage"
prod_url="lct-web"
cd build
echo "Find files with development web service URL"
files=$(grep -lr "${dev_url}" --include="*" .)
echo "Replace development URL with production URL"
for file in ${files}
do
    echo "${file}"
    sed -i.backup s/${dev_url}\./${prod_url}\./g ${file}
done
echo "Clean up"
find . -name "*.backup" -type f -delete
