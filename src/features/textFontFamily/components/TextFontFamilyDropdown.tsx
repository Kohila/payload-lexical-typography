import { type LexicalEditor } from "@payloadcms/richtext-lexical/lexical";

import { useEffect, useState } from "react";

import { FontPicker } from "./TextFontFamilyPicker";

import { type TextFontFamilyItem } from "../feature.client";

export const Dropdown = ({ editor, item }: { editor: LexicalEditor; item: TextFontFamilyItem }) => {
  const [activeFontFamily, setActiveFontFamily] = useState<string>("");

  const onChange = (fontFamily: string, fontLabel: string) => {
    editor.dispatchCommand(item.command, { fontFamily, fontLabel });
    setActiveFontFamily(fontFamily || "");
  };

  useEffect(() => {
    editor.read(() => {
      const current = item.current ? item.current() : null;
      if (current) setActiveFontFamily(current);
    });
  }, [editor, item]);

  return (
    <FontPicker
      fontFamily={activeFontFamily}
      onChange={onChange}
      hideAttribution={item.hideAttribution}
      method={item.method}
      scroll={item.scroll}
      fonts={item.fonts}
    />
  );
};
