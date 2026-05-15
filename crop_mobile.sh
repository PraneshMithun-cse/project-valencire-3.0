#!/bin/bash
DIR="/Users/pranesh/Music/Valencire2.0/public/images"
for img in "$DIR"/*.png; do
  # Skip already generated mobile images
  if [[ "$img" == *-mobile.png ]]; then
    continue
  fi
  
  # Skip logo
  if [[ "$img" == *logo_final.png ]]; then
    continue
  fi

  filename=$(basename "$img" .png)
  out="$DIR/${filename}-mobile.png"
  
  W=$(sips -g pixelWidth "$img" | grep -Eo '[0-9]+' | tail -1)
  H=$(sips -g pixelHeight "$img" | grep -Eo '[0-9]+' | tail -1)
  
  # Target 9:16 aspect ratio
  # If image is wider than 9:16
  TARGET_W=$((H * 9 / 16))
  TARGET_H=$H
  
  if [ $TARGET_W -gt $W ]; then
    TARGET_W=$W
    TARGET_H=$((W * 16 / 9))
  fi
  
  echo "Cropping $img to ${TARGET_H}x${TARGET_W}..."
  sips -c $TARGET_H $TARGET_W "$img" --out "$out" > /dev/null
done
