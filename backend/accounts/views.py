import razorpay
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
import hashlib
import hmac

# Initialize Razorpay client
client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

@api_view(['POST'])
def create_order(request):
    amount = request.data.get('amount')
    
    # Create Razorpay order
    order_data = {
        'amount': amount,
        'currency': 'INR',
        'payment_capture': 1
    }
    
    order = client.order.create(data=order_data)
    return Response(order)

@api_view(['POST'])
def verify_payment(request):
    razorpay_order_id = request.data.get('razorpay_order_id')
    razorpay_payment_id = request.data.get('razorpay_payment_id')
    razorpay_signature = request.data.get('razorpay_signature')
    
    # Verify signature
    generated_signature = hmac.new(
        settings.RAZORPAY_KEY_SECRET.encode('utf-8'),
        f"{razorpay_order_id}|{razorpay_payment_id}".encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    if generated_signature == razorpay_signature:
        # Save donation details to database
        # Send confirmation email
        return Response({'success': True})
    else:
        return Response({'success': False, 'error': 'Invalid signature'})