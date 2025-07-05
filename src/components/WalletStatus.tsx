import { motion } from "framer-motion";
import { useAccount, useChainId } from "wagmi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, CheckCircle, AlertCircle, ExternalLink, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function WalletStatus() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { toast } = useToast();

  const isCorrectNetwork = chainId === 11155111; // Sepolia testnet
  const chainName = chainId === 11155111 ? "Sepolia Testnet" : `Chain ${chainId}`;

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

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
        <CardContent className="space-y-6">
          {/* Connection Status */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
            <span className="text-sm font-medium">Connection</span>
            <div className="flex items-center gap-2">
              {isConnected ? (
                <>
                  <CheckCircle className="h-4 w-4 text-success" />
                  <Badge variant="secondary" className="bg-success-light text-success">
                    Connected
                  </Badge>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <Badge variant="destructive">Disconnected</Badge>
                </>
              )}
            </div>
          </div>

          {/* Wallet Address */}
          {isConnected && address && (
            <div className="space-y-2">
              <span className="text-sm font-medium">Wallet Address</span>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                <code className="text-xs font-mono flex-1 truncate">
                  {address}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyAddress}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`https://sepolia.etherscan.io/address/${address}`, '_blank')}
                  className="h-8 w-8 p-0"
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          {/* Network Status */}
          {isConnected && (
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
              <span className="text-sm font-medium">Network</span>
              <div className="flex items-center gap-2">
                {isCorrectNetwork ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-success" />
                    <Badge variant="secondary" className="bg-success-light text-success">
                      {chainName}
                    </Badge>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-warning" />
                    <Badge variant="secondary" className="bg-warning-light text-warning">
                      {chainName}
                    </Badge>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Network Switch Warning */}
          {!isCorrectNetwork && isConnected && (
            <div className="p-4 rounded-xl bg-warning-light border border-warning/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-warning mb-1">
                    Wrong Network
                  </p>
                  <p className="text-xs text-warning/80 mb-3">
                    Please switch to Sepolia testnet to use Rescu3 recovery features.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-warning text-warning hover:bg-warning hover:text-warning-foreground"
                  >
                    Switch to Sepolia
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Recovery Status */}
          {isConnected && isCorrectNetwork && (
            <div className="p-4 rounded-xl bg-primary-light border border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary mb-1">
                    Ready for Recovery
                  </p>
                  <p className="text-xs text-primary/80">
                    Your wallet is connected and ready to start the recovery process.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}