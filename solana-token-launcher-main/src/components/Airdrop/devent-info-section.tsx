import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Rocket, Zap, Coins } from 'lucide-react';

const DevnetInfoSection = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* About ZRP */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Rocket className="mr-2 h-5 w-5 text-purple-500" />
              About ZRP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              ZRP is a powerful Solana token and memecoin launchpad. Create, deploy, 
              and grow your tokens with ease. Built for creators who want speed, 
              security, and full control over their projects.
            </p>
          </CardContent>
        </Card>

        {/* Why Choose ZRP */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Zap className="mr-2 h-5 w-5 text-purple-500" />
              Why Choose ZRP?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Fast token creation • Easy liquidity tools • Secure smart contracts • 
              Real-time management dashboard • Strong community features. 
              Perfect for both memecoins and serious projects on Solana.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Important Information */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center">
            <AlertCircle className="mr-2 h-5 w-5 text-purple-500" />
            Important Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Coins className="h-5 w-5 text-purple-500 mt-1" />
              <div>
                <h4 className="font-medium">Airdrop Limits</h4>
                <p className="text-sm text-muted-foreground">
                  Test airdrops provide limited SOL for development. 
                  Wait a few seconds between requests to respect rate limits.
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              ZRP is your complete launch platform on Solana. 
              Launch tokens and memecoins with confidence.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Final Call to Action */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center">
            <Rocket className="mr-2 h-5 w-5 text-purple-500" />
            Ready to Launch on Solana?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            ZRP makes launching tokens and memecoins on Solana simple and powerful. 
            Connect your wallet, create your token, and go live in minutes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevnetInfoSection;
