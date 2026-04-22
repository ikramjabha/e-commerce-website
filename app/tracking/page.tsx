import Header from "../components/Header";
import Footer from "../components/Footer";
import TrackingForm from "./TrackingForm";

export const metadata = {
  title: "تتبع الطلب | متجرنا",
  description: "تتبع حالة طلبك",
};

export default function TrackingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full bg-zinc-50">
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-8 max-w-2xl">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-zinc-100 text-center">
              <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-6">تتبع الطلب</h1>
              <p className="text-zinc-600 text-lg mb-8 leading-relaxed">
                أدخل رقم الطلب الخاص بك أدناه لمعرفة حالة الشحنة الخاصة بك.
              </p>
              <TrackingForm />
              <p className="mt-6 text-sm text-zinc-500">
                إذا كنت تواجه مشكلة في تتبع طلبك، يرجى التواصل مع خدمة العملاء.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
