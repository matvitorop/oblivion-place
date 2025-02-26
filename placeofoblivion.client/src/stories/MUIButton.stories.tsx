import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@mui/material";

const meta: Meta<typeof Button> = {
    title: "Components/MUIButton",
    component: Button,
    argTypes: {
        variant: { control: "radio", options: ["contained", "outlined", "text"] },
        color: { control: "radio", options: ["primary", "secondary", "error", "success", "warning"] },
        size: { control: "radio", options: ["small", "medium", "large"] },
        children: { control: "text" },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        variant: "contained",
        color: "primary",
        size: "medium",
        children: "Primary Button",
    },
};

export const Outlined: Story = {
    args: {
        ...Primary.args,
        variant: "outlined",
        children: "Outlined Button",
    },
};

export const LargeDanger: Story = {
    args: {
        ...Primary.args,
        color: "error",
        size: "large",
        children: "Large Danger Button",
    },
};
