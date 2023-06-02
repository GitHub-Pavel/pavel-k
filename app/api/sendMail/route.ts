import sendgridMail from "@sendgrid/mail";
import { NextResponse } from "next/server";
import { FormProps } from "../../../components/templates/ContactForm/ContactForm";

export async function POST(request: Request) {
    try {
        const data: Record<keyof FormProps, string | undefined> = await request.json();
        const hasMessage = data.message !== undefined && data.message !== "";

        const email = data.email !== undefined && `email: ${data.email}`;
        const name = data.name !== undefined && `name: ${data.name}`;
        const message = hasMessage ? `message: ${data.message}` : '';

        if (!email || !name) {
            const errorMessages: string[] = [];

            if (!email) errorMessages.push("Email field missing"); 
            if (!name) errorMessages.push("Name field missing"); 

            return NextResponse.json({message: errorMessages}, {status: 403});
        }

        const msg = {
            to: process.env.EMAIL_ADDRESS as string,
            from: process.env.EMAIL_ADDRESS as string,
            subject: 'Contact form',
            text: `
                ${name}\n
                ${email}\n
                ${message}
            `,
        };

        sendgridMail.setApiKey(process.env.SENDGRID_API_KEY as string);
        const sendResponse = await sendgridMail.send(msg);

        return NextResponse.json({status: sendResponse[0].statusCode});
    } catch (error: any) {
        return NextResponse.json(error, {status: error.code});
    }
}