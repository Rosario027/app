import { useState, useEffect } from "react";
import "@/App.css";
import axios from "axios";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Mail, Phone, Instagram, MessageSquare, X, Scale, Users, Globe, BookOpen } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [showConsultationModal, setShowConsultationModal] = useState(true);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [consultationForm, setConsultationForm] = useState({
    name: "",
    email: "",
    phone: "",
    country_code: "+1",
    looking_for: ""
  });
  const [messageForm, setMessageForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConsultationSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/consultations`, consultationForm);
      toast.success("Consultation request submitted successfully!");
      setShowConsultationModal(false);
      setConsultationForm({
        name: "",
        email: "",
        phone: "",
        country_code: "+1",
        looking_for: ""
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/messages`, messageForm);
      toast.success("Message sent successfully!");
      setShowMessageModal(false);
      setMessageForm({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      {/* Consultation Modal */}
      <Dialog open={showConsultationModal} onOpenChange={setShowConsultationModal}>
        <DialogContent className="sm:max-w-[500px]" data-testid="consultation-modal">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Book Your Free Consultation</DialogTitle>
            <DialogDescription>
              Connect with one of our expert consultants specializing in cross-border litigation
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleConsultationSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                data-testid="consultation-name-input"
                required
                value={consultationForm.name}
                onChange={(e) => setConsultationForm({...consultationForm, name: e.target.value})}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                data-testid="consultation-email-input"
                type="email"
                required
                value={consultationForm.email}
                onChange={(e) => setConsultationForm({...consultationForm, email: e.target.value})}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="flex gap-2">
                <Select
                  value={consultationForm.country_code}
                  onValueChange={(value) => setConsultationForm({...consultationForm, country_code: value})}
                >
                  <SelectTrigger className="w-[120px]" data-testid="country-code-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+1">🇺🇸 +1</SelectItem>
                    <SelectItem value="+44">🇬🇧 +44</SelectItem>
                    <SelectItem value="+91">🇮🇳 +91</SelectItem>
                    <SelectItem value="+86">🇨🇳 +86</SelectItem>
                    <SelectItem value="+81">🇯🇵 +81</SelectItem>
                    <SelectItem value="+49">🇩🇪 +49</SelectItem>
                    <SelectItem value="+33">🇫🇷 +33</SelectItem>
                    <SelectItem value="+971">🇦🇪 +971</SelectItem>
                    <SelectItem value="+61">🇦🇺 +61</SelectItem>
                    <SelectItem value="+65">🇸🇬 +65</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  data-testid="consultation-phone-input"
                  required
                  value={consultationForm.phone}
                  onChange={(e) => setConsultationForm({...consultationForm, phone: e.target.value})}
                  placeholder="1234567890"
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="looking_for">What are you looking for? *</Label>
              <Textarea
                id="looking_for"
                data-testid="consultation-looking-for-input"
                required
                value={consultationForm.looking_for}
                onChange={(e) => setConsultationForm({...consultationForm, looking_for: e.target.value})}
                placeholder="Describe your legal needs..."
                rows={4}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowConsultationModal(false)}
                className="flex-1"
                data-testid="consultation-cancel-btn"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
                data-testid="consultation-submit-btn"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Message Modal */}
      <Dialog open={showMessageModal} onOpenChange={setShowMessageModal}>
        <DialogContent className="sm:max-w-[500px]" data-testid="message-modal">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Send us a Message</DialogTitle>
            <DialogDescription>
              We'll get back to you as soon as possible
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleMessageSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="msg-name">Name (Optional)</Label>
              <Input
                id="msg-name"
                data-testid="message-name-input"
                value={messageForm.name}
                onChange={(e) => setMessageForm({...messageForm, name: e.target.value})}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="msg-email">Email (Optional)</Label>
              <Input
                id="msg-email"
                data-testid="message-email-input"
                type="email"
                value={messageForm.email}
                onChange={(e) => setMessageForm({...messageForm, email: e.target.value})}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                data-testid="message-text-input"
                required
                value={messageForm.message}
                onChange={(e) => setMessageForm({...messageForm, message: e.target.value})}
                placeholder="Your message..."
                rows={5}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowMessageModal(false)}
                className="flex-1"
                data-testid="message-cancel-btn"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
                data-testid="message-submit-btn"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Sticky Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-700 py-3 px-4 z-50" data-testid="contact-bar">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-6">
          <a
            href="mailto:contact@advocatefirm.com"
            className="flex items-center gap-2 text-white hover:text-[#c41e3a] transition-colors"
            data-testid="contact-email-link"
          >
            <Mail className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">Email</span>
          </a>
          <a
            href="tel:+1234567890"
            className="flex items-center gap-2 text-white hover:text-[#c41e3a] transition-colors"
            data-testid="contact-phone-link"
          >
            <Phone className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">Call</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-[#c41e3a] transition-colors"
            data-testid="contact-instagram-link"
          >
            <Instagram className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">Instagram</span>
          </a>
          <button
            onClick={() => setShowMessageModal(true)}
            className="flex items-center gap-2 text-white hover:text-[#c41e3a] transition-colors"
            data-testid="contact-message-btn"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">Message</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="pb-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden" data-testid="hero-section">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-40"></div>
          <div className="relative max-w-6xl mx-auto px-6 text-center z-10">
            <div className="flex items-center justify-center mb-6">
              <Scale className="w-16 h-16 text-[#c41e3a]" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Cross-Border Litigation<br />
              <span className="text-[#c41e3a]">Excellence</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
              Navigating international legal complexities with precision, expertise, and unwavering commitment to your success
            </p>
            <Button
              size="lg"
              onClick={() => setShowConsultationModal(true)}
              className="text-lg px-8 py-6 bg-[#c41e3a] hover:bg-[#a01828] text-white"
              data-testid="hero-consultation-btn"
            >
              Schedule Free Consultation
            </Button>
          </div>
        </section>

        {/* Countries Section */}
        <section className="py-20 px-6 bg-white" data-testid="countries-section">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-gray-900">Global Reach</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  region: "America",
                  title: "U.S. Commercial Disputes",
                  description: "Handling complex commercial litigation across federal and state jurisdictions with deep understanding of American business law and regulatory frameworks."
                },
                {
                  region: "Europe",
                  title: "EU Regulatory Compliance",
                  description: "Expert navigation of European Union regulations, cross-border enforcement, and multi-jurisdictional disputes across member states."
                },
                {
                  region: "Asia",
                  title: "Asia-Pacific Trade Law",
                  description: "Specialized expertise in international trade disputes, arbitration, and corporate litigation across Asian markets and emerging economies."
                },
                {
                  region: "Middle East",
                  title: "MENA Investment Arbitration",
                  description: "Comprehensive support for investment treaty arbitration, commercial disputes, and regulatory matters in Middle East and North Africa."
                }
              ].map((country, index) => (
                <div
                  key={index}
                  className="relative bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300"
                  data-testid={`country-card-${index}`}
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#c41e3a]"></div>
                  <div className="p-8">
                    <h3 className="text-3xl font-bold text-[#c41e3a] mb-4">{country.region}</h3>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">{country.title}</h4>
                    <p className="text-gray-700 leading-relaxed mb-6">{country.description}</p>
                    <Button
                      variant="outline"
                      className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                      data-testid={`country-learn-more-${index}`}
                    >
                      Learn More
                    </Button>
                  </div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#c41e3a] opacity-5 rounded-tl-full"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100" data-testid="about-section">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Globe className="w-12 h-12 text-[#c41e3a]" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-8 text-gray-900">About Us</h2>
            <div className="bg-white rounded-2xl shadow-xl p-10">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                With over two decades of experience in international law, our firm has established itself as a leader in cross-border litigation and dispute resolution. We represent multinational corporations, government entities, and high-net-worth individuals in complex legal matters spanning multiple jurisdictions.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our team combines deep legal expertise with cultural awareness and strategic thinking to deliver exceptional results in the most challenging international disputes. We maintain offices in major financial centers and maintain close relationships with leading law firms worldwide.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 mt-10">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-4xl font-bold text-[#c41e3a] mb-2">500+</div>
                  <div className="text-gray-700">Cases Won</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-4xl font-bold text-[#c41e3a] mb-2">50+</div>
                  <div className="text-gray-700">Countries Served</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-4xl font-bold text-[#c41e3a] mb-2">20+</div>
                  <div className="text-gray-700">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consultants Section */}
        <section className="py-20 px-6 bg-white" data-testid="consultants-section">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Users className="w-12 h-12 text-[#c41e3a]" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-gray-900">Our Consultants</h2>
            <p className="text-center text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
              Meet our team of internationally recognized legal experts
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Mitchell",
                  position: "Senior Partner - International Arbitration",
                  expertise: "20+ years in cross-border commercial disputes",
                  education: "Harvard Law School, JD"
                },
                {
                  name: "Dr. James Chen",
                  position: "Partner - Asia-Pacific Practice",
                  expertise: "Specialist in Chinese and Southeast Asian law",
                  education: "Oxford University, BCL; Peking University, LLM"
                },
                {
                  name: "Elena Rodriguez",
                  position: "Partner - European Law",
                  expertise: "EU regulatory compliance and competition law",
                  education: "Sorbonne University, LLM"
                },
                {
                  name: "Michael Thompson",
                  position: "Senior Counsel - US Litigation",
                  expertise: "Federal court litigation and class actions",
                  education: "Yale Law School, JD"
                },
                {
                  name: "Fatima Al-Hassan",
                  position: "Partner - MENA Region",
                  expertise: "Investment treaty arbitration and energy disputes",
                  education: "Cambridge University, LLM"
                },
                {
                  name: "David Kumar",
                  position: "Counsel - Technology Law",
                  expertise: "IP litigation and cyber law across jurisdictions",
                  education: "Stanford Law School, JD"
                }
              ].map((consultant, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  data-testid={`consultant-card-${index}`}
                >
                  <div className="w-20 h-20 bg-[#c41e3a] rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                    {consultant.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{consultant.name}</h3>
                  <p className="text-sm text-[#c41e3a] font-semibold mb-3">{consultant.position}</p>
                  <p className="text-sm text-gray-700 mb-2">{consultant.expertise}</p>
                  <p className="text-xs text-gray-500 italic">{consultant.education}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Practice Areas Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white" data-testid="practice-areas-section">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="w-12 h-12 text-[#c41e3a]" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">Practice Areas</h2>
            <p className="text-center text-lg text-gray-300 mb-16 max-w-2xl mx-auto">
              Comprehensive legal services across multiple domains
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "International Commercial Arbitration",
                  description: "Expert representation in ICC, LCIA, and UNCITRAL proceedings"
                },
                {
                  title: "Cross-Border M&A",
                  description: "Due diligence and regulatory compliance for international transactions"
                },
                {
                  title: "Trade Compliance",
                  description: "WTO disputes and international trade regulations"
                },
                {
                  title: "Investment Treaty Claims",
                  description: "ICSID and bilateral investment treaty arbitrations"
                },
                {
                  title: "Intellectual Property",
                  description: "Multi-jurisdictional IP enforcement and licensing"
                },
                {
                  title: "Regulatory Investigations",
                  description: "Global compliance and anti-corruption matters"
                },
                {
                  title: "Competition Law",
                  description: "Antitrust litigation across EU, US, and Asian markets"
                },
                {
                  title: "Maritime & Aviation Law",
                  description: "International shipping and aviation disputes"
                },
                {
                  title: "Financial Services",
                  description: "Banking, securities, and fintech regulatory matters"
                }
              ].map((area, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  data-testid={`practice-area-${index}`}
                >
                  <h3 className="text-xl font-bold mb-3 text-[#c41e3a]">{area.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#1a1a1a] text-white py-12 px-6" data-testid="footer">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Scale className="w-10 h-10 text-[#c41e3a]" />
            </div>
            <p className="text-gray-400 mb-4">© 2025 International Litigation Partners LLP. All rights reserved.</p>
            <p className="text-sm text-gray-500">Offices in New York • London • Singapore • Dubai • Hong Kong</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;