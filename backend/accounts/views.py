from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
import hashlib
import hmac

# -----------------------------------------
# SAFE RAZORPAY IMPORT (DOES NOT BREAK DEPLOY)
# -----------------------------------------
try:
    import razorpay
    client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
except ImportError:
    razorpay = None
    client = None


# -----------------------------------------
# CREATE ORDER (will not crash backend)
# -----------------------------------------
@api_view(['POST'])
def create_order(request):
    if client is None:
        return Response(
            {"error": "Razorpay is not enabled yet. Install razorpay package to use this endpoint."},
            status=501
        )

    amount = request.data.get('amount')

    order_data = {
        'amount': amount,
        'currency': 'INR',
        'payment_capture': 1
    }

    order = client.order.create(data=order_data)
    return Response(order)


# -----------------------------------------
# VERIFY PAYMENT (will not crash backend)
# -----------------------------------------
@api_view(['POST'])
def verify_payment(request):
    if razorpay is None:
        return Response(
            {"error": "Razorpay is not enabled yet. Install razorpay package to use this endpoint."},
            status=501
        )

    razorpay_order_id = request.data.get('razorpay_order_id')
    razorpay_payment_id = request.data.get('razorpay_payment_id')
    razorpay_signature = request.data.get('razorpay_signature')

    generated_signature = hmac.new(
        settings.RAZORPAY_KEY_SECRET.encode('utf-8'),
        f"{razorpay_order_id}|{razorpay_payment_id}".encode('utf-8'),
        hashlib.sha256
    ).hexdigest()

    if generated_signature == razorpay_signature:
        return Response({'success': True})
    else:
        return Response({'success': False, 'error': 'Invalid signature'})
