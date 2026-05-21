#!/usr/bin/env python3
"""
Generate English replacement sprites for RaconH texture atlases.
Sprites are kept within original trimmed bounds to avoid atlas overlap corruption.
Run this, then inject each sprite back using sprite_tool.py inject.
"""
import os, json, sys
from PIL import Image, ImageDraw, ImageFont

SPRITES_DIR    = os.path.join(os.path.dirname(__file__), 'sprites')
PACKS_DIR      = os.path.join(os.path.dirname(__file__),
    'raconh5/client/main/bin-release/web/221211145302/resource/packs')
FONT_BOLD      = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'

CREAM  = (255, 240, 200, 255)
WHITE  = (255, 255, 255, 255)
SHADOW = (60,  30,   5, 255)


def best_font(size):
    try:
        return ImageFont.truetype(FONT_BOLD, size)
    except Exception:
        return ImageFont.load_default()


def fit_font(draw, text, max_w, max_size=28, min_size=10):
    """Find largest font that makes text fit within max_w pixels."""
    for size in range(max_size, min_size - 1, -1):
        font = best_font(size)
        bbox = draw.textbbox((0, 0), text, font=font)
        if (bbox[2] - bbox[0]) <= max_w:
            return font, size
    return best_font(min_size), min_size


def draw_centered(draw, text, cx, cy, font, fill=CREAM, shadow=SHADOW):
    """Draw text centred at (cx, cy) with drop shadow."""
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    x = cx - tw // 2 - bbox[0]
    y = cy - th // 2 - bbox[1]
    draw.text((x + 1, y + 2), text, font=font, fill=shadow)
    draw.text((x,     y),     text, font=font, fill=fill)


def sample_strip(img, strip_h=5):
    """
    Sample average RGBA from top + bottom strips of the ORIGINAL sprite
    (ignoring fully-transparent pixels). Returns an (R,G,B,255) tuple.
    """
    w, h = img.size
    pixels = []
    for x in range(w):
        for y_row in list(range(strip_h)) + list(range(h - strip_h, h)):
            p = img.getpixel((x, y_row))
            if p[3] > 10:
                pixels.append(p)
    if not pixels:
        return (60, 30, 10, 255)
    r = sum(p[0] for p in pixels) // len(pixels)
    g = sum(p[1] for p in pixels) // len(pixels)
    b = sum(p[2] for p in pixels) // len(pixels)
    return (r, g, b, 255)


def get_orig_bounds(sheet_name, sprite_name):
    """Return (orig_w, orig_h, offX, offY, srcW, srcH) from JSON."""
    jpath = os.path.join(PACKS_DIR, sheet_name + '.json')
    with open(jpath, 'r', encoding='utf-8') as f:
        d = json.load(f)
    fr = d['frames'].get(sprite_name)
    if fr is None:
        return None
    return fr['w'], fr['h'], fr['offX'], fr['offY'], fr['sourceW'], fr['sourceH']


def make_label(sheet, sprite, text, fill=CREAM, text_margin_x=8):
    """
    Replace text in a sprite.
    - Keeps original background intact (erase old text with sampled bg colour).
    - Constrains new text to fit within original trimmed bounds.
    - Does NOT draw background outside the original visible area.
    """
    out_dir = os.path.join(SPRITES_DIR, sheet)
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, sprite + '.png')

    # Load original (full canvas, sourceW×sourceH)
    orig_path = os.path.join(SPRITES_DIR, sheet, sprite + '.png')
    if not os.path.exists(orig_path):
        print(f'  !! Need to extract first: {orig_path}')
        return None
    orig = Image.open(orig_path).convert('RGBA')
    srcW, srcH = orig.size

    # Get original trimmed bounds from JSON
    bounds = get_orig_bounds(sheet, sprite)
    if bounds is None:
        print(f'  !! {sprite} not found in {sheet}.json')
        return None
    orig_w, orig_h, offX, offY, _, _ = bounds

    # Background color sampled from horizontal strips of the ORIGINAL sprite
    bg = sample_strip(orig)

    # Build result: start with a transparent canvas
    result = Image.new('RGBA', (srcW, srcH), (0, 0, 0, 0))

    # Paste original sprite as base
    result.paste(orig, (0, 0), orig)

    # Erase the text area (the centre of the trimmed region) using bg fill
    # text sits in rows roughly [offY+4 .. offY+orig_h-4]
    tx0 = offX + text_margin_x
    tx1 = offX + orig_w - text_margin_x
    ty0 = offY + 4
    ty1 = offY + orig_h - 4
    draw = ImageDraw.Draw(result)
    draw.rectangle([tx0, ty0, tx1, ty1], fill=bg)

    # Choose font size that fits text within (orig_w - 2*text_margin_x)
    max_text_w = orig_w - 2 * text_margin_x - 4
    font, size = fit_font(draw, text, max_text_w, max_size=26, min_size=9)

    # Centre of trimmed region on the canvas
    cx = offX + orig_w  // 2
    cy = offY + orig_h  // 2
    draw_centered(draw, text, cx, cy, font, fill=fill)

    result.save(out_path)
    print(f'  [{sheet}] {sprite}: font_size={size}, fits in {orig_w}px → {out_path.split("/sprites/")[1]}')
    return out_path


if __name__ == '__main__':
    print('=== Generating English replacement sprites ===\n')

    # First make sure we have base sprites extracted
    import subprocess
    for sheet in ['loginsheet','bosssheet','activitysheet','stormsheet']:
        subprocess.run(['python3', 'sprite_tool.py', 'extract', sheet],
                       capture_output=True)

    make_label('loginsheet',    'login_serverTitle_png',          'Select Server')
    make_label('loginsheet',    'login_btnStart_png',             'Start Game', fill=WHITE)

    make_label('bosssheet',     'boss_title_1_png',               'All-Server')
    make_label('bosssheet',     'boss_title_2_png',               'Rare Drops')

    make_label('activitysheet', 'activity_title_0_png',           'Quest')
    make_label('activitysheet', 'activity_title_1_png',           'Sky Tower')
    make_label('activitysheet', 'activity_title_2_png',           'Arena')
    make_label('activitysheet', 'activity_title_3_png',           'Treasure')
    make_label('activitysheet', 'activity_title_act_png',         'Activity')
    make_label('activitysheet', 'activity_copy_label_0_png',      'Stage Rank')
    make_label('activitysheet', 'activity_copy_label_tiaozhan_png','Challenge')

    make_label('stormsheet',    'storm_title_png',                'Guild War')

    print('\nDone! Now inject each sprite back.')
