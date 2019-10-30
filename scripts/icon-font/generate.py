from subprocess import call
import os
import json

BUILDER_PATH = os.path.dirname(os.path.abspath(__file__))

def main():
  generate_font_files()

def generate_font_files():
  print "Generate Fonts"
  cmd = "fontforge -script %s/generate_font.py" % (BUILDER_PATH)
  call(cmd, shell=True)

if __name__ == "__main__":
  main()
