import data from '../data/data.json';

export interface LinkType {
  name: string;
  href: string;
  active?: boolean;
  sublinks?: LinkType[];
  children?: LinkType[];
}

export interface TopbarData {
  contact_info: { icon: string; label?: string; value: string }[];
  socials: { icon: string; href: string }[];
  follow_text: string;
}

export interface HeaderData {
  logo_image?: string;
  logo_text: string;
  logo_subtext?: string;
  links: LinkType[];
  button_text: string;
  button_link: string;
}

export interface FooterContactItem {
  icon: string;
  label: string;
  value: string;
  href?: string;
}

export interface FooterData {
  logo_image?: string;
  logo_text?: string;
  logo_subtext?: string;
  tagline?: string;
  description: string;
  socials: { icon: string; href: string }[];
  quick_links_title?: string;
  quick_links: LinkType[];
  our_services_title?: string;
  our_services: LinkType[];
  support?: LinkType[];
  contact_title?: string;
  contact_items?: FooterContactItem[];
  contact_labels?: {
    phone: string;
    email: string;
    address: string;
    hours?: string;
  };
  contact: {
    address: string;
    address_line1?: string;
    address_line2?: string;
    phone: string;
    email: string;
    hours?: string;
  };
  bottom_links?: LinkType[];
  copyright: string;
}

export interface HeroSlide {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  title_line2: string;
  description: string;
  primary_button: { text: string; href: string };
  secondary_button?: { text: string; href: string };
  image?: string;
}

export interface HeroHighlight {
  icon: string;
  text?: string;
  line1?: string;
  line2?: string;
}

export interface HeroSectionData {
  background_pattern?: string;
  slides: HeroSlide[];
  highlights?: HeroHighlight[];
}

export interface AboutStat {
  value: string;
  label: string;
  icon: string;
}

export interface AboutSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  title_line2?: string;
  description: string;
  image?: string;
  stats?: AboutStat[];
  button?: { text: string; href: string };
}

export interface ServiceItem {
  title: string;
  description: string;
  image: string;
  link: string;
  icon: string;
}

export interface ServicesSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  title_line2?: string;
  description: string;
  button: { text: string; href: string };
  items: ServiceItem[];
}

export interface TestimonialReview {
  text: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

export interface TestimonialsSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  title_line2?: string;
  description: string;
  reviews: TestimonialReview[];
}

export interface WhyChooseItem {
  number: string;
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  title_line2?: string;
  description: string;
  items: WhyChooseItem[];
}

export interface ContactCard {
  icon: string;
  title: string;
  value: string;
  label?: string;
  subtext?: string;
  href?: string;
}

export interface ContactSectionData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  background_image?: string;
  badge?: {
    title: string;
    description: string;
    icon?: string;
  };
  cards: ContactCard[];
  form: {
    title: string;
    subtitle?: string;
    button_text: string;
    categories?: string[];
  };
}

export interface PageComponentRef {
  key: string;
  component: string;
}

export interface PageMeta {
  title: string;
  pageName: string;
  metadata?: { title: string };
  components?: PageComponentRef[];
}

export interface HeaderProps { data: HeaderData }
export interface HeroProps { data: HeroSectionData }
export interface AboutProps { data: AboutSectionData }
export interface ServicesProps { data: ServicesSectionData }
export interface TestimonialsProps { data: TestimonialsSectionData }
export interface WhyChooseProps { data: WhyChooseSectionData }
export interface ContactProps { data: ContactSectionData }
export interface FooterProps { data: FooterData }

export const siteJson = data;
export const common = data.common;
export const template = data.categories.Electrical.templateComponents['template-1'];
export const pages = template.pages;
export const sections = template.sections;
