const en = {
  nav: { home: "Home", about: "About Us", services: "Service", coming: "What is Coming", contact: "Contact", order: "Order now", menuAria: "Toggle menu", languageAria: "Change language" },
  languageNames: { en: "English", fr: "French" },
  home: {
    eyebrow: "Babacar Thiaw · Founder",
    hero1: "We grow it,", hero2: "you taste the terroir.",
    heroLead: "My intention is simple: raise poultry and grow food the honest way, then bring it straight to the families, restaurants and resellers who care about quality.",
    order: "Place an order", invest: "Investment opportunities",
    value1: "Grown on our land", value2: "No shortcuts, ever", value3: "Bulk & wholesale",
    marketEyebrow: "What we bring to market",
    marketTitle: "Agriculture, fruits, vegetables and poultry — one trusted source.",
    chickens: "Chickens", chickensCopy: "Healthy, free-range birds raised on open ground.",
    vegetables: "Vegetables", vegetablesCopy: "Cut-to-order crates for kitchens and markets.",
    fruits: "Fruits", fruitsCopy: "Seasonal harvest picked at peak ripeness.",
    seeAll: "See all products & services",
    founderAlt: "Babacar Thiaw, founder of Darou Thiaw Agro Élevage, on the farm",
    founderTitle: "Babacar Thiaw", founderCopy: "Founder — building an agro-élevage legacy in Senegal."
  },
  about: {
    eyebrow: "About us", title1: "La qualité d'élevage,", title2: "le goût du terroir.",
    lead: "Darou Thiaw Agro Élevage is a working farm led by Babacar Thiaw — built on patient breeding, real soil, and relationships that last longer than a single delivery.",
    beginning: "The beginning", beginningTitle: "One coop, one promise", beginningCopy: "Darou Thiaw Agro Élevage started with a small flock and a refusal to compromise: healthy birds, clean feed, open ground, and full transparency with every buyer.",
    land: "Growing the land", landTitle: "From poultry to full harvest", landCopy: "Fruit trees and vegetable beds followed the coops. Today the farm runs mixed agriculture so partners can source several categories from one supplier they already trust.",
    today: "Today", todayTitle: "Serving kitchens and communities", todayCopy: "We supply households, restaurants and resellers with steady volumes and consistent quality — and we keep the availability list updated as the seasons change.",
    quote: "\"Feed people the way you would feed your own family. Everything else follows.\""
  },
  services: {
    eyebrow: "Service", title1: "Everything we raise,", title2: "ready for your order.",
    lead: "Whether you are cooking for a family, a dining room, or a market stall, we build the order around how you buy.",
    chickens: "Chickens & Poultry", chickensCopy: "Live birds and dressed poultry raised on open ground with clean feed.",
    vegetables: "Vegetables", vegetablesCopy: "Tomatoes, onions, okra and leafy greens harvested to your order schedule.",
    fruits: "Fruits", fruitsCopy: "Seasonal fruit picked ripe and crated for market-day freshness.",
    agriculture: "Agriculture", agricultureCopy: "Field crops and land production, plus supply planning for larger contracts.",
    restaurants: "Restaurants", resellers: "Resellers", consumers: "Consumers", wholesale: "Wholesale", partners: "Partners",
    consumerCopy: "Family crates and single orders, delivered fresh with clear pricing.",
    restaurantCopy: "Recurring weekly deliveries, consistent grading, and dependable volume.",
    resellerCopy: "Bulk lots, wholesale rates and availability updates before each cycle.",
    builtFor: "Built for", request: "Request pricing"
  },
  coming: {
    eyebrow: "What is coming", title1: "The next harvest is", title2: "an invitation to invest.",
    lead: "We are expanding the farm in clear phases — and opening the door for immigrants who want to build something durable back home.",
    p1: "Phase 01", p1t: "Poultry capacity expansion", p1c: "New coops and a controlled brooding unit to raise steady volume for restaurant contracts year-round.",
    p2: "Phase 02", p2t: "Cold chain & packing shed", p2c: "On-site chilling and packing so vegetables and poultry reach city buyers at full freshness.",
    p3: "Phase 03", p3t: "Diaspora investment program", p3c: "Structured shares for immigrants who want to invest back home — transparent reporting, defined returns, real assets on real land.",
    p4: "Phase 04", p4t: "Live availability board", p4c: "An online view of what is harvested and in stock this week, so buyers order with confidence.",
    ctaTitle: "Invest in land that works", ctaCopy: "Tell us how you would like to participate — capital, equipment, or distribution — and we will share the current plan and numbers.", cta: "Start the conversation"
  },
  contact: {
    eyebrow: "Contact & ordering", title1: "Tell us what you need,", title2: "we will harvest for it.",
    lead: "Orders, wholesale enquiries and investment questions all land in the same place — and get a real answer.",
    fullName: "Full name", namePlaceholder: "Your name", phone: "Phone", phonePlaceholder: "Best number", email: "Email", emailPlaceholder: "you@email.com",
    interest: "I'm interested in", chickens: "Chickens", vegetables: "Vegetables", fruits: "Fruits", agriculture: "Agriculture", investing: "Investing",
    message: "Order details or message", messagePlaceholder: "Quantities, delivery date, or your investment question…", send: "Send order",
    received: "Order received", receivedCopy: "Thank you — we will get back to you shortly with availability and pricing.", another: "Send another",
    direct: "Direct line", wholesaleTitle: "Wholesale & restaurants", wholesaleCopy: "Share your weekly volume and we will build a standing delivery schedule with fixed pricing.",
    responseTitle: "Response time", responseCopy: "Most orders and enquiries are answered within one business day."
  },
  footer: {
    tagline: "Farm-direct poultry, fruits and vegetables for families, restaurants and resellers — grown with care and delivered fresh.",
    explore: "Explore", getInTouch: "Get in touch", service: "Service", rights: "All rights reserved.",
    subtitle: "La qualité d'élevage, le goût du terroir.", home: "Home", about: "About Us", coming: "What is Coming"
  }
} as const;
export default en;
export type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : T extends object
      ? { [K in keyof T]: Widen<T[K]> }
      : T;

export type TranslationSchema = Widen<typeof en>;
