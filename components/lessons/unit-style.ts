import { Headphones, BookOpen, BarChart3, MessageCircle, Lock, type LucideIcon } from "lucide-react";

export const UNIT_GRADIENTS: Record<string, string> = {
  green: "from-olive-600 to-olive-900",
  blue: "from-olive-800 to-olive-950",
  orange: "from-gold-500 to-olive-800",
  purple: "from-wine-600 to-wine-900",
  black: "from-olive-950 to-black",
};

export const UNIT_ICONS: Record<string, LucideIcon> = {
  headphones: Headphones,
  book: BookOpen,
  chart: BarChart3,
  chat: MessageCircle,
  lock: Lock,
};
