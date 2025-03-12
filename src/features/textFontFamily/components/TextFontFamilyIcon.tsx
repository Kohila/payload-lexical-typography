import { COMMAND_PRIORITY_CRITICAL, SELECTION_CHANGE_COMMAND } from "@payloadcms/richtext-lexical/lexical";
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext";
import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from "@payloadcms/richtext-lexical/lexical/selection";

import { useEffect, useState } from "react";

import { getSelection } from "../../../utils/getSelection";
import { TEXT_FONT_FAMILY_COMMAND } from "../command";

export const TextFontFamilyIcon = () => {
  const [editor] = useLexicalComposerContext();
  const [fontFamily, setFontFamily] = useState<string>("");

  const updateCurrentFontFamily = () => {
    const selection = getSelection();
    if (selection) setFontFamily($getSelectionStyleValueForProperty(selection, "font-family", ""));
    return false;
  };

  useEffect(() => {
    return editor.registerCommand(
      TEXT_FONT_FAMILY_COMMAND,
      (payload) => {
        editor.update(() => {
          const selection = getSelection();
          if (selection) $patchStyleText(selection, { fontFamily: payload.fontFamily || "" });
        });
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor]);

  useEffect(() => {
    setTimeout(() => {
      return editor.read(updateCurrentFontFamily);
    });
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      updateCurrentFontFamily,
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor]);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 12h6" />
        <path d="M15 6h6" />
        <path d="m3 13 3.553-7.724a.5.5 0 0 1 .894 0L11 13" />
        <path d="M3 18h18" />
        <path d="M4 11h6" />
      </svg>
      <span style={{ fontFamily }}>Font: {fontFamily}</span>
    </>
  );
};
