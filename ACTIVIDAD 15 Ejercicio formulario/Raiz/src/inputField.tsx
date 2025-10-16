interface inputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}
export function InputField({ label, type, value, onChange, placeholder }: inputFieldProps) {
    return (
        <div>
            <label>{label}:</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}