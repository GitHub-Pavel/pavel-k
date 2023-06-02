import sendgridMail from "@sendgrid/mail";
import { NextResponse } from "next/server";
import { FormProps } from "../../../components/modules/ContactForm/ContactForm";

export async function POST(request: Request) {
    try {
        const data: Record<keyof FormProps, string | undefined> = await request.json();
        const hasMessage = data.message !== undefined && data.message !== "";

        const email = data.email !== undefined && `Email: ${data.email}`;
        const name = data.name !== undefined && `Name: ${data.name}`;
        const message = hasMessage ? `Message: ${data.message}` : '';

        if (!email) 
            return NextResponse.json({message: "Email field missing"}, {status: 403}); 
        if (!name) 
            return NextResponse.json({message: "Name field missing"}, {status: 403}); 

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