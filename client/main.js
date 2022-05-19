// The max and min number of photos a customer can purchase
var MIN_PHOTOS = 1;
var MAX_PHOTOS = 10;


const getData = async() => {
    console.log($('#quantity-input').val());
    var data = $('#quantity-input').val();
    const res = await fetch('/server/test_stripe_recursive_payment_function/create-checkout-session', {
        method: 'POST',
        body: JSON.stringify({ data: data }),
        headers: {
            "Content-Type": 'application/json'
        }
    })
    const body = await res.json();
    window.location.href = body.url
}