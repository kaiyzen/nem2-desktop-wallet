<template>
  <div class="transaction-list-container radius">
    <TransactionModal
            :visible="showDialog"
            :activeTransaction="activeTransaction"
            @close="showDialog = false"
    />

    <div class="bottom_transactions radius scroll">
      <div class="label_page">
        <span class="page_title">{{$t(pageTitle)}}</span>
      </div>

      <div class="table_container">
        <div class="all_transaction">
          <div class="table_head">
            <div class="col2-header"><span>{{$t('from_to_action')}}</span></div>
            <div class="col3-header"><span>{{$t('amount_asset')}}</span></div>
            <div class="col4-header"><span>{{$t('confirmations_height')}}</span></div>
            <div class="col5-header"><span>{{$t('hash_date')}}</span></div>
          </div>
          <div class="confirmed_transactions">
            <Spin v-if="transactionsLoading" size="large" fix class="absolute"></Spin>
            <div class="table_body hide_scroll" @scroll="divScroll" ref="confirmedTableBody">
              <div
                      class="table_item pointer "
                      v-for="(c, index) in slicedTransactionList"
                      :key="index"
                      @click="transactionClicked(c)"
              >
                <!-- FIRST COLUMN -->
                <img class="mosaic_action" :src="c.txHeader.icon" alt=""/>

                <!-- SECOND COLUMN -->
                <div class="col2 overflow_ellipsis">
                <span
                        class="col2-item overflow_ellipsis"
                >
                    {{ c.rawTx.signer.address.pretty() }}
                </span>
                  <span
                          v-if="c.rawTx.type === TransactionType.TRANSFER"
                          class="col2-item bottom overflow_ellipsis"
                  >
                    -> {{ c.rawTx.recipientAddress instanceof NamespaceId
                      ? getName(c.rawTx.recipientAddress)
                      : c.rawTx.recipientAddress.pretty() }}
                </span>
                  <span
                          v-if="c.rawTx.type !== TransactionType.TRANSFER"
                          class="col2-item bottom tag"
                  >
                    -> {{ c.txHeader.tag }}
                </span>
                </div>

                <!-- THIRD COLUMN -->
                <div class="col3">
                <span
                        :class="['overflow_ellipsis', c.txHeader.isReceipt ? 'green' : 'red']"
                        v-if="c.rawTx.type === TransactionType.TRANSFER"
                >
                    {{ renderMosaics(c.rawTx.mosaics, $store, c.txHeader.isReceipt) || 'Loading...' }}
                </span>
                  <span
                          class="red "
                          v-if="c.rawTx.type !== TransactionType.TRANSFER"
                  >
                    - {{ c.txHeader.fee }}
                </span>
                </div>

                <!-- FOURTH COLUMN -->
                <div class="col4">
                <span v-if="c.isTxConfirmed" class="col4">
                  {{ renderHeightAndConfirmation(c.txHeader.block) || '' }}
                </span>
                  <span v-if="!c.isTxConfirmed" class="col4">
                  {{ $t('unconfirmed') }}
                </span>
                </div>

                <!-- FIFTH COLUMN -->
                <div class="col5">
                  <span class="item">
                    <a target="_blank" :href="formatExplorerUrl(c.txHeader.hash)"> {{ miniHash(c.txHeader.hash) }} </a>
                  </span>
                  <span class="item bottom">{{c.txHeader.time}}</span>
                </div>

                <!-- SIXTH COLUMN -->
                <div class="col6">
                  <img
                          v-if="!c.isTxConfirmed"
                          src="@/common/img/monitor/dash-board/dashboardUnconfirmed.png"
                          class="expand_mosaic_info"
                  />
                  <img
                          v-if="c.isTxConfirmed"
                          src="@/common/img/monitor/dash-board/dashboardConfirmed.png"
                          class="expand_mosaic_info"
                  />
                </div>


                <div class="no_data" v-if="!transactionList.length">
                  {{$t('no_confirmed_transactions')}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="split_page">
        <span>{{$t('total')}}：{{transactionList.length}} {{$t('data')}}</span>
        <Page @on-change="changePage" :total="transactionList.length" class="page_content"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    // @ts-ignore
    import {TransactionListTs} from './TransactionListTs'
    import "./TransactionList.less";

    export default class TransactionList extends TransactionListTs {

    }
</script>

<style scoped lang="less">
</style>
