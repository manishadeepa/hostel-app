import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WiFiValidationCard = ({ 
  isConnected, 
  isValidNetwork, 
  networkName, 
  onMarkAttendance, 
  isLoading,
  isMarked 
}) => {
  const getConnectionStatus = () => {
    if (!isConnected) {
      return {
        icon: "WifiOff",
        color: "var(--color-error)",
        bgColor: "bg-error/10",
        borderColor: "border-error/20",
        title: "No Wi-Fi Connection",
        message: "Please connect to the hostel Wi-Fi network to mark your attendance."
      };
    }

    if (!isValidNetwork) {
      return {
        icon: "AlertTriangle",
        color: "var(--color-warning)",
        bgColor: "bg-warning/10",
        borderColor: "border-warning/20",
        title: "Invalid Network",
        message: `You are connected to "${networkName}". Please connect to the hostel Wi-Fi network.`
      };
    }

    return {
      icon: "Wifi",
      color: "var(--color-success)",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
      title: "Connected to Hostel Wi-Fi",
      message: `Connected to "${networkName}". You can now mark your attendance.`
    };
  };

  const status = getConnectionStatus();
  const canMarkAttendance = isConnected && isValidNetwork && !isMarked;

  return (
    <div className="bg-card rounded-xl shadow-elevation-md p-4 md:p-6 lg:p-8 border border-border">
      <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
        <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center flex-shrink-0 ${status?.bgColor} ${status?.borderColor} border`}>
          <Icon name={status?.icon} size={24} color={status?.color} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2">
            {status?.title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            {status?.message}
          </p>
        </div>
      </div>
      <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
        <div className="flex items-center justify-between p-3 md:p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 md:gap-3">
            <Icon name="Wifi" size={20} color="var(--color-muted-foreground)" />
            <span className="text-sm md:text-base font-medium text-foreground">Network Status</span>
          </div>
          <span className={`text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full ${
            isConnected 
              ? isValidNetwork 
                ? 'bg-success/10 text-success' :'bg-warning/10 text-warning' :'bg-error/10 text-error'
          }`}>
            {isConnected ? (isValidNetwork ? "Valid" : "Invalid") : "Disconnected"}
          </span>
        </div>

        {isConnected && (
          <div className="flex items-center justify-between p-3 md:p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 md:gap-3">
              <Icon name="Radio" size={20} color="var(--color-muted-foreground)" />
              <span className="text-sm md:text-base font-medium text-foreground">Network Name</span>
            </div>
            <span className="text-xs md:text-sm font-mono text-foreground bg-background px-2 md:px-3 py-1 rounded">
              {networkName}
            </span>
          </div>
        )}
      </div>
      <Button
        variant={canMarkAttendance ? "default" : "outline"}
        fullWidth
        disabled={!canMarkAttendance || isLoading}
        loading={isLoading}
        iconName="CheckCircle2"
        iconPosition="left"
        onClick={onMarkAttendance}
        className="h-12 md:h-14 text-base md:text-lg font-semibold"
      >
        {isMarked ? "Attendance Already Marked" : "Mark Present"}
      </Button>
      {!isConnected && (
        <div className="mt-4 p-3 md:p-4 bg-muted/50 rounded-lg border border-border">
          <h4 className="text-sm md:text-base font-semibold text-foreground mb-2 flex items-center gap-2">
            <Icon name="HelpCircle" size={18} />
            Troubleshooting Tips
          </h4>
          <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Ensure Wi-Fi is enabled on your device</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Connect to the hostel Wi-Fi network (HostelWiFi_Main)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Make sure you are within the hostel premises</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Contact the warden if you face persistent issues</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default WiFiValidationCard;