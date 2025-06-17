import React from "react";

interface BodyProps extends React.PropsWithChildren {
  fullyCentered?: boolean;
  asColumn?: boolean;
  asContainer?: boolean;
}

/**
 * Body component that provides flexible layout options.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {boolean} [props.fullyCentered=false] - If true, centers the content both vertically and horizontally.
 * @param {boolean} [props.asColumn=false] - If true, arranges the content in a column layout.
 * @param {boolean} [props.asContainer=false] - If true, applies container styling to center the content with margins.
 * @param {React.ReactNode} props.children - The content to be displayed within the Body component.
 * @returns {React.ReactElement} The rendered Body component.
 */
const Body: React.FC<BodyProps> = ({
  children,
  fullyCentered = false,
  asColumn = false,
  asContainer = false,
}: BodyProps): React.ReactElement => {
  return (
    <main
      data-testid="body"
      className={`flex flex-1 justify-center ${
        fullyCentered ? "items-center" : ""
      } ${asColumn ? "flex-col" : ""}
       ${asContainer ? "container mx-auto" : ""}`}
    >
      {children}
    </main>
  );
};

export default Body;
