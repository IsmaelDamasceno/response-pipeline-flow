import { ReactElement } from "react";
import { GoPlus } from "react-icons/go";

interface Props {
  icon: () => ReactElement;
  content: string;
  nativeProps?: {
    button?: Omit<React.ComponentProps<"button">, "type">;
    iconWrapper?: React.ComponentProps<"div">;
    contentParagraph?: React.ComponentProps<"p">;
  };
}

export function DataPicker({ icon, content, nativeProps }: Props) {
  const { button, contentParagraph, iconWrapper } = nativeProps ?? {};
  const { className: buttonClassName, ...buttonProps } = button ?? {};
  const { className: contentClassName, ...contentParagraphProps } =
    contentParagraph ?? {};
  const { className: iconWrapperClassName, ...iconWrapperProps } =
    iconWrapper ?? {};

  return (
    <button
      type="button"
      className={`data-picker data-picker-wrapper input-area flex items-center px-1 gap-x-1 cursor-pointer nodrag ${
        buttonClassName ?? ""
      }`}
      {...buttonProps}
    >
      <div className="data-picker data-picker-content grow flex gap-x-1 items-center">
        <div
          className={`data-picker data-picker-icon-wrapper ${
            iconWrapperClassName ?? ""
          }`}
          {...iconWrapperProps}
        >
          {icon()}
        </div>
        <p
          className={`data-picker data-picker-content ${
            contentClassName ?? ""
          }`}
          {...contentParagraphProps}
        >
          {content}
        </p>
      </div>
      <div className="data-picker data-picker-plus cursor-pointer">
        <GoPlus />
      </div>
    </button>
  );
}
