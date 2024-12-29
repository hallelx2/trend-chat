import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, Icon }) => {
  return (
    <div className="relative">
      <dt className="flex items-center gap-x-3">
        <Icon className="h-6 w-6 text-primary" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </dt>
      <dd className="mt-4 text-muted-foreground">{description}</dd>
    </div>
  );
};

export default FeatureCard;
