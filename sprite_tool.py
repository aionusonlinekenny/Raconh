#!/usr/bin/env python3
"""
Sprite Tool for RaconH game texture atlases.

Usage:
  python sprite_tool.py list   <sheet>              -- list all sprites in a sheet
  python sprite_tool.py extract <sheet> [sprite]    -- extract sprite(s) to ./sprites/<sheet>/
  python sprite_tool.py inject  <sheet> <sprite>    -- inject edited sprite back into atlas

Examples:
  python sprite_tool.py list rolesheet
  python sprite_tool.py extract rolesheet
  python sprite_tool.py extract rolesheet role_checkAttr_png
  python sprite_tool.py inject  rolesheet role_checkAttr_png

Sheet names (no path, no extension):
  rolesheet, mainsheet, loginsheet, equipsheet, bagsheet, ...
  (any file under resource/packs/ that has both .png and .json)
"""

import sys, json, os
from PIL import Image

PACKS_DIR = os.path.join(os.path.dirname(__file__),
    'raconh5/client/main/bin-release/web/221211145302/resource/packs')
SPRITES_DIR = os.path.join(os.path.dirname(__file__), 'sprites')


def load_sheet(sheet_name):
    """Load atlas PNG + JSON. Returns (image, frames_dict, json_path)."""
    png_path  = os.path.join(PACKS_DIR, sheet_name + '.png')
    json_path = os.path.join(PACKS_DIR, sheet_name + '.json')
    if not os.path.exists(png_path):
        sys.exit(f'ERROR: {png_path} not found')
    if not os.path.exists(json_path):
        sys.exit(f'ERROR: {json_path} not found')
    atlas = Image.open(png_path).convert('RGBA')
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    frames = data.get('frames', {})
    return atlas, frames, data, png_path, json_path


def cmd_list(sheet_name):
    _, frames, _, _, _ = load_sheet(sheet_name)
    print(f'{sheet_name}: {len(frames)} sprites\n')
    for name, f in sorted(frames.items()):
        print(f"  {name}")
        print(f"    atlas pos : x={f['x']} y={f['y']} w={f['w']} h={f['h']}")
        print(f"    canvas    : {f['sourceW']}x{f['sourceH']}  offset ({f['offX']},{f['offY']})")


def extract_sprite(atlas, frame, out_path):
    """
    Crop sprite from atlas, place on full sourceW×sourceH canvas, save.
    This is what you open and edit in Photoshop.
    IMPORTANT: keep canvas size (sourceW×sourceH) the same when saving back.
    """
    x, y, w, h = frame['x'], frame['y'], frame['w'], frame['h']
    offX, offY = frame['offX'], frame['offY']
    srcW, srcH = frame['sourceW'], frame['sourceH']

    # Crop the trimmed content from the atlas
    cropped = atlas.crop((x, y, x + w, y + h))

    # Place onto full-size canvas
    canvas = Image.new('RGBA', (srcW, srcH), (0, 0, 0, 0))
    canvas.paste(cropped, (offX, offY))
    canvas.save(out_path)
    return srcW, srcH


def cmd_extract(sheet_name, sprite_name=None):
    atlas, frames, _, png_path, _ = load_sheet(sheet_name)
    out_dir = os.path.join(SPRITES_DIR, sheet_name)
    os.makedirs(out_dir, exist_ok=True)

    targets = {}
    if sprite_name:
        if sprite_name not in frames:
            sys.exit(f'ERROR: sprite "{sprite_name}" not in {sheet_name}')
        targets[sprite_name] = frames[sprite_name]
    else:
        targets = frames

    print(f'Extracting {len(targets)} sprite(s) → {out_dir}/')
    for name, frame in sorted(targets.items()):
        out_path = os.path.join(out_dir, name + '.png')
        w, h = extract_sprite(atlas, frame, out_path)
        print(f'  {name}.png  ({w}×{h})')
    print(f'\nEdit in Photoshop then run:')
    print(f'  python sprite_tool.py inject {sheet_name} <sprite_name>')
    print(f'\nIMPORTANT: Keep canvas size the same (do NOT resize the document).')


