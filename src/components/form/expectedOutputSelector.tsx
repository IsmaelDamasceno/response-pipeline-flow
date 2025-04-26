import { BaseExpectList } from "../../types/baseExpect";

type SelectProps = React.ComponentProps<'select'>;
type OptionProps = Omit<React.ComponentProps<'option'>, 'value'>;

interface Props {
    selectProps?: SelectProps;
    optionProps?: OptionProps;
}

export function ExpectedOutputselector(props: Props) {
    return (
        <select {...props.selectProps}>
            {BaseExpectList.map(exp => (
                <option key={exp} {...props.optionProps} value={exp}>{exp}</option>
            ))}
        </select>
    );
}
