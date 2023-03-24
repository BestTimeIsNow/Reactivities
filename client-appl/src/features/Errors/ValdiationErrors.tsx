import { Message } from "semantic-ui-react"

interface Prop {
    errors: string[]
}

export default function ValidationErrors({ errors }: Prop) {
    return (
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((err: string, i: number) => (
                        <Message.Item key={i}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}