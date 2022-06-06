const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res)  {
  const { item, totalPrice } = req.body;
  const redirectURL = process.env.NEXT_PUBLIC_URL
  
  const transformedItem = {
    price_data: {
      currency: 'gbp',
      product_data: {
        name: item.name,
      },
      unit_amount: totalPrice * 100,
    },
    description: item.description,
    quantity: 1,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [transformedItem],
    mode: 'payment',
    success_url: redirectURL + '/success',
    cancel_url: redirectURL + '/cancel',
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;
;