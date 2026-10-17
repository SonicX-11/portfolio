import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const payload = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      whatsapp: formData.get('whatsapp'),
      email: formData.get('email'),
      package: formData.get('tierName'),
      count: formData.get('videoCount'),
      subtotal: formData.get('subtotal'),
      discount: formData.get('discount') || 0,
      total: formData.get('total'),
      deposit: formData.get('deposit'),
      deliveryDate: formData.get('deliveryDate'),
      driveLink: formData.get('driveLink'),
      receiptUrl: formData.get('receiptUrl'),
      timestamp: new Date().toISOString(),
    };

    const webhookUrl = 'azox7htjgfp69r0xx2ew06snt9fphh0@hook.us2.make.com';

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({ success: true, message: 'تم إرسال الطلب بنجاح' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}