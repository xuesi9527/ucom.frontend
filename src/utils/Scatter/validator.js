import ScatterJS from '@scatterjs/core';
import Network from './network';
import { SMART_CONTRACT_EOSIO_TOKEN, CORE_TOKEN_NAME } from './constants';

export default class Validator {
  static isAccountNameAnActorOrExceptionAndLogout(actorAccountName, testAccountName) {
    if (actorAccountName !== testAccountName) {
      ScatterJS.logout();
      throw new Error('The user does not match the user of the scatter');
    }
  }

  static async isAccountNameExitOrException(accountName) {
    const rpc = Network.getRpc();

    try {
      await rpc.get_account(accountName);
      return true;
    } catch (err) {
      throw new Error('Probably account does not exist. Please check spelling.');
    }
  }

  static async isEnoughBalanceOrException(accountName, amount) {
    const rpc = Network.getRpc();
    let balance;

    try {
      balance = await rpc.get_currency_balance(SMART_CONTRACT_EOSIO_TOKEN, accountName, CORE_TOKEN_NAME);
    } catch (err) {
      throw new Error('Could not complete request, please try again later');
    }

    if (!balance.length || +parseFloat(balance[0]).toFixed(4) < +amount.toFixed(4)) {
      throw new Error('Not enough tokens. Please correct input data');
    }
  }

  static isNonNegativeIntOrException(value, exceptionMessage) {
    if (Number.isInteger(value) && +value >= 0) {
      return true;
    }

    throw new Error(exceptionMessage);
  }

  static makeNonNegativeIntExceptionMessage(fieldName = 'Input value') {
    return `${fieldName} must be an integer and greater than or equal to zero`;
  }

  static isNonNegativeNetAmountOrException(value) {
    Validator.isNonNegativeIntOrException(value, Validator.makeNonNegativeIntExceptionMessage('Net amount'));
  }

  static isNonNegativeCpuAmountOrException(value) {
    Validator.isNonNegativeIntOrException(value, Validator.makeNonNegativeIntExceptionMessage('Cpu amount'));
  }
}
