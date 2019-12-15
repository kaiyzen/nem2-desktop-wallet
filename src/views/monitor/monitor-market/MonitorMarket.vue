<template>
  <div class="market_board_container secondary_page_animate" @click="hideSearchDetail()">
    <div class="top_network_info">
      <div class="left_echart radius">
        <span class="trend">{{ $t('XEM_market_trend_nearly_24_hours') }}</span>
        <span class="price_info right">
          <span class="price_item">
            <span>{{ $t('highest_price') }}</span><span class="black">${{ highestPrice }}</span>
          </span>
          <span class="price_item">
            <span>{{ $t('lowest_price') }}</span><span class="black">${{ lowestPrice }}</span>
          </span>
          <span class="price_item">
            <span>{{ $t('average_price') }}</span><span class="black">${{ averagePrice }} </span>
            <span>{{ $t('pre_week') }}</span><span :class="riseRange < 0 ? 'red' : 'green'">{{ riseRange }}%</span>
          </span>
        </span>
        <LineChart />
      </div>
      <div class="right_net_txs radius">
        <div class="top_select_conditions">
          <span class="left">{{ $t('whole_network_transaction') }}</span>
          <div v-show="isShowSearchDetail" class="search_expand">
            <span class="search_container">
              <img src="@/common/img/monitor/market/marketSearch.png" alt="">
              <input
                v-model="assetType" type="text" class="absolute"
                :placeholder="$t('please_enter_the_asset_type')"
                @click.stop
              >
            </span>
            <span class="search_btn pointer" @click.stop="searchByAsset">{{ $t('search') }}</span>
          </div>
        </div>
        <div class="bottom_new_transactions  scroll">
          <Spin
            v-if="recentTransactionList.length <= 0 && !noTransactionRecord" size="large" class="absolute"
            fix
          />

          <span
            v-if="noTransactionRecord"
            class="no_record absolute"
          >{{ $t('no_such_currency_transaction_record_yet') }}</span>


          <div v-for="(r, index) in recentTransactionList" :key="index" class="transaction_item">
            <img
              v-if="r.type === 'XEM'" src="@/common/img/monitor/market/marketAssetLogo.png"
              alt=""
            >
            <div>
              <div class="top overflow_ellipsis ">
                {{ r.type }}
              </div>
              <div class="bottom">
                {{ r.time }}
              </div>
            </div>
            <div class="right">
              <div class="top coin_amount">
                {{ r.direction === 'sell' ? '+' : '-' }}{{ formatNumber(r.amount.toFixed(6)) }}
              </div>
              <div class="bottom coin_cost">
                USD {{ r.result }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import {MonitorMarketTs} from '@/views/monitor/monitor-market/MonitorMarketTs.ts'

export default class MonitorMarket extends MonitorMarketTs {

}
</script>
<style scoped lang="less">
  @import "MonitorMarket.less";
</style>
