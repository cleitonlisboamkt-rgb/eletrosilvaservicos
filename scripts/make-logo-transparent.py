from PIL import Image, ImageFilter
import os

src = r"C:\Users\Cleiton Lisboa\OneDrive\Desktop\Eletrosilva\img\logo.jpg"
dst = r"C:\Users\Cleiton Lisboa\OneDrive\Desktop\Eletrosilva\img\logo.png"

img = Image.open(src).convert("RGBA")
w, h = img.size
pixels = img.load()

# Flood-fill style: mark near-background pixels from corners
from collections import deque

def is_bg(r, g, b):
    brightness = (r + g + b) / 3.0
    # light cool gray / off-white backgrounds in the JPG
    spread = max(r, g, b) - min(r, g, b)
    return brightness >= 205 and spread <= 35 and min(r, g, b) >= 185

visited = [[False] * w for _ in range(h)]
q = deque()
for sx, sy in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), (w // 2, 0), (0, h // 2)]:
    r, g, b, a = pixels[sx, sy]
    if is_bg(r, g, b):
        q.append((sx, sy))
        visited[sy][sx] = True

while q:
    x, y = q.popleft()
    r, g, b, a = pixels[x, y]
    brightness = (r + g + b) / 3.0
    if brightness >= 235:
        alpha = 0
    else:
        alpha = int(max(0, min(255, (235 - brightness) * 4)))
    pixels[x, y] = (r, g, b, alpha)
    for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
        if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
            nr, ng, nb, na = pixels[nx, ny]
            if is_bg(nr, ng, nb):
                visited[ny][nx] = True
                q.append((nx, ny))

# Also clear remaining isolated near-white pixels (not connected)
for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if a > 0 and min(r, g, b) > 245:
            pixels[x, y] = (r, g, b, 0)

bbox = img.getbbox()
if bbox:
    pad = 12
    img = img.crop((
        max(0, bbox[0] - pad),
        max(0, bbox[1] - pad),
        min(w, bbox[2] + pad),
        min(h, bbox[3] + pad),
    ))

img.save(dst, "PNG", optimize=True)
px = img.load()
print("saved", dst, img.size, os.path.getsize(dst))
print("corners", px[0, 0], px[img.width - 1, 0], px[0, img.height - 1], px[img.width - 1, img.height - 1])
