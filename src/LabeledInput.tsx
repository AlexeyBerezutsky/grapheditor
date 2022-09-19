type Props = {
    value?: number,
    name: string,
    onInput: (value: number) => void
};

export const LabeledInput = ({ value, name, onInput }: Props) => {
    return (
    <div className="coordinate">
        <label>{name}</label>
        <input
            value={value || ''}
            onChange={(event) => { onInput(+event.target.value) }}
        />
    </div>)
}