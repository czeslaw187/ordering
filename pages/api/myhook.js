import { buffer } from "micro";
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27'
});
const webhookSecret = process.env.NEXT_PUBLIC_WEBHOOK_KEY;

export const config = {
    api: {
        bodyParser: false,
    },
};


const handler = async (req, res) => {
    if (req.method === "POST") {
        const buf = await buffer(req);
        const sig = req.headers["stripe-signature"];

        let stripeEvent;

        try {
            stripeEvent = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
        } catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        if ( 'checkout.session.completed' === stripeEvent.type ) {
            const session = stripeEvent.data.object;
            console.log(session)
        }

        res.json({ received: true });
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
};

export default handler;