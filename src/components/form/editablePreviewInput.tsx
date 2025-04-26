import { Dispatch, ReactNode, SetStateAction, useState } from "react";

interface Props {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  icon: ReactNode;

  nativeProps?: {
    wrapper?: React.ComponentProps<'div'>;
    input?: Omit<React.ComponentProps<'input'>, 'value' | 'onchange'>;
    span?: React.ComponentProps<'span'>;
    button?: Omit<React.ComponentProps<'button'>, 'onClick'>;
  }
}
export function EditablePreviewInput({ content, setContent, icon, nativeProps }: Props) {
  const [editing, setEditing] = useState(false);

  const { button, input, span, wrapper } = nativeProps ?? {};
  const { className: wrapperClassName } = wrapper ?? {};
  const { className: buttonClassName } = button ?? {};

  if (editing) {
    return (
      <div className={`w-full flex justify-center items-center ${wrapperClassName ?? ''}`} {...wrapper}>
        <input onKeyUp={e => e.key === 'Enter' && setEditing(false)} type="text" value={content} onChange={e => setContent(e.target.value)} {...input} />
        <button className={`p-1 cursor-pointer hover:scale-110 ${buttonClassName ?? ''}`} onClick={() => setEditing((prev) => !prev)} type="button" {...button}>
          {icon}
        </button>
      </div>
    );
  }

  return (
    <div className={`w-full flex justify-center items-center ${wrapperClassName ?? ''}`} {...wrapper}>
      <span {...span}>{content}</span>
      <button className={`p-1 cursor-pointer hover:scale-110 ${buttonClassName ?? ''}`} onClick={() => setEditing((e) => !e)} type="button" {...button}>
        {icon}
      </button>
    </div>
  );
}
