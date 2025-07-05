import { motion } from "framer-motion";
import { useAccount, useChainId } from "wagmi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";

export function WalletStatus() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const isCorrectNetwork = chainId === 11155111; // Sepolia testnet
  const chainName = chainId === 11155111 ? "Sepolia" : `Chain ${chainId}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Connection Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Connection</span>
            <div className="flex items-center gap-2">
              {isConnected ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <Badge variant="secondary" className="bg-green-400/20 text-green-400">
                    Connected
                  </Badge>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <Badge variant="destructive">Disconnected</Badge>
                </>
              )}
            </div>
          </div>

          {/* Wallet Address */}
          {isConnected && address && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Address</span>
              <div className="flex items-center gap-2">
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {`${address.slice(0, 6)}...${address.slice(-4)}`}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`https://sepolia.etherscan.io/address/${address}`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Network Status */}
          {isConnected && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Network</span>
              <div className="flex items-center gap-2">
                {isCorrectNetwork ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <Badge variant="secondary" className="bg-green-400/20 text-green-400">
                      {chainName}
                    </Badge>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-yellow-400" />
                    <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-400">
                      {chainName} (Switch to Sepolia)
                    </Badge>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Action Button */}
          {!isCorrectNetwork && isConnected && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => {
                // Switch network logic will be handled by RainbowKit
                console.log("Switch to Sepolia");
              }}
            >
              Switch to Sepolia Testnet
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}