import { Controller } from "react-hook-form";
import { TextField} from "@mui/material";

/**
 * Form input properties 
 *
 * @interface FormInputProps
 * @property {string} name - Field name.
 * @property {any} control - Form contol from react-hook-form.
 * @property {string} label - Signature for the input field.
 * @property {string} type - Type of input field ("text" by default)
 * @property {any} errors - Object with errors
 */
interface FormInputProps {
    name: string;
    control: any;
    label: string;
    type?: string;
    errors: any;
}

/**
 * The `FormInput` component is a wrapper for the `TextField` using `react-hook-form`.
 * 
 * Used to integrate Material UI input fields with forms.
 *
 * @component
 * @param {string} name - Field`s name
 * @param {any} control - Controlling the react-hook-form
 * @param {string} label - Label text for the input field
 * @param {string} [type="text"] - Field`s type (наприклад, "password", "email")
 * @param {any} errors - Object with errors
 * @returns {JSX.Element} Input field with validation support
 */
export default function FormInput({ name, control, label, type = "text", errors }: FormInputProps) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <TextField
                    {...field}
                    label={label}
                    type={type}
                    fullWidth
                    margin="normal"
                    error={!!errors[name]}
                    helperText={errors[name]?.message}
                />
            )}
        />
    );
}