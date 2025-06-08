import LandingLayout from "../../components/layouts/landing-layout";
import { paths } from "../../config/paths";
import { Link } from "react-router-dom";


const LandingPage = () => {
  return (
    <LandingLayout>
      <div className="bg-white text-gray-900">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 bg-gradient-to-br from-blue-200 to-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sälj vad som helst med bara en länk
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl">
            Ingen webbshop. Ingen Stripe. Bara Swish. Skapa en betalvägg, dela
            länken, få betalt — på under en minut.
          </p>
          <Link
            to={paths.auth.signup.path}
            className="px-6 py-3 bg-blue-600 text-white rounded-full text-lg hover:bg-blue-700 transition"
          >
            Skapa din länk
          </Link>
        </section>

        {/* How It Works */}
        <section className="px-6 py-16 bg-white">
          <h2 className="text-3xl font-semibold text-center mb-10">
            Så fungerar det
          </h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                1. Klistra in ditt innehåll
              </h3>
              <p>
                Länka till ditt Google Doc, Notion-sida eller videoinnehåll.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">2. Sätt ett pris</h3>
              <p>
                Välj vilket pris du vill — 29 kr, 59 kr, 149 kr — du bestämmer.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                3. Få din betalningslänk
              </h3>
              <p>Dela den på Instagram, TikTok eller via DM.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                4. Få betalt med Swish
              </h3>
              <p>Köpare betalar via Swish och låser upp innehållet direkt.</p>
            </div>
          </div>
        </section>

        {/* What You Can Sell */}
        <section className="px-6 py-16 bg-gray-50">
          <h2 className="text-3xl font-semibold text-center mb-10">
            Vad du kan sälja
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <span>📄 Notion-mallar</span>
            <span>🏋️‍♀️ Träningsplaner</span>
            <span>🧠 AI-prompts</span>
            <span>🎓 Studietips & sammanfattningar</span>
            <span>🎥 Privata videor</span>
            <span>🎨 Designpaket</span>
          </div>
        </section>

        {/* Pricing */}
        <section className="px-6 py-16 bg-white" id="pricing">
          <h2 className="text-3xl font-semibold text-center mb-10">Priser</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-center">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Gratis</h3>
              <p className="mb-4">0 kr</p>
              <ul className="text-left list-disc list-inside">
                <li>1 aktiv länk</li>
                <li>Swish-betalvägg</li>
                <li>"Skapad med PaywallLink"-branding</li>
              </ul>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Creator</h3>
              <p className="mb-4">79 kr/månad</p>
              <ul className="text-left list-disc list-inside">
                <li>Obegränsat antal länkar</li>
                <li>Statistik och insikter</li>
                <li>Ta bort branding</li>
              </ul>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="mb-4">179 kr/månad</p>
              <ul className="text-left list-disc list-inside">
                <li>Ladda upp filer</li>
                <li>Spara e-postadresser</li>
                <li>Personliga tackmeddelanden</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Footer */}
        <section className="px-6 py-16 bg-blue-600 text-white text-center">
          <h2 className="text-3xl font-semibold mb-4">Börja sälja idag</h2>
          <p className="mb-6">
            Gratis att börja. Ingen installation. Bara Swish och kör.
          </p>
          <a
            href="#create"
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition"
          >
            Skapa din länk
          </a>
        </section>
      </div>
    </LandingLayout>
  );
};

export default LandingPage;
