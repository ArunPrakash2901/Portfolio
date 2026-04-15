content = open('app/page.tsx', encoding='utf-8').read()

# Find and print exact substring for debugging
idx = content.find('Piano covers')
print("Found at:", idx)
print("Surrounding:", repr(content[idx-5:idx+300]))
