import { type TextFontFamilyFeatureProps } from "../feature.client";

export const FontPicker = ({
  // fontFamily,
  onChange,
  hideAttribution,
  fonts,
  method = "replace",
  scroll = true,
}: {
  fontFamily: string;
  onChange: (fontFamily: string, fontLabel: string) => void;
} & TextFontFamilyFeatureProps) => {
  const defaultFontOptions = [
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "Courier New, monospace", label: "Courier New" },
    { value: "Georgia, serif", label: "Georgia" },
    { value: "Times New Roman, serif", label: "Times New Roman" },
    { value: "Trebuchet MS, sans-serif", label: "Trebuchet MS" },
    { value: "Verdana, sans-serif", label: "Verdana" },
  ];

  const options =
    method === "replace" ? (fonts ?? defaultFontOptions) : [...defaultFontOptions, ...(fonts ?? [])];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "165px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          padding: "8px",
          overflowY: scroll ? undefined : "auto",
          maxHeight: scroll ? undefined : "266px",
        }}
      >
        {options.map((font) => {
          const fontFamily = typeof font === "string" ? font : font.value;
          const fontLabel = typeof font === "string" ? "" : font.label;
          return (
            <div
              key={fontFamily}
              onClick={() => onChange(fontFamily, fontLabel)}
              style={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <span style={{ fontFamily }}>{typeof font === "string" ? font : font.label}</span>
            </div>
          );
        })}
      </div>
      <div
        style={{
          width: "100%",
          padding: "8px",
          display: "flex",
          gap: "8px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onChange("", "");
          }}
          className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup"
          style={{
            margin: 0,
          }}
        >
          Reset
        </button>
        {!hideAttribution && (
          <p
            style={{
              color: "var(--theme-elevation-650)",
              fontSize: "10px",
            }}
          >
            Made with ❤️ by{" "}
            <a target="_blank" href="https://github.com/AdrianMaj">
              @AdrianMaj
            </a>
          </p>
        )}
      </div>
    </div>
  );
};
