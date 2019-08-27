import ScatterJS from '@scatterjs/core';
import { JsonRpc } from 'eosjs';
import { getBlockchainHost, getBlockchainPort, getBlockchainProtocol } from '../config';
import { CORE_TOKEN_NAME } from './constants';
import Utils from './utils';

export default class Network {
  static getRpc() {
    const host = getBlockchainHost();
    const protocol = getBlockchainProtocol();
    const port = getBlockchainPort();

    return new JsonRpc(`${protocol}://${host}:${port}`);
  }

  static async getInfo() {
    const rps = Network.getRpc();
    const info = await rps.get_info();

    return info;
  }

  static async getNetwork() {
    const info = await Network.getInfo();

    return ScatterJS.Network.fromJson({
      blockchain: 'eos',
      chainId: info.chain_id,
      protocol: getBlockchainProtocol(),
      host: getBlockchainHost(),
      port: getBlockchainPort(),
    });
  }

  static async getCurrentNetAndCpuStakedTokens(accountName) {
    const rpc = Network.getRpc();
    const response = await rpc.get_account(accountName);
    const result = {
      net: 0,
      cpu: 0,
      currency: CORE_TOKEN_NAME,
    };

    if (response.self_delegated_bandwidth) {
      result.net = Utils.getTokensAmountFromString(response.self_delegated_bandwidth.net_weight);
      result.cpu = Utils.getTokensAmountFromString(response.self_delegated_bandwidth.cpu_weight);
    }

    return result;
  }
}
