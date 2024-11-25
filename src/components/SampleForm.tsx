import { TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form"

type FormValues = {
    name: string;
    email: string;
    password: string;
};

export const SampleForm = () => {
    const form = useForm<FormValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const { register, handleSubmit } = form;

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={2} width={400}>
                    <TextField label="Name" {...register("name", { required: true })} />
                    <TextField label="Email" {...register("email")} />
                    <TextField label="Password" type="password" {...register("password")} />
                    <Button type='submit' variant="contained" color="primary">
                        Login
                    </Button>
                </Stack>
            </form>
        </>
    );
};