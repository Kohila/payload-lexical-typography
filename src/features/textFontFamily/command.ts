import { createCommand } from "@payloadcms/richtext-lexical/lexical";

export const TEXT_FONT_FAMILY_COMMAND = createCommand<{ fontFamily: string; fontLabel: string }>(
  "TEXT_FONT_FAMILY_COMMAND",
);
