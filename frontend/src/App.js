import { useState } from "react";
import "@/App.css";
import axios from "axios";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Mail, Phone, Instagram, MessageSquare, Scale, Users, Globe, BookOpen, Award, TrendingUp, Shield, ArrowRight, CheckCircle2 } from "lucide-react";

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
        <DialogContent className="sm:max-w-[550px] border-0 shadow-2xl" data-testid="consultation-modal">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b0000] to-[#c41e3a] flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold">Book Your Free Consultation</DialogTitle>
            </div>
            <DialogDescription className="text-base">
              Connect with one of our expert consultants specializing in cross-border litigation
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleConsultationSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold">Full Name *</Label>
              <Input
                id="name"
                data-testid="consultation-name-input"
                required
                value={consultationForm.name}
                onChange={(e) => setConsultationForm({...consultationForm, name: e.target.value})}
                placeholder="John Doe"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">Email *</Label>
              <Input
                id="email"
                data-testid="consultation-email-input"
                type="email"
                required
                value={consultationForm.email}
                onChange={(e) => setConsultationForm({...consultationForm, email: e.target.value})}
                placeholder="john@example.com"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold">Phone Number *</Label>
              <div className="flex gap-2">
                <Select
                  value={consultationForm.country_code}
                  onValueChange={(value) => setConsultationForm({...consultationForm, country_code: value})}
                >
                  <SelectTrigger className="w-[130px] h-11" data-testid="country-code-select">
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
                  className="flex-1 h-11"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="looking_for" className="text-sm font-semibold">What are you looking for? *</Label>
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
                className="flex-1 h-11"
                data-testid="consultation-cancel-btn"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-11 bg-gradient-to-r from-[#8b0000] to-[#c41e3a] hover:from-[#6d0000] hover:to-[#a01828]"
                data-testid="consultation-submit-btn"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Message Modal */}
      <Dialog open={showMessageModal} onOpenChange={setShowMessageModal}>
        <DialogContent className="sm:max-w-[550px] border-0 shadow-2xl" data-testid="message-modal">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b0000] to-[#c41e3a] flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold">Send us a Message</DialogTitle>
            </div>
            <DialogDescription className="text-base">
              We'll get back to you as soon as possible
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleMessageSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="msg-name" className="text-sm font-semibold">Name (Optional)</Label>
              <Input
                id="msg-name"
                data-testid="message-name-input"
                value={messageForm.name}
                onChange={(e) => setMessageForm({...messageForm, name: e.target.value})}
                placeholder="John Doe"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="msg-email" className="text-sm font-semibold">Email (Optional)</Label>
              <Input
                id="msg-email"
                data-testid="message-email-input"
                type="email"
                value={messageForm.email}
                onChange={(e) => setMessageForm({...messageForm, email: e.target.value})}
                placeholder="john@example.com"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-semibold">Message *</Label>
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
                className="flex-1 h-11"
                data-testid="message-cancel-btn"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-11 bg-gradient-to-r from-[#8b0000] to-[#c41e3a] hover:from-[#6d0000] hover:to-[#a01828]"
                data-testid="message-submit-btn"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Sticky Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-900 via-[#1a1a1a] to-gray-900 border-t border-gray-800 py-4 px-4 z-50 backdrop-blur-sm" data-testid="contact-bar">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-8">
          <a
            href="mailto:contact@advocatefirm.com"
            className="flex items-center gap-2 text-gray-300 hover:text-[#c41e3a] transition-all duration-300 hover:scale-110"
            data-testid="contact-email-link"
          >
            <Mail className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">Email</span>
          </a>
          <a
            href="tel:+1234567890"
            className="flex items-center gap-2 text-gray-300 hover:text-[#c41e3a] transition-all duration-300 hover:scale-110"
            data-testid="contact-phone-link"
          >
            <Phone className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">Call</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-[#c41e3a] transition-all duration-300 hover:scale-110"
            data-testid="contact-instagram-link"
          >
            <Instagram className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">Instagram</span>
          </a>
          <button
            onClick={() => setShowMessageModal(true)}
            className="flex items-center gap-2 text-gray-300 hover:text-[#c41e3a] transition-all duration-300 hover:scale-110"
            data-testid="contact-message-btn"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">Message</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="pb-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZ3xlbnwwfHx8fDE3NjQyNjM4OTZ8MA&ixlib=rb-4.1.0&q=85)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-[#1a1a1a]/95"></div>
          </div>
          
          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
            <div className="animate-fade-in-up">
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#c41e3a] blur-2xl opacity-50"></div>
                  <Scale className="relative w-20 h-20 text-[#c41e3a]" />
                </div>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                International Legal Excellence<br />
                <span className="bg-gradient-to-r from-[#c41e3a] to-[#ff4757] bg-clip-text text-transparent">Across Borders</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Navigating complex cross-border litigation with precision, expertise, and unwavering commitment to your success across multiple jurisdictions
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => setShowConsultationModal(true)}
                  className="text-lg px-10 py-7 bg-gradient-to-r from-[#8b0000] to-[#c41e3a] hover:from-[#6d0000] hover:to-[#a01828] text-white shadow-2xl hover:shadow-[#c41e3a]/50 transition-all duration-300 hover:scale-105"
                  data-testid="hero-consultation-btn"
                >
                  Schedule Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#c41e3a] mb-2">500+</div>
                  <div className="text-sm text-gray-400">Cases Won</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#c41e3a] mb-2">50+</div>
                  <div className="text-sm text-gray-400">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#c41e3a] mb-2">20+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#c41e3a] mb-2">98%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Countries Section */}
        <section className="py-24 px-6 bg-white relative" data-testid="countries-section">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMG1hcHxlbnwwfHx8fDE3NjQyNjM5MDN8MA&ixlib=rb-4.1.0&q=85)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b0000] to-[#c41e3a] mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">Global Reach</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Delivering exceptional legal services across continents with deep local expertise</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  region: "America",
                  title: "U.S. Commercial Disputes",
                  description: "Handling complex commercial litigation across federal and state jurisdictions with deep understanding of American business law and regulatory frameworks.",
                  icon: "🇺🇸"
                },
                {
                  region: "Europe",
                  title: "EU Regulatory Compliance",
                  description: "Expert navigation of European Union regulations, cross-border enforcement, and multi-jurisdictional disputes across member states.",
                  icon: "🇪🇺"
                },
                {
                  region: "Asia",
                  title: "Asia-Pacific Trade Law",
                  description: "Specialized expertise in international trade disputes, arbitration, and corporate litigation across Asian markets and emerging economies.",
                  icon: "🌏"
                },
                {
                  region: "Middle East",
                  title: "MENA Investment Arbitration",
                  description: "Comprehensive support for investment treaty arbitration, commercial disputes, and regulatory matters in Middle East and North Africa.",
                  icon: "🌍"
                }
              ].map((country, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#c41e3a]/20"
                  data-testid={`country-card-${index}`}
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#8b0000] to-[#c41e3a]"></div>
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-5xl mb-3">{country.icon}</div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">{country.region}</h3>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#c41e3a]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <TrendingUp className="w-6 h-6 text-[#c41e3a]" />
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold text-[#c41e3a] mb-3">{country.title}</h4>
                    <p className="text-gray-600 leading-relaxed mb-6">{country.description}</p>
                    <Button
                      variant="ghost"
                      className="text-[#c41e3a] hover:text-[#8b0000] hover:bg-[#c41e3a]/10 p-0 h-auto font-semibold"
                      data-testid={`country-learn-more-${index}`}
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-[#c41e3a]/5 to-transparent rounded-tl-full"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-white relative" data-testid="about-section">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b0000] to-[#c41e3a] mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">About Us</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Two decades of excellence in international law</p>
            </div>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div 
                  className="relative min-h-[400px] bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1573164574572-cb89e39749b4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHw0fHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MHx8fHwxNzY0MjYzOTA5fDA&ixlib=rb-4.1.0&q=85)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8b0000]/80 to-[#c41e3a]/60"></div>
                </div>
                <div className="p-10">
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    With over two decades of experience in international law, our firm has established itself as a leader in cross-border litigation and dispute resolution. We represent multinational corporations, government entities, and high-net-worth individuals in complex legal matters spanning multiple jurisdictions.
                  </p>
                  <p className="text-base text-gray-700 leading-relaxed mb-8">
                    Our team combines deep legal expertise with cultural awareness and strategic thinking to deliver exceptional results in the most challenging international disputes.
                  </p>
                  <div className="space-y-4">
                    {[
                      "ISO 9001:2015 Certified",
                      "Top-Tier Rankings in Legal 500",
                      "Chambers & Partners Recognized"
                    ].map((achievement, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#c41e3a]" />
                        <span className="text-gray-700 font-medium">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consultants Section */}
        <section className="py-24 px-6 bg-white" data-testid="consultants-section">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b0000] to-[#c41e3a] mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">Our Consultants</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Meet our team of internationally recognized legal experts
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Mitchell",
                  position: "Senior Partner - International Arbitration",
                  expertise: "20+ years in cross-border commercial disputes",
                  education: "Harvard Law School, JD",
                  flag: "🇺🇸"
                },
                {
                  name: "Dr. James Chen",
                  position: "Partner - Asia-Pacific Practice",
                  expertise: "Specialist in Chinese and Southeast Asian law",
                  education: "Oxford University, BCL; Peking University, LLM",
                  flag: "🇨🇳"
                },
                {
                  name: "Elena Rodriguez",
                  position: "Partner - European Law",
                  expertise: "EU regulatory compliance and competition law",
                  education: "Sorbonne University, LLM",
                  flag: "🇪🇸"
                },
                {
                  name: "Michael Thompson",
                  position: "Senior Counsel - US Litigation",
                  expertise: "Federal court litigation and class actions",
                  education: "Yale Law School, JD",
                  flag: "🇺🇸"
                },
                {
                  name: "Fatima Al-Hassan",
                  position: "Partner - MENA Region",
                  expertise: "Investment treaty arbitration and energy disputes",
                  education: "Cambridge University, LLM",
                  flag: "🇦🇪"
                },
                {
                  name: "David Kumar",
                  position: "Counsel - Technology Law",
                  expertise: "IP litigation and cyber law across jurisdictions",
                  education: "Stanford Law School, JD",
                  flag: "🇮🇳"
                }
              ].map((consultant, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#c41e3a]/20 overflow-hidden"
                  data-testid={`consultant-card-${index}`}
                >
                  <div className="h-2 bg-gradient-to-r from-[#8b0000] to-[#c41e3a]"></div>
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#8b0000] to-[#c41e3a] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {consultant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="text-3xl">{consultant.flag}</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{consultant.name}</h3>
                    <p className="text-sm text-[#c41e3a] font-semibold mb-3">{consultant.position}</p>
                    <p className="text-sm text-gray-700 mb-2 leading-relaxed">{consultant.expertise}</p>
                    <p className="text-xs text-gray-500 italic">{consultant.education}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Practice Areas Section */}
        <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 text-white relative overflow-hidden" data-testid="practice-areas-section">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1589994965851-a8f479c573a9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxqdXN0aWNlJTIwbGF3fGVufDB8fHx8MTc2NDI2MzkxNHww&ixlib=rb-4.1.0&q=85)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b0000] to-[#c41e3a] mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">Practice Areas</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Comprehensive legal services across multiple domains
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "International Commercial Arbitration",
                  description: "Expert representation in ICC, LCIA, and UNCITRAL proceedings",
                  icon: Scale
                },
                {
                  title: "Cross-Border M&A",
                  description: "Due diligence and regulatory compliance for international transactions",
                  icon: TrendingUp
                },
                {
                  title: "Trade Compliance",
                  description: "WTO disputes and international trade regulations",
                  icon: Globe
                },
                {
                  title: "Investment Treaty Claims",
                  description: "ICSID and bilateral investment treaty arbitrations",
                  icon: Shield
                },
                {
                  title: "Intellectual Property",
                  description: "Multi-jurisdictional IP enforcement and licensing",
                  icon: Award
                },
                {
                  title: "Regulatory Investigations",
                  description: "Global compliance and anti-corruption matters",
                  icon: CheckCircle2
                },
                {
                  title: "Competition Law",
                  description: "Antitrust litigation across EU, US, and Asian markets",
                  icon: Users
                },
                {
                  title: "Maritime & Aviation Law",
                  description: "International shipping and aviation disputes",
                  icon: Globe
                },
                {
                  title: "Financial Services",
                  description: "Banking, securities, and fintech regulatory matters",
                  icon: TrendingUp
                }
              ].map((area, index) => {
                const IconComponent = area.icon;
                return (
                  <div
                    key={index}
                    className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:border-[#c41e3a]/50 transition-all duration-300 hover:scale-105"
                    data-testid={`practice-area-${index}`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#8b0000] to-[#c41e3a] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#c41e3a] transition-colors">{area.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{area.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] text-white py-16 px-6 border-t border-gray-800" data-testid="footer">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#c41e3a] blur-xl opacity-50"></div>
                  <Scale className="relative w-12 h-12 text-[#c41e3a]" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">International Litigation Partners LLP</h3>
              <p className="text-gray-400 mb-6">Excellence in Cross-Border Legal Services</p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                <span>New York</span>
                <span>•</span>
                <span>London</span>
                <span>•</span>
                <span>Singapore</span>
                <span>•</span>
                <span>Dubai</span>
                <span>•</span>
                <span>Hong Kong</span>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center">
              <p className="text-gray-500 text-sm">© 2025 International Litigation Partners LLP. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;