"use client";

import React, { useState, useEffect } from "react";

export default function PaymentPage() {
  const [tier, setTier] = useState("pro");
  const [tierName, setTierName] = useState("The Viral Growth");
  const [tierPrice, setTierPrice] = useState(850);
  const [videoCount, setVideoCount] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [receiptUrl, setReceiptUrl] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    driveLink: "",
    refLink: "",
  });

  const COUPONS = { 'VIP100': 100, 'FRIENDS50': 50, 'SPECIAL200': 200 };

  useEffect(() => {
    // قراءة الباقة من الـ URL إن وجدت
    const params = new URLSearchParams(window.location.search);
    const pkg = params.get("package");
    if (pkg) {
      if (pkg.includes("Spark")) { setTier("basic"); setTierName("The Spark Pack"); setTierPrice(500); }
      else if (pkg.includes("Cinematic")) { setTier("elite"); setTierName("Cinematic Prime"); setTierPrice(1200); }
      else { setTier("pro"); setTierName("The Viral Growth"); setTierPrice(850); }
    }
  }, []);

  const handleTierChange = (val, name, price) => {
    setTier(val);
    setTierName(name);
    setTierPrice(price);
  };

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) { setDiscount(0); setCouponMsg(""); return; }
    if (COUPONS[code]) {
      setDiscount(COUPONS[code]);
      setCouponMsg("تم تطبيق الكود بنجاح!");
    } else {
      setDiscount(0);
      setCouponMsg("كود غير صالح.");
    }
  };

  const subtotal = tierPrice * videoCount;
  const finalTotal = Math.max(0, subtotal - discount);
  const deposit = Math.ceil(finalTotal * 0.25);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => setReceiptUrl(evt.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.driveLink) {
      alert("يرجى ملء الاسم، رقم الهاتف، ورابط المواد الخام.");
      return;
    }
    const msg = encodeURIComponent(
      `*طلب مونتاج جديد — إبراهيم فاضل*\n` +
      `━━━━━━━━━━━━━━\n` +
      `👤 العميل: ${formData.name}\n` +
      `📞 الهاتف: ${formData.phone}\n` +
      `💬 واتساب: ${formData.whatsapp || formData.phone}\n` +
      `🎬 الباقة: ${tierName} (${tierPrice} ج/فيديو)\n` +
      `🔢 عدد الفيديوهات: ${videoCount}\n` +
      `💰 الإجمالي: ${finalTotal} ج.م\n` +
      `✅ العربون (25%): ${deposit} ج.م\n` +
      `📁 المواد الخام: ${formData.driveLink}\n` +
      `━━━━━━━━━━━━━━\n` +
      `مرفق إيصال التحويل لتأكيد الحجز.`
    );
    window.open(`https://wa.me/201211871199?text=${msg}`, "_blank");
  };

  return (
    <div dir="rtl" style={{ minHeight: "100vh", backgroundColor: "#0A0A0A", color: "#D7E2EA", padding: "40px 16px", fontFamily: "Cairo, sans-serif" }}>
      <div style={{ maxWidth: "780px", margin: "0 auto", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "28px", padding: "32px", backdropFilter: "blur(20px)" }}>
        
        <h2 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#fff", marginBottom: "8px", textAlign: "center" }}>
          تأكيد الحجز والدفع
        </h2>
        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "0.95rem", marginBottom: "30px" }}>
          خدمات المونتاج وصناعة المحتوى | إبراهيم فاضل
        </p>

        {/* بيانات الدفع */}
        <div style={{ backgroundColor: "rgba(182, 0, 168, 0.12)", border: "1px solid rgba(182, 0, 168, 0.4)", borderRadius: "18px", padding: "20px", marginBottom: "25px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <span style={{ fontSize: "0.85rem", color: "#dbeafe", display: "block" }}>إنستاباي / فودافون كاش:</span>
              <strong style={{ fontSize: "1.25rem", color: "#fff", letterSpacing: "1px" }}>01211871199 instapay</strong>
            </div>
            <button
              type="button"
              onClick={() => { navigator.clipboard.writeText("01211871199"); alert("تم نسخ الرقم بنجاح!"); }}
              style={{ backgroundColor: "#B600A8", color: "#fff", border: "none", borderRadius: "10px", padding: "8px 18px", fontWeight: "700", cursor: "pointer", fontSize: "0.88rem" }}
            >
              نسخ الرقم
            </button>
          </div>
          <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px dashed rgba(255,255,255,0.15)", fontSize: "0.85rem" }}>
            البريد الإلكتروني: <strong>ebrahimfadel8903@gmail.com</strong>
          </div>
        </div>

        {/* النموذج */}
        <form onSubmit={handleWhatsApp} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: "600" }}>الاسم بالكامل *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e)=>setFormData({...formData, name: e.target.value})}
                placeholder="محمد أحمد"
                style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.06)", color: "#fff", outline: "none" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: "600" }}>رقم الهاتف *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e)=>setFormData({...formData, phone: e.target.value})}
                placeholder="01xxxxxxxxx"
                style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.06)", color: "#fff", outline: "none" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: "600" }}>رقم الواتساب *</label>
              <input
                type="tel"
                required
                value={formData.whatsapp}
                onChange={(e)=>setFormData({...formData, whatsapp: e.target.value})}
                placeholder="01xxxxxxxxx"
                style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.06)", color: "#fff", outline: "none" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: "600" }}>الإيميل (اختياري)</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e)=>setFormData({...formData, email: e.target.value})}
                placeholder="name@example.com"
                dir="ltr"
                style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.06)", color: "#fff", outline: "none" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: "600" }}>رابط المواد الخام (Drive / WeTransfer) *</label>
            <textarea
              required
              rows="2"
              value={formData.driveLink}
              onChange={(e)=>setFormData({...formData, driveLink: e.target.value})}
              placeholder="ضع رابط المجلد وتأكد أن الصلاحية متاحة"
              style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.06)", color: "#fff", outline: "none" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", fontWeight: "600" }}>اختر الباقة</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
              <button
                type="button"
                onClick={() => handleTierChange("basic", "The Spark Pack", 500)}
                style={{ padding: "14px", borderRadius: "14px", border: tier === "basic" ? "2px solid #B600A8" : "1px solid rgba(255,255,255,0.15)", backgroundColor: tier === "basic" ? "rgba(182,0,168,0.2)" : "rgba(255,255,255,0.04)", color: "#fff", cursor: "pointer", fontWeight: "bold" }}
              >
                The Spark Pack <br/><span style={{fontSize:"0.8rem", color:"#94a3b8"}}>500 ج</span>
              </button>
              <button
                type="button"
                onClick={() => handleTierChange("pro", "The Viral Growth", 850)}
                style={{ padding: "14px", borderRadius: "14px", border: tier === "pro" ? "2px solid #B600A8" : "1px solid rgba(255,255,255,0.15)", backgroundColor: tier === "pro" ? "rgba(182,0,168,0.2)" : "rgba(255,255,255,0.04)", color: "#fff", cursor: "pointer", fontWeight: "bold" }}
              >
                The Viral Growth <br/><span style={{fontSize:"0.8rem", color:"#94a3b8"}}>850 ج</span>
              </button>
              <button
                type="button"
                onClick={() => handleTierChange("elite", "Cinematic Prime", 1200)}
                style={{ padding: "14px", borderRadius: "14px", border: tier === "elite" ? "2px solid #B600A8" : "1px solid rgba(255,255,255,0.15)", backgroundColor: tier === "elite" ? "rgba(182,0,168,0.2)" : "rgba(255,255,255,0.04)", color: "#fff", cursor: "pointer", fontWeight: "bold" }}
              >
                Cinematic Prime <br/><span style={{fontSize:"0.8rem", color:"#94a3b8"}}>1200 ج</span>
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: "600" }}>عدد الفيديوهات</label>
              <select
                value={videoCount}
                onChange={(e) => setVideoCount(Number(e.target.value))}
                style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "#141418", color: "#fff", outline: "none" }}
              >
                <option value="1">1 فيديو</option>
                <option value="5">5 فيديوهات</option>
                <option value="10">10 فيديوهات</option>
                <option value="20">20 فيديو</option>
                <option value="30">30 فيديو</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", fontWeight: "600" }}>رفع صورة الإيصال (اختياري)</label>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ padding: "8px", fontSize: "0.85rem" }} />
            </div>
          </div>

          {/* ملخص الحساب */}
          <div style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "16px", padding: "16px", marginTop: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}><span>سعر الباقة:</span> <span>{subtotal.toLocaleString()} ج.م</span></div>
            {discount > 0 && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "#8bf0b0" }}><span>الخصم:</span> <span>- {discount} ج.م</span></div>}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.15rem", fontWeight: "800", color: "#79dce8", borderTop: "1px dashed rgba(255,255,255,0.2)", paddingTop: "10px", marginTop: "8px" }}>
              <span>الإجمالي الكلي:</span> <span>{finalTotal.toLocaleString()} ج.م</span>
            </div>
          </div>

          <div style={{ backgroundColor: "rgba(34, 197, 94, 0.12)", border: "1px solid rgba(34, 197, 94, 0.5)", borderRadius: "14px", padding: "14px", textAlign: "center", color: "#8bf0b0", fontWeight: "800", fontSize: "1.1rem" }}>
            العربون المطلوب للتأكيد (25%): {deposit.toLocaleString()} ج.م
          </div>

          <button
            type="submit"
            style={{ width: "100%", padding: "16px", borderRadius: "14px", backgroundColor: "#25D366", color: "#fff", border: "none", fontSize: "1.05rem", fontWeight: "800", cursor: "pointer", marginTop: "10px", boxShadow: "0 8px 24px rgba(37, 211, 102, 0.35)" }}
          >
            تأكيد الحجز وإرسال الفاتورة عبر واتساب ←
          </button>
        </form>

      </div>
    </div>
  );
}