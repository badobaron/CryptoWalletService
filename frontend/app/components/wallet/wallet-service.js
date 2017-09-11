function WalletService($resource) {
  /**
   * @name WalletService
   *
   * @description
   * A service providing wallet data.
   */

  var that = this;

  /**
   * A resource for retrieving game data.
   */
  that.WalletResource = $resource(_urlPrefixes.API + "viewWallet");


  /**
   * A convenience method for retrieving a wallet object.
   * Retrieval is done via a GET request to the /api/viewWallet endpoint.
   * @param {object} params - the query string object used for a GET request to ../games/ endpoint
   * @returns {object} WalletResource - wallet-related data
   */
  that.viewWallet = function() {
    return that.WalletResource;
  };
}

angular.module("Wallet")
  .service("WalletService", ["$resource", WalletService]);