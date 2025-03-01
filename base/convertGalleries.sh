#!/bin/bash

src="${1%/}"
dest="${2%/}"

# Crea struttura directory
find "$src" -type d | while read -r dir; do
    rel_dir="${dir#$src/}"
    mkdir -p "$dest/$rel_dir"
done

# Converti immagini (versione corretta)
find "$src" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.tiff" -o -iname "*.tif" -o -iname "*.png" \) -print0 | while IFS= read -r -d '' file; do
    rel_path="${file#$src/}"
    dest_file="$dest/${rel_path%.*}.webp"
    cwebp -af -resize 1200 0 -quiet "$file" -o "$dest_file"
done
