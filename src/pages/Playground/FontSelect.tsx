/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Button } from '@/components/ui/button'; // Assuming this is your button component // Import our new hook
import { useFontLoader } from '@/context/FontLoaderProvider';

interface Font {
  family: string;
  category: string;
}

interface FontSelectProps {
  fonts: Font[];
  selectedFont?: string;
  onChange?: (font: string) => void;
}

export default function FontSelect({
  fonts,
  selectedFont,
  onChange,
}: FontSelectProps) {
  const [open, setOpen] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const fontLoader = useFontLoader() as { loadFont: (font: string) => void } | undefined; // Use the hook here
  const loadFont = fontLoader?.loadFont ?? (() => {});

  const rowVirtualizer = useVirtualizer({
    count: fonts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  const handleSelect = (font: string) => {
    // The loadFont call here is technically optional because it will be loaded when the TextEditor renders,
    // but it's good practice to call it here to ensure it's loaded immediately after selection.
    loadFont(font); 
    onChange?.(font);
    setOpen(false);
  };
  
  // Use a useEffect to dynamically load fonts for the visible virtual items
  useEffect(() => {
    if (open) {
      const virtualItems = rowVirtualizer.getVirtualItems();
      const visibleFonts = virtualItems.map(item => fonts[item.index]);
      
      visibleFonts.forEach(font => {
        if (font) {
          loadFont(font.family);
        }
      });
    }
  }, [open, rowVirtualizer, fonts, loadFont]);

  return (
    <div className="relative w-60">
      <Button
        onClick={() => setOpen((o) => !o)}
        className="w-full justify-start"
        variant={'outline'}
      >
        {selectedFont || 'Select Font'}
      </Button>

      {open && (
        <div
          ref={parentRef}
          className="absolute bottom-full left-0 w-full max-h-80 overflow-y-auto border bg-zinc-900 rounded-lg mt-1 z-50 p-2.5"
        >
          <div
            style={{
              height: rowVirtualizer.getTotalSize(),
              position: 'relative',
              width: '100%',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const font = fonts[virtualRow.index];
              return (
                <div
                  key={font.family}
                  onClick={() => handleSelect(font.family)}
                  style={{
                    position: 'absolute',
                    top: virtualRow.start,
                    left: 0,
                    width: '100%',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    fontFamily: `'${font.family}', ${font?.category}`,
                  }}
                  className={`hover:bg-zinc-800 rounded-md`}
                  // The onMouseEnter here is now redundant with the useEffect above,
                  // but it's a valid alternative for pre-loading if you don't use the useEffect.
                >
                  {font.family}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}