import BalmDotcomTrioImage from "@/public/images/glossier-bdctrio.avif";
import BalmDotcomImage from "@/public/images/glossier-bdc-strawberry-carousel-1.avif";
import MilkyJellyCleanserImage from "@/public/images/glossier-skincare-mjc-177ml-carousel-1.avif";
import AfterBaumeImage from "@/public/images/glossier-skincare-afterbaume-carousel-01.avif";
import FuturedewImage from "@/public/images/glossier-skincare-futuredew-carousel-01.avif";
import FullOrbitImage from "@/public/images/glossier-skincare-full-orbit-carousel-01.avif";
import PrimingMoisturizerImage from "@/public/images/glossier-skincare-priming-moisturizer-carousel-1.avif";
import PrimingMoisturizerRichImage from "@/public/images/glossier-skincare-priming-moisturizer-rich-carousel-1.avif";
import SolutionImage from "@/public/images/glossier-skincare-solution-carousel-01.avif";
import MilkyJellyCleansingBarImage from "@/public/images/glossier-skincare-mjc-bar-carousel-01.avif";
import MiniUniversalProRetinolImage from "@/public/images/glossier-skincare-pro-retinol-carousel-01.avif";
import MiniAfterBaumeImage from "@/public/images/glossier-skincare-afterbaume-mini-carousel-01.avif";
import MiniMilkyJellyCleanserImage from "@/public/images/glossier-skincare-mjc-15ml-carousel-01.avif";
import SuperPureImage from "@/public/images/glossier-skincare-super-pure-carousel-01.avif";
import SuperBounceImage from "@/public/images/glossier-super-bounce-carousel-01_76a56806-4efa-4df0-9beb-2f030da73fa3.avif";
import SuperGlowImage from "@/public/images/glossier-skincare-super-glow-carousel-01.avif";
import CleanserConcentrateImage from "@/public/images/glossier-skincare-cleanser-carousel-01.avif";
import UniversalProRetinolImage from "@/public/images/glossier-skincare-pro-retinol-carousel-01.avif";
import MilkyOilImage from "@/public/images/glossier-skincare-milky-oil-carousel-01.avif";
import PrimingMoisturizerBalanceImage from "@/public/images/glossier-skincare-pmb-carousel-01.avif";
import EssentialTravelDuoImage from "@/public/images/glossier-essentials-duo-carousel-01.avif";
import { Product, Tag } from "./types/product";

