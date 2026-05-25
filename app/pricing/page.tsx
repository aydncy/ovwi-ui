import { UpgradeButton } from "@/components/ui/upgrade-button";
import { Card } from "@/components/ui/card";

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto pt-32 px-4">
      <h1 className="text-4xl font-bold mb-8">Pricing</h1>

      <div className="grid grid-cols-3 gap-6">
        <Card>
          <h2>Pro</h2>
          <p>$6 / month</p>

          <UpgradeButton href="/api/checkout/pro">
            Upgrade
          </UpgradeButton>
        </Card>

        <Card>
          <h2>Enterprise</h2>
          <p>$18 / month</p>

          <UpgradeButton href="/api/checkout/enterprise">
            Upgrade
          </UpgradeButton>
        </Card>

        <Card>
          <h2>Scale</h2>
          <p>$49 / month</p>

          <UpgradeButton href="/api/checkout/scale">
            Upgrade
          </UpgradeButton>
        </Card>
      </div>
    </div>
  );
}
