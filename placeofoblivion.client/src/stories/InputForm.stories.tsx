import { Meta, StoryObj } from "@storybook/react";
import FormInput from "../components/reusable-items/FormInput"

import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const meta: Meta<typeof FormInput> = {
    title: "Components/FormInput",
    component: FormInput,
    tags: ["autodocs"],
    argTypes: {
        name: { control: "text" },
        label: { control: "text" },
        type: { control: "text" },
    },
}

export default meta;
type Story = StoryObj<typeof FormInput>;

const schema = yup.object().shape({
    example: yup.string().min(5, "To small text").required(),
});

const FormWrapper = (args: any) => {
    const { control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <Box width="300px">
            <FormInput {...args} control={control} errors={errors} />
        </Box>
    );
};

export const DefaultInput: Story = {
    render: (args) => <FormWrapper {...args} />,
    args: {
        name: "example",
        label: "Example Input",
        type: "text",
    },
}

export const PasswordInput: Story = {
    ...DefaultInput,
    args: {
        ...DefaultInput.args,
        type: "password",
        label: "Password",
    },
};