def auto_trim(img):
    """
    Find tight bounding box of non-transparent pixels.
    Returns (offX, offY, trimmed_image) or full image if fully transparent.
    """
    bbox = img.getbbox()   # (left, upper, right, lower) of non-zero pixels
    if bbox is None:
        return 0, 0, img   # fully transparent, return as-is
    offX, offY = bbox[0], bbox[1]
    trimmed = img.crop(bbox)
    return offX, offY, trimmed


def cmd_inject(sheet_name, sprite_name):
    atlas, frames, json_data, png_path, json_path = load_sheet(sheet_name)

    if sprite_name not in frames:
        sys.exit(f'ERROR: sprite "{sprite_name}" not in {sheet_name}')

    edited_path = os.path.join(SPRITES_DIR, sheet_name, sprite_name + '.png')
    if not os.path.exists(edited_path):
        sys.exit(f'ERROR: edited file not found:\n  {edited_path}\n'
                 f'Run extract first, edit in Photoshop, then inject.')

    frame = frames[sprite_name]
    old_x, old_y    = frame['x'],   frame['y']
    old_w, old_h    = frame['w'],   frame['h']
    srcW, srcH      = frame['sourceW'], frame['sourceH']

    # Load edited image
    edited = Image.open(edited_path).convert('RGBA')
    if edited.size != (srcW, srcH):
        print(f'WARNING: canvas size changed: {edited.size} vs expected ({srcW},{srcH})')
        print('         This may break game layout. Resize will be ignored and original canvas kept.')
        # Paste edited onto correct-sized canvas
        canvas = Image.new('RGBA', (srcW, srcH), (0, 0, 0, 0))
        canvas.paste(edited.resize((srcW, srcH), Image.LANCZOS), (0, 0))
        edited = canvas

    # Auto-trim to find new tight bounds
    new_offX, new_offY, trimmed = auto_trim(edited)
    new_w, new_h = trimmed.size

    print(f'Sprite: {sprite_name}')
    print(f'  Old: atlas({old_x},{old_y}) size({old_w}×{old_h}) offset({frame["offX"]},{frame["offY"]})')
    print(f'  New: atlas({old_x},{old_y}) size({new_w}×{new_h}) offset({new_offX},{new_offY})')

    # Check if new trimmed size fits at original atlas position
    if new_w > old_w or new_h > old_h:
        print(f'\nWARNING: new trimmed size ({new_w}×{new_h}) is larger than original ({old_w}×{old_h}).')
        print('         The extra pixels may overlap neighboring sprites in the atlas.')
        print('         Consider making the button content fit within the original bounds.')
        ans = input('Continue anyway? [y/N] ').strip().lower()
        if ans != 'y':
            print('Aborted.')
            return

    # --- Update atlas PNG ---
    # Clear old sprite area first (fill with transparent)
    clear = Image.new('RGBA', (old_w, old_h), (0, 0, 0, 0))
    atlas.paste(clear, (old_x, old_y))
    # Paste new trimmed content
    atlas.paste(trimmed, (old_x, old_y), trimmed)

    # --- Update JSON frame entry ---
    frame['offX']    = new_offX
    frame['offY']    = new_offY
    frame['w']       = new_w
    frame['h']       = new_h
    # sourceW/sourceH stay the same (canvas = layout size)

    # --- Save backup then write ---
    bak_png  = png_path  + '.bak'
    bak_json = json_path + '.bak'
    if not os.path.exists(bak_png):
        import shutil
        shutil.copy2(png_path,  bak_png)
        shutil.copy2(json_path, bak_json)
        print(f'  Backup: {bak_png}')

    atlas.save(png_path)
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(json_data, f, ensure_ascii=False, separators=(',', ':'))

    print(f'\nDone! Updated:')
    print(f'  {png_path}')
    print(f'  {json_path}')
    print(f'\nCopy both files to your XAMPP game folder and refresh.')


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(0)

    cmd  = sys.argv[1].lower()
    sheet = sys.argv[2]

    if cmd == 'list':
        cmd_list(sheet)
    elif cmd == 'extract':
        sprite = sys.argv[3] if len(sys.argv) > 3 else None
        cmd_extract(sheet, sprite)
    elif cmd == 'inject':
        if len(sys.argv) < 4:
            sys.exit('Usage: inject <sheet> <sprite>')
        cmd_inject(sheet, sys.argv[3])
    else:
        print(f'Unknown command: {cmd}')
        print(__doc__)


if __name__ == '__main__':
    main()