export const products: Product[] = [
  {
    id: "43781981995251",
    set: true,
    tags: ["balms", "sets"],
    name: "Balm Dotcom Trio",
    regularPrice: "66 CAD",
    salePrice: "58 CAD",
    image: BalmDotcomTrioImage,
    overview: "Original formula",
    description:
      "Treat your lips to a trio of our moisturizing lip balms with our original, cult-favorite formula. Pick any three tubes to satisfy your shade and flavor preferences.",
  },
  {
    id: "43781981995252",
    name: "Balm Dotcom",
    tags: ["balms"],
    regularPrice: "22 CAD",
    overview: "Original formula",
    image: BalmDotcomImage,
    description:
      "The original formula of our cult-favorite, do-everything lip balm is officially back! Swipe on and celebrate with instant nourishment you can feel and taste.",
  },
  {
    id: "43781981995253",
    sizes: ["60 mL", "177 mL", "300 mL"],
    tags: ["cleansers"],
    name: "Milky Jelly Cleanser",
    regularPrice: "30 CAD",
    overview: "Conditioning face wash",
    image: MilkyJellyCleanserImage,
    description:
      "A nourishing and pH-balanced gel-cream cleanser that plays nicely with all skin types. Conditioning ingredients leave skin soft, smooth and never stripped to start your day. Then dissolves dirt, oil and makeup when you’re ready to wipe the day away.",
  },
  {
    id: "43781981995254",
    sizes: ["50 mL", "125 mL"],
    tags: ["moisturizers"],
    name: "After Baume",
    regularPrice: "44 CAD",
    overview: "Moisture barrier recovery cream",
    image: AfterBaumeImage,
    description:
      "A daily moisture barrier recovery cream perfect for very dry and/or sensitive skin. The buttery, cocooning cream formulated with plant-based moisture magnets, Glycerin and Cupuaçu Butter, helps dry skin bounce back and lock in hydration for up to 24 hours. Awarded the National Eczema Association Seal of Acceptance™",
  },
  {
    id: "43781981995255",
    tags: ["treatments"],
    name: "Futuredew",
    regularPrice: "41 CAD",
    overview: "Oil serum hybrid",
    image: FuturedewImage,
    description:
      "An oil-serum hybrid that's a one-step shortcut to the way your skin looks after a full skincare routine. Packed with some of skincare’s most hydrating heavy-hitters, nourishing oils and powerful plant-based extracts give you a gleamy, well-moisturized, brighter look that lasts up to 12 hours.",
  },
  {
    id: "43781981995256",
    tags: ["treatments"],
    name: "Full Orbit",
    regularPrice: "38 CAD",
    overview: "Hydrating, brightening, smoothing eye cream",
    image: FullOrbitImage,
    description:
      "A multi-benefit, 360° eye cream that tackles the concerns you care about most—immediately hydrating for up to 24 hours and depuffing while visibly brightening dark circles and smoothing the look of fine lines. Our unique lightweight, gel-cream texture (less likely to cause milia!) is fit for under eyes, on eyelids and along the orbital bone for overall fresher, brighter-looking eyes.",
  },
  {
    id: "43781981995257",
    tags: ["moisturizers"],
    name: "Priming Moisturizer",
    regularPrice: "35 CAD",
    overview: "Buildable hydrating creme",
    image: PrimingMoisturizerImage,
    description:
      "A lightweight, buildable moisturizer that instantly brings out the best in all skin types. It hydrates, visibly evens skin texture, and minimizes the look of pores—while priming skin for gorgeous makeup application.",
  },
  {
    id: "43781981995258",
    tags: ["moisturizers"],
    name: "Priming Moisturizer Rich",
    regularPrice: "47 CAD",
    overview: "Luxurious face cream",
    image: PrimingMoisturizerRichImage,
    description:
      "A luxuriously rich yet fast-absorbing face cream that delivers a surge of long-lasting hydration. The buttery texture and blend of botanical oils and glycerin melt into skin to give you a smooth, dewy finish that’s perfectly prepped for makeup.",
  },
  {
    id: "43781981995259",
    tags: ["treatments"],
    name: "Solution",
    regularPrice: "41 CAD",
    overview: "Exfoliating skin perfector",
    image: SolutionImage,
    description:
      "A daily skin-perfecting exfoliator that transforms the look and feel of your complexion by gently “ungluing” dull, dead skin and sweeping it away. With everyday use, a 10% blend of exfoliating acids help improve the appearance of uneven texture, visibly reduce the look of blemishes, and refine the appearance of enlarged pores for smoother, softer, glowier-looking skin.",
  },
  {
    id: "43781981995250",
    tags: ["cleansers"],
    name: "Milky Jelly Cleansing Bar",
    regularPrice: "24 CAD",
    overview: "Conditioning face + body wash",
    image: MilkyJellyCleansingBarImage,
    description:
      "A soft-yet-effective, conditioning, face-to-toe, cleansing bar that respects skin’s natural pH and leaves skin feeling hydrated, never stripped. It’s the Milky Jelly gentle cleansing you know and love in an ergonomically-designed, soap-free face and body bar formulated with ultra-sensitive skin in mind.",
  },
  {
    id: "43781981995211",
    tags: ["treatments"],
    name: "Mini Universal Pro-Retinol",
    regularPrice: "20 CAD",
    overview: "Mini nightly renewing complex",
    image: MiniUniversalProRetinolImage,
    description:
      "Whether you’re a retinol rookie or regular, this one’s for you. Universally loved, Pro-Retinol improves the appearance of fine lines, blemishes, pores, dark spots, uneven tone and texture (aka basically everything), while nourishing skin. Formulated with 0.5% pro-retinol (Retinyl Sunflowerates), an innovative hybrid of pure retinol and sunflower seed fatty acids, you get all the juicy benefits of a retinoid, with none of the downsides (irritation, dryness, peeling, etc).",
  },
  {
    id: "43781981995212",
    tags: ["moisturizers"],
    name: "Mini After Baume",
    regularPrice: "14 CAD",
    overview: "Mini moisture barrier recovery cream",
    image: MiniAfterBaumeImage,
    description:
      "A mini, daily moisture barrier recovery cream perfect for soothing very dry and sensitive skin on-the-go. The buttery, cocooning cream helps dry skin bounce back and lock in hydration for up to 24 hours. Awarded the National Eczema Association Seal of Acceptance™.",
  },
  {
    id: "43781981995213",
    tags: ["cleansers"],
    name: "Mini Milky Jelly Cleanser",
    regularPrice: "7 CAD",
    overview: "Mini conditioning face wash",
    image: MiniMilkyJellyCleanserImage,
    description:
      "A mini, on-the-go nourishing and pH-balanced gel-cream cleanser that plays nicely with all skin types. Conditioning ingredients leave skin soft, smooth and never stripped to start your day. Then dissolves dirt, oil and makeup when you’re ready to wipe the day away.",
  },
  {
    id: "43781981995214",
    tags: ["treatments"],
    name: "Super Pure",
    regularPrice: "46 CAD",
    overview: "Niacinamide + zinc serum",
    image: SuperPureImage,
    description:
      "A daily vitamin and mineral duo of Zinc PCA and 5% Niacinamide (the perfect amount to be effective without irritating skin). This double dose nourishes skin for visibly smoother texture, smaller-looking pores, and improved clarity.",
  },
  {
    id: "43781981995215",
    tags: ["treatments"],
    name: "Super Bounce",
    regularPrice: "46 CAD",
    overview: "Hyaluronic acid + vitamin b5 serum",
    image: SuperBounceImage,
    description:
      "A fast-absorbing, super refreshing serum with a soothing combo of 2% Hyaluronic Acid Complex and Pro-Vitamin B5. Beneath the skin, this one-two punch gets to work, deeply hydrating on multiple layers for a visibly smooth, soft (and never sticky) canvas.",
  },
  {
    id: "43781981995216",
    tags: ["treatments"],
    name: "Super Glow",
    regularPrice: "46 CAD",
    overview: "Vitamin c + magnesium serum",
    image: SuperGlowImage,
    description:
      "A lightweight, nourishing serum formulated with 5% Vitamin C derivative and Magnesium PCA. These ingredients team up to even skin tone, improve the appearance of dark spots, and replenish moisture for recharged, refreshed and glowy skin.",
  },
  {
    id: "43781981995217",
    tags: ["cleansers"],
    name: "Cleanser Concentrate",
    regularPrice: "32 CAD",
    overview: "Clarifying face wash",
    image: CleanserConcentrateImage,
    description:
      "A highly concentrated, purifying cleanser that gently exfoliates, clarifies and re-energizes skin in 60 seconds. An A-Team of powerful plant exfoliators—Grape Extract and Lactic Acid—gently smooth skin and brighten your glow, while amino acid surfactants create an undetectable film that holds on to key ingredients so they can work on the skin instead of just rinsing down the drain.",
  },
  {
    id: "43781981995218",
    tags: ["treatments"],
    name: "Universal Pro-Retinol",
    regularPrice: "54 CAD",
    overview: "Nightly renewing complex",
    image: UniversalProRetinolImage,
    description:
      "Whether you’re a retinol rookie or regular, this one’s for you. Universally loved, Pro-Retinol improves the appearance of fine lines, blemishes, pores, dark spots, uneven tone and texture (aka basically everything), while nourishing skin. Formulated with 0.5% pro-retinol (Retinyl Sunflowerates), an innovative hybrid of pure retinol and sunflower seed fatty acids, you get all the juicy benefits of a retinoid, with none of the downsides (irritation, dryness, peeling, etc).",
  },
  {
    id: "43781981995219",
    tags: ["cleansers"],
    name: "Milky Oil",
    regularPrice: "25 CAD",
    overview: "Waterproof makeup remover",
    image: MilkyOilImage,
    description:
      "A gentle makeup remover that melts away long-wearing and waterproof formulas—without needing to rub or tug the skin. The perfectly-proportioned blend of micellar water and weightless oil create a dual-phase formula that easily dissolves makeup, while Pro-Vitamin B5 conditions so your skin feels soft and fresh after use.",
  },
  {
    id: "43781981995220",
    tags: ["moisturizers"],
    name: "Priming Moisturizer Balance",
    regularPrice: "35 CAD",
    overview: "Oil-control gel cream",
    image: PrimingMoisturizerBalanceImage,
    description:
      "A fast-absorbing, lightweight gel-cream moisturizer that balances oil without over-drying or leaving a powdery finish. Immediately, thanks to Marine Extract and Niacinamide, pores appear smaller, shine is gone, and skin is hydrated and happy—with more skin-balancing benefits over time.",
  },
  {
    id: "43781981995221",
    tags: ["sets"],
    name: "Essential Travel Duo",
    regularPrice: "21 CAD",
    salePrice: "18 CAD",
    overview: "Mini After Baume + Mini Milky Jelly Cleanser",
    image: EssentialTravelDuoImage,
    description:
      "Pack light this holiday season with a cleansing-moisturizing duo featuring Milky Jelly Cleanser, our nourishing gel-cream cleanser and After Baume, our daily moisture recovery cream for soothed, hydrated skin. Both in a perfectly-compact mini size for effortless travel free of bag fees.",
  },
];

const productTags = products.flatMap(({ tags }) => tags);
export const tags: Tag[] = [...new Set(productTags)];
