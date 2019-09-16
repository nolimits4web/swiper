import fontforge
import os
import md5
import subprocess
import tempfile
import json
import copy

SCRIPT_PATH = os.path.dirname(os.path.abspath(__file__))
BLANK_PATH = os.path.join(SCRIPT_PATH, 'blank.svg')
INPUT_SVG_DIR = os.path.join(SCRIPT_PATH, '..', '..', 'src/icons/svg')
OUTPUT_FONT_DIR = os.path.join(SCRIPT_PATH, '..', '..', 'src/icons/font')
AUTO_WIDTH = True
KERNING = 15

m = md5.new()

f = fontforge.font()
f.encoding = 'UnicodeFull'
f.design_size = 24
f.em = 24
f.ascent = 448
f.descent = 64

# Add lookup table
f.addLookup("ligatable","gsub_ligature",(),(("liga",(("latn",("dflt")),)),))
f.addLookupSubtable("ligatable","ligatable1")

# Import base characters
for char in "0123456789abcdefghijklmnopqrstuvwzxyz_- ":
  glyph = f.createChar(ord(char))
  glyph.importOutlines(BLANK_PATH)
  glyph.width = 0

font_name = 'swiper-icons';
m.update(font_name + ';')

for dirname, dirnames, filenames in os.walk(INPUT_SVG_DIR):
  for filename in filenames:
    name, ext = os.path.splitext(filename)
    filePath = os.path.join(dirname, filename)
    size = os.path.getsize(filePath)
    if ext in ['.svg', '.eps']:
      if ext in ['.svg']:
        # hack removal of <switch> </switch> tags
        svgfile = open(filePath, 'r+')
        tmpsvgfile = tempfile.NamedTemporaryFile(suffix=ext, delete=False)
        svgtext = svgfile.read()
        svgfile.seek(0)

        # replace the <switch> </switch> tags with 'nothing'
        svgtext = svgtext.replace('<switch>', '')
        svgtext = svgtext.replace('</switch>', '')

        tmpsvgfile.file.write(svgtext)

        svgfile.close()
        tmpsvgfile.file.close()

        filePath = tmpsvgfile.name
        # end hack

      m.update(name + str(size) + ';')

      glyph = f.createChar(-1, name)
      glyph.importOutlines(filePath)

      # Add ligatures
      ligature = [];
      for c in name:
        if (c == '_'):
          c = "underscore"
        if (c == '-'):
          c = "hyphen"
        if (c == ' '):
          c = "space"
        ligature.append(c)
      glyph.addPosSub('ligatable1', ligature)

      # if we created a temporary file, let's clean it up
      if tmpsvgfile:
        os.unlink(tmpsvgfile.name)

      # set glyph size explicitly or automatically depending on autowidth
      if AUTO_WIDTH:
        glyph.left_side_bearing = glyph.right_side_bearing = 0
        glyph.round()

    # resize glyphs if autowidth is enabled
    if AUTO_WIDTH:
      f.autoWidth(0, 0, 512)

fontfile = '%s/swiper-icons' % (OUTPUT_FONT_DIR)
print fontfile;
build_hash = m.hexdigest()

f.fontname = font_name
f.familyname = font_name
f.fullname = font_name

f.generate(fontfile + '.ttf')

scriptPath = os.path.dirname(os.path.realpath(__file__))
try:
  subprocess.Popen([scriptPath + '/sfnt2woff', fontfile + '.ttf'], stdout=subprocess.PIPE)
except OSError:
  # If the local version of sfnt2woff fails (i.e., on Linux), try to use the
  # global version. This allows us to avoid forcing OS X users to compile
  # sfnt2woff from source, simplifying install.
  subprocess.call(['sfnt2woff', fontfile + '.ttf'])


# Hint the TTF file
subprocess.call('ttfautohint -s -f -n ' + fontfile + '.ttf ' + fontfile + '-hinted.ttf > /dev/null 2>&1 && mv ' + fontfile + '-hinted.ttf ' + fontfile + '.ttf', shell=True)

# WOFF2 Font
subprocess.call('woff2_compress ' + fontfile + '.ttf', shell=True)
