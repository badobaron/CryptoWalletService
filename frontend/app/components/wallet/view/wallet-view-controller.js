function WalletViewController(WalletService) {  
  var that = this;

  /* Stored wallet objects. */
  that.wallet = null;

  /**
   * Initialize the wallet list controller.
   */
  that.init = function() {
    that.wallet = WalletService.viewWallet().get();
  };
}

angular.module("Wallet")  
  .controller("WalletViewController", [
    "WalletService",
    WalletViewController
  ]);