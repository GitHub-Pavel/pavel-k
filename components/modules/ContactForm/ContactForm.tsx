'use client';

import axios from "axios";
import * as yup from "yup";
import classNames from "classnames";
import { FC, useState } from "react";
import { useNotifiction } from "@hooks";
import { useForm } from "react-hook-form";
import css from "./ContactForm.module.css";
import { Button, Input, Textarea } from "@components";
import { yupResolver } from "@hookform/resolvers/yup";


type ContactFormProps = {
    withMessage?: boolean;
}

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string(),
}).required();

export type FormProps = yup.InferType<typeof schema>;

export const ContactForm: FC<ContactFormProps> = ({withMessage}) => {
    const [loading, setLoading] = useState(false);
    const [apiError, setError] = useState<string | null>(null);
    const openSuccess = useNotifiction("contact-form");

    const { register, handleSubmit, reset, formState:{ errors } } = useForm<FormProps>({
        resolver: yupResolver(schema)
    });
    const onSubmit = async (data: FormProps) => {
        try {
            setLoading(true);
            await axios.post('/api/sendMail', data);
            setLoading(false);
            openSuccess();
            reset();
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    };

    const formErrors = Boolean(errors.name || errors.email);
    const wrapClasses = classNames({[css.wrap]: withMessage});
    const btnClasses = classNames({"flex justify-center": withMessage});

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={wrapClasses}>
                <div>
                    <Input 
                        type="text"
                        className="mb-4"
                        placeholder="Name*"
                        {...register("name")}
                        error={errors.name?.message}
                    />
                    <Input
                        type="email"
                        className="mb-9"
                        placeholder="Email*"
                        {...register("email")}
                        error={errors.email?.message}
                    />
                </div>
                {withMessage && (
                    <Textarea 
                        className="mb-9"
                        {...register("message")}
                        error={errors.message?.message}
                        placeholder="Message ( For example link to docs file )"
                    />
                )}
            </div>
            <div className={btnClasses}>
                <Button
                    loading={loading}
                    error={apiError || formErrors}
                >Submit</Button>
            </div>
            {apiError && (
                <div className="border-l-4 border-red text-red p-3 mt-6 text-small">
                    <p dangerouslySetInnerHTML={{__html: apiError}}/>
                </div>
            )}
        </form>
    );
}