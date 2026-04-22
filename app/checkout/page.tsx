import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckoutClient from "./CheckoutClient";

export const metadata = {
  title: "إتمام الطلب | متجرنا",
  description: "راجع سلتك وأكمل بيانات الطلب",
};

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full">
        <CheckoutClient />
      </main>
      <Footer />
    </div>
  );
}
